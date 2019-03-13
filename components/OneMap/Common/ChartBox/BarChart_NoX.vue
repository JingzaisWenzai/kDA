<template>
  <div class="barchart" :id="barChartId">

  </div>
</template>
<style scoped>
  .barchart{
    width:100%;
    height:100%;
    min-width: 400px;
    min-height:200px;
    border:0 solid #f00;
  }
</style>
<script>
  import echart from 'echarts'
  import $ from 'jquery'

  export default{
    name:'BarChart',
    props:['chartData'],
    data(){
      return {
        theColor:'#269d09',
        yMax:'', /*最高柱型500*/
        xAxis:[],
        odata: [],
        barChartId:'',
        dataStyle:[

        ]
      }
    },
    mounted(){
        this.barChartId =  this.chartData.oid;
        let odata = this.dealData(this.chartData.data);
         this.$nextTick(function(){
          this.drawChart(this.barChartId,odata);
        });
    },
    watch:{
      chartData : {
        handler:function(val,oldVal){
          this.barChartId =  val.oid;
          let odata = this.dealData(val.data);
          this.$nextTick(function(){
            this.drawChart(this.barChartId,odata);
          });
        },
        deep:true
      }
    },
    methods:{
      dealData:function(obj){
          let arr = {};
          arr.xAxis =[];
          arr.leg=[];
          arr.data=[];
          if(obj.length!==0){
              for(let i=0;i<obj.length;i++){
                let oname = obj[i].name || '';
                arr.xAxis.push(oname);
                arr.leg.push({
                  name:oname,
                  icon:'rect',
                  textStyle:{
                    color:'#ffffff',
                    fontSize:10
                  }
                })
              }
              arr.data = [].concat(obj);
              arr.yMax=  this.getMaxVal(obj);
          }
          return arr;
      },
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
      drawChart(id,odata){
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
        let colors =['#5bf385','#00a2ff','#d2da00','#ed9c00','#ed0000','#870000'];
        let dataShadow = this.getShadow(odata.data,odata.yMax);
        let opt ={
          title:{
            show:false
          },
          legend:{
            show: true,
            left:'center',
            bottom:'bottom',
            type:'scroll',
            width:'95%',
            orient:'horizontal',
            align:'left',
            itemGap:10,
            itemWidth:15,
            itemHeight:9,
            data:odata.leg
          },
          color:colors,
          grid:{
              show:false,
              left:'15%',
              right:'8%',
              top:'10%',
              bottom:'20%',
              containLabel:true
          },
          xAxis: {
            data: odata.xAxis,
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
              show: true,
              linStyle:{
                  color:['#006197'],
                  width:10,
                  type:'solid',
                  opacity:1
              }
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
              data: odata.data
            }
          ]
        };
        let option = $.extend(defaults, opt);
        myChart.setOption(option);
      }
    }
  }
</script>
