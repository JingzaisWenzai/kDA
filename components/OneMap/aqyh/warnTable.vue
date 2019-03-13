<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%"
      max-height="850"
      highlight-current-row
      @current-change="handleCurrentTableChange"
      @filter-change="filterTagTable"
    >
      <el-table-column
        prop="num"
        label="序号"
        width="60">
      </el-table-column>
      <el-table-column
        prop="place_name"
        label="类别"
        width="80"
        column-key="type"
        :filters="type"
        :filter-multiple='false'
        :filter-method="filterTag"
        filter-placement="bottom-end">
      </el-table-column>
      <el-table-column
        prop="name"
        label="场所名称"
        width="120">
      </el-table-column>
      <el-table-column
        prop="eventContent"
        label="事件描述"
        width="190">
      </el-table-column>
      <el-table-column
        prop="eventTime"
        label="发生时间"
        width="110">
      </el-table-column>
      <el-table-column
        prop="state"
        label="事件状态"
        width="80">
      </el-table-column>
      <el-table-column
        label="巡查图片"
        width="100">
        <template slot-scope="scope">
          <a style="cursor: pointer;font-size: 14px;text-decoration: underline;color: #43d3ff;" @click="showImag(scope.row.picture)">{{'查看（'+scope.row.picture.split('、').length+'）张'}}</a>
        </template>
      </el-table-column>
      <el-table-column
        label="处置"
        width="60">
        <template slot-scope="scope">
          <a style="cursor: pointer;font-size: 14px;text-decoration: underline;color: #43d3ff;" @click="showImag(scope.row.systemId)">详情</a>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="mypage"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    <a class="close" @click="closeTableList"></a>
  </div>
</template>

