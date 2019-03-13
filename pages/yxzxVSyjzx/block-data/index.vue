<template>
  <section class="container">
    <iframe id="iframeGisMap" class="iframeStyle" :src="iframeBox.url">
      <!--<img src="../static/img/yxzx_7.jpg"/>--></iframe>
    <my-header></my-header>
    <div class="search_index">
      <search-index></search-index>
    </div>

    <!--地质隐患点---道路病害筛选框-->
    <div class="filter_box" v-if="roadDiseaseFilter">
      <filter-box :layerId="roadDiseaseLayerId"></filter-box>
    </div>

    <!-- block-data用于落图-->
    <!-- <div class="block-data bottom_bar" >
       <p v-for="(item,index) in bottomBar" :key='index' :class="barTit ===item.name ?'active' :''" @click="showBlock(item.name)">{{item.text}}</p>
     </div>-->

    <!--建筑隐患详情-->
    <div class="build_detail" v-if="barTit ==='block'">
      <pop-build @barTitChanged="toClose" :buildDetail="buildDetail"></pop-build>
    </div>
    <!-- <div class="video_detail" v-else-if="barTit ==='video'">
       <video-monitor @barTitChanged="toClose"></video-monitor>
     </div>-->

    <!--河口，监测站等根据类型而不同的弹窗-->
    <div class="building" v-if="dotType ==='监测站'">
      <dot-pop :my-type='popTpl' :dot-type="detailType" @toOpenDotDetail="toOpenDotDetail"></dot-pop>
    </div>
    <div class="estuary" v-if="dotType ==='河口'">
      <dot-pop :my-type='popTpl' :dot-type="detailType" @toOpenDotDetail="toOpenDotDetail"></dot-pop>
    </div>

    <!--右侧的工具导航栏-->
    <div class="gis_bar">
      <gis-tool></gis-tool>
    </div>
    <!--右侧的导航栏-->
    <div class="right_bar">
      <pop-nav @dotPopType="toOpenDot"></pop-nav>
    </div>

    <!--河口和监测站等不同类型的弹窗-->
    <div class="other_detail" v-if="dot !==''">
      <dot-detail :dot-type="dot" @dotBar="toCloseDot"></dot-detail>
    </div>

    <!--视频筛选框-->
    <div class="videoType" v-if="videoTypeFilter">
      <video-type :layerId="videoLayerId"></video-type>
    </div>

    <!--菜单栏-->
    <left-menu></left-menu>

    <!--改变地图底图-->
    <div class="change_map">
      <change-map></change-map>
    </div>
  </section>
