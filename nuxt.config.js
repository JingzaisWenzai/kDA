const pkg = require('./package')
const webpack = require('webpack');

module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description },
      { name: 'renderer', content: 'ie-stand'},
      { 'http-equiv': 'x-ua-compatible', content: 'IE=10,11'}
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/web/favicon.ico' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  router:{   /*路径的base路径*/
    base:'/web/'
  },
  /*
  ** Global CSS
  */
  css: [
    'element-ui/lib/theme-chalk/index.css'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/element-ui',
    { src:'@/plugins/request', ssr: false },
    '@/plugins/v-viewer'
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios',
    '@nuxtjs/proxy'
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    proxy: true,
    retry: { retries: 3 },
  },
  proxy: {
    '/arcgis_js_api': {
      // target: 'http://10.190.55.58:8081',
      target: 'http://10.192.19.121:8081',
      changeOrigin: true, //可否跨域
      pathRewrite: {
        '^/arcgis_js_api': '/arcgis_js_api'
      }
    },
    // '/api': {
    //   target: 'http://10.192.19.107:8081',
    //   changeOrigin: true, //可否跨域
    //   pathRewrite: {
    //     '^/api': '/'
    //   }
    // }
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    vendor: ['echarts','jquery','uuid/v4','element-ui'],
    plugins:[
      new webpack.ProvidePlugin({
        jQuery: "jquery",
        $: "jquery",
        'window.jQuery':'jquery',
        echarts:'echarts',
        uuidv4:'uuid/v4'
      })
    ],
    extend(config, ctx) {

    }
  }
}
