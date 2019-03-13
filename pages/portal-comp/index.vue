<template>
  <section class="container">
    <div class="title">
      <img :src="header.tit.url" />
      <span>{{header.tit.txt}}</span>
    </div>
    <div>
      <div class="entry">
        <a target="_blank" :href="header.backStage.url" class="entry-a" v-if="user.authority === 'admin'"><img :src="header.backStage.src"><span>{{header.backStage.txt}}</span><span class="bar">|</span></a>
        <!--<nuxt-link :to="header.backStage.url" class="entry-a" v-if="user.authority === 'admin'"><img :src="header.backStage.src"><span>{{header.backStage.txt}}</span><span class="bar">|</span></nuxt-link>-->
        <nuxt-link :to="header.admin.url" class="entry-a"><img :src="header.admin.src"><i  @click="toPop" :class="userInfoPop==='on'?'arrow-up':'arrow-down'"></i><span>{{header.admin.txt}}</span></nuxt-link>
        <div class="pop-out" v-if="userInfoPop==='on'"><span @click="toPopOut">{{header.pop.txt}}</span></div>
      </div>
      <div class="entry-box">
        <div class="line1">
          <!--<nuxt-link v-for="(item,index) in context.line1" :to="item.url" :key="index" class="box-bg box-a"><img :src="item.src" /><span>{{item.txt}}</span></nuxt-link>-->
          <a @click="See(item.url)" v-for="(item,index) in context.line1" :key="index" class="box-bg box-a"><img :src="item.src" /><span>{{item.txt}}</span></a>
        </div>
        <div class="box-bg line2">
          <p>{{context.tit}}</p>
          <!--<nuxt-link :to="item.url" v-for="(item,index) in context.line2" :key="index" class="box-a"><img :src="item.src" /><span>{{item.txt}}</span> </nuxt-link>-->
          <a @click="See(item.url)" v-for="(item,index) in context.line2" :key="index" class="box-a"><img :src="item.src" /><span>{{item.txt}}</span> </a>
        </div>
      </div>
    </div>

  </section>
</template>
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
  .box-bg{background-color: rgba(0,1,20,0.7) !important; box-shadow:0 0  3px #0059c6;border-width: 0 !important;}
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
    cursor: pointer;
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
<script>
  import futianIco from '../../static/img/portal/futian.png';
  import backStageIco from '../../static/img/portal/backStageIco.png';
  import adminIco from '../../static/img/portal/adminIco.png';
  import man from '../../static/img/portal/man.png';
  import pwd from '../../static/img/portal/lock.png';
  import displayIco from '../../static/img/portal/displayIco.png';
  import alertIco from '../../static/img/portal/alertIco.png';
  import cityIco from '../../static/img/portal/cityIco.png';
  import safetyIco from '../../static/img/portal/safetyIco.png';
  import envIco from '../../static/img/portal/envIco.png';
  import hygieneIco from '../../static/img/portal/hygieneIco.png';

  import {removeToken} from '../../utils/auth'

  export default{
    layout:'yujinjiance',
    head(){
      return {
        title:'预警监测平台-门户' ,
        meta:[
          {hid:'description',name:'descriptyion',content:'预警监测平台'},
          {hid:'keywords',name:'keywords',content:'预警监测平台-门户'}
        ]
      }
    },
    data(){
      return {
          header:{
              tit:{url:futianIco,txt:'预警监测平台'},
              backStage:{  url:'/admin/userManagement/userSettings',src:backStageIco,txt:'管理平台'},
              admin:{url:'',src:adminIco, txt:'admin' },
              pop:{txt:'退出登录'}
          },
          context:{
              line1:[
                {src:cityIco,txt:'大屏汇报分系统',url:'http://10.190.55.60:18080/analystui'},
                {src:displayIco,txt:'运行展现分系统',url:'/web/yxzxVSyjzx/block-data'},
                {src:alertIco,txt:'预警监测分系统',url:'/web/yxzxVSyjzx/yjzx'},
                {src:cityIco,txt:'城市体征分系统',url:'/web/subjectServers'}
              ],
              line2:[
                {src:safetyIco,txt:'安全隐患一张图',url:'/web/OneMap/SecMap/'},
                {src:envIco,txt:'生态环境一张图',url:'/web/OneMap/EcoMap/'},
                {src:hygieneIco,txt:'卫计一张图',url:'/web/yxjc/wj.html'}

              ],
            tit:'专题应用'
          },
          log:{
              tit:'密码登录',
              box:[
                  {url:man,txt:'请输入用户名',oId:'user',msg:''},
                  {url:pwd,txt:'请输入您的密码',oId:'pwd',msg:''}
              ],
              btn:{forget:'忘记密码',remember:'记住密码'},
              txt:'登录',
              alertMsg:''
          },
          forget:'no',
          userInfoPop:'no',  /*on 和 off象征着用户信息弹窗开与关*/
          user:{
              name:'admin',
            authority:'admin'
          }
      }
    },
    computed:{

    },
    methods:{
      toPop:function(){
          if(this.userInfoPop === 'on'){
            this.userInfoPop = 'no';
          }else{
            this.userInfoPop ='on';
          }
      },
      toPopOut:function(){
          alert('登出');
          this.user.authority ='';
          removeToken()
        this.$router.push('/login/')
      },
      See:function(url){
          window.location.href = url;
      }
    },
    components:{

    }
  }
</script>

