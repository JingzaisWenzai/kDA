<template>
  <div class="chartsBar"></div>
</template>

<script>
  export default {
    name: "barTemp",
    props: ['msg'],
    mounted: function () {
      var xAxis = [];
      var data = this.msg.chart.data
      Object.keys(this.msg.chart.data).forEach(function (index, value) {
        xAxis.push(data[index].name)
      });
      document.getElementsByClassName('chartsBar')[this.msg.index-3].setAttribute('id', 'bar' + this.msg.index);
      var node = document.getElementById('bar' + this.msg.index);
      var myCharts = echarts.init(node);
      var option = {
        // color: ['#3398DB'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          top:30,
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
            type: 'category',
            name: this.msg.chart.xAxis.name,
            nameGap:2,
            nameTextStyle:{
              color:'white'
            },
            // data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            data: xAxis,
            axisTick:{
              show:false
            },
            axisLine:{
              lineStyle:{
                color:'rgb(74,85,177)'
              }
            },
            axisLabel:{
              color:'white'
            }
          },
        yAxis: {
            type: 'value',
            name: this.msg.chart.yAxis.name,
            nameTextStyle:{
              color:'white'
            },
            splitLine:{
              lineStyle:{
                color:'rgb(1,41,91)'
              }
            },
            axisTick:{
              show:false
            },
            axisLine:{show:false},
            axisLabel:{
              color:'white'
            }
          },
        series: [
          {
            name: '直接访问',
            type: 'bar',
            barWidth: '50%',
            // data: [10, 52, 200, 334, 390, 330, 220]
            data:this.msg.chart.data,
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0, 0, 0, 1,
                  [
                    {offset: 0.7, color: 'rgb(0,198,238)'},
                    // {offset: 0.5, color: '#188df0'},
                    {offset: 1, color: 'transparent'}
                  ]
                ),
                barBorderRadius:[20,20,0,0],
                barWidth:10
              },
              emphasis: {
                color: new echarts.graphic.LinearGradient(
                  0, 0, 0, 1,
                  [
                    // {offset: 0, color: '#2378f7'},
                    // {offset: 0.7, color: '#2378f7'},
                    // {offset: 1, color: '#83bff6'}
                    {offset: 0, color: 'rgb(0,198,238)'},
                    // {offset: 0.7, color: '#2378f7'},
                    {offset: 1, color: 'rgb(0,198,238)'}
                  ]
                )
              }
            }
          }
        ]
      };
      myCharts.setOption(option)
    }
  }
</script>

<style scoped>
  .chartsBar {
    width: 848px;
    height: 230px;
  }
</style>
