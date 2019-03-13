import qs from "qs";
import { getToken } from '../utils/auth'

export default function({ $axios,$element, redirect }) {
  $axios.onRequest(config => {
    config.data = qs.stringify(config.data, {
      allowDots: true //Option allowDots can be used to enable dot notation
    });

    if (getToken()) {
      // config.headers.Authorization = getToken()
      config.headers.token = getToken();
    }else {
      config.headers.token = ''
    }

    return config;
  });

  $axios.onResponse(response => {

    if(response.data !== null){
      if(response.data.code !== undefined && response.data.code === 10004){
        let url = window.location.pathname
        if(url.search('portal-comp') === -1){
          window.showLoginDialog()
        }else {
          document.location = '/web/login'
        }
        return Promise.reject(error)
      }else if (response.data.code === -1){
        // $element.Message({
        //   showClose: true,
        //   message: res.config.url+': '+res.data.message,
        //   type: 'error'
        // })
        $element.Notification({
          title: '提示',
          message:res.data.message,
          type: 'warning',
          duration:0
        });
        return Promise.reject(error)
      }else {
        return Promise.resolve(response);
      }
    }
  });

  $axios.onError(error => {
    return Promise.reject(error);
  });
}
