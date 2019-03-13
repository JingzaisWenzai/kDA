<template>
  <div class="setUpDutyTable">
    <div class="title">显示设置</div>
    <div class="setUp">
      <el-form ref="form" :model="form" label-width="150px">
        <el-form-item label="展示区域：">
          <el-checkbox-group v-model="form.type">
            <el-checkbox label="指挥中心" name="type"></el-checkbox>
            <el-checkbox label="信访（应急）" name="type"></el-checkbox>
            <el-checkbox label="园岭街道" name="type"></el-checkbox>
            <el-checkbox label="福田街道" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="岗位展示：">
          <el-checkbox-group v-model="form.type">
            <el-checkbox label="值班处领导" name="type"></el-checkbox>
            <el-checkbox label="值班科长" name="type"></el-checkbox>
            <el-checkbox label="值班员" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="最多展示值班员数：">
          <el-input v-model="form.name"></el-input>    人
        </el-form-item>
        <el-form-item label="展示字段：">
          <el-checkbox-group v-model="form.type">
            <el-checkbox label="姓名" name="type"></el-checkbox>
            <el-checkbox label="职务" name="type"></el-checkbox>
            <el-checkbox label="联系电话" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="是否滚动播放">
          <el-select v-model="form.region" placeholder="请选择">
            <el-option label="是" value="shanghai"></el-option>
            <el-option label="否" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="showDutyTable = !showDutyTable">查看预览</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="showDetail">
      <div style="display: inline-block;width: 60%;margin-bottom: 10px;font-size: 18px;color: white;">值班表预览：</div><span class="close" @click="openSetUpDutyTable(false)"></span>
      <div style="font-size: 20px;font-weight:bold;margin-bottom: 10px;">区值班领导：白巅峰</div>
      <my-table :type="'editor'" :tableData="tableData" @editorTable="editorTable"></my-table>
      <div class="pageSelect">
        <el-button-group>
          <el-button size="small" type="primary" plain icon="el-icon-arrow-left">查看上一天</el-button>
          <el-button size="small" type="primary" plain>查看下一天<i class="el-icon-arrow-right el-icon--right"></i></el-button>
        </el-button-group>
      </div>
    </div>
    <el-button type="primary" @click="onSubmit">确定</el-button>
    <div v-if="showDutyTable" style="position: absolute;top: 0px;width: 102%;background-color: rgba(2, 22, 35, 0.95);margin: -1%;">
      <duty-table :tableData="tableData" style="margin: auto;"></duty-table>
      <div style="position: absolute;top: 0;width: 100%;text-align: right;"><span class="close2" @click="showDutyTable = !showDutyTable"></span></div>
    </div>
  </div>
</template>

