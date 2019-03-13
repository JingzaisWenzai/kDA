<template>
  <div class="barchart" :id="barChartId">

  </div>
</template>
<style scoped>
  .barchart{
    width:100%;
    height:100%;
    min-width: 100px;
    min-height:80px;
    border:0 solid #f00;
  }
</style>
<script>
  import echart from 'echarts'
  import $ from 'jquery'

  export default{
    name:'PieChart',
    props:['chartData'],
    data(){
      return {
        theColor:'#269d09',
        yMax:'', /*最高柱型500*/
        xAxis:[],
        odata: [],
        barChartId:'',
        dataStyle:[],
        colors:['#6000ff','#0057e5','#00c5fc','#9ee006']
      }
    },
    watch:{
      chartData : {
        handler:function(val,oldVal){
          this.barChartId =  val.oid;
          let odata = this.dealData(val.data);
          this.$nextTick(function(){
            this.drawChart(this.barChartId,odata);
          });
        },
        deep:true
      }
    },
    mounted(){
      this.barChartId =  this.chartData.oid;
      let odata = this.dealData(this.chartData.data);
      this.$nextTick(function(){
        this.drawChart(this.barChartId,odata);
      });
    },
    computed:{
    },
    methods: {
      dealData: function (obj) {
        let arr = {};
        arr.xAxis = [];
        arr.leg = [];
        arr.data = [];
        let oname, oval;
        if (obj.length !== 0) {
          for (let i = 0; i < obj.length; i++) {
            oname = obj[i].name || '';
            oval = obj[i].value | '';
            arr.xAxis.push(oname);
            arr.leg.push({
              name: oname,
              value: oval
            })
          }
          arr.data = obj;
        }
        return arr;
      },
      drawChart(id, odata){
        //初始化echarts实例
        let myChart = echart.init(document.getElementById(id));
        let defaults = {
          title: {
            show: false
          },
          backgroundColor: 'transparent',
          color: ['#eb644b', '#313443', '#fff'],
          tooltip: {
            show: false,
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            show: false
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
        let opt = {
          grid: {
            left: 0,
            top: 0,
            bottom: 50,
            right: 0
          },
          tooltip: {
            show: false,
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          color: this.colors,
          legend: {
            left: '50%',
            top: 'center',
            width: '175px',
            itemWidth: 0,
            itemHeight: 0,
            z: 1000,
            formatter: function (name) {
              let ovalue = '';
              for (let i = 0; i < odata.leg.length; i++) {
                if (odata.leg[i].name === name) {
                  ovalue = odata.leg[i].value;
                }
              }
              return [
                '{a|' + name + '}',
                '{b|' + ovalue + '}'
              ].join('\n')
            },
            data: odata.xAxis,
            textStyle: {
              rich: {
                a: {
                  fontSize: 12,
                  color: '#cccccc',
                  align: 'center'
                },
                b: {
                  fontSize: 16,
                  color: '#00fff6',
                  align: 'center'
                }
              }
            }
          },
          toolbox: {
            show: false
          },
          calculable: true,
          series: [{
            type: 'pie',
            radius: [0, '70%'],
            center: ['30%', '50%'],
            roseType: 'radius',
            label: {
              normal: {
                show: false
              },
              emphasis: {
                show: false
              }
            },
            labelLine: {
              normal: {
                show: false
              },
              emphasis: {
                show: false
              }
            },
            data: odata.data
          }]
        };
        let option = $.extend(defaults, opt);
        myChart.setOption(option);

    /*    myChart.on('legendselectchanged', function (obj) {
          let name = obj.name;
          let option = myChart.getOption();
          let odata = option.legend[0].data;
          for (let i in odata) {
            option.legend[0].selected[odata[i]] = true;
          }
          myChart.setOption(option, true);
          if (legend_data[name] === 0) {
            return false;
          } else {
            for (let j in l_data) {
              if (l_data[j].name === name) {
                let r_data = l_data[j];
                let legend_name2 = (function (arr) {
                  let res = []
                  for (let k in arr) {
                    res.push(arr[k].name);
                  }
                  return res;
                })(r_data.data);
                if (theRightPie) {
                  theRightPie.clear();
                  theRightPie = hd.drawRightPie(theRightPie, 'hd_special', legend_name2, r_data['name'], r_data['data']);
                } else {
                  theRightPie = hd.drawRightPie(null, 'hd_special', legend_name2, r_data['name'], r_data['data']);
                }

              }
            }
          }
        });*/


      }
    }
  }
</script>
