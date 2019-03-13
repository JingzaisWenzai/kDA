<template>
  <div class="dot_detail">
    <div class="tit"><span>{{obj.name}}</span> <i class="close" @click="toClose"></i></div>
    <div class="nav">
      <span :class="tpl ==='details'? 'active':''" @click="changeTo('details')">{{navTit.tit0}}</span>
      <span>|</span>
      <span :class="tpl ==='history'? 'active':''" @click="changeTo('history')">{{navTit.tit1}}</span>
    </div>
    <div class="cnt detail" v-if="tpl === 'details' && obj.tpl ==='air'"> <!--空气-->
      <div class="box">
        <div class="left">
          <div class="time"><p><span>{{currentDateTime}}</span></p>
            <p v-for="(value,key,index) in obj.times" v-show="value!==''"><span>{{key}}</span><span>为</span><span>{{value}}</span>
            </p></div>
        </div>
      </div>
      <!--   <div class="key" v-if="obj.detail!==[]">
           <p class="tit">{{navTit.tit2}}</p>
           <div>
             <p v-for="(item,index) in obj.detail"><span>{{item.name}}</span><span>:</span><span>{{item.value}}</span></p>
           </div>
         </div>-->
      <div class="whole" v-if="obj.attr!==[]">
        <p class="tit">{{navTit.tit4}} :</p>
        <toy-bricks :the-obj='obj.attr'></toy-bricks>
      </div>
    </div>
    <div class="cnt detail" v-if="tpl === 'details' && obj.tpl ==='water'">     <!--水质-->
      <div class="box">
        <div class="left">
          <div class="time"><p><span>{{currentDateTime}}</span></p></div>
          <div class="attr">
            <p class="tit">{{navTit.tit2}} :</p>
            <p v-for="(item , index) in obj.detail" :key="index"><span>{{item.name}}</span><span>:</span><span>{{item.value}}</span>
            </p>
          </div>
        </div>
        <!--        <div class="right" v-if="obj.url"><img :src ='obj.url' /></div>-->
      </div>
      <div class="whole" v-if="obj.attr!==[]">
        <p class="tit">{{navTit.tit3}} :</p>
        <toy-bricks :the-obj='obj.attr'></toy-bricks>
      </div>
    </div>
    <div class="cnt detail" v-if="tpl === 'details' && obj.tpl ==='pollution'">     <!--水质-->
      <div class="box">
        <div class="left">
          <div class="time"><p><span>{{currentDateTime}}</span></p></div>
          <div class="attr">
            <p class="tit">{{navTit.tit2}} :</p>
            <p v-for="(item , index) in obj.detail" :key="index"><span>{{item.name}}</span><span>:</span><span>{{item.value}}</span>
            </p>
          </div>
        </div>
        <!--        <div class="right" v-if="obj.url"><img :src ='obj.url' /></div>-->
      </div>
      <div class="whole" v-if="obj.attr!==[]">
        <p class="tit">{{navTit.tit3}} :</p>
        <toy-bricks :the-obj='obj.attr'></toy-bricks>
      </div>
    </div>

    <div class="cnt history" v-else-if="tpl ==='history'">
      <div class="type_select_bar">
        <p><span>类别</span><span>:</span><span class="the-type-select"><type-select
          @typeSelect="toGetType"></type-select></span></p>
        <p><span>时间</span><span>:</span><span class="the-time-select"><time-select
          @timeSelect="toGetTime"></time-select></span></p>
      </div>
      <div class="show_form_select">
        <span :class="sub_type==='chart'?'active':''" @click="subChangeTo('chart')">图表</span><span>|</span><span
        :class="sub_type==='table'?'active':''" @click="subChangeTo('table')">列表</span>
      </div>
      <div class="show_box" v-if="sub_type==='chart'">
        <history-chart></history-chart>
      </div>
      <div class="show_box" v-else>
        <common-table :the-obj='theTable'></common-table>
      </div>
    </div>
  </div>
