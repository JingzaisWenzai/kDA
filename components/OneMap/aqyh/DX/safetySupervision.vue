<template>
  <div class="safetySupervision">
    <p class="main">安监类隐患</p>
    <div>
      <p class="tit">纳管企业<i></i></p>
      <div class="title"><span>纳管企业总数</span><span>7041</span></div>
      <div class="detail" id="threeSmallPlaces_detail_3"></div>
    </div>
    <div>
      <p class="tit">全区案件隐患<i></i></p>
      <div class="title"><span>待处置隐患总数</span><span>7041</span></div>
      <div class="detail" id="threeSmallPlaces_detail_4"></div>
    </div>
    <div>
      <p class="tit">区域安监隐患总数<i></i></p>
      <div class="detail" id="threeSmallPlaces_detail_5">

      </div>
    </div>
  </div>
</template>

<script>
  import {showPieCharts,showLineCharts} from "../../../../static/js/OneMap/DX/DX_Chart";
  import {threesmallchart_pie,threesmallchart_line} from "../../../../api/secapi";
  export default {
    name: "safetySupervision",
    data(){
      return {
        total1:'--',
        total2:'--'
      }
    },
    mounted(){

      let $this = this

      threesmallchart_pie().then(function (data) {
        console.log(data)

        $this.total = data.data.total1

        let temp = {}
        temp.id = 'threeSmallPlaces_detail_3'
        temp.data = [{
          name:'三小场所',
          data:data.data.data
        }]
        showPieCharts(temp)

      })
      threesmallchart_pie().then(function (data) {
        console.log(data)

        $this.total = data.data.total2

        let temp = {}
        temp.id = 'threeSmallPlaces_detail_4'
        temp.data = [{
          name:'三小场所',
          data:data.data.data
        }]
        showPieCharts(temp)

      })
      threesmallchart_line().then(function (data) {
        console.log(data)

        let temp = {}
        temp.id = 'threeSmallPlaces_detail_5'
        temp.data = data.data

        showLineCharts(temp)

      })
    }
  }
</script>

<style lang="scss" scoped>
.safetySupervision {
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
      font-weight: bold;
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
      height: 230px;
      width: 100%;
      /*background-color: white;*/
    }
  }
</style>
