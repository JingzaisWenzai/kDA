<template>
  <el-table
    :data="tableData"
    border
    max-height="750"
    style="width: 100%">
    <el-table-column
      prop="name1"
      label="区域"
      width="110">
    </el-table-column>
    <el-table-column
      label="职能"
      width="110"
    >
      <template slot-scope="scope">
        <span :style="{cursor: type === 'editor'?'pointer':'default'}" @click="changeEditor(scope,$event)">{{scope.row.name2}}</span>
        <el-input style="display: none;" v-model="scope.row.name2" placeholder="请输入内容" suffix-icon="el-icon-edit" @blur="loseBlur(scope,$event)"></el-input>
      </template>
    </el-table-column>
    <el-table-column
      label="姓名">
      <template slot-scope="scope">
        <span  :style="{cursor: type === 'editor'?'pointer':'default'}" @click="changeEditor(scope,$event)">{{scope.row.name3}}</span>
        <el-input style="display: none;" v-model="scope.row.name3" placeholder="请输入内容" suffix-icon="el-icon-edit" @blur="loseBlur(scope,$event)"></el-input>
      </template>
    </el-table-column>
    <el-table-column
      label="职务">
      <template slot-scope="scope">
        <span  :style="{cursor: type === 'editor'?'pointer':'default'}" @click="changeEditor(scope,$event)">{{scope.row.name4}}</span>
        <el-input style="display: none;" v-model="scope.row.name4" placeholder="请输入内容" suffix-icon="el-icon-edit" @blur="loseBlur(scope,$event)"></el-input>
      </template>
    </el-table-column>
    <el-table-column
      label="联系电话"
      width="120">
      <template slot-scope="scope">
        <span  :style="{cursor: type === 'editor'?'pointer':'default'}" @click="changeEditor(scope,$event)">{{scope.row.name5}}</span>
        <el-input style="display: none;" v-model="scope.row.name5" placeholder="请输入内容" suffix-icon="el-icon-edit" @blur="loseBlur(scope,$event)"></el-input>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    name: 'table',
    components: {},
    props: ['tableData','type'],
    data() {
      return {}
    },
    mounted() {

    },
    beforeDestroy() {

    },
    methods: {
      changeEditor(data,event){
        if(this.type === 'editor'){
          event.target.style.display = 'none'
          event.target.parentNode.children[1].style.display = ''
          event.target.parentNode.children[1].children[0].focus()
          event.target.parentNode.children[1].children[0].style.color = 'white'
        }
      },
      loseBlur(data,event){
        if(this.type === 'editor'){
          event.target.parentNode.style.display = 'none'
          event.target.parentNode.parentNode.children[0].style.display = ''
          event.target.parentNode.parentNode.children[0].style.color = '#409EFF'
          this.$emit('editorTable',this.tableData)
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  /deep/ .el-input__inner {
    border: none;
    padding: 0 10px 0 0;
    color: #409EFF;
    background-color:transparent;
    cursor: text;
  }
  /deep/ .el-input.is-disabled .el-input__inner {
    background-color: transparent;
    border: none;
    color: #409EFF;
  }
  /deep/ .el-input__suffix {
    right: 0;
  }
  /deep/ .el-table__row .cell {
    padding-right: 0;
  }
</style>
