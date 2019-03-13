<template>
  <div class="dot_detail">
    <div class="tit"><span>{{obj.name}}</span> <i class="close"  @click="toClose"></i></div>
    <div class="nav">
      <span :class="tpl ==='details'? 'active':''"  @click="changeTo('details')">当前详情</span>
      <span>|</span>
      <span :class="tpl ==='history'? 'active':''" @click="changeTo('history')">历史查询</span>
    </div>
    <div class="cnt detail" v-if="tpl === 'details'">
      <div class="box">
        <div class="left">
          <div class="time"><p>{{otime}}</p><p>{{oweather}}</p></div>
          <div class="attr">
            <p v-for="(item , index) in obj.attr" :key="index"><span>{{item.name}}</span><span>:</span><span>{{item.value}}</span></p>
          </div>
        </div>
        <div class="right" v-if="obj.url"><img :src ='obj.url' /></div>
      </div>
      <div class="key" v-if="obj.key">
        <p class="tit">关键指标</p>
        <!--<p><span></span><span v-for="(item , index) in yaxis" :key="index"></span><span>{{item}}</span></p>
        <p><span></span><span></span><span></span></p>-->
        <two-table :the-obj ='obj.key'></two-table>
      </div>
      <div class="whole">
        <p class="tit">全部指标数值</p>
        <toy-bricks :the-obj ='otoy'></toy-bricks>
      </div>
    </div>
    <div class="cnt history" v-else-if="tpl ==='history'">
      <div class="type_select_bar">
        <p><span>类别</span><span>:</span><span class="the-type-select"><type-select></type-select></span></p>
        <p><span>时间</span><span>:</span><span class="the-time-select"><time-select></time-select></span></p>
      </div>-
      <div class="show_form_select">
        <span :class="sub_type==='chart'?'active':''" @click="subChangeTo('chart')">图表</span><span>|</span><span :class="sub_type==='table'?'active':''" @click="subChangeTo('table')">列表</span>
      </div>
      <div class="show_box" v-if="sub_type==='chart'">
        <history-chart :the-obj = 'chart'></history-chart>
      </div>
      <div class="show_box" v-else>
        <common-table :the-obj ='otable'></common-table>
      </div>
    </div>
  </div>
</template>
<style scoped="scoped">
  /*导航栏的特殊样式*/
  ::-webkit-scrollbar{width:16px!important;height:16px!important;}
  ::-webkit-scrollbar-track,
  ::-webkit-scrollbar-thumb{border-radius:999px!important; border:4px solid transparent!important;}
  ::-webkit-scrollbar-track{box-shadow:1px 1px 5px rgba(185,165,150,.2) inset!important;}
  ::-webkit-scrollbar-thumb{min-height:20px!important;background-clip:content-box!important;box-shadow: 0 0 0 5px rgba(185,165,150,1) inset!important;}
  ::-webkit-scrollbar-corner{/*background:transparent;*/}

  .dot_detail{
  width:1550px;
  height:600px;
  border:1px solid #00d8ff;
  -webkit-border-radius:8px;
  -moz-border-radius:8px;
  border-radius:8px;
  background-color: rgba(6,42,66,0.65);
}
  .dot_detail .tit,
  .dot_detail .nav,
  .dot_detail .cnt{
    width: 95%;
    margin:0 auto;
  }
  .dot_detail .tit{
    text-align: left;
    color: #00e4ff;
    font-size: 30px;
    margin-top: 10px;
    padding:0;
    line-height: 45px;
  }
  .dot_detail .tit .close{
    cursor:pointer;
    width: 30px;
    height:60px;
    background: url('../../../static/img/yxzx/close.png') no-repeat center;
    background-size: contain;
    float: right;
  }
  .dot_detail .nav{
    color: #fff;
    font-size: 24px;
    line-height: 45px;
    padding:0;
  }
  .dot_detail .nav span{
    display: inline-block;
    vertical-align: middle;
    width: auto;cursor:pointer;
  }
  .dot_detail .nav span:nth-child(2){
    color: #3baaf0;
    margin: 0 20px;
  }
  .dot_detail .nav span.active{
    color: #fb9704;
  }
 /*当前详情*/
  .dot_detail .detail,
  .dot_detail .history{
    overflow-x: hidden;
    overflow-y: auto;
    height:480px;
  }
  .dot_detail .detail .box,
  .dot_detail .detail .key,
  .dot_detail .detail .whole{
    width:100%;
    clear: both;
  }
  .dot_detail .detail .box .left,
  .dot_detail .detail .box .right{
     display: inline-block;
    vertical-align: middle;
  }
  .dot_detail .detail .box .left{
    width:77%;
  }
  .dot_detail .detail .box .right{
    width: 20%;
  }
  .dot_detail .detail .box .right img{
    display: block;
    margin: 0 auto;
    width:80%;
    max-width: 100%;
    height:auto;
    min-height:120px;
    max-height: 220px;
    border-color: transparent;
  }
  .detail .box .left .time,
  .detail .box .left .attr{
    width:100%;
    clear: both;
  }
  .dot_detail .detail .box .left .time p,
  .dot_detail .detail .box .left .attr p{
    float: left;
    padding:0 15px;
    margin:0;
    width:auto;
    height:45px;
  }
  .dot_detail .detail .box .left .time p{
    line-height: 45px;
    font-size: 18px;
    color: #fff;
  }
  .dot_detail .detail .box .left .attr p span{
    display: inline-block;
    vertical-align: middle;
    width: auto;
    line-height: 45px;
    font-size: 18px;
    color: #fff;
  }
  .dot_detail .detail .box .left .attr p span:nth-child(2){
    margin: 0 8px;
  }
  .dot_detail .detail .key .tit,
  .dot_detail .detail .whole .tit{
    width:98%;
    margin: 20px auto 10px auto;
    color: #fff;
    font-size: 24px;
  }
