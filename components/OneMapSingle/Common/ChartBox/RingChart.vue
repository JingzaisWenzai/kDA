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
    name:'PointLine',
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
        arr.data=[]; let oname,oval;
        if(obj.length!==0){
          for(let i=0;i<obj.length;i++){
            oname = obj[i].name || '';
            oval = obj[i].value |'';
            arr.xAxis.push(oname);
            arr.leg.push({
              name: oname,
              value: oval
            })
          }
          arr.data = obj;
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
            left:0,
            top:0,
            bottom:0,
            right:0
          },
          tooltip : {
            show:false,
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          color:this.colors,
          legend:{
            left: 'right',
            top: 'center',
            width:'25%',
            itemWidth:6,
            itemHeight:4,
            itemGap:2,
            orient: 'vertical',
            z:1000,
            align:'left',
            data:odata.xAxis,
            textStyle:{
              fontSize:10,
              color:'#cccccc',
              align:'center',
              rich:{
                a:{
                  fontSize:10,
                  color:'#cccccc',
                  align:'center'
                },
                b:{
                  fontSize:12,
                  color:'#00fff6',
                  align:'center'
                }
              }
            }
          },
          toolbox: {
            show : false
          },
          calculable : true,
          series : [{
            type:'pie',
            radius : ['50%', '70%'],
            center : ['50%', '50%'],
            label: {
              normal: {
                show: false
              },
              emphasis: {
                show: false
              }
            },
            labelLine: {
              normal: {
                show: false
              },
              emphasis: {
                show:false
              }
            },
            data:odata.data
          }]
        };
        let option = $.extend(defaults, opt);
        myChart.setOption(option);
      }
    }
  }
</script>
