<template>
  <div class="citypop_container">
    <div class="title"><i class="icon"></i><span>{{popupdata.build}}</span><span style="color: red;font-size: 16px">风险源详情</span><i class="close"  @click="toClose"></i></div>
    <div class="navBar">
      <p v-for="item in navBars"  :key="item.id"  :class="titleName===item.name? 'active':''" @click="switchTit(item.name)" >{{item.text}}</p>
    </div>
    <div class="content">
      <div class="basic" v-if="titleName==='basic'">
        <div class="box">
          <div class="detail">
            <p v-for="(value,key,index) in this.popupdata.basicDetail" :key="index"><span>{{key}} </span><span>:</span><span>{{value}}</span></p>
          </div>
        </div>
      </div>
      <div class="basic" v-if="titleName==='subject'">
        <div class="box">
          <div class="detail">
            <p v-for="(value,key,index) in this.popupdata.subjectDetail" :key="index"><span>{{key}} </span><span>:</span><span>{{value}}</span></p>
          </div>
        </div>
      </div>
      <div class="tableList" v-if="titleName==='agency'">
            <table>
              <thead>
              <tr>
                <td >序号</td>
                <td>类型细分</td>
                <td class="bfb">预警内容</td>
                <td>发生时间</td>
                <td>发生时间</td>
                <td>发生时间</td>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(item,index) in agencyList" :key="index">
                <td >{{item.name}}</td>
                <td>{{item.name}}</td>
                <td >{{item.name}}</td>
                <td>{{item.name}}</td>
                <td >{{item.name}}</td>
                <td>{{item.name}}</td>
              </tr>
              </tbody>
            </table>
            <foot-bar :total="total0" :display="display" :current-page='current' @pagechange="pagechangeagencyList"></foot-bar>
      </div>
      <div class="tableList" v-if="titleName==='riskAssessment'">
            <table>
              <thead>
              <tr>
                <td >序号</td>
                <td>类型细分</td>
                <td class="bfb">预警内容</td>
                <td>发生时间</td>
                <td>发生时间</td>
                <td>发生时间</td>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(item,index) in riskAssessmentList" :key="index">
                <td >{{item.name}}</td>
                <td>{{item.name}}</td>
                <td >{{item.name}}</td>
                <td>{{item.name}}</td>
                <td >{{item.name}}</td>
                <td>{{item.name}}</td>
              </tr>
              </tbody>
            </table>
            <foot-bar :total="total1" :display="display" :current-page='current' @pagechange="pagechangeriskAssessmentList"></foot-bar>
      </div>
      <div class="tableList" v-if="titleName==='risk'">
            <table>
              <thead>
              <tr>
                <td >序号</td>
                <td>类型细分</td>
                <td class="bfb">预警内容</td>
                <td>发生时间</td>
                <td>发生时间</td>
                <td>发生时间</td>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(item,index) in riskList" :key="index">
                <td >{{item.name}}</td>
                <td>{{item.name}}</td>
                <td >{{item.name}}</td>
                <td>{{item.name}}</td>
                <td >{{item.name}}</td>
                <td>{{item.name}}</td>
              </tr>
              </tbody>
            </table>
            <foot-bar :total="total2" :display="display" :current-page='current' @pagechange="pagechangeriskList"></foot-bar>
      </div>
      <div class="tableList" v-if="titleName==='earlyWarning'">
            <table>
              <thead>
              <tr>
                <td >序号</td>
                <td>类型细分</td>
                <td class="bfb">预警内容</td>
                <td>发生时间</td>
                <td>发生时间</td>
                <td>发生时间</td>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(item,index) in earlyWarningList" :key="index">
                <td >{{item.name}}</td>
                <td>{{item.name}}</td>
                <td >{{item.name}}</td>
                <td>{{item.name}}</td>
                <td >{{item.name}}</td>
                <td>{{item.name}}</td>
              </tr>
              </tbody>
            </table>
            <foot-bar :total="total3" :display="display" :current-page='current' @pagechange="pagechangeearlyWarningList"></foot-bar>
      </div>
      <div class="tableList" v-if="titleName==='accident'">
            <table>
              <thead>
              <tr>
                <td >序号</td>
                <td>类型细分</td>
                <td class="bfb">预警内容</td>
                <td>发生时间</td>
                <td>发生时间</td>
                <td>发生时间</td>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(item,index) in accidentList" :key="index">
                <td >{{item.name}}</td>
                <td>{{item.name}}</td>
                <td >{{item.name}}</td>
                <td>{{item.name}}</td>
                <td >{{item.name}}</td>
                <td>{{item.name}}</td>
              </tr>
              </tbody>
            </table>
            <foot-bar :total="total4" :display="display" :current-page='current' @pagechange="pagechangeaccidentList"></foot-bar>
      </div>
    </div>
  </div>
