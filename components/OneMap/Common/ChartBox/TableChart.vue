<template>
  <!--<section class="tablechart_container" :id="tableChartId">-->
  <section class="tablechart_container">
    <!--<table>-->
    <!--<thead>-->
    <!--<tr><th v-for="(item,index) in ohead" :key="index">{{item}}</th></tr>-->
    <!--</thead>-->
    <!--<tbody>-->
    <!--<tr v-for="(item,index) in theData" :key="index"><td v-for="(a,c) in item.data" :key='c'>{{a.value}}</td></tr>-->
    <!--</tbody>-->
    <!--</table>-->

    <el-table
      :data="tableData"
      style="width: 100%;"
      max-height="220"
      :span-method="objectSpanMethod">
      <el-table-column
        prop="riverName"
        label="河流名称"
        width="120">
      </el-table-column>
      <el-table-column label="区级河长">
        <el-table-column
          prop="area_duties"
          label="河长相应职务"
          width="120">
        </el-table-column>
        <el-table-column
          label="姓名"
          prop="area_name"
          width="80">
        </el-table-column>
      </el-table-column>
      <el-table-column label="街道级河长">
        <el-table-column
          prop="street_duties"
          label="河长相应职务"
          width="120">
        </el-table-column>
        <el-table-column
          label="姓名"
          prop="street_name"
          width="80">
        </el-table-column>
      </el-table-column>
      <el-table-column
        prop="note"
        label="备注"
        width="120">
      </el-table-column>
    </el-table>
  </section>
