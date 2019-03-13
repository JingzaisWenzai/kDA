<template>
  <div class="toy_container">
    <ul>
      <li v-for="(item , index) in theObj">
        <span :title = 'item.name'>{{item.name}}  <i>  {{ '(' + item.unit + ')' }} </i></span>
        <span>{{item.value}}</span>
      </li>
    </ul>
  </div>
</template>
<style scoped="scoped">
  .toy_container{
    width:100%;
    height:100%;
    overflow-x: hidden;
    overflow-y: auto;
  }
  .toy_container ul{
    display: block;
    padding:0;
    width:100%;
  }
  .toy_container ul li{
    display: inline-block;
    vertical-align: middle;
    float: left;
    width:calc(100% / 5);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    border: 1px solid #8d959b;
  }
  .toy_container ul li span{
    width:auto;
    display: block;
    font-size: 18px;
    text-align: center;
    color:#fff;padding:5px 10px;
  }
  .toy_container ul li span i{
    display: inline;
    font-size: 12px;
    font-style: normal;
  }
  .toy_container ul li span:first-child{
    border-bottom: 1px solid #8d959b;
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
