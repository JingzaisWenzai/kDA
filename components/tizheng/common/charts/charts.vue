<template>
    <div class="myCharts"></div>
</template>

<script>
  import {chartsOptions,funnelCharts,pieCharts} from '../../../../static/js/tizheng/charts'
    export default {
        name: "charts",
      props:['chartData'],
      data:function(){
          return {
            myChartsObj:{}
          }
      },
      mounted:function () {
        // console.log('---')
        //   console.log(this.chartData)
        // console.log('---')
        this.$nextTick(function () {
          // DOM 现在更新了
          // `this` 绑定到当前实例
          this.chartData.item.elementNode = document.getElementsByClassName(this.chartData.className)[this.chartData.index].childNodes[0]
          if(this.chartData.type === undefined){
            this.myChartsObj = chartsOptions(this.chartData.item)
          }else if(this.chartData.type === 'funnel'){
            this.myChartsObj = funnelCharts(this.chartData.item)
          }else if(this.chartData.type === 'pie'){
            this.myChartsObj = pieCharts(this.chartData.item)
          }
        })
      },
      watch:{
          chartData:function (val, oldVal) {
            // console.log(val)
            if(this.chartData.type === undefined){
              if(this.myChartsObj.chart !== undefined){
                var xAxis = this.myChartsObj.chart.getOption().xAxis
                xAxis[0].data = []
                var series = this.myChartsObj.chart.getOption().series
                var tempSeries = this.myChartsObj.chart.getOption().series
                Object.keys(val.item.data[0].data).forEach(function (index, value) {
                  xAxis[0].data.push(val.item.data[0].data[index].name)
                });
                Object.keys(val.item.data).forEach(function (index, value) {
                  if(series[index] === undefined){
                    series[index] = {}
                    tempSeries[index] = {type:tempSeries[0].type}
                  }
                  series[index].data = val.item.data[index].data
                  tempSeries[index].data = []
                });

                this.myChartsObj.chart.setOption({
                  xAxis:xAxis,
                  series:tempSeries
                })

                // console.log(this.myChartsObj.chart)
                // this.myChartsObj.chart.clear()
                // this.myChartsObj.chart.dispose()
                //
                // this.myChartsObj.chart = echarts.init(document.getElementById(this.myChartsObj.id))
                this.myChartsObj.chart.setOption({
                  xAxis:xAxis,
                  series:series
                })
              }
            }
          }
      }
    }
</script>

<style scoped>
.myCharts{
  width: 100%;
  height: 100%;
}
</style>
