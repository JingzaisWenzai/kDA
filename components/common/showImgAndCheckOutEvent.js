
import bus from '../../assets/js/main'
import {getTetTicket} from '../../api/secapi';

export default {
  methods:{
    showImag(params){
      console.log(params)
      if(params !== undefined){
        if(params.search('http')!==-1){
          if(params.search('、') !== -1){
            params = params.split('、')
          }else {
            params = [params]
          }
          bus.$emit('showImgViewer',params)
        }else if(params === ''){

        }else {
          getTetTicket().then(function(data) {
            console.log(data.data)
            let url = 'http://10.190.62.49:8080/ucenter/index/redirecToURL?redirect=%2ffbpt%2fevent%2ftoEventDetail%3fsystemid%3d'+params+'&content_in_iframe=false&content_iframe_id=&subcode=fbpt_zhcx&modelcode=ftfb&homepage=false&origin_tab_index=0&current_tab_index=1&AccessToken='+data.data
            // window.open(url)
            document.getElementsByClassName('openWeiwen')[0].setAttribute('href',url)
            setTimeout(function() {
              console.log(document.getElementsByClassName('openWeiwen')[0].getAttribute('href'))
              document.getElementsByClassName('openWeiwen')[0].click()
            },500)
          })
        }
      }
    }
  }
}
