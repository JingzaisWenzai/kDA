<template>
  <div class="shrink_nav">

<!--收缩框展开-->
    <div class="show_bar"  v-if="theshow">
      <div class="btn" @click="toCollapseShrink"> <span></span></div>
      <div class="show_btns">
         <!--<span v-for="(item, index) in showBtns" :key="index"-->
              <!--:style="'background: transparent url(' + (popBtn ===item.name ? item.hover: item.src) +') no-repeat center; background-size: contain'"-->
       <!--@click="toOpenPop(item.name)" ></span>-->
        <span v-for="(item, index) in layerArray" :key="index"
              :style="'background: transparent url(' + (popBtn ===item.id ? item.hover: item.src) +') no-repeat center; background-size: contain'"
              @click="toOpenPop(index)" ></span>
      </div>
    </div>

    <!--block-data用于DX_aqyh.js落图事件获取   data/mapConfig.js与  gis/config/mapConfig.js(需要配url)-->

    <!--<div class="block-data show_pop " v-show="popBtn =='chengshibujian'">-->
         <!--<span :class="showOption === item.name? 'active' :''" v-for="(item, index) in popData.pop1" :key="index"-->
         <!--@click="toOpenDotPop(item.type,item.name)">{{item.text}}</span>-->
    <!--</div>-->
    <!--<div class="block-data show_pop " v-show="popBtn =='gonggonganquan'">-->
         <!--<span :class="showOption === item.name? 'active' :''" v-for="(item, index) in popData.pop2" :key="index"-->
         <!--@click="toOpenDotPop(item.type,item.name)">{{item.text}}</span>-->
    <!--</div>-->
    <!--<div class="block-data show_pop " v-show="popBtn =='minshengfuwu'">-->
         <!--<span :class="showOption === item.name? 'active' :''" v-for="(item, index) in popData.pop3" :key="index"-->
         <!--@click="toOpenDotPop(item.type,item.name)">{{item.text}}</span>-->
    <!--</div>-->
    <!--<div class="block-data show_pop " v-show="popBtn =='hongguanjingji'">-->
         <!--<span :class="showOption === item.name? 'active' :''" v-for="(item, index) in popData.pop4" :key="index"-->
         <!--@click="toOpenDotPop(item.type,item.name)">{{item.text}}</span>-->
    <!--</div>-->
    <!--<div class="block-data show_pop " v-show="popBtn =='shengtaihuanjing'">-->
         <!--<span :class="showOption === item.name? 'active' :''" v-for="(item, index) in popData.pop5" :key="index"-->
         <!--@click="toOpenDotPop(item.type,item.name)">{{item.text}}</span>-->
    <!--</div>-->

    <div class="block-data show_pop">
         <span :class="item2.selectClass? 'active' :''" v-for="(item2, index2) in topGroupTwoList" :key="index2"
               @click="toOpenDotPop(item2.id,item2.label,item2,index2)">{{item2.label}}</span>
    </div>

<!--合并为一个贴-->
    <div v-if="!theshow" @click="toOpenShrink">
      <div class="btn btn_collapse"> <span></span></div>
      <div class="show_btn show_btn_collapse">
        <span :style="'background:transparent url('+ showBtn.src +') no-repeat center; background-size: contain; z-index:1000;'"></span>
      </div>
    </div>
  </div>
