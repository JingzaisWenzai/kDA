<template>
  <div class="loudong_right">
    <el-tabs v-model="activeName" class="right_border_card" type="border-card">
      <el-tab-pane label="" name="first">
        <ul>
          <li class="list_type_01">
            <bar-chart v-bind:chartData="{item:chartData1,index:2,type:'bar'}"></bar-chart>
          </li>
          <li class="list_type_01">
            <bar-chart v-bind:chartData="{item:chartData2,index:3,type:'line'}"></bar-chart>
          </li>
          <li class="list_type_01">
            <bar-chart v-bind:chartData="{item:chartData3,index:4,type:'pie'}"></bar-chart>
          </li>
          <li class="list_type_01">
            <bar-chart v-bind:chartData="{item:chartData4,index:5,type:'pie'}"></bar-chart>
          </li>
        </ul>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import barChart from '../../../../components/tizheng/subjectServers/common/barChart_01'
  import {
    buildBasic_rightOne,
    buildBasic_rightTwo,
    buildBasic_rightThree,
    buildBasic_rightFour
  } from '../../../../api/subjectServers'

  export default {
    name: 'right',
    components: { barChart },
    data: function() {
      return {
        activeName: 'first',
        chartData1:null,
        chartData2:null,
        chartData3:null,
        chartData4:null,
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
      getBuildBasic_rightOne(params){
        let $this = this
        buildBasic_rightOne(params).then(function(data) {
          console.log(data)
          for(let i = 0,j = data.length;i<j;i+=1){
            data[i].type = 'bar'
          }
          $this.chartData1 = {
            title: '居住/商业 建筑层高类别统计',
            chartData: {
              xAxis: { axisLabel: { interval: 'auto', rotate: '45' } },
              data: data
            }
          }
        })
      },
      getBuildBasic_rightTwo(params){
        let $this = this
        buildBasic_rightTwo(params).then(function(data) {
          console.log(data)
          $this.chartData2 = {
            title: '居住/商业 SJYT设计用途的建筑面积',
            chartData: {
              xAxis: { axisLabel: { interval: 'auto', rotate: '45' }},
              yAxis:[{name:'平方米'}],
              data: [{
                name: '企业各行业分类',
                data: data
              }]
            }
          }
        })
      },
      getBuildBasic_rightThree(params){
        let $this = this
        buildBasic_rightThree(params).then(function(data) {
          console.log(data)
          $this.chartData3 = {
            title: '使用用途占比统计',
            chartData: {
              data: [{
                name: '使用用途占比统计',
                center: ['50%', '50%'],
                data: data
              }]
            }
          }
        })
      },
      getBuildBasic_rightFour(params){
        let $this = this
        buildBasic_rightFour(params).then(function(data) {
          console.log(data)
          $this.chartData4 = {
            title: '使用情况占比统计',
            chartData: {
              data: [{
                name: '使用情况占比统计',
                center: ['50%', '45%'],
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
        this.getBuildBasic_rightOne(params)
        this.getBuildBasic_rightTwo(params)
        this.getBuildBasic_rightThree(params)
        this.getBuildBasic_rightFour(params)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .loudong_right {
    width: 830px;
    .right_border_card {
      background: transparent;
      border: none;
    }
    ul {
      padding: 0;
      width: 100%;
      li {
        width: 395px;
        /*height: 283px;*/
        height: 370px;
        list-style: none;
        display: inline-block;
      }
      float: left;
    }
  }
</style>
<style lang="scss">
  .loudong_right {
    .el-tabs--border-card > .el-tabs__content {
      padding: 0px;
    }
    .el-tabs__header.is-top {
      height: 0px !important;
    }
  }
</style>
