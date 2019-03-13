<template>
  <section class="left-bar-container">
    <div class="block-title">
      <p class="main">{{msg.title}}</p>
      <!--<p class="select_box" >
        <span>(</span>
        <span>
          <select name="季度时间选择"  v-model="season">
             <option value ="1">第一季度</option>
             <option value ="2">第二季度</option>
             <option value ="3">第三季度</option>
             <option value ="4">第四季度</option>
          </select>
        </span>
        <span>)</span>
      </p>-->
    </div>
    <div class="block1">
      <p class="tit">{{msg.block1.tit}} <i></i></p>
      <div class="two-block">
        <div class="box" v-for="(a , b) in msg.block1.pieLeft" :key = "a + b" v-if="msg.block1.pieLeft && msg.block1.pieLeft !==[]">
          <a class="title"><span>{{a.name}}</span><span v-if="a.value">{{a.value}}</span></a>
          <a class="content">
            <!--环饼图组件-->
            <chart-box :chart-info="{oid:a.flag, type:a.type,data:a.data,chartType:a.chartType}" ></chart-box>
          </a>
        </div>
        <div class="box" v-for="(item , index) in msg.block1.pieRight" :key = "index" v-if="msg.block1.pieRight && msg.block1.pieRight !==[]">
          <a class="title"><span>{{item.name}}</span><span v-if="item.value">{{item.value}}</span></a>
          <a class="content">
            <!--环饼图组件-->
            <chart-box :chart-info="{oid:item.flag, type:item.type,data:item.data,chartType:item.chartType}"></chart-box>
          </a>
        </div>
      </div>
    </div>
    <div class="block2">
      <p class="tit">{{msg.block2.tit}} <i></i></p>
      <div class="one-block">
        <div class="box" v-for="(c , d) in msg.block2.content" :key = "c + d" v-if="msg.block2.content && msg.block2.content!==[]">
          <a class="title" v-if="c.name && c.name!==''"><span>{{c.name}}</span><span v-if="c.value!==''">{{c.value}}</span></a>
          <a class="content">
            <!--柱状图-->
            <chart-box :chart-info="{oid:c.flag, type:c.type,data:c.data,chartType:c.chartType}"></chart-box>
          </a>
        </div>
      </div>
    </div>
    <div class="block3">
      <p class="tit">{{msg.block3.tit}} <i></i></p>
      <div class="two-block">
        <div  class="box" v-for="(e , f) in msg.block3.content" :key="f" v-if="msg.block3.content && msg.block3.content.length !== 0">
          <a class="title turn_left"  v-if="e.name"><span>{{e.name}}</span><span v-if="e.value">{{e.value}}</span></a>
          <a class="sub" v-if="e.subTitle">{{e.subTitle}}</a>
          <a class="content">
            <!--环饼图组件-->
            <div class="con_chart" v-if="msg.block3.content && msg.block3.content.length !== 0">
              <chart-box v-if="e.typeTitle" :chart-info="{oid:e.flag, type:e.type,data:e.data,chartType:e.chartType,typeTitle:e.typeTitle}"></chart-box>
              <chart-box v-else :chart-info="{oid:e.flag, type:e.type,data:e.data,chartType:e.chartType}"></chart-box>
            </div>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
