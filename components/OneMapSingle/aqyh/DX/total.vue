<template>
  <div class="total">
    <p class="main">隐患态势</p>
    <div>
      <p class="tit">全区隐患<i></i></p>
      <!--<div class="title"><span>消防评分建筑总数</span><span>{{total}}</span></div>-->
      <div class="detail" id="threeSmallPlaces_detail_16"></div>
    </div>
    <div>
      <p class="tit">全区隐患分布<i></i></p>
      <div class="detail" id="threeSmallPlaces_detail_17"></div>
    </div>
  </div>
</template>

<script>
  import {showPieCharts,showLineCharts} from "../../../../static/js/OneMap/DX/DX_Chart";
  import {allrigionhiddendangerchart_pie,allrigionhiddendangerchart_bar} from "../../../../api/secapi";
  export default {
    name: "total",
    data(){
      return {
        total:'--',
        myPie:{},
        myLine:{}
      }
    },
    mounted() {
      let $this = this

      allrigionhiddendangerchart_pie().then(function (data) {
        console.log(data)

        $this.total = data.data.total

        let temp = {}
        temp.id = 'threeSmallPlaces_detail_16'
        temp.data = [{
          name:'物联设备',
          data:data.data.data
        }]
        showPieCharts(temp)

      })

      this.getLine()
    },
    methods:{
      getLine(){
        let $this = this
        allrigionhiddendangerchart_bar().then(function (data) {
          console.log(data)

          if(data.code === 10101){
            $this.$element.Notification({
              title: '提示',
              message:data.message,
              type: 'warning',
              duration:0
            });
            setTimeout(function () {
              $this.getLine()
            },60*1000)
            return ;
          }

          let temp = {}
          temp.id = 'threeSmallPlaces_detail_17'
          temp.data = data.data
          for(let i = 0,j = temp.data.length;i<j;i+=1){
            temp.data[i].stack =  '总数'
            temp.data[i].type =  'bar'
          }
          showLineCharts(temp)

        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .total {
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
