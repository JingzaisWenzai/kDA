<template>
  <div class="fangwu_right">
    <el-tabs v-model="activeName" class="right_border_card" type="border-card">
      <el-tab-pane label="" name="first">
        <ul>
          <li class="list_type_02">
            <bar-chart v-bind:chartData="{item:chartData2,index:3,type:'bar'}"></bar-chart>
          </li>
          <li class="list_type_02">
            <bar-chart v-bind:chartData="{item:chartData3,index:4,type:'pie'}"></bar-chart>
          </li>
          <li class="list_type_02">
            <bar-chart v-bind:chartData="{item:chartData1,index:2,type:'pie'}"></bar-chart>
          </li>
        </ul>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import barChart from '../../../../components/tizheng/subjectServers/common/barChart_01'
  import { component_rigthOne, component_rigthTwo, component_rigthThree } from '../../../../api/subjectServers'

  export default {
    name: 'right',
    components: { barChart },
    data: function() {
      return {
        activeName: 'first',
        chartData1: null,
        chartData2: null,
        chartData3: null
      }
    },
    watch: {
      '$store.state.addressStreet': function(val, oldVal) {
        this.initData()
        return this.$store.state.addressStreet
      }
    },
    mounted() {
      this.initData()
    },
    methods: {
      getComponent_rigthOne(params) {
        let $this = this
        component_rigthOne(params).then(function(data) {
          console.log(data)
          $this.chartData1 = {
            title: data.name,
            chartData: {
              // xAxis: { axisLabel: { interval: 'auto', rotate: '45',width:60 } },
              legend:{show:false},
              data: [data]
            }
          }
        })
      },
      getComponent_rigthTwo(params) {
        let $this = this
        component_rigthTwo(params).then(function(data) {
          console.log(data)

          $this.chartData2 = {
            title: '设备完好度',
            chartData: {
              data: [{
                name: '设备完好度',
                type:'bar',
                // center: ['50%', '45%'],
                xAxis: { axisLabel: { interval: 'auto', rotate: '45' } },
                data: data
              }]
            }
          }
        })
      },
      getComponent_rigthThree(params) {
        let $this = this
        component_rigthThree(params).then(function(data) {
          console.log(data)
          let temp = []
          for(let i in data){
            temp.push({
              name:i,
              value:data[i]
            })
          }

          $this.chartData3 = {
            title: '城市部件Top5',
            chartData: {
              data: [{
                name: '城市部件Top5',
                center: ['50%', '45%'],
                data: temp
              }]
            }
          }
        })
      },
      initData() {
        let temp = this.$store.state.addressStreet
        if (this.$store.state.addressStreet.search('福田区') !== -1 && this.$store.state.addressStreet.search('街道') === -1) {
          this.getData()
        } else {
          this.getData({ street: temp })
        }
      },
      getData(params) {
        this.getComponent_rigthOne(params)
        this.getComponent_rigthTwo(params)
        this.getComponent_rigthThree(params)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .fangwu_right {
    width: 500px;
    .right_border_card {
      background: transparent;
      border: none;
    }
    ul {
      padding: 0;
      width: 100%;
      li {
        /*width: 405px;*/
        list-style: none;
        display: inline-block;
      }
      .list_type_01 {
        width: 395px;
        /*height: 283px;*/
        height: 370px;
      }
      .list_type_02 {
        width: 100%;
        height: 220px;
      }
      float: left;
    }
  }
  .el-tabs__header.is-top {
    height: 0px !important;
  }
</style>
<style lang="scss">
  .fangwu_right {
    .el-tabs--border-card > .el-tabs__content {
      padding: 0px;
    }
    .el-tabs__header.is-top {
      height: 0px !important;
    }
  }
</style>
