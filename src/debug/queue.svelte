<script lang=ts>
  import { request } from "../utils/request";


  function startRequest() {
    for (let index = 0; index < 20; index++) {
      console.log('call')
      request({
        url:'/api/debug/wait5'
      }).then((data:any) => {
        console.log('data-->',data)
      })
    }
  }
</script>
<div>
  <button on:click={startRequest}>start</button>
  see control
</div>