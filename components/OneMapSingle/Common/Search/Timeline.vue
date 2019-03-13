<template>
  <section class="timeline_container"  :id="idBox.box" >
    <div class="box" @click="toPlace($event)">
      <img class="bar" :src="lineBar.lsrc">
      <div class="content">
        <a class="trick" v-for="(item, index) in lineBar.tricks" :key="index">
          <span class="trick_img"></span>
          <span class="trick_name">{{item}}{{lineBar.unit}}</span>
        </a>
      </div>
      <img class="bar" :src="lineBar.rsrc">
    </div>
    <div class="block" :id="idBox.block" draggable="true" @dragstart ="toStart($event)" @drag ="toDrop($event)" @dragend="toEnd($event)"></div>        <!--绑定按下事件-->
  </section>
</template>
<style scoped>
  .timeline_container{
    width:100%;
    height:100%;
    position: relative;
    clear: both;
    cursor:pointer;
  }
  .timeline_container .bar,.timeline_container .content{
    display:block;
    float:left;
  }
  .timeline_container .bar{
    width:15px;
    height:15px;
    margin-top: 3.5px;
  }
  .timeline_container .content{
    background:transparent url('../../../../static/img/timeline/line_single.png') repeat-x center;
    background-size:auto 15px;
    width:calc(100% - 35px);
  }
  .timeline_container .content a{
    display: inline-block;vertical-align: middle;width:calc(100% / 6);  /*6是6个刻度*/
    position: relative;
  }
  .timeline_container .content a .trick_img{
    display: block;width:100%;height:20px;background: transparent url('../../../../static/img/timeline/trick_single.png') no-repeat center;
    background-size: contain;
  }
  .timeline_container .content a .trick_name{
    position: absolute;left:0;top:100%;width: 100%;text-align: center; color:#ffffff;font-size: 14px;
  }
  .timeline_container .block{
    position: absolute;
    top:3px;
    left:10px;
    background: transparent url('../../../../static/img/timeline/block_single.png') no-repeat center;
    background-size: contain;
    width:18px;height:20px;
  }
</style>
<script>
  import left from '../../../../static/img/timeline/left_single.png';
  import right from '../../../../static/img/timeline/right_single.png';
   export default{
       data(){
           return{
              idBox:{box:'timeline_box',block:'timeline_block'},
              lineBar:{
                  lsrc:left,
                  rsrc:right,
                  tricks:['0.5','1','1.5','2','2.5','3'],            /*约定放6个刻度*/
                  unit:'公里'
              },
              blockX:0,
              blockLeft:10,
              mouseX:0
           }
       },
       mounted(){
           this.blockX = document.getElementById(this.idBox.block).getBoundingClientRect().left;
       },
       methods:{
             toPlace:function(ev){
                 console.log(ev , ev.currentTarget.getBoundingClientRect().left);
                 let left = ev.screenX - ev.currentTarget.getBoundingClientRect().left;
                 document.getElementById(this.idBox.block).style.left = left +'px';
                 this.toApply();
             },
             toStart:function(ev){
             },
             toDrop:function(ev){
               let x = ev.screenX - this.blockX;
               if(x>0 && x<450){
                 this.blockLeft = x;
                 ev.currentTarget.style.left = this.blockLeft +'px';
               }
             },
             toEnd:function(ev){
               this.toApply();
             },
             toApply:function(){
                let whole = document.getElementById(this.idBox.box).offsetWidth;
                let index = document.getElementById(this.idBox.block).style.left.indexOf('px');
                let target = Number(document.getElementById(this.idBox.block).style.left.substring(0,index))  + (0.5 * document.getElementById(this.idBox.block).offsetWidth);
                let res = ((target / whole) * 3 + 0.25).toFixed(2);
                console.log(res);
                this.$emit('theRange', res);
             }
       }
   }
</script>
<!--
clientY 指的是距离可视页面左上角的距离
pageY 指的是距离可视页面左上角的距离(不受页面滚动影响)
screenY 指的是距离屏幕左上角的距离
layerY 指的是找到它或它父级元素中最近具有定位的左上角距离
offsetY 指的是距离它自己左上角的距离

相同点	不同点
clientY	距离页面左上角距离	受页面滚动的影响
pageY	距离页面左上角的距离	不受页面滚动影响


相同点	不同点
layerY	距离元素的左上角距离	受元素的定位的影响，会从本元素往上找到第一个定位的元素的左上角
offsetY	距离元素左上角的距离	计算相对于本元素的左上角，不在乎定位问题，计算的是内交点。是IE浏览器的特有属性
-->