</template>
<script>
  import FootBar from '../../../../components/OneMap/Common/FootBar.vue';
  import {getPopData} from "../../../../api/secapi.js"
  export default{
    data(){
      return {
        titleName:'basic',
        navBars:[
          {text :'基本信息',name:'basic',id:'basic'},
          {text :'责任主体',name:'subject',id:'subject'},
          {text :'监管机构',name:'agency',id:'agency'},
          {text :'风险评估',name:'riskAssessment',id:'riskAssessment'},
          {text :'风险隐患',name:'risk',id:'risk'},
          {text: '风险预警',name:'earlyWarning',id:'earlyWarning'},
          {text: '风险事故',name:'accident',id:'accident'}
        ],
        popupdata:{},
       /* build:'',
        basicDetail: {},
        subjectDetail:{},
        agencyList:[
        ],
        riskAssessmentList:[
        ],
        riskList:[
        ],
        earlyWarningList:[
        ],
        accidentList:[
        ],*/
        agencyList:[
        ],
        riskAssessmentList:[
        ],
        riskList:[
        ],
        earlyWarningList:[
        ],
        accidentList:[
        ],

        //分页插件数据
        total0: 10,     // 记录总条数
        total1: 10,     // 记录总条数
        total2: 10,     // 记录总条数
        total3: 10,     // 记录总条数
        total4: 10,     // 记录总条数
        display: 5,   // 每页显示条数
        current: 1   // 当前的页数
      }
    },
    watch:{
    listenshowpage1: function(a, b) {
      console.log("为：" + this.$store.state.detailMessageId);  //落点id
      this.titleName ="basic";
      this.initData1(this.$store.state.detailMessageId);
    }
    },
   computed: {
      listenshowpage1() {
        return this.$store.state.flag;
      }
    },
    mounted(){
     /* this.initData1();*/
    },
    methods: {
      switchTit: function (name) {
        this.titleName = name;
      },
      toClose: function () {
        this.titleName = "";
      },
      async initData1(id) {
        var popData = await getPopData(id);
        console.log(id);
        this.popupdata = popData

        this.agencyList = this.popupdata.agencyList.slice(0, this.display);
        this.riskAssessmentList = this.popupdata.riskAssessmentList.slice(0, this.display);
        this.riskList = this.popupdata.riskList.slice(0, this.display);
        this.earlyWarningList = this.popupdata.earlyWarningList.slice(0, this.display);
        this.accidentList = this.popupdata.accidentList.slice(0, this.display);

        this.total0 = this.popupdata.agencyList.length;
        this.total1 = this.popupdata.riskAssessmentList.length;
        this.total2 = this.popupdata.riskList.length;
        this.total3 = this.popupdata.earlyWarningList.length;
        this.total4 = this.popupdata.accidentList.length;
      },
      pagechangeagencyList: function (currentPage) {
        this.agencyList = this.popupdata.agencyList.slice((currentPage - 1) * this.display, currentPage * this.display);
      },
      pagechangeriskAssessmentList: function (currentPage) {
        this.riskAssessmentList = this.popupdata.riskAssessmentList.slice((currentPage - 1) * this.display, currentPage * this.display);
      },
      pagechangeriskList: function (currentPage) {
        this.riskList = this.popupdata.riskList.slice((currentPage - 1) * this.display, currentPage * this.display);
      },
      pagechangeearlyWarningList: function (currentPage) {
        this.earlyWarningList = this.popupdata.earlyWarningList.slice((currentPage - 1) * this.display, currentPage * this.display);
      },
      pagechangeaccidentList: function (currentPage) {
        this.accidentList = this.popupdata.accidentList.slice((currentPage - 1) * this.display, currentPage * this.display);
      }
    },
    components:{
      FootBar
    }
  }
