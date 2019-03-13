<template>
  <div class="hospitalPop">
    <div class="title">{{name}}</div>
    <span class="close" @click="closeDetailPop"></span>
    <el-tabs v-model="activeName" @tab-click="handleClick" class="myTabs2">
      <el-tab-pane label="门诊信息" name="first">
        <my-table :tableData="tableData1" :tableHeader="tableHeader1"></my-table>
      </el-tab-pane>
      <el-tab-pane label="住院信息" name="second">
        <my-table :tableData="tableData2" :tableHeader="tableHeader2"></my-table>
      </el-tab-pane>
      <el-tab-pane label="卫生人员" name="third">
        <my-table :tableData="tableData3" :tableHeader="tableHeader3"></my-table>
      </el-tab-pane>
      <el-tab-pane label="科室信息" name="fourth">
        <my-table :tableData="tableData4" :tableHeader="tableHeader4"></my-table>
      </el-tab-pane>
      <el-tab-pane label="特殊病种" name="five">
        <my-table :tableData="tableData5" :tableHeader="tableHeader5"></my-table>
      </el-tab-pane>
    </el-tabs>
    <el-pagination
      class="myPagination"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageData[activeName].pageNum"
      :page-sizes="[8, 20, 50, 100]"
      :page-size="pageData[activeName].pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pageData[activeName].total">
    </el-pagination>
  </div>
</template>

