<template>
  <div style="width: 1870px; height: 800px; margin: auto; position: relative; bottom: 950px; z-index: 3;">
    <!--预警趋势分析开始-->
    <div class="d">
      <div class="d_a">
        <a target="" href="javascript:void(0);" title="关闭" @click="closeTrend"><img
          src="../../static/img/yjzx/yjzx_15.png"/></a>
      </div>
      <div class="d_b">
        <ul>
          <li class="d_b_a">
            <a target="" :class="currentTrend?'trend_click':'trend_noclick'" href="javascript:void(0);" title="趋势"
               id="d_b_click" @click="getTrendList(0)">
              <span><img src="../../static/img/yjzx/yjzx_24hover.png"/></span>
              <span>趋势</span>
            </a>
          </li>
          <li class="d_b_b">
            <a target="" :class="currentInfo?'trend_click':'trend_noclick'" href="javascript:void(0);" title="对比"
               @click="getTrendList(1)">
              <span><img src="../../static/img/yjzx/yjzx_25.png"/></span>
              <span>对比</span>
            </a>
          </li>
        </ul>
      </div>
      <div class="d_c" v-show="trendPage">
        <div class="d_c_a">
          <ul>
            <li @click="ewTitleClick(-1)"
                :class="current === -1?'trend_click':'trend_noclick'"
            >-&nbsp;&nbsp;全览&nbsp;&nbsp;-
            </li>
            <li v-for="(value,index) in type.data" :key="index" @click="ewTitleClick(index,value)"
                :class="current === index?'trend_click':'trend_noclick'">
              {{value.name}} -
            </li>
          </ul>
        </div>
        <!--<div class="d_c_b">-->
          <!--<ul>-->
            <!--<li @click="ewTitleRankClick(-1)"-->
                <!--:class="[{trend_noclick:-1!==currentRank},{trend_click:-1===currentRank}]"-->
            <!--&gt;-&nbsp;&nbsp;默认&nbsp;&nbsp;- -->
            <!--</li>-->
            <!--<li v-for="(da,index) in ewTitleRank" :key="index" @click="ewTitleRankClick(index)"-->
                <!--:class="[{trend_noclick:index!==currentRank},{trend_click:index===currentRank}]">-->
              <!--&gt;{{da}} - -->
            <!--</li>-->
            <!--&lt;!&ndash; <li>增长率</li>-->
             <!--<li>-</li>-->
             <!--<li>下降率</li>-->
             <!--<li>-</li>-->
             <!--<li>平稳率</li>-->
             <!--<li>-</li>-->
             <!--<li>波动率</li>-->
             <!--<li>-</li>&ndash;&gt;-->
          <!--</ul>-->
        <!--</div>-->
        <div class="d_c_c">
          <ul>
            <li v-for="(item,index) in echartsData1" :id="item.id" :key="index">
            </li>
          </ul>
        </div>
      </div>
      <div class="d_d" v-show="contrastPage"><!--style="display: none;"-->
        <div class="d_d_a">
          <ul>
            <li @click="ewTitleComClick(-1)"
                :class="currentCompaere === -1?'trend_click':'trend_noclick'"
            >-&nbsp;&nbsp;全览&nbsp;&nbsp;-
            </li>
            <!-- <li :id="ms.id" v-for="(ms,index) in msgTitle" :key="index">
             </li>-->
            <li v-for="(da,index) in type.data" :key="index" @click="ewTitleComClick(index,da)"
                :class="currentCompaere === index?'trend_click':'trend_noclick'">
              {{da.name}} -
            </li>
          </ul>
        </div>
        <div class="d_d_b">
          <div class="d_d_b_a" :id="echartsData2 === null ?'id':echartsData2.id">
            <!-- <script src="js/db.js" type="text/javascript" language="javascript"></script>-->
          </div>
          <!--<div class="d_d_b_b" style="display: none;">-->
          <div class="d_d_b_b">
            <el-select v-model="value" placeholder="请选择" class="d_d_b_b_select">
              <el-option
                v-for="item in years"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
            <!--<div class="d_d_b_b_c">-->
              <!--<ul>-->
                <!--<li v-for="(da,index) in years" :key="index" @click="animationTime(index)">{{da}}</li>-->
                <!--&lt;!&ndash;  <li>2016</li>-->
                  <!--<li>2017</li>-->
                  <!--<li>2018</li>&ndash;&gt;-->
              <!--</ul>-->
            <!--</div>-->
          </div>
        </div>
      </div>
    </div>
    <!--预警趋势分析结束-->
  </div>
