<template>
  <div>
    <!--<renkou-left></renkou-left>-->
    <servers-msg v-bind:msgData="data"></servers-msg>
    <ul class="renkou_barChart">
      <li>
        <bar-chart v-bind:chartData="{item:chartData,index:0,type:'bar'}"></bar-chart>
      </li>
    </ul>
  </div>
</template>

<script>
  // import renkouLeft from '../../../../components/OneMap/aqyh/selectAddress.vue'
  import serversMsg from '../../../../components/tizheng/subjectServers/common/subjectServersMsg'
  import barChart from '../../../../components/tizheng/subjectServers/common/barChart_01'
  import {
    buildBasic_leftOne,
    buildBasic_leftTwo,
    buildBasic_leftThree,
    buildBasic_leftFour
  } from '../../../../api/subjectServers'

  export default {
    name: 'left',
    components: {
      // renkouLeft,
      serversMsg,
      barChart
    },
    data: function() {
      return {
        // data: [
        //   { name: '居民建筑数量', value: 65, unit: '万', float: '9.8%', up: 1 },
        //   { name: '商业建筑数量', value: 8, unit: '万', float: '9.8%', up: 1 },
        //   { name: '棚旧改项目数量', value: 16.8, unit: '个', float: '9.8%', up: 1 }
        // ],
        data:[],
        chartData: null
      }
    },
    watch:{
      '$store.state.addressStreet':function(val, oldVal) {
        this.initData()
        return this.$store.state.addressStreet
      }
    },
    mounted() {

      this.initData()
    },
    methods: {
      getBuildBasic_leftOne(params) {
        let $this = this
        buildBasic_leftOne(params).then(function(data) {
          $this.data.push(data)
        })
      },
      getBuildBasic_leftTwo(params) {
        let $this = this
        buildBasic_leftTwo(params).then(function(data) {
          $this.data.push(data)
        })
      },
      getBuildBasic_leftThree(params) {
        let $this = this
        buildBasic_leftThree(params).then(function(data) {
          $this.data.push(data)
        })
      },
      getBuildBasic_leftFour(params) {
        let $this = this
        buildBasic_leftFour(params).then(function(data) {
          $this.chartData = {
            title: '楼栋数量',
            chartData: {
              grid:{left:'5%'},
              data: [{
                name: '楼栋数量',
                type: 'bar',
                data: data
              }]
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
        this.getBuildBasic_leftOne(params)
        this.getBuildBasic_leftTwo(params)
        this.getBuildBasic_leftThree(params)
        this.getBuildBasic_leftFour(params)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .renkou_barChart {
    padding: 0;
    li {
      height: 410px;
      width: 830px;
      list-style: none;
    }
  }
</style>
