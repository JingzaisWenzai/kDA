<template>
  <div class="chartLine"></div>
</template>

<script>
  export default {
    name: "lineChart",
    props: ['msg'],
    mounted: function () {
      var xAxis = [];
      var data = this.msg.data
      Object.keys(this.msg.data).forEach(function (index, value) {
        xAxis.push(data[index].name)
      });
      var nodes = document.getElementsByClassName('chartLine')
        // nodes.reverse();
        nodes[this.msg.index].setAttribute('id','line'+this.msg.index);
      var node = document.getElementById('line'+this.msg.index);
      var myCharts = echarts.init(node);
      var option = {
        tooltip: {
          trigger: 'axis'
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
          // data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
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
        series: [{
          // data: [820, 932, 901, 934, 1290, 1330, 1320],
          data:this.msg.chart.data,
          type: 'line',
          symbol: 'circle',
          symbolSize:7,
          itemStyle:{
            color:'rgb(0,119,225)'
          },
          areaStyle:{
            color: {
              type: 'line',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0, color: 'rgb(0,119,225)' // 0% 处的颜色
              }, {
                offset: 1, color: 'transparent' // 100% 处的颜色
              }],
              globalCoord: false // 缺省为 false
            }
          }
        }]
      }
      myCharts.setOption(option)
    }
  }
</script>

<style scoped>
  .chartLine {
    width: 544px;
    height: 222px;
  }
</style>
