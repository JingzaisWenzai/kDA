<template>
  <div class="subjectServersMainPage map">
    <iframe id="iframeGisMap" src="../../web/gis/index.html" width="100%" height="100%"></iframe>
    <div class="a">
      <div class="a_a">
        <ul>
          <li>
            <nuxt-link to="/tizheng"><img src="../../assets/img/cstz_3.png"/></nuxt-link>
          </li>
          <li>
            <img style="cursor: pointer;" src="../../assets/img/cstz_2.png" @click="openTableauList"/>
            <!--<a style="cursor: pointer;" @click="showReportsList()"><img src="../../assets/img/cstz_2.png"/></a>-->
          </li>
        </ul>
      </div>
      <div class="a_b a_b_temp">
        <ul>
          <li v-for="(item,index) in iconArray" :key="index" :class="className[index]" >
            <!--<a class="subjectServersPage" @click="changeComponent(index)"><img :src="selectIndex===index?item[1]:item[0]"/></a>-->
            <a :class="selectIndex===index?'subjectServersPage_select':'subjectServersPage'" @click="changeComponent(index)">{{item}}</a>
          </li>
        </ul>
      </div>
      <!--<div class="door_bar"><protall-nav></protall-nav></div>-->
    </div>
    <div style="position: absolute;top: 50px;z-index: 2;">
      <select-address></select-address>
    </div>
    <div class="subjectServersLeft">
      <component v-bind:is="component[0]"></component>
    </div>
    <div class="subjectServersRight">
      <component v-bind:is="component[1]"></component>
    </div>
    <left-menu></left-menu>
    <!--<div class="report">-->
      <!--<iframe src="http://10.190.65.33/#/views/181128/sheet0?:iid=2"></iframe>-->
    <!--</div>-->
    <div class="tableau_list">
      <tableau-list v-if="showTableauList" :url="tableau_id"></tableau-list>
    </div>
    <div class="visualMap">
      <img src="../../assets/img/visualMap.png"/>
    </div>
    <div class="legend">
      <ul v-if="selectIndex===0">
        <li><el-button class="legendBtn el-icon-menu" :class="legendBtnSeleck===0?'legendBtnSeleck':''" type="text" @click="legendBtnAction('chengshitizheng_renkoumidu',0,street)">全部人口</el-button></li>
        <li><el-button class="legendBtn el-icon-menu" :class="legendBtnSeleck===1?'legendBtnSeleck':''" type="text" @click="legendBtnAction('chengshitizheng_renkoumidu',1,street)">户籍人口</el-button></li>
        <li><el-button class="legendBtn el-icon-menu" :class="legendBtnSeleck===2?'legendBtnSeleck':''" type="text" @click="legendBtnAction('chengshitizheng_renkoumidu',2,street)">流动人口</el-button></li>
      </ul>
      <ul v-if="selectIndex===1">
        <li><el-button class="legendBtn el-icon-menu" :class="legendBtnSeleck===3?'legendBtnSeleck':''" type="text" @click="legendBtnAction('chengshitizheng_farenshuliang',3,street)">法人人口</el-button></li>
        </ul>
      <ul v-if="selectIndex===2">
        <li><el-button class="legendBtn el-icon-menu" :class="legendBtnSeleck===6?'legendBtnSeleck':''" type="text" @click="legendBtnAction('chengshitizheng_componentshuliang',6,street)">部件</el-button></li>
      </ul>
      <ul v-if="selectIndex===3">
        <li><el-button class="legendBtn el-icon-menu" :class="legendBtnSeleck===4?'legendBtnSeleck':''" type="text" @click="legendBtnAction('chengshitizheng_fangwushuliang',4,street)">房屋</el-button></li>
        <li><el-button class="legendBtn el-icon-menu" :class="legendBtnSeleck===5?'legendBtnSeleck':''" type="text" @click="legendBtnAction('chengshitizheng_loudongshuliang',5,street)">楼栋</el-button></li>
      </ul>
    </div>
    <!--改变地图底图-->
    <div class="change_map">
      <change-map></change-map>
    </div>
  </div>
