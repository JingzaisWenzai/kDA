<template>
  <div class="renkou_right">
    <el-tabs v-model="activeName" class="right_border_card" type="border-card" @tab-click="handleClick">
      <el-tab-pane label="新设企业情况" name="first">
        <ul>
          <li class="list_type_02" style="height: 350px!important;">
            <bar-chart v-bind:chartData="{item:chartData1,index:2,type:'pie'}"></bar-chart>
          </li>
          <li class="list_type_02" style="height: 350px!important;">
            <bar-chart v-bind:chartData="{item:chartData3,index:4,type:'bar'}"></bar-chart>
          </li>
        </ul>
      </el-tab-pane>
      <el-tab-pane label="福田金融产业" name="second">
        <ul>
          <li class="list_type_02">
            <bar-chart v-bind:chartData="{item:chartData4,index:5,type:'pie'}"></bar-chart>
          </li>
          <li class="list_type_02">
            <my-table :tableHead="tableHead01" :tableData="chartData5"></my-table>
          </li>
          <li class="list_type_02">
            <my-table :tableHead="tableHead02" :tableData="chartData6"></my-table>
          </li>
        </ul>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import barChart from '../../../../components/tizheng/subjectServers/common/barChart_01'
  import myTable from '../../../../components/tizheng/common/table/table01'
  import {
    legalPerson_rightOne,
    legalPerson_rightTwo,
    legalPerson_rightThree,
    legalPerson_rightFour,
    legalPerson_rightFive,
    legalPerson_rightSix
  } from '../../../../api/subjectServers'

  export default {
    name: 'right',
    components: { barChart, myTable },
    data: function() {
      return {
        chartData1: null,
        chartData2: null,
        chartData3: null,
        chartData4: null,
        chartData5: {
          name:'',
          data:[]
        },
        chartData6: {
          name:'',
          data:[]
        },
        activeName: 'first',
        tableHead01: [],
        tableHead02: []
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
      handleClick(tab, event) {
        this.initData()
      },
      getLegalPerson_rightOne(params) {
        let $this = this
        legalPerson_rightOne(params).then(function(data) {

          let temp = []
          for (let i = 0, j = 5; i < j; i += 1) {
            let temp2 = {}
            for (let n in data[i]) {
              temp2 = {
                name: n,
                value: data[i][n]
              }
            }
            temp.push(temp2)
          }
          $this.chartData1 = {
            title: '企业各行业分类',
            chartData: {
              data: [{
                name: '企业各行业分类',
                center: ['50%', '40%'],
                data: temp
              }]
            }
          }
        })
      },
      getLegalPerson_rightTwo(params) {
        let $this = this
        legalPerson_rightTwo(params).then(function(data) {

        })
      },
      getLegalPerson_rightThree(params) {
        let $this = this
        legalPerson_rightThree(params).then(function(data) {

          $this.chartData3 = {
            title: 'P2P平台情况',
            chartData: {
              data: [{
                name: 'P2P平台',
                type: 'bar',
                data: data
              }]
            }
          }
        })
      },
      getLegalPerson_rightFour(params) {
        let $this = this
        legalPerson_rightFour(params).then(function(data) {

          $this.chartData4 = {
            title: '平台风险类型情况',
            chartData: {
              data: [{
                name: '平台风险类型',
                type: 'pie',
                center: ['50%', '40%'],
                data: data
              }]
            }
          }
        })
      },
      getLegalPerson_rightFive(params) {

        let $this = this
        this.tableHead01 = [
          { prop: 'enterprise_NAME', label: '企业名称', width: '300' },
          { prop: 'smoke_INDEX', label: '冒烟指数' , width: '80' },
          { prop: 'platform_NAME', label: '平台名称' },
          { prop: 'risk_LEVEL', label: '风险等级', width: '120' },
          { prop: 'reg_LAND_LABLE', label: ' 区域' }
        ]
        legalPerson_rightFive(params).then(function(data) {

          $this.chartData5 = {
            name:'各平台冒烟指数Top10',
            data:data
          }
        })
      },
      getLegalPerson_rightSix(params) {

        let $this = this
        this.tableHead02 = [
          { prop: 'enterprise_NAME', label: '企业名称', width: '300' },
          // { prop: 'plat_WEBSITE', label: '网址' },
          { prop: 'platform_NAME', label: '平台名称' },
          { prop: 'risk_LEVEL', label: '风险等级', width: '120' },
          { prop: 'total_COMPENSATION', label: '待偿还（亿）', width: '120' },
          { prop: 'reg_LAND_LABLE', label: '区域' }
        ]
        legalPerson_rightSix(params).then(function(data) {

          $this.chartData6 = {
            name:'待偿还金额Top10',
            data:data
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
      getData(params) {
        if (this.activeName === 'first') {
          this.getLegalPerson_rightOne(params)
          this.getLegalPerson_rightTwo(params)
          this.getLegalPerson_rightThree(params)
          // if (this.chartData1 === null) {
          //   this.getLegalPerson_rightOne()
          // }
          // if (this.chartData2 === null) {
          //   this.getLegalPerson_rightTwo()
          // }
          // if (this.chartData3 === null) {
          //   this.getLegalPerson_rightThree()
          // }
        } else if (this.activeName === 'second') {
          this.getLegalPerson_rightFour(params)
          this.getLegalPerson_rightFive(params)
          this.getLegalPerson_rightSix(params)
          // if (this.chartData4 === null) {
          //   this.getLegalPerson_rightFour()
          // }
          // if (this.chartData5.data.length === 0) {
          //   this.getLegalPerson_rightFive()
          // }
          // if (this.chartData6.data.length === 0) {
          //   this.getLegalPerson_rightSix()
          // }
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .renkou_right {
    width: 830px;
    .right_border_card {
      background: transparent;
      border: none;
    }
    .title {
      font-size: 30px;
      font-weight: bolder;
      color: rgb(67, 211, 255);
      padding-bottom: 20px;
      text-align: left;
      background: url("../../../../assets/img/renkou.png") no-repeat;
      padding-left: 50px;
    }
    ul {
      padding: 0;
      width: 100%;
      li {
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
    .bottom_select {
      .select {
        width: 38px;
        height: 38px;
        background: url("../../../../assets/img/left.png") no-repeat;
        display: inline-block;
        cursor: auto;
      }
      .right {
        margin-left: 20px;
        background: url("../../../../assets/img/right.png") no-repeat;
      }
      .right_select {
        background: url("../../../../assets/img/right_select.png") no-repeat;
        cursor: pointer;
        position: relative;
        left: 20px;
      }
      .left_select {
        background: url("../../../../assets/img/left_select.png") no-repeat;
        cursor: pointer;
      }
    }
  }
</style>
