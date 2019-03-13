import uuidv4 from 'uuid/v4'
var DX = {
  "color": [
    "#c12e34",
    "#e6b600",
    "#0098d9",
    "#2b821d",
    "#005eaa",
    "#339ca8",
    "#cda819",
    "#32a487",

    'rgb(163,231,3)',
    'rgb(20,194,81)',
    'rgb(0,228,255)',
    'rgb(1,137,255)',
    'rgb(95,5,215)',

    'rgb(49,83,23)',
    'rgb(7,73,46)',
    'rgb(2,84,99)',
    'rgb(0,59,102)',
    'rgb(29,16,88)',

  ],
  "backgroundColor": "rgba(0,0,0,0)",
  "textStyle": {},
  "title": {
    "textStyle": {
      "color": "#333333"
    },
    "subtextStyle": {
      "color": "#aaaaaa"
    }
  },
  "line": {
    "itemStyle": {
      "normal": {
        "borderWidth": 1
      }
    },
    "lineStyle": {
      "normal": {
        "width": 2
      }
    },
    "symbolSize": 4,
    "symbol": "emptyCircle",
    "smooth": false
  },
  "radar": {
    "itemStyle": {
      "normal": {
        "borderWidth": 1
      }
    },
    "lineStyle": {
      "normal": {
        "width": 2
      }
    },
    "symbolSize": 4,
    "symbol": "emptyCircle",
    "smooth": false
  },
  "bar": {
    "itemStyle": {
      "normal": {
        "barBorderWidth": 0,
        "barBorderColor": "#ccc"
      },
      "emphasis": {
        "barBorderWidth": 0,
        "barBorderColor": "#ccc"
      }
    }
  },
  "pie": {
    "itemStyle": {
      "normal": {
        "borderWidth": 0,
        "borderColor": "#ccc"
      },
      "emphasis": {
        "borderWidth": 0,
        "borderColor": "#ccc"
      }
    }
  },
  "scatter": {
    "itemStyle": {
      "normal": {
        "borderWidth": 0,
        "borderColor": "#ccc"
      },
      "emphasis": {
        "borderWidth": 0,
        "borderColor": "#ccc"
      }
    }
  },
  "boxplot": {
    "itemStyle": {
      "normal": {
        "borderWidth": 0,
        "borderColor": "#ccc"
      },
      "emphasis": {
        "borderWidth": 0,
        "borderColor": "#ccc"
      }
    }
  },
  "parallel": {
    "itemStyle": {
      "normal": {
        "borderWidth": 0,
        "borderColor": "#ccc"
      },
      "emphasis": {
        "borderWidth": 0,
        "borderColor": "#ccc"
      }
    }
  },
  "sankey": {
    "itemStyle": {
      "normal": {
        "borderWidth": 0,
        "borderColor": "#ccc"
      },
      "emphasis": {
        "borderWidth": 0,
        "borderColor": "#ccc"
      }
    }
  },
  "funnel": {
    "itemStyle": {
      "normal": {
        "borderWidth": 0,
        "borderColor": "#ccc"
      },
      "emphasis": {
        "borderWidth": 0,
        "borderColor": "#ccc"
      }
    }
  },
  "gauge": {
    "itemStyle": {
      "normal": {
        "borderWidth": 0,
        "borderColor": "#ccc"
      },
      "emphasis": {
        "borderWidth": 0,
        "borderColor": "#ccc"
      }
    }
  },
  "candlestick": {
    "itemStyle": {
      "normal": {
        "color": "#c12e34",
        "color0": "#2b821d",
        "borderColor": "#c12e34",
        "borderColor0": "#2b821d",
        "borderWidth": 1
      }
    }
  },
  "graph": {
    "itemStyle": {
      "normal": {
        "borderWidth": 0,
        "borderColor": "#ccc"
      }
    },
    "lineStyle": {
      "normal": {
        "width": 1,
        "color": "#aaaaaa"
      }
    },
    "symbolSize": 4,
    "symbol": "emptyCircle",
    "smooth": false,
    "color": [
      "#c12e34",
      "#e6b600",
      "#0098d9",
      "#2b821d",
      "#005eaa",
      "#339ca8",
      "#cda819",
      "#32a487"
    ],
    "label": {
      "normal": {
        "textStyle": {
          "color": "#eeeeee"
        }
      }
    }
  },
  "map": {
    "itemStyle": {
      "normal": {
        "areaColor": "#dddddd",
        "borderColor": "#eeeeee",
        "borderWidth": 0.5
      },
      "emphasis": {
        "areaColor": "rgba(230,182,0,1)",
        "borderColor": "#dddddd",
        "borderWidth": 1
      }
    },
    "label": {
      "normal": {
        "textStyle": {
          "color": "#c12e34"
        }
      },
      "emphasis": {
        "textStyle": {
          "color": "rgb(193,46,52)"
        }
      }
    }
  },
  "geo": {
    "itemStyle": {
      "normal": {
        "areaColor": "#dddddd",
        "borderColor": "#eeeeee",
        "borderWidth": 0.5
      },
      "emphasis": {
        "areaColor": "rgba(230,182,0,1)",
        "borderColor": "#dddddd",
        "borderWidth": 1
      }
    },
    "label": {
      "normal": {
        "textStyle": {
          "color": "#c12e34"
        }
      },
      "emphasis": {
        "textStyle": {
          "color": "rgb(193,46,52)"
        }
      }
    }
  },
  "categoryAxis": {
    "axisLine": {
      "show": true,
      "lineStyle": {
        "color": "#333"
      }
    },
    "axisTick": {
      "show": true,
      "lineStyle": {
        "color": "#333"
      }
    },
    "axisLabel": {
      "show": true,
      "textStyle": {
        "color": "#333"
      }
    },
    "splitLine": {
      "show": false,
      "lineStyle": {
        "color": [
          "#ccc"
        ]
      }
    },
    "splitArea": {
      "show": false,
      "areaStyle": {
        "color": [
          "rgba(250,250,250,0.3)",
          "rgba(200,200,200,0.3)"
        ]
      }
    }
  },
  "valueAxis": {
    "axisLine": {
      "show": true,
      "lineStyle": {
        "color": "#333"
      }
    },
    "axisTick": {
      "show": true,
      "lineStyle": {
        "color": "#333"
      }
    },
    "axisLabel": {
      "show": true,
      "textStyle": {
        "color": "#333"
      }
    },
    "splitLine": {
      "show": true,
      "lineStyle": {
        "color": [
          "#ccc"
        ]
      }
    },
    "splitArea": {
      "show": false,
      "areaStyle": {
        "color": [
          "rgba(250,250,250,0.3)",
          "rgba(200,200,200,0.3)"
        ]
      }
    }
  },
  "logAxis": {
    "axisLine": {
      "show": true,
      "lineStyle": {
        "color": "#333"
      }
    },
    "axisTick": {
      "show": true,
      "lineStyle": {
        "color": "#333"
      }
    },
    "axisLabel": {
      "show": true,
      "textStyle": {
        "color": "#333"
      }
    },
    "splitLine": {
      "show": true,
      "lineStyle": {
        "color": [
          "#ccc"
        ]
      }
    },
    "splitArea": {
      "show": false,
      "areaStyle": {
        "color": [
          "rgba(250,250,250,0.3)",
          "rgba(200,200,200,0.3)"
        ]
      }
    }
  },
  "timeAxis": {
    "axisLine": {
      "show": true,
      "lineStyle": {
        "color": "#333"
      }
    },
    "axisTick": {
      "show": true,
      "lineStyle": {
        "color": "#333"
      }
    },
    "axisLabel": {
      "show": true,
      "textStyle": {
        "color": "#333"
      }
    },
    "splitLine": {
      "show": true,
      "lineStyle": {
        "color": [
          "#ccc"
        ]
      }
    },
    "splitArea": {
      "show": false,
      "areaStyle": {
        "color": [
          "rgba(250,250,250,0.3)",
          "rgba(200,200,200,0.3)"
        ]
      }
    }
  },
  "toolbox": {
    "iconStyle": {
      "normal": {
        "borderColor": "#06467c"
      },
      "emphasis": {
        "borderColor": "#4187c2"
      }
    }
  },
  "legend": {
    "textStyle": {
      "color": "white"
    }
  },
  "tooltip": {
    "axisPointer": {
      "lineStyle": {
        "color": "#cccccc",
        "width": 1
      },
      "crossStyle": {
        "color": "#cccccc",
        "width": 1
      }
    }
  },
  "timeline": {
    "lineStyle": {
      "color": "#005eaa",
      "width": 1
    },
    "itemStyle": {
      "normal": {
        "color": "#005eaa",
        "borderWidth": 1
      },
      "emphasis": {
        "color": "#005eaa"
      }
    },
    "controlStyle": {
      "normal": {
        "color": "#005eaa",
        "borderColor": "#005eaa",
        "borderWidth": 0.5
      },
      "emphasis": {
        "color": "#005eaa",
        "borderColor": "#005eaa",
        "borderWidth": 0.5
      }
    },
    "checkpointStyle": {
      "color": "#005eaa",
      "borderColor": "rgba(49,107,194,0.5)"
    },
    "label": {
      "normal": {
        "textStyle": {
          "color": "#005eaa"
        }
      },
      "emphasis": {
        "textStyle": {
          "color": "#005eaa"
        }
      }
    }
  },
  "visualMap": {
    "color": [
      "#1790cf",
      "#a2d4e6"
    ]
  },
  "dataZoom": {
    "backgroundColor": "rgba(47,69,84,0)",
    "dataBackgroundColor": "rgba(47,69,84,0.3)",
    "fillerColor": "rgba(167,183,204,0.4)",
    "handleColor": "#a7b7cc",
    "handleSize": "100%",
    "textStyle": {
      "color": "#333333"
    }
  },
  "markPoint": {
    "label": {
      "normal": {
        "textStyle": {
          "color": "#eeeeee"
        }
      },
      "emphasis": {
        "textStyle": {
          "color": "#eeeeee"
        }
      }
    }
  }
}
echarts.registerTheme('DX', DX)
/**
 *
 * @param
 * {
 * elementNode: object ,承接echarts的标签
 * showXChart: bool 是否是想X轴类别Y轴数据,
 * title:{text: string, left:'center', textStyleColor:'white'},
 * xAxis: { name: string x轴单位, nameTextStyleColor: string x轴单位字体颜色, axisLineColor: string x轴线颜色, axisLabelColor: string x轴坐标颜色},
 * yAxis: { name: string y轴单位, nameTextStyleColor: string y轴单位字体颜色, splitLineColor: string y轴线颜色, axisLabelColor: string y轴坐标颜色},
 * data:[{name: string 序列名称,color: string 线颜色, data:[{name:string, value:string},{name:string, value:string}]},
 * {name: string, data: [{name:string, value:string},{name:string, value:string}]}]
 * }
 * @returns
 */