</template>
<script>
  import $ from 'jquery';
  import urbanp from '../../../static/img/yxzx/block/urban-parts.png';
  import publics from '../../../static/img/yxzx/block/public-security.png';
  import livelihoods from '../../../static/img/yxzx/block/livelihood-service.png';
  import macroe from '../../../static/img/yxzx/block/macro-economy.png';
  import ecologicale from '../../../static/img/yxzx/block/ecological-environment.png';
  import urbanphover from '../../../static/img/yxzx/block/urban-parts-hover.png';
  import publicshover from '../../../static/img/yxzx/block/public-security-hover.png';
  import livelihoodshover from '../../../static/img/yxzx/block/livelihood-service-hover.png';
  import macroehover from '../../../static/img/yxzx/block/macro-economy-hover.png';
  import ecologicalehover from '../../../static/img/yxzx/block/ecological-environment-hover.png';
  import {layerList} from "../../../api/yxzx";
  import bus from '../../../assets/js/main'

  export default{
      data(){
          return{
            theshow:'all',
            showBtns:[
              {src:urbanp, name:'chengshibujian',hover:urbanphover},
              {src:publics,name:'gonggonganquan',hover:publicshover},
              {src:livelihoods,name:'minshengfuwu',hover:livelihoodshover},
              {src:macroe,name:'hongguanjingji',hover:macroehover},
              {src:ecologicale,name:'shengtaihuanjing',hover:ecologicalehover}
            ],
            showBtn:{src:urbanp,name:'chengshibujian'},
            popBtn:'',
            showOption:'',
            layerArray:[],
            layerOnMap:[],
            topGroupTwoList:[],
            index:0
          }
      },
    computed:{
      // popData:function(){
      //     return this.$store.state.nav.rightNav;
      // }
    },
    watch:{
    },
    mounted(){
        let $this = this
      layerList().then(function (data) {
        // console.log(data)
        for(let i = 0,j = $this.showBtns.length;i<j;i+=1){
          for(let n = 0,m = data.topGroupList.length;n<m;n+=1){
            if($this.showBtns[i].name === data.topGroupList[n].id){
              let temp = data.topGroupList[n]
              temp.hover = $this.showBtns[i].hover
              temp.src = $this.showBtns[i].src
              $this.layerArray.push(temp)
            }
          }
        }

        for(let i = 0,j = $this.layerArray.length;i<j;i+=1){
          for(let i2 in $this.layerArray[i]){
            $this.$set($this.layerArray[i],i2,$this.layerArray[i][i2])
          }

          for(let n = 0,m = $this.layerArray[i].topGroupTwoList.length;n<m;n+=1){
            for(let i3 in $this.layerArray[i].topGroupTwoList[n]){
              $this.$set($this.layerArray[i].topGroupTwoList[n],i3,$this.layerArray[i].topGroupTwoList[n][i3])
            }
            $this.$set($this.layerArray[i].topGroupTwoList[n],'selectClass',false)
          }
        }

      })
    },
    methods:{
      toCollapseShrink:function(event){
         /*控制折叠起来*/
         this.popBtn='';
         this.theshow = !this.theshow;
      },
      toOpenPop:function(name){
          // this.popBtn = name;
        this.topGroupTwoList = this.layerArray[name].topGroupTwoList
        this.index = name
      },
      toOpenShrink:function(){
        this.popBtn='';
        this.theshow = !this.theshow;
      },
      toOpenDotPop:function(type,name,item,num){
          //为父组件传出弹出的类型
          // this.$emit('dotPopType', type);
          // this.showOption = name;
          // let parmObj={};
          //落图
          // parmObj.mapType = this.popBtn; /*(父级菜单类型)*/
          // parmObj.name = name;/*( 菜单name)*/

          /*落图*/
          // Fun.commonMap(parmObj,window);
        console.log(type,name)
        let index = {index:this.index,index2:num}

        for(let i = 0,j = this.layerArray.length;i<j;i+=1){
          for(let n = 0,m = this.layerArray[i].topGroupTwoList.length;n<m;n+=1){
            if(this.layerArray[i].topGroupTwoList[n].selectClass === true){
              this.layerArray[i].topGroupTwoList[n].selectClass = false
              document.getElementById("iframeGisMap").contentWindow.module.common.layerControl.mapLayerOperate.removeSingleLayerById(this.layerArray[i].topGroupTwoList[n].id);
              if(this.layerArray[i].topGroupTwoList[n].filter !== 'false'){
                bus.$emit(this.layerArray[i].topGroupTwoList[n].filter,false,this.layerArray[i].topGroupTwoList[n].id)
              }
            }
          }
        }

        this.layerArray[index.index].topGroupTwoList[index.index2].selectClass = !this.layerArray[index.index].topGroupTwoList[index.index2].selectClass
        if(this.layerArray[index.index].topGroupTwoList[index.index2].selectClass === true){
          document.getElementById("iframeGisMap").contentWindow.module.common.layerControl.mapLayerOperate.loadSingleLayerById(type);
          if(this.layerArray[index.index].topGroupTwoList[index.index2].filter !== 'false'){
            bus.$emit(this.layerArray[index.index].topGroupTwoList[index.index2].filter,true,this.layerArray[index.index].topGroupTwoList[index.index2].id)
          }
        }

        // return;
        //
        // this.layerOnMap.unshift(item)
        // console.log(this.layerOnMap)
        // if(this.layerOnMap.length>1){
        //   document.getElementById("iframeGisMap").contentWindow.module.common.layerControl.mapLayerOperate.removeSingleLayerById(this.layerOnMap[1].id);
        //   if(this.layerOnMap[1].filter !== 'false'){
        //     bus.$emit(this.layerOnMap[1].filter,false)
        //   }
        //   if(this.layerOnMap[0].id === this.layerOnMap[1].id){
        //     if(this.layerOnMap.length>2){
        //       let tempId = -1
        //       for(let i = 1,j = this.layerOnMap.length;i<j;i+=1){
        //         if(this.layerOnMap[i].id !== this.layerOnMap[0].id){
        //           tempId = i+1
        //           break
        //         }
        //       }
        //
        //       if(tempId === -1){
        //         tempId = this.layerOnMap.length
        //       }
        //
        //       if(tempId%2 === 1){
        //         document.getElementById("iframeGisMap").contentWindow.module.common.layerControl.mapLayerOperate.loadSingleLayerById(type);
        //         bus.$emit(item.filter,true,item.id)
        //       }else {
        //         this.showOption = ''
        //       }
        //     }else {
        //       this.showOption = ''
        //     }
        //   }else {
        //     document.getElementById("iframeGisMap").contentWindow.module.common.layerControl.mapLayerOperate.loadSingleLayerById(type);
        //     bus.$emit(item.filter,true,item.id)
        //   }
        // }else {
        //   document.getElementById("iframeGisMap").contentWindow.module.common.layerControl.mapLayerOperate.loadSingleLayerById(type);
        //   bus.$emit(item.filter,true,item.id)
        // }
      }
    }
  }