</template>
<script>
  import TwoTable from './PopCom/TwoTable.vue'
  import ToyBricks from './PopCom/ToyBricks.vue'
  import TypeSelect from './PopCom/TypeSelect.vue'
  import TimeSelect from './PopCom/TimeSelect.vue'
  import HistoryChart from './PopCom/HistoryChart.vue'
  import CommonTable from './PopCom/CommonTable.vue'

  import {
    getAirDetail, getAirHistoryList, getAirHistoryChart, getWaterDetail, getWaterHistoryList, getWaterHistoryChart,
    getPollutionDetail, getPollutionHistoryList, getPollutionHistoryChart
  } from '../../../api/ecoapi'
  import { DateFormat } from '../../../utils/validate'

  export default {
    data() {
      return {
        tpl: 'details', /*当前详情和历史查询切换*/
        sub_type: 'chart', /*图表和列表的切换*/
        otoy: '', /*传递数据给 ToyBricks.vue*/
        navTit: {
          tit0: '当前详情',
          tit1: '历史查询',
          tit2: '关键指标',
          tit3: '全部指标数值',
          tit4: '各指标数值'
        },
        obj: {
          tpl: '',
          name: '',
          times: {},
          detail: [],
          attr: []
        },
        otype: '小时数据',
        // otime:['2018-10-04 13:19:00','2018-11-09 13:19:00'],
        otime: (function() {
          let time = new Date().getTime()
          let temp = time - 30 * 24 * 3600 * 1000
          console.log()
          return [DateFormat(temp, 'yyyy-MM-dd hh:mm:ss'), DateFormat(time, 'yyyy-MM-dd hh:mm:ss')]
        })(),
        theChart: [],
        theTable: [],
        currentDateTime: ''
      }
    },
    methods: {
      changeTo: function(attr) {
        if (attr) {
          this.tpl = attr
          let dot = this.$store.state.eco.dotType
          let otime = [].concat(this.otime)
          let otype = this.otype
          if (dot !== '') {
            this.toGetData(dot, this.tpl, otime, otype)
          }
        }
      },
      subChangeTo: function(attr) {
        if (attr) {
          this.sub_type = attr
          let dot = this.$store.state.eco.dotType
          let otime = [].concat(this.otime)
          let otype = this.otype
          if (dot !== '') {
            this.toGetData(dot, this.tpl, otime, otype)
          }
        }
      },
      getTheData: function(n, arr) {
        let oarr = []
        for (let i = 0; i < arr.length; i += n) {
          oarr.push(arr.slice(i, i + n))
        }
        return oarr
      },
      toClose: function() {
        let obarTit = ''
        /*$emit触发当前实例上的事件。附加参数都会传给监听器回调。*/
        this.$emit('dotBar', obarTit)
        /*将其关闭*/
      },
      async toGetData(dot, tpl, time, type) {
        let oid = this.$store.state.detailMessageId
        let oname = this.$store.state.detailMessageName
        let sub_tpl = this.sub_type
        this.obj.name = oname
        let detail, list, ochart
        let ourl, otimes, odetail, oattr, otype
        otype = type || this.otype
        otimes = [].concat(time) || [].concat(this.otime)
        console.log(otimes)
        /*此处根据传入的id,与接口进行对接，获取数据*/
        if (dot === 'air') {
          this.obj.tpl = 'air'
          if (tpl === 'details') {
            detail = await getAirDetail({ id: oid })
            if (detail.url) {
              this.obj.url = detail.url
            }
            this.currentDateTime = detail.time
            console.log('---', this.currentDateTime)
            for (let i = 0; i < detail.data.length; i++) {
              if (detail.data[i].name.indexOf('详情') !== -1) {
                this.obj.times = {}
                this.obj.times = detail.data[i].data
              }
              if (detail.data[i].name.indexOf('指标') !== -1) {
                this.obj.attr = []
                this.obj.attr = [].concat(detail.data[i].data)
              }
            }
          }
          if (tpl === 'history') {   //http://10.192.19.107:8081/rundisplay/water/quality/list/time?id=3702810000100006&startTime=2018-10-07%2013%3A19%3A00&endTime=2018-12-09%2013%3A19%3A00%20
            if (sub_tpl === 'chart') {
              ochart = await getAirHistoryChart({ id: oid, startTime: otimes[0], endTime: otimes[1] })
              this.$store.state.historyChart = ochart.data
            } else {//http://10.192.19.107:8081/rundisplay/water/quality/line/time?id=3702810000100006&startTime=2018-10-04%2013%3A19%3A00&endTime=2018-11-09%2013%3A19%3A00
              list = await getAirHistoryList({ id: oid, startTime: otimes[0], endTime: otimes[1] })
              this.theTable = list
            }
          }

        } else if (dot === 'water') {
          this.obj.tpl = 'water'
          if (tpl === 'details') {
            detail = await getWaterDetail({ id: oid })
            if (detail.url) {
              this.obj.url = detail.url
            }
            this.currentDateTime = detail.time
            console.log('---', this.currentDateTime)
            if (detail.attr !== []) {
              this.obj.detail = detail.attr
            }
            if (detail.data !== []) {
              this.obj.attr = [].concat(detail.data)
            }
          }
          if (tpl === 'history') {
            if (sub_tpl === 'chart') {
              ochart = await getWaterHistoryChart({ id: oid, startTime: otimes[0], endTime: otimes[1] })
              this.$store.state.historyChart = ochart.data
            } else {
              list = await getWaterHistoryList({ id: oid, startTime: otimes[0], endTime: otimes[1] })
              this.theTable = list
            }
          }
        } else if (dot === 'pollution') {
          this.obj.tpl = 'pollution'
          if (tpl === 'details') {
            detail = await getPollutionDetail({ id: oid })
            if (detail.url) {
              this.obj.url = detail.url
            }
            this.currentDateTime = detail.time
            console.log('---', this.currentDateTime)
            if (detail.attr !== []) {
              this.obj.detail = detail.attr
            }
            if (detail.data !== []) {
              this.obj.attr = [].concat(detail.data)
            }
          } else if (tpl === 'history') {
            if (sub_tpl === 'chart') {
              ochart = await getPollutionHistoryChart({ id: oid, startTime: otimes[0], endTime: otimes[1] })
              this.$store.state.historyChart = ochart.data
            } else {
              list = await getPollutionHistoryList({ id: oid, startTime: otimes[0], endTime: otimes[1] })
              this.theTable = list
            }
          }
        }


        /*
                     this.chart = this.$store.state.historyChart;
                     this.otable = this.$store.state.historyTable;


                     this.otoy = this.getTheData(8,this.obj.data);*/

        /*           await this.$store.dispatch('getBottomDotPopCurrent',this.dotType);
                     await this.$store.dispatch('getBottomDotPopHistory',this.dotType);
                     this.obj=[];
                     this.obj = this.toWriteObj(this.$store.state.bottomDotPop.current);    //快速转换当前详情部分的格式
                     this.otoy = this.getTheData(8,this.obj.data);                       //将页面传入全部指标部分
                     this.chart = this.$store.state.bottomDotPop.history.ochart;         //获取历史查询chart的数据
                     this.otable = this.$store.state.bottomDotPop.history.otable;         //获取table部分数据
        */
      },
      toWriteObj(arr) {
        let qobj = {}
        let pobj = arr
        for (let i = 0; i < pobj.length; i++) {
          if (pobj[i].name === 'name') {
            qobj.name = ''
            qobj.name = pobj[i].data
          } else if (pobj[i].name === 'attr') {
            qobj.attr = []
            qobj.attr = [].concat(pobj[i].data)
          } else if (pobj[i].name === 'key') {
            qobj.key = []
            qobj.key = [].concat(pobj[i].data)
          } else if (pobj[i].name === 'url') {
            qobj.url = ''
            qobj.url = pobj[i].data
          } else if (pobj[i].name === 'data') {
            qobj.data = []
            qobj.data = [].concat(pobj[i].data)
          } else {

          }
        }
        return qobj
      },
      toGetType: function(tp) {
        if (tp !== '') {
          this.otype = tp
          let dot = this.$store.state.eco.dotType
          let otime = [].concat(this.otime)
          if (dot !== '') {
            this.toGetData(dot, this.tpl, otime, tp)
          }
        }
      },
      toGetTime: function(tm) {
        if (tm.length !== 0) {
          //console.log(tm + ' 111111');
          this.otime = [].concat(tm)
          let dot = this.$store.state.eco.dotType
          let otype = this.otype
          if (dot !== '') {
            this.toGetData(dot, this.tpl, tm, otype)
          }
        }
      }
    },
    mounted() {
    },
    watch: {
      showenv: {
        handler: function(val, oldVal) {
          if (val === 'yes') {
            let dot = this.$store.state.eco.dotType
            let otime = [].concat(this.otime)
            let otype = this.otype
            if (dot !== '') {
              this.toGetData(dot, this.tpl, otime, otype)
            }
          }
        },
        deep: true
      },
      obj: {
        handler: function(val, oldVal) {

        },
        deep: true
      },
      theChart: {
        handler: function(val, oldVal) {
        },
        deep: true
      },
      theTable: {
        handler: function(val, oldVal) {
        },
        deep: true
      }
    },
    computed: {
      // otime: function() {
      //   let time
      //   let today = new Date()
      //   let hh = today.getHours()
      //   let mm = today.getMinutes()
      //   let ss = today.getSeconds()
      //   let day = today.getDay()
      //   /*返回几号*/
      //   let date = today.getDate()
      //   /*返回周几*/
      //   let year = today.getFullYear()
      //   let month = today.getMonth() + 1
      //   let hour, num
      //   if (hh > 12) {
      //     num = hh - 12
      //     hour = '下午' + num + '点'
      //   } else {
      //     num = hh
      //     hour = '上午' + num + ' 点'
      //   }
      //   time = year + '年' + month + '月' + day + '日' + '\n' + hour
      //   return time
      // },
      oweather: function() {
        let weather
        weather = '西南风2级        23℃       晴'
        return weather
      },
      showenv() {
        return this.$store.state.ShowEnv
      }
    },
    components: {
      TwoTable,
      ToyBricks,
      TypeSelect,
      TimeSelect,
      HistoryChart,
      CommonTable
    }
  }
