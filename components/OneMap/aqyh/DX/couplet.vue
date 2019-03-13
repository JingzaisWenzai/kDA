<template>
  <div class="couplet">
    <p class="main">物联监测</p>
    <div class="title"><span>物联设备总数</span><span>{{total}}</span></div>
    <div>
      <p class="tit">物联设备<i></i></p>
      <div class="detail" id="threeSmallPlaces_detail_9"></div>
    </div>
    <div>
      <p class="tit">传感器设备<i></i></p>
      <div class="detail" id="threeSmallPlaces_detail_10"></div>
    </div>
    <div>
      <p class="tit">报警信息<i></i></p>
      <div class="detail" id="threeSmallPlaces_detail_11">

      </div>
    </div>
  </div>
</template>

<script>
  import {showPieCharts,showLineCharts} from "../../../../static/js/OneMap/DX/DX_Chart";
  import {iothiddendangerchart_leftPie,iothiddendangerchart_rightPie,iothiddendangerchart_line} from "../../../../api/secapi";

  export default {
    name: "couplet",
    data(){
      return {
        total:'--'
      }
    },
    mounted() {
      let $this = this
      iothiddendangerchart_leftPie().then(function (data) {
        console.log(data)

        $this.total = data.data.total

        let temp = {}
        temp.id = 'threeSmallPlaces_detail_9'
        temp.data = [{
          name:'物联设备',
          data:data.data.data
        }]
        showPieCharts(temp)

      })
      iothiddendangerchart_rightPie().then(function (data) {
        console.log(data)

        let temp = {}
        temp.id = 'threeSmallPlaces_detail_10'
        temp.data = [{
          name:'传感器设备',
          data:data.data.data
        }]
        showPieCharts(temp)

      })
      iothiddendangerchart_line().then(function (data) {
        console.log(data)

        let temp = {}
        temp.id = 'threeSmallPlaces_detail_11'
        temp.data = data.data
        showLineCharts(temp)

      })
    }
  }
</script>

<style lang="scss" scoped>
  .couplet {
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
