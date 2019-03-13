<template>
  <div class="chartTab">
    <div class="title">
      <tab-title v-bind:titleData="this.chartId.msg"></tab-title>
    </div>
    <div class="charts chengshitizhengChart">
      <!--<line-chart v-bind:msg="chartId"></line-chart>-->
      <!--<component v-bind:is="this.chartId.chart.type" v-bind:msg="chartId"></component>-->
    </div>
    <div class="changeData" v-show="this.chartId.chart.length !== undefined">
      <span @click="changeDataAction($event,0)">按月</span>
      <span @click="changeDataAction($event,1)">按年</span>
    </div>
  </div>
</template>

<script>
  import tabTitle from '../../../../components/tizheng/common/chartTab/title.vue'
  import {chartsOptions} from '../../../../static/js/tizheng/charts'
  import {showLineCharts} from '../../../../static/js/OneMap/DX/DX_Chart'

  export default {
    name: "chartTab",
    props: ['chartId'],
    data:function(){
      return {
        chartObj:{}
      }
    },
    components: {
      tabTitle
    },
    mounted: function () {
      // console.log(this.chartId)
      this.initCharts()
    },
    watch: {
      chartId: {
        handler(newValue,oldValue){
          // console.log(newValue,oldValue)
          document.getElementsByClassName('chengshitizhengChart')[this.chartId.index].removeAttribute('id')
          echarts.dispose(this.chartObj.chart)
          this.initCharts()
        },
        deep:true
      }
    },
    methods:{
      initCharts:function(index=0) {
        // document.getElementsByClassName('chengshitizhengChart')[this.chartId.index].style.width = '100%'
        var item = {}
        // item.elementNode = document.getElementsByClassName('chengshitizhengChart')[this.chartId.index]

        if(this.chartId.chart.length>0){
          for(var i in this.chartId.chart[index]){
            item[i] = this.chartId.chart[index][i]
          }
        }else {
          item.data = this.chartId.chart.data
        }
        console.log(item)

        if(this.chartId.msg.data === null){
          document.getElementsByClassName('chengshitizhengChart')[this.chartId.index].style.height = '330px'
        }


        let id = 'chart_'+uuidv4()
        document.getElementsByClassName('chengshitizhengChart')[this.chartId.index].setAttribute('id',id)
        item.id = id
        this.chartObj.chart = showLineCharts(item)
        this.chartObj.id = id

        // this.chartObj = chartsOptions(item)
        var $this = this
        setTimeout(function() {
          $this.chartObj.chart.resize()
        },500)
      },
      changeDataAction:function(event,index){
        for(var i = 0,j = event.target.parentElement.children.length;i<j;i+=1){
          if(event.target.parentElement.children[i] !== event.target){
            event.target.parentElement.children[i].style.color = 'white'
          }
        }
        event.target.style.color = '#ff7f0d'
        document.getElementsByClassName('chengshitizhengChart')[this.chartId.index].removeAttribute('id')
        echarts.dispose(this.chartObj.chart)
        this.initCharts(index)
      }
    }
  }
</script>

<style scoped>
.chartTab{
  /*width: 544px;*/
  /*height: 388px;*/
}
  .chengshitizhengChart{
    width: 100%;
    height: 245px;
  }
  .changeData{
    color: white;
    float: right;
    font-size: 15px;
    position: relative;
    top: -245px;
  }
</style>
