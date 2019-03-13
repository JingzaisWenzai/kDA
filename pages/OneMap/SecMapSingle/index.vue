<template>
  <section class="sec_container">
    <iframe id="iframeGisMap" class="iframeStyle" src="../../../web/gis/index.html" ></iframe>
    <div class="top_bar"><top-bar :tit-msg ='title'></top-bar></div>


    <div v-if="barPosition === 'right-2'">
      <table-list></table-list>
      <risk-preview></risk-preview>
    </div>
    <div>
      <div class="right-bar">
        <div class="select-add">
          <select-address2></select-address2>
        </div>
        <div class="right-bar-box">
         <!-- <right-bar></right-bar>
          <three-small-places></three-small-places>
          <safety-supervision></safety-supervision>
          <emergency></emergency>-->
          <component :is="components"></component>
        </div>
      </div>
    </div>
    <!-- <div v-if="barPosition === 'right-3">
       <div class="right-bar">
         <div class="right-bar-box">
           <right-bar></right-bar>
         </div>
       </div>
     </div>-->
    <div class="trichrome box" v-show="showChrome ==='yes'">
      <tri-chrome ></tri-chrome>
    </div>
    <div class="city box" v-show="showCity ==='yes' || showQiYe ==='yes'">
      <city-popup></city-popup>
      <!-- <pop-up></pop-up>-->
    </div>
    <div class="fenbu box" v-show="showFenBu ==='yes'">
      <fen-bu ></fen-bu>
    </div>
    <div class="jianzhu box" v-show="showYinHuan ==='yes'">
      <yin-huan></yin-huan>
    </div>
    <div class="jianzhu1 box" v-show="showThreeS ==='yes'">
      <three-s></three-s>
    </div>
    <div class="jianzhu1 box" v-show="showEmergency ==='yes'">
      <three-s></three-s>
    </div>
    <div class="iot box"  v-show="showIotPopup ==='yes'">
      <iot-popup ></iot-popup>
    </div>
    <div class="risk_rank box" v-show="ShowRiskRank==='yes'">
      <risk-rank></risk-rank>
    </div>
    <div class="info_list" v-show="ShowInfoList ==='yes'">
      <info-list @toPage="toChangeInfoListPage"></info-list>
    </div>
    <div class="change_map">
      <change-map></change-map>
    </div>
    <div class="bottom_bar"><bottom-bar :navMsg ='navData' @BarPosition ='toChangeBarPosition'></bottom-bar></div>

    <div class="showImg box" v-if="showImgBox === 'yes'">
      <div class="theImgBox">
        <img :src="imgBoxSrc" />
        <i @click="toCloseImgBox()"></i>
      </div>
    </div>
  </section>
