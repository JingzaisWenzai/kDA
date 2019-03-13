       	// 基于准备好的dom，初始化echarts实例
        var jzfx = {};
        jzfx.init = function (data,xdata,id) {
          let ind =[];
          for(let i=0;i<xdata.length;i++){
              ind.push({
                   name: xdata[i],
                   max: 100
              })
          }
            var myChart = echarts.init(document.getElementById(id));
            // 指定图表的配置项和数据
            var option = {
                grid:{
                  left:'5%',
                  top:'5%',
                  right:'5%',
                  bottom:'5%'
                },
                title: {
                    text: '建筑风险',
                    show:false,
                },
                tooltip: {
                  confine:true
                },
                legend: {
                    data: ['建筑风险评分']
                },
                radar: {
                  center:['50%','55%'],
                    // shape: 'circle',
                    name: {
                        textStyle: {
                            fontSize:'12px',
                            color: '#a6d6ff',
                            backgroundColor: 'transparent',
                            borderRadius: 3,
                            padding: [3, 5],
                            size: 12
                        }
                    },
                    splitLine:{
                      show:true,
                      lineStyle:{
                        color:['#a6d6ff']
                      }
                    },
                    splitArea:{
                      show:true,
                      areaStyle:{
                        color:['rgba(255,255,201,0.5)','rgba(255,255,255,0.5)']
                      }
                    },
                    indicator: ind
                },
                series: [{
                    name: '（Budget vs spending）',
                    type: 'radar',
                    // areaStyle: {normal: {}},
                    data : [
                        {
                            value : data,
                            name : '评分'
                        }
                    ]
                }]
            };
            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
        }
