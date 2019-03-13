<template>
  <header>
  <!--  <p class="title">运行展现系统</p>-->
   <!-- <div class="location">
      <p class="loc"><img src="../../static/img/location.png"></p>
      <div></div>
    </div>-->
<!--    <a @click="See(indexUrl)" class="back" id="back"></a>-->
    <!--<div class="door">-->
      <!--<protall-nav></protall-nav>-->
    <!--</div>-->
  </header>
</template>

<style scoped>
  header {
    background: url('../../../static/img/yxzx/top-bg-block.png') no-repeat center, -webkit-linear-gradient(#020f18 60%, transparent); /* Safari 5.1 - 6.0 */
    background:url('../../../static/img/yxzx/top-bg-block.png') no-repeat center, -o-linear-gradient(#020f18 60%, transparent); /* Opera 11.1 - 12.0 */
    background: url('../../../static/img/yxzx/top-bg-block.png') no-repeat center,-moz-linear-gradient(#020f18 60%, transparent); /* Firefox 3.6 - 15 */
    background: url('../../../static/img/yxzx/top-bg-block.png') no-repeat center,linear-gradient(#020f18 60%, transparent); /* 标准的语法 */

    -webkit-background-size:contain;
    background-size:contain;
    width:100%;
    height:108px;
    /*min-width:3840px;*/
    min-height: 108px;
    line-height: 108px;
    overflow: visible;
    position: relative;
    border:0;
  }
  p{
    padding:0;
    margin:0;
    width:100%;
    height:100%;
    text-align: center;
    line-height:108px;
    font-size: 50px;
    font-family: 'Microsoft YaHei';
    color:#fff;
  }

  .back{
    position: absolute;
    left:100%;
    top:0;
    margin-top: 10px;
    margin-left:-120px;
    width:100px;
    height:55px;
    background: url('../../../static/img/yxzx/back.png') center no-repeat;
    background-size: contain;
  }
  .door{
    width: 101px;
    height: 54px;
    line-height: 54px;
    text-align: left;
    margin: 0;
    position: absolute;
    top: 20px;
    display: block;
    right: 40px;
    background-color: transparent;
    border-bottom: transparent;
    z-index: 1000;
  }
</style>
<script>
  import ProtallNav from '../../../components/common/ProtallNav';

  export default {
    components: {ProtallNav},
    data(){
      return {
        // indexUrl:'http://10.190.55.58:8081/web/yxzxVSyjzx/'
      }
    },
    methods:{
      See:function(url){
        window.location.href = url;
      }
    }
  }
</script>
