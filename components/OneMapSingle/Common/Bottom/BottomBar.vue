<template>
  <section class="bottom_container" :id="oid">
    <div class="bottom_pop" v-show="subBar.length !== 0 && clickedBtn.flag1.clicked">
      <div class="bottom_pop_cont">
        <i></i>
        <div class="middleware" v-for="(b,d) in subBar" :key="d" >
          <a :class="singleClassName===b.name?'on':''" @click="toSubPop($event,b,oid,b.name,b.txt,d)"><img class="normal" :src="b.src" /><img class="hover" :src="b.hover"><span>{{b.txt}}</span></a>
          <!--  <span class="sep" v-if="d !== subBar.length -1 ">|</span>-->
        </div>
      </div>
    </div>

    <div class="three_block" v-show="subContent && subContent.data.length !==0 && clickedBtn.flag1.clicked && clickedBtn.flag2.clicked">
      <div class="three_block_cont">
        <i></i>
        <a :class="threeClassName===item.name?'on':''" @click="toRunPop($event,item,oid,item.name,item.txt,index)" v-for="(item, index) in subContent.data" :key="index">
          <!-- <img class="normal" :src="item.src" /><img class="hover" :src="item.hover">-->
          <span>{{item.txt}}</span>
        </a>
      </div>
    </div>

    <div class="bottom_nav box_shadow" v-if="oid!=='sec'">
      <span v-for="(a , c) in navBar" :class="navFocusBtn===a.name?'active':''" :key="c" @click="toBarPop(oid,a.name)">{{a.txt}}</span>
    </div>

    <div class="bottom_nav_type2" v-if="oid==='sec'">
      <a v-for="(e , f) in navBar" :class="navFocusBtn===e.name?'active':''" :key="f" @click="toPop(oid,e.type,e.name,f)">
        <img class="img" :src="e.src"/> <img class="imgHover" :src="e.hover"/>
        <span>{{e.txt}}</span>
      </a>
    </div>
  </section>
