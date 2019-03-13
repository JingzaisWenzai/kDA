<template>
  <div class="container">
    <div class="title"><i class="icon"></i><span>{{build}}</span><i class="close"  @click="toClose"></i></div>
    <div class="navBar">
      <p v-for="item in navBars"  :key="item.id"  :class="titleName===item.name? 'active':''" @click="switchTit(item.name)" >{{item.text}}</p>
    </div>
    <div class="content">
      <div class="basic" v-if="titleName==='basic'">
        <div class="box" v-for="item in basicDetails" :key="item.id">
          <p class="tit">{{item.name}}</p>
          <div class="detail">
            <p v-for="item in item.data" :key="item.id"><span>{{item.name}} </span><span>:</span><span>{{item.value}}</span></p>
          </div>
        </div>
      </div>
      <div class="aboutBuild" v-else-if="titleName==='aboutBuild'">
          <div class="chart-blog" v-for="(g , c) in pageLayout" :key="c">
            <div class="name">{{g.name}}</div>
            <div class="chart-box">
              <div class="chart-block" :class ='g.cls' v-for="(item , index) in g.data" :key="index">
                <p>{{item.name}}</p>
                <div class="pie pie_0">
                    <component :is="item.chartType" :theData="{item, index, c}"> </component>
                </div>
              </div>
            </div>
          </div>
      </div>
      <div class="aboutHouse" v-else>
        <div class="left">
          <div class="house_info">
            <p class="tit">{{houseDetails[0].name}}</p>
            <div class="box">
              <p v-for="item in houseDetails[0].data" :key="item.id"><span>{{item.name}}</span><span>:</span><span>{{item.value}}</span></p>
            </div>
          </div>
          <div class="resident_info">
            <p class="tit">{{houseDetails[1].name}}</p>
            <div class="box">
              <div v-for="item in houseDetails[1].data" :key="item.id" v-if="houseDetails[1].data.length!==0">
                <p v-if="item.name"><span>姓名</span><span>:</span><span>{{item.name}}</span></p>
                <p v-if="item.tel"><span>联系方式</span><span>:</span><span>{{item.tel}}</span></p>
                <p v-if="item.idcode"><span>身份证</span><span>:</span><span>{{item.idcode}}</span></p>
              </div>
            </div>
          </div>
        </div>
        <div class="right">
          <div class="tit">
            <p class="floor">楼层</p>
            <p class="room">房间</p>
          </div>
          <div class="layer" v-for="(item,index) in houses.data" :key="item.layer">
            <p class="floor">{{item.layer}}</p>
            <p class="room">
              <span :class="roomKey ===index+''+c ? 'active' :''" v-for="(g , c) in item.data" :key="c" @click="show(g,c,index)" :title="g.num"></span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
  /*导航栏的特殊样式*/
  ::-webkit-scrollbar{width:16px!important;height:16px!important;}
  ::-webkit-scrollbar-track,
  ::-webkit-scrollbar-thumb{border-radius:999px!important; border:4px solid transparent!important;}
  ::-webkit-scrollbar-track{box-shadow:1px 1px 5px rgba(185,165,150,.2) inset!important;}
  ::-webkit-scrollbar-thumb{min-height:20px!important;background-clip:content-box!important;box-shadow: 0 0 0 5px rgba(185,165,150,1) inset!important;}
  ::-webkit-scrollbar-corner{/*background:transparent;*/}


  .container{
    width:100%;
    height:100%;
    background:rgba(6,42,66,0.65);
    -webkit-border-radius:5px;
    -moz-border-radius:5px;
    border-radius:5px;
    border:1px solid #0a90b0;
  }
  .title, .navBar, .content{
    width:90%;
    margin:0 auto;
  }
  .title{
    clear: both;
    text-align: left;
    height:90px;
    line-height:90px;
  }
  .title i, .title span{
      display: inline-block;
      vertical-align: middle;
  }
  .title .icon{
    width: 42px;
    height:60px;
    background: url('../../../static/img/yxzx/build-icon.png') no-repeat center;
    background-size: contain;
  }
  .title span{
    width:auto;
    color:#00d8ff;
    font-size: 32px;
    margin-left: 20px;
  }
  .title .close{cursor: pointer;
    width: 30px;
    height:60px;
    background: url('../../../static/img/yxzx/close.png') no-repeat center;
    background-size: contain;
    float: right;
  }
  .navBar{
    border: 1px solid #0a90b0;
    -webkit-border-radius:5px;
    -moz-border-radius:5px;
    border-radius:5px;
    background-color: rgba(10,36,77,0.5);
    margin-top:15px;
    margin-bottom:30px;
  }
  .navBar p{
    display: inline-block;
    vertical-align: middle;
    width:20%;
    max-width: 235px;
    height:55px;
    line-height: 55px;
    padding:0;
    margin:0;
    text-align: center;
    font-size: 24px;
    color:rgba(255,255,255,0.5);
    background-color: transparent;
  }
  .navBar p.active,.navBar p:hover{
    color:rgba(255,255,255,1);
    background-color: #196db4;
  }
  .content{
    height:525px;
    text-align: center;
  }
  /*基本信息*/
  .basic, .aboutHouse,.aboutBuild{
    width:100%;
    height:100%;
    overflow: hidden;
  }
  .basic{
    text-align: left;
  }
  .basic .box{
    border:1px solid #0a90b0;
    background-color: rgba(10,36,77,0.5);
    margin-bottom: 20px;
  }
  .basic .tit, .basic .detail{
    width:92%;
    margin:0 auto;
  }
  .basic .tit{
    display: block;
    font-size: 24px;
    color:#fff;
    padding:15px;
    text-align: left;
  }
  .basic .detail{
    margin-bottom: 10px;
  }
  .basic .detail p{
    display: inline-block;
    font-size: 22px;
    padding:0;
    margin:10px 0;
    line-height: 22px;
    color:#fff;
    vertical-align: middle;
    width:45%;
    text-align: left;
  }
  /*建筑块数据*/
  .aboutBuild{
    overflow-y: auto;
  }
  .aboutBuild .chart-blog{
    width:100%;
    height:auto;
  }
  .aboutBuild .chart-blog .name{
    font-size: 24px;
    color: #00d8ff;
    text-align: left;
    padding:15px 0 2px 0;
  }
  .aboutBuild .chart-blog .chart-box{
    width:99.5%;
    border:1px solid #1a5c75;
    border-top: 1px solid #00d8ff;
    background-color: rgba(6,42,66,0.65);
  }
  .aboutBuild .chart-blog .chart-box .section_3{
    display: inline-block;
    vertical-align: middle;
    width:30%;
  }
  .aboutBuild .chart-blog .chart-box .section_3:nth-child(2),
  .aboutBuild .chart-blog .chart-box .section_3:nth-child(3){
    margin-left: 3%;
  }
  .aboutBuild .chart-blog .chart-box .section_1{
    display: block;
    width:96%;
    margin:0 auto;
  }
  .aboutBuild .chart-blog .chart-box .section_2{
    display: inline-block;
    vertical-align: middle;
    width:45%;
  }
  .aboutBuild .chart-blog .chart-box .section_2:nth-child(odd){
    margin-left: 5%;
  }
  .aboutBuild .chart-blog .chart-box .chart-block{
    text-align: left;
    margin-top: 15px;
  }
  .chart-block p{
    width: auto;
    display: inline-block;
    font-size:22px;
    color:#00d8ff;
    padding:0 5px;
    border:1px solid #00d8ff;
  }
  .chart-block .pie,
  .chart-block .bar{
    width:100%;
    height:320px;
  }

  /*房间信息*/
  .aboutHouse .left,.aboutHouse .right{
    height:99%;
    display: inline-block;
    vertical-align: middle;
    overflow: auto;
  }
  .aboutHouse .left{
    width:45%;
    overflow-y:auto;
    overflow-x: hidden;
  }
  .aboutHouse .left .house_info{
    width:100%;
  }
  .aboutHouse .left .resident_info{
    width:100%;
  }
  .house_info .tit,
  .resident_info .tit{
    color:#00d8ff;
    font-size: 24px;
    text-align: left;
    padding:0;
    margin:0;
  }
  .house_info .box,
  .resident_info .box{
    width:90%;
    margin:0 auto;
    text-align: left;
  }
  .house_info div p{
    width:100%;
    color: #fff;
    font-size:22px;
    text-align: left;
    margin:20px 0;
  }
  .resident_info .box  div{
    border-bottom:1px solid rgba(199,229,255,0.5);
    padding: 12px 0;
    margin-top:6px;
  }
  .resident_info .box  div p{
    display: inline-block;
    vertical-align: middle;
    width:auto;
    padding:0;
    text-align: left;
    color: #fff;
    font-size:22px;
    margin:8px 0;
  }
  .resident_info .box  div p:nth-child(2){
    margin:0 30px;
  }
  .house_info .box p span:nth-child(2),
  .resident_info .box  div p span:nth-child(2){
    margin:0 10px 0 5px;
  }
  .aboutHouse .right{
    width:50%;
    overflow: auto;
    margin-left: 3.5%;
    border:1px solid #0a90b0;
    text-align: left;
  }
  .aboutHouse .right .floor,.aboutHouse .right .room{
    display: inline-block;
    vertical-align: top;
    color: #fff;
    font-size: 20px;
    text-align: center;
    padding:0;
    margin:10px 0;
  }
  .aboutHouse .right .floor{
    width:10%;
  }
  .aboutHouse .right .room{
    width:88%;
    text-align: left;
  }
  .aboutHouse .right .room span{
    display: inline-block;
    vertical-align: middle;
    width:auto;
    height:auto;
    line-height: 40px;
    min-width: 106px;
    min-height:40px;
    background:url('../../../static/img/yxzx/house-bg.png') no-repeat center;
    background-size: contain;
    text-align: left;
  }
  .aboutHouse .right .room span.active,
  .aboutHouse .right .room span:hover{
    background:url('../../../static/img/yxzx/house-bg-hover.png') no-repeat center;
    background-size: contain;
  }


