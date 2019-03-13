
export default {
  methods:{
    //单击落点图标显示弹框
    openFeatureLayerPopup(layerId, featureId){
      document.getElementById("iframeGisMap").contentWindow.module.layerControl.basegeoLayer.featureMapFutian.openFeatureLayerPopup(layerId, featureId)
    }
  }
}