<script>
  import bus from '../../../assets/js/main'
  import showImgAndCheckOutEvent from '../../../components/common/showImgAndCheckOutEvent'
  import {getWarnList} from '../../../api/secapi'
  import {DateFormat} from '../../../utils/validate'
  import openFeatureLayerPopup from '../../common/mapTools'

  export default {
    name: 'warnTable',
    props: ['dateArray'],
    mixins:[showImgAndCheckOutEvent,openFeatureLayerPopup],
    components: {},
    data() {
      return {
        tableData: [
          // {
          //   num: '序号',
          //   name: '场所名称',
          //   eventContent: '事件描述',
          //   eventTime: '发生时间',
          //   state: '事件状态',
          //   picture: '查看（2张）',
          //   systemId: '处置'
          // },
          // {
          //   num: '序号',
          //   name: '场所名称',
          //   eventContent: '事件描述',
          //   eventTime: '发生时间',
          //   state: '事件状态',
          //   picture: '查看',
          //   systemId: '处置'
          // },
          // {
          //   num: '序号',
          //   name: '场所名称',
          //   eventContent: '事件描述',
          //   eventTime: '发生时间',
          //   state: '事件状态',
          //   picture: '查看',
          //   systemId: '处置'
          // },
          // {
          //   num: '序号',
          //   name: '场所名称',
          //   eventContent: '事件描述',
          //   eventTime: '发生时间',
          //   state: '事件状态',
          //   picture: '查看',
          //   systemId: '处置'
          // },{
          //   num: '序号',
          //   name: '场所名称',
          //   eventContent: '事件描述',
          //   eventTime: '发生时间',
          //   state: '事件状态',
          //   picture: '查看（2张）',
          //   systemId: '处置'
          // },
          // {
          //   num: '序号',
          //   name: '场所名称',
          //   eventContent: '事件描述',
          //   eventTime: '发生时间',
          //   state: '事件状态',
          //   picture: '查看',
          //   systemId: '处置'
          // },
          // {
          //   num: '序号',
          //   name: '场所名称',
          //   eventContent: '事件描述',
          //   eventTime: '发生时间',
          //   state: '事件状态',
          //   picture: '查看',
          //   systemId: '处置'
          // },
          // {
          //   num: '序号',
          //   name: '场所名称',
          //   eventContent: '事件描述',
          //   eventTime: '发生时间',
          //   state: '事件状态',
          //   picture: '查看',
          //   systemId: '处置'
          // },{
          //   num: '序号',
          //   name: '场所名称',
          //   eventContent: '事件描述',
          //   eventTime: '发生时间',
          //   state: '事件状态',
          //   picture: '查看（2张）',
          //   systemId: '处置'
          // },
          // {
          //   num: '序号',
          //   name: '场所名称',
          //   eventContent: '事件描述',
          //   eventTime: '发生时间',
          //   state: '事件状态',
          //   picture: '查看',
          //   systemId: '处置'
          // },
          // {
          //   num: '序号',
          //   name: '场所名称',
          //   eventContent: '事件描述',
          //   eventTime: '发生时间',
          //   state: '事件状态',
          //   picture: '查看',
          //   systemId: '处置'
          // },
          // {
          //   num: '序号',
          //   name: '场所名称',
          //   eventContent: '事件描述',
          //   eventTime: '发生时间',
          //   state: '事件状态',
          //   picture: '查看',
          //   systemId: '处置'
          // }
        ],
        currentPage:1,
        pageSize:10,
        total:0,
        query:{},
        type:[],
        filterTypes:{}
      }
    },
    mounted() {
      this.getList()
    },
    watch:{
      dateArray:{
        handler(val,old){
          this.getList()
        },
        deep:true
      }
    },
    methods: {
      //获取数据
      getList(params){
        let $this = this
        if(params === undefined){
          this.query = {
            startTime:this.dateArray[0],
            endTime:this.dateArray[1],
            pageNum:this.currentPage,
            pageSize:this.pageSize
          }
        }else {
          this.query = params
        }
        getWarnList(this.query).then(function(data) {
          $this.total = data.data.total
          $this.tableData = data.data.list
          $this.type = []
          for (let i in data.data.type) {
            $this.type.push({text:i,value:data.data.type[i]})
          }
          for(let i = 0,j = $this.tableData.length;i<j;i+=1){
            $this.tableData[i].num = ($this.currentPage-1)*10+i+1
            $this.tableData[i].eventTime = DateFormat($this.tableData[i].eventTime,"yyyy-MM-dd hh:mm:ss")
          }
        })
      },
      //列表单行操作
      handleCurrentTableChange(val){
        // console.log(val)
        if(val !== null){
          this.openFeatureLayerPopup(val.layerid,val.id)
        }
      },
      //关闭弹框
      closeTableList(){
        bus.$emit('showWarnTable',false)
      },
      //切换每页展示条数
      handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
        this.pageSize = val
        this.getList()
      },
      //翻页
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
        this.currentPage = val
        this.getList()
      },
      //类别筛选
      filterTag(value, row) {
        // console.log(value,row)
        // return row.tag === value;
        return true;
      },
      filterTagTable(filters){
        console.log(filters)
        this.currentPage = 1
        let params = {
          startTime:this.query.startTime,
          endTime:this.query.endTime,
          pageNum:this.query.pageNum,
          pageSize:this.query.pageSize
        }
        if(filters.type.length === 0){

        }else {
          params.placeType = filters.type.join(',')
        }
        this.query = params
        this.getList(this.query)
      }
    },
    beforeDestroy() {

    }
  }
</script>

<style lang="scss" scoped>
  /deep/ .el-table__body tr.current-row>td {
    background-color: #212e3e;
  }
  /deep/ .el-table__row{
    cursor: pointer;
  }
.mypage{
  margin-top: 5px;
  /deep/ .el-pagination__total{
    color:white;
  }
  /deep/ .el-pagination__jump{
    color: white;
  }
}
.close{
  background: url("../../../static/img/aqyhPop/close.png") no-repeat;
  width: 20px;
  height: 20px;
  display: inline-block;
  position: absolute;
  top: 5px;
  right: 10px;
  cursor: pointer;
}
</style>

<style>
  /**
  table 筛选样式
   */
  .el-table-filter {
    box-sizing: border-box;
    margin: 2px 0;
    background-color: rgba(2, 22, 35, 0.8);
    box-shadow: 0 0 5px #1c609d;
    border: 1px solid #1c609d;
    border-radius: 5px;
  }
  /*.el-checkbox{*/
    /*color: white;*/
  /*}*/
  /*.el-table-filter__bottom button.is-disabled{*/
    /*color: white;*/
  /*}*/
  /*.el-table-filter__bottom button{*/
    /*color: white;*/
  /*}*/

  /**
  单选
   */
  .el-table-filter__list-item:hover{
    background-color: #212e3e;
  }
  .el-table-filter__list-item{
    color:#fff
  }
  .el-table-filter__list-item.is-active {
     background-color: #212e3e;
    color: #409EFF;
  }
</style>
