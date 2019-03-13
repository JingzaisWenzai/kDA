
let detailAlert = {};
let i = 0;
detailAlert.loadSFDetailMessage= function (nodeid ,id,name) {
/*  i++;
  console.log(i);
  if(i>10000) i = 0;
  parent.$nuxt.$store.state.flag = i;*/
  let related = [
    {keyname:'naguanqiye',popType:'ShowQiYe'},
    {keyname:'sanxiaochangsuolei',popType:'ShowThreeS'},
    {keyname:'yingjiziyuanlei',popType:'ShowEmergency'},
    {keyname:'yinhuanfenbu',popType:'ShowFenBu'},
    {keyname:'layer_basegeo_featureMapFutian_building',popType:'ShowYinHuan'},
    {keyname:'yinhuansanse',popType:'ShowChrome'},
    {keyname:'wulianwang',popType:'ShowIotPopup'},
    {keyname:'urban',popType:'ShowCity'},
    {keyname:'shentaihuanjin',popType:'ShowEnv'},
    {keyname:'minshengfuwu_yiyuan',popType:'ShowHospital'},
    {keyname:'p2p',popType:'ShowJingjiDetail'}//运行展现 p2p平台：p2p_plat，私募机构：p2p_private，其他涉众金融平台：p2p_other_plat
  ]
  let parentWindow = window.parent;
  parentWindow.parent.$nuxt.$store.state.detailMessageId = id;
  parentWindow.parent.$nuxt.$store.state.detailMessageNodeId = nodeid;
  parentWindow.parent.$nuxt.$store.state.detailMessageName = name||'';
  detailAlert.closeAllPopup();  /*执行清除页面的其他查看详情弹窗*/

  /*if(nodeid.indexOf('yinhuanfenbu')!==-1){ //隐患分布
    parentWindow.parent.$nuxt.$store.state.detailPopupType = 'ShowFenBu';
  }else if(nodeid.indexOf('layer_basegeo_featureMapFutian_building')!==-1){
    parentWindow.parent.$nuxt.$store.state.detailPopupType = 'ShowYinHuan';  /!*建筑隐患*!/
  }else if(nodeid.indexOf('yinhuansanse')!==-1){ //隐患三色
    parentWindow.parent.$nuxt.$store.state.detailPopupType = 'ShowChrome';
  }else if(nodeid.indexOf('wulianwang')!== -1 || nodeid.indexOf('yilaodian')!== -1){
    parentWindow.parent.$nuxt.$store.state.detailPopupType = 'ShowIotPopup';
  }else if(nodeid.indexOf('urban') !== -1){
    parentWindow.parent.$nuxt.$store.state.detailPopupType = 'ShowCity';
  }else if(nodeid.indexOf('naguanqiye')!==-1){
    parentWindow.parent.$nuxt.$store.state.detailPopupType = 'ShowQiYe'; /!*纳管企业*!/
  }else if(nodeid.indexOf('environmentmonitoring')!==-1){
    parentWindow.parent.$nuxt.$store.state.detailPopupType = 'ShowEnv'; /!*生态环境一张图的水质*!/
  }*/
  for(let i=0;i<related.length;i++){
    if(nodeid.indexOf(related[i].keyname)!==-1){ //隐患分布
      parentWindow.parent.$nuxt.$store.state.detailPopupType = related[i].popType;
    }
  }
};


detailAlert.closeAllPopup = function () {
  /*安全隐患一张图*/
  parentWindow.parent.$nuxt.$store.state.ShowChrome='no';  //三色
  parentWindow.parent.$nuxt.$store.state.ShowFenBu='no';   //隐患分布
  parentWindow.parent.$nuxt.$store.state.ShowYinHuan='no';  // 建筑隐患
  parentWindow.parent.$nuxt.$store.state.ShowIotPopup='no';  // 物联网
  parentWindow.parent.$nuxt.$store.state.ShowCity='no';     //城市风险
  parentWindow.parent.$nuxt.$store.state.ShowQiYe='no';     //
  parentWindow.parent.$nuxt.$store.state.ShowEmergency='no';
  parentWindow.parent.$nuxt.$store.state.ShowThreeS='no';  //三小场所
  parentWindow.parent.$nuxt.$store.state.ShowHospital='no';  //卫计医院 /*安全卫生*/
  parentWindow.parent.$nuxt.$store.state.ShowJingjiDetail = 'no';//运行展现 /*宏观经济 金融*/

  /*生态环境一张图*/
  parentWindow.parent.$nuxt.$store.state.ShowEnv='no';     //生态环境的一张图的弹窗
}

detailAlert.sendCircleSearchInfo =function(nodeid,id,wd,jd,tableName){
  detailAlert.sendClearNearByNodes();
  parentWindow.parent.$nuxt.$store.state.Resource.searchCenter.wd = wd;
  parentWindow.parent.$nuxt.$store.state.Resource.searchCenter.jd = jd;
  parentWindow.parent.$nuxt.$store.state.Resource.searchCenter.nodeid = nodeid;
  parentWindow.parent.$nuxt.$store.state.Resource.searchCenter.layerid = id;
  parentWindow.parent.$nuxt.$store.state.Resource.searchCenter.tableName = tableName;
  parentWindow.parent.$nuxt.$store.state.Resource.ShowResource = 'on';
  /* parentWindow.parent.$nuxt.$store.state.Resource.ShowSearchWithoutResource = 'off';*/
}

detailAlert.sendClearNearByNodes=function () {
  parentWindow.parent.$nuxt.$store.state.Resource.clearNearByNodes = 'yes';
}
