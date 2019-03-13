<template>
  <div class="msfw-tabChart02">
    <div class="f_b_b_a_a">
      <div class="f_b_b_a_a_a">
        {{this.chartData.item.name}}
      </div>
      <div class="f_b_b_a_a_b">
        <ul>
          <li>
            <div class="f_b_b_a_a_b_a">
              {{this.chartData.item.msg !== null?this.chartData.item.msg.subtext:''}}
            </div>
            <div class="f_b_b_a_a_b_b">
              {{this.chartData.item.msg !== null?this.chartData.item.msg.subTextValue:''}}
            </div>
          </li>
          <li>
            <div class="f_b_b_a_a_b_a">
              {{this.chartData.item.msg !== null?this.chartData.item.msg.name:''}}
            </div>
            <div class="f_b_b_a_a_b_b">
              {{this.chartData.item.msg !== null?this.chartData.item.msg.value:''}}
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="f_b_b_a_b" id="yiliao">
      <!--<script src="js/yiliao.js" type="text/javascript" language="javascript"></script>-->
    </div>
  </div>
</template>

<script>
  import { lineOptions } from '../../../../../../static/js/tizheng/charts'
  import {showLineCharts} from '../../../../../../static/js/OneMap/DX/DX_Chart'

  export default {
    name: 'tabChart02',
    props: ['chartData'],
    data: function() {
      return {
        data: []
      }
    },
    mounted: function() {
      // console.log(this.chartData)
      // this.chartData.item.elementNode = document.getElementsByClassName('f_b_b_a_b')[this.chartData.index]
      // lineOptions(this.chartData.item)

      this.$nextTick(function() {
        this.initChart()
      })
    },
    watch:{
      chartData:{
        handler:function(val,oldVal){
          this.initChart()
        },
        deep:true
      }
    },
    methods:{
      initChart(){
        if(this.chartData.item.msg === null){
          document.getElementsByClassName('f_b_b_a_a_b')[this.chartData.index].style.display = 'none'
          document.getElementsByClassName('f_b_b_a_b')[this.chartData.index].style.height = '290px'
        }

        let id = 'chart_'+ uuidv4()
        document.getElementsByClassName('f_b_b_a_b')[this.chartData.index].setAttribute('id',id)
        let data = {}
        data.id = id
        data.data = this.chartData.item.data
        data.xAxis = {axisLabel:{ interval:'auto',rotate:'25'}}
        let chart = showLineCharts(data)
        chart.resize()
      }
    }
  }
</script>

<style lang="scss" scoped>
  .msfw-tabChart02 {
    width: 668px;
    height: 388px;
    text-align: left;
    margin: 0px 0 20px;
    overflow: hidden;
    padding: 20px 30px;
    border: #0238a3 solid 1px;
    border-radius: 5px;
  }

  .f_b_b_a_a {
    width: 608px;
    /*height: 128px;*/
    text-align: left;
    margin: 0px auto 20px;
    overflow: hidden;
  }

  .f_b_b_a_a_a {
    width: 608px;
    height: 36px;
    text-align: left;
    margin: 0px auto 10px;
    overflow: hidden;
    font-size: 30px;
    color: #40c6f0;
  }

  .f_b_b_a_a_b {
    width: 608px;
    height: 80px;
    text-align: left;
    margin: 0px auto;
    overflow: hidden;
  }

  .f_b_b_a_a_b ul {
    width: 608px;
    height: 80px;
    text-align: left;
    margin: 0px auto;
    overflow: hidden;
  }

  .f_b_b_a_a_b ul li {
    width: 304px;
    height: 80px;
    line-height: 80px;
    text-align: left;
    margin: 0px auto;
    float: left;
    display: inline;
    overflow: hidden;
  }

  .f_b_b_a_a_b_a {
    width: 304px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    margin: 0px auto 2px;
    overflow: hidden;
    font-size: 19px;
    color: #b7ecff;
  }

  .f_b_b_a_a_b_b {
    width: 304px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    margin: 0px auto;
    overflow: hidden;
    font-size: 45px;
    color: #40c6f0;
  }

  .f_b_b_a_a_b_b span:nth-child(2) {
    font-size: 22px;
    color: #ffffff;
    vertical-align: 5px;
  }

  .f_b_b_a_b {
    height: 220px;
  }
</style>
