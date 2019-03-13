<template>
  <section class="changeMap_container">
    <a :class="navBar ==index ? 'active':''" v-for="(item,index) in bar" :key="index" @click="toChangeBar(index)"><img :src="item.src"><span>{{item.name}}</span></a>
  </section>
</template>
<style scoped>
  .changeMap_container{
    width:100%;
    height:100%;
    background-color: rgba(173,173,173,0.7);
    text-align: center;
    overflow: hidden;
  }
  .changeMap_container a{cursor:pointer;display: inline-block;vertical-align: middle;width:40%;height:80%; position: relative;margin-top: 5%;}
  .changeMap_container,
  .changeMap_container a,
  .changeMap_container a img,
  .changeMap_container a span{
    -webkit-border-radius:5px;
    -moz-border-radius:5px;
    border-radius:5px;
  }
  .changeMap_container a img{display: block;width:100%;height:100%;}
  .changeMap_container a span{display: block;width:auto;height:auto;font-size: 12px;color:#ffffff;position:absolute;bottom:0;right:0;padding:2px;}
  .changeMap_container a:first-child{margin-right: 10%;}
  .changeMap_container a.active{border: 2px solid #008cff;}
  .changeMap_container a.active span{background-color:#008cff;}
</style>
<script>
  import erwei from '../../../static/img/common/map1.png';
  import sanwei from '../../../static/img/common/map4.png';
  export default{
      data(){
          return{
              bar:[
                {
                  src:sanwei,
                  name:'深色',
                },
                {
                  src:erwei,
                  name:'标准',
                  title:'打开标准电子地图'
                }
              ],
              navBar:0
          }
      },
      methods:{
        toChangeBar:function(index){
            this.navBar = index;
            document.getElementById("iframeGisMap").contentWindow.module.layerControl.basegeoLayer.baseMap.layer_arcgis_tilelayer_futianBaseMap_toggle(index);
        }
      }

  }
</script>
