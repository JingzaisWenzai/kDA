<template>
  <div id="line"></div>
</template>
<style scoped>
#line{
  width:100%;
  height:100%;
  min-width: 1460px;
  min-height:290px;
  border:0 solid #f00;
  overflow-x: hidden;
  overflow-y: auto;
}
</style>
<script>
  import echart from 'echarts';
  import $ from 'jquery';

  export default{
    data(){
      return{
        myChart:[]
      }
    },/*
    created(){
      //执行actions.js中的加载函数
    //  this.$store.dispatch('commitHistoryChartData');
    },*/
    mounted(){
      this.doDraw();
    },
    updated(){
      if (!this.myChart) {
        this.drawLine();
      }
      this.chartChange();
    },
    computed:{
       theObj(){
           return this.$store.state.historyChart;
        },
        obj(){
            let arr={};
            /*将时间独立出来*/
            arr.time=[];
            arr.data =[];
            if(this.theObj.length !==0){
              let chart= this.theObj[0].data;
              let charts =this.theObj;
              for(let i=0;i<chart.length;i++){
                arr.time.push(chart[i].time);
              }

              for(let j=0;j<charts.length;j++){
                arr.data.push({
                  name:charts[j].name,
                  type:'line',
                  stack: '总量',
                  data: this.getData(charts[j].data)
                });
              }
            }
            /*else{
                arr={
                    time:['2018-06-10 00','2018-06-10 01','2018-06-10 02','2018-06-10 03','2018-06-10 04','2018-06-10 05','2018-06-10 06','2018-06-10 07','2018-06-10 08','2018-06-10 09'],
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
                          }
                      ]
                }
            }*/
          return arr;
        },
        origin(){
            return this.obj;
        },
        opt(){
            let that = this;
            let optt ={
              title:{
                show:false
              },
              color:['#5d999e','#786e7c','#803240','#e3a14f','#dbb388'],
              legend:{
                show:true,
                type:'scroll',
                left:'left',
                bottom:'bottom',
                width:'95%',
                orient:'horizontal',
                align:'left',
                itemGap:10,
                formatter:'{name}',
                itemWidth:0,
                itemHeight:0,
                selectedMode:true,
                inactiveColor:'#ccc',
                textStyle:{
                  color:'#fff',
                  fontSize:18,
                  backgroundColor:'transparent',
                  borderColor:'#8e9ca7',
                  borderWidth:1,
                  borderRadius:5,
                  padding:[3,30]
                }
              },
              grid:{
                show:false,
                left:'0',
                top:'3%',
                right:'0',
                bottom:'15%',
                containLabel:true
              },
              xAxis:{
                show:true,
                position:'bottom',
                type:'category',
                nameLocation:'end',
                nameTextStyle:{
                  color:'#fff',
                  fontSize:16
                },
                boundaryGap:true,
                nameGap:5,
                axisLine:{ /*轴线*/
                  /*symbol:['none','arrow'],
                   symbolSize:[10,15],*/
                  lineStyle:{
                    color:'rgba(255,255,255,0.2)',
                    width:1,
                    type:'solid'
                  }
                },
                axisTick:{     /*刻度*/
                  show:true,
                  interval:0,
                  alignWithLabel:false
                },
                axisLabel:{   /*刻度标签*/
                  show:true,
                  color:'#fff',
                  fontSize:14
                },
                splitLine:{  /*坐标轴在grid中的分割线*/
                  show:false
                },
                splitArea:{   /*坐标轴在gridz中的分隔区域*/
                  show:false
                },
                data: that.origin.time
              },
              yAxis:{
                type:'value',
                show:true,
                position:'left',
                nameLocation:'end',
                nameTextStyle:{
                  color:'#fff',
                  fontSize:16
                },
                nameGap:5,
                axisLine:{ /*轴线*/
                  show:false
                },
                axisTick:{     /*刻度*/
                  show:false
                },
                axisLabel:{   /*刻度标签*/
                  show:true,
                  alignWithLabel:true,
                  interval:0,
                  color:'#fff',
                  fontSize:16

                },
                splitLine:{  /*坐标轴在grid中的分割线*/
                  show:true,
                  interval:0,
                  lineStyle:{
                    color:['#42586a','rgba(255,255,255,0.2)'],
                    type:'dashed',
                    width:1
                  }

                },
                splitArea:{   /*坐标轴在gridz中的分隔区域*/
                  show:false
                }
              },
              series: that.origin.data
            };
            return optt;
        }
    },
    methods:{
        drawLine(){
            this.myChart =echart.init(document.getElementById('line'));
         /*   let opt={
            title:{
              show:false
            },
            color:['#5d999e','#786e7c','#803240','#e3a14f','#dbb388'],
              legend:{
              show:true,
                type:'scroll',
                left:'left',
                bottom:'bottom',
                width:'95%',
                orient:'horizontal',
                align:'left',
                itemGap:10,
                formatter:'{name}',
                itemWidth:0,
                itemHeight:0,
                selectedMode:true,
                inactiveColor:'#ccc',
                textStyle:{
                color:'#fff',
                  fontSize:18,
                  backgroundColor:'transparent',
                  borderColor:'#8e9ca7',
                  borderWidth:1,
                  borderRadius:5,
                  padding:[3,30]
              }
            },
            grid:{
              show:false,
                left:'0',
                top:'3%',
                right:'0',
                bottom:'15%',
                containLabel:true
            },
            xAxis:{
              show:true,
                position:'bottom',
                type:'category',
                nameLocation:'end',
                nameTextStyle:{
                color:'#fff',
                  fontSize:16
              },
              boundaryGap:true,
                nameGap:5,
                axisLine:{ /!*轴线*!/
                /!*symbol:['none','arrow'],
                 symbolSize:[10,15],*!/
                lineStyle:{
                  color:'rgba(255,255,255,0.2)',
                    width:1,
                    type:'solid'
                }
              },
              axisTick:{     /!*刻度*!/
                show:true,
                  interval:0,
                  alignWithLabel:false
              },
              axisLabel:{   /!*刻度标签*!/
                show:true,
                  color:'#fff',
                  fontSize:14
              },
              splitLine:{  /!*坐标轴在grid中的分割线*!/
                show:false
              },
              splitArea:{   /!*坐标轴在gridz中的分隔区域*!/
                show:false
              },
              data: this.obj.time
            },
            yAxis:{
              type:'value',
                show:true,
                position:'left',
                nameLocation:'end',
                nameTextStyle:{
                color:'#fff',
                  fontSize:16
              },
              nameGap:5,
                axisLine:{ /!*轴线*!/
                show:false
              },
              axisTick:{     /!*刻度*!/
                show:false
              },
              axisLabel:{   /!*刻度标签*!/
                show:true,
                  alignWithLabel:true,
                  interval:0,
                  color:'#fff',
                  fontSize:16

              },
              splitLine:{  /!*坐标轴在grid中的分割线*!/
                show:true,
                  interval:0,
                  lineStyle:{
                  color:['#42586a','rgba(255,255,255,0.2)'],
                    type:'dashed',
                    width:1
                }

              },
              splitArea:{   /!*坐标轴在gridz中的分隔区域*!/
                show:false
              }
            },
            series: this.obj.data
          };*/
          let defaults ={
               title:{
                  show:false
               },
               legend:{
                  show:false
               },
               grid:{
                  show: false
               },
               xAxis:{
                   position:'bottom',
                   type:'category',
                   nameLocation:'end',
                   nameTextStyle:{
                     color:'#fff',
                     fontSize:16
                   },
                   nameGap:5,
                   axisLine:{ /*轴线*/
                     lineStyle:{
                       color:'#5e7587',
                       width:1,
                       type:'solid'
                     }
                   },
                   axisTick:{     /*刻度*/
                      show:false
                   },
                   axisLabel:{   /*刻度标签*/
                      show:false
                   },
                   splitLine:{  /*坐标轴在grid中的分割线*/
                      show:false
                   },
                   splitArea:{   /*坐标轴在gridz中的分隔区域*/
                    show:false
                   }
                 },
             yAxis:{
               position:'left',
               nameLocation:'end',
               nameTextStyle:{
                 color:'#fff',
                 fontSize:16
               },
               nameGap:5,
               axisLine:{ /*轴线*/
                 lineStyle:{
                   color:'#5e7587',
                   width:1,
                   type:'solid'
                 }
               },
               axisTick:{     /*刻度*/
                show:false
               },
               axisLabel:{   /*刻度标签*/
                show:false
               },
               splitLine:{  /*坐标轴在grid中的分割线*/
                show:false
               },
               splitArea:{   /*坐标轴在gridz中的分隔区域*/
                show:false
               }
             },
             series:[]};
          let option =$.extend(defaults, this.opt);
          this.myChart.setOption(option);
        },
        getData:function(da){
              let arr =[];
              for(let k =0;k<da.length;k++){
                  arr.push(da[k].value);
              }
              return arr;
        },
        chartChange(){
          this.myChart.setOption(this.opt);
        },
        async doDraw(){
          await this.$store.dispatch('getHistoryChartData');
          this.drawLine();
        }
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
