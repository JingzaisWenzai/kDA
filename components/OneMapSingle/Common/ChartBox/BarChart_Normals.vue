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
    name:'BarChart_Normals',
    props:['chartData'],
    data(){
      return {
        theColor:'#269d09',
        yMax:'', /*最高柱型500*/
        xAxis:[],
        odata: [],
        barChartId:'',
        dataStyle:[],
        colors:['#6000ff','#0057e5','#00c5fc','#9ee006']
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
            let num = i< this.colors.length ? i : Math.floor(i % this.colors.length);
            arr.data.push({
              name: oname,
              type:'bar',
              barGap:0,
              itemStyle: {
                normal: {
                  barBorderRadius:0,
                  color: new echart.graphic.LinearGradient(
                    0, 0, 0, 1,
                    [
                      {offset: 0, color: this.colors[num]},
                      {offset: 1, color: '#13142f'}
                    ]
                  )
                }
              },
              data:obj[i].data
            });
            arr.leg.push({
              name:oname,
              icon:'rect',
              textStyle:{
                color:'#cccccc',
                fontSize:10
              }
            })
          }

          for(let j=0;j<obj[0].data.length;j++){
            arr.xAxis.push(obj[0].data[j].name);
          }
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
            itemGap:20,
            itemWidth:15,
            itemHeight:9,
            data:odata.leg
          },
          color:this.colors,
          grid:{
            show:false,
            left:'5%',
            right:'5%',
            top:'10%',
            bottom:'20%',
            containLabel:true,
            interval:0
          },
          xAxis: {
            data: odata.xAxis,
            axisLabel: {
              inside: false,
              textStyle: {
                color: '#ffffff',
                fontSize:10
              },
              interval:0
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: true,
              linStyle:{
                color:['#514c52'],
                width:10,
                type:'solid',
                opacity:1
              }
            },
            z: 10
          },
          yAxis: {
            axisLine: {
              show: true,
              linStyle:{
                color:['#514c52'],
                width:10,
                type:'solid',
                opacity:1
              }
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              textStyle: {
                color: '#ffffff',
                fontSize:10
              }
            },
            splitLine:{
              show: false
            }
          },
          dataZoom: [
            {
              type: 'inside'
            }
          ],
          series: odata.data
        };
        let option = $.extend(defaults, opt);
        myChart.setOption(option);
      }
    }
  }
</script>
