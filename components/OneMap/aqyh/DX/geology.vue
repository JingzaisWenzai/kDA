<template>
  <div class="geology">
    <p class="main">地质类</p>
    <div class="title"><span>地质隐患总数</span><span>{{total}}</span></div>
    <div>
      <p class="tit">隐患类型<i></i></p>
      <div class="detail" id="threeSmallPlaces_detail_6"></div>
    </div>
    <div>
      <p class="tit">巡查隐患<i></i></p>
      <div class="detail" id="threeSmallPlaces_detail_7"></div>
    </div>
    <div>
      <p class="tit">预测危险性<i></i></p>
      <div class="detail" id="threeSmallPlaces_detail_8">

      </div>
    </div>
  </div>
</template>

<script>
  import {showPieCharts} from "../../../../static/js/OneMap/DX/DX_Chart";
  import {geologyhiddendangerchart_countAll,geologyhiddendangerchart_lefttoppie,geologyhiddendangerchart_righttoppie,geologyhiddendangerchart_bottompie} from "../../../../api/secapi";
  export default {
    name: "geology",
    data(){
      return {
        total:'--'
      }
    },
    mounted() {
      let $this = this
      geologyhiddendangerchart_countAll().then(function (data) {
        $this.total = data.data.total
      })
      geologyhiddendangerchart_lefttoppie().then(function (data) {
        console.log(data)

        let temp = {}
        temp.id = 'threeSmallPlaces_detail_6'
        temp.data = [{
          name:'隐患类型',
          data:data.data.data
        }]
        showPieCharts(temp)

      })
      geologyhiddendangerchart_righttoppie().then(function (data) {
        console.log(data)

        let temp = {}
        temp.id = 'threeSmallPlaces_detail_7'
        temp.data = [{
          name:'巡查类型',
          data:data.data.data
        }]
        showPieCharts(temp)

      })
      geologyhiddendangerchart_bottompie().then(function (data) {
        console.log(data)

        $this.total = data.data.total

        let temp = {}
        temp.id = 'threeSmallPlaces_detail_8'
        temp.data = [{
          name:'预测危险性',
          data:data.data.data
        }]
        showPieCharts(temp)

      })
    }
  }
</script>

<style lang="scss" scoped>
  .geology {
    .main {
      font-size: 26px;
      color: #7af3ff;
    }
    .tit {
      color: #00c0dd;
      font-size: 19px;
      margin: 15px 0;
      width: auto;
      display: inline-block;
      position: relative;
      border-bottom: 1px solid #00ffff;
      i {
        position: absolute;
        left: 50%;
        top: 100%;
        margin-top: -3px;
        width: 0;
        height: 0;
        border-left: 3px solid transparent;
        border-right: 3px solid transparent;
        border-bottom: 3px solid #00ffff;
      }
    }
    .title {
      span:nth-child(1) {
        color: white;
        font-size: 16px;
        margin-left: 30px;
      }
      span:nth-child(2) {
        color: #fdbe00;
        font-size: 22px;
        margin-left: 10px;
      }
    }
    .detail {
      height: 240px;
      width: 100%;
      /*background-color: white;*/
    }
  }
</style>
