<template>
  <div class="tool_container">
    <div v-if="showBtn==='whole'">
      <div class="collapse_btn border-shape" @click="toCollapse"></div>
      <div class="tool_btns border-shape" id="divTool">
        <a v-for="(item,index) in boxTools.tools" :key="index" @click="toDoSomething($event,index)">
          <span :class="item.cls"></span><span>{{item.txt}}</span>
        </a>
      </div>
      <div class="tool_box border-shape" @click="toCollapse"><img :src="boxTools.src"><span>{{boxTools.txt}}</span></div>
    </div>
    <div v-else>
      <div class="fold_btn  border-shape" @click="toCollapse"></div>
      <div class="tool_box  border-shape" @click="toCollapse"><img :src="boxTools.src"><span>{{boxTools.txt}}</span></div>
    </div>
    <div class="text_box" v-if="textBox==='writeable'" ><textarea  :placeholder= 'textPlaceholder'  v-model="textContent"></textarea></div>
  </div>
</template>
<script>
  import toolUrl from '../../../static/img/gistool/tool.png';
  // import '../../static/gis/js/module/common/mapTool/drawGeometry.js';
  import mark from '../../../static/img/gistool/mark_gis.png';
  import {win} from '../../../static/js/comFun';

  export default{
      data(){
          return{
            showBtn:'single',
            boxTools:{
              txt:'工具箱',
              src:toolUrl,
              tools:[
                {txt:'标记',cls:'mark'},
                {txt:'文本',cls:'txt'},
                {txt:'测距',cls:'rang'},
                /*  {txt:'截图',cls:'screen'},*/
                {txt:'清除',cls:'screen'}
              ]
            },
            textBox :'',
            textPlaceholder:'请输入文本',
            textContent:''
          }
      },
    mounted() {
        window.GisTool={};
        window.GisTool.clearTitleActive = this.clearTitleActive;
    },
    methods:{
      toCollapse:function(){
          let showBtn =this.showBtn;
          if(showBtn === 'whole'){
            this.showBtn='single';
          }else{
            this.showBtn ='whole';
          }
      },
      markFun:function(){
        document.getElementById("iframeGisMap").contentWindow.module.common.mapTool.drawGeometry.drawPointMarker(mark,60,60,function() {
          window.GisTool.clearTitleActive();
        });
      },
      textFun:function(){
        console.log(this.textContent);
        let obj = document.getElementById("iframeGisMap");
        let iwindow = obj.contentWindow;
        if(this.textContent.trim() !==''){
          iwindow.module.common.mapTool.drawGeometry.drawText(this.textContent,'red');
        }else{
            alert('请在右侧文本框输入您想输入的文本,然后在地图中点击落文本~');
        }
      },
      messureFun:function(){
        let obj = document.getElementById("iframeGisMap");
        let iwindow = obj.contentWindow;
        iwindow.module.common.mapTool.drawGeometry.measureDistance(function() {
          window.GisTool.clearTitleActive();
        });
      },
      clearFun:function(){
        let obj = document.getElementById("iframeGisMap");
        let iwindow = obj.contentWindow;
        iwindow.module.common.mapTool.drawGeometry.clearGraphicsLayer(function() {
          window.GisTool.clearTitleActive();
        });
      },
      toDoSomething:function(ev,index){
          win.stopBubble(ev);
          win.stopDefault(ev);
          let iframe = document.getElementById("iframeGisMap");
          switch(index){
            case 0:

              console.log(ev.currentTarget);
              let $ev0 = ev.currentTarget;
              if($ev0.className ===''){
                  $ev0.className ='active';
                  //win.addEvents(iframe.contentDocument,'click',this.markFun);
                this.markFun();
              }else{
                  //$ev0.className ='';
                  //win.removeEvents(iframe.contentDocument,'click',this.markFun);
              }
              break;
            case 1://文字
              let $ev1 = ev.currentTarget;
              if($ev1.className ===''){
                $ev1.className ='active';
                this.textBox = 'writeable';
                //win.addEvents(iframe.contentDocument,'click',this.textFun);
                this.textFun();
              }else{
                $ev1.className ='';
                this.textBox = '';
                //win.removeEvents(iframe.contentDocument,'click',this.textFun);
              }
              break;
            case 2://测距

                  let $ev2 = ev.currentTarget;
                  if($ev2.className ===''){
                    $ev2.className ='active';
                    this.messureFun();
                  }else{
                    //$ev2.className ='';
                  }
                  break;
            case 3://清除
                  let $ev3 = ev.currentTarget;
                  if($ev3.className ===''){
                    //$ev3.className ='active';

                  }else{
                    //$ev3.className ='';
                  }
                  this.clearFun();
                  break;
            default:
                break;
          }
      },
      clearTitleActive:function() {
        var els=document.getElementById('divTool').getElementsByClassName('active');
        if(els!=null&&els.length>0){
         for(var i=0;i<els.length;i++){
           var el=els[i];
           el.className='';
         }
        }
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

  .tool_container{ width:100%; height:100%; text-align: right; position: relative;}
  .tool_container .fold_btn,
  .tool_container .collapse_btn,
  .tool_container .tool_btns,
  .tool_container .tool_box{display: inline-block;vertical-align: middle;}
  .tool_container .border-shape{border:1px solid #798992; -webkit-border-radius:5px; -moz-border-radius:5px; border-radius:5px;}
  .tool_container .collapse_btn{ width:24px; height:40px; background: #042133 url('../../../static/img/gistool/arrow-right.png') no-repeat center center; background-size: 50% 50%;}
  .tool_container .fold_btn{width:24px; height:40px; background: #042133 url('../../../static/img/gistool/arrow-left.png') no-repeat center center; background-size: 50% 50%;}
  .tool_container .tool_btns,.tool_container .tool_box{ width:auto; margin-left: 5px;}
  .tool_container .tool_btns a,
  .tool_container .tool_btns a:hover,
  .tool_container .tool_box{display: inline-block;vertical-align: middle;text-decoration: none;padding:10px 10px;}
  .tool_container .tool_btns a span{display: inline-block;vertical-align: middle; color: #fff; font-size: 16px;}
  .tool_container .tool_btns a span.mark,
  .tool_container .tool_btns a span.txt,
  .tool_container .tool_btns a span.rang,
  .tool_container .tool_btns a span.screen{width: 22px;height:22px;}
  .tool_container .tool_btns a span.mark{background: url('../../../static/img/gistool/mark.png') no-repeat center; background-size: contain;}
  .tool_container .tool_btns a:hover span.mark,.tool_container .tool_btns a.active span.mark{background: url('../../../static/img/gistool/mark_hover.png') no-repeat center; background-size: contain;}
  .tool_container .tool_btns a span.txt{background: url('../../../static/img/gistool/text.png') no-repeat center; background-size: contain;}
  .tool_container .tool_btns a:hover span.txt,.tool_container .tool_btns a.active span.txt{background: url('../../../static/img/gistool/text_hover.png') no-repeat center; background-size: contain;}
  .tool_container .tool_btns a span.rang{background: url('../../../static/img/gistool/ranging.png') no-repeat center; background-size: contain;}
  .tool_container .tool_btns a:hover span.rang,.tool_container .tool_btns a.active span.rang{background: url('../../../static/img/gistool/ranging_hover.png') no-repeat center; background-size: contain;}
  .tool_container .tool_btns a span.screen{background: url('../../../static/img/gistool/screenshot.png') no-repeat center; background-size: contain;}
  .tool_container .tool_btns a:hover span.screen,.tool_container .tool_btns a.active span.screen{background: url('../../../static/img/gistool/screenshot_hover.png') no-repeat center; background-size: contain;}
  .tool_container .tool_btns a:hover span,.tool_container .tool_btns a.active span{color: #fff600;}
  .tool_container .tool_box{background-color: #00365a;}
  .tool_container .tool_box img,.tool_container .tool_box span{vertical-align: middle;display:inline-block;color: #fff;font-size: 16px;}

  .tool_container .text_box{ position: absolute; top:140%; left:100%;margin-left: -300px; width:300px;height:200px;border:1px solid #dbe1ec;
    -webkit-border-radius:6px;
    -moz-border-radius:6px;
    border-radius:6px;}
  .tool_container .text_box textarea{display: block;width: 280px;height:180px;background-color: transparent;border-width:0;color:#ffffff;font-size: 14px; padding:15px 5px 5px 15px;
    overflow-x: hidden;overflow-y: auto;}
</style>
