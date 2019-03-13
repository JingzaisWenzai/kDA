<template>
  <div class="toy_container">
    <table>
      <tbody>
        <tr v-for="(a , c) in theObj" :key="c"><td v-for="(item,index) in a" :key="index"><span>{{item.name}}</span><span>{{item.value}}</span></td></tr>
      </tbody>

    </table>
  </div>
</template>
<style scoped="scoped">
  .toy_container{
    width:100%;
    height:100%;
    overflow-x: hidden;
    overflow-y: auto;
  }
  .toy_container table{
    width: 100%;
      border-left: 1px solid #fff;
      border-top:1px solid #fff;
  }
  .toy_container table tr td{
    color: #fff;
    font-size: 20px;
    border-bottom: 1px solid #fff;
    border-right:1px solid #fff;
    margin:0;
  }
  .toy_container table tr td span{
    display: block;
    width:100%;
    height:30px;
    line-height: 30px;
    text-align: center;
  }
  .toy_container table tr td span:first-child{
    border-bottom: 1px solid #fff;
  }
</style>
<script>
export default{
  props:['theObj'],
  data(){
      return{
        obj:[]
      }
  }
}
</script>
