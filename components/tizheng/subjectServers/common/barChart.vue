<template>
  <div class="subject_myBarChart">
    <div class="j_a">
      <img src="../../../../assets/img/cstz_8.png"/>{{this.chartData.item.title}}
    </div>
    <div class="j_b">
      <!--<script src="js/gjdczrk.js" type="text/javascript" language="javascript"></script>-->
      <my-charts
        v-bind:chartData="{className:'j_b',index:this.chartData.index,item:this.chartData.item.chartData,type:this.chartData.type}"></my-charts>
    </div>
  </div>
</template>

<script>
  import myCharts from '../../../../components/tizheng/common/charts/charts.vue'

  export default {
    name: 'barChart',
    components: {
      myCharts
    },
    props: ['chartData'],
    data: function() {
      return {}
    },
    mounted: function() {
      // console.log(this.chartData)
    }
  }
</script>

<style lang="scss" scoped>
  .subject_myBarChart {
    width: 100%;
    height: 100%;
  }

  .j_a { /*width:405px;*/
    height: 40px;
    line-height: 40px;
    text-align: left;
    margin: 0px auto 20px;
    overflow: hidden;
    font-size: 30px;
    color: #ffffff;
    img {
      padding-right: 10px;
    }
  }

  /*.j_a ul{width:405px; height:40px; line-height: 40px; text-align: left; margin: 0px auto; overflow: hidden; padding: 0;}*/
  /*.j_a ul li{width:auto; height:40px; line-height: 40px; text-align: left; margin: 0px 10px 0px 0px; float: left; display: inline; overflow: hidden; font-size: 30px; color: #ffffff;}*/
  /*.j_a ul li img{ width: 9px; height: 18px; margin: 11px auto;}*/
  /*#gjdczrk{*/
  /*background-color: red;*/
  /*width: 100%;*/
  /*height: 90%;*/
  /*}*/
  .j_b {
    /*background-color: red;*/
    width: 100%;
    height: 90%;
  }
</style>
