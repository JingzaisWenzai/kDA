<template>
  <section class="pop_vertical_container">
    <div class="com" v-for="(item,index) in whole" :key="index">
      <p class="com_tit"><i></i><span>{{item.txt}}</span></p>
      <p class="com_subtit"><a v-for="(a,c) in item.title" :key ='c'>
        <span>{{a.name}}</span><span v-if="a.val" :class="a.val?'col':''">:</span><span :class="a.val?'num':''">{{a.val}}</span>
            <span v-if="a.degree==='优'" class="excellent">{{a.degree}}</span>
            <span v-if="a.degree==='良'" class="good">{{a.degree}}</span>
            <span v-if="a.degree==='轻度污染'" class="light">{{a.degree}}</span>
            <span v-if="a.degree==='中度污染'" class="middle">{{a.degree}}</span>
            <span v-if="a.degree==='重度污染'" class="heavy">{{a.degree}}</span>
            <span v-if="a.degree==='严重污染'" class="fatal">{{a.degree}}</span>
          </a>
      </p>
      <div class="box">
        <chart-box :chart-info="{oid:item.flag, type:item.type,data:item.data,chartType:item.chartType}"></chart-box>
      </div>
    </div>
   <!-- <div class="com">
      <p class="com_tit"><img :src="barTwo.src"><span>{{barTwo.txt}}</span></p>
      <p class="com_subtit"><a v-for="(a,c) in barTwo.title" :key ='c'>
        <span>{{a.name}}</span><span v-if="a.val" :class="a.val?'col':''">:</span><span :class="a.val?'num':''">{{a.val}}</span>
      </a>
      </p>
      <div class="box">
        <chart-box :chart-info="{type:barTwo.type,data:barTwo.data,chartType:barTwo.chartType}"></chart-box>
      </div>
    </div>
    <div class="com">
      <p class="com_tit"><img :src="barThree.src"><span>{{barThree.txt}}</span></p>
      <p class="com_subtit"><a v-for="(a,c) in barThree.title" :key ='c'>
        <span>{{a.name}}</span><span v-if="a.val" :class="a.val?'col':''">:</span><span :class="a.val?'num':''">{{a.val}}</span>
      </a>
      </p>
      <div class="box">
        <chart-box :chart-info="{type:barThree.type,data:barThree.data,chartType:barThree.chartType}"></chart-box>
      </div>
    </div>-->
  </section>
