<template>
  <div class="subject_myBarChart">
    <div class="j_a">
      <img src="../../../../assets/img/cstz_8.png"/>{{this.chartData.item===null?'':this.chartData.item.title}}
    </div>
    <div class="j_b" :id="id">

    </div>
  </div>
</template>

<script>
  import { showLineCharts,showPieCharts,showFunnel } from '../../../../static/js/OneMap/DX/DX_Chart'
  export default {
    name: "barChart_01",
    props:['chartData'],
    data:function () {
      return {
        id:''
      }
    },
    mounted:function () {
      this.id = "chart_"+uuidv4()
      this.$nextTick(function () {
        this.loadChart()
      })
    },
    methods:{
      loadChart(){
        if(this.chartData.item === null){
          return
        }
        this.chartData.item.chartData.id = this.id
        if(this.chartData.type === undefined || this.chartData.type === 'line' || this.chartData.type === 'bar'){
          showLineCharts(this.chartData.item.chartData)
        }else if(this.chartData.type === 'pie'){
          showPieCharts(this.chartData.item.chartData)
        }else if(this.chartData.type === 'funnel'){
          showFunnel(this.chartData.item.chartData)
        }
      }
    },
    watch:{
      chartData:{
        handler:function(val,oldVal){
          this.loadChart()
        },
        deep:true
      }
    }
  }
</script>

<style lang="scss" scoped>
  .subject_myBarChart{
    width: 100%;
    height: 100%;
  }
  .j_a{/*width:405px;*/ height:40px; line-height: 40px; text-align: left; margin: 0px auto 20px; overflow: hidden;font-size: 24px;/*font-size: 30px;*/ color: #ffffff;
    img{
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
  .j_b{
    /*background-color: red;*/
    width: 100%;
    height: 90%;
  }
</style>