</template>

<script>
  import selectAddress from '../../components/OneMap/aqyh/selectAddress.vue'
  import renkouleft from '../../components/tizheng/subjectServers/renkou/left'
  import renkouright from '../../components/tizheng/subjectServers/renkou/right'
  import farenleft from '../../components/tizheng/subjectServers/faren/left'
  import farenright from '../../components/tizheng/subjectServers/faren/right'
  import loudongleft from '../../components/tizheng/subjectServers/loudong/left'
  import loudongright from '../../components/tizheng/subjectServers/loudong/right'
  import fangwuleft from '../../components/tizheng/subjectServers/fangwu/left'
  import fangwuright from '../../components/tizheng/subjectServers/fangwu/right'
  import {getParams} from '../../utils/validate'
  import ProtallNav from '../../components/common/ProtallNav'
  import tableauList from '../../components/tizheng/common/reportList'
  import bus from '../../assets/js/main'
  import leftMenu from '../../components/common/leftMenu'//导航栏
  import ChangeMap from '../../components/common/Map/ChangeMap.vue';//深浅地图切换

  export default {
    layout:'yujinjiance',
    head(){
      return {
        title:'城市体征面' ,
        meta:[
          {hid:'description',name:'descriptyion',content:'预警监测平台'},
          {hid:'keywords',name:'keywords',content:'城市体正面'}
        ]
      }
    },
    name: "index",
    components: {
      renkouleft,
      renkouright,
      farenleft,
      farenright,
      loudongleft,
      loudongright,
      fangwuleft,
      fangwuright,
      ProtallNav,
      tableauList,
      selectAddress,
      leftMenu,
      ChangeMap
    },
    data: function () {
      return {
        componentArray:[['renkouleft', 'renkouright'],['farenleft', 'farenright'],['fangwuleft', 'fangwuright'],['loudongleft', 'loudongright']],
        component:['renkouleft', 'renkouright'],
        selectIndex:-1,
        // iconArray:[['../web/img/tizheng/cstz_9.png','../web/img/tizheng/cstz_9hover.png'],['../web/img/tizheng/cstz_10.png','../web/img/tizheng/cstz_10hover.png'],['../web/img/tizheng/cstz_11.png','../web/img/tizheng/cstz_11hover.png'],['../web/img/tizheng/cstz_12.png','../web/img/tizheng/cstz_12hover.png']],
        iconArray:['人    口    基    本    面','法    人    基    本    面','城 市 部 件 基 本 面','楼 栋 房 屋 基 本 面'],
        className:['a_b_a','a_b_b','a_b_c','a_b_d'],
        showTableauList:false,
        tableau_id:'181128/sheet0',
        legendBtnSeleck:0,
        // layerArray:["chengshitizheng_renkoumidu", "chengshitizheng_renkoumidu_shequ", "chengshitizheng_farenshuliang", "chengshitizheng_farenshuliang_shequ", "chengshitizheng_loudongshuliang", "chengshitizheng_loudongshuliang_shequ", "chengshitizheng_fangwushuliang", "chengshitizheng_fangwushuliang_shequ", "chengshitizheng_componentshuliang", "chengshitizheng_componentshuliang_shequ"],
        layerId:'',
        street:'',
        retryTime:-1,
        subjectServersPage:'subjectServersPage'
      }
    },
    beforeDestroy(){
      bus.$off('showTableauList')
    },
    watch:{
      '$store.state.addressStreet':function(val, oldVal) {
        if(val === '福田区'){
          this.street = ''
          this.legendBtnAction(this.layerId,this.legendBtnSeleck,this.street)
        }else {
          this.street = '_shequ'
          this.legendBtnAction(this.layerId,this.legendBtnSeleck,this.street)
        }
        return this.$store.state.addressStreet
      }
    },
    mounted: function () {

      let index = 0
      if(getParams().page !== undefined){
        index = Math.trunc(Number(getParams().page))
        if(index>3 || index <0){
          index = 0
        }
      }
      this.selectIndex = index
      this.component = this.componentArray[this.selectIndex]

      bus.$on('showTableauList',this.showTableau)

      this.firstClick()
    },
    methods:{
      firstClick(){
        try {
          setTimeout(function() {
            document.getElementsByClassName('legendBtn')[0].click()
          },1000)
        } catch (e) {
          console.error(e.message)
          this.firstClick()
        }

      },
      legendBtnAction(id,type,street){
        let $this = this
        try {
          this.legendBtnSeleck = type
          console.log(id,type,street)
          if(this.layerId.length>0){
            document.getElementById("iframeGisMap").contentWindow.module.common.layerControl.mapLayerOperate.removeSingleLayerById(this.layerId)
            this.loadMap(id,street,type)
          }else {
            this.loadMap(id,street,type)
          }

          if(street.length>0){
            if(id.search('_shequ') !== -1){
              this.layerId = id
            }else {
              this.layerId = id+street
            }
          }else {
            this.layerId = id.replace('_shequ','')
          }

        }catch (e) {
          console.error(e.message)
          setTimeout(function() {
            $this.legendBtnAction(id,type,street)
          },1000)

          // if($this.retryTime<6){
          //   setTimeout(function() {
          //     $this.legendBtnAction(id,type,street)
          //   },500)
          //   $this.retryTime += 1
          // }else {
          //   document.location.reload()
          // }
        }
      },
      loadMap(id,street,type){

        // if(id.search('_shequ') !== -1){
        //   street = ''
        // }else {
        //   id += street
        // }

        let node = {}
        if(street.length>0){
          if(id.search('_shequ') !== -1){
            node = document.getElementById("iframeGisMap").contentWindow.module.common.layerControl.mapLayerXml.getLayerNodeById(id)
          }else {
            node = document.getElementById("iframeGisMap").contentWindow.module.common.layerControl.mapLayerXml.getLayerNodeById(id+street)
          }
        }else {
          node = document.getElementById("iframeGisMap").contentWindow.module.common.layerControl.mapLayerXml.getLayerNodeById(id.replace('_shequ',''))
        }

        let temp = this.$store.state.addressStreet
        if(temp === '福田区'){
          temp = ''
        }
        if(type>2){
          node.query = "street="+temp
        }else {
          if(street.length>0){
            node.query = 'tag='+type+"&street="+temp
          }else {
            node.query = 'tag='+type+"&street="
          }
        }
        document.getElementById("iframeGisMap").contentWindow.module.common.layerControl.mapLayerOperate.loadSingleLayerByNode(node)
      },
      showTableau(){
        this.showTableauList = false
      },
      changeComponent(index){
        this.component = this.componentArray[index]
        this.selectIndex = index
        this.$router.push('/subjectServers?page='+index)
        document.location.reload()
      },
      showReportsList:function () {
        // this.reportsList = !this.reportsList
      },
      openTableauList(){
        this.showTableauList = !this.showTableauList
      }
    }
    // async asyncData(context) {
    //   // var url = "http://"+context.req.headers.host+"/popsData.json"
    //   var url = "./popsData.json"
    //   let { data } = await axios.get(url)
    //   return {data: data}
    // }
  }
