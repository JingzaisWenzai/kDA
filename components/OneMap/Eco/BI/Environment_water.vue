<template>
  <div class="environment_water">
    <ul>
      <li>
        <div class="environment_air_title">水质概况</div>
        <div class="environment_air_mge">{{chartData[0].name}}</div>
        <div id="chart01" style="height: 220px;"></div>
      </li>
      <li>
        <div class="environment_air_title">预警统计</div>
        <div class="environment_air_mge">{{chartData[1].name}}
          <!--<span>现有预警（个）:</span><span class="environment_air_mge_value">5</span>-->
          <!--<span>当日累计(个):</span><span class="environment_air_mge_value">176</span>-->
        </div>
        <div id="chart02" style="height: 220px;"></div>
      </li>
      <li>
        <div class="environment_air_title">河长信息</div>
        <!--<el-table-->
          <!--:data="tableData"-->
          <!--style="width: 100%;"-->
          <!--max-height="320"-->
          <!--:span-method="objectSpanMethod">-->
        <el-table
          :data="tableData"
          style="width: 100%;"
          max-height="320">
          <el-table-column
            prop="river_NAME"
            label="河流名称"
            width="150">
          </el-table-column>
          <el-table-column label="区级河长">
            <el-table-column
              prop="region_MANAGER_JOB"
              label="河长相应职务"
              width="120">
            </el-table-column>
            <el-table-column
              label="姓名"
              prop="region_MANAGER_NAME"
              width="80">
            </el-table-column>
          </el-table-column>
          <el-table-column label="街道级河长">
            <el-table-column
              prop="street_NAMAGER_JOB"
              label="河长相应职务"
              width="156">
            </el-table-column>
            <el-table-column
              label="姓名"
              prop="street_MANAGER_NAME"
              width="80">
            </el-table-column>
          </el-table-column>
          <!--<el-table-column-->
            <!--prop="comment"-->
            <!--label="备注"-->
            <!--width="120">-->
          <!--</el-table-column>-->
        </el-table>
      </li>
    </ul>
  </div>
</template>

