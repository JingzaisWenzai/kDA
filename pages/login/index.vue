<template>
  <section class="container">
    <div class="title">
      <img :src="header.tit.url" />
      <span>{{header.tit.txt}}</span>
    </div>

    <div class='log-bg'>
      <div class="media"></div>
      <div class='log-box'>
        <p>{{log.tit}}</p>
        <div class="put-box" id="put-box">
          <a v-for="(item , index) in log.box" :key="index" ><img :src="item.url" /><input autocomplete="off" :type="item.type" v-model="item.msg" :placeholder="item.txt" :id="item.oId" @keyup.enter="toLog" @blur="changePwd(index,0)" @focus="changePwd(index,1)"/></a>
        </div>
        <div class="alert-box" v-if="log.alertMsg !== ''">{{log.alertMsg}}</div>
        <!--<div class="put-select">-->
          <!--<a><i :class="forget==='yes'? 'select-box active' : 'select-box'" @click="toSelect($event)"></i><span>{{log.btn.remember}}</span></a>-->
          <!--<a @click="toForger"><span>{{log.btn.forget}}</span></a>-->
        <!--</div>-->
        <div class="log-in" @click="toLog">{{log.txt}}</div>
      </div>
    </div>
  </section>
</template>
<script>
  import futianIco from '../../static/img/portal/futian.png';
  import man from '../../static/img/portal/man.png';
  import pwd from '../../static/img/portal/lock.png';

  import { login } from '../../api/yjzx'
  import { setToken } from '../../utils/auth'

  import md5 from 'js-md5'

  export default{
    layout:  'default',
    head(){
      return {
        title:'预警监测平台-门户' ,
        meta:[
          {hid:'description',name:'descriptyion',content:'预警监测平台'},
          {hid:'keywords',name:'keywords',content:'预警监测平台-门户'}
        ],
        link:[
          {hid:'favicon',rel:'favicon',href:'/web/favicon.ico'}
        ]
      }
    },
    data(){
      return {
          header:{
              tit:{url:futianIco,txt:'预警监测平台后台管理'},
          },
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
        myPwd:''
      }
    },
    computed:{

    },
    methods:{
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
            // pwd = md5(pwd)
            // this.log.box[1].msg = pwd
            login({
              account: user,
              password: pwd,
              captcha: '1'
            }).then(function(data) {
              console.log(data)
              if (data.code === 0) {
                setToken(data.data)
                $this.$router.push('/portal-comp/')
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
      }
    },
    components:{

    }
  }
</script>

<style scoped>
  @import url('../../assets/css/reset.css');
  ::-webkit-input-placeholder { /* WebKit, Blink, Edge */
    color:    #a7a7a7;
  }
  :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color:    #a7a7a7;
  }
  ::-moz-placeholder { /* Mozilla Firefox 19+ */
    color:    #a7a7a7;
  }
  :-ms-input-placeholder { /* Internet Explorer 10-11 */
    color:    #a7a7a7;
  }
  input:focus::-webkit-input-placeholder{
    color:transparent;
  }
  input::-webkit-input-placeholder {
    /* placeholder颜色  */
    color: #a7a7a7;
  }
  /*记住密码的按钮*/
  .select-box{
    border:1px solid #dbe1ec;
    background-color: #ffffff;
    width:14px;
    height:14px;
  }
  i.select-box:hover,
  i.select-box.active{
    background:url('../../static/img/portal/select.png') no-repeat center;
    background-size: contain;
  }
  .box-bg{background-color: rgba(0,1,20,0.7); box-shadow:0 0  3px #0059c6;}
  /*页面开始*/
  .container {
    margin:0;
    padding:0;
    border:0;
    width:100vw;
    min-width: 1509px;
    height:100vh;
    min-height: 600px;
    background: url('../../static/img/portal/bgIco.png') no-repeat center;
    -webkit-background-size:cover;
    background-size:cover;
    position: relative;
  }
  .container .title{
    position: absolute;
    left:60px;
    top:40px;
  }
  .container .title img,
  .container .title span{
    display: inline-block;
    vertical-align: middle;
    line-height: 36px;
  }
  .container .title img{
    width:36px;
    height:36px;
  }
  .container .title span{
    margin-left: 15px;
    color: #ffffff;
    font-size: 28px;
    font-weight: 600;
  }
  /*登录成功之后的首页部分*/
  .container .entry{
    position: absolute;
    top:40px;
    right:60px;margin-left: -300px;text-align: right;}
  .container .entry .entry-a{display: inline-block; vertical-align: middle;width: auto;}
  .container .entry .entry-a img,
  .container .entry .entry-a span,
  .container .entry .entry-a i{display: inline-block;vertical-align: middle;}
  .container .entry .entry-a img{  width:24px; height:24px; margin-right: 15px;}
  .container .entry .entry-a span{ color: #fff;font-size: 16px;}
  .container .entry .entry-a i{margin-right:15px;}
  .container .entry .entry-a .bar{margin: 0 40px;}
  .container .entry .entry-a .arrow-up{
    width: 0;
    height:0;
    border-width:6px;
    border-style:solid;
    border-color: transparent transparent #ffffff transparent;
  }
  .container .entry .entry-a .arrow-down{
    width: 0;
    height:0;
    border-width:6px;
    border-style:solid;
    margin-top: 10px;
    border-color:#ffffff  transparent transparent  transparent;
  }
  .container .entry .pop-out{
    width:100%;
    height:auto;
    text-align: right;
    margin-top: 15px;
  }
  .container .entry .pop-out span{
    background-color: rgba(0,1,20,0.7);
    border:1px solid rgba(255,255,255,0.3);
    display: block;
    width:150px;
    text-align: center;
    color: #fff;
    font-size: 16px;
    padding:8px 0;
    margin-left: calc(100% - 140px);
  }
  .container .entry-box{
    position: absolute;
    left:50%;
    top:50%;margin-top: -215px;
    margin-left: -555px;
    width:1110px;
    height:430px; text-align: center;
  }
  .entry-box .line1{margin-bottom: 20px;}
  .entry-box .line1,
  .entry-box .line2{width:100%; height:auto; max-height: 341px;overflow-x: hidden;overflow-y: auto;}
  .container .entry-box .line1{text-align: left;}
  .line1 .box-a,
  .line2 .box-a{display: inline-block;vertical-align: middle;height: 100%; text-align: center;}
  .line1 .box-a:hover,
  .line2 .box-a:hover{text-decoration: none;}
  .line1 .box-a{ width:21.5%;}
  .line1 .box-a:nth-child(2), .line1 .box-a:nth-child(3), .line1 .box-a:nth-child(4){margin-left: 4.5%;}
  .line2 .box-a{width:30%; height:150px;}
  .container .entry-box .line2 p{width:90%;margin:0 auto; text-align: left; color: #99ebff;font-size: 20px; padding:15px 0 0 0;}
  .line1 .box-a img,.line1 .box-a span,
  .line2 .box-a img,.line2 .box-a span{display:block;}
  .line1 .box-a img{width:70px;margin: 40px auto 0 auto;}
  .line2 .box-a img{ width:70px;margin: 10px auto 0 auto;}
  .line1 .box-a span{color: #99ebff;font-size: 26px; width: 100%; padding: 15px 0;}
  .line2 .box-a span{color: #99ebff;font-size: 24px;width:100%;}

  /*登录部分*/
  .log-bg{
    position: absolute;
    top:0;
    left:calc(100% - 26.5%);
    right: 0;
    width: 26.5%;
    min-width: 400px;
    height:100vh;
    background-color: rgba(0,0,0,0.3);
  }
  .log-bg .media{
    width: 100%;
    height:50%;
    margin-top:-150px;
  }
  .log-bg .log-box{
    width:300px;
    margin: 0 auto;
    height:300px;
  }
  .log-bg .log-box p:first-child{
    color: #ffffff;font-size: 22px;padding:20px 0;
  }
  .log-bg .log-box .put-box{
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
    padding:0 0 0 15px;
    color: #a7a7a7;
    font-size: 18px;
    height: 49px;
  }
  .log-bg .log-box .put-select{
    width: 100%;
    height:auto;
    margin-top: 20px;
  }
  .put-select a{
    display: inline-block;
    vertical-align: middle;
    width:48%;
    color: #ffffff;
    font-size: 14px;
  }
  .put-select a:first-child .select-box,
  .put-select a:first-child span{
    display: inline-block;
    vertical-align: middle;
  }
  .put-select a:first-child .select-box{
    width: 14px;
    height:14px;
    margin-right: 10px;
  }
  .put-select a:last-child span{
    display: block;
    width: 100%;
    text-align: right;
  }
  .log-bg .log-box .alert-box{
    width: 100%;text-align: right;
    height:auto;
    color: #ff0;font-size: 12px;
    padding:6px 0;
  }
  .log-bg .log-box .log-in{
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
</style>

