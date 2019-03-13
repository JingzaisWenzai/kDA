<template>
  <div class="history_chart">
    <div class="ochart">
      <line-chart></line-chart>  <!--根据btn的不同切换线性图-->
    </div>
    <!--<div class="history_attr_box">
      <span :class="tpl===index?'active':''" @click="changeTo(index)"  v-for="(item, index) in obj" :key="index">{{item.name}}</span>
    </div>-->
  </div>
</template>
<script>
  import LineChart from './Echarts/LineChart.vue';
  export default{
    data(){
        return {
            tpl:0,
            obj:[
              {name:'气压(mPa)', data:[
                {time:'2018-06-10 00',value:'10'},
                {time:'2018-06-10 02',value:'20'},
                {time:'2018-06-10 03',value:'30'}
              ]},
              {name:'二氧化硫(mPa)', data:[
                {time:'2018-06-10 00',value:'10'},
                {time:'2018-06-10 02',value:'20'},
                {time:'2018-06-10 03',value:'30'}
              ]},
              {name:'寝氮化物(mPa)', data:[
                {time:'2018-06-10 00',value:'10'},
                {time:'2018-06-10 02',value:'20'},
                {time:'2018-06-10 03',value:'30'}
              ]},
              {name:'一氧化氮(mPa)', data:[
                {time:'2018-06-10 00',value:'10'},
                {time:'2018-06-10 02',value:'20'},
                {time:'2018-06-10 03',value:'30'}
              ]}
            ],
            chart:[]
          /*chart:[
           {name:'气压',data:[
           {time:'2018-06-10 00',value:'67'},
           {time:'2018-06-10 01',value:'67'},
           {time:'2018-06-10 02',value:'67'},
           {time:'2018-06-10 03',value:'67'},
           {time:'2018-06-10 04',value:'67'},
           {time:'2018-06-10 05',value:'67'},
           {time:'2018-06-10 06',value:'67'},
           {time:'2018-06-10 07',value:'67'}
           ]},
           {name:'二氧化硫',data:[
           {time:'2018-06-10 00',value:'67'},
           ]},
           {name:'二氧化硫',data:[
           {time:'2018-06-10 00',value:'67'},
           ]},
           {name:'二氧化硫',data:[
           {time:'2018-06-10 00',value:'67'},
           ]}
           ],*/
        }
    },
    components:{
      LineChart
    }
  }




  /* time:['2018-06-10 00','2018-06-10 01','2018-06-10 02','2018-06-10 03','2018-06-10 04','2018-06-10 05','2018-06-10 06','2018-06-10 07','2018-06-10 08','2018-06-10 09'],
   data:[
   {
   name:'气压()',
   type:'line',
   stack: '总量',
   data:[120, 132, 101, 134, 90, 230, 210]
   },
   {
   name:'二氧化硫',
   type:'line',
   stack: '总量',
   data:[220, 182, 191, 234, 290, 330, 310]
   },
   {
   name:'氢氧化物',
   type:'line',
   stack: '总量',
   data:[150, 232, 201, 154, 190, 330, 410]
   },
   {
   name:'一氧化碳',
   type:'line',
   stack: '总量',
   data:[320, 332, 301, 334, 390, 330, 320]
   },
   {
   name:'PM10',
   type:'line',
   stack: '总量',
   data:[820, 932, 901, 934, 1290, 1330, 1320]
   },
   {
   name:'PM2.5',
   type:'line',
   stack: '总量',
   data:[120, 132, 101, 134, 90, 230, 210]
   },
   {
   name:'PM1',
   type:'line',
   stack: '总量',
   data:[220, 182, 191, 234, 290, 330, 310]
   },
   {
   name:'负氧离子',
   type:'line',
   stack: '总量',
   data:[150, 232, 201, 154, 190, 330, 410]
   },
   {
   name:'能见度',
   type:'line',
   stack: '总量',
   data:[320, 332, 301, 334, 390, 330, 320]
   },
   {
   name:'风速',
   type:'line',
   stack: '总量',
   data:[820, 932, 901, 934, 1290, 1330, 1320]
   },
   {
   name:'风向',
   type:'line',
   stack: '总量',
   data:[120, 132, 101, 134, 90, 230, 210]
   },
   {
   name:'温度',
   type:'line',
   stack: '总量',
   data:[220, 182, 191, 234, 290, 330, 310]
   },
   {
   name:'湿度',
   type:'line',
   stack: '总量',
   data:[150, 232, 201, 154, 190, 330, 410]
   },
   {
   name:'气压',
   type:'line',
   stack: '总量',
   data:[320, 332, 301, 334, 390, 330, 320]
   },
   {
   name:'太阳辐射',
   type:'line',
   stack: '总量',
   data:[820, 932, 901, 934, 1290, 1330, 1320]
   },
   {
   name:'紫外辐射',
   type:'line',
   stack: '总量',
   data:[120, 132, 101, 134, 90, 230, 210]
   },
   {
   name:'二氧化氮',
   type:'line',
   stack: '总量',
   data:[220, 182, 191, 234, 290, 330, 310]
   }
   ]*/
</script>
<style scoped>
  .history_chart{
    width:100%;
  }
  .history_chart .ochart{
    width:100%;
    height:370px;
    overflow-x: hidden;
    overflow-y: auto;
  }
  /*.history_chart .history_attr_box{
    width:100%;
    clear: both;
    margin-top: 10px;
  }
    .history_attr_box span{
      display: block;
      float: left;
      padding:6px 15px;
      border:1px solid #8b99a2;
      -webkit-border-radius:8px;
      -moz-border-radius:8px;
      border-radius:8px;
      color: #fff;
      font-size: 18px;
      background-color: transparent;
      margin: 0 15px 0 0;
    }
  .history_attr_box span.active{
    background-color: #1c659d;
  }*/
</style>