<script>

  import { rundisplay_water_avg, rundisplay_water_alarm, rundisplay_river_detail } from '../../../../api/ecoapi'
  import { showLineCharts } from '../../../../static/js/OneMap/DX/DX_Chart'

  export default {
    name: 'Environment_water',
    props: [],
    components: {},
    data() {
      return {
        tableData: [],
        dataObj: [
          {
            river_NAME: '2016-05-03',
            region_MANAGER_JOB: '王小虎',
            region_MANAGER_NAME: '上海',
            street: [
              {
                street_NAMAGER_JOB: '王小虎',
                street_MANAGER_NAME: '上海'
              },
              {
                street_NAMAGER_JOB: '王小虎',
                street_MANAGER_NAME: '上海'
              },
              {
                street_NAMAGER_JOB: '王小虎',
                street_MANAGER_NAME: '上海'
              },
              {
                street_NAMAGER_JOB: '王小虎',
                street_MANAGER_NAME: '上海'
              }
            ],
            comment: '普陀区'
          },
          {
            river_NAME: '2016-05-03',
            region_MANAGER_JOB: '王小虎',
            region_MANAGER_NAME: '上海',
            street: [
              {
                street_NAMAGER_JOB: '王小虎',
                street_MANAGER_NAME: '上海'
              },
              {
                street_NAMAGER_JOB: '王小虎',
                street_MANAGER_NAME: '上海'
              }
            ],
            comment: '普陀区'
          },
          {
            river_NAME: '2016-05-03',
            region_MANAGER_JOB: '王小虎',
            region_MANAGER_NAME: '上海',
            street: [
              {
                street_NAMAGER_JOB: '王小虎',
                street_MANAGER_NAME: '上海'
              },
              {
                street_NAMAGER_JOB: '王小虎',
                street_MANAGER_NAME: '上海'
              },
              {
                street_NAMAGER_JOB: '王小虎',
                street_MANAGER_NAME: '上海'
              }
            ],
            comment: '普陀区'
          },
          {
            river_NAME: '2016-05-03',
            region_MANAGER_JOB: '王小虎',
            region_MANAGER_NAME: '上海',
            street: [
              {
                street_NAMAGER_JOB: '王小虎',
                street_MANAGER_NAME: '上海'
              }
            ],
            comment: '普陀区'
          },
          {
            river_NAME: '2016-05-03',
            region_MANAGER_JOB: '王小虎',
            region_MANAGER_NAME: '上海',
            street: [
              {
                street_NAMAGER_JOB: '王小虎',
                street_MANAGER_NAME: '上海'
              },
              {
                street_NAMAGER_JOB: '王小虎',
                street_MANAGER_NAME: '上海'
              }
            ],
            comment: '普陀区'
          },
          {
            river_NAME: '2016-05-03',
            region_MANAGER_JOB: '王小虎',
            region_MANAGER_NAME: '上海',
            street: [
              {
                street_NAMAGER_JOB: '王小虎',
                street_MANAGER_NAME: '上海'
              }
            ],
            comment: '普陀区'
          },
          {
            river_NAME: '2016-05-03',
            region_MANAGER_JOB: '王小虎',
            region_MANAGER_NAME: '上海',
            street: [
              {
                street_NAMAGER_JOB: '王小虎',
                street_MANAGER_NAME: '上海'
              },
              {
                street_NAMAGER_JOB: '王小虎',
                street_MANAGER_NAME: '上海'
              },
              {
                street_NAMAGER_JOB: '王小虎',
                street_MANAGER_NAME: '上海'
              },
              {
                street_NAMAGER_JOB: '王小虎',
                street_MANAGER_NAME: '上海'
              },
              {
                street_NAMAGER_JOB: '王小虎',
                street_MANAGER_NAME: '上海'
              }
            ],
            comment: '普陀区'
          }
        ],
        chartData: [
          {
            'name':'福田河流水质状况',
            'id': '',
            'xAxis': {
              'name': ''
            },
            'yAxis': {
              'name': ''
            },
            'data': [
              {
                'name': '序列一',
                'type': 'bar',
                'stack': '总量',
                'data': [{ 'name': 'Mon', 'value': 820 }, { 'name': 'Tue', 'value': 820 }, {
                  'name': 'Wed',
                  'value': 820
                }],
                'smooth': true
              },
              {
                'name': '序列二',
                'type': 'bar',
                'stack': '总量',
                'data': [{ 'name': 'Mon', 'value': 82 }, { 'name': 'Tue', 'value': 82 }, {
                  'name': 'Wed',
                  'value': 82
                }],
                'smooth': true
              }
            ]
          },
          {
            'name':'福田河流水质状况',
            'id': '',
            'xAxis': {
              'name': ''
            },
            'yAxis': {
              'name': ''
            },
            'data': [
              {
                'name': '序列一',
                'type': 'line',
                'data': [{ 'name': 'Mon', 'value': 820 }, { 'name': 'Tue', 'value': 820 }, {
                  'name': 'Wed',
                  'value': 820
                }],
                'smooth': true
              },
              {
                'name': '序列二',
                'type': 'line',
                'data': [{ 'name': 'Mon', 'value': 82 }, { 'name': 'Tue', 'value': 82 }, {
                  'name': 'Wed',
                  'value': 82
                }],
                'smooth': true
              }
            ]
          }
        ]
      }
    },
    mounted() {

      /*
      * comment: null
region_MANAGER_JOB: "区委书记"
region_MANAGER_NAME: "肖亚非"
river_NAME: "深圳河（福田段）"
street_MANAGER_NAME: "陈晓中"
street_NAMAGER_JOB: "南园街道办党工委书记"
      * */

      this.tableData = this.checkData(this.dataObj)

      this.rundisplay_water_avg()
      this.rundisplay_water_alarm()
      this.rundisplay_river_detail()
    },
    methods: {
      rundisplay_water_avg() {
        let $this = this
        rundisplay_water_avg().then(function(data) {
          console.log(data)
          $this.chartData[0].id = 'chart01'
          $this.chartData[0].name = data.name
          $this.chartData[0].data = data.data
          $this.chartData[0].legend = {selectedMode : 'single'}
          $this.chartData[0].xAxis = {axisLabel:{ interval:'auto',rotate:'45'}}
          showLineCharts($this.chartData[0])
        })
      },
      rundisplay_water_alarm() {
        let $this = this
        rundisplay_water_alarm().then(function(data) {
          console.log(data)
          $this.chartData[1].id = 'chart02'
          $this.chartData[1].name = data.name
          $this.chartData[1].data = data.data
          $this.chartData[1].xAxis = {axisLabel:{ interval:'auto',rotate:'45'}}
          showLineCharts($this.chartData[1])
        })
      },
      rundisplay_river_detail() {
        let $this = this
        rundisplay_river_detail().then(function(data) {
          console.log(data)
          $this.tableData = data
        })
      },
      checkData(data) {
        let temp = [], length = -1
        for (let i = 0, j = data.length; i < j; i += 1) {
          for (let n = 0, m = data[i].street.length; n < m; n += 1) {
            temp.push(
              {
                river_NAME: data[i].river_NAME,
                region_MANAGER_JOB: data[i].region_MANAGER_JOB,
                region_MANAGER_NAME: data[i].region_MANAGER_NAME,
                street_NAMAGER_JOB: data[i].street[n].street_NAMAGER_JOB,
                street_MANAGER_NAME: data[i].street[n].street_MANAGER_NAME,
                comment: data[i].comment,
                column: []
              }
            )
            length++
          }
          temp[temp.length - data[i].street.length].column = [length, data[i].street.length]
        }
        return temp
      },
      objectSpanMethod({ row, column, rowIndex, columnIndex }) {
        if(this.tableData[rowIndex].column === undefined){
          return
        }
        if (columnIndex === 0 || columnIndex === 1 || columnIndex === 2 || columnIndex === 5) {
          if (!this.tableData[rowIndex].column && this.tableData[rowIndex].column.length > 0) {
            return {
              rowspan: this.tableData[rowIndex].column[1],
              colspan: 1
            }
          } else {
            return {
              rowspan: 0,
              colspan: 0
            }
          }
        }
      }
    },
    beforeDestroy() {

    }
  }
