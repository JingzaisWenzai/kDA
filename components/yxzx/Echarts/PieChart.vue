<template>
  <div class="piechart" :id="pieChartId"></div>
</template>
<style scoped>
  .piechart{
    width:auto;
    height:auto;
    min-width: 115px;
    min-height:120px;
    border:0 solid #f00;
  }
</style>
<script>
  import echart from 'echarts'
  import $ from 'jquery'

  export default{
      name:'PieChart',
      props:['theData'],
      data(){
          return {
            theColor:'#269d09',
            max:'500', /*空气质量最高500*/
            pieChartId:''
          }
      },
      mounted(){
         this.pieChartId =  'piechart' +  this.theData.index;
         this.$nextTick(function(){
           this.drawPie(this.pieChartId,this.theData);
         })
      },
      methods:{
        getLineCol(colors,col){
          for(let i=0;i<colors.length; i++){
            if(i.name === col){
              return i.related;
            }
          }
        },
        drawPie:function(id,data){
            //初始化echarts实例
            let myCharts = echart.init(document.getElementById(id));
            let defaults =  {
              title: {
                show:false,
                text:'41',
                x: 'center',
                y: 'center',
                textStyle: {
                  fontWeight: 'normal',
                  color: '#0bb6f0',
                  fontSize: 20
                }
              },
              backgroundColor: 'transparent',
              color: ['#eb644b', '#313443', '#fff'],
              tooltip: {
                show: false,
                formatter: "{a} <br/>{b} : {c} ({d}%)"
              },
              legend: {
                show: false,
                itemGap: 12,
                data: ['01', '02']
              },
              toolbox: {
                show: false,
                feature: {
                  mark: {
                    show: true
                  },
                  dataView: {
                    show: true,
                    readOnly: false
                  },
                  restore: {
                    show: true
                  },
                  saveAsImage: {
                    show: true
                  }
                }
              },
              series: []
            };
            let colors = [
              {name:'#6bcd07',related:'rgba(34,69,0,0.3)'},
              {name:'#fbd029',related:'rgba(79,65,17,0.3)'},
              {name:'#fe8800',related:'rgba(79,41,2,0.3)'},
              {name:'#fe0000',related:'rgba(65,6,1,0.3)'},
              {name:'#970454',related:'rgba(68,1,40,0.3)'},
              {name:'#62001e',related:'rgba(59,1,18,0.3)'}
            ];
            let col_font = data.color;
            let col_line = this.getLineCol(colors,col_font);
            let opt = {
            title:{
              show:false
            },
            color:['#27a700','#26693f'],
            legend:{
            show:false
            },
            series:[
              {
                name:data.value,
                type:'pie',
                radius: ['84%', '85%'],
                avoidLabelOverlap: false,
                clockwise:false,
                label: {
                  normal: {
                    show: true,
                    position: 'center',
                    formatter:'{c}',
                    textStyle: {
                      fontSize: '32',
                      fontWeight: 'bold'
                    }
                  },
                  emphasis: {
                    show: false
                  }
                },
                itemStyle:{
                  normal: {
                    borderWidth: 2,
                    shadowBlur: 10,
                    borderColor: '#27a700',
                    shadowColor: 'rgba(255,255,255, 0.6)'
                  },
                  emphasis: {
                    show: false
                  }
                },
                labelLine: {
                  normal: {
                    show: false
                  }
                },
                data:[
                  data,
                  {
                    value:(100-data.value),
                    name : '',
                    label:{
                      normal:{
                        show:false
                      },
                      emphasis:{
                        show:false
                      }
                    },
                    itemStyle:{
                      normal: {
                        label: {
                          show: false,
                          position: 'center'
                        },
                        labelLine: {
                          show: false
                        },
                        color: col_font || '#26693f',
                        borderColor: col_line || '#26693f',
                        borderWidth: 1
                      },
                      emphasis:{
                        show:false
                      }
                    }
                  }
                ]
              },
              {
                name:'标签',
                type:'pie',
                radius: ['0', '70%'],
                avoidLabelOverlap: true,
                label: {
                  normal: {
                    show: false,
                    position: 'center'
                  },
                  emphasis: {
                    show: false
                  }
                },
                itemStyle:{
                  normal:{
                    show:false
                  },
                  emphasis:{
                    show:false
                  }
                },
                labelLine: {
                  normal: {
                    show: false
                  }
                },
                data:[
                  {value:100, name:'底图'}
                ]
              }
            ]
          };
            let option = $.extend(defaults,opt);
            myCharts.setOption(option);
        }
      }
  }
</script>
