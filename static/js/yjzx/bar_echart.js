import echarts from 'echarts';
function bar_echart(id,data) {
  console.log('Success')
  let chart = echarts.init(document.getElementById(id));
  /* let myChart = echarts.init(document.getElementById('myChart'))*/
  // 绘制图表
  chart.setOption({
    title: {
      text: '预警类型',
      textStyle:{
        color:"#fff"
      },
      padding: [
        5,  // 上
        10, // 右
        0,  // 下
        120, // 左
      ]
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },

    grid: {
      left: '3%',
      right: '8%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      name: '数量',
      type: 'value',
      // boundaryGap: [0, 0.01],
      nameTextStyle:{
        fontSize:18
      },
      axisTick:{
        show:false
      },
      splitLine:{
        show:false
      },
      axisLine:{
        lineStyle:{
          color:"#fff"
        }
      },
      axisLabel: {
        fontSize:20,
        margin:18
      }
    },
    yAxis: {
      type: 'category',
      data:data.ydata,
      axisTick:{
        show:false
      },
      splitLine:{
        show:false
      },
      axisLine:{
        lineStyle:{
          color:"#fff"
        }
      },
      axisLabel: {
        fontSize:20
      }
    },
    series: [

      {
        label: {
          normal: {
            position: 'right',
            show: true,
            color:"#fff",
            fontSize:20
          }
        },
        itemStyle: {
          //通常情况下：
          normal:{
            //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
            color: function (params){
              var colorList = ['#c23531','#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'];
              //return colorList[params.dataIndex];

             /* var index=params.dataIndex;
              if(params.dataIndex >= colorList.length){
                index=params.dataIndex-colorList.length;
              }*/
              // var sRgbColor = sHex.colorRgb();//转为RGB颜色值的方法
              return new echarts.graphic.LinearGradient(
                0, 0, 1, 0,
                [
                  {offset: 0, color: colorList[params.dataIndex]},

                  {offset: 0.5, color: 'rgba(6,155,255,0.55)'},
                  {offset: 1, color: 'rgba(38,197,254,0.2)'}
                ]
              );
            },


          }

        },
        name: data.xdata.name,
        type: 'bar',
        barWidth : 30,//柱图宽度
        data: data.xdata.barData
      }
    ]
  });
  return chart
}
export { //很关键
  bar_echart
}