</script>

<style lang="scss" scoped>
  body{
    margin: 0;
  }
  .map{width:3840px; height:1080px; text-align:center; margin:0 auto; overflow: hidden; position: relative;}
  /* ---------------------------头部----------------------------------------------------------------------------------------------------*/
  .a{width:3780px; height:128px; text-align: left; margin: 0 auto; padding: 0 20px 0 40px; /*overflow: hidden;*/  position: absolute; top:0; left:0; }
  .a_a{width:600px; height:70px; text-align: left; margin: 29px auto;  float: left; display: inline; overflow: hidden;}
  .a_a ul{width:600px; height:70px; text-align: left; margin: 0 auto; overflow: hidden;padding: 0;}
  .a_a ul li{width:250px; height:70px; line-height: 70px; text-align: left; margin: 0 25px;  float: left; display: inline; /*overflow: hidden;*/}
  .a_a ul li img{width:250px; height:70px;}
  .a_b{width:2332px; height:128px; text-align: left; margin: 0 63px 0 114px;  float: left; display: inline; overflow: hidden; background: url(../../assets/img/cstz_5.png) no-repeat;}
  .a_b_temp{ background: url(../../assets/img/cstz_6.png) no-repeat;}
  .a_b ul{
    /*width: 1840px;*/
    height: 56px;
    line-height: 56px;
    text-align: left;
    margin: 72px 156px 0 156px;
    overflow: hidden;
    padding: 0;}
  .a_b ul li{/*width:207px; height:56px;*/ text-align: left; margin: 0 15px 0 15px; float: left; display: inline; overflow: hidden;cursor: pointer;}
  /*.a_b ul li:nth-child(2){margin-right: 827px;}*/
  .a_c{width:101px; height:54px; line-height: 54px; text-align: left; margin-top: 29px;  float: right; display: inline; overflow: hidden; background-color: #021019; border-bottom: #272a7d solid 1px;}
  .a_c img{width:101px; height:54px;}
  .subjectServersMainPage {
    /*position: absolute;*/
    /*top: 150px;*/
    /*left: 40px;*/
    .subjectServersLeft {
      position: absolute;
      top: 90px;
      /* left: 40px; */
      width: 730px;
      background: linear-gradient(to right,rgba(13,32,42,0.8),transparent);
      padding-left: 40px;
      padding-top: 270px;
      padding-bottom: 40px;
    }
    .subjectServersRight {
      position: absolute;
      top: 72px;
      /*right: 40px;*/
      right: 80px;
      background: linear-gradient(to left,rgba(13,32,42,0.8),transparent);
      /*padding-top: 60px;*/
      padding-bottom: 80px;
      padding-top: 70px;
    }
    .visualMap{
      position: absolute;
      bottom: 10px;
      left: 830px;
      img{
        width: 30px;
      }
    }
    .legend{
      position: relative;
      bottom: 130px;
      margin: auto;
      display: inline-block;
      ul{
        padding: 0;
        margin: 0;
        li{
          list-style: none;
          display: inline-block;
          .legendBtn{
            color: white;
            margin: 10px;
            font-size: 18px;
          }
          .legendBtnSeleck{
            color:yellow;
          }
        }
      }
    }
  }
  .door_bar{position: absolute;left:100%;margin-left:-160px;top:30%;margin-top:-22px;width: 101px;height: 54px;}
  .report{
    position: fixed;
    width: 1450px;
    height: 80%;
  }
  .map .tableau_list{
    width: 0;
    height: 0;
    overflow: hidden;
    position: absolute;
    left: 310px;
    top: 88px;
  }
  .a_b_c{
    float: right !important;
  }
  .a_b_d{
    float: right !important;
  }
  .subjectServersPage{
    color:white;
    display: inline-block;
    width: 265px;
    height: 53px;
    line-height: 50px;
    text-align: center;
    font-size: 25px;
    background-image: url("../../static/img/tizheng/265-53.png");
  }
  .subjectServersPage_select{
    color:#e6b600;
    display: inline-block;
    width: 265px;
    height: 53px;
    line-height: 50px;
    text-align: center;
    font-size: 25px;
    font-weight: bold;
    background-image: url("../../static/img/tizheng/265-53.png");
  }
  .change_map{position:absolute;z-index: 1000; bottom:15px; left:15px; width:128px;height:62px;}
  /deep/ .left_menu .left_menu_content{
    background: linear-gradient(90deg, #001521, rgba(3, 32, 80, 0.3)) !important;
  }
</style>
