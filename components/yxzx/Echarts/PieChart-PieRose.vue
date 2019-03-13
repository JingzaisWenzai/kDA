<template>
  <div class="pierosechart" :id="pieChartId"></div>
</template>
<style scoped>
  .pierosechart{
    width:100%;
    height:100%;
    min-width: 400px;
    min-height:300px;
    border:0 solid #f00;
  }
</style>
<script>
  import echart from 'echarts'
  import $ from 'jquery'

  export default{
    name:'PieRoseChart',
    props:['theData'],
    data(){
      return {
        theColor:'#269d09',
        max:'500', /*空气质量最高500*/
        olegend:[],
        pieChartId:''
      }
    },
    mounted(){
      this.pieChartId =  'piechart' + this.theData.c +  this.theData.index;
      let odata = this.theData.item.data;
      for(let i=0;i<odata.length;i++){
          let name = odata[i].name || '';
          this.olegend.push(name);
      }
      this.$nextTick(function(){
        this.drawChart(this.pieChartId,this.theData.item.data,this.olegend);
      })
    },
    methods:{
      drawChart(id,data,olegend){
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
          series: [{
              name:''
          }]
        };

        let colors =['#eced04','#35abff','#1bdc7c','#8f6ff8','#f66366','#f79322'];
        let opt ={
          title:{
            show:false
          },
          color:colors,
          toolbox:{
            show:false
          },
          grid:{
            left:'5%',
            right:'5%',
            top:'0',
            bottom:'5%',
            containLabel:true
          },
          legend:{
            show:true,
            left:'center',
            bottom:'5%',
            data: olegend,
            width:'90%',
            height:'auto',
            itemWidth:10,
            itemHeight:8,
            textStyle:{
                color:'#fff',
                fontSize:'14'
            }
          },
          calculable : true,
          series : [
            {
              name:'面积模式',
              type:'pie',
              radius : [10, 70],
              center : ['50%', '45%'],
              roseType : 'area',
              data:data
            }
          ]
        };
        let option = $.extend(defaults,opt);
        myChart.setOption(option);
      }
    }
  }
</script>