</script>

<style lang="scss" scoped>
  .environment_water {
    margin-top: 80px !important;
    ul {
      padding: 0;
      li {
        width: 98%;
        list-style: none;
        margin-bottom: 20px;
        color: white;
        .environment_air_title {
          background: url("../../../../static/img/common/arrow_right.png") no-repeat left;
          padding-left: 30px;
          font-size: 22px;
          margin-bottom: 10px;
        }
        .environment_air_mge {
          padding-bottom: 10px;
          padding-left: 10px;
          .environment_air_mge_value {
            color: #ff9000;
            margin: 0 15px;
          }
        }
      }
    }
  }
</style>

<style lang="scss">
  .environment_water {
    ul {
      li {
        .el-table th, .el-table tr {
          background-color: transparent;
        }
        .el-table--enable-row-hover .el-table__body tr:hover > td {
          background-color: #212e3e !important;
        }
        .el-table, .el-table__expanded-cell {
          background-color: transparent !important;
        }
        .el-table {
          color: white;
        }
        .el-table thead {
          color: white;
        }
        .el-table td, .el-table th.is-leaf {
          border-bottom: 1px solid #212e3e;
        }
        .el-table td, .el-table th {
          padding: 5px 0;
        }
        .el-table thead.is-group th {
          background: transparent;
        }
      }
    }
  }
</style>
