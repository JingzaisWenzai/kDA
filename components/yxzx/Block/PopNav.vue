<template>
  <div class="shrink_nav">

    <!--收缩框展开-->
    <div class="show_bar" v-if=" theshow === 'all'">
      <div class="btn" @click="toCollapseShrink"><span></span></div>
      <div class="show_btns">
        <!--<span v-for="(item, index) in showBtns" :key="index"-->
        <!--:style="'background: transparent url(' + (popBtn ===item.name ? item.hover: item.src) +') no-repeat center; background-size: contain'"-->
        <!--@click="toOpenPop(item.name)" ></span>-->
        <span v-for="(item, index) in layerArray" :key="index"
              :style="'background: transparent url(' + (popBtn ===item.id ? item.hover: item.src) +') no-repeat center; background-size: contain'"
              @click="toOpenPop(item.id)"></span>
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

    <div class="block-data show_pop " v-show="popBtn ===speciallyArray.id">
      <div :class="item.class+' speciall'" v-for="(item, index) in speciallyArray.topGroupTwoList" :key="index">
        <div class="speciall_title">{{item.label}}</div>
        <span :class="item2.selectClass===true? 'active' :item2.selectClass===false?'':'more'" v-for="(item2, index2) in item.loadAttributeMapTwoList"
              :key="index2"
              @click="toOpenDotPop_special({index:0,index2:index,index3:index2})" :title="item2.label">{{item2.label}}</span>
      </div>
    </div>
    <div class="block-data show_pop " v-for="(item, index) in even(layerArray)" :key="index+1"
         v-show="popBtn ===item.id">
         <span :class="item2.selectClass? 'active' :''" v-for="(item2, index2) in item.topGroupTwoList" :key="index2"
               @click="toOpenDotPop(item2.id,item2.label,item,{index:index+1,index2,index3:-1})" :title="item2.label">{{item2.label}}</span>
    </div>

    <!--合并为一个贴-->
    <div v-if=" theshow === 'one'" @click="toOpenShrink" style="bottom: -460px; position: absolute;">
      <div class="btn btn_collapse"><span></span></div>
      <div class="show_btn show_btn_collapse">
        <span
          :style="'background:transparent url('+ showBtn.src +') no-repeat center; background-size: contain; z-index:1000;'"></span>
      </div>
    </div>
  </div>
