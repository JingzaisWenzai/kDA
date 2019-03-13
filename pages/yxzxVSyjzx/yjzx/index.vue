<template>
  <section class="container">
    <div class="map">
      <iframe id="iframeGisMap" src="../../../web/gis/index.html" width="100%" height="100%">
        <!--<img src="../static/img/yxzx_7.jpg"/>--></iframe>
      <yjzx-top></yjzx-top>
      <today-early-warning :type="type"></today-early-warning>
      <component  :type="type" :is="earlyWarningComponents"></component>
      <yjzx-foot></yjzx-foot>
      <left-menu></left-menu>
    </div>
    <!--改变地图底图-->
    <div class="change_map">
      <change-map></change-map>
    </div>
    <span class="showDutyTable" style="cursor: pointer;
    color: #a2d0ec;
    font-size: 20px;
    position: absolute;
    top: 30px;
    font-weight: bold;
    right: 20px;" @click="openDutyTable(!showDutyTable)">展示值班表</span>
    <div v-if="showDutyTable" style="display: inline-block;position: absolute;top: 60px;right: 20px;">
      <duty-table @opensetUpDutyTable="openSetUpDutyTable"></duty-table>
    </div>
    <div v-if="showsetUpDutyTable" style="width: 100%;height: 1080px;background-color: rgba(2, 22, 35, 0.8);position: absolute;top: 0;">
      <div style="width: 1040px;background-color: rgba(2, 22, 35, 0.8);box-shadow: 0 0 5px #1c609d;border: 1px solid #1c609d;border-radius: 5px;position: relative;margin: auto;top: 80px;padding-bottom: 20px;">
        <set-up-duty-table @opensetUpDutyTable="openSetUpDutyTable"></set-up-duty-table>
      </div>
    </div>
  </section>
</template>

<script>
  import YjzxTop from '../../../components/yjzx/YjzxTop.vue';
  import TodayEarlyWarning from '../../../components/yjzx/TodayEarlyWarning.vue';
  import EarlyWarningInformation from '../../../components/yjzx/EarlyWarningInformation.vue';
  import EarlyWarningTrend from '../../../components/yjzx/EarlyWarningTrend.vue';
  import YjzxFoot from '../../../components/yjzx/YjzxFoot.vue';
  import bus from '../../../assets/js/main'
  import {alarmcenter_type} from '../../../api/yjzx'
  import leftMenu from '../../../components/common/leftMenu' //导航栏
  import ChangeMap from '../../../components/common/Map/ChangeMap.vue';//深浅地图切换
  import dutyTable from '../../../components/yjzx/dutyTable/dutyTable'
  import setUpDutyTable from '../../../components/yjzx/dutyTable/setUpDutyTable'

  export default {
    layout:'yujinjiance',
    head() {
      return {
        title: "预警中心",
        meta: [
          {hid: 'description', name: 'description', content: '预警中心'},
          {hid: 'keywords', name: 'keywords', content: '预警，中心'}
        ]
      }
    },
    data() {
      return {
        earlyWarningComponents:'',
        type:null,
        showDutyTable:false,
        showsetUpDutyTable:false
      }
    },
    mounted(){
      bus.$on('earlyWarning', this.earlyWarning)
      this.getType()
    },
    methods:{
      openSetUpDutyTable(status){
        this.showsetUpDutyTable = status
        console.log(status)
        if(status === true){
          this.showDutyTable = false
        }else {
          this.showDutyTable = true
        }
      },
      openDutyTable(status){
        let node = document.getElementsByClassName('showDutyTable')[0]
        if(status){
          node.innerHTML = '收起值班表'
        }else {
          node.innerHTML = '展示值班表'
        }
        this.showDutyTable = status
      },
      earlyWarning(component){
        this.earlyWarningComponents = component
      },
      getType(){
        let $this = this
        alarmcenter_type().then(function(data) {
          let temp = {}
          for(let i = 0,j = data.length;i<j;i+=1){
            temp[data[i].code] = data[i]
          }
          $this.type = {
            code:temp,
            data:data
          }
        })
      }
    },
    asyncData(context) {
      return {}
    },
    components: {
      YjzxTop,
      TodayEarlyWarning,
      EarlyWarningInformation, /*预警信息中心*/
      EarlyWarningTrend, /*预警趋势分析*/
      YjzxFoot,                        /*时间轴*/
      leftMenu,
      ChangeMap,
      dutyTable,
      setUpDutyTable
    }
  }
</script>
<style scoped>
  @import url('../../../assets/css/reset.css');

  .map {
    width: 100%;
    min-width: 1920px;
    /*width: 3840px;*/
    height: 1080px;
    text-align: center;
    margin: 0px auto;
    overflow: hidden;
    position: relative;
  }
  .change_map{
    position: absolute;
    z-index: 1000;
    bottom: 15px;
    right: 100px;
    width: 128px;
    height: 62px;
  }

  /*  *, *:before, *:after {
      box-sizing:unset;
    }*/
</style>
