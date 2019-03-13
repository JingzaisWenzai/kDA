<template>
  <div class="barchart" :id="barChartId">

  </div>
</template>
<style scoped>
  .barchart{
    width:100%;
    height:100%;
    min-width: 100px;
    min-height:80px;
    border:0 solid #f00;
  }
</style>
<script>
  import echart from 'echarts'
  import $ from 'jquery'

  export default{
    name:'DotCurveChart',
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
              type:'line',
              areaStyle:{
                opacity:0.1
              },
              smooth: true,
              lineStyle: {
                normal: {
                  color: this.colors[num],
                  width: 1,
                  type:'dashed'
                }
              },
              data:obj[i].data
            });
            arr.leg.push({
              name:oname
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
        let opt = {
          grid:{
            left:50,
            top:20,
            bottom:40,
            right:20
          },
          tooltip : {
            show:false,
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          color:this.colors,
          legend:{
            show:false
          },
          toolbox: {
            show : false
          },
          xAxis: {
            type: 'category',
            data: odata.xAxis,
            boundaryGap:true,
            interval:0,
            axisLine:{
              show:true,
              lineStyle:{
                color:'#424249',
                width:1
              }
            },
            splitLine:{
              show:false
            },
            axisLabel:{
              show:true,
              interval:0,
              color:'#ffffff',
              fontSize:10
            },
            axisTick:{
              show:false,
              lineStyle:{
                color:''
              }
            }
          },
          yAxis: {
            axisLine:{
              show:true,
              lineStyle:{
                color:'#424249',
                width:1
              }
            },
            splitLine:{
              show:false
            },
            axisLabel:{
              show:true,
              interval:0,
              color:'#ffffff',
              fontSize:10
            },
            axisTick:{
              show:false,
              lineStyle:{
                color:''
              }
            }
          },
          series : odata.data
        };
        let option = $.extend(defaults, opt);
        myChart.setOption(option);
      }
    }
  }
</script>
