
declare const axiosRequest:(config:any) => Promise<any>;
declare const axiosResponseUse:(res:any,errCallback:any) => any;
declare const dealRequest: (res:any) => any;

type TypeResolve = (value: unknown) => void
type TypeQueueHash = string;

const pendingReqs:TypeQueueHash[] = [];
const waittingReqs: TypeResolve[] = [];
export function useQueue(axiosRequest:any,config:any,...arg:any) {
  if(typeof config === 'string') {
    config = {
      url:config
    }
  }
  const queueHash = new Date().getTime() + Math.random() + '';
  config.queueHash = queueHash;
  if(pendingReqs.length >= 5) {
    const p = new Promise((resolve) => {
      waittingReqs.push(resolve);
    })
    return p.then(() => {
      pendingReqs.push(queueHash)
      return axiosRequest(config,...arg);
    })
  }

  pendingReqs.push(queueHash);
  return axiosRequest(config,...arg);
}

export function queueCall(queueHash:string) {
  const queueIndex = pendingReqs.indexOf(queueHash);
  if(queueIndex > -1) {
    pendingReqs.splice(queueIndex,1);
    if(waittingReqs.length) {
      const _resolve = waittingReqs.splice(0,1)[0];
      _resolve(null);
    }
  }
}
// axiosResponseUse((res:any) => {
//   queueCall(res.config.queueHash);
//   dealRequest(res);
// },(err:any) => {
//   queueCall(err.config.queueHash); 
// })