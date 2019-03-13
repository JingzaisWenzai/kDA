<template>
  <section class="container">
    <iframe id="iframeGisMap" class="iframeStyle" :src="iframeBox.url"><!--<img src="../static/img/yxzx_7.jpg"/>--></iframe>
    <div style="width: 100%;background: linear-gradient(#020f18 60%, transparent);"><my-header></my-header></div>
    <div class="weiji_right">
      <weiji-tabs></weiji-tabs>
    </div>
    <div style="position: absolute;top: 50px;z-index: 2;">
      <select-address></select-address>
    </div>
    <left-menu></left-menu>
    <!--改变地图底图-->
    <div class="change_map">
      <change-map></change-map>
    </div>
  </section>
</template>

<script>
  import MyHeader from '../../components/weiji/HeaderBlock.vue'
  import weijiTabs from '../../components/weiji/weijiTabs'
  import leftMenu from '../../components/common/leftMenu'//导航栏
  import selectAddress from '../../components/OneMap/aqyh/selectAddress.vue';//市、街道、社区下钻
  import mapDetailPop from '../../components/common/mapDetailPop/mapDetailPop'
  import ChangeMap from '../../components/common/Map/ChangeMap.vue';


  export default {
    name: 'index',
    layout:'yujinjiance',
    mixins:[mapDetailPop],
    head() {
      return {
        title: '公共卫生一张图',
        meta: [
          { hid: 'description', name: 'descriptyion', content: '公共卫生一张图' },
          { hid: 'keywords', name: 'keywords', content: '公共卫生一张图' }
        ]
      }
    },
    props: [],
    components: {
      MyHeader,
      weijiTabs,
      leftMenu,
      selectAddress,
      ChangeMap
    },
    data() {
      return {
        iframeBox: { url: '../../web/gis/index.html' }
      }
    },
    mounted() {
      this.loadHospital()
    },
    methods: {
      loadHospital(){
        let $this = this
        try {
          document.getElementById("iframeGisMap").contentWindow.module.common.layerControl.mapLayerOperate.loadSingleLayerById('minshengfuwu_yiyuan')
        } catch (e) {
          console.error(e.message)
          setTimeout(function() {
            $this.loadHospital()
          },2000)
        }
      }

    },
    beforeDestroy() {

    }
  }
</script>

<style lang="scss" scoped>
  @import url('../../assets/css/reset.css');

  .container {
    margin:0;
    padding:0;
    border:0;
    /*width:3840px;*/
    width: 100%;
    /*min-width: 1920px;*/
    height:1080px;
    position: relative;
    background: transparent;
    .iframeStyle{
      width: 100%;
      height: 100%;
      position: absolute;
      top:0;
      left: 0;
    }
    .weiji_right{
      right: 80px;
      position: absolute;
    }
    .change_map{position:absolute;z-index: 1000; bottom:15px; left:15px; width:128px;height:62px;}
    /deep/ .left_menu .left_menu_content{
      background: linear-gradient(90deg, #001521, rgba(3, 32, 80, 0.3)) !important;
    }
  }
</style>