<script>

  import myTable from './myTable'
  import dutyTable from '../../../components/yjzx/dutyTable/dutyTable'

  export default {
    name: 'setUpDutyTable',
    components: {
      myTable,
      dutyTable
    },
    props: [],
    data() {
      return {
        form: {
          name: '',
          region: '',
          type: []
        },
        tableData: [
          {
            name1: '香蜜湖街道',
            name2: '值班处领导',
            name3: '赵日天',
            name4: '处级',
            name5: '18745002968'
          },
          {
            name1: '香蜜湖街道',
            name2: '值班处领导',
            name3: '赵日天',
            name4: '处级',
            name5: '18745002968'
          },
          {
            name1: '香蜜湖街道',
            name2: '值班处领导',
            name3: '赵日天',
            name4: '处级',
            name5: '18745002968'
          },
          {
            name1: '香蜜湖街道',
            name2: '值班处领导',
            name3: '赵日天',
            name4: '处级',
            name5: '18745002968'
          },
          {
            name1: '香蜜湖街道',
            name2: '值班处领导',
            name3: '赵日天',
            name4: '处级',
            name5: '18745002968'
          },
          {
            name1: '香蜜湖街道',
            name2: '值班处领导',
            name3: '赵日天',
            name4: '处级',
            name5: '18745002968'
          },
          {
            name1: '香蜜湖街道',
            name2: '值班处领导',
            name3: '赵日天',
            name4: '处级',
            name5: '18745002968'
          },
          {
            name1: '香蜜湖街道',
            name2: '值班处领导',
            name3: '赵日天',
            name4: '处级',
            name5: '18745002968'
          },
          {
            name1: '香蜜湖街道',
            name2: '值班处领导',
            name3: '赵日天',
            name4: '处级',
            name5: '18745002968'
          },
          {
            name1: '香蜜湖街道',
            name2: '值班处领导',
            name3: '赵日天',
            name4: '处级',
            name5: '18745002968'
          },
          {
            name1: '香蜜湖街道',
            name2: '值班处领导',
            name3: '赵日天',
            name4: '处级',
            name5: '18745002968'
          },
          {
            name1: '香蜜湖街道',
            name2: '值班处领导',
            name3: '赵日天',
            name4: '处级',
            name5: '18745002968'
          },
          {
            name1: '香蜜湖街道',
            name2: '值班处领导',
            name3: '赵日天',
            name4: '处级',
            name5: '18745002968'
          },
          {
            name1: '香蜜湖街道',
            name2: '值班处领导',
            name3: '赵日天',
            name4: '处级',
            name5: '18745002968'
          },
          {
            name1: '香蜜湖街道',
            name2: '值班处领导',
            name3: '赵日天',
            name4: '处级',
            name5: '18745002968'
          },
          {
            name1: '香蜜湖街道',
            name2: '值班处领导',
            name3: '赵日天',
            name4: '处级',
            name5: '18745002968'
          },
          {
            name1: '香蜜湖街道',
            name2: '值班处领导',
            name3: '赵日天',
            name4: '处级',
            name5: '18745002968'
          },
          {
            name1: '香蜜湖街道',
            name2: '值班处领导',
            name3: '赵日天',
            name4: '处级',
            name5: '18745002968'
          }],
        showDutyTable:false
      }
    },
    mounted() {

    },
    beforeDestroy() {

    },
    methods: {
      openSetUpDutyTable(status){
        this.$emit('opensetUpDutyTable', status)
      },
      onSubmit(){
        this.openSetUpDutyTable(false)
      },
      editorTable(data){
        this.tableData = data
      }
    }
  }
</script>

<style lang="scss" scoped>
.setUpDutyTable{
  color: #1c609d;
  text-align: center;
  .title{
    padding: 10px 0 20px 10px;
    font-size: 18px;
    font-weight: bold;
    color: white;
    text-align: left;
  }
  .close{
    background: url(../../../static/img/aqyhPop/close.png) center no-repeat;
    display: inline-block;
    width: 24px;
    height: 24px;
    float: right;
    margin: 5px;
    cursor: pointer;
  }
  .close2{
    background: url(../../../static/img/aqyhPop/close.png) right no-repeat;
    display: inline-block;
    width: 24px;
    height: 24px;
    margin: 5px;
    cursor: pointer;
    /*position: absolute;*/
    /*right: 10px;*/
    /*top: 10px;*/
    /*text-align: right;*/
  }
  .setUp{
    height: 800px;
    width: 500px;
    color: white;
    font-size: 16px;
    border-right: 1px solid white;
    text-align: left;
    margin-bottom: 20px;
    /deep/ .el-checkbox+.el-checkbox {
       margin-left: auto;
    }
    /deep/ .el-checkbox {
      display: inline-block;
      width: 150px;
    }
    /deep/ .el-form-item__label {
      color: white;
    }
    /deep/ .el-checkbox {
      color: white;
    }
    /deep/ .el-form-item__content {
      line-height: 40px;
      position: relative;
      font-size: 14px;
      .el-input {
        width: 15%;
      }
    }
    /deep/ .el-select {
      width: 120px;
      .el-input {
        width: 100%;
      }
    }
    /deep/ .el-form-item:last-child{
      margin-top: 120px;
      .el-form-item__content{
        margin-left: auto !important;
        margin-right: auto;
        text-align: center;
      }
    }
    /deep/ .el-checkbox__inner{
      z-index: 0;
    }
  }
  .showDetail {
    /*height: 800px;*/
    position: absolute;
    left: 510px;
    top: 0;
    margin-top: 10px;
    font-size: 16px;
    text-align: left;
    .pageSelect{
      color: white;
      cursor: pointer;
      margin-top: 10px;
      float: right;
      /*margin-right: 10px;*/
      /*span{*/
        /*border: 1px solid #1c609d;*/
        /*border-radius: 5px;*/
        /*padding: 3px 5px;*/
      /*}*/
      /*span:nth-child(1){*/

      /*}*/
      /*span:nth-child(2){*/
        /*margin: auto 20px;*/
      /*}*/
      /*span:nth-child(3){*/

      /*}*/
    }
  }
  /*:nth-child(4){*/
    /*margin-top: 30px;*/
  /*}*/
}
</style>
