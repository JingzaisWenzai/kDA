<template>
    <div class="environment_air">
      <ul>
        <li>
          <div class="environment_air_title">空气概况</div>
          <div class="environment_air_mge">{{chartData[0].name}}</div>
          <div id="chart01" style="height: 240px;"></div>
        </li>
        <li>
          <div class="environment_air_title">预警统计</div>
          <div class="environment_air_mge">{{chartData[1].name}}
            <!--<span>现有预警（个）:</span><span class="environment_air_mge_value">5</span>-->
            <!--<span>当日累计(个):</span><span class="environment_air_mge_value">176</span>-->
          </div>
          <div id="chart02"  style="height: 240px;"></div>
        </li>
        <li>
          <div class="environment_air_title">空气质量统计</div>
          <div class="environment_air_mge">{{chartData[1].name}}</div>
          <div id="chart03" style="height: 240px;"></div>
        </li>
      </ul>
    </div>
</template>

<script>

  import {showLineCharts} from '../../../../static/js/OneMap/DX/DX_Chart'
  import { rundisplay_air_day, rundisplay_air_alarm, rundisplay_air_avg} from '../../../../api/ecoapi'

  export default {
    name: 'Environment_air',
    props: [],
    components: {},
    data() {
      return {
        chartData:[
          {
            "name":"福田河流水质状况",
            "id":"",
            "xAxis":{
              "name":""
            },
            "yAxis":{
              "name":""
            },
            "data":[
              {
                "name":"序列一",
                "type": "bar",
                "data":[{"name":"Mon","value":820},{"name":"Tue","value":820},{"name":"Wed","value":820}],
                "smooth": true
              },
              {
                "name":"序列二",
                "type": "line",
                "data":[{"name":"Mon","value":82},{"name":"Tue","value":82},{"name":"Wed","value":82}],
                "smooth": true
              }
            ]
          },
          {
            "id":"",
            "xAxis":{
              "name":""
            },
            "yAxis":{
              "name":""
            },
            "data":[
              {
                "name":"序列一",
                "type": "line",
                "data":[{"name":"Mon","value":820},{"name":"Tue","value":820},{"name":"Wed","value":820}],
                "smooth": true
              },
              {
                "name":"序列二",
                "type": "line",
                "data":[{"name":"Mon","value":82},{"name":"Tue","value":82},{"name":"Wed","value":82}],
                "smooth": true
              }
            ]
          },
          {
            name:'近30天空气质量统计',
            "id":"",
            "xAxis":{
              "name":""
            },
            "yAxis":{
              "name":""
            },
            "data":[
              {
                "name":"序列一",
                "type": "bar",
                "stack":'总量',
                "data":[{"name":"Mon","value":820},{"name":"Tue","value":820},{"name":"Wed","value":820}],
                "smooth": true
              },
              {
                "name":"序列二",
                "type": "bar",
                "stack":'总量',
                "data":[{"name":"Mon","value":82},{"name":"Tue","value":82},{"name":"Wed","value":82}],
                "smooth": true
              }
            ]
          },
        ],
        chart1:{},
        chart2:{},
        chart3:{}
      }
    },
    mounted() {

      this.chartData[0].id = 'chart01'
      this.chartData[1].id = 'chart02'
      this.chartData[2].id = 'chart03'
      showLineCharts(this.chartData[0])
      showLineCharts(this.chartData[1])
      showLineCharts(this.chartData[2])

      this.rundisplay_air_day()
      this.rundisplay_air_alarm()
      this.rundisplay_air_avg()
    },
    methods: {
      rundisplay_air_day() {
        let $this = this
        rundisplay_air_day().then(function(data) {
          // console.log(data)
          $this.chartData[0].id = 'chart01'
          $this.chartData[0].name = data.name
          $this.chartData[0].data = data.data
          $this.chartData[0].legend = {selectedMode : 'single'}
          $this.chartData[0].xAxis = {axisLabel:{interval:'auto',rotate:'45'}}
          document.getElementById($this.chartData[0].id).removeAttribute("_echarts_instance_")
          showLineCharts($this.chartData[0])
        })
      },
      rundisplay_air_alarm() {
        let $this = this
        rundisplay_air_alarm().then(function(data) {
          // console.log(data)
          $this.chartData[1].id = 'chart02'
          $this.chartData[1].name = data.name
          $this.chartData[1].data = data.data
          $this.chartData[1].xAxis = {axisLabel:{ interval:'auto',rotate:'45'}}
          document.getElementById($this.chartData[1].id).removeAttribute("_echarts_instance_")
          showLineCharts($this.chartData[1])
        })
      },
      rundisplay_air_avg() {
        let $this = this
        rundisplay_air_avg().then(function(data) {
          console.log(3333333,data)
          $this.chartData[2].id = 'chart03'

          for(let i = 0,j = data.data.length;i<j;i+=1){
            data.data[i].type = 'bar'
            data.data[i].stack = '总'
          }

          $this.chartData[2].data = data.data
          $this.chartData[2].name = data.name
          $this.chartData[2].yAxis = [{max : 24,splitNumber : 4}]
          $this.chartData[2].xAxis = {axisLabel:{ interval:'auto',rotate:'45'}}
          $this.chartData[2].color = ["rgb(91,243,134)","#0098d9","yellow","#e6b600","#c12e34","darkred"]
          document.getElementById($this.chartData[2].id).removeAttribute("_echarts_instance_")
          showLineCharts($this.chartData[2])
        })
      },
    },
    beforeDestroy() {

    }
  }
</script>

<style lang="scss" scoped>
.environment_air{
  margin-top: 80px !important;
  ul {
    padding: 0;
    li {
      width: 98%;
      list-style: none;
      margin-bottom: 20px;
      color: white;
      .environment_air_title{
        background: url("../../../../static/img/common/arrow_right.png") no-repeat left;
        padding-left: 30px;
        font-size: 22px;
        margin-bottom: 10px;
      }
      .environment_air_mge{
        padding-bottom: 10px;
        padding-left: 10px;
        .environment_air_mge_value{
          color: #ff9000;
          margin: 0 15px;
        }
      }
    }
  }
}
</style>

<style lang="scss">
  .environment_air{
    ul{
      li{
        .el-table th, .el-table tr {
          background-color: transparent;
        }
        .el-table--enable-row-hover .el-table__body tr:hover>td{
          background-color: #212e3e !important;
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