var  lineOptions = function (data) {
  if(data.xAxis === undefined){
    data.xAxis = {}
  }
  if(data.yAxis === undefined){
    data.yAxis = {}
  }
  if(data.title === undefined){
    data.title = {}
  }
  var xAxis = {
    type: 'category',
    name: data.xAxis.name !== undefined?data.xAxis.name:'',
    nameGap: 2,
    nameTextStyle: {
      // color: data.xAxis.nameTextStyleColor !== undefined?data.xAxis.nameTextStyleColor:'white'
      color: 'white'
    },
    // data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    data: [],
    axisTick: {
      show: false
    },
    axisLine: {
      lineStyle: {
        color: data.xAxis.splitLineColor !== undefined?data.xAxis.splitLineColor:'rgb(74,85,177)'
      }
    },
    axisLabel: {
      // color: data.xAxis.axisLabelColor !== undefined?data.xAxis.axisLabelColor:'white'
      color: 'white'
    }
  };

  var yAxis = {
    type: 'value',
    name: data.yAxis.name !== undefined?data.yAxis.name:'',
    nameTextStyle: {
      // color: data.yAxis.nameTextStyleColor !== undefined?data.yAxis.nameTextStyleColor:'white'
      color: 'white'
    },
    splitLine: {
      show:false,
      lineStyle: {
        // color: data.yAxis.splitLineColor !== undefined?data.yAxis.splitLineColor:'rgb(1,41,91)'
      }
    },
    axisTick: {
      show: false
    },
    axisLine: {show: false},
    axisLabel: {
      // color: data.yAxis.axisLabelColor !== undefined?data.yAxis.axisLabelColor:'white'
      color: 'white'
    }
  }
  var series = []
  Object.keys(data.data[0].data).forEach(function (index, value) {
    xAxis.data.push(data.data[0].data[index].name)
  });
  Object.keys(data.data).forEach(function (value, index, array) {
    series.push({
      // data: [820, 932, 901, 934, 1290, 1330, 1320],
      data: data.data[index].data,
      type: 'line',
      name:data.data[index].name,
      symbol: 'circle',
      symbolSize: 7,
      itemStyle: {
        // color: data.data[index].color !== undefined?data.data[index].color:'rgb(0,119,225)'
      },
      areaStyle: {
        color: {
          type: 'line',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [{
            // offset: 0, color: data.data[index].color !== undefined?data.data[index].color:'rgb(0,119,225)' // 0% 处的颜色
            offset: 0, color: DX.color[index%8] // 0% 处的颜色
          }, {
            offset: 1, color: 'transparent' // 100% 处的颜色
          }],
          globalCoord: false // 缺省为 false
        }
      }
    })
  })
  var chartsId =  'line_' + uuidv4()
  // var nodes = document.getElementById(data.id)
  // nodes.reverse();
  data.elementNode.setAttribute('id',chartsId);
  var node = document.getElementById(chartsId);
  var options = {
    tooltip: {
      confine:true,
      trigger:'axis',
      axisPointer : {            // 坐标轴指示器，坐标轴触发有效
        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    grid: {
      top: 30,
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    title:{
      text:data.title.text !== undefined?data.title.text:'',
      left:data.title.left !== undefined?data.title.left:'center',
      textStyle:{
        // color:data.title.textColor !== undefined?data.title.textColor:'white'
        color:'white'
      }
    },
    xAxis: xAxis,
    yAxis: yAxis,
    series: series
  }

  var myCharts = echarts.init(node,'DX')
  myCharts.setOption(options)
  return {id:chartsId, chart: myCharts};
}


/**
 *
 * @param
 * {
 * elementNode: object ,承接echarts的标签
 * showXChart: bool 是否是想X轴类别Y轴数据,
 * title:{text: string, left:'center', textStyleColor:'white'},
 * xAxis: { name: string x轴单位, nameTextStyleColor: string x轴单位字体颜色, axisLineColor: string x轴线颜色, axisLabelColor: string x轴坐标颜色},
 * yAxis: { name: string y轴单位, nameTextStyleColor: string y轴单位字体颜色, splitLineColor: string y轴线颜色, axisLabelColor: string y轴坐标颜色},
 * data:[{name: string 序列名称,color: string 线颜色, data:[{name:string, value:string},{name:string, value:string}]},
 * {name: string, data: [{name:string, value:string},{name:string, value:string}]}]
 * }
 * @returns
 */
var barOptions = function (data) {
  if(data.xAxis === undefined){
    data.xAxis = {}
  }
  if(data.yAxis === undefined){
    data.yAxis = {}
  }
  if(data.title === undefined){
    data.title = {}
  }
  var xAxis = {
    type: 'category',
    name: data.xAxis.name !== undefined?data.xAxis.name:'',
    nameGap: 2,
    nameTextStyle: {
      color: data.xAxis.nameTextStyleColor !== undefined?data.xAxis.nameTextStyleColor:'white'
    },
    // data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    data: [],
    axisTick: {
      show: false
    },
    axisLine: {
      lineStyle: {
        color: data.xAxis.splitLineColor !== undefined?data.xAxis.splitLineColor:'rgb(74,85,177)'
      }
    },
    axisLabel: {
      color: data.xAxis.axisLabelColor !== undefined?data.xAxis.axisLabelColor:'white'
    }
  };

  var yAxis = {
    type: 'value',
    name: data.yAxis.name !== undefined?data.yAxis.name:'',
    nameTextStyle: {
      color: data.yAxis.nameTextStyleColor !== undefined?data.yAxis.nameTextStyleColor:'white'
    },
    splitLine: {
      lineStyle: {
        color: data.yAxis.splitLineColor !== undefined?data.yAxis.splitLineColor:'rgb(1,41,91)'
      }
    },
    axisTick: {
      show: false
    },
    axisLine: {show: false},
    axisLabel: {
      color: data.yAxis.axisLabelColor !== undefined?data.yAxis.axisLabelColor:'white'
    }
  }
  var series = []
  var names = []
  Object.keys(data.data[0].data).forEach(function (index, value) {
    xAxis.data.push(data.data[0].data[index].name)
    names.push(data.data[0].data[index].name)
  });
  if(data.showXChart!== undefined && data.showXChart === true){
    data.yAxis.type = 'category'
    delete data.xAxis['data']
    data.xAxis.type = 'value'
    data.yAxis.data = names
  }
  Object.keys(data.data).forEach(function (value, index, array) {
    series.push({
      // data: [820, 932, 901, 934, 1290, 1330, 1320],
      data: data.data[index].data,
      type: 'bar',
      // barWidth: '50%',
      name:data.data[index].name,
      itemStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(
            0, 0, 0, 1,
            [
              {offset: 0.7, color: data.data[index].color !== undefined?data.data[index].color:'rgb(0,198,238)'},
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
              {offset: 0, color: data.data[index].color !== undefined?data.data[index].color:'rgb(0,198,238)'},
              // {offset: 0.7, color: '#2378f7'},
              {offset: 1, color: data.data[index].color !== undefined?data.data[index].color:'rgb(0,198,238)'}
            ]
          )
        }
      }
    })
  })
  var chartsId =  'bar_' + uuidv4()
  // var nodes = document.getElementById(data.id)
  // nodes.reverse();
  data.elementNode.setAttribute('id',chartsId);
  var node = document.getElementById(chartsId);
  var options = {
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
    title:{
      text:data.title.text !== undefined?data.title.text:'',
      left:data.title.left !== undefined?data.title.left:'center',
      textStyle:{
        color:data.title.textStyleColor !== undefined?data.title.textStyleColor:'white'
      }
    },
    xAxis: xAxis,
    yAxis: yAxis,
    series: series
  }

  var myCharts = echarts.init(node,'DX')
  myCharts.setOption(options)
  return {id:chartsId, chart: myCharts};
}

/**
 *
 * @param
 * {
 * elementNode: object ,承接echarts的标签
 * showXChart: bool 是否是想X轴类别Y轴数据,
 * title:{text: string, left:'center', textStyleColor:'white'},
 * xAxis: { name: string x轴单位, nameTextStyleColor: string x轴单位字体颜色, axisLineColor: string x轴线颜色, axisLabelColor: string x轴坐标颜色},
 * yAxis: { name: string y轴单位, nameTextStyleColor: string y轴单位字体颜色, splitLineColor: string y轴线颜色, axisLabelColor: string y轴坐标颜色},
 * data:[{name: string 序列名称,color: string 线颜色, data:[{name:string, value:string},{name:string, value:string}]},
 * {name: string, data: [{name:string, value:string},{name:string, value:string}]}]
 * }
 * @returns
 */
var chartsOptions = function (data) {
  if(data.xAxis === undefined){
    data.xAxis = {}
  }
  if(data.yAxis === undefined){
    data.yAxis = {}
  }
  if(data.title === undefined){
    data.title = {}
  }
  var xAxis = {
    type: 'category',
    name: data.xAxis.name !== undefined?data.xAxis.name:'',
    nameGap: 2,
    nameTextStyle: {
      // color: data.xAxis.nameTextStyleColor !== undefined?data.xAxis.nameTextStyleColor:'white'
      color: 'white'
    },
    // data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    data: [],
    axisTick: {
      show: false
    },
    axisLine: {
      lineStyle: {
        color: data.xAxis.splitLineColor !== undefined?data.xAxis.splitLineColor:'rgb(74,85,177)'
      }
    },
    axisLabel: {
      // color: data.xAxis.axisLabelColor !== undefined?data.xAxis.axisLabelColor:'white'
      color: 'white'
    }
  };

  var yAxis
  if(data.yAxis.constructor === Array){
    yAxis = []
    Object.keys(data.yAxis).forEach(function (value, index, array) {
      yAxis.push({
        type: 'value',
        name: data.yAxis[index].name !== undefined?data.yAxis[index].name:'',
        nameTextStyle: {
          color: data.yAxis[index].nameTextStyleColor !== undefined?data.yAxis[index].nameTextStyleColor:'white'
        },
        splitLine: {
          lineStyle: {
            color: data.yAxis[index].splitLineColor !== undefined?data.yAxis[index].splitLineColor:'rgb(1,41,91)'
          }
        },
        axisTick: {
          show: false
        },
        axisLine: {show: false},
        axisLabel: {
          // color: data.yAxis[index].axisLabelColor !== undefined?data.yAxis[index].axisLabelColor:'white'
          color: 'white'
        }
      })
    })
  }else {
    yAxis = {
      type: 'value',
      name: data.yAxis.name !== undefined?data.yAxis.name:'',
      nameTextStyle: {
        // color: data.yAxis.nameTextStyleColor !== undefined?data.yAxis.nameTextStyleColor:'white'
        color: 'white'
      },
      splitLine: {
        lineStyle: {
          color: data.yAxis.splitLineColor !== undefined?data.yAxis.splitLineColor:'rgb(1,41,91)'
        }
      },
      axisTick: {
        show: false
      },
      axisLine: {show: false},
      axisLabel: {
        // color: data.yAxis.axisLabelColor !== undefined?data.yAxis.axisLabelColor:'white'
        color: 'white'
      }
    }
  }
  var series = []
  var names = []
  Object.keys(data.data[0].data).forEach(function (index, value) {
    xAxis.data.push(data.data[0].data[index].name)
    names.push(data.data[0].data[index].name)
  });
  // if(data.showXChart!== undefined && data.showXChart === true){
  //   data.yAxis.type = 'category'
  //   delete data.xAxis['data']
  //   data.xAxis.type = 'value'
  //   data.yAxis.data = names
  // }
  var legend = {left:'center',textStyle:{color:'white'}}
  if(data.title !== undefined){
    if(data.title.text !== undefined){
      if(data.title.text.length>0){
        legend.bottom = 0
      }else {
        legend.top = 0
      }
    }else {
      legend.top = 0
    }
  }else {
    legend.top = 0
  }

  //数组去重，如果有两个y轴，就要指定那个数据是哪个y轴
  Array.prototype.distinct = function (){
    var arr = this,
      result = [],
      len = arr.length;
    arr.forEach(function(v, i ,arr){  //这里利用map，filter方法也可以实现
      var bool = arr.indexOf(v,i+1);  //从传入参数的下一个索引值开始寻找是否存在重复
      if(bool === -1){
        result.push(v);
      }
    })
    return result;
  };
  var yType = []
  Object.keys(data.data).forEach(function (value, index, array) {
    if(data.data.length>1){
      // legend.data.push(data.data[index].name)
    }
    yType.push(data.data[index].type)
  })
  yType.distinct();
  Object.keys(data.data).forEach(function (value, index, array) {

    if(data.data[index].type === 'bar'){
      var temp = {
        // data: [820, 932, 901, 934, 1290, 1330, 1320],
        data: data.data[index].data,
        type: 'bar',
        name:data.data[index].name,
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(
              0, 0, 0, 1,
              [
                // {offset: 0.7, color: data.data[index].color !== undefined?data.data[index].color:'rgb(0,198,238)'},
                {offset: 0.7, color: DX.color[(index+1)%(DX.color.length)]},
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
                {offset: 0.7, color: DX.color[(index+1)%(DX.color.length)]},
                {offset: 1, color: 'transparent'}
              ]
            )
          }
        }
      }
      if(data.data.length === 1){
        temp.barWidth = '40%'
      }
      series.push(temp)
    }else {
      series.push({
        // data: [820, 932, 901, 934, 1290, 1330, 1320],
        data: data.data[index].data,
        type: 'line',
        name:data.data[index].name,
        symbol: 'circle',
        symbolSize: 7,
        itemStyle: {
          // color: data.data[index].color !== undefined?data.data[index].color:'rgb(0,119,225)'
          color:DX.color[(index+1)%(DX.color.length)]
        },
        areaStyle: {
          color: {
            type: 'line',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              // offset: 0, color: data.data[index].color !== undefined?data.data[index].color:'rgb(0,119,225)' // 0% 处的颜色
              offset: 0, color: DX.color[(index+1)%(DX.color.length)] // 0% 处的颜色
            }, {
              offset: 1, color: 'transparent' // 100% 处的颜色
            }],
            globalCoord: false // 缺省为 false
          }
        }
      })
    }

    if(data.data[index].type === yType[0]){
      series[index].yAxisIndex = 0
    }else {
      series[index].yAxisIndex = 1
    }
  })
  var chartsId =  'charts_' + uuidv4()
  // var nodes = document.getElementById(data.id)
  // nodes.reverse();
  data.elementNode.setAttribute('id',chartsId);
  var node = document.getElementById(chartsId);
  var options = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {            // 坐标轴指示器，坐标轴触发有效
        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    grid: {
      top:30,
      left: '5%',
      right: '5%',
      bottom: '10%',
      containLabel: true
    },
    title:{
      text:data.title.text !== undefined?data.title.text:'',
      left:data.title.left !== undefined?data.title.left:'center',
      textStyle:{
        color:data.title.textStyleColor !== undefined?data.title.textStyleColor:'white'
      }
    },
    legend:legend,
    xAxis: xAxis,
    yAxis: yAxis,
    series: series
  }

  var myCharts = echarts.init(node,'DX')
  myCharts.setOption(options)
  return {id:chartsId, chart: myCharts};
}

