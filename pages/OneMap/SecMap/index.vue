<template>
  <section class="sec_container">
    <iframe id="iframeGisMap" class="iframeStyle" src="../../../web/gis/index.html" ></iframe>
    <div class="top_bar"><top-bar :tit-msg ='title'></top-bar></div>

    <div class="address_tap" style="width: 575px;height: 300px;overflow: hidden;position: relative;"><select-address2></select-address2></div>
    <div v-if="barPosition === 'right-2'">
      <table-list></table-list> <!--建筑隐患 要合并为信息列表-->
      <risk-preview></risk-preview> <!--风险评估右侧的弹窗  根据左侧的街道来进行切换-->
    </div>
    <div class="right-bar">
      <div class="right-bar-box">
        <!--<right-bar></right-bar>     &lt;!&ndash;安全隐患的右侧展示&ndash;&gt;-->
        <!--<three-small-places></three-small-places>-->
        <!--<safety-supervision></safety-supervision>-->
        <!--<emergency></emergency>-->
        <component :is="components"></component>
      </div>
    </div>
    <left-menu></left-menu>
   <!-- <div v-if="barPosition === 'right-3">
      <div class="right-bar">
        <div class="right-bar-box">
          <right-bar></right-bar>     &lt;!&ndash;安全隐患的右侧展示&ndash;&gt;
        </div>
      </div>
    </div>-->

    <!--重点隐患排行 --  在建筑风险中-->
    <div class="risk_rank box" v-show="ShowRiskRank==='yes'">
      <risk-rank></risk-rank>
    </div>
    <!--信息列表是公共的-->
    <div class="info_list" v-show="ShowInfoList ==='yes'">
      <info-list @toPage="toChangeInfoListPage"></info-list>
    </div>
    <!--改变地图底图-->
    <div class="change_map">
      <change-map></change-map>
    </div>
    <div class="bottom_bar">
      <bottom-bar :navMsg ='navData' @BarPosition ='toChangeBarPosition'></bottom-bar>
    </div>

    <!--<div class="showImg box" v-if="showImgBox === 'yes'">-->
      <!--<div class="theImgBox">-->
        <!--<img :src="imgBoxSrc" />-->
        <!--<i @click="toCloseImgBox()"></i>-->
      <!--</div>-->
    <!--</div>-->
    <div v-show="isShowlegend" class="legend">
      <!--<span v-for="(item,index) in legendArray" ><img :src="'/web/gis/'+item" :key="index"/></span>-->
      <ul>
        <li v-for="(item,index) in legendArray" :key="index">
          <div :style="{background:'url(/web/gis/'+item.img.replace('gif','temp.png')+') no-repeat left',fontSize: '15px',height: '30px',paddingLeft: item.img!==''?'30px':'5px',lineHeight: '30px',color: item.img!==''?'white':'#00c0dd'}">{{item.name}}</div>
        </li>
      </ul>
    </div>

    <warn-table :dateArray="dateArray" v-if="isShowWarnTable" class="warn-table"></warn-table>

    <!--<div style="position: absolute;right: 20px;z-index: 999;"><video-box></video-box></div>-->
    <!--<iframe style="position: absolute;width: 826px;height: 677px;z-index: 9999;right: 80px;top: 80px;display: none;" id="videoFlash" class="" src="../../../web/gis/js/module/layerInfoWindow/futian/video/videoFlash.html?videoId=123" ></iframe>-->
  </section>