</script>
<style>
  /*导航栏的特殊样式*/
  ::-webkit-scrollbar{width:16px!important;height:16px!important;}
  ::-webkit-scrollbar-track,
  ::-webkit-scrollbar-thumb{border-radius:999px!important; border:4px solid transparent!important;}
  ::-webkit-scrollbar-track{box-shadow:1px 1px 5px rgba(185,165,150,.2) inset!important;}
  ::-webkit-scrollbar-thumb{min-height:20px!important;background-clip:content-box!important;box-shadow: 0 0 0 5px rgba(25,109,180,0.5) inset!important;}
  ::-webkit-scrollbar-corner{/*background:transparent;*/}


  .citypop_container{ width: 100%;
    height:auto;
    box-shadow:0 0 5px #1c609d;
    border:1px solid #1c609d!important;
    padding-bottom: 15px;
    background-color:rgba(2,22,35,0.8)!important;
    -webkit-border-radius:5px!important;
    -moz-border-radius:5px!important;
    border-radius:5px!important;
  }
  .citypop_container .title,.citypop_container .navBar, .citypop_container .content{
    width:95%;
    margin:0 auto;
  }
  .citypop_container .title{
    overflow: hidden;
    height:50px;
    padding-top: 10px;
    color: #5fb6ff;
    font-size: 26px;
    position: relative;
  }
  .citypop_container .title i,.citypop_container .title span{
      display: inline-block;
      vertical-align: middle;
  }
  .citypop_container .title .icon{
    width:40px; height:40px;
    background:url('../../../../static/img/aqyhPop/building.png') center no-repeat;
    background-size: contain;
  }
  .citypop_container .title span{
    width:auto;
    margin-left: 20px;
  }
  .citypop_container .title .close{
    cursor: pointer;
    display: block; width:24px; height:24px;background:url('../../../../static/img/aqyhPop/close.png') center no-repeat;
    background-size: contain;position:absolute; left:100%; top:50%; margin-left: -30px;margin-top: -12px;
  }
  .citypop_container .navBar{
    border: 1px solid #0a90b0;
    -webkit-border-radius:5px;
    -moz-border-radius:5px;
    border-radius:5px;
    background-color: rgba(10,36,77,0.5);
    margin-top:15px;
    margin-bottom:20px;
  }
  .citypop_container .navBar p{
    display: inline-block;
    vertical-align: middle;
    width: 14.285%;
   /* max-width: 235px;*/
    height:55px;
    line-height: 55px;
    padding:0;
    margin:0;
    text-align: center;
    font-size: 24px;
    color:rgba(255,255,255,0.5);
    background-color: transparent;
  }
  .citypop_container .navBar p.active,.citypop_container .navBar p:hover{
    color:rgba(255,255,255,1);
    background-color: #196db4;
  }
  .citypop_container .content{
   /* height:525px;*/
    text-align: center;
  }
  /*基本信息*/
  .citypop_container .basic, .aboutHouse,.aboutBuild{
    width:100%;
    height:100%;
    overflow: hidden;
  }
  .citypop_container .basic{
    text-align: left;
    overflow-y: auto;
  }
  .citypop_container .basic .box{
   /* border:1px solid #0a90b0;*/
    /*background-color: rgba(10,36,77,0.5);*/
    margin-bottom: 20px;

  }
  .citypop_container .basic .tit,.citypop_container .basic .detail{
    width:92%;
    margin:0 auto;
  }
  .citypop_container .basic .tit{
    display: block;
    font-size: 24px;
    color:#fff;
    padding:15px;
    text-align: left;
  }
  .citypop_container .basic .detail{
    margin-bottom: 10px;
  }
  .citypop_container .basic .detail p{
    display: block;
    font-size: 18px;
    padding:0;
    margin:30px 0;
    line-height: 22px;
    color:#fff;
    vertical-align: middle;
    width:45%;
    text-align: left;
  }
  .citypop_container .basic .detail p span:nth-child(1){
   color: #9ac2c6;
  }
  .citypop_container .basic .detail p span:nth-child(3){
   color: #7da7ca;
  }
  /*建筑块数据*/
  .citypop_container .aboutBuild{
    overflow-y: auto;
  }
  .citypop_container .aboutBuild .chart-blog{
    width:100%;
    height:auto;
  }
  .citypop_container .aboutBuild .chart-blog .name{
    font-size: 24px;
    color: #00d8ff;
    text-align: left;
    padding:15px 0 2px 0;
  }
  .citypop_container .aboutBuild .chart-blog .chart-box{
    width:99.5%;
    border:1px solid #1a5c75;
    border-top: 1px solid #00d8ff;
    background-color: rgba(6,42,66,0.65);
  }
  .citypop_container .aboutBuild .chart-blog .chart-box .section_3{
    display: inline-block;
    vertical-align: middle;
    width:30%;
  }
  .citypop_container .aboutBuild .chart-blog .chart-box .section_3:nth-child(2),
  .citypop_container .aboutBuild .chart-blog .chart-box .section_3:nth-child(3){
    margin-left: 3%;
  }
  .citypop_container .aboutBuild .chart-blog .chart-box .section_1{
    display: block;
    width:96%;
    margin:0 auto;
  }
  .citypop_container .aboutBuild .chart-blog .chart-box .section_2{
    display: inline-block;
    vertical-align: middle;
    width:45%;
  }
  .citypop_container .aboutBuild .chart-blog .chart-box .section_2:nth-child(odd){
    margin-left: 5%;
  }
  .citypop_container .aboutBuild .chart-blog .chart-box .chart-block{
    text-align: left;
    margin-top: 15px;
  }
  .citypop_container .chart-block p{
    width: auto;
    display: inline-block;
    font-size:22px;
    color:#00d8ff;
    padding:0 5px;
    border:1px solid #00d8ff;
  }
  .citypop_container .chart-block .pie,
  .citypop_container.chart-block .bar{
    width:100%;
    height:320px;
  }



  /*责任主体*/
  .citypop_container .tableList{
    /*  overflow-y: auto;*/
  /*  height: 425px;*/
    /*background-color: #11223a;*/
    opacity: 0.7;
    margin: 0px 1px;
  }
  .citypop_container .tableList table{
    float: left;
    table-layout:fixed;
    width: 100%;
    height: 330px;
    text-align: left;
    margin-top: 25px;
    margin-bottom: 15px;
    padding:0px 20px;
    overflow: hidden;
  }
  .citypop_container .tableList table thead{width:680px; height:50px; line-height: 50px; text-align: center; margin: 0px auto; overflow: hidden; font-size: 18px; color: #ffffff;}
  .citypop_container .tableList table tbody{width:680px; height:360px; line-height: 36px; text-align: center; margin: 0px auto; overflow: hidden; font-size: 16px; color: #43d3ff;}
  .citypop_container .tableList table tbody tr{height: 50px;
  }
  .citypop_container .tableList table tbody tr td{
    border: 1px solid #3e7db2;
    border-width:0px 1px 1px 0px;
  }
  .citypop_container .tableList table thead tr td{
    border: 1px solid #3e7db2;
    border-width:1px 1px 1px 0px;
  }
  .citypop_container .tableList table tbody tr td:nth-child(1),.b_d_b .b_d_b_a table thead tr td:nth-child(1){
    border: 1px solid #3e7db2;
    border-width:0px 1px 1px 1px;
  }
  .citypop_container .tableList table thead tr td:nth-child(1){
    border: 1px solid #3e7db2;
    border-width:1px;
  }
  .citypop_container .tableList table thead tr td:nth-child(1),.b_d_b .b_d_b_a table tbody tr td:nth-child(1){
    width: 10%;
  }


</style>