/**
 * 桑基图
 */
var funnelCharts = function(data){

  // data = {
  //   "elementNode": {},//承接echarts的标签
  //   "title": {
  //     "text": "",
  //     "left": "center",
  //     "textStyleColor": "white"
  //   },
  // }
  if(data.title === undefined){
    data.title = {}
  }
  if(data.legend === undefined){
    data.legend = {data:[]}
  }else if(data.legend.data === undefined){
    data.legend.data = []
  }
  if(data.tooltip === undefined){
    data.tooltip = {}
  }

  var series = []
  Object.keys(data.data).forEach(function (value, index, array) {
    if(index === 0){
      Object.keys(data.data[0].data).forEach(function (value, index, array) {
        data.legend.data.push(data.data[0].data[index].name)
      })
    }
    series.push({
      name: data.data[index].name,
      type: 'funnel',
      // width: '40%',
      // height: '45%',
      // left: '5%',
      // top: '50%',
      // funnelAlign: 'right',
      sort: 'none',//'ascending'，'descending'，'none'数据排序
      // center: ['25%', '25%'],  // for pie
      data:data.data[index].data,
      label: {
        normal: {
          show: false,
          position: 'inside'
        },
        emphasis: {
          textStyle: {
            // fontSize: 20
          }
        }
      }
    })
  })

  var option = {
    title: {
      text: data.title.text !== undefined?data.title.text:'',
      // subtext: '纯属虚构',
      left: data.title.left !== undefined?data.title.left:'center',
      top: data.title.top !== undefined?data.title.top:'top'
    },
    tooltip: {
      trigger: data.tooltip.trigger !== undefined?data.tooltip.trigger:'item',
      formatter: "{a} <br/>{b} : {c}"
    },
    legend: {
      orient: data.legend.orient !== undefined?data.legend.orient:'horizontal',
      left: data.legend.left !== undefined?data.legend.left:'center',
      top: data.legend.top !== undefined?data.legend.top:'bottom',
      data: data.legend.data,
      textStyle:{
        color:'white'
      }
    },
    series: series
  };

  var chartsId =  'charts_' + uuidv4()
  data.elementNode.setAttribute('id',chartsId);
  var node = document.getElementById(chartsId);

  var myCharts = echarts.init(node,'DX')
  myCharts.setOption(option)

  return {id:chartsId, chart: myCharts};
}

