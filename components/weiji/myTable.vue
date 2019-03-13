<template>
  <el-table
    :data="tableData"
    height="250"
    style="width: 100%">
    <el-table-column
      v-for="(item,index) in tableHeader"
      :key="index"
      :prop="item.value"
      :label="item.name"
      :width="item.width">
    </el-table-column>
    <!--<el-table-column-->
      <!--prop="date"-->
      <!--label="日期"-->
      <!--width="180">-->
    <!--</el-table-column>-->
    <!--<el-table-column-->
      <!--prop="name"-->
      <!--label="姓名"-->
      <!--width="180">-->
    <!--</el-table-column>-->
    <!--<el-table-column-->
      <!--prop="address"-->
      <!--label="地址">-->
    <!--</el-table-column>-->
  </el-table>
</template>

<script>
  export default {
    name: 'myTable',
    props: ['tableData','tableHeader'],
    components: {},
    data() {
      return {}
    },
    mounted() {

    },
    methods: {},
    beforeDestroy() {

    }
  }
</script>

<style lang="scss" scoped>

</style>