</style>
<script>
  import PieRoseChart from '../Echarts/PieChart-PieRose.vue'
  import BarChart from '../Echarts/BarChart.vue'

  export default{
    data(){
          return {
            titleName:'basic',
            navBars:[
              {text :'基本信息',name:'basic',id:'basic'},
              {text :'建筑块数据',name:'aboutBuild',id:'aboutBuild'},
              {text: '房间信息',name:'aboutHouse',id:'aboutHouse'}
            ],
            build:'国际创新中心',
            pageLayout:[
              {name:'房屋',cls:'section_3',data:[
                {name:'房屋用途',chartType:'PieRoseChart',data:[
                  {value:10, name:'综合'},
                  {value:5, name:'住宅'},
                  {value:15, name:'商业'},
                  {value:25, name:'仓库'},
                  {value:20, name:'办公'}
                ]},
                {name:'使用属性',chartType:'PieRoseChart',data:[
                  {value:10, name:'综合'},
                  {value:5, name:'住宅'},
                  {value:15, name:'商业'},
                  {value:25, name:'仓库'},
                  {value:20, name:'办公'}
                ]},
                {name:'特殊管理',chartType:'PieRoseChart',data:[
                  {value:10, name:'综合'},
                  {value:5, name:'住宅'},
                  {value:15, name:'商业'},
                  {value:25, name:'仓库'},
                  {value:20, name:'办公'}
                ]}
              ]},
              {name:'法人',cls:'section_1',data:[
                {name:'注册经营',chartType:'PieRoseChart',data:[
                  {value:10, name:'综合'},
                  {value:5, name:'住宅'},
                  {value:15, name:'商业'},
                  {value:25, name:'仓库'},
                  {value:20, name:'办公'}
                ]},
                {name:'行业分类',chartType:'BarChart',data:[
                  {value:10, name:'综合'},
                  {value:5, name:'住宅'},
                  {value:15, name:'商业'},
                  {value:25, name:'仓库'},
                  {value:20, name:'办公'}
                ]}
              ]},
              {name:'人口',cls:'section_2',data:[
                {name:'人口基础',chartType:'PieRoseChart',data:[
                  {value:10, name:'综合'},
                  {value:5, name:'住宅'},
                  {value:15, name:'商业'},
                  {value:25, name:'仓库'},
                  {value:20, name:'办公'}
                ]},
                {name:'关爱人群',chartType:'BarChart',data:[
                  {value:10, name:'综合'},
                  {value:5, name:'住宅'},
                  {value:15, name:'商业'},
                  {value:25, name:'仓库'},
                  {value:20, name:'办公'}
                ]},
                {name:'关注人群',chartType:'PieRoseChart',data:[
                  {value:10, name:'综合'},
                  {value:5, name:'住宅'},
                  {value:15, name:'商业'},
                  {value:25, name:'仓库'},
                  {value:20, name:'办公'}
                ]},
                {name:'管控人员',chartType:'PieRoseChart',data:[
                  {value:10, name:'综合'},
                  {value:5, name:'住宅'},
                  {value:15, name:'商业'},
                  {value:25, name:'仓库'},
                  {value:20, name:'办公'}
                ]}
              ]},
              {name:'事件',cls:'section_1',data:[
                {name:'行政执法事件',chartType:'BarChart',data:[
                  {value:10, name:'综合'},
                  {value:5, name:'住宅'},
                  {value:15, name:'商业'},
                  {value:25, name:'仓库'},
                  {value:20, name:'办公'}
                ]}
              ]}
            ],
            houseDetails:[
              {
                "name": "房屋信息",
                "data": []
              },
              {
                "name": "人口信息",
                "data": [{
                  "name": "",
                  "tel": "",
                  "idcode": ""
                }]
              }
            ],
            basicDetails:[{name:'',data:[]}],
            house:{
              "layernum": "4",
              "data": [
                {
                  "layer": "1",
                  "data": [
                    {
                      "code": "440304003004",
                      "num": "101",
                      "data":[]
                    }
                  ]
                }
              ]
            },
            roomKey:''
          }
      },
    props:['buildDetail'],
    mounted(){
      console.log('详情',this.buildDetail)
    },
    computed:{

    },
    methods:{
      async toGetData(){
        await this.$store.dispatch('getBuildDetailData');
        await this.$store.dispatch('getBuildHouseData');
        this.basicDetails.length =0;
        this.basicDetails = this.$store.state.build.basicDetails;
        this.houses =this.$store.state.build.houses[1];
        this.houseDetails.length = 0;
        this.houseDetails = this.$store.state.build.houseDetail;

        console.log(this.houses);
      },
      switchTit:function(name){
          this.titleName = name;
      },
      show:function(house,c,index){
          this.roomKey =index +''+c;
         this.houseDetails.length = 0;
         this.houseDetails = [].concat(house.data);
      },
      toClose:function(){
          let obarTit ='';
          /*$emit触发当前实例上的事件。附加参数都会传给监听器回调。*/
          this.$emit('barTitChanged',obarTit);  /*将其关闭*/
        //  alert(this.barTit)
      }
    },
    beforeMount(){
      this.toGetData();
    },
    components:{
      PieRoseChart,
      BarChart
    }
  }
</script>
