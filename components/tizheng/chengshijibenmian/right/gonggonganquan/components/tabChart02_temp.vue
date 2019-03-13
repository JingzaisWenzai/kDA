<template>
  <div class="c_b_b_a">
    <div class="c_b_b_a_a">
      <div class="c_b_b_a_a_a">
        <!--交通安全-->
        {{this.chartData.item.data[0].name}}
      </div>
      <div class="c_b_b_a_a_b">
        交通事故平均处理时长
      </div>
      <div class="c_b_b_a_a_c">
        <span>12</span>
        <span>天</span>
      </div>
    </div>
    <div class="c_b_b_a_b" id="jtaq">
      <!--<script src="js/jtaq.js" type="text/javascript" language="javascript"></script>-->
    </div>
  </div>
</template>

<script>
  // import {chartsOptions} from '../../../../../../static/js/tizheng/charts'
  import {showLineCharts} from '../../../../../../static/js/OneMap/DX/DX_Chart'

  export default {
    name: "tabChart02",
    props:['chartData'],
    data: function () {
      return {
        data:[],
        chartObj:{}
      }
    },
    mounted: function () {
      console.log(22222,this.chartData)
      // this.chartData.item.elementNode = document.getElementsByClassName('c_b_b_a_b')[this.chartData.index]
      let temp = {},id = 'c_b_b_a_b_'+uuidv4()
      document.getElementsByClassName('c_b_b_a_b')[this.chartData.index].setAttribute('id',id)
      for(let i in this.chartData.item){
        if(i === 'elementNode'){

        }else if(i === 'yAxis'){
          temp.yAxis = [this.chartData.item.yAxis]
        }else {
          temp[i] = this.chartData.item[i]
        }
      }
      temp.id = id
      this.chartObj = showLineCharts(temp)
    },
    watch: {
      chartData: {
        handler(newValue,oldValue){
          // console.log(newValue,oldValue)
          // document.getElementsByClassName('c_b_b_a_b')[this.chartData.index].removeAttribute('id')
          // echarts.dispose(this.chartObj.chart)

          // this.chartData.item.elementNode = document.getElementsByClassName('c_b_b_a_b')[this.chartData.index]
          let temp = {},id = 'c_b_b_a_b_'+uuidv4()
          document.getElementsByClassName('c_b_b_a_b')[this.chartData.index].setAttribute('id',id)
          for(let i in this.chartData.item){
            if(i === 'elementNode'){

            }else if(i === 'yAxis'){
              temp.yAxis = [this.chartData.item.yAxis]
            }else {
              temp[i] = this.chartData.item[i]
            }
          }
          temp.id = id
          this.chartObj = showLineCharts(temp)
        },
        deep:true
      }
    }
  }
</script>

<style lang="scss" scoped>
  .c_b_b_a{width:928px; height:245px; text-align: left; margin: 0px auto; padding: 20px 30px 0 30px; border: #0238a3 solid 1px; border-radius:5px;  overflow: hidden;}
  .c_b_b_a_a{width:288px; height:225px; text-align: left; margin: 0px 20px 0px 0px; float: left; display: inline; overflow: hidden;}
  .c_b_b_a_a_a{width:288px; height:36px; line-height: 36px; text-align: left; margin: 0px auto; overflow: hidden; font-size: 30px; color: #40c6f0;}
  .c_b_b_a_a_b{width:288px; height:30px; line-height: 30px; text-align: center; margin: 50px auto; overflow: hidden; font-size: 19px; color: #b7ecff;}
  .c_b_b_a_a_c{width:288px; height:59px; line-height: 59px; text-align: center; margin: 0px auto; overflow: hidden; font-size: 55px; color: #40c6f0;}
  .c_b_b_a_a_c span:nth-child(2){font-size: 22px; color: #ffffff;}
  .c_b_b_a_b{width:550px; height:100%; text-align: left; margin: 0px auto !important; float: left; display: inline; overflow: hidden;}

</style>
