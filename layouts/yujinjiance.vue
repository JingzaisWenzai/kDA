<template>
  <div
    fullscreen
    v-loading="loading2"
    :element-loading-text="loadingText"
       element-loading-background="rgba(0, 0, 0, 0.8)">
    <nuxt class="innerbox"></nuxt>
    <el-dialog
      :visible.sync="centerDialogVisible"
      width="410px"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      @opened="opened"
      center>
      <div class='log-box'>
        <p>{{log.tit}}</p>
        <div class="put-box" id="put-box">
        <div><div v-for="(item , index) in log.box" :key="index" ><a><img :src="item.url" /><input autocomplete="off" :type="item.type" v-model="item.msg" :placeholder="item.txt" :id="item.oId" @keyup.enter="toLog" @blur="changePwd(index,0)" @focus="changePwd(index,1)"/></a></div>
        </div>
        </div>
        <div class="alert-box" v-if="log.alertMsg !== ''">{{log.alertMsg}}</div>
        <!--<div class="put-select">-->
        <!--<a><i :class="forget==='yes'? 'select-box active' : 'select-box'" @click="toSelect($event)"></i><span>{{log.btn.remember}}</span></a>-->
        <!--<a @click="toForger"><span>{{log.btn.forget}}</span></a>-->
        <!--</div>-->
        <div class="log-in" @click="toLog">{{log.txt}}</div>
      </div>
    </el-dialog>

    <!--查看图片控件-->
    <div class="images" v-viewer="{url: 'data-large', navbar: false, movable: true}" style="width: 0;height: 0;overflow: hidden;"><img class="img" v-for="src in imgs" :src="src" alt="" :key="src"></div>
    <!--隐患三色的弹窗-->
    <div class="trichrome box" v-show="showChrome ==='yes'"><tri-chrome ></tri-chrome></div>
    <!--城区风险评估的弹窗-->
    <div class="city box" v-if="showCity ==='yes' || showQiYe ==='yes'"><city-popup></city-popup></div>
    <!--隐患分布的弹窗-->
    <div class="fenbu box" v-show="showFenBu ==='yes'"><fen-bu ></fen-bu></div>
    <!--建筑隐患的弹窗-->
    <div class="jianzhu box" v-show="showYinHuan ==='yes'"><yin-huan></yin-huan></div>
    <!--三小场所-->
    <div class="jianzhu1 box" v-show="showThreeS ==='yes'"><three-s></three-s></div>
    <!--应急物资-->
    <div class="jianzhu1 box" v-show="showEmergency ==='yes'"><three-s></three-s></div>
    <!--物联网弹窗 易涝点弹窗-->
    <div class="iot box"  v-show="showIotPopup ==='yes'"><iot-popup ></iot-popup></div>
    <!--宏观经济弹框-->
    <div class="p2p box" v-if="ShowJingjiDetail==='yes'"><p2p-detail></p2p-detail></div>
    <!--医院弹框-->
    <div class="hosptial box" v-if="this.$store.state.ShowHospital==='yes'"><hosptial-pop></hosptial-pop></div>
  </div>
</template>

