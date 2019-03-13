<template>
  <div class="e_b_b_a">
    <div class="e_b_b_a_a">
      <div class="e_b_b_a_a_a">
        {{this.chartData.item.name?this.chartData.item.name:'消费'}}
      </div>
      <ul>
        <li v-for="(item,index) in this.chartData.item.msg" :key="index">
          <div class="e_b_b_a_a_b">
            {{item.name}}
          </div>
          <div class="e_b_b_a_a_c">
            <span>{{item.value}}</span>
            <!--<span>%</span>-->
          </div>
        </li>
        <!--<li>-->
        <!--<div class="e_b_b_a_a_b">-->
        <!--年度居民消费价格指数-->
        <!--</div>-->
        <!--<div class="e_b_b_a_a_c">-->
        <!--<span>101</span>-->
        <!--<span>%</span>-->
        <!--</div>-->
        <!--</li>-->
        <!--<li>-->
        <!--<div class="e_b_b_a_a_b">-->
        <!--年度居民消费价格指数-->
        <!--</div>-->
        <!--<div class="e_b_b_a_a_c">-->
        <!--<span>101</span>-->
        <!--<span>%</span>-->
        <!--</div>-->
        <!--</li>-->
      </ul>
    </div>
    <div class="e_b_b_a_b" id="xf">
      <!--<script src="js/xf.js" type="text/javascript" language="javascript"></script>-->
    </div>
  </div>
</template>

<script>
  // import {lineOptions} from '../../../../../../static/js/tizheng/charts'
  import { showLineCharts } from '../../../../../../static/js/OneMap/DX/DX_Chart'

  export default {
    name: 'tabChart01',
    props: ['chartData'],
    data: function() {
      return {
        data: []
      }
    },
    mounted: function() {
      console.log('111111', this.chartData)
      // this.chartData.item.elementNode = document.getElementsByClassName('e_b_b_a_b')[this.chartData.index]
      // lineOptions(this.chartData.item)

      this.initChart()
    },
    watch: {
      chartData: {
        handler: function(val, oldVal) {
          console.log(222, val)
          // this.chartData.item.elementNode = document.getElementsByClassName('e_b_b_a_b')[this.chartData.index]
          // lineOptions(this.chartData.item)
          this.initChart()
        },
        deep: true
      }
    },
    methods: {
      initChart(){
        if(this.chartData.item.msg === undefined){
          document.getElementsByClassName('e_b_b_a_a')[this.chartData.index].children[1].style.display = 'none'
          document.getElementsByClassName('e_b_b_a_b')[this.chartData.index].style.width = '100%'
          document.getElementsByClassName('e_b_b_a_b')[this.chartData.index].style.height = '80%'
          document.getElementsByClassName('e_b_b_a_b')[this.chartData.index].style.margin = '0'
        }

        let id = 'chart_'+uuidv4()
        document.getElementsByClassName('e_b_b_a_b')[this.chartData.index].setAttribute('id',id)
        this.chartData.item.id = id
        this.chartData.item.xAxis = {axisLabel:{ interval:'auto',rotate:'45'}}
        let mychart =  showLineCharts(this.chartData.item)
        mychart.resize()
      }
    }
  }
</script>

<style lang="scss" scoped>
  .e_b_b_a { /*width:928px; height:225px;*/
    width: 99%;
    height: 99%;
    text-align: left;
    margin: 1px auto; /*padding: 20px 30px;*/
    border: #0238a3 solid 1px;
    border-radius: 5px;
    overflow: hidden;
  }

  .e_b_b_a_a {
    width: 288px; /*height:225px; */
    text-align: left;
    margin: 20px 20px;
    float: left;
    display: inline;
    overflow: hidden;
    ul {
      padding-left: 20px;
      /*margin-top: 0px !important;*/
      margin-bottom: 0 !important;
      li {
        margin: 0 !important;
      }
    }
  }

  .e_b_b_a_a_a {
    width: 100%;
    height: 36px;
    line-height: 36px;
    text-align: left;
    margin: 0px auto;
    overflow: hidden;
    font-size: 30px;
    color: #40c6f0;
  }

  .e_b_b_a_a_b { /*width:288px; */
    width: 100%;
    height: 30px;
    line-height: 30px;
    text-align: center; /*margin: 10px auto;*/
    overflow: hidden;
    font-size: 19px;
    color: #b7ecff;
  }

  .e_b_b_a_a_c { /*width:288px; */
    width: 100%; /*height:59px; line-height: 59px;height:50px; line-height: 50px;*/
    text-align: center;
    margin: 0px auto !important;
    overflow: hidden;
    font-size: 30px;
    color: #40c6f0;
  }

  .e_b_b_a_a_c span:nth-child(2) {
    font-size: 22px;
    color: #ffffff;
  }

  .e_b_b_a_b {
    width: 60%;
    height: 80%;
    text-align: left;
    margin: 40px auto;
    float: left;
    display: inline;
    overflow: hidden;
  }
</style>