</template>
<script>
  import TopBar from '../../../components/OneMap/Common/Top/TopBar.vue';
  import RiskPreview from '../../../components/OneMap/aqyh/RiskPreview.vue';
  import PopUp from '../../../components/OneMap/aqyh/PopBox/PopUp.vue';
  import selectAddress2 from '../../../components/OneMap/aqyh/selectAddress.vue';
  import tableList from '../../../components/OneMap/aqyh/tableList.vue';
  import BottomBar from '../../../components/OneMap/Common/Bottom/BottomBar.vue';
  import RightBar from '../../../components/OneMap/aqyh/RightBar/RightBar.vue';
  import InfoList from '../../../components/OneMap/aqyh/RightPop/InfoList.vue';
  import RiskRank from '../../../components/OneMap/aqyh/RightPop/RiskRank.vue';
  import ChangeMap from '../../../components/common/Map/ChangeMap.vue';

  import {InternetOfThings,toGetInfoBoxData} from '../../../static/js/OneMap/InfoList/getClickedPid';

  import total from '../../../components/OneMap/aqyh/DX/total'//总体态势
  import threeSmallPlaces from '../../../components/OneMap/aqyh/DX/threeSmallPlaces'//三小
  import safetysupervision from '../../../components/OneMap/aqyh/DX/safetySupervision'//安监
  import xiaofanglei from '../../../components/OneMap/aqyh/DX/fireControl'//消防
  import layer_dizhilei from '../../../components/OneMap/aqyh/DX/geology'//地质
  import wulianwang from '../../../components/OneMap/aqyh/DX/couplet'//物联
  import layer_yingjiziyuanlei from '../../../components/OneMap/aqyh/DX/emergency'//应急

  import warnTable from '../../../components/OneMap/aqyh/warnTable' //安全隐患落图列表

  import leftMenu from '../../../components/common/leftMenu'//导航栏
  // import videoBox from '../../../components/common/videoBox'

  import bus from '../../../assets/js/main'
  // import posed from "vue-pose"

  /*地陷点 建筑边坡*/
  import buildingSlope from '../../../static/img/sec/weixinbianpo.png';
  import buildingSlope_hover from '../../../static/img/sec/weixinbianpo_hover.png';
  import subsidencePoint from '../../../static/img/sec/dizhiyinhuandian.png';
  import subsidencePoint_hover from '../../../static/img/sec/dizhiyinhuandian_hover.png';
  import warehouse from '../../../static/img/sec/yinjicangku.png';
  import warehouse_hover from '../../../static/img/sec/yinjicangku_hover.png';
  import refuge from '../../../static/img/sec/binanchangsuo.png';
  import refuge_hover from '../../../static/img/sec/binanchangsuo_hover.png';
  import rescueTeam from '../../../static/img/sec/jiuyuanduiwu.png';
  import rescueTeam_hover from '../../../static/img/sec/jiuyuanduiwu_hover.png';
  import hazard from '../../../static/img/sec/weixianyuan.png';
  import hazard_hover from '../../../static/img/sec/weixianyuan_hover.png';

  import threesmall from '../../../static/img/sec/threesmall.png';
  import threesmall_hover from '../../../static/img/sec/threesmall_hover.png';
  import enterprise from '../../../static/img/sec/enterprise.png';
  import enterprise_hover from '../../../static/img/sec/enterprise_hover.png';
  import crowded  from '../../../static/img/sec/crowded.png';
  import crowded_hover  from '../../../static/img/sec/crowded_hover.png';
  import infrastructure from '../../../static/img/sec/infrastructure.png';
  import infrastructure_hover from '../../../static/img/sec/infrastructure_hover.png';
  import other from '../../../static/img/sec/other.png';
  import other_hover from '../../../static/img/sec/other_hover.png';
  import risk from '../../../static/img/sec/risk.png';
  import risk_hover from '../../../static/img/sec/risk_hover.png';
  import nanotubes from '../../../static/img/sec/nanotubes.png';
  import nanotubes_hover from '../../../static/img/sec/nanotubes_hover.png';
  import safety from '../../../static/img/sec/safety.png';
  import safety_hover from '../../../static/img/sec/safety_hover.png';
  import major from '../../../static/img/sec/major.png';
  import major_hover from '../../../static/img/sec/major_hover.png';
  import trichrome from '../../../static/img/sec/risk.png';
  import trichrome_hover from '../../../static/img/sec/risk_hover.png';
  import fireh from '../../../static/img/sec/fireh.png';
  import fireh_hover from '../../../static/img/sec/fireh_hover.png';
  import keyPlace from '../../../static/img/sec/keyPlace.png';
  import keyPlace_hover from '../../../static/img/sec/keyPlace_hover.png';
  import building from '../../../static/img/sec/building.png';
  import building_hover from '../../../static/img/sec/building_hover.png';
  import waterlogging from '../../../static/img/sec/waterlogging.png';
  import waterlogging_hover from '../../../static/img/sec/waterlogging_hover.png';
  import road from '../../../static/img/sec/road.png';
  import road_hover from '../../../static/img/sec/road_hover.png';
  import yanwuchuanganqi from '../../../static/img/sec/yanwuchuanganqi.png';
  import yanwuchuanganqihover from '../../../static/img/sec/yanwuchuanganqihover.png';
  import dianqihuozaijianceshebei from '../../../static/img/sec/dianqihuozaijianceshebei.png';
  import dianqihuozaijianceshebeihover from '../../../static/img/sec/dianqihuozaijianceshebeihover.png';
  import shipinjiankong from '../../../static/img/sec/shipinjiankong.png';
  import shipinjiankonghover from '../../../static/img/sec/shipinjiankonghover.png';


  import threes from '../../../static/img/sec/threes.png';
  import threes_hover from '../../../static/img/sec/threes_hover.png';

  import sworkshop from '../../../static/img/sec/xiaozuofang.png';
  import sworkshop_hover from '../../../static/img/sec/xiaozuofanghover.png';
  import sstall from '../../../static/img/sec/xiaodangkou.png';
  import sstall_hover from '../../../static/img/sec/xiaodangkouhover.png';
  import svenue from '../../../static/img/sec/xiaoyulechangsuo.png';
  import svenue_hover from '../../../static/img/sec/xiaoyulechangsuohover.png';
  import hiddentrouble from '../../../static/img/sec/xunchayinhuan.png';
  import hiddentrouble_hover from '../../../static/img/sec/xunchayinhuanhover.png';

  /*图片*/
  import wlw from '../../../static/img/common/Bottom/wulianwang.png';
  import wlw_hover from '../../../static/img/common/Bottom/wulianwang_hover.png';
  import aj from '../../../static/img/common/Bottom/safetysupervision.png';
  import aj_hover from '../../../static/img/common/Bottom/safetysupervision_hover.png';
  import xfl from '../../../static/img/common/Bottom/xiaofanglei.png';
  import xfl_hover from '../../../static/img/common/Bottom/xiaofanglei_hover.png';
  import yjzy from '../../../static/img/common/Bottom/layer_yingjiziyuanlei.png';
  import yjzy_hover from '../../../static/img/common/Bottom/layer_yingjiziyuanlei_hover.png';
  import dzl from '../../../static/img/common/Bottom/layer_dizhilei.png';
  import dzl_hover from '../../../static/img/common/Bottom/layer_dizhilei_hover.png';
  import dizhi from '../../../static/img/common/Bottom/dizhi.png';
  import dizhi_hover from '../../../static/img/common/Bottom/dizhi_hover.png';
  import qiti from '../../../static/img/common/Bottom/qiti.png';
  import qiti_hover from '../../../static/img/common/Bottom/qiti_hover.png';
  import xiaofangshuiya from '../../../static/img/common/Bottom/xiaofangshuan.png';
  import xiaofangshuiya_hover from '../../../static/img/common/Bottom/xiaofangshuan_hover.png';
  export default{
    layout:'yujinjiance',
    head(){
      return{
        title: "安全隐患一张图",
        meta: [
          { hid: 'description', name: 'description', content: '安全隐患一张图'},
          { hid: 'keywords', name: 'keywords', content: '城区风险评估'}
        ],
        script: [
          { src: '/web/js/OneMap/common/jquery-1.11.1.min.js', type: 'text/javascript' }
        ]
      }
    },
    beforeDestroy(){
      bus.$off('showBI')
    },
    mounted(){
      const oIframe = document.getElementById('iframeGisMap');
      // this.toLoadPOI();
      bus.$on('showBI',this.showBI)
      bus.$on('showlegend',this.showlegend)
      bus.$on('showWarnTable',this.showWarnTable)
      bus.$on('dateChange',this.dateChange)

      this.loadAlarmData()
    },
    methods:{
      dateChange(date){
        console.log(date)
        this.dateArray = date
      },
      showWarnTable(status){
        this.isShowWarnTable = status
      },
      showlegend(data){
        // this.legendArray = data
        if(this.legendObj[data.name] === undefined){
          this.legendObj[data.name] = data
          this.legendArray.push(data)
        }
        this.isShowlegend = true
      },
      loadAlarmData(){
        let $this = this
        setTimeout(function() {
          try {
            document.getElementById("iframeGisMap").contentWindow.module.common.layerControl.mapLayerXml.getLayerNodeById('layer_safetysupervision_sanxiaochangsuolei_xiaozuofang')
            $this.loadAlarmLayer()
          }catch (e) {
            console.log(e.message)
            setTimeout(function() {
              $this.loadAlarmData()
            },500)
          }
        },500)
      },
      loadAlarmLayer(){
        //安全隐患落图
        let layerArray = [
          'layer_safetysupervision_sanxiaochangsuolei_xiaozuofang',
          "layer_safetysupervision_sanxiaochangsuolei_xiaodangkou",
          "layer_safetysupervision_sanxiaochangsuolei_xiaoyulechangsuo"
          // "wulianwang_yanwuchuanganqi",
          // "wulianwang_dianqihuozaijiance",
          // "wulianwang_qitichuanganqi",
          // "wulianwang_dizhizaihaijiance",
          // "wulianwang_xiaofangshuiya",
          // "sanfanglei_yilaodian"
        ]

        //预警中心落图
        let layerArrayTemp = [
          'yujingzhongxin_yinhuan',
          'yujingzhongxin_chengqufengxian',
          'yujingzhongxin_shuiku',
          'yujingzhongxin_hedao',
          'yujingzhongxin_jinaodian',
          'yujingzhongxin_yangan',
          'yujingzhongxin_jianzu',
          'yujingzhongxin_qiti',
          'yujingzhongxin_dianqihuozai',
          'yujingzhongxin_shuiya',
          'yujingzhongxin_dizhizaihai'
        ]

        //先移除所有图层
        document.getElementById("iframeGisMap").contentWindow.module.common.layerControl.mapLayerOperate.removeAllLayer()
        for(let i = 0,j = layerArray.length;i<j;i+=1){
          this.loadSingleLayer(layerArray[i])
        }

        for(let i = 0,j = layerArrayTemp.length;i<j;i+=1){
          this.loadSingleLayerByYuJing(layerArrayTemp[i])
        }
      },
      loadSingleLayerByYuJing(id){
        document.getElementById("iframeGisMap").contentWindow.module.common.layerControl.mapLayerOperate.loadSingleLayerById(id)
      },
      loadSingleLayer(id){
        try {
          let node = document.getElementById("iframeGisMap").contentWindow.module.common.layerControl.mapLayerXml.getLayerNodeById(id)
          console.log(node)
          let temp = node.query
          let obj = {}
          if(temp === null){
            obj.alarm = '1'
          }else {
            temp = temp.replace('?','')
            let tempArray = temp.split('&')
            for(let i = 0,j = tempArray.length;i<j;i+=1){
              if(tempArray[i].length>0){
                let temp2 = tempArray[i].split('=')
                if(temp2.length>1){
                  obj[temp2[0]] = temp2[1]
                }else if(temp2.length === 1){
                  obj[temp2[0]] = ''
                }
              }
            }
            obj.alarm = '1'
            // obj.street = this.$store.state.addressStreet==='福田区'?'':this.$store.state.addressStreet
          }
          // if(this.$store.state.addressStreet === '福田区'){
          //   obj.street = ''
          // }else {
          //   obj.street = this.$store.state.addressStreet
          // }
          let queryArray = []
          for(let i in obj){
            queryArray.push(i+'='+obj[i])
          }
          node.query = queryArray.join('&')
          node.query.replace('&&','&')
          document.getElementById("iframeGisMap").contentWindow.module.common.layerControl.mapLayerOperate.loadSingleLayerByNode(node)
          setTimeout(function() {
            node.query = node.query.replace('alarm=1','')
          },2000)
        }catch (e) {
          console.error(e.message)
          // alert('图层加载错误，请联系运维人员，错误图层：'+id)
        }
      },
      showBI(data){
        let $this = this
        if(data.flag1.clicked){
          if(data.flag1.name === 'safetysupervision'){
            // if(data.flag2.name === '三小场所' && data.flag2.clicked){
            //   $this.components = 'threeSmallPlaces'
            // }else {
            //   $this.components = data.flag1.name
            // }
            $this.components = 'threeSmallPlaces'
          }else {
            // if(data.flag1.name === 'xiaofanglei'){
            //   $this.components = data.flag1.name
            // }
            $this.components = data.flag1.name
          }
        }else {
          $this.components = 'total'
        }
      },
      toCloseImgBox:function(){
          this.$store.state.ShowImgBox ='no';
      },
      toChangeBarPosition:function(arg){
          this.barPosition = arg;
      },
      async toGetInfoTable(url,query){
          this.$store.state.infoList.applyUrl = url;
          this.$store.state.infoList.applyQuery = query;
          let data = await toGetInfoBoxData(url,query);
          /*处理data*/
          this.$store.state.infoTable = data;
      },
      toChangeInfoListPage:function(msg){
        let ourl =this.$store.state.infoList.applyUrl;
        let oquery = this.$store.state.infoList.applyQuery;
        oquery.pageNum = msg;
        this.toGetInfoTable(ourl,oquery);
      }
    },
    computed:{


      showImgBox(){
          return this.$store.state.ShowImgBox;
      },
      ShowInfoList(){
          return this.$store.state.ShowInfoList;
      },
      ShowRiskRank(){
        return this.$store.state.ShowRiskRank;
      },
      bottomClicked(){
        return this.$store.state.typeOptions;    /*addressStreet代表切换子导航条*/
      },
      infoListBox(){
        return  this.$store.state.infoListBox;
      }
    },
    watch:{
      //监听地图下钻
      '$store.state.addressStreet':function(val, oldVal) {
        let node = document.getElementById("iframeGisMap").contentWindow.module.common.layerControl.mapLayerOperate.getAllLayerInfo()
        if(node.length>1){
          this.loadAlarmData()
        }
        return this.$store.state.addressStreet
      },


      showImgBox:{
        handler:function(val,oldVal){
            if(val==='yes'){
                this.imgBoxSrc = this.$store.state.ShowImgBoxSrc;
            }
        },
        deep:true
      },
      ShowRiskRank:{
        handler:function(val,oldVal){ },
        deep:true
      },
      ShowInfoList:{
        handler:function(val,oldVal){

        },
        deep:true
      },
      bottomClicked:{
          handler:function(val,oldVal){

          },
          deep:true
      },
      infoListBox:{
        handler:function(val,oldVal){
            if(val.length !==0){
              let node = this.$store.state.infoList.clickedNode.node;
              let area = this.$store.state.infoList.areaOptionsContent;
              let res = InternetOfThings.getClickedData(node,area);
              this.$store.state.infoList.typeClass = res.typeClass;
              if(res.areaOptions){
                this.$store.state.infoList.areaOptions = res.areaOptions;
              }else if(res.areaVideoOptions){
                this.$store.state.infoList.areaVideoOptions = res.areaVideoOptions;
              }else if(res.typeOptions){
                this.$store.state.infoList.typeOptions = res.typeOptions;
              }else if(res.timeOptions){
                this.$store.state.infoList.timeOptions = res.timeOptions;
              }else{}

              this.toGetInfoTable(res.ourl,res.oquery);
            }
        },
        deep:true
      }
    },
    data(){
      return{
        title: {txt: '安全隐患一张图', type: '0'},
        //iframeBox:{url:'/web/OneMap/gis/index.html'}, //区委部署修改
        iframeBox: {url: '../../../static/gis/index.html'},
        barPosition: '',
        alertInfo: {
          /*
        val:'6',
        thData:['序号','预警对象','预警内容','时间'],
        tbData:[
          ['xxx监测点','S02超标','2018/9/19 10:17:00'],
          ['xxx监测点','S02超标','2018/9/19 10:17:00'],
          ['xxx监测点','S02超标','2018/9/19 10:17:00'],
          ['xxx监测点','S02超标','2018/9/19 10:17:00']
        ]*/
        },

        navData:{oid:'sec', data:[
          {txt:'安监类',name:'safetysupervision',src:aj,hover:aj_hover, type:'right-1', index:0,data:[
         /*   {txt:'隐患分布',name:'隐患分布',src:risk,hover:risk_hover},
            {txt:'安监事故',name:'安监事故',src:safety ,hover:safety_hover},*/
            {txt:'纳管企业',name:'纳管企业',src:nanotubes,hover:nanotubes_hover},
            {txt:'三小场所',name:'三小场所',src:threes ,hover:threes_hover, sub:[
              {txt:'小作坊',name:'小作坊',src:sworkshop,hover:sworkshop_hover},
              {txt:'小档口',name:'小档口',src:sstall,hover:sstall_hover},
              {txt:'小娱乐场所',name:'小娱乐场所',src:svenue ,hover:svenue_hover}
              /* {txt:'巡查隐患',name:'巡查隐患',src:hiddentrouble ,hover:hiddentrouble_hover} */
            ]},
            {txt: '危险源场所', name: '危险源场所', src: hazard, hover: hazard_hover},
            {txt:'城区风险评估',name:'城区风险评估',src:trichrome,hover:trichrome_hover , type:'right-2', index:4,sub:[ /*name:'urban_assi'*/
            /*  {txt:'三小场所',name:'三小场所',src:threesmall,hover:threesmall_hover},*/
              {txt:'工业企业',name:'工业企业',src:enterprise,hover:enterprise_hover},
              {txt:'人员密集场所',name:'人员密集场所',src:crowded,hover:crowded_hover},
              {txt:'公共基础设施',name:'公共基础设施',src:infrastructure,hover:infrastructure_hover},
              {txt:'其他风险单元',name:'其他风险单元',src:other,hover:other_hover}
            ]}
          ]},
          {txt:'消防类',name:'xiaofanglei',src:xfl,hover:xfl_hover, type:'right-1', index:1,data:[
            {txt:'建筑风险',name:'建筑风险',src:building,hover:building_hover},
       /*     {txt:'重大危险源',name:'重大危险源',src:major ,hover:major_hover},*/
            /* {txt:'隐患三色',name:'隐患三色',src:trichrome,hover:trichrome_hover},*/
            {txt:'消火栓',name:'消火栓',src:fireh,hover:fireh_hover},
            {txt:'重点场所',name:'重点场所',src:keyPlace,hover:keyPlace_hover}
          ]},
            { txt: '地质类', name: 'layer_dizhilei',src:dzl,hover:dzl_hover, type: 'right-1', index: 2, data: [
                {txt: '道路病害', name: '道路病害', src: road, hover: road_hover},
                {txt: '建筑边坡', name: '建筑边坡', src: buildingSlope, hover: buildingSlope_hover},
                {txt: '地灾隐患点', name: '地灾隐患点', src: subsidencePoint, hover: subsidencePoint_hover},
              ]
            },

            {
              txt: '物联监测', name: 'wulianwang',src:wlw,hover:wlw_hover, type: 'right-1', index: 3, data: [
                {txt: '烟雾监测', name: '烟雾传感器', src: yanwuchuanganqi, hover: yanwuchuanganqihover},
                {txt: '电气火灾',  name: '电气火灾监测设备', src: dianqihuozaijianceshebei,  hover: dianqihuozaijianceshebeihover},
                {txt: '易涝点', name: '易涝点', src: waterlogging, hover: waterlogging_hover},
                {txt: '地质监测', name: '地质灾害监测设备', src: dizhi, hover: dizhi_hover},
                {txt: '气体监测', name: '气体传感器', src: qiti, hover: qiti_hover},
                {txt: '消防水压', name: '消防水压传感器', src: xiaofangshuiya, hover: xiaofangshuiya_hover},
                {txt: '摄像头',name:'公安视频',src:shipinjiankong,hover:shipinjiankonghover}
              ]
            },
            {
              txt: '应急资源类', name: 'layer_yingjiziyuanlei',src:yjzy,hover:yjzy_hover,type: 'right-1', index: 4, data: [
                {txt: '应急仓库', name: '应急仓库', src: warehouse, hover: warehouse_hover},
                {txt: '避难场所', name: '避难场所', src: refuge, hover: refuge_hover},
                {txt: '救援队伍', name: '救援队伍', src: rescueTeam, hover: rescueTeam_hover}
              ]
            }
          ]
        },
        imgBoxSrc: '',
        // components:['threeSmallPlaces','safetysupervision','xiaofanglei','layer_dizhilei','wulianwang','layer_yingjiziyuanlei']
        // components: 'total'
        components: 'total',
        legendArray:[],
        legendObj:{},
        isShowlegend:false,
        isShowWarnTable:false,
        dateArray:[]
      }
    },
    components:{
      warnTable,
      TopBar,
      RiskPreview,
      BottomBar,
      selectAddress2,
      tableList,
      PopUp,
      RightBar,
      InfoList,
      RiskRank,
      threeSmallPlaces,
      safetysupervision,
      xiaofanglei,
      layer_dizhilei,
      wulianwang,
      layer_yingjiziyuanlei,
      total,
      ChangeMap,
      leftMenu,
      // videoBox
      // Box: posed.div({
      //   draggable: false
      // })
    }
  }
