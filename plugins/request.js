import axios from 'axios'
import { getToken } from '../utils/auth'
import Vue from 'vue'
let app = new Vue()

const Axios = axios.create({
  baseURL: '/', // 因为我本地做了反向代理
  // timeout: 10000,
  responseType: 'text',
  withCredentials: true, // 是否允许带cookie这些
  headers: {
    // 'Content-Type': 'application/x-www-form-urlencodedcharset=utf-8'
    'Content-Type': 'application/json;charset=UTF-8'
  }
})

//POST传参序列化(添加请求拦截器)
Axios.interceptors.request.use(
  config => {
    // 在发送请求之前做某件事
    if (config.method === 'post') {
      // 序列化
      // config.data = qs.stringify(config.data)
      // 温馨提示,若是贵公司的提交能直接接受json 格式,可以不用 qs 来序列化的
    }

    // 若是有做鉴权token , 就给头部带上token
    // 若是需要跨站点,存放到 cookie 会好一点,限制也没那么多,有些浏览环境限制了 localstorage 的使用
    // 这里localStorage一般是请求成功后我们自行写入到本地的,因为你放在vuex刷新就没了
    // 一些必要的数据写入本地,优先从本地读取

    if(window.showLoading !== undefined){
      window.showLoading(true)
    }

    if (getToken()) {
      // config.headers.Authorization = getToken()
      config.headers.token = getToken();
    }else {
      config.headers.token = ''
    }
    return config
  },
  error => {
    // error 的回调信息,看贵公司的定义
    // Message({
    //   //  饿了么的消息弹窗组件,类似toast
    //   showClose: true,
    //   message: error && error.data.error.message,
    //   type: 'error'
    // })
    return Promise.reject(error)
  }
)

//返回状态判断(添加响应拦截器)
Axios.interceptors.response.use(
  res => {
    //对响应数据做些事
    // if (res.data && !res.data.success) {
    //   Message({
    //     //  饿了么的消息弹窗组件,类似toast
    //     showClose: true,
    //     message: res.data.error.message.message
    //       ? res.data.error.message.message
    //       : res.data.error.message,
    //     type: 'error'
    //   })
    //   return Promise.reject(res.data.error.message)
    // }
    // if(res.data.code === '10004'){
    //   VueRouter.push({
    //     path: '/login'
    //   })
    // }
    // console.log(res)
    if(window.showLoading !== undefined){
      window.showLoading(false)
    }
    if(res.data !== null){
      if(res.data.code !== undefined && res.data.code === 10004){
        let url = window.location.pathname
        if(url.search('portal-comp') === -1){
          window.showLoginDialog()
        }else {
          document.location = '/web/login'
        }
        return Promise.reject(error)
      }else if (res.data.code === -1){
        // app.$element.Message({
        //   showClose: true,
        //   message: res.config.url+': '+res.data.message,
        //   type: 'error'
        // })
        app.$element.Notification({
          title: '提示',
          message:res.data.message,
          type: 'warning',
          duration:0
        });
        return Promise.reject(error)
      }else {
        return res
      }
    }
  },
  error => {
    // 用户登录的时候会拿到一个基础信息,比如用户名,token,过期时间戳
    // 直接丢localStorage或者sessionStorage
    // if (!window.localStorage.getItem('loginUserBaseInfo')) {
    //   // 若是接口访问的时候没有发现有鉴权的基础信息,直接返回登录页
    //   router.push({
    //     path: '/login'
    //   })
    // } else {
      // 若是有基础信息的情况下,判断时间戳和当前的时间,若是当前的时间大于服务器过期的时间
      // 乖乖的返回去登录页重新登录
    //   let lifeTime =
    //     JSON.parse(window.localStorage.getItem('loginUserBaseInfo')).lifeTime *
    //     1000
    //   let nowTime = new Date().getTime() // 当前时间的时间戳
    //   console.log(nowTime, lifeTime)
    //   console.log(nowTime > lifeTime)
    //   if (nowTime > lifeTime) {
    //     Message({
    //       showClose: true,
    //       message: '登录状态信息过期,请重新登录',
    //       type: 'error'
    //     })
    //     router.push({
    //       path: '/login'
    //     })
    //   } else {
    //     // 下面是接口回调的satus ,因为我做了一些错误页面,所以都会指向对应的报错页面
    //     if (error.response.status === 403) {
    //       router.push({
    //         path: '/error/403'
    //       })
    //     }
    //     if (error.response.status === 500) {
    //       router.push({
    //         path: '/error/500'
    //       })
    //     }
    //     if (error.response.status === 502) {
    //       router.push({
    //         path: '/error/502'
    //       })
    //     }
    //     if (error.response.status === 404) {
    //       router.push({
    //         path: '/error/404'
    //       })
    //     }
    //   }
    // }
    // // 返回 response 里的错误信息
    // let errorInfo = error.data.error ? error.data.error.message : error.data
    if(window.showLoading !== undefined){
      window.showLoading(false)
    }
    if(error.config.url !== '/'){
      return Promise.reject(error)
    }
  }
)

Axios.myGet = function(url,params) {
  return new Promise((resolve, reject) => {
    Axios
      .get(url,{params:params})
      .then(res => {
        resolve(res.data)
      })
      .catch(error => {
        console.log(error)
        // app.$element.Message({
        //   showClose: true,
        //   message: url+': '+error.message,
        //   type: 'error'
        // })
        // app.$element.Notification({
        //   title: '提示',
        //   message:url+': '+error.message,
        //   type: 'warning',
        //   duration:0
        // });
        // reject(error)
      })
  })
}

Axios.myPost = function(url,params) {
  return new Promise((resolve, reject) => {
    // params = JSON.stringify(params)
    Axios.post(url, params)
      .then(res => {
        resolve(res.data)
      })
      .catch(error => {
        // app.$element.Message({
        //   showClose: true,
        //   message: url+': '+error.message,
        //   type: 'error'
        // })
        app.$element.Notification({
          title: '提示',
          message:url+': '+error.message,
          type: 'warning',
          duration:0
        });
        // reject(error)
      })
  })
}

Vue.prototype.$myAxios = Axios
export default () => {
  Vue.use(Axios)
}

