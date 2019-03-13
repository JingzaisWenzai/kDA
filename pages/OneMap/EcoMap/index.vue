<template>
  <section class="eco_container">
    <iframe id="iframeGisMap" class="iframeStyle" :src="iframeBox.url">
      <!--<img src="../static/img/yxzx_7.jpg"/>--></iframe>
    <div class="top_bar">
      <top-bar :alert-info="alertInfo" :tit-msg='title'></top-bar>
    </div>
    <div class="select_add">
      <select-address2></select-address2>
    </div>
    <div class="bottom_bar">
      <bottom-bar :nav-msg='navData'></bottom-bar>
    </div>

    <div class="pop_com" v-show="showenv ==='yes'">
      <pop-com @dotBar="toCloseDot"></pop-com>
    </div>

    <!--<div class="pop_right"  v-if="rightPopChart!=''"><div class="pop_cont"><pop-vertical :pop-info ='rightPop'></pop-vertical></div></div>-->
    <div class="pop_right">
      <component :is="bi"></component>
    </div>
    <left-menu></left-menu>
    <!--改变地图底图-->
    <div class="change_map">
      <change-map></change-map>
    </div>
  </section>
</template>
<script>
  import { InternetOfThings, toGetInfoBoxData } from '../../../static/js/OneMap/InfoList/getClickedPid'
  import { getPOI } from '../../../api/secapi'

  import TopBar from '../../../components/OneMap/Common/Top/TopBar.vue'
  import BottomBar from '../../../components/OneMap/Common/Bottom/BottomBar.vue'
  import PopCom from '../../../components/OneMap/Eco/PopCom.vue'
  import PopVertical from '../../../components/OneMap/Common/Pop/PopVertical.vue'
  import selectAddress2 from '../../../components/OneMap/aqyh/selectAddress.vue'
  import water from '../../../static/img/eco/water.png'
  import water_hover from '../../../static/img/eco/water_hover.png'
  import weather from '../../../static/img/eco/weather.png'
  import weather_hover from '../../../static/img/eco/weather_hover.png'
  import noise from '../../../static/img/eco/noise.png'
  import noise_hover from '../../../static/img/eco/noise_hover.png'
  import dust from '../../../static/img/eco/dust.png'
  import dust_hover from '../../../static/img/eco/dust_hover.png'
  import black from '../../../static/img/eco/lampblack.png'
  import black_hover from '../../../static/img/eco/lampblack_hover.png'
  import river from '../../../static/img/eco/river.png'
  import river_hover from '../../../static/img/eco/river_hover.png'
  import waterlogging from '../../../static/img/eco/waterlogging.png'
  import waterlogging_hover from '../../../static/img/eco/waterlogging_hover.png'
  import blowdown from '../../../static/img/eco/blowdown.png'
  import blowdown_hover from '../../../static/img/eco/blowdown_hover.png'
  import construction from '../../../static/img/eco/construction.png'
  import construction_hover from '../../../static/img/eco/construction_hover.png'
  import wastewater from '../../../static/img/eco/wastewater.png'
  import wastewater_hover from '../../../static/img/eco/wastewater_hover.png'

  import environmen_air from '../../../components/OneMap/Eco/BI/Environment_air'
  import environmen_water from '../../../components/OneMap/Eco/BI/Environment_water'
  import bus from '../../../assets/js/main'

  import leftMenu from '../../../components/common/leftMenu'//导航栏
  import ChangeMap from '../../../components/common/Map/ChangeMap.vue';//深浅地图切换

  export default {
    layout: 'yujinjiance',
    head() {
      return {
        title: '生态环境一张图',
        meta: [
          { hid: 'description', name: 'description', content: '生态环境一张图' },
          { hid: 'keywords', name: 'keywords', content: '水质、空气、预警' }
        ]
      }
    },
    data() {
      return {
        title: { txt: '生态环境一张图', type: '1' },
        iframeBox: { url: '../../../web/gis/index.html' },
        navData: {
          oid: 'eco',
          data: [
            {
              txt: '环境监测点', name: 'shengtaihuanjing', src: water, hover: water_hover, data: [
                { txt: '水质', name: '地表水', src: water, hover: water_hover, dotType: 'water' },
                { txt: '空气', name: '空气质量', src: weather, hover: weather_hover, dotType: 'air' },
                { txt: '污染源', name: '污染源', src: black, hover: black_hover, dotType: 'pollution' }
                /*  {txt:'噪音',name:'噪声',src:noise,hover:noise_hover,dotType:'noise'},
                  {txt:'工厂扬尘',name:'工厂扬尘',src:dust,hover:dust_hover,dotType:'dust'},
                  {txt:'油烟',name:'餐饮油烟',src:black,hover:black_hover,dotType:'lampblack'}*/
              ]
            },
            {
              txt: '视频监测', name: 'video_tag', src: water, hover: water_hover, data: [
                { txt: '河道', name: '河道', src: river, hover: river_hover },
                { txt: '易涝点', name: '易涝点', src: waterlogging, hover: waterlogging_hover },
                { txt: '排污口', name: '排污口', src: blowdown, hover: blowdown_hover },
                { txt: '工地', name: '工地', src: construction, hover: construction_hover },
                {
                  txt: '监测站', name: '监测站', src: wastewater, hover: wastewater_hover, sub: [
                    { txt: '空气监测站', name: '空气监测站', src: wastewater, hover: wastewater_hover },
                    { txt: '水质监测站', name: '水质监测站', src: wastewater, hover: wastewater_hover },
                    { txt: '污染源监测站', name: '污染源监测站', src: wastewater, hover: wastewater_hover }
                  ]
                }
              ]
            },
            {
              txt: '环境治理分析', name: 'analysis', src: water, hover: water_hover, data: [
                /*
                  {txt:'水质',name:'water',src:water,hover:water_hover},
                  {txt:'空气',name:'weather',src:weather,hover:weather_hover},
                  {txt:'噪音',name:'noise',src:noise,hover:noise_hover},
                  {txt:'工厂扬尘',name:'dust',src:dust,hover:dust_hover},
                  {txt:'油烟',name:'black',src:black,hover:black_hover}
                */
              ]
            }
          ]
        },
        alertInfo: {
          val: '6',
          thData: ['序号', '预警对象', '预警内容', '时间'],
          tbData: [
            { degree: 'serious', data: ['xxx监测点', 'S02超标', '2018/9/19 10:17:00'] },
            { degree: 'serious', data: ['xxx监测点', 'S02超标', '2018/9/19 10:17:00'] },
            { degree: 'serious', data: ['xxx监测点', 'S02超标', '2018/9/19 10:17:00'] },
            { degree: 'middle', data: ['xxx监测点', 'S02超标', '2018/9/19 10:17:00'] }
          ]
        },
        rightPop: [
          {
            flag: '987780', /*标志位*/
            txt: '水质概况', type: 'bar', chartType: 'BarChart',
            title: [{ name: '福田河流水质状况（今日）' }],
            /*data:[
              {name:"PIP",data:[
                {time:"2018-05-21 08", value:"6.769571"},
                {time:"2018-05-21 09", value:"5.831968"},
                {time:"2018-05-21 10", value:"5.910587"},
                {time:"2018-05-21 11", value:"7.0316"},
                {time:"2018-05-21 12", value:"8.087934"},
                {time:"2018-05-21 13", value:"7.831135"},
                {time:"2018-05-21 14", value:"9.855078"},
                {time:"2018-05-21 15", value:"17.537237"},
                {time:"2018-05-21 16", value:"27.985298"},
                {time:"2018-05-21 17", value:"11.822769"},
                {time:"2018-05-21 18", value:"8.239529"}
              ]}
            ]*/
            data: [
              { value: 10, name: '综合' },
              { value: 5, name: '住宅' },
              { value: 15, name: '商业' },
              { value: 25, name: '仓库' },
              { value: 20, name: '办公' }
            ]
          },
          {
            flag: '945780', /*标志位*/
            txt: '预警统计', type: 'lineTxt', chartType: 'LineChart',
            title: [{ name: '现有预警（个）', val: '5' }, { name: '当日累计(个)', val: '176' }],
            data: [
              {
                name: '二氧化硫', data: [
                  { time: '2018-05-21 08', value: '6.769571' },
                  { time: '2018-05-21 09', value: '5.831968' },
                  { time: '2018-05-21 10', value: '5.910587' },
                  { time: '2018-05-21 11', value: '7.0316' },
                  { time: '2018-05-21 12', value: '8.087934' },
                  { time: '2018-05-21 13', value: '7.831135' },
                  { time: '2018-05-21 14', value: '9.855078' },
                  { time: '2018-05-21 15', value: '17.537237' },
                  { time: '2018-05-21 16', value: '27.985298' },
                  { time: '2018-05-21 17', value: '11.822769' },
                  { time: '2018-05-21 18', value: '8.239529' }
                ]
              }
            ]
          }, {
            flag: '009987780', /*标志位*/
            txt: '河长信息', title: [], type: 'line', chartType: 'TableChart',
            data: [
              {
                name: '深圳河', data: [
                  { name: '河段', value: '深圳河' }, { name: '河长', value: '张三' }, { name: '联系方式', value: '189****' }
                ]
              },
              {
                name: '深圳河', data: [
                  { name: '河段', value: '深圳河' }, { name: '河长', value: '张三' }, { name: '联系方式', value: '189****' }
                ]
              },
              {
                name: '深圳河', data: [
                  { name: '河段', value: '深圳河' }, { name: '河长', value: '张三' }, { name: '联系方式', value: '189****' }
                ]
              },
              {
                name: '深圳河', data: [
                  { name: '河段', value: '深圳河' }, { name: '河长', value: '张三' }, { name: '联系方式', value: '189****' }
                ]
              },
              {
                name: '深圳河', data: [
                  { name: '河段', value: '深圳河' }, { name: '河长', value: '张三' }, { name: '联系方式', value: '189****' }
                ]
              },
              {
                name: '深圳河', data: [
                  { name: '河段', value: '深圳河' }, { name: '河长', value: '张三' }, { name: '联系方式', value: '189****' }
                ]
              }
            ]
          }],
        bi: 'environmen_water'
      }
    },
    beforeDestroy(){
      bus.$off('selectBi')
    },
    beforeMount(){
      bus.$on('selectBi',this.selectBi)
    },
    mounted() {
      const oIframe = document.getElementById('iframeGisMap')
      this.toLoadPOI()
    },
    watch: {
      dot: {
        handler: function(val, oldVal) {
        },
        deep: true
      },
      showenv: {
        handler: function(val, oldVal) {
        },
        deep: true
      },
      listenshowdot: function(a, b) {    /*跟踪落点弹出窗*/
        console.log('为：' + this.$store.state.detailMessageId)   //落点id
        this.dot = 'basic'
      },
      rightPopChart: {
        handler: function(val, oldVal) {        /*修改右侧弹窗的数据*/
        },
        deep: true
      },
      detailPopupType: {
        handler: function(val, oldVal) {
          if (val !== '') {
            this.toGetThePopUpData(val)
          }
        },
        deep: true
      }
    },
    computed: {
      showenv() {
        return this.$store.state.ShowEnv
      },
      rightPopChart() {
        console.log(this.$store.state.rightPopChart)
        let name = this.$store.state.rightPopChart
        if(name === '地表水'){
          this.bi = 'environmen_water'
        }else if(name === '空气质量'){
          this.bi = 'environmen_air'
        }else {
          this.bi = ''
        }

        return this.$store.state.rightPopChart
      },
      listenshowdot() {
        return this.$store.state.flag
      },
      detailPopupType() {
        return this.$store.state.detailPopupType
      }
    },
    methods: {
      selectBi(type){
        this.bi = type
      },
      async toLoadPOI() {
        let data = await getPOI()
        let arr = data, res = []
        if (arr !== {}) {
          //{}==={} false[]===[] false
          if (arr.topGroupList && arr.topGroupList.length !== 0) {
            for (let m = 0; m < arr.topGroupList.length; m++) {
              let brr = arr.topGroupList[m], drr, a, b, c
              drr = []
              for (let j = 0; j < brr.topGroupTwoList.length; j++) {
                a = brr.topGroupTwoList[j]
                drr.push({
                  name: a.label,
                  layerid: a.id || 'null'
                })
              }
              res.push({
                name: brr.label,
                sub: [].concat(drr)
              })
            }
          } else {
            res = []
          }
        } else {
          res = []
        }
        this.$store.state.Search.POI = res
      },
      toCloseDot: function(val) {
        if (val === '') {
          this.$store.state.ShowEnv = 'no'
        }
      },
      async toGetThePopUpData(val) {
        if (val === 'ShowEnv') {
          if (this.$store.state.ShowEnv !== 'yes') {
            this.$store.state.ShowEnv = 'yes'
          }
        }
        this.$store.state.detailPopupType = ''
      }
    },
    components: {
      TopBar,
      BottomBar,
      PopCom,
      PopVertical,
      selectAddress2,
      environmen_air,
      environmen_water,
      leftMenu,
      ChangeMap
    }

  }