</template>
<style scoped>
  .bottom_container{ width:100%;height: 100%;position:relative; text-align: center;overflow: visible;}
  .bottom_container .box_shadow{
    -webkit-border-radius:8px!important;
    -moz-border-radius:8px!important;
    border-radius:8px!important;
  }
  .bottom_container .bottom_pop{
    border:1px solid #008cff;
    height: 55px;  width:auto;
    overflow: visible;
    position:absolute;
    top:0;
    margin-top: -68px;
    background-color: rgba(2,22,35,0.8);padding: 0;
    text-align: center;
    -webkit-border-radius:50px!important;
    -moz-border-radius:50px!important;
    border-radius:50px!important;
  }

  .bottom_container .three_block{
    position: absolute; margin-top: -120px; top:0;
    width:auto; text-align: center; border:1px solid #008cff;height: 40px;background-color: rgba(2,22,35,0.8);
    -webkit-border-radius:20px!important;
    -moz-border-radius:20px!important;
    border-radius:20px!important;
  }
  .bottom_container .bottom_pop .bottom_pop_cont,
  .bottom_container .three_block .three_block_cont{position: relative; width:auto; height:auto;overflow: visible;}
  .bottom_container .bottom_pop .middleware{display: inline-block;vertical-align: middle;width: auto;height:auto;}
  .bottom_container .bottom_pop .middleware a{cursor: pointer;}
  .bottom_container .bottom_pop .bottom_pop_cont i,
  .bottom_container .three_block .three_block_cont i{
    display:block;
    position: absolute;left:50%; margin-left:-6px;bottom:0;margin-bottom:-13px;width:0; height:0;background-color:transparent;
    border-top: 12px solid #008cff;
    border-right:6px solid transparent;
    border-left:6px solid transparent;
  }
  .bottom_container .three_block .three_block_cont i{margin-bottom: -15px;}
  .bottom_container .bottom_pop a{min-width:183px;width:auto;height: auto;display: inline-block;vertical-align: middle; line-height:50px;text-align: center;}
  .bottom_container .bottom_pop .sep{color:#57418d;}
  .bottom_container .bottom_pop a img,
  .bottom_container .bottom_pop a span{display: inline-block;vertical-align: middle;}
  .bottom_container .bottom_pop span{font-size: 14px;color:#7df7ff;font-weight: 500;}
  .bottom_container .bottom_pop a img{width:36px;height:36px;margin-right: 10px;}
  .bottom_container .bottom_pop a img.normal{display:inline-block;}
  .bottom_container .bottom_pop a img.hover{display:none;}
  .bottom_container .bottom_pop a.on img.normal{display:none;}
  .bottom_container .bottom_pop a.on img.hover{display:inline-block;}
  .bottom_container .bottom_pop a.on span{color:#ac6908; font-weight: 800;}

  .three_block a{min-width:150px;width:auto;height: auto;display: inline-block;vertical-align: middle; line-height:35px;text-align: center;overflow: visible;}
  .three_block .sep{color:#57418d;}
  .three_block a img,
  .three_block a span{display: block; margin: 0 auto;}
  .three_block span{font-size: 15px;color:#7df7ff;font-weight: 500;}
  .three_block a img{width:26px;height:36px;}
  .three_block a img.normal{display:block;}
  .three_block a img.hover{display:none;}
  .three_block a.on img.normal{display:none;}
  .three_block a.on img.hover{display:block;}
  .three_block a.on span{color:#ac6908; font-weight: 800;width: auto;}

  .bottom_container .bottom_pop .middleware:first-child,
  .three_block a:first-child{padding-left: 30px;}
  .bottom_container .bottom_pop .middleware:last-child,
  .three_block a:last-child{padding-right: 30px;}

  .bottom_container .bottom_nav{
    width:auto; margin:0 auto;
  }
  .bottom_container .bottom_nav span{
    border-top:1px solid #008cff;border-bottom:1px solid #008cff; background-color: #001f35;display: inline-block;vertical-align: middle;font-size: 15px;color:#7df7ff;
    padding:15px 50px;
  }
  .bottom_container .bottom_nav span.active,
  .bottom_container .bottom_nav span:hover{color:#001624;background-color: #007ed7;font-weight: 800;}
  .bottom_container .bottom_nav span:first-child{
    -webkit-border-radius:3px 0 0 3px;
    -moz-border-radius:3px 0 0 3px;
    border-radius:3px 0 0 3px;
    border-left:1px solid #008cff;
  }
  .bottom_container .bottom_nav span:last-child{
    -webkit-border-radius:0 3px 3px 0;
    -moz-border-radius: 0 3px 3px 0;
    border-radius:0 3px 3px 0;
    border-right:1px solid #008cff;
  }
  .bottom_container span{cursor: pointer!important;}
  .bottom_container .bottom_nav_type2{
    width:auto; height:100%;margin:0 auto;
    background-color: #021623;
    border:1px solid #008cff;
    -webkit-border-radius:3px;
    -moz-border-radius:3px;
    border-radius:3px;
  }
  .bottom_container .bottom_nav_type2 a{display:block;vertical-align: middle;float:left;width:auto;padding:10px 33px;margin-top: 1px;}
  .bottom_container .bottom_nav_type2 a:first-child{border-top-left-radius: 5px;border-bottom-left-radius: 5px;margin-left:1px;}
  .bottom_container .bottom_nav_type2 a:last-child{border-top-right-radius: 5px;border-bottom-right-radius: 5px;}
  .bottom_container .bottom_nav_type2 a img.img,
  .bottom_container .bottom_nav_type2 a span{
    display: block;
  }
  .bottom_container .bottom_nav_type2 a img.imgHover{display: none;}
  .bottom_container .bottom_nav_type2 a img{width: 20px;height:22px;margin: 0 auto;margin-bottom: 8px;}
  .bottom_container .bottom_nav_type2 a span{width: 100%;text-align: center; color: #ffffff;font-size: 15px;}
  .bottom_container .bottom_nav_type2 a.active,
  .bottom_container .bottom_nav_type2 a:hover{background-image: linear-gradient(to bottom, #0078ff, #001953);}
  .bottom_container .bottom_nav_type2 a.active img.img,
  .bottom_container .bottom_nav_type2 a:hover img.img{display: none;}
  .bottom_container .bottom_nav_type2 a.active img.imgHover,
  .bottom_container .bottom_nav_type2 a:hover img.imgHover{display: block;}
</style>
<script>
  import {Fun,toGetXmlData} from "../../../../static/js/OneMap/apiFuns.js";
  import {setStore} from "../../../../static/js/OneMap/common/common";
  import bus from '../../../../assets/js/main'

  export default{
    props:['navMsg'],
    data(){
        return{
          oid:'',
          subContent:{
              pContent:{},
              data:[]
          },
          navBar:[],
          navFocusBtn:'',  //一级菜单单选
          singleClassName:'',  //二级菜单单选
          threeClassName:'', //三级菜单单选
          subBar:[],
          loadMapData:[],
          loadMapDataSub:[],
 		      window:'',
          clickedBtn: {
            flag1: {name:'',clicked:false},
            flag2: {name:'',clicked:false},
            flag3: {name:'',clicked:false}
          }
        }
    },
    mounted(){
      this.oid = this.navMsg.oid;
      this.navBar = this.navMsg.data;
      this.window = window;
      //console.log(this.subContent,this.navBar,this.subBar)
    },
    watch:{
      clickedBtn:{
        handler:function(val,oldVal){
          console.log(val,oldVal)
          bus.$emit('showBI',this.clickedBtn)
        },
        deep:true
      },
      clearBottomClass:{  handler:function(val,oldVal){
            if(val==='yes'){
              this.navFocusBtn='';
              this.singleClassName='';
              this.threeClassName='';
              this.$store.state.ClearBottomClass ='no';
              this.$nextTick(function(){
                this.subBar=[];
                this.subContent.data=[];
                this.subContent.pContent={};
                this.clickedBtn={
                  flag1: {name:'',clicked:false},
                  flag2: {name:'',clicked:false},
                  flag3: {name:'',clicked:false}
                }
              })
            }
        },
        deep:true
      },
      subContent:{
        handler:function(val,oldVal){
        },
        deep:true
      },
      navFocusBtn:{
          handler:function(newVal,oldVal){
              if(newVal === '' || newVal === oldVal){
                /*   this.subBar 不变*/
              }else{
                this.subContent.data=[];
                let arr = this.navBar;
                let brr=[],flag;
                for(let i=0;i<arr.length;i++){
                  if(arr[i].name === newVal){
                    brr = [].concat(arr[i].data);
                    flag = i;
                  }
                }
                let popWidth = 200 * brr.length;
                $($('.bottom_container .bottom_pop')[0]).width(popWidth);
                this.subBar = brr;
                this.$nextTick(function(){
                    $($('.bottom_container .bottom_pop')[0]).width(popWidth);
                    let element = $('.bottom_nav_type2 a').eq(flag);
                    let owidth = $(element).outerWidth();
                    let oleft = $(element).position().left;
                    let subWidth = popWidth;
                    let subLeft = $($('.bottom_container .bottom_pop')[0]).position().left;
                    let oval = -((subLeft + subWidth / 2 ) - (owidth / 2 + oleft)) +'px';
                    $($('.bottom_container .bottom_pop')[0]).css("marginLeft",oval);
                })
              }
            },
            deep:true
      },
      singleClassName:{
          handler:function(newVal, oldVal){
              if(newVal ==='' || newVal === oldVal){

              }else{
                let arr = this.subBar;
                let brr=[],flag;
                for(let i=0;i<arr.length;i++){
                  if(arr[i].name === newVal){
                    if(arr[i].sub){
                      brr = [].concat(arr[i].sub);
                      flag = i;
                    }
                  }
                }
                if(brr.length !==0){
            //        console.log('111111111');
                  let popWidth = 200 * brr.length;
                  let cls = '.bottom_container .three_block';
                  $($(cls)[0]).width(popWidth);
                  this.subContent.data = brr;
                  this.$nextTick(function(){
                    $($(cls)[0]).width(popWidth);
                      let element = $('.bottom_container .bottom_pop .middleware').eq(flag);
                      let oparentLeft =$($('.bottom_container .bottom_pop')[0]).css("marginLeft");
                      let oparentLeftTurn  = Number((oparentLeft.split('').slice(0,oparentLeft.indexOf('px'))).join(''));
                      let owidth = $(element).outerWidth();
                      let oleft = $(element).position().left;
                      let subWidth = popWidth;
                      let subLeft = $($(cls)[0]).position().left;
                      let oval = -((subLeft + subWidth / 2) - (owidth / 2 + oleft + oparentLeftTurn)) +'px';
                      $($(cls)[0]).css("marginLeft",oval);
                  })
                }
              }
          },
          deep:true
      },
      navMsg:{
          handler:function(val,oldVal){
            this.oid = this.navMsg.oid;
            this.navBar = this.navMsg.data;
          },
          deep:true
      },
      selectSingleClassName(newVal,oldVal){         /*选择单个显示子菜单*/
        this.singleClassName = '';
      }
    },
    computed:{
      clearBottomClass(){
          return this.$store.state.ClearBottomClass;
      },
      selectSingleClassName(){
        return this.$store.state.addressStreet;     /*addressStreet代表切换子导航条*/
      }
    },
    methods:{
      toChangeBarStyle:function(val,arr,mainCls,subCls){
        let brr=[],flag;
        for(let i=0;i<arr.length;i++){
          if(arr[i].name === val){
            brr = [].concat(arr[i].data);
            flag = i;
          }
        }
        let popWidth = 200 * brr.length;
        $($(mainCls)[0]).width(popWidth);
        this.subBar = brr;
        this.$nextTick(function(){
          $($(mainCls)[0]).width(popWidth);
          let element = $(subCls).eq(flag);
          let owidth = $(element).outerWidth();
          let oleft = $(element).position().left;
          let subWidth = popWidth;
          let subLeft = $($(mainCls)[0]).position().left;
          let oval = -((subLeft + subWidth / 2 ) - (owidth / 2 + oleft)) +'px';
          $($(mainCls)[0]).css("marginLeft",oval);
        })
      },
      getIndex:function(box, txt){
        let res=-1;
        for(let i=0;i<box.length;i++){
          if(box[i].name.indexOf(txt) !== -1){
            res=i;
          }
        }
        return res === -1 ? (-1) : res;
      },
      toDealInfoList:function(node,obj,txt){ //此处为一级name
          if(node){
            //安全隐患的信息列表  位置在state的infoListBox
            let pname = obj.mapType;
            let sub = obj.subname ? obj.subname : '';
            if(txt === '建筑风险'){
              this.$store.state.ShowRiskRank ='yes';
              this.$store.state.ShowInfoList='no';
            }else if(pname==='riskType'){
              this.$store.state.ShowRiskRank ='no';
              let box = this.$store.state.infoListBox;
              let insetObj = {
                name:txt,
                node:node
              };
              let index = this.getIndex(box, txt);
              if( index !== -1){
                box.splice(index,1);
                box.splice(0,0,insetObj);
              }else{
                this.$store.state.infoListBox.reverse().push(insetObj);
                this.$store.state.infoListBox.reverse();
              }
              this.$store.state.infoList.clickedNode.node = node;
              this.$store.state.infoList.clickedNode.txt = txt;
              this.$store.state.infoList.clickedNode.parentname = obj.name;
              this.$store.state.infoList.clickedNode.ppname = pname;
              this.$store.state.ShowInfoList='yes';
            }else{
              this.$store.state.ShowRiskRank ='no';
              let box = this.$store.state.infoListBox;
              let insetObj = {
                name:txt,
                node:node
              };
              let index = this.getIndex(box, txt);
              if( index !== -1){
                box.splice(index,1);
                box.splice(0,0,insetObj);
              }else{
                this.$store.state.infoListBox.reverse().push(insetObj);
                this.$store.state.infoListBox.reverse();
              }
              this.$store.state.infoList.clickedNode.node = node;
              this.$store.state.infoList.clickedNode.txt = txt;
              this.$store.state.infoList.clickedNode.parentname = pname;
              this.$store.state.ShowInfoList='yes';
            }
          }else{
              this.$store.state.ShowRiskRank ='no';
              this.$store.state.ShowInfoList='no';
              this.$store.state.infoListBox =[];
          }

      },
      async toSubPop(ev,item,oid,name,txt,index){  //sec eco

        if(!this.clickedBtn.flag2.clicked){
          this.clickedBtn.flag2.clicked = !this.clickedBtn.flag2.clicked;
          this.clickedBtn.flag2.name = name;
          if(item.sub){
            this.singleClassName = this.singleClassName === name? '':name;      /*控制子导航条的点击样式的开关*/
            if(item.sub.length!==0){
              this.subContent.data =[].concat(item.sub);
              this.subContent.pContent.oid = oid;
              this.subContent.pContent.name = name;
              this.subContent.pContent.ppContent = this.navFocusBtn;
            }
          }else{
            this.subContent.data =[];
            this.subContent.pContent ={};
            let parmObj = {};
            let obj = ev.currentTarget;

            //控制安全隐患一张图的tableList 及 生态环境一张图的右侧弹窗
            if(obj.className ===''){
              /*  ev.currentTarget.className ='on';*/
              this.$store.state.rightPopChart = name;//生态环境  显示右侧弹窗
            }else{
              /*   ev.currentTarget.className ='';*/
              this.$store.state.rightPopChart = "";//不显示右侧弹窗
            }

            this.singleClassName = this.singleClassName === name? '':name;      /*控制子导航条的点击样式的开关*/

            //落图
            parmObj.oid = oid;   /*(系统类型)*/
            parmObj.mapType = this.navFocusBtn; /*(一级菜单类型)*/
            parmObj.name = name;/*(二级菜单name)*/
            /*删除之前的弹窗及落图*/
            Fun.clearPopUps();
            Fun.commonMap(parmObj,this.window);
            if(oid === 'sec'){     /*安全隐患一张图*/
              parmObj.addressStreet = this.$store.state.addressStreet;
              let xml = await toGetXmlData(parmObj,this.window);
              parmObj.node = Fun.getClickedPid(parmObj,xml);
              console.log(parmObj);
              this.toDealInfoList(parmObj.node,parmObj,txt);
            }else if(oid = 'eco'){ /*生态环境一张图*/
            }
          }
        }else{
          if(this.clickedBtn.flag1.name === this.navFocusBtn && this.clickedBtn.flag2.name === name){
            if(item.sub){
              this.singleClassName = this.singleClassName === name? '':name;      /*控制子导航条的点击样式的开关*/
              if(item.sub.length!==0){
                this.subContent.data =[].concat(item.sub);
                this.subContent.pContent.oid = oid;
                this.subContent.pContent.name = name;
                this.subContent.pContent.ppContent = this.navFocusBtn;
                this.toRunPop(null,null,oid);
              }
            }else{
              this.clickedBtn.flag2.clicked = !this.clickedBtn.flag2.clicked;
              this.subContent.data =[];
              this.subContent.pContent ={};
              let parmObj = {};
              let obj = ev.currentTarget;

              //控制安全隐患一张图的tableList 及 生态环境一张图的右侧弹窗
              this.$store.state.rightPopChart = "";//不显示右侧弹窗

              this.singleClassName = this.singleClassName === name? '':name;      /*控制子导航条的点击样式的开关*/

              //落图
              parmObj.oid = oid;   /*(系统类型)*/
              parmObj.mapType = this.navFocusBtn; /*(一级菜单类型)*/
              parmObj.name = name;/*(二级菜单name)*/
              /*落图*/
              Fun.clearPopUps();
              Fun.commonMap(parmObj,this.window);
              if(oid === 'sec'){     /*安全隐患一张图*/
                this.toDealInfoList(null);
              }else if(oid = 'eco'){}
            }
          }else{
            this.clickedBtn.flag2.name = name;
            if(item.sub){
              this.singleClassName = this.singleClassName === name? '':name;      /*控制子导航条的点击样式的开关*/
              if(item.sub.length!==0){
                this.subContent.data =[].concat(item.sub);
                this.subContent.pContent.oid = oid;
                this.subContent.pContent.name = name;
                this.subContent.pContent.ppContent = this.navFocusBtn;
              }
            }else{
              this.subContent.data =[];
              this.subContent.pContent ={};
              /**/
              this.toRunPop(null);
              let parmObj = {};
              let obj = ev.currentTarget;
              //控制安全隐患一张图的tableList 及 生态环境一张图的右侧弹窗
              if(obj.className ===''){
                /*  ev.currentTarget.className ='on';*/
                this.$store.state.rightPopChart = name;//生态环境  显示右侧弹窗
              }else{
                /*   ev.currentTarget.className ='';*/
                this.$store.state.rightPopChart = "";//不显示右侧弹窗
              }
              this.singleClassName = this.singleClassName === name? '':name;      /*控制子导航条的点击样式的开关*/
              //落图
              parmObj.oid = oid;   /*(系统类型)*/
              parmObj.mapType = this.navFocusBtn; /*(一级菜单类型)*/
              parmObj.name = name;/*(二级菜单name)*/
              /*落图*/
              Fun.clearPopUps();
              Fun.commonMap(parmObj,this.window);
              if(oid === 'sec'){     /*安全隐患一张图*/
                parmObj.addressStreet = this.$store.state.addressStreet;
                let xml = await toGetXmlData(parmObj,this.window);
                parmObj.node = Fun.getClickedPid(parmObj,xml);
                console.log(parmObj);
                this.toDealInfoList(parmObj.node,parmObj,txt);
              }else if(oid = 'eco'){ /*生态环境一张图*/
              }
            }
          }
        }

      },
      async toRunPop(ev,item,oid,name,txt,index){
        if(!ev){
          this.clickedBtn.flag2.clicked = !this.clickedBtn.flag2.clicked;
          let parmObj = {};
          let theObj = this.subContent.pContent;
          this.$store.state.rightPopChart = '';  //关闭右窗
          if(this.threeClassName !== ''){
            //落图
            parmObj.oid = theObj.oid;      /*(系统类型)*/
            parmObj.mapType = theObj.ppContent;      /*(一级菜单类型)*/
            parmObj.name = theObj.name;     /*(二级菜单name)*/
            parmObj.subname =  this.threeClassName;
            this.threeClassName= '';      /*控制三级导航条的点击样式的开关*/

            /*落图*/
            Fun.clearPopUps();
            Fun.commonMap(parmObj, this.window);
            if (oid === 'sec') {
              this.toDealInfoList(null, parmObj);
            } else if (oid = 'eco') {
              /*生态环境一张图*/
            }
          }
        }else{
          let parmObj = {};
          let obj = ev.currentTarget;
          let theObj = this.subContent.pContent;
          //控制安全隐患一张图的tableList 及 生态环境一张图的右侧弹窗
          if (obj.className === '') {
            /*  ev.currentTarget.className ='on';*/
            this.$store.state.rightPopChart = name;//显示右侧弹窗
          } else {
            /*   ev.currentTarget.className ='';*/
            this.$store.state.rightPopChart = "";//不显示右侧弹窗
          }
          this.threeClassName = this.threeClassName === name ? '' : name;
          //落图
          parmObj.oid = theObj.oid;    /*(系统类型)*/
          parmObj.mapType = theObj.ppContent;     /*(一级菜单类型)*/
          parmObj.name = theObj.name;       /*(二级菜单name)*/
          parmObj.subname = name;

          /*落图*/
          Fun.clearPopUps();
          Fun.commonMap(parmObj, this.window);
          if (oid === 'sec') {     /*安全隐患一张图*/
            parmObj.addressStreet = this.$store.state.addressStreet;
            let xml = await toGetXmlData(parmObj, this.window);
            parmObj.node = Fun.getClickedPid(parmObj, xml);
            this.toDealInfoList(parmObj.node, parmObj, txt);
          } else if (oid = 'eco') {
            /*生态环境一张图*/
          }
        }

      },
      toBarPop:function(oid,name){
          if(!this.clickedBtn.flag1.clicked){
            this.clickedBtn.flag1.clicked = !this.clickedBtn.flag1.clicked;
            this.navFocusBtn = name;
            this.clickedBtn.flag1.name = name;
          }else{
              if(this.clickedBtn.flag1.name === name){
                this.navFocusBtn = '';
                this.clickedBtn.flag1.clicked = !this.clickedBtn.flag1.clicked;
              }else{
                this.navFocusBtn = name;
                this.clickedBtn.flag1.name = name;
              }
          }
      },
      toPop:function(oid,type,name){
          if(!this.clickedBtn.flag1.clicked){
            this.navFocusBtn = name;
            this.clickedBtn.flag1.name = name;
            this.clickedBtn.flag1.clicked = !this.clickedBtn.flag1.clicked;
            this.$emit('BarPosition', type);
          }else{
            if(this.clickedBtn.flag1.name === name){
              this.navFocusBtn = '';
              this.clickedBtn.flag1.clicked = !this.clickedBtn.flag1.clicked;
              this.$emit('BarPosition', '');
            }else{
              this.navFocusBtn = name;
              this.clickedBtn.flag1.name = name;
              this.$emit('BarPosition', type);
            }
          }

      }
    }
  }
</script>
