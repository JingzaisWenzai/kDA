<template>
  <div class="emergency">
    <p class="main">应急物资</p>
    <ul>
      <li v-for="(item,index) in count5num" :key="index">
        <div class="title"><span>{{item.name}}：</span><span>{{item.value}}</span></div>
      </li>
    </ul>
    <div>
      <p class="tit">避难场所-可容纳人数<i></i></p>
      <div class="detail" id="threeSmallPlaces_detail_12"></div>
    </div>
    <div>
      <p class="tit">危险源-受灾形式<i></i></p>
      <div class="detail" id="threeSmallPlaces_detail_13"></div>
    </div>
    <div>
      <p class="tit">物资存储情况<i></i></p>
      <div class="detail special_detail">
        <el-table
          :data="tableData2.tbody"
          height="300"
          style="width: 100%">
          <el-table-column
            prop="name"
            :label="tableData2.thead[0]">
          </el-table-column>
          <el-table-column
            prop="value"
            :label="tableData2.thead[1]"
            width="120">
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
  import {showPieCharts} from "../../../../static/js/OneMap/DX/DX_Chart";
  import {emergencyhiddendangerchart_count5num,emergencyhiddendangerchart_leftPie,emergencyhiddendangerchart_rightPie,emergencyhiddendangerchart_table} from "../../../../api/secapi";

  export default {
    name: "emergency",
    data(){
      return {
        total:'--',
        tableData2: {
          thead:["应急仓库", "应急物资"],
          tbody:[
            {
              name: '王小虎',
              value: '上海市普陀区金沙江路 1518 弄',
            },
            {
              name: '王小虎',
              value: '上海市普陀区金沙江路 1518 弄'
            },
            {
              name: '王小虎',
              value: '上海市普陀区金沙江路 1518 弄',
            },
            {
              name: '王小虎',
              value: '上海市普陀区金沙江路 1518 弄'
            },
            {
              name: '王小虎',
              value: '上海市普陀区金沙江路 1518 弄'
            },
            {
              name: '王小虎',
              value: '上海市普陀区金沙江路 1518 弄',
            },
            {
              name: '王小虎',
              value: '上海市普陀区金沙江路 1518 弄'
            },
            {
              name: '王小虎',
              value: '上海市普陀区金沙江路 1518 弄'
            },
            {
              name: '王小虎',
              value: '上海市普陀区金沙江路 1518 弄',
            },
            {
              name: '王小虎',
              value: '上海市普陀区金沙江路 1518 弄'
            },
            {
              name: '王小虎',
              value: '上海市普陀区金沙江路 1518 弄'
            },
            {
              name: '王小虎',
              value: '上海市普陀区金沙江路 1518 弄',
            },
            {
              name: '王小虎',
              value: '上海市普陀区金沙江路 1518 弄'
            },
            {
              name: '王小虎',
              value: '上海市普陀区金沙江路 1518 弄'
            },
            {
              name: '王小虎',
              value: '上海市普陀区金沙江路 1518 弄',
            },
            {
              name: '王小虎',
              value: '上海市普陀区金沙江路 1518 弄'
            }
          ]
        },
        count5num:[
          {name:'避难场所数',value:'--'},
          {name:'救援队伍数',value:'--'},
          {name:'避难场所数',value:'--'},
          {name:'应急仓库数',value:'--'},
          {name:'应急物资数',value:'--'}
        ]
      }
    },
    mounted() {
      let $this = this
      emergencyhiddendangerchart_count5num().then(function (data) {
        $this.count5num = data.data
      })
      emergencyhiddendangerchart_leftPie().then(function (data) {
        console.log(data)
        let temp = {}
        temp.id = 'threeSmallPlaces_detail_12'
        temp.data = [{
          name:'三小场所',
          data:data.data.data
        }]
        showPieCharts(temp)
      })
      emergencyhiddendangerchart_rightPie().then(function (data) {
        console.log(data)
        let temp = {}
        temp.id = 'threeSmallPlaces_detail_13'
        temp.data = [{
          name:'三小场所',
          data:data.data.data
        }]
        showPieCharts(temp)
      })
      emergencyhiddendangerchart_table().then(function (data) {
        console.log(data)
        let tbody = [],thead = []
        for(let i = 0,j = data.data.thead.length;i<j;i+=1){
          thead.push(data.data.thead[i])
        }
        for(let i = 0,j = data.data.tbody.length;i<j;i+=1){
          tbody.push({
            name:data.data.tbody[i][0],
            value:data.data.tbody[i][1]
          })
        }
        $this.tableData2.thead = thead
        $this.tableData2.tbody = tbody
      })
    },
    methods:{

    }
  }
</script>

<style lang="scss" scoped>
  .emergency {
    .main {
      font-size: 26px;
      color: #7af3ff;
    }
    .tit {
      color: #00c0dd;
      font-size: 19px;
      margin: 15px 0;
      width: auto;
      display: inline-block;
      position: relative;
      border-bottom: 1px solid #00ffff;
      i {
        position: absolute;
        left: 50%;
        top: 100%;
        margin-top: -3px;
        width: 0;
        height: 0;
        border-left: 3px solid transparent;
        border-right: 3px solid transparent;
        border-bottom: 3px solid #00ffff;
      }
    }
    ul{
      padding-left: 0;
      margin-top: 15px;
      li{
        list-style: none;
        display: inline-block;
        width: 33%;
        .title {
          span:nth-child(1) {
            color: white;
            font-size: 16px;
            margin-left: 10px;
          }
          span:nth-child(2) {
            color: #fdbe00;
            font-size: 22px;
            margin-left: 10px;
          }
        }
      }
    }
    .detail{
      height: 190px;
      width: 100%;
      /*background-color: white;*/
    }
    .special_detail {
      height: 300px;
      width: 100%;
      overflow: hidden;
      /*background-color: white;*/
    }
  }
</style>
<style lang="scss">
  .emergency{
    .special_detail {
      .el-table th, .el-table tr {
        background-color: transparent;
      }
      .el-table--enable-row-hover .el-table__body tr:hover>td{
        background-color: #212e3e !important;
      }
    }
    .el-table, .el-table__expanded-cell{
      background-color:transparent !important;
    }
    .el-table {
      color: white;
    }
    .el-table thead{
      color:white;
    }
    .el-table td, .el-table th.is-leaf {
      border-bottom: 1px solid #212e3e;
    }
  }
</style>
