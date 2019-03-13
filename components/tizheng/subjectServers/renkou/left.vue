<template>
  <div>
    <!--<renkou-left></renkou-left>-->
    <servers-msg v-bind:msgData="this.data"></servers-msg>
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
  import {population_leftOne,population_leftTwo} from '../../../../api/subjectServers'
  import bus from '../../../../assets/js/main'

  export default {
    name: "left",
    components: {
      // renkouLeft,
      serversMsg,
      barChart
    },
    data:function () {
      return {
        data:[
          {name:'常住人口',value:65,unit:'万人',float:'9.8%',up:1},
          {name:'外来人口',value:8,unit:'万人',float:'9.8%',up:1},
          {name:'人口自然增长率',value:16.8,unit:'%',float:'',up:0}
        ],
        chartData: null,
        address:''
      }
    },
    watch:{
      '$store.state.addressStreet':function(val, oldVal) {
        this.initData()
        return this.$store.state.addressStreet
      }
    },
    mounted:function () {
      bus.$emit('showLoading',true)

      this.initData()

      bus.$on('selectedAddress',this.selectedAddress)
    },
    beforeDestroy(){
      bus.$off('selectedAddress')
    },
    methods:{
      selectedAddress(params){
        console.log(params)
        if(params.search('-') === -1){
          this.getData({street:params})
        }else {
          let temp = params.split('-')
          this.getData({street:temp[0],community:temp[1]})
        }
        bus.$emit('showLoading',true)
      },
      getPopulation_leftOne(params){
        let $this = this
        population_leftOne(params).then(function(data) {
          $this.data = data
          bus.$emit('showLoading',false)
        })
      },
      getPopulation_leftTwo(params){
        let $this = this
        population_leftTwo(params).then(function(data) {
          console.log(data)
          $this.chartData = {
            title:'福田户籍人口与流动人口',
            chartData:
              {
                grid:{ left:'5%'},
                xAxis: { axisLabel: { interval: 'auto', rotate: '45' },name:data.xaxis.name},
                yAxis:[{name:data.yaxis.name}],
                data:data.data
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
        this.getPopulation_leftOne(params)
        this.getPopulation_leftTwo(params)
      }
    }
  }
</script>

<style lang="scss" scoped>
.renkou_barChart{
  padding: 0;
  li{
    height: 410px;
    /*width: 405px;*/
    width: 80%;
    list-style: none;
    float: left;
  }
}
</style>
