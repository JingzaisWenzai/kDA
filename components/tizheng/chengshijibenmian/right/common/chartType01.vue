<template>
    <div class="chartType01">
      <div>
        <div class="title">刑事案件发生量</div>
        <div class="title_detail">
          <span>今日</span><span>28</span>
        </div>
        <div class="chart" :style="'height:'+height +'px;'" :id="id"></div>
      </div>
    </div>
</template>

<script>

  import {showLineCharts} from '../../../../../static/js/OneMap/DX/DX_Chart'

  export default {
    name: 'chartType01',
    props:['chartData'],
    data(){
      return{
        data:{
          id:'',
          name:'',
          xAxis:{
            name:''
          },
          yAxis:{
            name:''
          },
          data:[
            {
              name:'序列一',
              type: 'line',
              data:[{name:'Mon',value:820},{name:'Tue',value:820},{name:'Wed',value:820}],
              smooth: true
            },
            {
              name:'序列二',
              type: 'line',
              data:[{name:'Mon',value:82},{name:'Tue',value:82},{name:'Wed',value:82}],
              smooth: true
            }
          ]
        },
        id:'',
        height:0
      }
    },
    mounted(){
      let $this = this
      this.id = "chart_"+uuidv4()
      this.data.id = this.id
      // setTimeout(function() {
      //   let height,temp1,temp2
      //   temp1 = document.getElementById($this.id).parentNode.parentNode.scrollHeight
      //   temp2 = document.getElementById($this.id).parentNode.children[0].scrollHeight+document.getElementById($this.id).parentNode.children[1].scrollHeight
      //   height = temp1-temp2-20
      //   document.getElementById($this.id).style.height = height+'px'
      //   showLineCharts($this.data)
      // })
    },
    methods:{
      loadChart(){
        this.data.data = this.chartData
        let height,temp1,temp2
        temp1 = document.getElementById(this.id).parentNode.parentNode.scrollHeight
        temp2 = document.getElementById(this.id).parentNode.children[0].scrollHeight+document.getElementById(this.id).parentNode.children[1].scrollHeight
        height = temp1-temp2-20
        document.getElementById(this.id).style.height = height+'px'
        showLineCharts(this.data)
      }
    },
    watch:{
      chartData:{
        handler:function(val,oldVal){
          this.loadChart()
        },
        deep:true
      }
    }
  }
</script>

<style lang="scss" scoped>
.chartType01{
  border: #0238a3 solid 1px;
  border-radius: 5px;
  width: 100%;
  height: 100%;
  .title{
    height: 30px;
    line-height: 30px;
    text-align: center;
    margin-top: 15px;
    /*margin: 0px auto 24px;*/
    /*overflow: hidden;*/
    font-size: 19px;
    color: #b7ecff;
  }
  .title_detail{
    height: 50px;
    line-height: 50px;
    text-align: center;
    /*margin: 0px !important;*/
    /*overflow: hidden;*/
    font-size: 30px;
    color: #40c6f0;
  }
  .chart{
    /*width: 100%;*/
    height: 60%;
  }
}
</style>
