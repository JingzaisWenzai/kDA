import echarts from 'echarts';

function line_echart(id, data, i) {
  console.log('Success')
  console.log(id, data, i)
  let chart = echarts.init(document.getElementById(id));
  /* let myChart = echarts.init(document.getElementById('myChart'))*/
  // 绘制图表
  chart.setOption({
    backgroundColor: '',//背景颜色透明
    title: {
      text: data.title[i],
      textStyle: {
        color: "#36aacc"
      },
      padding: [
        5,  // 上
        10, // 右
        0,  // 下
        30  // 左
      ]
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }

    },
    xAxis: {
      type: 'category',
      // data: ['1月', '4月', '8月', '12月'],
      data: (function (xData) {
        let xAxis = []
        if (xData.length > 4) {
          for (let i = 0, j = xData.length; i < j; i += 1) {
            xAxis.push(xData[i].name)
          }
        } else {
          xAxis = ['1月', '4月', '8月', '12月']
        }
        return xAxis
      })(data.ydata[i]),
      splitLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLine: {
        lineStyle: {
          color: "blue"
        }
      },
      axisLabel: {
        textStyle: {
          color: '#fff'
        }
      },
      boundaryGap: false
    },
    yAxis: {
      type: 'value',
      splitLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLine: {
        show: false,
        lineStyle: {
          color: "#fff"
        }
      }
    },
    series: [{
      data: data.ydata[i],
      type: 'line',
      itemStyle: {
        normal: {
          color: data.color[i > 10 ? 1 % 10 : i],
          lineStyle: {
            color: data.color[i > 10 ? 1 % 10 : i]
          }
        }
      },
      areaStyle: {
        normal: {
          //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1,
            [
              {offset: 0, color: data.color[i]},
              /* {offset: 0.5, color: '#888'},
               {offset: 1, color: '#fff'}*/
              {offset: .34, color: 'rgba(6,155,255,0.25)'},
              {offset: 1, color: 'rgba(38,197,254,0.00)'}
              /*{offset: 0, color: 'rgba(80,141,255,0.39)'},
              {offset: .34, color: 'rgba(56,155,255,0.25)'},
              {offset: 1, color: 'rgba(38,197,254,0.00)'}*/
            ]
          )

        }
      }
    }],
    color: ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3']
  });

  return chart
}

export { //很关键
  line_echart
}
