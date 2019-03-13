<template>
  <div class="three_container">
    <div class="navTop">
      <div class='navBar'><span v-for="(item,index) in navBar" :key="index" @click="toCheckNav(index)">{{item}}</span></div>
      <i></i>
    </div>
  </div>
</template>
<style scoped>
  .three_container{  width:100%;height:auto;  -webkit-border-radius:5px;  -moz-border-radius:5px; border-radius:5px;
  background-color: rgba(2,22,35,0.8);  border:1px solid #4c96d3;}
  .three_container .navTop{width:90%; text-align: left;margin: 0 auto;position: relative;}
  .three_container .navTop .navBar{width: auto;background-color: rgba(10,36,77,0.8);-webkit-border-radius:5px;  -moz-border-radius:5px; border-radius:5px;border: 1px solid #194284;}
  .three_container .navTop .navBar span{display: inline-block;vertical-align: middle;font-size: 22px;color:#b1d8ed;}
  .three_container .navTop .navBar span:hover,.three_container .navTop .navBar span.active{background-color: #196db4;}
  .three_container .navTop .navBar span:first-child{border-top-left-radius: 5px;border-bottom-left-radius: 5px;}
  .three_container .navTop .navBar span:last-child{border-top-right-radius: 5px;border-bottom-right-radius: 5px;}
  .three_container .navTop i{display: block;left:100%;margin-left: -20px;top:50%;margin-top:-9px;width:18px;height:18px;background: url('../../../../static/img/aqyhPop/close.png') no-repeat center;
  background-size: contain;}
</style>
<script>
  export default{
      data(){
          return{
              navBar:['场所信息','责任人','巡查隐患']
          }
      }
  }
</script>
