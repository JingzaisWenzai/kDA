<template>
  <div :class="barBottom?'barBottom':'barBottomHide'">
    <dataPicker v-model="time" format="W  YYYY-MM-DD" :local="local" v-on:childByValue="childByValue"
                style="display: none;"/>
    <div>
      <img src="../../static/img/yjzx/yjzx_20.png" @click="startPlay(0)" style="height: 38px;padding-bottom: 5px;"/>
      <div class="bottomProgress">
        <!--<img src="../../static/img/timeline/left.png"/>-->
        <img src="../../static/img/yjzx/yjzx_21.png" @click="startPlay(-1)"/>
        <ul>
          <li v-for="(item,index) in timeObj.data" @click="timeSelect(index,$event)" v-bind:key="index">
            <div class="progressDiv"></div>
            <div class="progressTitle">{{item.substr(5,9)}}</div>
          </li>
        </ul>
        <!--<img src="../../static/img/timeline/right.png"/>-->
        <img src="../../static/img/yjzx/yjzx_22.png" @click="startPlay(1)"/>
      </div>
      <a class="showTimeLine" @click="showTimeLineAction"></a>
    </div>
  </div>
</template>
<script>
  import bus from '../../assets/js/main.js'
  import dataPicker from '../../components/yjzx/Common/VueDatepickerLocal.vue'

  export default {
    name: 'App',
    data() {
      const min = new Date()
      const max = new Date(2050, 8, 30, 0, 0, 0)
      const now = new Date()
      return {
        selectDate: '',
        posdata: 555,
        flag: true,
        t: '', //定时器变量
        now: now,
        time: min,
        min: min,
        max: max,
        timeRange: [min, max],
        local: {
          dow: 7, // Sunday is the first day of the week
          hourTip: 'Select Hour', // tip of select hour
          minuteTip: 'Select Minute', // tip of select minute
          secondTip: 'Select Second', // tip of select second
          yearSuffix: '', // suffix of head
          monthsHead: 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'), // months of head
          months: 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'), // months of panel
          weeks: 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'), // weeks,
          cancelTip: 'Cancel', // text for cancel button for daterange picker
          submitTip: 'Submit' // text for submit button for daterange picker
        },
        timeSelectIndex: 0,
        timeObj: {
          startTime: '',
          endTime: '',
          data: []
        },
        mapCode: '',
        timeInv: -1,
        mapData: [],
        layerId: '',
        warnCode: '',
        layerArray: [],
        barBottom: false
      }
    },
    mounted() {
      // monographicLayer.getData();
      let $this = this
      let timeTemp = (new Date()).getTime()
      for (let i = 0, j = 30; i < j; i += 1) {
        var temp = (new Date(timeTemp - i * 24 * 60 * 60 * 1000)).getTime()
        // if(temp === 1){
        //   this.timeObj.data.push((new Date(timeTemp-i*24*60*60*1000)).getMonth()+1+'-'+temp)
        // }else {
        //   this.timeObj.data.push(temp)
        // }
        this.timeObj.data.push((new Date(temp).getFullYear()) + '-' + (new Date(temp).getMonth() > 8 ? (new Date(temp).getMonth() + 1) : ('0' + (new Date(temp).getMonth() + 1))) + '-' + (new Date(temp).getDate() > 9 ? (new Date(temp).getDate()) : ('0' + (new Date(temp).getDate()))))
        if (i === 0) {
          this.timeObj.endTime = (new Date(temp).getFullYear()) + '-' + (new Date(temp).getMonth() > 8 ? (new Date(temp).getMonth() + 1) : ('0' + (new Date(temp).getMonth() + 1))) + '-' + (new Date(temp).getDate() > 9 ? (new Date(temp).getDate()) : ('0' + (new Date(temp).getDate())))
        } else if (i === 29) {
          this.timeObj.startTime = (new Date(temp).getFullYear()) + '-' + (new Date(temp).getMonth() > 8 ? (new Date(temp).getMonth() + 1) : ('0' + (new Date(temp).getMonth() + 1))) + '-' + (new Date(temp).getDate() > 9 ? (new Date(temp).getDate()) : ('0' + (new Date(temp).getDate())))
        }
      }
      console.log(this.timeObj)
      this.timeObj.data.reverse()
      console.log(this.timeObj)
      bus.$on('getMapData', this.getMapData)

      // bus.$on('showTimeLine',function (show) {
      //   $this.showTimeLine = show
      // })
    },
    beforeDestroy() {
      bus.$off('getMapData')
    },
    methods: {
      showTimeLineAction(){
        this.barBottom = !this.barBottom
      },
      childByValue: function(childValue) {   //时间轴数据初始化
        // childValue就是子组件传过来的值
        console.log(childValue.split(' ')[2])
        this.selectDate = childValue.split(' ')[2]
        /*  this.src = this.srcData[0];*/
        this.posdata = 555
        // this.createData((this.posdata-555)/50);
        this.posdata = 555 + 79 * new Date().getHours()
        /* this.t = setInterval(this.timer,1000);*/
        bus.$emit('curTime', this.selectDate, new Date().getHours())
      },
      timer() {

        if (this.posdata >= 1249) {
          this.posdata += 80
        } else {
          this.posdata += 78
        }
        if (this.posdata >= 2430) {
          this.posdata = 555
        }

        // this.createData((this.posdata-555)/78);
        this.createData(Math.round((this.posdata - 555) / 78))
        // console.log(this.posdata)
      },
      createData(hour) {
        console.log('shuju' + hour)

        bus.$emit('curTime', this.selectDate, hour)
      },
      animation: function(value) {   //时间轴控制
        /* console.log(value);*/
        if (value == -2) {//左移动1
          if (this.posdata <= 585) return false
          if (this.posdata >= 1249) {
            this.posdata -= 79
            // this.createData((this.posdata-555)/80);
            this.createData(Math.round((this.posdata - 555) / 80))
          } else {
            this.posdata -= 78
            this.createData(Math.round((this.posdata - 555) / 78))
          }

        } else if (value == -1) {//右移动1
          if (this.posdata >= 2360) return false
          if (this.posdata >= 1249) {
            this.posdata += 79
            this.createData(Math.round((this.posdata - 555) / 80))
          } else {
            this.posdata += 78
            this.createData(Math.round((this.posdata - 555) / 78))
          }
          // this.createData((this.posdata-555)/78);
        } else if (value == -3) {
          //停止
          if (this.flag) {
            this.flag = false
            clearInterval(this.t)
          } else {
            this.flag = true
            this.t = setInterval(this.timer, 1000)
          }
        }
        else if (value == -4) {
          //当前
          this.posdata = 555 + 79 * new Date().getHours()
          this.createData(new Date().getHours())
          clearInterval(this.t)
        } else {

          if (this.posdata >= 1249) {
            this.posdata = 550 + 79 * value
          } else {
            this.posdata = 555 + 78 * value
          }
          this.createData(value)
        }
      },

      timeSelect(index, event) {//#ffab27
        console.log(event.currentTarget)
        this.timeSelectIndex = index
        // clearInterval(this.timeInv)
        for (let i = 0, j = event.currentTarget.parentElement.children.length; i < j; i += 1) {
          event.currentTarget.parentElement.children[i].children[0].style.background = ''
          event.currentTarget.parentElement.children[i].children[0].style.borderRightColor = 'rgb(90,166,242)'
          event.currentTarget.parentElement.children[i].children[0].style.borderBottomColor = 'rgb(90,166,242)'
          event.currentTarget.parentElement.children[i].children[1].style.color = ''
        }
        event.currentTarget.children[0].style.background = '#ffab27'
        event.currentTarget.children[0].style.borderRightColor = '#ffab27'
        event.currentTarget.children[0].style.borderBottomColor = '#ffab27'
        event.currentTarget.children[1].style.color = '#ffab27'

        let data = this.mapData[index]
        for (let i in data) {
          data = data[i]
        }
        // document.getElementById("iframeGisMap").contentWindow.module.layerQuery.featureNearbyQuery.clearResultGrapicLayer();
        // for(let i = 0,j = data.length;i<j;i+=1){
        //   let node = document.getElementById("iframeGisMap").contentWindow.module.common.layerControl.mapLayerXml.getLayerNodeById(data[i].layerid);
        //   let pointJsonFeature = document.getElementById("iframeGisMap").contentWindow.module.layerControl.common.convert.pointJsonToFeatureLayerJson(data[i].data, "jd", "wd");
        //   document.getElementById("iframeGisMap").contentWindow.module.layerQuery.featureNearbyQuery.loadPointJsonResultGrapicLayer(pointJsonFeature.graphics, node);//我们自己数据
        // }

        //传参落图
        // let tempLength = this.layerArray.length
        // if(tempLength !== 1){
        //   for(let i = 0,j = this.layerArray[tempLength-2].length;i<j;i+=1){
        //     document.getElementById("iframeGisMap").contentWindow.module.common.layerControl.mapLayerOperate.removeSingleLayerById(this.layerArray[tempLength-2][i].id);
        //   }
        // }else {
        //   for(let i = 0,j = this.layerArray[tempLength-1].length;i<j;i+=1){
        //     document.getElementById("iframeGisMap").contentWindow.module.common.layerControl.mapLayerOperate.removeSingleLayerById(this.layerArray[tempLength-1][i].id);
        //   }
        // }
        for (let i = 0, j = this.layerId.length; i < j; i += 1) {
          document.getElementById('iframeGisMap').contentWindow.module.common.layerControl.mapLayerOperate.removeSingleLayerById(this.layerId[i].id)
          var node = document.getElementById('iframeGisMap').contentWindow.module.common.layerControl.mapLayerXml.getLayerNodeById(this.layerId[i].id)
          node.query = 'date=' + this.timeObj.data[index]
          document.getElementById('iframeGisMap').contentWindow.module.common.layerControl.mapLayerOperate.loadSingleLayerByNode(node)
        }

      },

      disabledDate(time) {
        return time < this.min || time > this.max
      }, /*,
      selectedDate (date) {
        console.log('You have been selected:')
        console.log(date)
      },
      clear () {
        console.log('clear')
      },
      cancel () {
        console.log('cancel')
      },
      change (val) {
        console.log(val)
      }*/

      getMapData(code, layerId) {
        console.log(code, layerId)
        let node = document.getElementById('iframeGisMap').contentWindow.module.common.layerControl.mapLayerXml.getLayerNodeById(layerId)

        let temp = []
        for (let i = 0, j = node.nodes.length; i < j; i += 1) {
          temp.push(node.nodes[i])
        }

        let $this = this
        this.layerId = temp
        this.warnCode = code
        this.layerArray.push(temp)
        clearInterval($this.timeInv)
        // today_alram_loadMap(code,{startTime:this.timeObj.startTime,endTime:this.timeObj.endTime}).then(function (data) {
        //   console.log(data)
        //   $this.mapData = data.reverse()
        //
        //   setTimeout(function () {
        //     document.getElementsByClassName('bottomProgress')[0].children[1].children[document.getElementsByClassName('bottomProgress')[0].children[1].children.length-1].click()
        //   },5000)
        // })
        setTimeout(function() {
          document.getElementsByClassName('bottomProgress')[0].children[1].children[document.getElementsByClassName('bottomProgress')[0].children[1].children.length - 1].click()
        }, 2000)
      },
      startPlay(type) {
        if (type === 0) {
          clearInterval(this.timeInv)
          return
        }
        this.changeIndex(type)
        let $this = this
        document.getElementsByClassName('bottomProgress')[0].children[1].children[this.timeSelectIndex].click()
        if ($this.timeInv !== -1) {
          clearInterval($this.timeInv)
        }
        $this.timeInv = setInterval(function() {
          $this.changeIndex(type)
          document.getElementsByClassName('bottomProgress')[0].children[1].children[$this.timeSelectIndex].click()
        }, 1000)
      },
      changeIndex(type) {
        if (type === 1) {
          this.timeSelectIndex += 1
          if (this.timeSelectIndex >= this.timeObj.data.length) {
            this.timeSelectIndex = 0
          }
        } else {
          this.timeSelectIndex -= 1
          if (this.timeSelectIndex === -1) {
            this.timeSelectIndex = this.timeObj.data.length - 1
          }
        }
      }
    },
    components: {
      dataPicker
    }
  }
