<template>
  <div class="dutyTable">
    <div class="title">
      <div class="name"><span>应急值班表</span><span class="el-icon-printer">打印</span><span class="el-icon-setting" @click="openSetUpDutyTable(true)">显示设置</span></div>
      <div class="date">{{date}}</div>
      <div class="time">{{time}}</div>
    </div>
    <div class="content_table">
      <div class="title">区值班领导：白巅峰</div>
      <my-table :type="'show'" :tableData="tableData"></my-table>
    </div>
  </div>
</template>

<script>

  import {DateFormat} from '../../../utils/validate'
  import myTable from './myTable'
  import bus from '../../../assets/js/main'

  export default {
    name: 'dutyTable',
    components: { myTable },
    props: {
      tableData: {
        default(){
          return [
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
            }]
        }
      }
    },
    data() {
      return {
        time:'',
        date:''
      }
    },
    mounted() {
      this.initDate()
    },
    beforeDestroy() {

    },
    methods: {
      openSetUpDutyTable(status){
        this.$emit('opensetUpDutyTable', status)
      },
      initDate(){
        let time = (new Date()).getTime()
        let timeStr = DateFormat(time,'yyyy-MM-dd hh:mm:ss')
        this.time = timeStr.split(' ')[1]
        switch ((new Date(time)).getDay()){
          case 1:
            this.date = timeStr.split(' ')[0]+' 星期一'
            break;
          case 2:
            this.date = timeStr.split(' ')[0]+' 星期二'
            break;
          case 3:
            this.date = timeStr.split(' ')[0]+' 星期三'
            break;
          case 4:
            this.date = timeStr.split(' ')[0]+' 星期四'
            break;
          case 5:
            this.date = timeStr.split(' ')[0]+' 星期五'
            break;
          case 6:
            this.date = timeStr.split(' ')[0]+' 星期六'
            break;
          case 0:
            this.date = timeStr.split(' ')[0]+' 星期日'
            break;
          default:
            break;
        }
        let $this = this
        setTimeout(function() {
          $this.initDate()
        },1000)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .dutyTable {
    width: 560px;
    /*height: 800px;*/
    background-color: rgba(2, 22, 35, 0.95);
    box-shadow: 0 0 5px #1c609d;
    border: 1px solid #1c609d;
    border-radius: 5px;
    color: #1c609d;
    .title {
      margin: 10px;
      .name {
        :nth-child(1) {
          font-size: 24px;
          font-weight: bold;
        }
        :nth-child(2) {
          float: right;
          font-size: 18px;
          cursor: pointer;
        }
        :nth-child(3) {
          float: right;
          margin-right: 20px;
          font-size: 18px;
          cursor: pointer;
        }
      }
      .date {
        text-align: right;
      }
      .time {
        height: 100px;
        text-align: center;
        line-height: 100px;
        font-size: 90px;
        color: #a2d0ec;
      }
    }
    .content_table {
      margin: auto 10px 10px 10px;
      .title{
        margin: 10px 0;
        font-size: 20px;
        font-weight: bold;
      }
    }
  }
</style>