</template>
<script>
  import bus from '../../assets/js/main.js'
  import {showLineCharts} from '../../static/js/OneMap/DX/DX_Chart'
  import { alram_trend_one, alram_trend_one_drillDown, alram_trend_two, alram_trend_two_drillDown } from '../../api/yjzx'
  import { unitTemp } from '../../utils/street_community'

  export default {
    props: ['type'],
    data: function() {
      let year = new Date().getFullYear()
      return {
        trendPage: true,
        contrastPage: false,
        //用于样式  //标签颜色
        currentTrend: true,
        currentInfo: false,
        current: -1,  //趋势颜色
        currentRank: -1, //排行颜色
        currentCompaere: -1, //对比分析颜色,
        echartsData1: null,
        echartsData2: null,
        color:["#c12e34", "#e6b600", "#0098d9", "#2b821d", "#005eaa", "#339ca8", "#cda819", "#32a487"],
        years:[year-2,year-1,year],
        value:year,
        summary_code:''
      }
    },
    watch: {
      type: {
        handler: function(val, old) {

        },
        deep: true
      },
      value(val, old){
        if(this.currentCompaere === -1){
          this.getAlram_trend_two({year:this.value})
        }else {
          this.getAlram_trend_two_drillDown({summary_code:this.summary_code,date:this.value})
        }
      }
    },
    beforeDestroy() {

    },
    mounted() {
      document.getElementsByClassName('d_c_a')[0].children[0].children[0].click()
    },
    computed: {

    },
    methods: {
      closeTrend() {
        document.getElementsByClassName('a_b_a')[0].children[0].click()
      },
      getTrendList(index) {
        if (index === 0) {
          //趋势
          this.currentTrend = true
          this.currentInfo = false

          //echarts 切换
          this.trendPage = true
          this.contrastPage = false

          document.getElementsByClassName('d_c_a')[0].children[0].children[0].click()

        } else {
          //对比
          this.currentTrend = false
          this.currentInfo = true

          //echarts 切换
          this.trendPage = false
          this.contrastPage = true

          document.getElementsByClassName('d_d_a')[0].children[0].children[0].click()
        }

      },
      ewTitleClick(index,item) {
        this.current = index

        // alarm_Code
        if(item === undefined){
          this.getAlram_trend_one()
        }else {
          this.getAlram_trend_one_drillDown({alarm_Code:item.code})
        }

      },
      ewTitleComClick(index,item) {
        this.currentCompaere = index
        this.value = this.years[this.years.length-1]
        if(item === undefined){
          this.getAlram_trend_two({year:this.value})
        }else {
          this.getAlram_trend_two_drillDown({summary_code:item.code,date:this.value})
        }

      },
      ewTitleRankClick(index) {
        this.currentRank = index
      },
      //趋势分析 总
      getAlram_trend_one(){

        this.echartsData1 = null
        let $this = this
        alram_trend_one().then(function(data) {
          console.log(data)
          let temp = []
          for(let i = 0,j = data.length;i<j;i+=1){
            let tempData = []
            tempData.push(data[i])
            temp.push({data:tempData,id:uuidv4(),xAxis: { axisLabel: { interval: 'auto', rotate: '45' } },color:[$this.color[i%($this.color.length)]]})
          }
          $this.echartsData1 = temp
          $this.$nextTick().then(function () {
              for(let i = 0,j = $this.echartsData1.length;i<j;i+=1){
                showLineCharts($this.echartsData1[i])
              }
            })

        })
      },
      //趋势分析 二级
      getAlram_trend_one_drillDown(params){
        this.echartsData1 = null
        let $this = this
        alram_trend_one_drillDown(params).then(function(data) {
          console.log(data)
          let temp = []
          for(let i = 0,j = data.length;i<j;i+=1){
            let tempData = []
            tempData.push(data[i])
            temp.push({data:tempData,id:uuidv4(),xAxis: { axisLabel: { interval: 'auto', rotate: '45' } },color:[$this.color[i%($this.color.length)]]})
          }
          $this.echartsData1 = temp
          $this.$nextTick().then(function () {
            for(let i = 0,j = $this.echartsData1.length;i<j;i+=1){
              showLineCharts($this.echartsData1[i])
            }
          })
        })
      },
      //对比分析 总
      getAlram_trend_two(params) {
        this.echartsData2 = null
        let $this = this
        alram_trend_two(params).then(function(data) {
          console.log(data)
          let temp = {}
          temp = { data: [{name:'对比分析',type:'bar',data:data}], id: uuidv4(),grid:{bottom:'10%'} }
          $this.echartsData2 = temp
          $this.$nextTick().then(function () {
            showLineCharts($this.echartsData2)
          })
        })
      },
      //对比分析 二级
      getAlram_trend_two_drillDown(params){
        this.echartsData2 = null
        let $this = this
        alram_trend_two_drillDown(params).then(function(data) {
          console.log(data)
          let temp = {}
          temp = { data: [{name:'对比分析',type:'bar',data:data,barMaxWidth:50}], id: uuidv4(),grid:{bottom:'10%'}}
          $this.echartsData2 = temp
          $this.$nextTick().then(function () {
            showLineCharts($this.echartsData2)
          })
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  /* ---------------------------预警趋势分析---------------------------------------------------------------------------------------------------*/
  .d {
    width: 1870px;
    height: 800px;
    text-align: left;
    margin: 0px auto;
    padding: 20px;
    overflow: hidden;
    /*position: absolute;*/
    /*bottom: 110px;*/
    /*right: 40px;*/
    border: #00d8ff solid 1px;
    border-radius: 5px;
    background-color: #041738;
    z-index: 2;
  }

  .d_a {
    /*width: 1870px;*/
    height: 23px;
    line-height: 23px;
    text-align: right;
    margin: 0px auto;
    overflow: hidden;
    cursor: pointer;
  }

  .d_a img {
    width: 23px;
    height: 23px;
  }

  .d_b {
    width: 1870px;
    height: 35px;
    line-height: 35px;
    text-align: left;
    margin: 0px auto 22px;
    overflow: hidden;
  }

  /*
    .d_b ul{width:602px; height:35px; line-height: 35px; text-align: left; margin: 0px 684px;  overflow: hidden;}
  */
  .d_b ul {
    width: 502px;
    height: 35px;
    line-height: 35px;
    text-align: left;
    margin: 0px 684px;
    overflow: hidden;
  }

  .d_b ul li {
    width: 250px;
    height: 35px;
    line-height: 35px;
    text-align: center;
    margin: 0px auto;
    float: left;
    display: inline;
    overflow: hidden;
    cursor: pointer;
  }

  .d_b ul li:nth-child(1) {
    border-right: #4151a6 solid 2px;
  }

  .d_b ul li img {
    width: 35px;
    height: 35px;
    margin-right: 25px;
  }

  /*
    .d_b a{ height:35px; line-height: 35px; padding: 0px 40px; text-decoration: none; display: block; font-size: 26px; color: #00d8ff;}
  */
  .d_b a {
    /*width: 170px;*/
    height: 35px;
    line-height: 35px;
    padding: 0px 40px;
    text-decoration: none;
    display: block;
    font-size: 26px;
    /* color: #00d8ff;*/
  }

  .d_b ul li a:hover, .d_b ul li a:active, .d_b ul li a:focus {
    height: 35px;
    line-height: 35px;
    padding: 0px 40px;
    text-decoration: none;
    display: block;
    font-size: 26px;
    color: #ffab27;
  }

  .d_b_on {
    font-size: 26px;
    color: #00d8ff;
  }

  .d_b_click {
    font-size: 26px;
    color: #ffab27;
  }

  .d_b ul li span {
    float: left;
    display: inline;
    overflow: hidden;
  }

  .d_c {
    width: 1870px;
    height: 720px;
    text-align: left;
    margin: 0px auto;
    overflow: hidden;
  }

  .d_c_a {
    width: 1870px;
    height: 45px;
    line-height: 45px;
    text-align: left;
    margin: 0px auto;
    overflow: hidden;
  }

  .d_c_a ul {
    width: 1210px;
    height: 45px;
    line-height: 45px;
    text-align: left;
    margin: 0px 330px;
    overflow: hidden;
  }

  .d_c_a ul li {
    cursor: pointer;
    width: auto;
    height: 45px;
    line-height: 45px;
    text-align: left;
    margin: 0px 5px;
    float: left;
    display: inline;
    overflow: hidden;
    font-size: 24px;
    /* color: #ffffff;*/
  }

  .d_c_a ul li:nth-child(1) {
    font-size: 24px;
    /* color: #ffab27;*/
  }

  .d_c_b {
    width: 1870px;
    height: 45px;
    line-height: 45px;
    text-align: left;
    margin: 0px auto;
    overflow: hidden;
  }

  .d_c_b ul {
    width: 550px;
    height: 45px;
    line-height: 45px;
    text-align: left;
    margin: 0px 660px;
    overflow: hidden;
  }

  .d_c_b ul li {
    width: auto;
    height: 45px;
    line-height: 45px;
    text-align: left;
    margin: 0px 5px;
    float: left;
    display: inline;
    overflow: hidden;
    font-size: 24px;
    cursor: pointer;
    /*  color: #ffffff;*/
  }

  .d_c_b ul li:nth-child(1) {
    font-size: 24px;
    /*color: #ffab27;*/
  }

  .d_c_c {
    width: 1870px;
    height: 630px;
    text-align: left;
    margin: 0px auto;
    overflow: hidden;
  }

  .d_c_c ul {
    width: 1870px;
    height: 630px;
    text-align: left;
    margin: 0px auto;
    overflow: hidden;
  }

  .d_c_c ul li {
    width: 360px;
    height: 180px;
    text-align: left;
    margin: 15px 53.75px;
    float: left;
    display: inline;
    overflow: hidden;
  }

  .d_d {
    width: 1870px;
    /*height: 720px;*/
    height: 690px;
    text-align: left;
    margin: 0px auto;
    overflow: hidden;
  }

  .d_d_a {
    width: 1870px;
    height: 45px;
    line-height: 45px;
    text-align: left;
    margin: 0px auto;
    overflow: hidden;
  }

  .d_d_a ul {
    width: 1210px;
    height: 45px;
    line-height: 45px;
    text-align: left;
    margin: 0px 330px;
    overflow: hidden;
  }

  .d_d_a ul li {
    width: auto;
    height: 45px;
    line-height: 45px;
    text-align: left;
    margin: 0px 5px;
    float: left;
    display: inline;
    overflow: hidden;
    font-size: 24px;
    cursor: pointer;
    /* color: #ffffff;*/
  }

  .d_d_a ul li:nth-child(1) {
    font-size: 24px;
    /*color: #ffab27;*/
  }

  .d_d_b {
    width: 1540px;
    height: 630px;
    text-align: left;
    margin: 0px auto;
    overflow: hidden;
  }

  .d_d_b_a {
    width: 1200px;
    height: 630px;
    text-align: left;
    margin: 0px 20px 0px 0px;
    float: left;
    display: inline;
    overflow: hidden;
  }

  .d_d_b_b {
    width: 320px;
    height: 100px;
    text-align: left;
    margin: 540px 0px 0px 0px;
    float: left;
    display: inline;
    overflow: hidden;
  }
  .el-input__inner{
    background-color: transparent;
    color: #ffffff;
  }

  .d_d_b_b_a {
    /* width: 230px;*/
    height: 38px;
    line-height: 38px;
    text-align: left;
    margin: 0px auto;
    /* padding-left: 90px;*/
    overflow: hidden;
    font-size: 21px;
    color: #0077ed;
  }

  .d_d_b_b_b {
    width: 320px;
    height: 25px;
    text-align: left;
    margin: 0px auto;
    overflow: hidden;
  }

  .d_d_b_b_b img:nth-child(2) {
    position: absolute;
  }

  .d_d_b_b_c {
    width: 320px;
    height: 37px;
    line-height: 37px;
    text-align: left;
    margin: 0px auto;
    overflow: hidden;
    font-size: 17px;
    color: #ffffff;
  }

  .d_d_b_b_c ul {
    width: 320px;
    height: 37px;
    line-height: 37px;
    text-align: left;
    margin: 0px auto;
    overflow: hidden;
  }

  .d_d_b_b_c ul li {
    width: 78px;
    height: 37px;
    line-height: 37px;
    text-align: center;
    margin: 0px auto;
    float: left;
    display: inline;
    overflow: hidden;
    cursor: pointer;
  }

  .trend_click {
    color: #ffab27;
  }

  .trend_noclick {
    color: #e1eaff;
  }

  .trend {
    color: #00d8ff;
  }

  .el-picker-panel {
    background: rgb(4, 23, 56) !important;
  }

  .el-date-editor--daterange.el-input__inner {
    width: auto;
    background-color: #05294c;
  }

  .c_b_a_a_b table input {
    background-color: transparent;
  }

  .el-input__inner {
    border: #6370e2 solid 1px;
  }

  .el-picker-panel, .el-date-table th, .el-date-range-picker__content.is-left {
    border-color: #6370e2;
  }

  .el-date-editor .el-range-input {
    color: white;
  }

  .el-date-editor .el-range__close-icon {
    display: none;
  }

  .el-date-editor .el-range-separator {
    color: white;
  }
</style>
//transparent
