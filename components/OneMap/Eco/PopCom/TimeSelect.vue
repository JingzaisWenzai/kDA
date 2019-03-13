<template>
  <div class="time-select-container">
    <el-date-picker
      v-model="timeVal"
      type="datetimerange"
      value-format= "yyyy-MM-dd HH:mm:ss"
      format= "yyyy-MM-dd HH:mm:ss"
      :picker-options="pickerOptions2"
      range-separator="至"
      start-placeholder="选择开始日期"
      end-placeholder="选择结束日期"
      :default-value="defaultValue">
    </el-date-picker>
  </div>
</template>
<script scoped>
  import $ from 'jquery'
  import 'element-ui/lib/theme-chalk/index.css';
  import {DateFormat} from '../../../../utils/validate'

  export default{
      data(){
          return{
            timeVal:(function() {
              let time = new Date().getTime()
              let temp = time-30*24*3600*1000
              console.log()
              return [DateFormat(temp,'yyyy-MM-dd hh:mm:ss'),DateFormat(time,'yyyy-MM-dd hh:mm:ss')]
            })(),
            pickerOptions2:{
              shortcuts: [{
                text: '最近一周',
                onClick(picker) {
                  const end = new Date();
                  const start = new Date();
                  start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                  picker.$emit('pick', [start, end]);
                }
              }, {
                text: '最近一个月',
                onClick(picker) {
                  const end = new Date();
                  const start = new Date();
                  start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                  picker.$emit('pick', [start, end]);
                }
              }, {
                text: '最近三个月',
                onClick(picker) {
                  const end = new Date();
                  const start = new Date();
                  start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                  picker.$emit('pick', [start, end]);
                }
              }]
            },
            defaultValue:(function () {
              return (new Date()).getTime()-30*24*60*60*1000
            })()
          }
      },
    watch:{
      timeVal:{
          handler:function(val,oldVal){
              if(val){
                  //console.log('12121212')
                  this.$emit('timeSelect',val);
              }
          },
          deep:true
      }
    }
  }

</script>
<style scoped lang="scss">
  .time-select-container{
    cursor: pointer;width: 100%;height:100%;
  }
  .time-select-container div.time-bar{
    width:38%;
    display: block;
    float: left;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    line-height: 30px;
    border:1px solid #fff;
    -webkit-border-radius:6px;
    -moz-border-radius:6px;
    border-radius:6px;
    margin-right: 15px;
  }
  .time-select-container div.time-bar span,
  .time-select-container div.time-bar span:last-child{
    background:transparent;
    margin-left: 0;
    width:auto;
    height:auto;
    display: inline-block;
    vertical-align: middle;
  }
  .time-select-container div.time-bar span.time-icon{
    background:url("./TimePicker/time.png") center no-repeat;
    background-size: contain;
    height:20px;
    width:16px;
    margin-right: 10px;
    margin-left: 15px;
  }
  @font-face {font-family: "iconfont";
    src: url('//at.alicdn.com/t/font_234130_nem7eskcrkpdgqfr.eot?t=1505291076294'); /* IE9*/
    src: url('//at.alicdn.com/t/font_234130_nem7eskcrkpdgqfr.eot?t=1505291076294#iefix') format('embedded-opentype'), /* IE6-IE8 */
    url('data:application/x-font-woff;charset=utf-8;base64,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') format('woff'),
    url('//at.alicdn.com/t/font_234130_nem7eskcrkpdgqfr.ttf?t=1505291076294') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+*/
    url('//at.alicdn.com/t/font_234130_nem7eskcrkpdgqfr.svg?t=1505291076294#iconfont') format('svg'); /* iOS 4.1- */
  }

  .iconfont {
    font-family:"iconfont" !important;
    font-size:16px;
    font-style:normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  .icon-115rightarrowheads:before { content: "\e79b"; }
  .icon-111arrowheadright:before { content: "\e6db"; }
  .icon-116leftarrowheads:before { content: "\e807"; }
  .icon-112leftarrowhead:before { content: "\e6f6"; }

  #schedule-box{
    width: 320px;
    margin: 0 auto;
    padding: 35px 20px;
    font-size: 13px;
    z-index:1000;
    background-color: #ffffff;
  }
  .schedule-hd{
    display: flex;
    justify-content: space-between;
    padding: 0 15px;
  }
  .today{
    flex: 1;
    text-align: center;
  }
  .ul-box{
    overflow: hidden;
  }
  .ul-box > li{
    float: left;
    width: 14.28%;
    text-align: center;
    padding: 5px 0;
  }
  .other-month{
    color: #999999;
  }
  .current-month{
    color: #333333;
  }
  .today-style{
    border-radius: 50%;
    background: #58d321;
  }
  .arrow{
    cursor: pointer;
  }
  .dayStyle{
    display: inline-block;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    text-align: center;
    line-height: 35px;
    cursor: pointer;
  }
  .current-month > .dayStyle:hover{
    background: #00BDFF;
    color: #ffffff;
  }
  .today-flag{
    background: #00C2B1;
    color: #fff;
  }
  .boxshaw{
    box-shadow: 2px 2px 15px 2px #e3e3e3;
  }
  .selected-style {
    background: #00BDFF;
    color: #ffffff;
  }


  .time-select-container .el-input__inner{
    height:30px;
    line-height: 30px;
    background-color: transparent;
    width:100%;
  }

  .time-select-container .el-input__icon{
    line-height: 28px;
  }

</style>
<style>
  .el-date-editor .el-range__icon {
    line-height: 20px;
    color: #ffffff;
    display: none;
  }
  .time-select-container .el-date-editor .el-range-input,
  .time-select-container .el-date-editor input{
    color:#fff;
    background-color: transparent;
    cursor: pointer;width:45%;
  }
  .time-select-container  .el-date-editor .el-range-separator{
    color:#ffffff;
    line-height: 20px;
  }
  .time-select-container .el-date-editor .el-range__close-icon{display:none; width: 0;}
  .time-select-container .el-range-editor.is-active, .time-select-container .el-range-editor.is-active:hover{
    border:1px solid #ffffff;
  }
</style>
