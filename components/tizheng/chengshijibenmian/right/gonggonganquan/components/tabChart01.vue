<template>
  <div class="c_b_a_b_a">
    <div class="c_b_a_b_a_a">
      <div class="c_b_a_b_a_a_a">
        刑事案件发生量
      </div>
      <div class="c_b_a_b_a_a_b">
        <span>今日 </span>
        <span>28</span>
      </div>
    </div>
    <div class="c_b_a_b_a_b" id="xsajfxl">
      <!--<script src="js/xsajfxl.js" type="text/javascript" language="javascript"></script>-->
    </div>
  </div>
</template>

<script>
  import {lineOptions} from '../../../../../../static/js/tizheng/charts'

  export default {
    name: "tabChart01",
    props:['chartData'],
    data: function () {
      return {
        data:[]
      }
    },
    mounted: function () {

      this.chartData.item.elementNode = document.getElementsByClassName('c_b_a_b_a_b')[this.chartData.index]
      lineOptions(this.chartData.item)
    }
  }
</script>

<style scoped>
  .c_b_a_b_a {
    /*width: 352px;*/
    width: 46%;
    /*height: 508px;*/
    text-align: left; /*margin: 0px 20px 0px 0px;*/
    padding: 20px;
    border: #0238a3 solid 1px;
    border-radius: 5px;
    float: left;
    display: inline;
    overflow: hidden;
  }

  .c_b_a_b_a_a {
    /*width: 352px;*/
    width: 100%;
    height: 104px;
    text-align: left;
    margin: 0px auto 20px;
    overflow: hidden;
  }

  .c_b_a_b_a_a_a {
    /*width: 352px;*/
    width: 100%;
    height: 30px;
    line-height: 30px;
    text-align: center;
    margin: 0px auto 24px;
    overflow: hidden;
    font-size: 19px;
    color: #b7ecff;
  }

  .c_b_a_b_a_a_b {
    /*width: 352px;*/
    width: 100%;
    height: 50px;
    line-height: 50px;
    text-align: center;
    margin: 0px !important;
    overflow: hidden;
    font-size: 55px;
    color: #40c6f0;
  }

  .c_b_a_b_a_a_b span:nth-child(1) {
    font-size: 22px;
    color: #ffffff;
    vertical-align: 10px;
  }

  .c_b_a_b_a_b {
    /*width: 352px;*/
    width: 100%;
    height: 384px;
    text-align: left;
    margin: 0 !important;
    overflow: hidden;
  }
</style>
