
// 基于准备好的dom，初始化echarts实例
import echarts from 'echarts';
function lineChart(id,data){

  let leng=[],aa,bb;
  for(let i=0;i<data.data.length;i++){
    aa= data.data[i].name||'';
    leng.push({
      name:aa,icon:'roundRect'
    });
  }
  let xdata=[],cc;
  for(let j=0;j<data.data[0].data.length;j++){
    cc = data.data[0].data[j].name;
    xdata.push(cc);
  }
  let dataWhole =[], dataSing=[],dd;
  for(let k=0;k<data.data.length;k++){
      dd=data.data[k];
      dataSing=[];
      for(let p=0;p<dd.data.length;p++){
          dataSing.push(dd.data[p].value);
      }
      dataWhole.push({
        name:dd.name,
        value:dataSing
      })
  }

  // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(document.getElementById(id));
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
                    80, // 左
                ]
            },
            tooltip : {
                trigger: 'axis'
            },
            legend: {
                data:leng  ||[],
                bottom: "5%",
                textStyle:{
                    color:"#fff",
                    fontSize:14
                }
            },

            calculable : true,
            xAxis : [
                {
                    name: '时间',
                    type : 'category',
                    data : xdata  ||[],
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
                    name:dataWhole[0].name ||'',
                    type:'line',
                    data:dataWhole[0].value ||[],
                  color:[ '#ff9000'],
                },
                {
                    name:dataWhole[1].name ||'',
                    type:'line',
                    data:dataWhole[1].value ||[],
                  color:[ '#008311'],
                },
                {
                    name:dataWhole[2].name ||'',
                    type:'line',
                    data:dataWhole[2].value ||[],
                  color:[ '#44a1df'],
                }
            ]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);

}

export { //很关键
  lineChart
}