<script>
  import myTable from './myTable'
  import {
    outpatient_information,
    hospitalization_information,
    health_personnel,
    department_information,
    special_diseases
  } from '../../api/weiji'

  export default {
    name: 'hospitalPop',
    // props: ['ORG_CODE'],
    components: {
      myTable
    },
    data() {
      return {
        // ORG_CODE: 455744030,
        activeName: 'first',
        tableData1: [],
        tableHeader1: [
          { name: '统计日期', value: 'busi_DATE', width: 'auto' },
          { name: '科室', value: 'dept_NAME', width: 'auto' },
          { name: '预约人次', value: 'app_NO', width: 'auto' },
          { name: '门急诊人次', value: 'emergency_EMERGENCY_NO', width: 'auto' },
          { name: '急诊人次', value: 'emergency_NO', width: 'auto' },
          { name: '门诊人次', value: 'outpatient_NO', width: 'auto' }
        ],
        tableData2: [],
        tableHeader2: [
          { name: '统计日期', value: 'busi_DATE', width: 'auto' },
          { name: '科室', value: 'dept_NAME', width: 'auto' },
          { name: '住院人次', value: 'visits_TIMES', width: 'auto' },
          { name: '出院人次', value: 'leave_H_NO', width: 'auto' },
          { name: '在院人次', value: 'in_H_NO', width: 'auto' },
          { name: '医保在院人次', value: 'm_IN_H_NO', width: 'auto' }
        ],
        tableData3: [],
        tableHeader3: [
          { name: '年龄', value: 'age', width: '60' },
          { name: '性别', value: 'sex', width: '60' },
          { name: '学历', value: 'degree_CODE', width: 'auto' },
          { name: '编制情况', value: 'authorized_SIZE', width: 'auto' },
          { name: '执业类别', value: 'doctor_TYPE', width: 'auto' },
          { name: '科室', value: 'dept_NAME', width: 'auto' },
          { name: '专业技术职务', value: 'cszylbdm', width: 'auto' }
        ],
        tableData4: [],
        tableHeader4: [
          { name: '科室名称', value: 'dept_NAME', width: 'auto' },
          { name: '科室编号', value: 'dept_CODE', width: 'auto' },
          { name: '床位数', value: 'bed', width: 'auto' },
          { name: '空闲床位数', value: 'free_bed', width: 'auto' },
          { name: '举办主体', value: 'org_NAME', width: 'auto' }
        ],
        tableData5: [],
        tableHeader5: [
          { name: '年龄', value: 'age', width: 'auto' },
          { name: '性别', value: 'sex_CODE', width: '50' },
          { name: '特殊病种类别', value: 'diag_TYPE', width: 'auto' },
          { name: '诊断类型', value: 'diag_TYPE_CODE', width: '80' },
          { name: '诊断科室', value: 'dept_NAME', width: '80' },
          { name: '诊断时间', value: 'diag_TIME', width: 'auto' },
          { name: '机构内部诊断名称', value: 'diag_NAME_INHOS', width: '150' }
        ],
        // pageNum:1,
        // pageSize:8,
        // total:0,
        pageData: {
          first: {
            pageNum: 1,
            pageSize: 8,
            total: 0
          },
          second: {
            pageNum: 1,
            pageSize: 8,
            total: 0
          },
          third: {
            pageNum: 1,
            pageSize: 8,
            total: 0
          },
          fourth: {
            pageNum: 1,
            pageSize: 8,
            total: 0
          },
          five: {
            pageNum: 1,
            pageSize: 8,
            total: 0
          }
        }
      }
    },
    watch: {
      ORG_CODE: {
        handler: function(val, oldVal) {
          this.activeName = 'first'
          this.tableData1 = []
          this.tableData2 = []
          this.tableData3 = []
          this.tableData4 = []
          this.tableData5 = []
          this.pageData = {
            first: {
              pageNum: 1,
              pageSize: 8,
              total: 0
            },
            second: {
              pageNum: 1,
              pageSize: 8,
              total: 0
            },
            third: {
              pageNum: 1,
              pageSize: 8,
              total: 0
            },
            fourth: {
              pageNum: 1,
              pageSize: 8,
              total: 0
            },
            five: {
              pageNum: 1,
              pageSize: 8,
              total: 0
            }
          }
          this.handleClick()
        },
        deep: true
      }
    },
    computed:{
      name(){
        return this.$store.state.detailMessageName
      },
      layerId(){
        return this.$store.state.detailMessageNodeId
      },
      ORG_CODE(){
        return this.$store.state.detailMessageId
      }
    },
    mounted() {
      this.handleClick()
    },
    methods: {
      closeDetailPop() {
        // this.showPop = false
        this.$store.state.ShowHospital ='no'
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`)
        this.pageData[this.activeName].pageSize = val
        this.handleClick()
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`)
        this.pageData[this.activeName].pageNum = val
        this.handleClick()
      },
      handleClick() {
        let params = {
          pageNum: this.pageData[this.activeName].pageNum,
          pageSize: this.pageData[this.activeName].pageSize, ORG_CODE: this.ORG_CODE
        }

        switch (this.activeName) {
          case 'first':
            this.getOutpatient_information(params)
            break
          case 'second':
            this.getHospitalization_information(params)
            break
          case 'third':
            this.getHealth_personnel(params)
            break
          case 'fourth':
            this.getDepartment_information(params)
            break
          case 'five':
            this.getSpecial_diseases(params)
            break
          default:
            break
        }
      },
      getOutpatient_information(params) {
        let $this = this
        outpatient_information(params).then(function(data) {
          $this.pageData[$this.activeName].total = data.total
          $this.tableData1 = data.list
        })
      },
      getHospitalization_information(params) {
        let $this = this
        hospitalization_information(params).then(function(data) {
          $this.pageData[$this.activeName].total = data.total
          $this.tableData2 = data.list
        })
      },
      getHealth_personnel(params) {
        let $this = this
        health_personnel(params).then(function(data) {
          $this.pageData[$this.activeName].total = data.total
          $this.tableData3 = data.list
        })
      },
      getDepartment_information(params) {
        let $this = this
        department_information(params).then(function(data) {
          $this.pageData[$this.activeName].total = data.total
          $this.tableData4 = data.list
        })
      },
      getSpecial_diseases(params) {
        let $this = this
        special_diseases(params).then(function(data) {
          $this.pageData[$this.activeName].total = data.total
          $this.tableData5 = data.list
        })
      }
    },
    beforeDestroy() {

    }
  }
</script>

<style lang="scss" scoped>
  .hospitalPop {
    width: 720px;
    height: 400px;
    background-color: rgba(2, 22, 35, 0.8);
    box-shadow: 0 0 5px #1c609d;
    border: 1px solid #1c609d;
    border-radius: 5px;
    z-index: 3;
    padding: 10px;
    .title {
      height: 30px;
      color: #196db4;
      padding-left: 30px;
      line-height: 30px;
      background: url("../../static/img/aqyhPop/address.png") no-repeat left;
      width: 90%;
      display: inline-block;
    }
    .close {
      background: url("../../static/img/aqyhPop/close.png");
      width: 20px;
      height: 20px;
      display: inline-block;
      float: right;
      cursor: pointer;
    }
  }
</style>
<style lang="scss">
  .hospitalPop {
    .myTabs2 {
      z-index: 88;
      .el-tabs__item {
        /*font-size: 20px;*/
        color: white;
      }
      .el-tabs__item.is-active {
        color: #409EFF;
      }
      .el-tabs__item:hover {
        color: #409EFF;
      }
    }
    .myPagination {
      height: 40px;
      margin-top: 10px;
      .el-pagination__total {
        color: white;
      }
      .el-pagination__jump {
        color: white;
      }
    }
  }
</style>