</template>
<script>
  /*右侧弹窗*/
  import right from '../../../../static/img/common/arrow_right.png';
  import ChartBox from '../ChartBox/ChartBox.vue';
  import {getRightPoplist} from "../../../../api/ecoapi.js"

  export default{
      props:['popInfo'],
      data(){
          return{
          /*  rightPopChart:"",*/
          /*  whole:[{
                flag:'987780',
                txt:'空气概况', type:'bar',chartType:'BarChart',
                title:[{name:'福田空气质量指数（AQI）',val:'26',degree:'优'}],
                data:[
                  {value:10, name:'综合'},
                  {value:5, name:'住宅'},
                  {value:15, name:'商业'},
                  {value:25, name:'仓库'},
                  {value:20, name:'办公'}
                ]
              },{
           flag:'987783',
                txt:'预警统计',type:'lineTxt',chartType:'LineChart',
                title:[{name:'现有预警（个）',val:'5'},{name:'当日累计(个)',val:'176'}],
                data:[
                  {name:"风速",data:[
                    {time:"2018-05-21 08", value:"1.792308"},
                    {time:"2018-05-21 09", value:"1.648387"},
                    {time:"2018-05-21 10", value:"2.083333"},
                    {time:"2018-05-21 11", value:"2.380952"},
                    {time:"2018-05-21 12", value:"2.625926"},
                    {time:"2018-05-21 13", value:"2.346875"},
                    {time:"2018-05-21 14", value:"2.98"},
                    {time:"2018-05-21 15", value:"2.504"},
                    {time:"2018-05-21 16", value:"3.011429"},
                    {time:"2018-05-21 17", value:"2.245833"},
                    {time:"2018-05-21 18", value:"2.367442"}
                  ]},
                  {name:"风向",data:[
                    {time:"2018-05-21 08", value:"161.961538"},
                    {time:"2018-05-21 09", value:"220.096774"},
                    {time:"2018-05-21 10", value:"244.6"},
                    {time:"2018-05-21 11", value:"226.095238"},
                    {time:"2018-05-21 12", value:"243"},
                    {time:"2018-05-21 13", value:"228.625"},
                    {time:"2018-05-21 14", value:"156.314286"},
                    {time:"2018-05-21 15", value:"160.92"},
                    {time:"2018-05-21 16", value:"157.970588"},
                    {time:"2018-05-21 17", value:"153.083333"},
                    {time:"2018-05-21 18", value:"154.465116"}
                  ]}
                ]
              },{
           flag:'98778009',
                txt:'污染统计',title:[],type:'line',chartType:'TableChart',
                data:[
                  {name:'深圳河',data:[
                    {name:'河段',value:'深圳河'},{name:'河长',value:'张三'},{name:'联系方式',value:'189****'}
                  ]},
                  {name:'深圳河',data:[
                    {name:'河段',value:'深圳河'},{name:'河长',value:'张三'},{name:'联系方式',value:'189****'}
                  ]},
                  {name:'深圳河',data:[
                    {name:'河段',value:'深圳河'},{name:'河长',value:'张三'},{name:'联系方式',value:'189****'}
                  ]},
                  {name:'深圳河',data:[
                    {name:'河段',value:'深圳河'},{name:'河长',value:'张三'},{name:'联系方式',value:'189****'}
                  ]},
                  {name:'深圳河',data:[
                    {name:'河段',value:'深圳河'},{name:'河长',value:'张三'},{name:'联系方式',value:'189****'}
                  ]},
                  {name:'深圳河',data:[
                    {name:'河段',value:'深圳河'},{name:'河长',value:'张三'},{name:'联系方式',value:'189****'}
                  ]}
                ]
              }
            ],*/ /*空气*/
          /*[
           {
           txt:'水质概况', type:'bar',chartType:'BarChart',
           title:[{name:'福田河流水质状况（今日）'}],
           data:[
           {value:10, name:'综合'},
           {value:5, name:'住宅'},
           {value:15, name:'商业'},
           {value:25, name:'仓库'},
           {value:20, name:'办公'}
           ]
           },
           {
           txt:'预警统计',type:'lineTxt',chartType:'LineChart',
           title:[{name:'现有预警（个）',val:'5'},{name:'当日累计(个)',val:'176'}],
           data:[
           {name:"二氧化硫",data:[
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
           ]
           },{
           txt:'河长信息',title:[],type:'line',chartType:'TableChart',
           data:[
           {name:'深圳河',data:[
           {name:'河段',value:'深圳河'},{name:'河长',value:'张三'},{name:'联系方式',value:'189****'}
           ]},
           {name:'深圳河',data:[
           {name:'河段',value:'深圳河'},{name:'河长',value:'张三'},{name:'联系方式',value:'189****'}
           ]},
           {name:'深圳河',data:[
           {name:'河段',value:'深圳河'},{name:'河长',value:'张三'},{name:'联系方式',value:'189****'}
           ]},
           {name:'深圳河',data:[
           {name:'河段',value:'深圳河'},{name:'河长',value:'张三'},{name:'联系方式',value:'189****'}
           ]},
           {name:'深圳河',data:[
           {name:'河段',value:'深圳河'},{name:'河长',value:'张三'},{name:'联系方式',value:'189****'}
           ]},
           {name:'深圳河',data:[
           {name:'河段',value:'深圳河'},{name:'河长',value:'张三'},{name:'联系方式',value:'189****'}
           ]}
           ]
           }]  水质*/
            whole:[]
          }
      },
      mounted(){
          this.$nextTick(function(){
              this.whole = [].concat(this.popInfo);
          })
      },
      watch:{
        popInfo:{
          handler:function(val,oldVal){
            this.whole = [].concat(val);
          },
          deep:true
        },
        rightPopChart:{
            handler:function(val,oldVal){
                this.initData(val);
            },
            deep:true
        }
      },
      methods:{
          async initData(nameVal){
              let data = await getRightPoplist(nameVal);
              this.whole =  [].concat(this.popInfo);
          }
      },
      components:{
        ChartBox
      }
  }
</script>
<style scoped>
  .pop_vertical_container{ width:100%;/*height:100%;*/ position: relative; overflow: hidden;background-color: transparent;}
  .pop_vertical_container .com{ width: 90%;margin: 0px auto; }
  .com .com_tit{padding:20px 0 15px 0; margin: 0;color:#ffffff;font-size: 26px;}
  .com .com_tit i,.com .com_tit span{display:inline-block;vertical-align: middle;}
  .com .com_tit i{width:18px;height:18px;margin-right: 15px;background: url('../../../../static/img/common/arrow_right.png') no-repeat left center;background-size: contain;}
  .com .com_subtit{color:#ffffff;font-size: 20px; padding:5px 0 5px calc(15px + 18px); margin:0;}
  .com .com_subtit a{display: inline-block;vertical-align: middle;width: auto; margin-right:30px;}
  .com .com_subtit a span{display: inline-block; vertical-align: middle;}
  .com .com_subtit a .col{margin-left: 5px; margin-right: 15px;}
  .com .com_subtit a .num{color: #ff9000;font-size: 20px;}
  .com .com_subtit a .excellent{color:#5bf385;margin-left: 40px;}
  .com .com_subtit a .good{color:#00a2ff;margin-left: 40px;}
  .com .com_subtit a .light{color:#d2da00;margin-left: 40px;}
  .com .com_subtit a .middle{color:#ed9c00;margin-left: 40px;}
  .com .com_subtit a .heavy{color:#ed0000;margin-left: 40px;}
  .com .com_subtit a .fatal{color:#870000;margin-left: 40px;}
  .com .box{width:100%;height:220px;}
</style>
