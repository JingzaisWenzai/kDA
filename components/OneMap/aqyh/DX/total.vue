<template>
  <div class="total">
    <p class="main">隐患态势</p>
    <div>
      <p class="tit">监测对象统计<i></i></p>
      <!--<div class="title"><span>消防评分建筑总数</span><span>{{total}}</span></div>-->
      <div class="detail" id="threeSmallPlaces_detail_16"></div>
    </div>
    <div>
      <p class="tit">全区隐患分布<i></i></p>
      <div class="detail" id="threeSmallPlaces_detail_17"></div>
    </div>
    <div>
      <div style="width: 48%;display: inline-block;">
        <p style="cursor: pointer;" class="tit" @click="showTableList">未处理隐患情况<a style="font-size: 22px;color: #e6b600;margin-left: 20px;">{{warnTotal}}</a></p>
        <div class="detail myChart_18" id="threeSmallPlaces_detail_18"></div>
      </div>
      <div style="width: 48%;display: inline-block;position: absolute;">
        <p style="cursor: pointer;" class="tit" @click="showYuJingTable">未处理预警情况<a style="font-size: 22px;color: #e6b600;margin-left: 20px;">{{warnTotal2}}</a></p>
        <div class="detail myChart_18" id="threeSmallPlaces_detail_19"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import {showPieCharts,showLineCharts} from "../../../../static/js/OneMap/DX/DX_Chart";
  import {allrigionhiddendangerchart_pie,allrigionhiddendangerchart_bar} from "../../../../api/secapi";
  import baseUrl from '../../../../static/js/baseUrl'
  import bus from '../../../../assets/js/main'
  export default {
    name: "total",
    data(){
      return {
        total:'--',
        myPie:{},
        myLine:{},
        warn:[
          baseUrl+'/hiddendanger/BLK_SANXIAO_PLACE@60021/IconType/selectByExample?street=&alarm=1&t=1547726442894',
          // baseUrl+'/hiddendanger/IOT_DEVICE@0021/iot/IconType/selectByExample?street=&alarm=1&t=1547726442901',
          // baseUrl+'/hiddendanger/IOT_DEVICE@0003/iot/IconType/selectByExample?street=&alarm=1&t=1547726442897',
          // baseUrl+'/hiddendanger/IOT_DEVICE@0024/iot/IconType/selectByExample?street=&alarm=1&t=1547726442900',
          baseUrl+'/hiddendanger/BLK_SANXIAO_PLACE@60023/IconType/selectByExample?street=&alarm=1&t=1547726442896',
          baseUrl+'/hiddendanger/BLK_SANXIAO_PLACE@60022/IconType/selectByExample?street=&alarm=1&t=1547726442890'
          // baseUrl+'/hiddendanger/IOT_DEVICE@0025/iot/IconType/selectByExample?street=&alarm=1&t=1547726442905',
          // baseUrl+'/hiddendanger/IOT_DEVICE@0026/iot/IconType/selectByExample?street=&alarm=1&t=1547726442907',
          // baseUrl+'/hiddendanger/IOT_DEVICE@0023/iot/IconType/selectByExample?street=&alarm=1&t=1547726442903'
        ],
        yujing:[
          baseUrl+'/alarmcenter/002001/selectByExample?street=',
          baseUrl+'/alarmcenter/002002/selectByExample?street=',
          baseUrl+'/alarmcenter/003001/selectByExample?street=',
          baseUrl+'/alarmcenter/003002/selectByExample?street=',
          baseUrl+'/alarmcenter/003003/selectByExample?street=',
          baseUrl+'/alarmcenter/004001/selectByExample?street=',
          baseUrl+'/alarmcenter/004002/selectByExample?street=',
          baseUrl+'/alarmcenter/004003/selectByExample?street=',
          baseUrl+'/alarmcenter/004004/selectByExample?street=',
          baseUrl+'/alarmcenter/004005/selectByExample?street=',
          baseUrl+'/alarmcenter/011001/selectByExample?street='
        ],
        warnTotal:0,
        warnChartData:null,
        warnTotal2:0,
        warnChartData2:null
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
          data:data.data.data,
          roseType : false
        }]
        showPieCharts(temp)

      })

      this.getLine()
      setTimeout(function() {
        $this.getAllWarnData()
        setTimeout(function() {
          $this.getAllYuJingData()
        },5000)
      },5000)
    },
    methods:{
      showYuJingTable(){
        document.getElementsByClassName('bar_content')[0].click()
      },
      showTableList(){
        bus.$emit('showWarnTable',true)
      },
      getLine(){
        let $this = this
        allrigionhiddendangerchart_bar().then(function (data) {
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
          temp.xAxis = { axisLabel: { interval: 'auto', rotate: '45' }}
          for(let i = 0,j = temp.data.length;i<j;i+=1){
            temp.data[i].stack =  '总数'
            temp.data[i].type =  'bar'
          }
          data.data.reverse()
          showLineCharts(temp)
        })
      },
      getAllYuJingData(){
        this.warnChartData2 = {}
        this.$set(this.warnChartData2,'name','未处理预警情况')
        this.$set(this.warnChartData2,'data',[])
        // this.warnChartData.name = '未处理隐患情况'
        // this.warnChartData.data = []
        let $this = this
        let tempArray = []
        for(let i = 0,j = this.yujing.length;i<j;i+=1){
          this.$myAxios.myGet(this.yujing[i]).then(function(data) {
            $this.warnTotal2 += data.length
            if(data.length>0){
              let node = document.getElementById("iframeGisMap").contentWindow.module.common.layerControl.mapLayerXml.getLayerNodeById(data[0].layerid)
              // $this.warnChartData.data.push({name:node.label,value:data.length})
              $this.warnChartData2.data[$this.warnChartData2.data.length] = {name:node.label,value:data.length}

              let id = uuidv4(),temp = {}
              temp.id = id
              // $this.warnChartData2.roseType = 'area'
              $this.warnChartData2.roseType = false
              temp.data = [$this.warnChartData2]
              document.getElementsByClassName('myChart_18')[1].setAttribute('id',id)
              showPieCharts(temp)
              tempArray.push({name:node.label,img:node.icon})
              // bus.$emit('showlegend',tempArray)
              bus.$emit('showlegend',{name:'预警',img:''})
              bus.$emit('showlegend',{name:node.label,img:node.icon})
            }
          })
        }
      },
      getAllWarnData(){
        this.warnChartData = {}
        this.$set(this.warnChartData,'name','未处理隐患情况')
        this.$set(this.warnChartData,'data',[])
        // this.warnChartData.name = '未处理隐患情况'
        // this.warnChartData.data = []
        let $this = this
        let tempArray = []
        for(let i = 0,j = this.warn.length;i<j;i+=1){
          this.$myAxios.myGet(this.warn[i]).then(function(data) {
            $this.warnTotal += data.length
            if(data.length>0){
              let node = document.getElementById("iframeGisMap").contentWindow.module.common.layerControl.mapLayerXml.getLayerNodeById(data[0].layerid)
              // $this.warnChartData.data.push({name:node.label,value:data.length})
              $this.warnChartData.data[$this.warnChartData.data.length] = {name:node.label,value:data.length}

              let id = uuidv4(),temp = {}
              temp.id = id
              // $this.warnChartData.roseType = 'area'
              $this.warnChartData.roseType = false
              temp.data = [$this.warnChartData]
              document.getElementsByClassName('myChart_18')[0].setAttribute('id',id)
              showPieCharts(temp)
              tempArray.push({name:node.label,img:node.iconArray.split(',')[data[0].iconType]})
              // bus.$emit('showlegend',tempArray)
              bus.$emit('showlegend',{name:'隐患',img:''})
              bus.$emit('showlegend',{name:node.label,img:node.iconArray.split(',')[data[0].iconType]})
            }
          })
        }
      }
    },
    watch:{
      warnChartData: {
        handler: function (val, oldVal) {
          // console.log(val)
          // let id = uuidv4(),temp = {}
          // temp.id = id
          // temp.data = [this.warnChartData]
          // document.getElementsByClassName('myChart_18')[0].setAttribute('id',id)
          // showLineCharts(temp)
        },
        deep: true
      }
    },
    beforeDestroy(){

    }
  }
</script>

<style lang="scss" scoped>
  .total {
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