</template>
<style scoped>
  @import url('../../../assets/css/reset.css');
  .sec_container{
    margin:0;
    padding:0;
    border:0;
    width:100vw;
    height:100vh;
    position: relative;
    background: transparent;
  }
  .showImg{position: absolute;left:0;top:0;width:100%;height:100%; z-index: 10000;background-color:rgba(2,22,35,0.8);}
  .showImg .theImgBox{
    width:600px;
    height:600px;
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
  .top_bar{position: absolute;z-index:1000;top:0;left:50%;width:100%;height:86px;margin-left: -50%;}
  .change_map{position:absolute;z-index: 1000; bottom:15px; right:15px; width:128px;height:62px;}
  .bottom_bar{
    position:absolute;
    bottom:0; left:50%;
    margin-left:-300px;
    width:606px;height:90px;
    border:1px solid transparent;
  }
  .right-bar{
    position: absolute;
    left:0;
    top:0;
    width:530px;
    /*height:98%;*/
    height:100%;
    background: -webkit-gradient(linear,right top,left top,from(rgba(13,32,42,.3)),to(#001521));
    background: linear-gradient(270deg,rgba(13,32,42,.3),#001521);
  }
  .select-add{
    width: 90%;
    margin:80px auto 0 auto;
  }
  .right-bar-box{
    margin:10px auto 0;
    width: 90%;
    height:calc(100% - 210px);
    overflow-x: hidden;
    overflow-y: auto;
  }
  .info_list{
    position:absolute;
    left:100%;
    top:360px;
    margin-left: -520px;
    width:500px;
    height:520px;
  }
  .risk_rank{
    position:absolute;
    left:100%;
    top:50%;
    margin-top: -300px;
    margin-left: -510px;
    width:500px;
    height:600px;
  }
  .trichrome{position: absolute; top: 50%;  left: 50%;margin-top: -250px; margin-left: -200px; z-index: 2;width:400px; height:auto; max-height: 500px; overflow: hidden;}
  .city{position: absolute; top: 50%;  left: 50%;margin-top: -200px; margin-left: -370px; z-index: 2;width:740px; height:auto; max-height: 510px; overflow: hidden;}
  .fenbu{position: absolute; top: 50%;  left: 50%;margin-top: -300px; margin-left: -440px; z-index: 2;width:880px; height:auto; max-height: 620px; overflow: hidden;}
  .jianzhu{position: absolute; top: 50%;  left: 50%;margin-top: -400px; margin-left: -374px;  max-height: 880px;width: 748px; height: auto; }
  .jianzhu1{position: absolute; top: 50%;  left: 50%;margin-top: -400px; margin-left: -300px;  max-height: 880px;width: 600px; height: auto; }
  .iot{position: absolute; top: 50%;  left: 50%;margin-top: -380px; margin-left: -420px;width:840px; height:auto;max-height: 773px; overflow: hidden; }
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
</style>
<script>

  import TopBar from '../../../components/OneMapSingle/Common/Top/TopBar.vue';
  import RiskPreview from '../../../components/OneMapSingle/aqyh/RiskPreview.vue';
  import PopUp from '../../../components/OneMapSingle/aqyh/PopBox/PopUp.vue';
  import selectAddress2 from '../../../components/OneMapSingle/aqyh/selectAddress.vue';
  import tableList from '../../../components/OneMapSingle/aqyh/tableList.vue';
  import BottomBar from '../../../components/OneMapSingle/Common/Bottom/BottomCollapse.vue';
  import RightBar from '../../../components/OneMapSingle/aqyh/RightBar/RightBar.vue';
  import InfoList from '../../../components/OneMapSingle/aqyh/RightPop/InfoList.vue';
  import RiskRank from '../../../components/OneMapSingle/aqyh/RightPop/RiskRank.vue';
  import FenBu from '../../../components/OneMapSingle/aqyh/PopBox/YinHuanFenBu.vue';
  import YinHuan from '../../../components/OneMapSingle/aqyh/PopBox/JianZhuYinHuan.vue';
  import IotPopup from '../../../components/OneMapSingle/aqyh/PopBox/IotPopup.vue';
  import CityPopup from '../../../components/OneMapSingle/aqyh/PopBox/CityPopup.vue';
  import TriChrome from '../../../components/OneMapSingle/aqyh/PopBox/YinHuanTrichrome.vue';
  import ThreeS from '../../../components/OneMapSingle/aqyh/PopBox/ThreeS.vue';
  import ChangeMap from '../../../components/common/Map/ChangeMap.vue';

  import {InternetOfThings,toGetInfoBoxData} from '../../../static/js/OneMap/InfoList/getClickedPid';
  import {getPOI} from '../../../api/secapi';

  import total from '../../../components/OneMapSingle/aqyh/DX/total';
  import threeSmallPlaces from '../../../components/OneMapSingle/aqyh/DX/threeSmallPlaces' ;
  import safetysupervision from '../../../components/OneMapSingle/aqyh/DX/safetySupervision';
  import xiaofanglei from '../../../components/OneMapSingle/aqyh/DX/fireControl';
  import layer_dizhilei from '../../../components/OneMapSingle/aqyh/DX/geology';
  import wulianwang from '../../../components/OneMapSingle/aqyh/DX/couplet';
  import layer_yingjiziyuanlei from '../../../components/OneMapSingle/aqyh/DX/emergency';

  import bus from '../../../assets/js/main'
  // import posed from "vue-pose"

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
      this.toLoadPOI();

      let $this = this
      bus.$on('showBI',function (data) {
        console.log(data)
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
      })

    },
    methods:{
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
        this.$store.state.infoTable = data;
      },
      async toGetThePopUpData(val){

        for(let i = 0,j = document.getElementsByClassName('box').length;i<j;i+=1){
          document.getElementsByClassName('box')[i].style.transform = 'translateX(0px) translateY(0px) translateZ(0px)';
        }

        if(val ==='ShowCity'){
          if(this.$store.state.ShowCity !=='yes'){
            this.$store.state.ShowCity ='yes';
          }
        }else if(val ==='ShowFenBu'){
          if(this.$store.state.ShowFenBu !=='yes'){
            this.$store.state.ShowFenBu ='yes';
          }
        }else if(val ==='ShowYinHuan'){
          if(this.$store.state.ShowYinHuan !=='yes'){
            this.$store.state.ShowYinHuan ='yes';
          }
        }else if(val ==='ShowIotPopup'){
          if(this.$store.state.ShowIotPopup !=='yes'){
            this.$store.state.ShowIotPopup ='yes';
          }
        }else if(val ==='ShowChrome'){
          if(this.$store.state.ShowChrome !=='yes'){
            this.$store.state.ShowChrome ='yes';
          }
        }else if(val ==='ShowQiYe'){
          if(this.$store.state.ShowQiYe !=='yes'){
            this.$store.state.ShowQiYe ='yes';
          }
        }else if(val ==='ShowThreeS'){
          if(this.$store.state.ShowThreeS !=='yes'){
            this.$store.state.ShowThreeS ='yes';
          }
        }else if(val ==='ShowEmergency'){
          if(this.$store.state.ShowEmergency !=='yes'){
            this.$store.state.ShowEmergency ='yes';
          }
        }
        this.$store.state.detailPopupType = '';
      },
      async toLoadPOI(){
        let data = await getPOI();
        let arr = data,res=[];
        if(arr!=={}){
          //{}==={} false[]===[] false
          if(arr.topGroupList && arr.topGroupList.length!==0){
            for(let m =0;m<arr.topGroupList.length;m++){
              let brr = arr.topGroupList[m], drr,a,b,c;
              drr=[];
              for(let j=0;j<brr.topGroupTwoList.length;j++){
                a =   brr.topGroupTwoList[j];
                drr.push({
                  name:a.label,
                  layerid:a.id || 'null'
                })
              }
              res.push({
                name:brr.label,
                sub:[].concat(drr)
              })
            }
          }else{
            res = []
          }
        }else{
          res=[]
        }
        this.$store.state.Search.POI = res;
      },
      toChangeInfoListPage:function(msg){
        let ourl =this.$store.state.infoList.applyUrl;
        let oquery = this.$store.state.infoList.applyQuery;
        oquery.pageNum = msg;
        this.toGetInfoTable(ourl,oquery);
      }
    },
    computed:{
      showThreeS(){
        return this.$store.state.ShowThreeS;
      },
      showEmergency(){
        return this.$store.state.ShowEmergency;
      },
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
        return this.$store.state.typeOptions;    /*addressStreet�����л��ӵ�����*/
      },
      infoListBox(){
        return  this.$store.state.infoListBox;
      },
      showFenBu(){
        return this.$store.state.ShowFenBu;
      },
      showYinHuan(){
        return this.$store.state.ShowYinHuan;
      },
      showIotPopup(){
        return this.$store.state.ShowIotPopup;
      },
      showCity(){
        return this.$store.state.ShowCity;
      },
      showChrome(){
        return this.$store.state.ShowChrome;
      },
      showQiYe(){
        return this.$store.state.ShowQiYe;
      },
      detailPopupType(){
        return this.$store.state.detailPopupType;
      }
    },
    watch:{
      showThreeS:{/* ��С�����鿴���鵯*/
        handler:function(val,oldVal){},
        deep:true
      },
      showEmergency:{/*  Ӧ����Դ�鿴���鵯*/
        handler:function(val,oldVal){},
        deep:true
      },
      showImgBox:{
        handler:function(val,oldVal){
          if(val==='yes'){
            this.imgBoxSrc = this.$store.state.ShowImgBoxSrc;
          }
        },
        deep:true
      },
      detailPopupType:{
        handler:function(val,oldVal){
          if(val !==''){
            this.toGetThePopUpData(val);
          }
        },
        deep:true
      },
      showChrome:{/*������ɫ�鿴���鵯*/
        handler:function(val,oldVal){},
        deep:true
      },
      showCity:{  /*���з��������鿴���鵯*/
        handler:function(val,oldVal){},
        deep:true
      },
      showYinHuan:{/*���������鿴���鵯*/
        handler:function(val,oldVal){},
        deep:true
      },
      showIotPopup:{      /*�������鿴���鵯*/
        handler:function(val,oldVal){},
        deep:true
      },
      showFenBu:{ /*�����ֲ��鿴���鵯��*/
        handler:function(val,oldVal){},
        deep:true
      },
      showQiYe:{
        handler:function(val,oldVal){},
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
            console.log(res);
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
        iframeBox: {url: '../../../gis/index.html'},
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
            {txt:'城区风险评估',name:'城区风险评估',src:trichrome,hover:trichrome_hover, type:'right-2', index:4,sub:[ /*name:'urban_assi'*/
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
        components: 'total'
      }
    },
    components:{
      TopBar,
      RiskPreview,
      BottomBar,
      selectAddress2,
      tableList,
      PopUp,
      RightBar,
      InfoList,
      RiskRank,
      FenBu,
      YinHuan,
      IotPopup,
      CityPopup,
      TriChrome,
      ThreeS,
      threeSmallPlaces,
      safetysupervision,
      xiaofanglei,
      layer_dizhilei,
      wulianwang,
      layer_yingjiziyuanlei,
      total,
      ChangeMap
      // Box: posed.div({
      //   draggable: false
      // })
    }
  }
</script>