</template>
<script>
  import MyHeader from '../../../components/yxzx/Common/HeaderBlock.vue'
  import FilterBox from '../../../components/yxzx/Block/FilterBox.vue'
  import PopBuild from '../../../components/yxzx/Block/PopBuild.vue'
  import PopNav from '../../../components/yxzx/Block/PopNav.vue'
  import VideoMonitor from '../../../components/yxzx/Block/VideoMonitor.vue'
  import DotPop from '../../../components/yxzx/Block/DotPop.vue'
  import DotDetail from '../../../components/yxzx/Block/DotDetail.vue'
  import SearchIndex from '../../../components/OneMap/Common/Search/SearchIndex.vue'
  import GisTool from '../../../components/yxzx/Gis/GisTools.vue'
  import videoType from '../../../components/yxzx/Block/videoType'
  import bus from '../../../assets/js/main'
  import { sendCircleSearchInfoFromeWeiWen } from '../../../utils/mapOption'
  import leftMenu from '../../../components/common/leftMenu'
  import ChangeMap from '../../../components/common/Map/ChangeMap.vue';//深浅地图切换

  export default {
    layout: 'yujinjiance',
    head() {
      return {
        title: '运行展现系统',
        meta: [
          { hid: 'description', name: 'description', content: '展示块数据信息' },
          { hid: 'keywords', name: 'keywords', content: '块数据信息' }
        ]
      }
    },
    data() {
      return {
        iframeBox: { url: '../../../web/gis/index.html' },
        bottomBar: [
          { text: '建筑块数据', name: 'block' },
          { text: '视频监控', name: 'video' }
        ],
        barTit: '',
        dotType: '',
        dot: '',
        odot: '',
        roadDiseaseFilter: false,
        buildDetail: {},
        videoTypeFilter: false,
        roadDiseaseLayerId: '',
        videoLayerId: '',
        imgs: ''
      }
    },
    mounted() {
      // const oIframe = document.getElementById('iframeGisMap');
      // monographicLayer.getData();                 //引入地图 加载配置文件
      window.openMapPopDetail = this.openMapPopDetail

      bus.$on('roadDiseaseFilter', this.toCloseFilterBox)
      bus.$on('videoTypeFilter', this.toCloseVideoType)
      // 维稳调用专用接口
      // window.weiWenloadSinglePoint = loadSinglePoint
      sendCircleSearchInfoFromeWeiWen(this)
    },
    beforeDestroy() {
      bus.$off('roadDiseaseFilter')
      bus.$off('videoTypeFilter')
    },
    computed: {
      popTpl: function() {
        let pop
        if (this.dotType === '河口') {
          pop = 'right-pic'
        } else if (this.dotType === '监测站') {
          pop = 'left-chart'
        } else {
          pop = ''
        }
        // alert(pop);
        return pop
      },
      detailType: function() {
        return this.odot
      }
    },
    watch: {
      // imgs(newValue,oldValue){
      //   let viewer = this.$el.querySelector('.images').$viewer
      //   console.log(viewer.element.innerHTML)
      //   viewer.show()
      // }
    },
    methods: {
      showBlock: function(name) {
        this.barTit = name
      },
      toClose: function(arg) {
        this.barTit = arg
      },
      toCloseDot: function(val) {
        this.dot = val
      },
      toOpenDot: function(type) {
        // if (type !== '') {
        //   if (type === 'air') {
        //     this.dotType = '监测站';
        //   } else if (type === 'water') {
        //     this.dotType = '河口';
        //   }
        //   this.odot = type;          //返回的点击按钮值
        // }
      },
      toOpenDotDetail: function(arg) {
        this.dot = arg
      },
      toCloseFilterBox: function(data) {
        this.roadDiseaseFilter = data.state
        this.roadDiseaseLayerId = data.id
      },
      toCloseVideoType(data) {
        console.log(data)
        this.videoTypeFilter = data.state
        this.videoLayerId = data.id
      },
      openMapPopDetail(data) {
        this.barTit = 'block'
        this.buildDetail = data
        console.log(this.buildDetail)
      }
    },
    components: {
      MyHeader,
      SearchIndex,
      FilterBox,
      PopBuild,
      PopNav,
      VideoMonitor,
      DotPop,
      DotDetail,
      GisTool,
      videoType,
      leftMenu,
      ChangeMap
    }
    /*asyncData ({ params, error }) {
     return axios.get(`api/posts/${params.id}`)
       .then((res) => {
         return { /!*name: res.data.name *!/ }
       })
       .catch((e) => {
         error({ statusCode: 404, message: 'not found' })
       })
   }*/
  }
</script>

<style scoped>
  @import url('../../../assets/css/reset.css');

  .container {
    margin: 0;
    padding: 0;
    border: 0;
    /*width:3840px;*/
    width: 100%;
    min-width: 1920px;
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

  .search_index {
    border: 0 solid #f00;
    position: absolute;
    left: 65px;
    top: 110px;
    text-align: right;
  }

  .filter_box {
    position: absolute;
    left: 580px;
    top: 110px;
    text-align: right;
  }

  .bottom_bar {
    position: absolute;
    bottom: 0;
    left: 50%;
    margin-left: -205px;
    margin-top: -110px;
    width: 410px;
    height: 70px;
    background: transparent url('../../../static/img/yxzx/block-bottom-bar.png') no-repeat center;
    background-size: contain;
    text-align: center;
  }

  .bottom_bar p {
    display: inline-block;
    vertical-align: middle;
    width: auto;
    color: #fff;
    font-size: 30px;
    line-height: 70px;
    padding: 0 15px;
  }

  .bottom_bar p.active,
  .bottom_bar p:hover {
    background: transparent url('../../../static/img/yxzx/block-bottom-active.png') no-repeat center;
    background-size: contain;
  }

  .build_detail {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 1379px;
    height: 774px;
    margin-left: -689px;
    margin-top: -387px;
  }

  .video_detail {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 1379px;
    height: 774px;
    margin-left: -689px;
    margin-top: -387px;
    /*border:1px solid #f00;*/
  }

  .right_bar {
    position: absolute;
    /*left:100%;*/
    /*right: 20px;*/
    right: 100px;
    /*top:100%;*/
    bottom: 500px;
    width: auto;
    height: auto;
    max-width: 485px;
    max-height: 460px;
    /*margin-left: -500px;*/
    margin-top: -620px;
    border: 1px solid transparent;
  }

  .building {
    position: absolute;
    top: 0;
    left: 0;
  }

  .estuary {
    position: absolute;
    left: 0;
    top: 500px;
  }

  .other_detail {
    position: absolute;
    left: 20%;
    top: 20%;
  }

  .gis_bar {
    position: absolute;
    top: 100px;
    /*left: 100%;*/
    right: 100px;
    /*margin-left: -520px;*/
    width: 500px;
    height: 40px;
  }

  .videoType {
    width: 350px;
    height: 200px;
    position: absolute;
    left: 580px;
    top: 110px;
  }
  .change_map{position:absolute;z-index: 1000; bottom:15px; left:15px; width:128px;height:62px;}
</style>
