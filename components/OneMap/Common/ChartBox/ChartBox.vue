<template>
  <section class="chartBox_container">
    <div class="box" v-if="otype ==='line'">
      <component :is="ochartType" :chart-data = 'ochartData'></component>
    </div>
    <div class="box" v-if="otype ==='lineTxt'">
      <div class="chart">
        <component :is="ochartType" :chart-data = 'ochartData'></component>
      </div>
      <div class="txt"></div>
    </div>
    <div class="box" v-if="otype ==='bar'">
      <component :is="ochartType" :chart-data = 'ochartData'></component>
    </div>
    <div class="box" v-if="otype ==='table'">
      <component :is="ochartType" :chart-data = 'ochartData'></component>
    </div>
    <div class="box" v-if="otype ==='pie'">
      <component :is="ochartType" :chart-data = 'ochartData'></component>
    </div>
    <div class="box" v-if="otype ==='list'">
      <component :is="ochartType" :chart-data = 'ochartData'></component>
    </div>
  </section>
</template>
<style scoped>
  .chartBox_container{
    width:100%;
    height:100%;
  }
  .chartBox_container .box{
     width:100%;height:100%;
  }
</style>
<script>
  import BarChart from "./BarChart_NoX";
  import LineChart from './LineChart.vue';
  import TableChart from './TableChart.vue';
  import BarChartNormalS from './BarChart_Normals.vue';
  import PieChart from './PieChart.vue';
  import RingChart from  './RingChart.vue';
  import PointLineChart from './PointLineChart.vue';
  import ListChart from './ListChart.vue';
  import DotCurveChart from './DotCurveChart.vue';

  export default{
    props:['chartInfo'],
    mounted() {
        this.otype = this.chartInfo.type;
        if(this.chartInfo.typeTitle){
          this.ochartData = {data:this.chartInfo.data, oid:this.chartInfo.oid, typeTitle:this.chartInfo.typeTitle};
        }else{
          this.ochartData = {data:this.chartInfo.data, oid:this.chartInfo.oid};
        }
        this.ochartType = this.chartInfo.chartType;
    },
    data(){
        return{
          otype:'',
          ochartData:''
        }
    },
    components: {
        BarChart,
        LineChart,
        TableChart,
        BarChartNormalS,
        PieChart,
        RingChart,
        PointLineChart,
        DotCurveChart,
        ListChart
    },
  }
</script>