</script>
<style scoped>
  @import url('../../../assets/css/reset.css');

  .eco_container {
    margin: 0;
    padding: 0;
    border: 0;
    width: 3840px;
    height: 1080px;
    position: relative;
    background: transparent;
  }

  .iframeStyle {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }

  .select_add {
    position: absolute;
  }

  .top_bar {
    position: absolute;
    z-index: 1000;
    top: 0;
    left: 50%;
    width: 100%;
    height: 108px;
    margin-left: -50%;
  }

  .bottom_bar {
    position: absolute;
    top: 100%;
    margin-top: -80px;
    left: 50%;
    margin-left: -600px;
    width: 1200px;
    height: 60px;
    border: 1px solid transparent;
  }

  .pop_com {
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -500px;
    margin-top: -300px;
    width: 1190px;
    height: 600px;
  }

  .pop_right {
    position: absolute;
    /*left: 100%;*/
    right: 80px;
    top: 0;
    /*margin-left: -600px;*/
    width: 600px;
    height: 98%;
    background: linear-gradient(to left, #001521, rgba(13, 32, 42, 0.3));
  }

  .pop_right .pop_cont {
    width: 100%;
    height: calc(100% - 120px);
    margin-top: 90px;
  }
  .change_map{
    position:absolute;
    z-index: 1000;
    bottom:15px;
    left:15px;
    width:128px;
    height:62px;
  }
  /deep/ .left_menu .left_menu_content{
    background: linear-gradient(90deg, #001521, rgba(3, 32, 80, 0.3)) !important;
  }
</style>
