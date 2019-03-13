<template>
  <div class="protall_container">
    <div class="protall">
      <a   @click="toOpenOrCollapse" title="门户"><img src="../../../static/img/yjzx/yjzx_2.png"/></a>
    </div>
    <div class="protall_pop" v-show="subNav==='open'">
      <i class="arrow"></i>
      <div class="nav_box" :class="[{marginTop30:index===0} , {marginBottom30:index===navBths.length-1}]" v-for="(item,index) in navBths" :key="index">
        <a class="level1" v-if="!item.subBtns" @click="See(item.url)"><img :src="item.src"/><span>{{item.txt}}</span></a>
        <div v-else class="foldBox">
          <a class="level2" @click ='toOpenSub'><img :src="item.src"/><span>{{item.txt}}</span><span  :class="showSub==='open'?'open' :'close'"></span></a>
          <div class="sub_btn" v-show="showSub==='open'">
            <a v-for="(ite , ind) in item.subBtns" :key = 'ind' @click="See(ite.url)"><span >{{ite.txt}}</span></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
  .protall_container{position:absolute;width: 100%;height:100%;}
  .protall{width:100%;height: 100%;}
  .protall img{width:101px; height:54px;}

  /*导航部分下拉窗*/
  .protall_pop{
    position: absolute;
    top:80px;
    display: block;
    right: 0;
    border:1px solid #3988ea;
    width:300px;
    height:auto;
    background-color: rgba(0,25,42,0.7);
    -webkit-border-radius: 6px;
    -moz-border-radius:6px;
    border-radius:6px; z-index: 2000;
  }
  .protall_pop i.arrow{
    position: absolute;
    top:0;
    right:50px;
    margin-top: -10px;
    display: block;
    width:0;
    height:0;
    border-width: 15px;
    border-bottom:10px solid #3988ea;
    border-right:10px solid transparent;
    border-left: 10px solid transparent;
  }
  .protall_pop .nav_box{
    width: 85%;
    margin:0 auto;
    text-align: left;
    position: relative;
  }
  .a .protall_pop .marginTop30{
    margin-top: 20px;
  }
  .a .protall_pop .marginBottom30{
    margin-bottom: 15px;
  }
  .protall_pop .nav_box .level1{
    border-bottom: 1px solid #133c65;
    display: block;
  }

  .protall_pop .nav_box .level1 img,  .protall_pop .nav_box .level1 span,
  .protall_pop .nav_box .foldBox .level2 img, .protall_pop .nav_box .foldBox .level2 span{
    display: inline-block;
    vertical-align: middle;
  }
  .protall_pop .nav_box .level1 img,
  .protall_pop .nav_box .foldBox .level2 img{width: 24px; height:24px; margin-right: 30px;}
  .protall_pop .nav_box .level1 span{
    width:auto;
    color: #e1eaff;
    font-size: 20px;
    padding:10px 0 0 0;
  }
  .protall_pop .nav_box .foldBox .level2 span,
  .protall_pop .nav_box .foldBox .sub_btn a{
    color: #e1eaff;
    font-size: 20px;
    padding:10px 0 0 0;
  }
  .protall_pop .nav_box .foldBox .level2 span.close{
    margin-left: 50px;
    width: 14px;
    height:14px;
    background: url('../../../static/img/yjzx/arrow-down.png') center no-repeat;
    background-size: contain;
  }
  .protall_pop .nav_box .foldBox .level2 span.open{
    margin-left: 50px;
    width: 14px;
    height:14px;
    background: url('../../../static/img/yjzx/arrow-up.png') center no-repeat;
    background-size: contain;
  }
  .protall_pop .nav_box .foldBox .sub_btn a{
    display: block;
    width:auto;
    margin-left: 54px;
  }
  .protall_pop .nav_box .foldBox .sub_btn a:hover,
  .protall_pop .nav_box .foldBox .level2:hover{
    text-decoration: none;
  }
</style>
<script>
  import portal from '../../../static/img/yjzx/portal.png';
  import city from '../../../static/img/yjzx/city.png';
  import show from '../../../static/img/yjzx/show.png';
  import alert from '../../../static/img/yjzx/alert.png';
  import special from '../../../static/img/yjzx/special.png';
  import bigScreen from '../../../static/img/yjzx/bigScreen.png';

  export default{
      data(){
          return{
            navBths:[
              {txt:'平台门户',url:'http://10.190.55.58:8081/web/yxzxVSyjzx/',src:portal},
              {txt:'大屏汇报分系统',url:'http://10.190.55.60:18080/analystui',src:bigScreen},
              {txt:'运行展现分系统',url:'http://10.190.55.58:8081/web/yxzxVSyjzx/block-data',src:show},
              {txt:'预警监测分系统',url:'http://10.190.55.58:8081/web/yxzxVSyjzx/yjzx',src:alert},
              {txt:'城市体征分系统',url:'http://10.190.55.58:9210/',src:city},
              {txt:'专题应用',src:special,subBtns:[
                {txt:'安全隐患一张图',url:'http://10.190.55.58:8081/web/yxjc/aqyh.html'},
                {txt:'生态环境一张图',url:'http://10.190.55.58:8081/web/OneMap/EcoMap/'},
                {txt:'卫计一张图',url:'http://10.190.55.58:8081/web/yxjc/wj.html'}
              ]}
            ],
            showSub:'close',  /*控制专题应用展开*/
            subNav:'close'    /*控制下拉导航展开*/
          }
      },
      methods:{
        See:function(url){
          window.location.href = url;
        },
        toOpenOrCollapse:function(){
          let  oSub= this.subNav;
          if( oSub==='open'){
            this.subNav ='close';
          }else{
            this.subNav ='open';
          }
        },
        toOpenSub:function(){
          let  oSub= this.showSub;
          if( oSub==='open'){
            this.showSub ='close';
          }else{
            this.showSub ='open';
          }
        }
      }
  }
</script>
