<template>
  <div>
    <!--<renkou-left></renkou-left>-->
    <servers-msg v-bind:msgData="this.data"></servers-msg>
    <ul class="renkou_barChart">
      <li>
        <bar-chart v-bind:chartData="{item:chartData,index:0,type:'line'}"></bar-chart>
      </li>
    </ul>
  </div>
</template>

<script>
  // import renkouLeft from '../../../../components/OneMap/aqyh/selectAddress.vue'
  import serversMsg from '../../../../components/tizheng/subjectServers/common/subjectServersMsg'
  // import barChart from '../../../../components/tizheng/subjectServers/common/barChart'
  import barChart from '../../../../components/tizheng/subjectServers/common/barChart_01'
  import {legalPerson_leftOne,legalPerson_leftTwo} from '../../../../api/subjectServers'

  export default {
    name: 'left',
    components: {
      // renkouLeft,
      serversMsg,
      barChart
    },
    data: function() {
      return {
        data: [
          { name: '企业总数', value: 65, unit: '万人', rate: '9.8%', up: 1 },
          { name: '新注册企业数', value: 8, unit: '万人', rate: '9.8%', up: 1 },
          { name: '政府补贴额度', value: 16.8, unit: '%', rate: '', up: 0 }
        ],
        chartData: null
      }
    },
    watch:{
      '$store.state.addressStreet':function(val, oldVal) {
        this.initData()
        return this.$store.state.addressStreet
      }
    },
    mounted(){

      this.initData()
    },
    methods:{
      initMsgData(params){
        let $this = this
        legalPerson_leftOne(params).then(function(data) {
          $this.data = data
        })
      },
      initChartData(params){
        let $this = this
        legalPerson_leftTwo(params).then(function(data) {
          $this.chartData = {
            title:'企业分布',
            chartData:{
              grid:{ left:'5%'},
              xAxis: { axisLabel: { interval: 'auto', rotate: '45' }},
              data:[{name:'企业分布',type:'bar',data:data}]
            }
          }
        })
      },
      initData(){
        let temp = this.$store.state.addressStreet
        if(this.$store.state.addressStreet.search('福田区') !== -1 && this.$store.state.addressStreet.search('街道') === -1){
          this.getData()
        }else {
          this.getData({street:temp})
        }
      },
      getData(params){
        this.initMsgData(params)
        this.initChartData(params)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .renkou_barChart {
    padding: 0;
    li {
      height: 410px;
      /*width: 830px;*/
      width: 80%;
      list-style: none;
    }
  }
</style>
