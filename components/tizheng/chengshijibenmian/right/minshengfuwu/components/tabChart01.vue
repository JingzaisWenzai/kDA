<template>
  <div class="tabChart01">
    <div class="f_b_a_b_a">
      <div class="f_b_a_b_a_a">
        {{this.chartData.item.msg.subtext}}
      </div>
      <!--<div class="f_b_a_b_a_b">-->
        <!--<span>{{this.chartData.item.msg.name}}</span>-->
        <!--<span>{{this.chartData.item.msg.value}}</span>-->
      <!--</div>-->
    </div>
    <div class="f_b_a_b_b" id="yey">
      <!--<script src="js/yey.js" type="text/javascript" language="javascript"></script>-->
    </div>
  </div>
</template>

<script>
  import { barOptions } from '../../../../../../static/js/tizheng/charts'
  import { showLineCharts } from '../../../../../../static/js/OneMap/DX/DX_Chart'

  export default {
    name: 'tabChart01',
    props: ['chartData'],
    data: function() {
      return {
        data: []
      }
    },
    watch: {
      chartData: {
        handler: function(val, oldVal) {
          this.initChart()
        },
        deep: true
      }
    },
    mounted: function() {
      // console.log(this.chartData)
      // this.chartData.item.elementNode = document.getElementsByClassName('f_b_a_b_b')[this.chartData.index]
      // barOptions(this.chartData.item)

      this.$nextTick(function() {
        this.initChart()
      })

    },
    methods: {
      initChart() {
        if (this.chartData.item.msg === null) {
          document.getElementsByClassName('f_b_a_b_b')[this.chartData.index].style.display = 'none'
          document.getElementsByClassName('f_b_a_b_b')[this.chartData.index].style.height = '290px'
        }
        let id = 'chart_' + uuidv4()
        document.getElementsByClassName('f_b_a_b_b')[this.chartData.index].setAttribute('id', id)
        let data = {}
        data.id = id
        data.data = this.chartData.item.data
        data.xAxis = { axisLabel: { interval: 'auto', rotate: '25' } }
        data.legend = {selectedMode : 'single'}
        let chart = showLineCharts(data)
        chart.resize()
      }
    }
  }
</script>

<style lang="scss" scoped>
  .tabChart01 {
    width: 544px;
    height: 361px;
  }

  .f_b_a_b_a {
    width: 544px;
    height: 31px;
    line-height: 31px;
    text-align: left;
    margin: 0px auto 10px;
    overflow: hidden;
  }

  .f_b_a_b_a_a {
    width: 350px;
    height: 31px;
    line-height: 31px;
    text-align: left;
    margin: 0px 20px 0px 0px;
    float: left;
    display: inline;
    overflow: hidden;
    font-size: 20px;
    color: #b7ecff;
  }

  .f_b_a_b_a_b {
    width: 174px;
    height: 31px;
    line-height: 31px;
    text-align: right;
    margin: 0px auto;
    float: left;
    display: inline;
    overflow: hidden;
    font-size: 20px;
    color: #b7ecff;
  }

  .f_b_a_b_a_b span:nth-child(2) {
    font-size: 30px;
    color: #ff7f0d;
  }

  .f_b_a_b_b {
    width: 100%;
    height: 300px;
  }
</style>
