<template>
    <div style="margin: 20px;color:red;">{{message}}</div>
</template>

<script>

  import {getParams} from '../../../../utils/validate'
  import {setToken} from '../../../../utils/auth'
  import {token_validate} from '../../../../api/common'

  export default {
    name: 'index',
    props: [],
    components: {},
    data() {
      return {
        message:'验证权限中'
      }
    },
    mounted() {
      let params = getParams()
      if(params.ticket !== undefined){
        let $this = this
        let time = setInterval(function() {
          if($this.message.length>11){
            $this.message = '验证权限中.'
          }else {
            $this.message += '.'
          }
        },500)

        token_validate({token:params.ticket}).then(function(data) {

          clearInterval(time)

          console.log(data)
          if(data.data.code === 0){
            setToken(params.ticket)
            $this.$router.push('/yxzxVSyjzx/block-data'+document.location.search)
          }else {
            $this.message = data.data.message
          }

        })
      }else {
        this.message = '未授权的ticket链接'
      }
    },
    methods: {},
    beforeDestroy() {

    }
  }
  /**
   * 董鑫:
   //获取ticket
   10.190.55.58:8081/unifiedauth/authentication/login?account=limujun&password=123&captcha=1
   //基于ticket落点
   http://10.190.55.58:8081/web/yxzxVSyjzx/block-data/transfer?lon=114.0740108599763&lat=22.5264820731978&type=weiwen&id=layer_externalservice_weiwen_samplepoint&ticket=eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJDRVRDIiwic3ViIjoiYWRtaW4iLCJhdWQiOiJDRVRDICIsImV4cCI6MTU0NzA1NjgzOCwiaWF0IjoxNTQ2OTk2NzE4LCJqdGkiOiIzN2E3NzU0Zi0xMGZmLTRhMzItODkzMS0wYWU1MjU1OGQxZDEifQ.X23GbqDJAhRF7mMHBq0v8LxuhHbC9TsuceqwYvmJlBI

   url：http://10.190.55.58:8081/web/yxzxVSyjzx/block-data/transfer
   lon：114.0740108599763
   lat：22.5264820731978
   type：weiwen
   id：layer_externalservice_weiwen_samplepoint
   ticket：eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJDRVRDIiwic3ViIjoiYWRtaW4iLCJhdWQiOiJDRVRDICIsImV4cCI6MTU0NzA1NjgzOCwiaWF0IjoxNTQ2OTk2NzE4LCJqdGkiOiIzN2E3NzU0Zi0xMGZmLTRhMzItODkzMS0wYWU1MjU1OGQxZDEifQ.X23GbqDJAhRF7mMHBq0v8LxuhHbC9TsuceqwYvmJlBI
   */
</script>

<style lang="scss" scoped>

</style>
