<template>
  <div class="barchart" :id="barChartId">

  </div>
</template>
<style scoped>
  .barchart{
    width:auto;
    height:auto;
    min-width: 400px;
    min-height:340px;
    border:0 solid #f00;
  }
</style>
<script>
  import echart from 'echarts'
  import $ from 'jquery'

  export default{
    name:'BarChart',
    props:['theData'],
    data(){
      return {
        theColor:'#269d09',
        yMax:'', /*最高柱型500*/
        xAxis:[],
        odata: [],
        barChartId:''
      }
    },
    mounted(){
        this.barChartId =  'barchart' + this.theData.c +  this.theData.index;
        let odata = this.theData.item.data;
        for(let i=0;i<odata.length;i++){
          let name = odata[i].name || '';
          this.xAxis.push(name);
        }
        this.yMax = this.getMaxVal(odata);
        console.log(this.barChartId,odata,this.xAxis,this.yMax);
        this.$nextTick(function(){
          this.drawChart(this.barChartId,odata,this.xAxis,this.yMax);
        });
    },
    computed:{
    },
    methods:{
      getMaxVal(odata){
        let res;res = Number(odata[0].value);
        for(let i=0;i<odata.length-1;i++){
          let val1 = Number(odata[i].value), val2 = Number(odata[i+1].value);
          if(val1<val2 && res < val2){
            res = val2;
          }
        }
        return res;
      },
      getShadow(odata,max){
        let arr=[];
        for(let i=0;i<odata.length;i++){
          arr.push(max);
        }
        return arr;
      },
      drawChart(id,data,xAxis,yMax){
        //初始化echarts实例
        let myChart = echart.init(document.getElementById(id));
        let defaults =  {
          title: {
            show:false
          },
          backgroundColor: 'transparent',
          color: ['#eb644b', '#313443', '#fff'],
          tooltip: {
            show: false,
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            show: false
          },
          toolbox: {
            show: false,
            feature: {
              mark: {
                show: true
              },
              dataView: {
                show: true,
                readOnly: false
              },
              restore: {
                show: true
              },
              saveAsImage: {
                show: true
              }
            }
          },
          series: []
        };
        let colors =['#eced04','#35abff','#1bdc7c','#8f6ff8','#f66366','#f79322'];
        let dataShadow = this.getShadow(data,yMax);
        let opt ={
          title:{
            show:false
          },
          color:colors,
          xAxis: {
            data: xAxis,
            axisLabel: {
              inside: false,
              textStyle: {
                color: '#87baf8',
                fontSize:14
              },
              interval:0
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            },
            z: 10
          },
          yAxis: {
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              textStyle: {
                color: '#87baf8',
                fontSize:14
              }
            },
            splitLine:{
                show:'true',
                interval:0,
                lineStyle:{
                    color:['#012f65'],
                    width:'1',
                    type:'solid',
                    opacity:'1'
                }
            }
          },
          dataZoom: [
            {
              type: 'inside'
            }
          ],
          series: [
            { // For shadow
              type: 'bar',
              itemStyle: {
                normal: {color: '#012f65'}
              },
              barMaxWidth:13,
              barGap:'-100%',
              data: dataShadow,
              animation: false
            },
            {
              type: 'bar',
              itemStyle: {
                normal: {
                  barBorderRadius:6,
                  color: new echart.graphic.LinearGradient(
                    0, 0, 0, 1,
                    [
                      {offset: 0, color: '#83bff6'},
                      {offset: 0.5, color: '#188df0'},
                      {offset: 1, color: '#188df0'}
                    ]
                  )
                },
                emphasis: {
                  barBorderRadius:6,
                  color: new echart.graphic.LinearGradient(
                    0, 0, 0, 1,
                    [
                      {offset: 0, color: '#2378f7'},
                      {offset: 0.7, color: '#2378f7'},
                      {offset: 1, color: '#83bff6'}
                    ]
                  )
                }
              },
              barMaxWidth:13,
              data: data
            }
          ]
        };
        let option = $.extend(defaults, opt);
        myChart.setOption(option);
      }
    }
  }
</script>