</script>

<style scoped>
  /* ---------------------------底部---------------------------------------------------------------------------------------------------*/
  .e {
    width: 2500px;
    height: 150px;
    text-align: left;
    margin: 0px auto;
    overflow: hidden;
    position: absolute; /*bottom:30px; right:350px;*/
    z-index: 1;
  }

  .e_a {
    width: 267px;
    height: 50px;
    line-height: 50px;
    text-align: left;
    margin: 0px 1096px 10px 1404px;
    padding: 0px 20px;
    overflow: hidden;
    background: url(../../static/img/yjzx/yjzx_30.png) no-repeat;
    font-size: 24px;
    color: #b6ccff;
  }

  .e_a img {
    width: 32px;
    height: 32px;
    margin-right: 10px;
    vertical-align: -7px;
  }

  .e_b {
    width: 2500px;
    height: 90px;
    text-align: left;
    margin: 0px 40px; /*margin: 0px auto ;*/
    overflow: hidden;
  }

  .e_b_a {
    width: 307px;
    height: 90px;
    text-align: left;
    margin: 0px 33px 0px 0px;
    float: left;
    display: inline;
    overflow: hidden;
  }

  /*
    .e_b_a_a{width:307px; height:50px; line-height: 50px; padding: 0px 20px; text-align: left; margin: 0px auto; overflow: hidden; background: url(../../static/img/yjzx/yjzx_30.png) no-repeat; font-size: 24px; color: #b6ccff;}
  */
  .e_b_a_a {
    width: 267px;
    height: 28px;
    line-height: 50px;
    padding: 0px 20px;
    text-align: left;
    margin: 0px auto;
    overflow: hidden;
    font-size: 24px;
    color: #b6ccff;
  }

  .e_b_a_a img {
    width: 30px;
    height: 30px;
    margin-right: 10px;
    vertical-align: -5px;
  }

  .e_b_a_b {
    width: 307px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    margin: 0px auto auto -50px;
    overflow: hidden;
  }

  .e_b_a_b a {
    width: 307px;
    height: 40px;
    line-height: 40px;
    text-decoration: none;
    display: block;
    font-size: 20px;
    color: #b6ccff;
  }

  .e_b_b {
    width: 2160px;
    height: 90px;
    text-align: left;
    margin: 0px auto;
    float: left;
    display: inline;
    overflow: hidden;
  }

  .e_b_b_a {
    width: 58px;
    height: 58px;
    text-align: left;
    margin: 0px auto;
    float: left;
    display: inline;
    overflow: hidden;
  }

  .e_b_b_a img {
    width: 58px;
    height: 58px;
  }

  .e_b_b_b {
    width: 58px;
    height: 58px;
    text-align: left;
    margin: 0px 30px;
    float: left;
    display: inline;
    overflow: hidden;
  }

  .e_b_b_b img {
    width: 58px;
    height: 58px;
  }

  .e_b_b_c {
    width: 1896px;
    height: 90px;
    text-align: left;
    margin: 0px 30px 0px 0px;
    float: left;
    display: inline;
    overflow: hidden;
  }

  .e_b_b_c_a {
    width: 1896px;
    height: 24px;
    text-align: left;
    margin: 17px auto;
    overflow: hidden;
  }

  .e_b_b_c_a img:nth-child(2) {
    position: absolute;
  }

  .e_b_b_c_b {
    width: 1896px;
    height: 32px;
    line-height: 32px;
    text-align: left;
    margin: 0px auto;
    overflow: hidden;
  }

  .e_b_b_c_b ul {
    width: 1896px;
    height: 32px;
    line-height: 32px;
    text-align: left;
    margin: 0px auto;
    overflow: hidden;
  }

  .e_b_b_c_b ul li {
    width: 59px;
    height: 32px;
    line-height: 32px;
    text-align: left;
    margin: 0px 10px;
    float: left;
    display: inline;
    overflow: hidden;
    font-size: 20px;
    color: #43d3ff;
  }

  .e_b_b_d {
    width: 58px;
    height: 58px;
    text-align: left;
    margin: 0px auto;
    float: left;
    display: inline;
    overflow: hidden;
  }

  .e_b_b_d img {
    width: 58px;
    hseight: 58px;
  }

  .barBottom {
    position: relative;
    text-align: center;
    bottom: 150px;
    /*width: 1350px;*/
    margin: auto !important;
    z-index: 2001;
  }

  .barBottomHide {
    position: relative;
    text-align: center;
    bottom: 16px;
    margin: auto !important;
    z-index: 2001;
  }

  .e {
    position: relative;
  }

  .bottomProgress {
    padding: 17px 10px 0 10px;
    display: inline-block;
    position: relative;
    height: 63px; /*bottom: 120px;left: -780px;*/
    background-image: url("../../static/img/yjzx/yjzx_27.png")
  }

  .bottomProgress ul {
    display: inline-block;
  }

  .bottomProgress ul li {
    cursor: pointer;
    margin-right: 0px;
  }

  .bottomProgress img {
    cursor: pointer;
    display: inline-block;
    position: relative;
    top: -5px;
    height: 38px;
  }

  /*.bottomProgress img{display: inline-block;position: relative;top: -15px;}*/
  .bottomProgress .progressDiv {
    height: 8px;
    width: 40px;
    border-right: 1px solid rgb(90, 166, 242);
    border-bottom: 3px solid rgb(90, 166, 242);
    /*background:url('../../static/img/timeline/block.png') no-repeat 4px 5px;*/
  }

  .bottomProgress .progressTitle {
    color: rgb(90, 166, 242);
  }

  .barBottom img {
    cursor: pointer;
  }

  .showTimeLine {
    display: block;
    width: 86px;
    height: 12px;
    background: url(../../static/img/common/Bottom/collapse.png);
    margin: 0 auto;
    position: relative;
    top: -63px;
    cursor: pointer;
  }
</style>
