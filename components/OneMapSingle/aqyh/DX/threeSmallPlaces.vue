<template>
  <div class="threeSmallPlaces">
    <p class="main">三小场所</p>
    <div>
      <p class="tit">全区三小场所<i></i></p>
      <div class="title"><span>三小场所总数</span><span>{{total}}</span></div>
      <div class="detail special" style="width: 40%;" id="threeSmallPlaces_detail_1">
      </div>
      <div class="detail special" style="width: 58%;" id="threeSmallPlaces_detail_1_1">
      </div>
    </div>
    <div>
      <!--<p class="tit">三小场所隐患数量<i></i></p>-->
      <p class="tit">全区隐患分布<i></i></p>
      <div class="detail"  id="threeSmallPlaces_detail_2">

      </div>
    </div>
    <div>
      <p class="tit">历史隐患排名TOP5<i></i></p>
      <div class="detail  details3">
        <ul>
          <li v-for="(item,index) in levelData" :key="index">
            <div class="detail_level">{{index+1}}</div>
            <div class="detail_content">
              <div>
                <span class="detail_content_type">{{item.name}}</span>
                <span class="detail_content_checkout">已处理{{item.data[0]}}处</span>
              </div>
              <div></div>
              <div></div>
            </div>
            <div class="detail_msg">
              <span>总共{{item.data[1]}}处</span>
            </div>
          </li>
        </ul>
      </div>
    </div>

  </div>
</template>

<script>

  import {showPieCharts,showLineCharts} from "../../../../static/js/OneMap/DX/DX_Chart";
  import {threesmallchart_pie,threesmallchart_line,threesmallchart_streetBar,threesmallchart_bar} from "../../../../api/secapi";

  export default {
    name: "threeSmallPlaces",
    data(){
      return {
        color:[
          ['rgb(163,231,3)','rgb(49,83,23)'],
          ['rgb(20,194,81)','rgb(7,73,46)'],
          ['rgb(0,228,255)','rgb(2,84,99)'],
          ['rgb(1,137,255)','rgb(0,59,102)'],
          ['rgb(95,5,215)','rgb(29,16,88)']
        ],
        levelData:[
          {
            name:'经营场所内（含阁楼）住人',
            data:[20,50]
          },
          {
            name:'灭火器失效',
            data:[3,30]
          },
          {
            name:'未安装独立烟感报警器',
            data:[66,80]
          },
          {
            name:'未安装简易喷淋设备',
            data:[26,70]
          },
          {
            name:'厨房内未使用实体砖墙（防火门）分隔',
            data:[10,25]
          }
        ],
        total:'--'
      }
    },
    mounted(){
      let $this = this
      setTimeout(function () {
        for(let i= 0,j = $this.levelData.length;i<j;i+=1){
          let dataTemp = $this.levelData[i].data
          document.getElementsByClassName('detail_content')[i].children[1].style.border = '1px solid '+$this.color[i%5][1]
          document.getElementsByClassName('detail_content')[i].children[2].style.width = (dataTemp[0]/dataTemp[1])*100+'%'
          document.getElementsByClassName('detail_content')[i].children[2].style.background = $this.color[i%5][0]
          document.getElementsByClassName('detail_level')[i].style.border = '1px solid '+$this.color[i%5][0]
          document.getElementsByClassName('detail_level')[i].style.background = $this.color[i%5][1]
        }
      },1000)

      threesmallchart_pie().then(function (data) {
        console.log(data)

        $this.total = data.data.total

        let temp = {}
        temp.id = 'threeSmallPlaces_detail_1'
        temp.data = [{
          name:'三小场所',
          data:data.data.data
        }]
        showPieCharts(temp)

      })
      threesmallchart_line().then(function (data) {
        console.log(data)

        let temp = {}
        temp.id = 'threeSmallPlaces_detail_1_1'
        temp.data = data.data
        showLineCharts(temp)

      })
      threesmallchart_streetBar().then(function (data) {
        console.log(data)

        let temp = {}
        temp.id = 'threeSmallPlaces_detail_2'
        temp.data = data.data
        showLineCharts(temp)

      })
      threesmallchart_bar().then(function (data) {
        console.log(data)
        $this.levelData = []
        for(let i = 0,j = data.data[0].data.length;i<j;i+=1){
          $this.levelData.push({
            name:data.data[0].data[i].name,
            data:[data.data[1].data[i].value,data.data[0].data[i].value]
          })
        }

        for(let i= 0,j = $this.levelData.length;i<j;i+=1){
          let dataTemp = $this.levelData[i].data
          document.getElementsByClassName('detail_content')[i].children[2].style.width = (dataTemp[0]/dataTemp[1])*100+'%'
        }
      })

    },
    watch:{
      levelData:{//深度监听，可监听到对象、数组的变化
        handler(val, oldVal){
          console.log(val)
        },
        deep:true
      }
    }
  }
</script>

<style lang="scss" scoped>
.threeSmallPlaces{
  .main{
    font-size: 22px;color:#7af3ff;
  }
  .tit{
    color: #00c0dd;
    font-size: 19px;
    margin: 10px 0;
    width:auto;
    display: inline-block;
    position: relative;
    border-bottom: 1px solid #00ffff;
    font-weight: bold;
    padding-bottom: 3px;
    i{
      position: absolute;
      left:50%;
      top:100%;
      margin-top:-2px;
      width:0;
      height:0;
      border-left:3px solid transparent;
      border-right:3px solid transparent;
      border-bottom:3px solid #00ffff;
    }
  }
  .title{
    span:nth-child(1){
      color:white;
      font-size: 16px;
      margin-left: 30px;
    }
    span:nth-child(2){
      color:#fdbe00;
      font-size: 20px;
      margin-left: 10px;
    }
  }
  .detail{
    height: 170px;
    width: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    /*background-color: white;*/
    ul{
      padding-top: 0;
      position: relative;
      li{
        list-style: none;
        margin-bottom: 18px;
        div{
          display: inline-block;
          /*background-color: red;*/
        }
        .detail_level{
          height: 30px;
          width: 40px;
          margin-right: 20px;
          border-radius: 5px;
          text-align: center;
          line-height: 30px;
          color: white;
        }
        .detail_content{
          height: 30px;
          width: 60%;
          position: absolute;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          div{
            position: absolute;
          }
          div:nth-child(1){
            height: 15px;
            font-size: 12px;
            padding-left: 15px;
            .detail_content_checkout{
              color:#fdbe00;
              padding-left: 5px;
            }
            .detail_content_type{
              color: white;
            }
          }
          div:nth-child(2){
            width: 100%;
            height: 14px;
            /*background: #2b669a;*/
            top:16px;
            border-radius: 14px;
          }
          div:nth-child(3){
            width: 50%;
            height: 14px;
            background: #7f828b;
            top:16px;
            border-left: 14px;
            border-top-left-radius: 14px;
            border-bottom-left-radius: 14px;
          }
        }
        .detail_msg{
          height: 30px;
          position: absolute;
          left: 77%;
          margin-left: 20px;
          line-height: 30px;
          color:white;
          font-size: 14px;
        }
      }
    }
  }
  .detail2{height:180px;}
  .details3{    height: 250px;  margin-top: 20px;}
  .special{
    display: inline-block;
  }
}
</style>
