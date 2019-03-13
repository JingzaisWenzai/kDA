<template>
  <div class="m">
    <!--头部开始-->
    <!-- <img src="../../static/img/yjzx/yjzx_1.jpg"/>-->
    <!-- <iframe id="iframeGisMap" src="../../gis/index.html" width="100%" height="1000px" ><img src="../../static/img/yxzx_7.jpg"/></iframe>-->

    <div class="a">
      <div class="a_a">
        <img src="../../static/img/yjzx/yjzx_4.png"/>
      </div>
      <div class="a_b">
        <ul>
          <li class="a_b_a">
            <a target="" :class="[{b_c_b_a_click:currentTrend},{b_c_b_a_onclick:currentInfo},{a_onclick:noclick}]"
               @click="openTrend" href="javascript:void(0);" title="预警趋势分析">预警趋势分析</a>
          </li>
          <li class="a_b_b">
            <a target="" :class="[{b_c_b_a_click:currentInfo},{b_c_b_a_onclick:currentTrend},{a_onclick:noclick}]"
               href="javascript:void(0);" title="预警信息中心" @click="openInfo">预警信息中心</a>
          </li>
        </ul>
      </div>
      <div class="a_c">
        <protall-nav></protall-nav>
      </div>
      <!--<div class="a_c">
        <a   @click="toOpenOrCollapse" title="门户"><img src="../../static/img/yjzx/yjzx_2.png"/></a>
      </div>
      <div class="a_d" v-show="subNav==='open'">
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
      </div>-->

    </div>
  </div>
</template>
<script>
  import bus from '../../assets/js/main.js' ;
  import {mapState} from 'vuex';
  import NuxtLink from "../../.nuxt/components/nuxt-link";
  import ProtallNav from '../../components/common/ProtallNav.vue';

  export default {
    components: {
      NuxtLink,
      ProtallNav
    },
    data: function () {
      return {
        currentTrend: false,
        currentInfo: false,
        noclick: true
      }
    },
    mounted() {
      if(document.body.clientWidth<1920){
        // document.getElementsByClassName('a_b')[0].style
      }
    },
    /* computed:{
       counter () {
         return this.$store.state.counter;
       }
     },*/
    computed: mapState({
      // 箭头函数可使代码更简练
      counter: state => state.counter
    }),
    methods: {
      openTrend: function () {
        bus.$emit("openInfo", "");
        bus.$emit("openTrend", "futian");
        this.noclick = false;
        this.currentInfo = false;
        this.currentTrend = true;
      },
      openInfo: function () {
        bus.$emit("openTrend", "");
        bus.$emit("openInfo", "futian");
        this.noclick = false;
        this.currentTrend = false;
        this.currentInfo = true;
      }
    }
  }
</script>
<style scoped>
  .a {
    width: 100%;
    /*width: 3840px;*/
    height: 128px;
    text-align: left;
    margin: 0px auto;
    position: absolute;
    top: 0px;
    left: 0px;
  }

  .a_a {
    width: 85%;
    height: 128px;
    text-align: center;
    /* margin: 0px 60px 0px 654px; */
    /* float: left; */
    display: inline-block;
    margin-left: 7%;
    overflow: hidden;
  }

  .a_a img {
    /*width: 2332px;*/
    width: 100%;
    height: 128px;
  }

  .a_b {
    width: 514px;
    /* height: 128px; */
    text-align: left;
    margin: 0px 35px;
    /* float: left; */
    float: right;
    display: inline;
    overflow: hidden;
  }

  .a_b ul {
    width: 514px;
    /* height: 56px; */
  line-height: 56px;
    text-align: left;
    /*margin: 20px auto 52px;*/
    overflow: hidden;
  }

  .a_b ul li {
    cursor:pointer;
    width: 247px;
    height: 56px;
    line-height: 56px;
    text-align: left;
    margin: 0px auto;
    float: left;
    display: inline;
    overflow: hidden;
  }

  .a_b ul li:nth-child(1) {
    margin-right: 20px;
  }

  .a_b ul li a {
    width: 247px;
    height: 56px;
    line-height: 56px;
    text-decoration: none;
    display: block;
    text-align: center;
    background: url('../../static/img/yjzx/yjzx_5.png') no-repeat;
    font-size: 30px;
  }

  .a_b ul li a:hover, .a_b ul li a:active {
    width: 247px;
    height: 56px;
    line-height: 56px;
    text-decoration: none;
    display: block;
    text-align: center;
    background: url('../../static/img/yjzx/yjzx_6.png') no-repeat;
    font-size: 30px;
    color: #ffab27
  }

  .a_c {
    width: 101px;
    height: 54px;
    line-height: 54px;
    text-align: left;
    margin: 0;
    position: absolute;
    top: 20px;
    display: block;
    right: 40px;
    background-color: transparent;
    border-bottom: transparent;
  }

  .b_c_b_a_click {
    color: #ffab27;
  }

  .b_c_b_a_onclick {
    color: #e1eaff;
  }

  .a_onclick {
    color: #e1eaff;
  }

</style>
