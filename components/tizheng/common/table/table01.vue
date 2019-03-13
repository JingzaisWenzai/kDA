<template>
  <div class="faren_table">
    <div class="j_a">
      <img src="../../../../assets/img/cstz_8.png"/>{{tableData.name}}
    </div>
    <el-table
      :data="tableData.data"
      height="220"
      style="width: 100%">
      <el-table-column v-for="(item,index) in tableHead"
                       :key="index"
                       :prop="item.prop"
                       :label="item.label"
                       :width="item.width!==undefined?item.width:''">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: 'table01',
    props: ['tableHead', 'tableData'],
    components: {},
    data() {
      return {
        // tableHead: [
        //   {
        //     prop: 'date',
        //     label: '日期',
        //     width: '180'
        //   },
        //   {
        //     prop: 'name',
        //     label: '姓名',
        //     width: '180'
        //   },
        //   {
        //     prop: 'address',
        //     label: '地址'
        //   }
        // ],
        // tableData: [
        //   {
        //     date: '2016-05-02',
        //     name: '王小虎',
        //     address: '上海市普陀区金沙江路 1518 弄'
        //   }, {
        //     date: '2016-05-04',
        //     name: '王小虎',
        //     address: '上海市普陀区金沙江路 1517 弄'
        //   }, {
        //     date: '2016-05-01',
        //     name: '王小虎',
        //     address: '上海市普陀区金沙江路 1519 弄'
        //   }, {
        //     date: '2016-05-03',
        //     name: '王小虎',
        //     address: '上海市普陀区金沙江路 1516 弄'
        //   }]
      }
    },
    mounted() {
      console.log(this.tableData)
    },
    methods: {},
    beforeDestroy() {

    }
  }
</script>

<style lang="scss" scoped>
  .j_a { /*width:405px;*/
    height: 40px;
    line-height: 40px;
    text-align: left;
    margin: 0px auto 20px;
    overflow: hidden;
    font-size: 24px; /*font-size: 30px;*/
    color: #ffffff;
    img {
      padding-right: 10px;
    }
  }
</style>

<style lang="scss">
  .faren_table {
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
</style>
