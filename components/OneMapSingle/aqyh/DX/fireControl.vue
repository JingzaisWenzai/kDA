<template>
  <div class="fireControl">
    <p class="main">消防类隐患</p>
    <div>
      <p class="tit">全区消防评分建筑<i></i></p>
      <div class="title"><span>消防评分建筑总数</span><span>{{total}}</span></div>
      <div class="detail" id="threeSmallPlaces_detail_14"></div>
    </div>
    <div>
      <p class="tit">区域消防风险<i></i></p>
      <div class="detail" id="threeSmallPlaces_detail_15"></div>
    </div>
  </div>
</template>

<script>
  import {showPieCharts,showLineCharts} from "../../../../static/js/OneMap/DX/DX_Chart";
  import {firehiddendangerchart_pie,firehiddendangerchart_bar} from "../../../../api/secapi";
    export default {
        name: "fireControl",
      data(){
        return {
          total:'--'
        }
      },
      mounted() {

        this.getPie()
        this.getLine()
      },
      methods:{
          getPie(){
            let $this = this
            firehiddendangerchart_pie().then(function (data) {
              console.log(data)

              $this.total = data.data.total

              let temp = {}
              temp.id = 'threeSmallPlaces_detail_14'
              temp.data = [{
                name:'物联设备',
                data:data.data.data
              }]
              showPieCharts(temp)

            })
          },
        getLine(){
          let $this = this
          firehiddendangerchart_bar().then(function (data) {
            console.log(data)

            let temp = {}
            temp.id = 'threeSmallPlaces_detail_15'
            temp.data = data.data
            for(let i = 0,j = temp.data.length;i<j;i+=1){
              // temp.data[i].stack =  '总数'
              temp.data[i].type =  'bar'
            }
            showLineCharts(temp)

          })
        }
      }
    }
</script>

<style lang="scss" scoped>
  .fireControl {
    .main {
      font-size: 22px;
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