<script>
  import man from '../static/img/portal/man.png';
  import pwd from '../static/img/portal/lock.png';
  import md5 from 'js-md5'

  import { login } from '../api/yjzx'
  import { setToken } from '../utils/auth'
  import bus from '../assets/js/main'
  import popUp from '../layouts/popUp'

  export default {
    name: 'yujinjiance',
    mixins:[popUp],
    data(){
      return {
        centerDialogVisible:false,
        log:{
          tit:'密码登录',
          box:[
            {url:man,txt:'请输入用户名',oId:'user',msg:'',type:'text'},
            {url:pwd,txt:'请输入您的密码',oId:'pwd',msg:'',type:'password'}
          ],
          btn:{forget:'忘记密码',remember:'记住密码'},
          txt:'登录',
          alertMsg:''
        },
        loading2:true,
        imgs:[],
        loadingText:'加载中',
        interval:-1,
        imgFinish:false
      }
    },
    beforeDestroy(){
      bus.$off('showLoading')
      bus.$off('showImgViewer')
    },
    mounted(){
      window.showLoginDialog = this.showLoginDialog
      bus.$on('showLoading',this.showLoading)
      window.showLoading = this.showLoading

      bus.$on('showImgViewer',this.showImgViewer)
      window.showImgViewer = this.showImgViewer

      this.getFullScreen()
      this.showLoading(false)

      const that = this
      window.onresize = () => {
        return (() => {
          that.getFullScreen()
        })()
      }
    },
    watch:{
      imgs:{
        handler:function(val,oldVal){
          this.$nextTick(function(){
            this.imgFinish = true
          });
        },
        deep:true
      }
    },
    methods:{
      getFullScreen(){
        let width = document.getElementsByClassName('el-loading-mask')[0]
        if(width !== undefined){
          document.getElementsByClassName('el-loading-mask')[0].style.width = document.body.scrollWidth+'px'
          document.getElementById('__nuxt').style.width = document.body.scrollWidth+'px'
          document.getElementById('__nuxt').style.position = 'relative'
          // document.getElementsByClassName('el-loading-mask')[0].style.backgroundColor = 'rgba(0, 0, 0, 0.2)'
          // document.getElementsByClassName('el-loading-text')[0].style.color = 'white'
          // document.getElementsByClassName('el-loading-text')[0].style.fontSize = '15px'
          // document.getElementsByClassName('circular')[0].style.width = '80px'
          // document.getElementsByClassName('circular')[0].style.height = '80px'
          // document.getElementsByClassName('path')[0].style.stroke = 'white'
        }else {
          let $this = this
          setTimeout(function() {
            $this.getFullScreen()
          },1000)
        }

      },
      showLoading(type){
        this.getFullScreen()
        this.loading2 = type
        let $this = this
        if(this.interval !== -1){
          clearInterval(this.interval)
        }
        $this.loadingText = $this.loadingText.substr(0,3)
        if(type === true){
          this.interval = setInterval(function() {
            $this.loadingText += '.'
            if($this.loadingText.length>9){
              $this.loadingText = $this.loadingText.substr(0,3)
              console.log($this.loadingText)
            }
          },500)
        }
      },
      showLoginDialog(){
        this.centerDialogVisible = true
      },
      showImgViewer(data){
        console.log(data)
        this.imgs = data
        this.imgFinish = false
        this.checkImg()
      },
      checkImg(){
        let $this = this

        if(this.imgFinish === false){
          setTimeout(function() {
            $this.checkImg()
          },200)
        }else {
          if(this.imgs.length>0){
            console.log(99999)
            let viewer = this.$el.querySelector('.images').$viewer
            viewer.show()
            document.getElementsByClassName('viewer-hide')[0].style.display = 'block'
          }
        }
      },
      toLog:function(){
        document.getElementById('user').blur()
        document.getElementById('pwd').blur()
        let $this = this
        setTimeout(function() {
          let user = document.getElementById('user').value;   /*user = this.log.box[0].msg*/
          let pwd = document.getElementById('pwd').value;     /*user = this.log.box[1].msg*/
          if(user === "" || pwd ===''){
            this.log.alertMsg = '用户名和密码不可为空'
          }else {
            $this.loading2 = true
            // pwd = md5(pwd)
            // this.log.box[1].msg = pwd
            login({
              account: user,
              password: pwd,
              captcha: '1'
            }).then(function(data) {
              $this.loading2 = false
              console.log(data)
              if (data.code === 0) {
                setToken(data.data)
                $this.log.box[1].msg = ''
                document.location.reload()
                $this.centerDialogVisible = false
              }else {
                $this.$element.Notification({
                  title: '提示',
                  message:'登录失败: '+data.message,
                  type: 'warning',
                  duration:0
                });
              }
            })
          }
        },200)
      },
      changePwd(index,type){
        if(index === 1){
          if(type === 0){
            //失去焦点
            this.myPwd = this.log.box[1].msg
            this.log.box[1].msg = md5(this.log.box[1].msg)
          }else {
            //获取焦点
            this.log.box[1].msg = this.myPwd
          }
        }
      },
      opened:function() {
        console.log('提示登录')
        let $this = this
        // this.log.box[1].msg = ''
        // setTimeout(function() {
        //   document.getElementById('user').value = '';   /*user = this.log.box[0].msg*/
        //   document.getElementById('pwd').value = '';     /*user = this.log.box[1].msg*/
        // },2000)
        $('.el-dialog__headerbtn').unbind('click').bind('click',function() {
          $this.$router.push('/login')
        })
      }
    }
  }