</template>
<script>
  export default {
    props: ['chartData'],
    data() {
      return {
        // tableChartId:'',
        // ohead:[],
        // odata: [],
        // barChartId:'',
        // theData:[
        //   {name:'深圳河',data:[
        //     {name:'河段',value:'深圳河'},{name:'河长',value:'张三'},{name:'联系方式',value:'189****'}
        //   ]},
        //   {name:'深圳河',data:[
        //     {name:'河段',value:'深圳河'},{name:'河长',value:'张三'},{name:'联系方式',value:'189****'}
        //   ]},
        //   {name:'深圳河',data:[
        //     {name:'河段',value:'深圳河'},{name:'河长',value:'张三'},{name:'联系方式',value:'189****'}
        //   ]},
        //   {name:'深圳河',data:[
        //     {name:'河段',value:'深圳河'},{name:'河长',value:'张三'},{name:'联系方式',value:'189****'}
        //   ]},
        //   {name:'深圳河',data:[
        //     {name:'河段',value:'深圳河'},{name:'河长',value:'张三'},{name:'联系方式',value:'189****'}
        //   ]},
        //   {name:'深圳河',data:[
        //     {name:'河段',value:'深圳河'},{name:'河长',value:'张三'},{name:'联系方式',value:'189****'}
        //   ]}
        // ],
        tableData: [
          {
            riverName: '2016-05-03',
            area_duties: '王小虎',
            area_name: '上海',
            street_duties: '王小虎',
            street_name: '上海',
            note: '普陀区'
          },
          {
            riverName: '2016-05-03',
            area_duties: '王小虎',
            area_name: '上海',
            street_duties: '王小虎',
            street_name: '上海',
            note: '普陀区'
          },
          {
            riverName: '2016-05-03',
            area_duties: '王小虎',
            area_name: '上海',
            street_duties: '王小虎',
            street_name: '上海',
            note: '普陀区'
          },
          {
            riverName: '2016-05-03',
            area_duties: '王小虎',
            area_name: '上海',
            street_duties: '王小虎',
            street_name: '上海',
            note: '普陀区'
          },
          {
            riverName: '2016-05-03',
            area_duties: '王小虎',
            area_name: '上海',
            street_duties: '王小虎',
            street_name: '上海',
            note: '普陀区'
          },
          {
            riverName: '2016-05-03',
            area_duties: '王小虎',
            area_name: '上海',
            street_duties: '王小虎',
            street_name: '上海',
            note: '普陀区'
          },
          {
            riverName: '2016-05-03',
            area_duties: '王小虎',
            area_name: '上海',
            street_duties: '王小虎',
            street_name: '上海',
            note: '普陀区'
          },
          {
            riverName: '2016-05-03',
            area_duties: '王小虎',
            area_name: '上海',
            street_duties: '王小虎',
            street_name: '上海',
            note: '普陀区'
          }
        ],
        dataObj:[
          {
            riverName: '2016-05-03',
            area_duties: '王小虎',
            area_name: '上海',
            street:[
              {
                street_duties: '王小虎',
                street_name: '上海'
              },
              {
                street_duties: '王小虎',
                street_name: '上海'
              },
              {
                street_duties: '王小虎',
                street_name: '上海'
              },
              {
                street_duties: '王小虎',
                street_name: '上海'
              }
            ],
            note: '普陀区'
          },
          {
            riverName: '2016-05-03',
            area_duties: '王小虎',
            area_name: '上海',
            street:[
              {
                street_duties: '王小虎',
                street_name: '上海'
              },
              {
                street_duties: '王小虎',
                street_name: '上海'
              }
            ],
            note: '普陀区'
          },
          {
            riverName: '2016-05-03',
            area_duties: '王小虎',
            area_name: '上海',
            street:[
              {
                street_duties: '王小虎',
                street_name: '上海'
              },
              {
                street_duties: '王小虎',
                street_name: '上海'
              },
              {
                street_duties: '王小虎',
                street_name: '上海'
              }
            ],
            note: '普陀区'
          },
          {
            riverName: '2016-05-03',
            area_duties: '王小虎',
            area_name: '上海',
            street:[
              {
                street_duties: '王小虎',
                street_name: '上海'
              }
            ],
            note: '普陀区'
          },
          {
            riverName: '2016-05-03',
            area_duties: '王小虎',
            area_name: '上海',
            street:[
              {
                street_duties: '王小虎',
                street_name: '上海'
              },
              {
                street_duties: '王小虎',
                street_name: '上海'
              }
            ],
            note: '普陀区'
          },
          {
            riverName: '2016-05-03',
            area_duties: '王小虎',
            area_name: '上海',
            street:[
              {
                street_duties: '王小虎',
                street_name: '上海'
              }
            ],
            note: '普陀区'
          },
          {
            riverName: '2016-05-03',
            area_duties: '王小虎',
            area_name: '上海',
            street:[
              {
                street_duties: '王小虎',
                street_name: '上海'
              },
              {
                street_duties: '王小虎',
                street_name: '上海'
              },
              {
                street_duties: '王小虎',
                street_name: '上海'
              },
              {
                street_duties: '王小虎',
                street_name: '上海'
              },
              {
                street_duties: '王小虎',
                street_name: '上海'
              }
            ],
            note: '普陀区'
          }
        ]
      }
    },
    mounted() {
      // this.tableChartId =   this.chartData.oid;
      // let odata = this.chartData.data;
      // for(let i=0;i<odata[0].data.length;i++){
      //   let name = odata[0].data[i].name || '';
      //   this.ohead.push(name);
      // }

      this.tableData = this.checkData(this.dataObj)
    },
    methods: {
      checkData(data){
        let temp = [],length = -1
        for(let i = 0,j = data.length;i<j;i+=1){
          for(let n = 0,m = data[i].street.length;n<m;n+=1){
            temp.push(
              {
                riverName: data[i].riverName,
                area_duties: data[i].area_duties,
                area_name: data[i].area_name,
                street_duties: data[i].street[n].street_duties,
                street_name: data[i].street[n].street_name,
                note: data[i].note,
                column:[]
              }
            )
            length++
          }
          temp[temp.length-data[i].street.length].column = [length,data[i].street.length]
        }
        return temp
      },
      objectSpanMethod({ row, column, rowIndex, columnIndex }) {
        if (columnIndex === 0 || columnIndex === 1 || columnIndex === 2 || columnIndex === 5) {
          if (this.tableData[rowIndex].column.length>0) {
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
    }
  }
</script>
<style scoped>
  /*导航栏的特殊样式*/
  ::-webkit-scrollbar {
    width: 16px !important;
    height: 16px !important;
  }

  ::-webkit-scrollbar-track,
  ::-webkit-scrollbar-thumb {
    border-radius: 999px !important;
    border: 4px solid transparent !important;
  }

  ::-webkit-scrollbar-track {
    box-shadow: 1px 1px 5px rgba(185, 165, 150, .2) inset !important;
  }

  ::-webkit-scrollbar-thumb {
    min-height: 20px !important;
    background-clip: content-box !important;
    box-shadow: 0 0 0 5px rgba(25, 109, 180, 0.5) inset !important;
  }

  ::-webkit-scrollbar-corner { /*background:transparent;*/
  }

  .tablechart_container {
    width: 100%;
    height: 100%;
    overflow: hidden auto;
  }

  /*.tablechart_container table {*/
    /*display: table;*/
    /*width: 90%;*/
    /*margin: 0 auto;*/
    /*height: auto;*/
    /*text-align: center;*/
  /*}*/

  /*.tablechart_container table thead tr,*/
  /*.tablechart_container table thead,*/
  /*.tablechart_container table tbody,*/
  /*.tablechart_container table tbody tr {*/
    /*width: 100%;*/
    /*height: auto;*/
  /*}*/

  /*.tablechart_container table thead tr th {*/
    /*color: #ffffff;*/
    /*font-size: 20px;*/
    /*padding: 15px 0;*/
    /*border-width: 0;*/
    /*border-bottom: 1px solid #0d436d;*/
    /*font-weight: 500;*/
  /*}*/

  /*.tablechart_container table tbody tr td {*/
    /*color: #a6d6ff;*/
    /*font-size: 18px;*/
    /*border-width: 0;*/
    /*padding: 10px 0 5px 0;*/
    /*font-weight: 500;*/
  /*}*/
</style>
<style lang="scss">
  .tablechart_container{
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
</style>
