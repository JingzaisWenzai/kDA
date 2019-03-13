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
  import {component_leftOne,component_leftTwo,component_leftThree} from '../../../../api/subjectServers'

  export default {
    name: "left",
    components: {
      // renkouLeft,
      serversMsg,
      barChart
    },
    data:function () {
      return {
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
    mounted(){

      this.initData()
    },
    methods:{
      getComponent_leftOne(params){
        let $this = this
        component_leftOne(params).then(function(data) {
          $this.data.push(data)
        })
      },
      getComponent_leftTwo(params){
        let $this = this
        component_leftTwo(params).then(function(data) {

          $this.data.push(data)
        })
      },
      getComponent_leftThree(params){
        let $this = this
        component_leftThree(params).then(function(data) {
          $this.chartData = {
            title: '部件数量',
            chartData: {
              grid:{left:'3%'},
              color:["#0098d9"],
              data: [{
                type:'bar',
                name: '部件数量',
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
        this.getComponent_leftOne(params)
        this.getComponent_leftTwo(params)
        this.getComponent_leftThree(params)
      }
    }
  }
</script>

<style lang="scss" scoped>
.renkou_barChart{
  padding: 0;
  li{
    height: 410px;
    width: 830px;
    list-style: none;
  }
}
</style>