</script>

<style scoped>
  html {
    font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    font-size: 16px;
    word-spacing: 1px;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    box-sizing: border-box;
  }

  *, *:before, *:after {
    box-sizing: border-box;
    margin: 0;
  }

  .button--green {
    display: inline-block;
    border-radius: 4px;
    border: 1px solid #3b8070;
    color: #3b8070;
    text-decoration: none;
    padding: 10px 30px;
  }

  .button--green:hover {
    color: #fff;
    background-color: #3b8070;
  }

  .button--grey {
    display: inline-block;
    border-radius: 4px;
    border: 1px solid #35495e;
    color: #35495e;
    text-decoration: none;
    padding: 10px 30px;
    margin-left: 15px;
  }

  .button--grey:hover {
    color: #fff;
    background-color: #35495e;
  }
  .el-notification{
    width: auto;
  }
  /*::-webkit-scrollbar-thumb {*/
    /*-webkit-box-shadow: 0 0 0 5px hsla(26,20%,66%,.05) inset!important;*/
    /*background-image: -webkit-gradient(linear,left bottom,left top,color-stop(.44,#7a99d9),color-stop(.72,#497dbd),color-stop(.86,#1c3a94)) !important;*/
  /*}*/
  /*!* ie 滚动条*!*/
  /*html{*/
    /*scrollbar-arrow-color: #1c3a94; !**!!*三角箭头的颜色*!*/
    /*!*scrollbar-face-color: #1c3a94; !**!!*立体滚动条的颜色*!*!*/
    /*scrollbar-face-color:rgba(33,56,84,1);*/
    /*scrollbar-3dlight-color: red; !**!!*立体滚动条亮边的颜色*!*/
    /*scrollbar-highlight-color: #666; !**!!*滚动条空白部分的颜色*!*/
    /*scrollbar-highlight-color: rgba(44,67,101,0.5); !**!!*滚动条空白部分的颜色*!*/
    /*scrollbar-shadow-color: rgba(33,56,84,0.5); !**!!*立体滚动条阴影的颜色*!*/
    /*scrollbar-darkshadow-color: purple; !**!!*立体滚动条强阴影的颜色*!*/
    /*scrollbar-track-color: rgba(44,67,101,0.1); !**!!*立体滚动条背景颜色*!*/
    /*scrollbar-base-color:#f8f8f8; !**!!*滚动条的基本颜色*!*/
  /*}*/
  /*登录部分*/
  .log-box{
    width:300px;
    margin: 0 auto;
    height:260px;
  }
  .log-box p:first-child{
    color: #ffffff;font-size: 22px;padding:20px 0;
  }
  .log-box .put-box{
    width: 100%;
    height:100px;
    background-color: #ffffff;
    -webkit-border-radius:6px;
    -moz-border-radius:6px;
    border-radius:6px;
  }
  .put-box a{
    display: block;width: 90%;margin: 0 auto;
  }
  .put-box a:first-child{
    border-bottom:1px solid #a8a8a8;}
  .put-box a img,
  .put-box a input{
    display: inline-block;
    vertical-align: middle;
    line-height: 48px;
  }
  .put-box a img{
    margin-left: 15px;
    width: 24px;
  }
  .put-box a input{
    width:60%;
    border:0;
    height: 49px;
    padding:0 0 0 15px;
    color: #a7a7a7;
    font-size: 18px;
    outline:none;
  }
  .log-box .put-select{
    width: 100%;
    height:auto;
    margin-top: 20px;
  }
  .log-box .alert-box{
    width: 100%;text-align: right;
    height:auto;
    color: #ff0;font-size: 12px;
    padding:6px 0;
  }
  .log-box .log-in{
    width: 100%;
    height:auto;
    margin-top: 25px;
    color: #ffffff;
    font-size: 18px;
    background-color: #126ed5;
    -webkit-border-radius:6px;
    -moz-border-radius:6px;
    border-radius:6px;
    text-align: center;
    padding:6px 0;
  }

  .el-loading-mask{
    background-color: rgba(0, 0, 0, 0.2);
  }
  .el-loading-text{
    color: white;
    font-size: 15px;
  }
  .circular{
    width: 80px;
    height: 80px;
  }
  .path{
    stroke: white;
  }

  /**
  所有弹框
   */
  /*.trichrome{position: absolute; top: 250px;left: 50%;!*top: 50%;  left: 50%;margin-top: -300px; margin-left: -440px; *! z-index: 2;width:553px; height:auto; max-height: 710px; overflow: hidden;}*/
  /*.city{position: absolute; top: 250px;left: 50%;!*top: 50%;  left: 50%;margin-top: -300px; margin-left: -440px; *! z-index: 2;width:1136px; height:auto; max-height: 630px; overflow: hidden;}*/
  /*.fenbu{position: absolute; top: 250px;left: 50%;!*top: 50%;  left: 50%;margin-top: -300px; margin-left: -440px; *! z-index: 2;width:880px; height:auto; max-height: 620px; overflow: hidden;}*/
  /*.jianzhu{position: absolute; top: 250px;left: 50%;!*top: 50%;  left: 50%;margin-top: -400px; margin-left: -374px;  *! max-height: 880px;width: 748px; height: auto; }*/
  /*.jianzhu1{position: absolute; top: 250px;left: 50%;!*top: 50%;  left: 50%;margin-top: -400px; margin-left: -374px; *! max-height: 880px;width: 900px; height: auto; }*/
  /*.iot{position: absolute; top: 250px;left: 50%;!*top: 50%;  left: 50%;margin-top: -380px; margin-left: -420px;*! width:840px; height:auto;max-height: 773px; overflow: hidden; }*/

  .trichrome{position: absolute; top: 50%;  left: 50%;margin-top: -300px; margin-left: -440px;  z-index: 2;width:553px; height:auto; max-height: 710px; overflow: hidden;}
  .city{position: absolute; top: 50%;  left: 50%;margin-top: -300px; margin-left: -440px; z-index: 2;width:1136px; height:auto; max-height: 630px; overflow: hidden;}
  .fenbu{position: absolute; top: 50%;  left: 50%;margin-top: -300px; margin-left: -440px; z-index: 2;width:880px; height:auto; max-height: 620px; overflow: hidden;}
  .jianzhu{position: absolute; top: 50%;  left: 50%;margin-top: -400px; margin-left: -374px; max-height: 880px;width: 748px; height: auto; }
  .jianzhu1{position: absolute; top: 50%;  left: 50%;margin-top: -400px; margin-left: -374px; max-height: 880px;width: 900px; height: auto; }
  .iot{position: absolute; top: 50%;  left: 50%;margin-top: -380px; margin-left: -420px; width:840px; height:auto;max-height: 773px; overflow: hidden; }
  .p2p{position: absolute; top: 50%;  left: 50%;margin-top: -380px; margin-left: -420px; }
  .hosptial{position: absolute; top: 50%;  left: 50%;margin-top: -380px; margin-left: -420px;z-index: 9;}
</style>
<style lang="scss">

  body .el-table th.gutter{
    display: table-cell!important;
  }

  ::-webkit-scrollbar-thumb{
    background-color:#018EE8;
    height:50px;
    outline-offset:-2px;
    outline:2px solid #fff;
    -webkit-border-radius:4px;
    background-clip: content-box!important;
    box-shadow: 0 0 0 5px rgba(25,109,180,0.5) inset!important;
    border: 4px solid transparent!important;

    -webkit-box-shadow: 0 0 0 5px hsla(26, 20%, 66%, .05) inset !important;
    background-image: -webkit-gradient(linear, left bottom, left top, color-stop(.44, #7a99d9), color-stop(.72, #497dbd), color-stop(.86, #1c3a94)) !important;

  }
  /*---鼠标点击滚动条显示样式--*/
  ::-webkit-scrollbar-thumb:hover{
    background-color:#FB4446;
    height:50px;
    -webkit-border-radius:4px;
  }
  /*---滚动条大小--*/
  ::-webkit-scrollbar{
    width:16px !important;
    height:16px !important;
  }
  /*---滚动框背景样式--*/
  ::-webkit-scrollbar-track-piece{
    /*background-color:#fff;*/
    background-color:transparent;
    -webkit-border-radius:0;
  }
  ::-webkit-scrollbar-track {
    box-shadow: 1px 1px 5px rgba(185,165,150,.2) inset!important;
    border: 4px solid transparent!important;
  }

  /**
  右下角的方块
   */
  ::-webkit-scrollbar-corner{
    background: transparent;
  }





  .el-dialog{
    background-color: rgba(2,22,35,0.8);
    border: 1px solid #196db4;
  }
  .el-dialog__wrapper{
    background-color: rgba(2,22,35,0.6);
  }
  .nav_box{
    cursor: pointer;
    line-height: 30px;
  }
  input:-webkit-autofill{
    -webkit-box-shadow: 0 0 0px 1000px white inset;
  }
  input::before, input::after{
    content: " ";
    display: table;
  }
  .log-in{
    cursor: pointer;
  }

  .el-loading-parent--relative {
    .el-loading-text {
      color: white !important;
      font-size: 15px !important;
    }
    .circular {
      width: 80px !important;
      height: 80px !important;
    }
    .path {
      stroke: white !important;
    }
    .el-loading-mask {
      background-color: rgba(0, 0, 0, 0.2) !important;
    }
    .el-loading-spinner{
      top:40% !important;
    }
  }

  //element UI table
  .el-table th, .el-table tr {
    background-color: transparent;
  }
  .el-table--enable-row-hover .el-table__body tr:hover>td{
    background-color: #212e3e !important;
  }
  .el-table, .el-table__expanded-cell{
    background-color:transparent !important;
  }
  .el-table--border td, .el-table--border th, .el-table__body-wrapper .el-table--border.is-scrolling-left~.el-table__fixed {
    border-right: 1px solid #196db4;
  }
  .el-table {
    color: #409EFF;
  }
  .el-table thead{
    color:#196db4;
  }
  //带下边框
  .el-table td, .el-table th.is-leaf {
    border-bottom: 1px solid #196db4;
    /*border: none !important;*/
  }

  //table白色边框修改
  .el-table--border::after, .el-table--group::after, .el-table::before {
    background-color: #196db4;
    z-index: 0;
  }
  .el-table--border, .el-table--group {
    border: 1px solid #196db4;
  }
  //滑动条白色线
  .el-table--border th.gutter:last-of-type {
    border-bottom-width: 0px;
  }

  //tab页
  //tab下的白色线条
  .el-tabs__nav-wrap::after {
    background-color: #196db4;
  }
  .el-tabs--border-card > .el-tabs__header {
    background-color: transparent;
    border: none;
  }

  .el-tabs--border-card > .el-tabs__header .el-tabs__item {
    color: white;
    font-size: 22px;
  }

  .el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active {
    background-color: transparent;
    border-right-color: transparent;
    border-left-color: transparent;
  }
</style>