</template>
<script>
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
  import { removeSingleLayer } from '../../../utils/mapOption'

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
            speciallyArray:[]
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
        console.log(data)
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
            //分组
            if($this.layerArray[i].topGroupTwoList[n].loadAttributeMapTwoList !== null){
              for(let x = 0,y = $this.layerArray[i].topGroupTwoList[n].loadAttributeMapTwoList.length;x<y;x+=1){
                $this.$set($this.layerArray[i].topGroupTwoList[n].loadAttributeMapTwoList[x],'selectClass',false)
              }
            }
            $this.$set($this.layerArray[i].topGroupTwoList[n],'selectClass',false)
          }
        }
        console.log($this.layerArray)
        $this.layerArray[0] = $this.getMySpeciallArray($this.layerArray[0])
        console.log($this.layerArray)
        $this.speciallyArray = $this.layerArray[0]
      })
    },
    methods:{
        getMySpeciallArray(array){
          for(let i = 0,j = array.topGroupTwoList.length;i<j;i+=1){
            for(let a = 0,b = array.topGroupTwoList[i].loadAttributeMapTwoList.length;a<b;a+=1){
              this.$set(array.topGroupTwoList[i].loadAttributeMapTwoList[a],'selectClass',false)
            }
            if(array.topGroupTwoList[i].loadAttributeMapTwoList.length>9){
              array.topGroupTwoList[i].loadAttributeMapTwoList.splice(8,0,{label:'查看更多',type:'more',class:'more','selectClass':'other'})
              array.topGroupTwoList[i].loadAttributeMapTwoList.push({label:'收起',type:'less',class:'more','selectClass':'other'})
            }
            // array.topGroupTwoList[i].class = ''
            this.$set(array.topGroupTwoList[i],'class','')
          }
          return array
        },
      toCollapseShrink:function(event){
         /*控制折叠起来*/
         this.popBtn='';
         this.theshow = 'one';
      },
      toOpenPop:function(name){
          this.popBtn = name;
      },
      toOpenShrink:function(){
        this.popBtn='';
        this.theshow = 'all';
      },
      toOpenDotPop:function(type,name,item,index){
          //为父组件传出弹出的类型
          this.$emit('dotPopType', type);
          this.showOption = name;
          // let parmObj={};
          //落图
          // parmObj.mapType = this.popBtn; /*(父级菜单类型)*/
          // parmObj.name = name;/*( 菜单name)*/

          /*落图*/
          // Fun.commonMap(parmObj,window);

        this.toOpenDotPop_special(index)

        // for(let i = 0,j = this.layerArray.length;i<j;i+=1){
        //   for(let n = 0,m = this.layerArray[i].topGroupTwoList.length;n<m;n+=1){
        //     if(this.layerArray[i].topGroupTwoList[n].selectClass === true){
        //       if(index.index === i && index.index2 === n){
        //       }else {
        //         this.layerArray[i].topGroupTwoList[n].selectClass = false
        //       }
        //       document.getElementById("iframeGisMap").contentWindow.module.common.layerControl.mapLayerOperate.removeSingleLayerById(this.layerArray[i].topGroupTwoList[n].id);
        //       //筛选弹框
        //       if(this.layerArray[i].topGroupTwoList[n].filter !== 'false'){
        //         let fun = this.layerArray[i].topGroupTwoList[n].filter
        //         bus.$emit(fun,{state:false,id:$this.layerArray[i].topGroupTwoList[n].id})
        //       }
        //     }
        //   }
        // }
        //
        // this.layerArray[index.index].topGroupTwoList[index.index2].selectClass = !this.layerArray[index.index].topGroupTwoList[index.index2].selectClass
        // if(this.layerArray[index.index].topGroupTwoList[index.index2].selectClass === true){
        //   document.getElementById("iframeGisMap").contentWindow.module.common.layerControl.mapLayerOperate.loadSingleLayerById(type);
        //
        //   //筛选弹框
        //   if(this.layerArray[index.index].topGroupTwoList[index.index2].filter !== 'false'){
        //     let fun = this.layerArray[index.index].topGroupTwoList[index.index2].filter
        //     setTimeout(function () {
        //       bus.$emit(fun,{state:true,id:$this.layerArray[index.index].topGroupTwoList[index.index2].id})
        //     },1000)
        //   }
        // }
      },
      toOpenDotPop_special(index){
        let $this = this
        for(let i = 0,j = this.layerArray[0].topGroupTwoList.length;i<j;i+=1){
          for(let n = 0,m = this.layerArray[0].topGroupTwoList[i].loadAttributeMapTwoList.length;n<m;n+=1){
            //更多
            // if(i === index.index2 && n === index.index3){
            //   if(this.layerArray[0].topGroupTwoList[index.index2].loadAttributeMapTwoList[index.index3].type === 'more'){
            //     this.layerArray[0].topGroupTwoList[index.index2].class = 'specialClass'
            //     this.layerArray[0].topGroupTwoList[i].loadAttributeMapTwoList.splice(8,1)
            //     break
            //   }else if(this.layerArray[0].topGroupTwoList[index.index2].loadAttributeMapTwoList[index.index3].type === 'less'){
            //     this.layerArray[0].topGroupTwoList[index.index2].class = ''
            //     if(this.layerArray[0].topGroupTwoList[index.index2].loadAttributeMapTwoList.length>9){
            //       this.layerArray[0].topGroupTwoList[index.index2].loadAttributeMapTwoList.splice(8,0,{label:'查看更多......',type:'more',class:'more','selectClass':'other'})
            //     }
            //     break
            //   }
            // }
          }
        }

        for(let i = 0,j = this.layerArray.length;i<j;i+=1){
            for(let a = 0,b = this.layerArray[i].topGroupTwoList.length;a<b;a+=1){

              if(index.index3 === -1){
                //点击的是非城市部件的
                if(i === index.index && a === index.index2){
                  if(this.layerArray[i].topGroupTwoList[a].selectClass === true){
                    document.getElementById("iframeGisMap").contentWindow.module.common.layerControl.mapLayerOperate.removeSingleLayerById(this.layerArray[i].topGroupTwoList[a].id);
                    this.layerArray[i].topGroupTwoList[a].selectClass = false
                    //筛选弹框
                    if(this.layerArray[i].topGroupTwoList[a].filter !== 'false'){
                      let fun = this.layerArray[i].topGroupTwoList[a].filter
                      bus.$emit(fun,{state:false,id:$this.layerArray[i].topGroupTwoList[a].id})
                    }
                  }else {
                    document.getElementById("iframeGisMap").contentWindow.module.common.layerControl.mapLayerOperate.loadSingleLayerById(this.layerArray[i].topGroupTwoList[a].id);
                    this.layerArray[i].topGroupTwoList[a].selectClass = true
                    //筛选弹框
                    if(this.layerArray[index.index].topGroupTwoList[index.index2].filter !== 'false'){
                      let fun = this.layerArray[index.index].topGroupTwoList[index.index2].filter
                      setTimeout(function () {
                        bus.$emit(fun,{state:true,id:$this.layerArray[index.index].topGroupTwoList[index.index2].id})
                      },1000)
                    }
                  }
                }else {
                  let temp = this.layerArray[i].topGroupTwoList[a].loadAttributeMapTwoList
                  if(temp !== null){
                    for(let n = 0,m = temp.length;n<m;n+=1){
                      if(temp[n].selectClass === true){
                        document.getElementById("iframeGisMap").contentWindow.module.common.layerControl.mapLayerOperate.removeSingleLayerById(temp[n].id);
                        temp[n].selectClass = false
                      }
                    }
                  }else {
                    if(this.layerArray[i].topGroupTwoList[a].selectClass === true){
                      document.getElementById("iframeGisMap").contentWindow.module.common.layerControl.mapLayerOperate.removeSingleLayerById(this.layerArray[i].topGroupTwoList[a].id);
                      this.layerArray[i].topGroupTwoList[a].selectClass = false
                      //筛选弹框
                      if(this.layerArray[i].topGroupTwoList[a].filter !== 'false'){
                        let fun = this.layerArray[i].topGroupTwoList[a].filter
                        bus.$emit(fun,{state:false,id:$this.layerArray[i].topGroupTwoList[a].id})
                      }
                    }
                  }
                }
              }else {
                //点击的是城市部件的
                if(i === index.index){
                  let temp = this.layerArray[i].topGroupTwoList[a].loadAttributeMapTwoList
                  for(let n = 0,m = temp.length;n<m;n+=1){
                    if(index.index === i && index.index2 === a && index.index3 === n){
                      if(this.layerArray[index.index].topGroupTwoList[index.index2].loadAttributeMapTwoList[index.index3].type === 'more'){
                        this.layerArray[0].topGroupTwoList[index.index2].class = 'specialClass'
                        this.layerArray[0].topGroupTwoList[a].loadAttributeMapTwoList.splice(8,1)
                        break
                      }else if(this.layerArray[0].topGroupTwoList[index.index2].loadAttributeMapTwoList[index.index3].type === 'less'){
                        this.layerArray[0].topGroupTwoList[index.index2].class = ''
                        if(this.layerArray[0].topGroupTwoList[index.index2].loadAttributeMapTwoList.length>9){
                          this.layerArray[0].topGroupTwoList[index.index2].loadAttributeMapTwoList.splice(8,0,{label:'查看更多',type:'more',class:'more','selectClass':'other'})
                        }
                        break
                      }else {
                        if(temp[n].selectClass === true){
                          removeSingleLayer(temp[n].id)
                          temp[n].selectClass = false
                        }else {
                          document.getElementById("iframeGisMap").contentWindow.module.common.layerControl.mapLayerOperate.loadSingleLayerById(temp[n].id);
                          temp[n].selectClass = true
                        }
                      }
                    }else {
                      if(this.layerArray[index.index].topGroupTwoList[index.index2].loadAttributeMapTwoList[index.index3].selectClass !== 'other'){
                        if(temp[n].selectClass === true){
                          removeSingleLayer(temp[n].id)
                          temp[n].selectClass = false
                        }
                      }
                    }
                  }
                }else {
                  if(this.layerArray[i].topGroupTwoList[a].selectClass === true){
                    // document.getElementById("iframeGisMap").contentWindow.module.common.layerControl.mapLayerOperate.removeSingleLayerById(this.layerArray[i].topGroupTwoList[a].id);
                    removeSingleLayer(this.layerArray[i].topGroupTwoList[a].id)
                    this.layerArray[i].topGroupTwoList[a].selectClass = false
                    //筛选弹框
                    if(this.layerArray[i].topGroupTwoList[a].filter !== 'false'){
                      let fun = this.layerArray[i].topGroupTwoList[a].filter
                      bus.$emit(fun,{state:false,id:$this.layerArray[i].topGroupTwoList[a].id})
                    }
                  }
                }
              }

              // if(this.layerArray[i].topGroupTwoList[a].selectClass === true){
              //   document.getElementById("iframeGisMap").contentWindow.module.common.layerControl.mapLayerOperate.removeSingleLayerById(this.layerArray[i].topGroupTwoList[a].id);
              //   this.layerArray[i].topGroupTwoList[a].selectClass = false
              // }else {
              //   if(this.layerArray[i].topGroupTwoList[a].loadAttributeMapTwoList !== null){
              //     for(let n = 0,m = this.layerArray[i].topGroupTwoList[a].loadAttributeMapTwoList.length;n<m;n+=1){
              //       if(a === index.index2 && n === index.index3){
              //         if(this.layerArray[i].topGroupTwoList[a].loadAttributeMapTwoList[n].selectClass === true){
              //           document.getElementById("iframeGisMap").contentWindow.module.common.layerControl.mapLayerOperate.removeSingleLayerById(this.layerArray[i].topGroupTwoList[a].loadAttributeMapTwoList[n].id);
              //           this.layerArray[i].topGroupTwoList[a].loadAttributeMapTwoList[n].selectClass = false
              //         }else {
              //           document.getElementById("iframeGisMap").contentWindow.module.common.layerControl.mapLayerOperate.loadSingleLayerById(this.layerArray[i].topGroupTwoList[a].loadAttributeMapTwoList[n].id);
              //           this.layerArray[i].topGroupTwoList[a].loadAttributeMapTwoList[n].selectClass = true
              //         }
              //       }else {
              //         if(this.layerArray[i].topGroupTwoList[a].loadAttributeMapTwoList[n].selectClass === true){
              //           document.getElementById("iframeGisMap").contentWindow.module.common.layerControl.mapLayerOperate.removeSingleLayerById(this.layerArray[i].topGroupTwoList[a].loadAttributeMapTwoList[n].id);
              //           this.layerArray[i].topGroupTwoList[a].loadAttributeMapTwoList[n].selectClass = false
              //         }
              //       }
              //     }
              //   }
              // }
            }
        }

          this.speciallyArray = this.layerArray[0]

      },
      even: function (layerArray) {
        return layerArray.filter(function (number) {
          return number.topGroupTwoList[0].loadAttributeMapTwoList === null
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  /*导航栏的特殊样式*/
  ::-webkit-scrollbar{width:16px!important;height:16px!important;}
  ::-webkit-scrollbar-track,
  ::-webkit-scrollbar-thumb{border-radius:999px!important; border:4px solid transparent!important;}
  ::-webkit-scrollbar-track{box-shadow:1px 1px 5px rgba(185,165,150,.2) inset!important;}
  ::-webkit-scrollbar-thumb{min-height:20px!important;background-clip:content-box!important;box-shadow: 0 0 0 5px rgba(185,165,150,0.05) inset!important;}
  ::-webkit-scrollbar-corner{/*background:transparent;*/}

  .shrink_nav{
    /*width:480px;*/
    /*height:460px;*/
    position: static;
    border:1px solid transparent;
  }
  .shrink_nav .btn{
    position: relative;
    cursor:pointer;
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
    cursor:pointer;
  }
  .show_bar .show_btns span{
    margin-bottom: 6px;
  }
  .show_pop{
    position:absolute;
    /*left:0;*/
    right: 85px;
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
    cursor: pointer;
    display: block;
    width: 110px;
    height: 31px;
    float: left;
    color: #fff;
    font-size: 16px;
    padding: 5px 7px;
    border-radius: 5px;
    background-color: #356687;
    margin: 15px 5px 0px 9px;
    overflow: hidden;
    text-align: center;
    text-overflow: ellipsis;
    white-space: nowrap;
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
  .speciall{
    width: 100%;
    display: inline-block;
    border-bottom: 1px solid #ed910f;
    max-height: 170px;
    overflow: hidden;
    span{
      margin: 5px 5px 10px 9px;
    }
  }
  .specialClass{
    max-height: none;
  }
  .speciall_title{
    color: #ed910f;
    padding: 5px 10px;
  }
  .more{
    background-color: transparent !important;
  }

</style>