/*历史信息*/
  .dot_detail .history .type_select_bar,
  .dot_detail .history .show_form_select,
  .dot_detail .history .show_box{
    width:100%;
    clear: both;
    text-align: left;
  }
  .type_select_bar p{
    display: block;
    float: left;
    margin:0;
    padding:0;
    line-height: 45px;
    height:45px;
  }
  .type_select_bar p span{
    display: inline-block;
    vertical-align: middle;
    width:auto;
    color: #fff;
    font-size: 18px;
    padding:0 6px;
  }
  .type_select_bar p span:nth-child(2){
    padding: 0 10px 0 0;
  }
  .type_select_bar p .the-type-select{
    width:140px;
    height:30px;
  }
  .type_select_bar p .the-time-select{
    width:340px;
    height:30px;
  }
  .show_form_select span{
    display: inline-block;
    vertical-align: middle;
    width:auto;
    color: #fff;
    font-size: 24px;
    line-height: 45px;
    height:45px;
    cursor:pointer;
  }
  .show_form_select span.active{
    color: #ff9700;
  }
  .show_form_select span:nth-child(2){
    margin:0 15px;
    color:#3baaf0;
  }
  .dot_detail .history .show_box{
    margin-top: 20px;
    height:360px;
  }
</style>
<script>
  import TwoTable from '../Common/TwoTable.vue';
  import ToyBricks from '../Common/ToyBricks.vue';
  import TypeSelect from '../Common/TypeSelect.vue';
  import TimeSelect from '../Common/TimeSelect.vue';
  import HistoryChart from '../Block/HistoryChart.vue';
  import CommonTable from '../Common/CommonTable.vue';

  export default{
      props:['dotType'],
      data(){
          return {
              /*
              obj:{
                  name:'凤塘河口',
                  attr:[
                    {name:'浊度(mg/L)',value:'16.95'},
                    {name:'pH',value:'6.93'},
                    {name:'溶解氧（mg/L）',value:'0.24'},
                    {name:'水温（℃）',value:'24.94'},
                    {name:'电导率（μS/cm）',value:'16676.23'},
                    {name:'化学需氧量（mg/L）',value:'41.85'},
                    {name:'负氧离子',value:'955.507476'}
                  ],
                  data:[
                    {name:'浊度(mg/L)',value:'16.95'},
                    {name:'pH',value:'6.93'},
                    {name:'溶解氧（mg/L）',value:'0.24'},
                    {name:'水温（℃）',value:'24.94'},
                    {name:'电导率（μS/cm）',value:'16676.23'},
                    {name:'化学需氧量（mg/L）',value:'41.85'},
                    {name:'负氧离子',value:'955.507476'},
                    {name:'PM1',value:'13.985103'},
                    {name:'总氮（mg/L）',value:'12.5'},
                    {name:'氨氮（mg/L）',value:'3.8'},
                    {name:'总磷（mg/L）',value:'0.42'}
                  ],
                url:'/img/images/test_03.png'
              },
              obj2:{
                  name:'福田环境监测大楼固定站',
                  attr:[
                    {name:'空气质量指数类别',value:'优'},
                    {name:'空气质量指数级别',value:'一级'},
                    {name:'空气质量指数',value:'41'},
                    {name:'首要污染物',value:'PM10'}
                  ],
                  data:[
                    {name:'浊度(mg/L)',value:'16.95'},
                    {name:'pH',value:'6.93'},
                    {name:'溶解氧（mg/L）',value:'0.24'},
                    {name:'水温（℃）',value:'24.94'},
                    {name:'电导率（μS/cm）',value:'16676.23'},
                    {name:'化学需氧量（mg/L）',value:'41.85'},
                    {name:'负氧离子',value:'955.507476'},
                    {name:'PM1',value:'13.985103'},
                    {name:'总氮（mg/L）',value:'12.5'},
                    {name:'氨氮（mg/L）',value:'3.8'},
                    {name:'总磷（mg/L）',value:'0.42'}
                  ],
                  key:[
                    {name:'浓度',value:[
                      {name:'二氧化硫',value:'10.0'},
                      {name:'一氧化碳',value:'24.2'},
                      {name:'二氧化氮',value:'36.15'},
                      {name:'臭氧',value:'16.45'},
                      {name:'颗粒物（粒径小于10μm）',value:'40.7'},
                      {name:'颗粒物（粒径小于2.5μm）',value:'24.1'}
                    ]},
                    {name:'分指数',value:[
                      {name:'二氧化硫',value:'3'},
                      {name:'一氧化碳',value:'0'},
                      {name:'二氧化氮',value:'18'},
                      {name:'臭氧',value:'5'},
                      {name:'颗粒物（粒径小于10μm）',value:'41'},
                      {name:'颗粒物（粒径小于2.5μm）',value:'34'}
                    ]}
                  ]
                },*/
              tpl:'details', /*当前详情和历史查询切换*/
              sub_type:'chart', /*图表和列表的切换*/
              otoy:'',  /*传递数据给 ToyBricks.vue*/
              obj:[]
         /*     otable:[
              {
                data:[
                  {name:'监测时间',value:'2018-06-10-00'},
                  {name:'温度（℃）',value:'27.4'},
                  {name:'湿度（%）',value:'99.9'},
                  {name:'气压（千帕）',value:'96.3'},
                  {name:'氮氧化物（微克/m³）',value:'36.8'},
                  {name:'二氧化氮（微克/m³）',value:'36.15'},
                  {name:'一氧化碳（微克/m³）',value:'24.2'},
                  {name:'二氧化硫（微克/m³）',value:'10'},
                  {name:'臭氧（微克/㎡）',value:'16.45'},
                  {name:'负氧离子（微克/m³）',value:'947.3'}
                ]
              },
              {
                data:[
                  {name:'监测时间',value:'2018-06-10-01'},
                  {name:'温度（℃）',value:'27.4'},
                  {name:'湿度（%）',value:'99.9'},
                  {name:'气压（千帕）',value:'96.3'},
                  {name:'氮氧化物（微克/m³）',value:'36.8'},
                  {name:'二氧化氮（微克/m³）',value:'36.15'},
                  {name:'一氧化碳（微克/m³）',value:'24.2'},
                  {name:'二氧化硫（微克/m³）',value:'10'},
                  {name:'臭氧（微克/㎡）',value:'16.45'},
                  {name:'负氧离子（微克/m³）',value:'947.3'}
                ]
              },
              {
                data:[
                  {name:'监测时间',value:'2018-06-10-02'},
                  {name:'温度（℃）',value:'27.4'},
                  {name:'湿度（%）',value:'99.9'},
                  {name:'气压（千帕）',value:'96.3'},
                  {name:'氮氧化物（微克/m³）',value:'36.8'},
                  {name:'二氧化氮（微克/m³）',value:'36.15'},
                  {name:'一氧化碳（微克/m³）',value:'24.2'},
                  {name:'二氧化硫（微克/m³）',value:'10'},
                  {name:'臭氧（微克/㎡）',value:'16.45'},
                  {name:'负氧离子（微克/m³）',value:'947.3'}
                ]
              }
            ]*/
          }
      },
     methods:{
       changeTo:function(attr){
           if(attr){
              this.tpl = attr;
           }
       },
       subChangeTo:function(attr){
         if(attr){
           this.sub_type = attr;
         }
       },
       getTheData:function(n,arr){
         let oarr=[];
         for(let i=0;i<arr.length;i+=n){
           oarr.push(arr.slice(i,i+n));
         }
         return oarr;
       },
       toClose:function(){
         let obarTit ='';
         /*$emit触发当前实例上的事件。附加参数都会传给监听器回调。*/
         this.$emit('dotBar',obarTit);  /*将其关闭*/
         //  alert(this.barTit)
       },
       async toGetData(){
           console.log(this.dotType);
           if(this.dotType === 'air'){
             await this.$store.dispatch('getHistoryChartData');
             await this.$store.dispatch('getHistoryTableData');
             await this.$store.dispatch('getAirDetailData');
           }else{
               console.log(this.dotType);
             await this.$store.dispatch('getHistoryChartData');
             await this.$store.dispatch('getHistoryTableData');
             await this.$store.dispatch('getWaterDetailData');
           }
             this.chart = this.$store.state.historyChart;
             this.otable = this.$store.state.historyTable;
             this.obj=[];
             this.obj = this.toWriteObj(this.$store.state.popobj);
             this.otoy = this.getTheData(8,this.obj.data);
             let a= {
                 chart:this.chart,
                 otable :this.otable,
               obj:this.obj,
                otoy:this.otoy
             };

             console.log(a);
       },
       toWriteObj(arr){
           let qobj ={};
           let pobj = arr;
           for(let i=0;i<pobj.length;i++){
             if(pobj[i].name ==='name'){
               qobj.name = '';
               qobj.name = pobj[i].data;
             }else if(pobj[i].name ==='attr'){
               qobj.attr =[];
               qobj.attr = [].concat(pobj[i].data);
             }else if(pobj[i].name ==='key'){
               qobj.key=[];
               qobj.key = [].concat(pobj[i].data);
             }else if(pobj[i].name ==='url'){
               qobj.url ='';
               qobj.url = pobj[i].data;
             }else if(pobj[i].name ==='data'){
               qobj.data =[];
               qobj.data =[].concat(pobj[i].data);
             }else{

             }
           }
           return qobj;
       }
     },
    beforeMount(){
      console.log(this.dotType);
          this.toGetData();
    },
    watch:{
      dotType:function(){
        this.toGetData();
      }
    },
    computed:{
        otime : function(){
          let time;
          let today = new Date();
          let hh = today.getHours();
          let mm = today.getMinutes();
          let ss = today.getSeconds();
          let day = today.getDay();/*返回几号*/
          let date = today.getDate(); /*返回周几*/
          let year = today.getFullYear();
          let month = today.getMonth()+1;
          let hour,num;
          if(hh>12){
              num = hh-12;
              hour = "下午" + num + '点';
          }else{
              num =hh;
              hour = "上午" + num +' 点';
          }
          time = year + '年'+ month +'月'+day+'日'+"\n"+hour;
           return time;
        },
        oweather : function(){
            let weather;
            weather = '西南风2级        23℃       晴';
          return weather;
        },

    },
    components:{
      TwoTable,
      ToyBricks,
      TypeSelect,
      TimeSelect,
      HistoryChart,
      CommonTable
    }
  }
</script>