/**
 *饼图
 */

var pieCharts = function(data){

  console.log('123')
  if(data.legend === undefined){
    data.legend = {data:[]}
  }else if(data.legend.data === undefined){
    data.legend.data = []
  }

  var series = []
  Object.keys(data.data).forEach(function (value, index, array) {
    if(index === 0){
      Object.keys(data.data[0].data).forEach(function (value, index, array) {
        data.legend.data.push(data.data[0].data[index].name)
      })
    }
    series.push({
      name:data.data[index].name,
      type:'pie',
      center:['40%', '50%'],
      radius: ['40%', '55%'],
      data:data.data[index].data
    })
  })

  var option = {
    tooltip: {
      trigger: 'item',
      formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    legend: {
      orient: data.legend.orient !== undefined?data.legend.orient:'horizontal',
      left: data.legend.left !== undefined?data.legend.left:'center',
      top: data.legend.top !== undefined?data.legend.bottom:'top',
      textStyle:{
        color:'white'
      }
    },
    series: series
  };

  var chartsId =  'charts_' + uuidv4()
  data.elementNode.setAttribute('id',chartsId);
  var node = document.getElementById(chartsId);

  var myCharts = echarts.init(node,'DX')
  myCharts.setOption(option)
}

export {lineOptions, barOptions, chartsOptions,funnelCharts,pieCharts}

