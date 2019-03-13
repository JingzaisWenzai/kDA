<template>
  <div class="d_b_a_a">
    <div class="d_b_a_a_a">
      {{this.chartData.item.name}}
    </div>
    <div class="d_b_a_a_b" id="kqzl">
      <!--<script src="js/kqzl.js" type="text/javascript" language="javascript"></script>-->
    </div>
  </div>
</template>

<script>
  // import {lineOptions} from '../../../../../../static/js/tizheng/charts'
  import {showLineCharts} from '../../../../../../static/js/OneMap/DX/DX_Chart'

  export default {
    name: "tabChart01",
    props:['chartData'],
    data: function () {
      return {
        data:[]
      }
    },
    mounted: function () {
      // console.log(this.chartData)
      // this.chartData.item.elementNode = document.getElementsByClassName('d_b_a_a_b')[this.chartData.index]


      this.$nextTick(function() {
        let id = 'chart_'+uuidv4()
        document.getElementsByClassName('d_b_a_a_b')[this.chartData.index].setAttribute('id',id)
        this.chartData.item.id = id
        this.chartData.item.xAxis = {axisLabel:{ interval:'auto',rotate:'45'}}
        showLineCharts(this.chartData.item)
      })


      // lineOptions(this.chartData.item)
    }
  }
</script>

<style lang="scss" scoped>
  .d_b_a_a {
    width: 555px;
    height: 383px;
    text-align: left;
    margin: 0px 32px 30px;
    padding: 20px 30px;
    border: #0238a3 solid 1px;
    border-radius: 5px;
    float: left;
    display: inline;
    overflow: hidden;
  }

  .d_b_a_a_a {
    width: 545px;
    height: 36px;
    text-align: left;
    margin: 0px auto 20px;
    overflow: hidden;
    font-size: 30px;
    color: #40c6f0;
  }

  .d_b_a_a_b {
    width: 545px;
    height: 302px;
    text-align: left;
    margin: 0px auto 20px;
    overflow: hidden;
  }

</style>