</script>
<style scoped="scoped">
  /*导航栏的特殊样式*/
  ::-webkit-scrollbar {
    width: 16px !important;
    height: 16px !important;
  }

  ::-webkit-scrollbar-track,
  ::-webkit-scrollbar-thumb {
    border-radius: 999px !important;
    border: 4px solid transparent !important;
  }

  ::-webkit-scrollbar-track {
    box-shadow: 1px 1px 5px rgba(185, 165, 150, .2) inset !important;
  }

  ::-webkit-scrollbar-thumb {
    cursor: pointer;
    min-height: 20px !important;
    background-clip: content-box !important;
    box-shadow: 0 0 0 5px rgba(25, 109, 180, 0.5) inset !important;
  }

  ::-webkit-scrollbar-corner { /*background:transparent;*/
  }

  .dot_detail {
    width: 100%;
    height: 100%;
    border: 1px solid #00d8ff;
    -webkit-border-radius: 8px;
    -moz-border-radius: 8px;
    border-radius: 8px;
    background-color: rgba(6, 42, 66, 0.65);
  }

  .dot_detail .tit,
  .dot_detail .nav,
  .dot_detail .cnt {
    width: 95%;
    margin: 0 auto;
  }

  .dot_detail .tit {
    text-align: left;
    color: #00e4ff;
    font-size: 22px;
    margin-top: 10px;
    padding: 0;
    line-height: 40px;
  }

  .dot_detail .tit .close {
    width: 20px;
    height: 20px;
    background: url('../../../static/img/common/close.png') no-repeat center;
    background-size: contain;
    float: right;
    cursor: pointer;
  }

  .dot_detail .nav {
    color: #fff;
    font-size: 20px;
    line-height: 45px;
    padding: 0;
  }

  .dot_detail .nav span {
    display: inline-block;
    vertical-align: middle;
    width: auto;
  }

  .dot_detail .nav span:nth-child(2) {
    color: #3baaf0;
    margin: 0 20px;
  }

  .dot_detail .nav span.active {
    color: #fb9704;
  }

  /*当前详情*/
  .dot_detail .detail,
  .dot_detail .history {
    overflow-x: hidden;
    overflow-y: auto;
    height: 480px;
  }

  .dot_detail .detail .box,
  .dot_detail .detail .key,
  .dot_detail .detail .whole {
    width: 100%;
    clear: both;
  }

  .dot_detail .detail .box .left,
  .dot_detail .detail .box .right {
    display: inline-block;
    vertical-align: middle;
  }

  .dot_detail .detail .box .left {
    width: 100%;
  }

  .dot_detail .detail .box .right {
    width: 20%;
  }

  .dot_detail .detail .box .right img {
    display: block;
    margin: 0 auto;
    width: 80%;
    max-width: 100%;
    height: auto;
    min-height: 120px;
    max-height: 220px;
    border-color: transparent;
  }

  .detail .box .left .time,
  .detail .box .left .attr {
    width: 100%;
    clear: both;
  }

  .dot_detail .detail .box .left .time p,
  .dot_detail .detail .box .left .attr p {
    float: left;
    padding: 0 15px;
    margin: 0;
    width: auto;
    height: 45px;
  }

  .dot_detail .detail .box .left .time p {
    line-height: 45px;
    font-size: 18px;
    color: #fff;
  }

  .dot_detail .detail .box .left .attr .tit {
    color: #fff;
    display: block;
    float: none;
    font-size: 20px;
  }

  .dot_detail .detail .box .left .time p span:nth-child(2) {
    margin-right: 15px;
  }

  .dot_detail .detail .box .left .attr p span {
    display: inline-block;
    vertical-align: middle;
    width: auto;
    line-height: 45px;
    font-size: 18px;
    color: #fff;
  }

  .dot_detail .detail .box .left .attr p span:nth-child(2) {
    margin: 0 8px;
  }

  .dot_detail .detail .key .tit,
  .dot_detail .detail .whole .tit {
    width: 98%;
    margin: 20px auto 10px auto;
    color: #fff;
    font-size: 20px;
  }

  /*历史信息*/
  .dot_detail .history .type_select_bar,
  .dot_detail .history .show_form_select,
  .dot_detail .history .show_box {
    width: 100%;
    clear: both;
    text-align: left;
  }

  .type_select_bar p {
    display: block;
    float: left;
    margin: 0;
    padding: 0;
    height: 45px;
  }

  .type_select_bar p span {
    display: inline-block;
    vertical-align: middle;
    width: auto;
    color: #fff;
    font-size: 18px;
    padding: 0 6px;
  }

  .type_select_bar p span:nth-child(2) {
    padding: 0 10px 0 0;
  }

  .type_select_bar p .the-type-select {
    width: 140px;
    height: 30px;
  }

  .type_select_bar p .the-time-select {
    width: 340px;
    height: 30px;
  }

  .show_form_select span {
    display: inline-block;
    vertical-align: middle;
    width: auto;
    color: #fff;
    font-size: 18px;
    line-height: 40px;
    height: 40px;
  }

  .show_form_select span.active {
    color: #ff9700;
  }

  .show_form_select span:nth-child(2) {
    margin: 0 15px;
    color: #3baaf0;
  }

  .dot_detail .history .show_box {
    margin-top: 20px;
    height: 360px;
  }
</style>
