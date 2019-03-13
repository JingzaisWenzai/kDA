<template>
  <section class="BottomCollapse_container">
    <div class="open" v-if="toCollapse === 'yes'" @click="toChangeBottomBar('yes')"><i></i></div>
    <div class="fold" v-else-if="toCollapse === 'no'">
      <div class="fold_bar"><bottom-bar :navMsg ='navMsg' @BarPosition ='toChangeBarPosition'></bottom-bar></div>
      <i @click ="toChangeBottomBar('no')"></i>
    </div>
  </section>
</template>
<style scoped>
.BottomCollapse_container{
      width:100%;
      height:100%;overflow: visible;
      position: relative;
}
.BottomCollapse_container .open{ position: absolute;bottom:0;left:50%;margin-left: -43px;width:84px;height:12px;}
.BottomCollapse_container .open i{
  display: block;width:100%;height:100%;background: url('../../../../static/img/common/Bottom/open.png') no-repeat center;
  -webkit-background-size:contain;background-size: contain;
}
.BottomCollapse_container .fold{
      width: 100%;height:100%;overflow: visible;
}
.BottomCollapse_container .fold .fold_bar{
      width:100%;height:calc(100% - 12px);overflow: visible;
}
.BottomCollapse_container .fold i{display: block;width:84px;height:12px;margin:0 auto;background: url('../../../../static/img/common/Bottom/collapse.png') no-repeat center;
  -webkit-background-size:contain;background-size: contain;}
</style>
<script>
  import BottomBar from './BottomBar.vue'
  import {Fun} from '../../../../static/js/OneMap/apiFuns'
  export default{
      props:['navMsg'],
      data(){
        return{
            toCollapse:'yes'
        }
      },
      watch:{
        navMsg:{
            handler:function(val,oldVal){},
            deep:true
        }
      },
      methods:{
        toChangeBarPosition:function(msg){
            this.$emit('BarPosition',msg);
        },
        toChangeBottomBar:function(msg){
            if(msg === 'yes'){
              this.toCollapse = 'no';
            }else{
              this.toCollapse = 'yes';
            }
        }
      },
      components:{
        BottomBar
      }
  }
</script>