</script>
<style lang="scss" scoped>
  @import url('../../../assets/css/reset.css');
  .sec_container{
    margin:0;
    padding:0;
    border:0;
    width:3840px;
    height:1080px;
    position: relative;
    background: transparent;
    overflow: hidden;
  }
  .sec_container .legend{
    position: absolute;
    right: 800px;
    bottom: 50px;
    background-color: rgba(2,22,35,0.8);
    box-shadow: 0 0 5px #1c609d;
    border: 1px solid #1c609d;
    border-radius: 5px;
    padding: 10px 15px;
  }
  .showImg{position: absolute;left:0;top:0;width:100%;height:100%; z-index: 10000;background-color:rgba(2,22,35,0.8);}
  .showImg .theImgBox{
    width:800px;
    height:800px;
    margin: 100px auto 0 auto;
    position:relative;
    border-width: 0;
  }
  .showImg .theImgBox img{
    display: block;
    width: 100%;
    height:100%;
  }
  .showImg .theImgBox i{
    display: block;
    background: url('../../../static/img/aqyhPop/close.png') no-repeat center;
    background-size: contain;
    position: absolute;
    left: 100%;
    top:10px;
    margin-top: -40px;
    margin-left: 40px;
    width:24px;
    height:24px;
  }
  .iframeStyle{
    width: 100%;
    height: 100%;
    position: absolute;
    top:0;
    left: 0;
  }
  .top_bar{position: absolute;z-index:1000;top:0;left:50%;width:100%;height:108px;margin-left: -50%;}
  .change_map{position:absolute;z-index: 1000; bottom:15px; left:15px; width:128px;height:62px;}
  .bottom_bar{
    position:absolute;
    bottom:10px; left:50%;
    margin-left:-300px;
    width:606px;height:76px;
    border:1px solid transparent;
  }
  .right-bar{
    position: absolute;
    right:80px;
    //margin-left: -700px;
    top:0;
    width:600px;
    /*height:98%;*/
    height:100%;
    background: -webkit-gradient(linear,right top,left top,from(#001521),to(rgba(13,32,42,0)));
    background: linear-gradient(270deg,#001521,rgba(13,32,42,0));
  }
  .right-bar-box{
    margin: 100px auto 0 auto;
    width: 600px;
    height:calc(100% - 110px);
    display: inline-block;
  }
  .info_list{
    position:absolute;
    left:50px;
    top:360px;
    width:660px;
    height:520px;
  }
  .risk_rank{
    position:absolute;
    left:50px;
    top:360px;
    width:570px;
    height:670px;
  }
  .aqyh_j_right_b table,
  .tableStyle{width:95%; height:100%; text-align: center; margin: 0 auto; overflow: hidden; }
  .aqyh_j_right_b table thead,
  .tableStyle thead{width:100%; height:45px; text-align: center; margin: 0 auto; overflow: hidden; font-size: 12px;font-weight: 800; color: #73fdff; background-color: transparent;}
  .aqyh_j_right_b table thead tr td,
  .tableStyle thead tr td{width:auto; height:45px; height:45px\9;  border-right: #224f77 solid 1px; border-bottom: #224f77 solid 1px;}
  .aqyh_j_right_b table tbody,
  .tableStyle tbody{width:100%; height:270px; text-align: center; margin: 0 auto; overflow: hidden;  font-size: 12px; color: #5fb6ff;}
  .aqyh_j_right_b table tbody tr td,
  .tableStyle tbody tr td{width:auto; height:40px; height:40px\9; border-right: #224f77 solid 1px; border-bottom: #224f77 solid 1px;}
  .aqyh_j_right_b table,
  .tableStyle{width:calc(100% - 40px); margin:0 auto;height:100%;display: block;}
  .aqyh_j_right_b table thead,
  .aqyh_j_right_b table tbody,
  .aqyh_j_right_b table thead tr,
  .aqyh_j_right_b table tbody tr,
  .tableStyle thead,
  .tableStyle tbody,
  .tableStyle thead tr,
  .tableStyle tbody tr{
    display:block;
    width: 100%;
    clear: both;
  }
  .tableStyle thead tr td,
  .tableStyle tbody tr td,
  .aqyh_j_right_b table thead tr td,
  .aqyh_j_right_b table tbody tr td{
    display:block;float:left;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
    line-height: 40px;
  }
  .aqyh_j_right_b table thead tr td,
  .tableStyle thead tr td{ border-top: #224f77 solid 1px;}
  .aqyh_j_right_b table tbody tr td,
  .aqyh_j_right_b table thead tr td:first-child,
  .tableStyle tbody tr td,
  .tableStyle thead tr td:first-child{ border-left: #224f77 solid 1px;}

  .sec_container{
    .warn-table{
      position: absolute;
      right: 5px;
      bottom: 50px;
      width: 835px;
      /* height: 500px; */
      background-color: rgba(2, 22, 35, 0.8);
      box-shadow: 0 0 5px #1c609d;
      border: 1px solid #1c609d;
      border-radius: 5px;
      padding: 10px 15px;
    }
    /*#videoFlash{*/
      /*position: absolute;*/
      /*!*right: 100px;*!*/
      /*width: 826px;*/
      /*height: 677px;*/
      /*z-index: 9999;*/
      /*!*height: 662px;*!*/
      /*right: 80px;*/
      /*top: 80px;*/
      /*display: none;*/
    /*}*/
    /deep/ .left_menu .left_menu_content{
      background: linear-gradient(90deg, #001521, rgba(3, 32, 80, 0.3)) !important;
    }
  }
</style>
