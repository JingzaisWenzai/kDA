// 基于准备好的dom，初始化echarts实例
var city_pie = {};
city_pie.init = function (data,id) {
  var myChart = echarts.init(document.getElementById(id));

  // 指定图表的配置项和数据

  var option = {
    title : {
      show:true,
      text:'风险源情况：',
      left:0,
      textStyle:{
        color:'#cefeff',
        align:'left',
        fontSize:20,
        fontWeight:'normal'
      }
    },
    tooltip : {
      trigger: 'item',
      formatter: "{b} : {c} ({d}%)",
      confine:true
    },
    legend: {
      show:false,
      x : 'center',
      y : 'bottom',
      data:['rose1','rose2','rose3','rose4','rose5','rose6','rose7','rose8']
    },
    toolbox: {
      show : false
    },
    calculable : true,
    color:['#9295c9','#da2a62','#603986'],
    series : [
      {
        name:'面积模式',
        type:'pie',
        radius : [10, 60],
        center : ['50%', '50%'],
        roseType : 'area',
        label:{
          show:true,
          position:'outside',
          fontSize:10,

        },
        labelLine:{
          normal:{
            show:false,
            length:0,
            length2:0
          },emphasis:{
            show:false
          }
        },
        data: data
      }
    ]
  };


  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option);
}
