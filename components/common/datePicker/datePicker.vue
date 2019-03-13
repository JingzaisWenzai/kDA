<template>
  <el-date-picker
    v-model="rangeTime"
    class="el-date-picker"
    type="daterange"
    :picker-options="pickerOptions"
    format="yyyy-MM-dd"
    value-format="yyyy-MM-dd"
    range-separator="至"
    start-placeholder="开始日期"
    end-placeholder="结束日期"
    :default-value="defaultValue"
    @change="dateChangeAction"
  >
  </el-date-picker>
</template>

<script>
  import bus from '../../../assets/js/main'
  export default {
    name: 'datePicker',
    props: [],
    components: {},
    data() {
      return {
        rangeTime:[],
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now() - 8.64e6
          }
        },
        defaultValue:(function () {
          return (new Date()).getTime()-30*24*60*60*1000
        })(),
      }
    },
    mounted() {

    },
    methods: {
      dateChangeAction(date){
        bus.$emit('dateChange',date)
      }
    },
    beforeDestroy() {

    }
  }
</script>

<style lang="scss" scoped>
  .el-date-picker{
    /*width: 270px;*/
    /*height: 33px;*/
    /*line-height: 30px;*/
    box-shadow: 0 0 5px #1c609d;
    border: 1px solid #1c609d;
    background-color: rgba(2, 22, 35, 0.8);
    color: #0098d9;
    /deep/ .el-range__icon {
      /*line-height: 22px;*/
    }
    /deep/ .el-range-separator {
      /*line-height: 22px!important;*/
      /*width: auto!important;*/
      /*color: #0098d9!important;*/
      color: white;
    }
    /deep/ .el-range-input{
      color: #0098d9;
      background-color: transparent;
      font-size: 16px;
      font-weight: bold;
    }
  }
</style>
<style>
  .el-picker-panel {
    color: white;
    background-color: rgba(2, 22, 35, 0.8);
    box-shadow: 0 0 5px #1c609d;
    border: 1px solid #1c609d;
    border-radius: 5px;
  }
  .el-icon-date:before {
    color: white;
  }
  .el-date-table th {
    color: white;
  }
  .el-date-table td span{
    font-size: 16px;
  }
  .el-date-table td.disabled div {
    background-color: #212e3e;
  }
  .el-date-table td.in-range div, .el-date-table td.in-range div:hover, .el-date-table.is-week-mode .el-date-table__row.current div, .el-date-table.is-week-mode .el-date-table__row:hover div {
    background-color: #212e3e;
  }
  .el-date-range-picker__content.is-left {
    box-shadow: 0 0 5px #1c609d;
    border-right: 1px solid rgba(2, 22, 35, 0.8);
  }
</style>
