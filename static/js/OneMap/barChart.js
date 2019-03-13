       	// 基于准备好的dom，初始化echart实例
        // 基于准备好的dom，初始化echart实例
        import echart from 'echarts';
        function barChart(id,edata) {

        let theLeg=[],bb;
        for(let i=0;i<edata.ydata.length;i++){
            bb = edata.ydata[i].name || '';
            theLeg.push(bb);
        }

        let myChart = echart.init(document.getElementById(id));
        // 指定图表的配置项和数据
        let option = {
            grid: {
                bottom: '28%',//距离下边的距离
                top: '15%' //距离上边的距离
            },
            title: {
                text: '数量',
                textStyle:{
                    color:"#36aacc",
                  fontSize:14
                },
                padding: [
                    5,  // 上
                    10, // 右
                    20,  // 下
                    100, // 左
                ]
            },
            tooltip : {
                trigger: 'axis'
            },
            legend: {
                data:theLeg ||[],
                bottom: "5%",
                textStyle:{
                    color:"#fff",
                    fontSize:14
                }
            },
            calculable : true,
            xAxis : [
                {
                    name: '地点',
                    type : 'category',
                    data :edata.xdata ||[],
                    splitLine:{
                        show:false
                    },
                    axisTick:{
                        show:false
                    },
                     axisLine:{
                         lineStyle:{
                           fontSize:14,
                         }
                     },
                    axisLabel: {
                        textStyle: {
                            color: '#bfc5c9'
                        }
                    },
                    nameTextStyle:{
                        fontSize:14,
                        color:"#bfc5c9"
                    },
                    boundaryGap: true
                }

            ],
            yAxis : [
                {
                    type : 'value',
                    splitLine:{
                        // show:false,
                        lineStyle: {
                            // 使用深浅的间隔色
                            color: "#19426f"
                        }
                    },
                    axisLabel: {
                        textStyle: {
                            color: '#bfc5c9'
                        }
                    },
                    boundaryGap: false
                }
            ],
            series : [
                {
                    name:edata.ydata[0].name || '',
                    type:'bar',
                    barWidth : 7,//柱图宽度

                    data:edata.ydata[0].data ||[],
                    color:edata.color[0],
                    itemStyle: {
                      //柱形图圆角，鼠标移上去效果，如果只是一个数字则说明四个参数全部设置为那么多
                      emphasis: {
                        barBorderRadius: 10
                      },
                      normal: {
                        //柱形图圆角，初始化效果
                        barBorderRadius:[10, 10, 0, 0],
                        color: new echart.graphic.LinearGradient(
                          0, 1, 0, 0,
                          [
                            {offset: 0, color: '#3977E6'},
                            {offset: 1, color: '#37BBF8'}

                          ]
                        )
                     }
                  }
                },
                {
                  name:edata.ydata[1].name || '',
                  type:'bar',
                  barWidth : 7,//柱图宽度
                  data:edata.ydata[1].data ||[],
                  color:edata.color[1],
                  itemStyle: {
                    //柱形图圆角，鼠标移上去效果，如果只是一个数字则说明四个参数全部设置为那么多
                    emphasis: {
                      barBorderRadius: 10
                    },
                    normal: {
                      //柱形图圆角，初始化效果
                      barBorderRadius:[10, 10, 0, 0],
                      color: new echart.graphic.LinearGradient(
                        0, 1, 0, 0,
                        [
                          {offset: 0, color: '#169b51'},
                          {offset: 1, color: '#61ff95'}

                        ]
                      )
                    }
                  }
                },{
                name:edata.ydata[2].name || '',
                type:'bar',
                barWidth : 7,//柱图宽度
                data:edata.ydata[2].data ||[],
                color:edata.color[2],
                itemStyle: {
                  //柱形图圆角，鼠标移上去效果，如果只是一个数字则说明四个参数全部设置为那么多
                  emphasis: {
                    barBorderRadius: 10
                  },
                  normal: {
                    //柱形图圆角，初始化效果
                    barBorderRadius:[10, 10, 0, 0],
                    color: new echart.graphic.LinearGradient(
                      0, 1, 0, 0,
                      [
                        {offset: 0, color: '#095fa0'},
                        {offset: 1, color: '#0090ff'}

                      ]
                    )
                  }
                }
              },
              {
                name:edata.ydata[3].name || '',
                type:'bar',
                data:edata.ydata[3].data ||[],
                color:edata.color[3],
                barWidth : 7,//柱图宽度
                itemStyle: {
                  //柱形图圆角，鼠标移上去效果，如果只是一个数字则说明四个参数全部设置为那么多
                  emphasis: {
                    barBorderRadius: 10
                  },
                  normal: {
                    //柱形图圆角，初始化效果
                    barBorderRadius:[10, 10, 0, 0],
                    color: new echart.graphic.LinearGradient(
                      0, 1, 0, 0,
                      [
                        {offset: 0, color: '#b95300'},
                        {offset: 1, color: '#ff8400'}

                      ]
                    )
                  }
                }
              }
            ]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);

        }

        export { //很关键
          barChart
        }
