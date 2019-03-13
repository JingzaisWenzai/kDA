<template>
    <div class="left_menu">
      <div class="left_menu_show" @click="hideMenu">
        <div :class="showMenuClass"></div>
      </div>
      <div class="left_menu_content">
        <ul>
          <li v-for="(item,index) in menu" :key="index">
            <a :href="item.url" target="_self" style="text-decoration: none;">
              <div class="img" :style="{background:'url('+item.img+') center no-repeat;'}"></div>
              <div>{{item.name}}</div>
            </a>
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
  export default {
    name: 'leftMenu',
    props: [],
    components: {},
    data() {
      return {
        menu:[
          {name:'平台门户',img:'../../web/img/eco/menu/2-0.png',url:'/web/portal-comp/'},
          {name:'大屏汇报分系统',img:'../../web/img/eco/menu/2-1.png',url:'http://10.190.55.60:18080/analystui'},
          {name:'运行展现分系统',img:'../../web/img/eco/menu/2-2.png',url:'/web/yxzxVSyjzx/block-data'},
          {name:'预警中心系统',img:'../../web/img/eco/menu/2-3.png',url:'/web/yxzxVSyjzx/yjzx'},
          {name:'城市体征分系统',img:'../../web/img/eco/menu/2-4.png',url:'/web/subjectServers'},
          {name:'安全隐患一张图',img:'../../web/img/eco/menu/2-5.png',url:'/web/OneMap/SecMap'},
          {name:'生态环境一张图',img:'../../web/img/eco/menu/2-6.png',url:'/web/OneMap/EcoMap'},
          {name:'公共卫生一张图',img:'../../web/img/eco/menu/2-7.png',url:'/web/weiji'},
        ],
        showMenu:true,
        showMenuClass:'left_menu_show_left'
      }
    },
    mounted() {

    },
    methods: {
      hideMenu(){
        if(this.showMenu === true){
          // 安全隐患一张图
          if(document.getElementsByClassName('right-bar')[0]!==undefined){
            document.getElementsByClassName('right-bar')[0].style.right = '0px';
          }
          // 运行展现
          if(document.getElementsByClassName('right_bar')[0]!==undefined){
            document.getElementsByClassName('right_bar')[0].style.right = '20px';
          }
          if(document.getElementsByClassName('gis_bar')[0]!==undefined){
            document.getElementsByClassName('gis_bar')[0].style.right = '20px';
          }
          //预警中心
          if(document.getElementsByClassName('YjzxTop')[0]!==undefined){
            document.getElementsByClassName('YjzxTop')[0].style.marginRight = '35px';
          }
          //城市体征面
          if(document.getElementsByClassName('subjectServersRight')[0]!==undefined){
            document.getElementsByClassName('subjectServersRight')[0].style.right = '0px';
          }
          //生态环境
          if(document.getElementsByClassName('pop_right')[0]!==undefined){
            document.getElementsByClassName('pop_right')[0].style.right = '0px';
          }
          //公共卫生
          if(document.getElementsByClassName('weiji_right')[0]!==undefined){
            document.getElementsByClassName('weiji_right')[0].style.right = '0px';
          }
          this.showMenu = false
          this.showMenuClass = 'left_menu_show_right'
          document.getElementsByClassName('left_menu_content')[0].style.width = '0px'
        }else{
          // 安全隐患一张图
          if(document.getElementsByClassName('right-bar')[0]!==undefined){
            document.getElementsByClassName('right-bar')[0].style.right = '80px';
          }
          // 运行展现
          if(document.getElementsByClassName('right_bar')[0]!==undefined){
            document.getElementsByClassName('right_bar')[0].style.right = '80px';
          }
          if(document.getElementsByClassName('gis_bar')[0]!==undefined){
            document.getElementsByClassName('gis_bar')[0].style.right = '80px';
          }
          //预警中心
          if(document.getElementsByClassName('YjzxTop')[0]!==undefined){
            document.getElementsByClassName('YjzxTop')[0].style.marginRight = '80px';
          }
          //城市体征面
          if(document.getElementsByClassName('subjectServersRight')[0]!==undefined){
            document.getElementsByClassName('subjectServersRight')[0].style.right = '80px';
          }
          //生态环境
          if(document.getElementsByClassName('pop_right')[0]!==undefined){
            document.getElementsByClassName('pop_right')[0].style.right = '80px';
          }
          //公共卫生
          if(document.getElementsByClassName('weiji_right')[0]!==undefined){
            document.getElementsByClassName('weiji_right')[0].style.right = '80px';
          }
          this.showMenu = true
          this.showMenuClass = 'left_menu_show_left'
          document.getElementsByClassName('left_menu_content')[0].style.width = '80px'
        }
      }
    },
    beforeDestroy() {

    }
  }
</script>

<style lang="scss" scoped>
.left_menu{
  /*width: 100px;*/
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  .left_menu_show{
    background: url("../../static/img/eco/menu/close.png") center no-repeat;
    width: 20px;
    height: 100%;
    cursor: pointer;
    div{
      width: 100%;
      height: 100%;
    }
    .left_menu_show_right{
      background: url("../../static/img/eco/menu/right_09.png") center no-repeat;
    }
    .left_menu_show_left{
      background: url("../../static/img/eco/menu/left_09.png") center no-repeat;
    }
  }
  .left_menu_content{
    width: 80px;
    /*background: url("../../static/img/eco/menu/background.png") center;*/
    height: 100%;
    /*position: absolute;*/
    /*top: 0;*/
    /*left: 20px;*/
    position: relative;
    top: -1080px;
    margin-left: 20px;
    overflow: hidden;
    background: linear-gradient(270deg,#001521,rgba(3, 32, 80, 0.3));
    ul{
      padding:112px 0;
      li{
        list-style: none;
        display: inline-block;
        cursor: pointer;
        height: 107px;
        .img{
          height: 30px;
        }
        div{
          color: white;
          font-size: 16px;
          margin: 8px;
          text-align: center;
        }
      }
    }
  }
}
</style>