<style scoped>
  .left-bar-container{
    width: 100%; height:100%;
  }
  .block-title{
    width:100%; margin: 20px 0;
  }
  .block-title p{
    display: inline-block;vertical-align: bottom;padding:0; margin:0;
  }
  .block-title .main{
    font-size: 26px;color:#7af3ff;
  }
  .block-title .select_box{ margin-left: 15px;font-size: 10px;color:#c5e2f2;}
  .block-title .select_box span{display: inline-block;vertical-align: middle; margin-right:10px;}
  .block-title .select_box span select{
    background-color: transparent;font-size: 10px;color:#c5e2f2;
    border: none;
    outline: none;  //清除select聚焦时候的边框颜色
    appearance: none;//隐藏select的下拉图标
    -webkit-appearance: none;
    -moz-appearance: none;
  }
  .block-title .select_box span select option{color:#000000;}
  .block1 .tit,
  .block2 .tit,
  .block3 .tit{
    color: #00c0dd;font-size: 19px;
    margin:15px 0;
    width:auto;
    display: inline-block;
    position: relative;
    border-bottom: 1px solid #00ffff;
  }
  .block1 .tit i,
  .block2 .tit i,
  .block3 .tit i{
    position: absolute;
    left:50%;
    top:100%;
    margin-top:-3px;
    width:0;
    height:0;
    border-left:3px solid transparent;
    border-right:3px solid transparent;
    border-bottom:3px solid #00ffff;
  }
  .two-block,
  .one-block{width:100%;}
  .two-block .box{ display: inline-block; vertical-align: middle; width:49%;color:#c5e2f2;font-size: 16px; text-align: center;}
  .two-block .box a{display: block; width:100%;}
  .box .title{ margin:5px 0;}
  .box .title span{display: inline-block;vertical-align: middle;margin-right: 15px;}
  .box .title span:nth-child(2){color:#fdbe00;font-size: 24px;}
  .two-block .box .content{ width:100%; height:130px;}
  .box .sub{color:#c5e2f2;font-size: 12px;text-align: center;}
  .one-block .box .content{ width:100%; height:180px;}
  .content .con_chart{width: 100%; height:100%;}
  .turn_left {text-align: left!important;}
</style>
<script>
  import ChartBox from '../../Common/ChartBox/ChartBox.vue';
  import {getBlock1 , getBlock2, getBlock3_threeSmall,getBlock3_fire,getBlock3_defense} from '../../../../api/secapi';
  export default{
      data(){
          return{
              season:"1",
              pieRight:{},
              msg:{
                  title:'安全隐患一张图',
                  block1:{
                      tit:'全区安全隐患',
                      pieLeft:[],
                      pieRight:[]
                    },
                    block2:{tit:'区域隐患数量',content:[]},
                    block3:{tit:'隐患分类',content:[]}
              }
          }
      },
    watch:{
       pieRight : {
          handler:function(val,oldVal){

          },
          deep:true
       },
       season:{
         handler:function(val,oldVal){

           this.$nextTick(function(){
             this.getData();
           })
         },
         deep:true
       }
    },
    mounted:function(){
        this.getData();

    },
    methods:{
          dealBlock1:function(block){
              let res={},sum = 0,arr=[];
              res.name = block.name;
              res.flag ='1';
              res.chartType = 'PieChart';
              res.type = 'pie';
              let bdata = block.data;
              for(let i =0;i<bdata.length;i++){
                sum += Number(bdata[i].value);
                arr.push({
                  name : bdata[i].name,
                  value: bdata[i].value
                })
              }
              res.data = [].concat(arr);
              res.value = sum ;
              res.sub =[];
              res.sub.push({
                name:bdata[0].name +'数量',
                value:bdata[0].value,
                flag:'2',
                chartType:'RingChart',
                type:'pie',
                data:bdata[0].data
              });
              return res;
          },
          dealBlock2:function(block){
              let res = {};
              res.name = '';
              res.flag = '3';
              res.chartType = 'BarChartNormalS';
              res.type ='bar';
              res.data = [].concat(block.data);
              return res;
          },
          dealBlock3_threeSmall:function(block){
            let res = {};
            res.name = '三小场所隐患';
            res.value = block.total;
            res.chartType = 'DotCurveChart';
            res.type ='line';
            res.flag = '6';
            res.data =[];
            for(let m in block.data){
                let pp = [];
                let opp = block.data[m];
              for(let n=0;n<opp.length;n++){
                pp.push({
                  name:opp[n].time,
                  value:opp[n].total
                });
              }
              res.data.push({
                name: m,
                data:pp
              })
            }

            return res;
          },
          dealBlock3_safety:function(block){
              let res ={};
              res.name = '安监隐患';
              res.chartType ='ListChart';
              res.type ='list';
              res.flag ='4';
              res.typeTitle=['类型','数量'];
              for(let n in block.data){
                  if(block.data[n].name.indexOf('安监') !== -1){
                    res.value = block.data[n].value;
                    res.data=[].concat(block.data[n].data);
                  }
              }
              return res;
          },
          dealBlock3_fire:function(block){
              let res={};
              res.name = block.name;
              res.chartType ='ListChart';
              res.typeTitle = ['序号','站名','预警次数'];
              res.type ='list';
              res.flag ='5';
              res.subTitle = block.subTitle;
              res.data = [].concat(block.data);
              return res;
          },
          dealBlock3_defense:function(block){
            let res={};
            res.name = block.name;
            res.chartType ='ListChart';
            res.typeTitle = ['序号','站名','预警次数'];
            res.type ='list';
            res.flag ='7';
            res.subTitle = block.subTitle;
            res.data = [].concat(block.data);
            return res;
          },
          async getData (){
               let query ={season:this.season};
               console.log(query);
               let block1 = await  getBlock1(query);
               let block2 = await getBlock2(query);
               let block3_small = await getBlock3_threeSmall(query);
               let block3_fire = await getBlock3_fire(query);
               let block3_defense = await getBlock3_defense(query);
               console.log(block1);
               this.$nextTick(function(){
                 this.msg.block1.pieLeft =[];
                 this.msg.block1.pieLeft.push(this.dealBlock1( block1));
                 this.msg.block1.pieRight=[];
                 this.msg.block1.pieRight = this.dealBlock1(block1).sub? this.dealBlock1(block1).sub : [];
                 this.msg.block2.content =[];
                 this.msg.block2.content.push(this.dealBlock2( block2));
                 this.msg.block3.content=[];
                 this.msg.block3.content.push(this.dealBlock3_safety(block1));
                 this.msg.block3.content.push(this.dealBlock3_fire(block3_fire));
                 this.msg.block3.content.push(this.dealBlock3_threeSmall(block3_small));
                 this.msg.block3.content.push(this.dealBlock3_defense(block3_defense));
               })

          }
    },
    components:{
      ChartBox
    }
  }
</script>