</script>

<style scoped>
  /*导航栏的特殊样式*/
  ::-webkit-scrollbar{width:16px!important;height:16px!important;}
  ::-webkit-scrollbar-track,
  ::-webkit-scrollbar-thumb{border-radius:999px!important; border:4px solid transparent!important;}
  ::-webkit-scrollbar-track{box-shadow:1px 1px 5px rgba(185,165,150,.2) inset!important;}
  ::-webkit-scrollbar-thumb{min-height:20px!important;background-clip:content-box!important;box-shadow: 0 0 0 5px rgba(185,165,150,0.05) inset!important;}
  ::-webkit-scrollbar-corner{/*background:transparent;*/}

  .shrink_nav{
    width:480px;
    height:460px;
    position: static;
    border:1px solid transparent;
  }
  .shrink_nav .btn{
    position: relative;
    left:100%;
    top:0;
    margin-left: -80px;
    width:80px;
    height:27px;
  }
  .shrink_nav .btn span{
    display: block;
    width:45px;
    height:27px;
    margin:0 auto;
    background: url('../../../static/img/yxzx/shrink_nav_btn.png') no-repeat center;
    background-size: contain;
  }
  .shrink_nav .show_bar{
    position: absolute;
    right:0;
    top:0;
    margin-left: -80px;
    width:80px;
    height:auto;
  }
  .show_bar .show_btns{
    margin-top: 10px;
  }
  .show_bar .show_btns span{
    display: block;
    width:80px;
    height:80px;
  }
  .show_bar .show_btns span{
    margin-bottom: 6px;
  }
  .show_pop{
    position:absolute;
    left:0;
    top:37px;
    width:390px;
    height:425px;
    /*background-color: rgba(0, 102, 255, 0.25);*/
    background-color: rgba(0,25,52,.8);
    border:1px solid #2e89c4;
    overflow-x: hidden;
    overflow-y:auto;
    clear: both;
  }
  .show_pop span{
    display: block;
    width:auto;
    height:auto;
    float: left;
    color: #fff;
    font-size: 16px;
    padding:5px 7px;
    -webkit-border-radius:5px;
    -moz-border-radius:5px;
    border-radius:5px;
    background-color: #356687;
    margin:15px 0 0 15px;
  }
  .show_pop span.active,
  .show_pop span:hover{
    color:#ed910f;
    /*background-color: #05252c;*/
    background-color: #2e89c4;
    font-size: 16px;

  }

  .shrink_nav .btn_collapse{
    position: relative;
    left:100%;
    margin-left: -80px;
    margin-top: 73%;
    width:80px;
    height:27px;
  }
  .shrink_nav .show_btn_collapse{
    position: relative;
    left:100%;
    margin-top: 10px;
    margin-left: -80px;
    width:80px;
    height:80px;
  }
  .shrink_nav .btn_collapse span{
    display: block;
    width:45px;
    height:27px;
    margin:0 auto;
    background: url('../../../static/img/yxzx/shrink_nav_btn_open.png') no-repeat center;
    background-size: contain;
  }
  .shrink_nav .show_btn_collapse span{
    display: block;
    width:80px;
    height:80px;
  }

</style>
