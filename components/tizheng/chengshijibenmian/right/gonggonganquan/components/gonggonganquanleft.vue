<template>
    <div>
      <my-title v-bind:titleData="this.data.msg"></my-title>
      <!--<LineChart></LineChart>-->
    </div>
</template>

<script>
  import myTitle from '../../../../../../components/tizheng/common/chartTab/title.vue'
  // import lineChart from '~/components/common/charts/line.vue'
    export default {
        name: "gonggonganquanleft",
      components: {
          myTitle,
        // lineChart
      },
      data:function () {
        return {
          data:{
            chart:{data:[{name:'2008',value:100},{name:'2009',value:110},{name:'2010',value:120},{name:'2011',value:130},{name:'2012',value:140},{name:'2013',value:150},{name:'2014',value:160},{name:'2015',value:170},{name:'2016',value:180},{name:'2017',value:190}],
              xAxis:{name:''},
              yAxis:{name:''},
              type:'lineChart'},
            msg:{name:'社会治安',index:0,data:[{name:'历史破案率',value:82.6,type:'%',icon:''},{name:'历史处置率',value:98.8,type:'%',icon:''},{name:'城区连续无刑事\n\n治安伤亡天数',value:68,type:'%',icon:''}]},
            index:0
          }
        }
      }
    }
</script>

<style scoped>

</style>
