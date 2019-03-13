<template>
  <div class="nearBy">
    <div class="search-box the-shadow resource_bg box-shadow">
      <div class="resource_timeline">
        <p class="resource_tit">{{page.line1}}<span @click="toClose" class="back"></span></p>
        <div class="timeline">
          <time-line @theRange = 'toDefineRange'></time-line>
        </div>
      </div>
      <div class="resource_poi">
        <p class="resource_tit resource_special">{{page.line2}}</p>
        <div class="poi">
          <div class="items" v-for="(item,index) in pagePoi" :key="index">
            <p class="poi_tit">{{item.name}}</p>
            <div class="poi_content">
              <span v-for="(a , c) in item.sub" :key="c" @click="toAddPoi($event, item.name,a.layerid)">{{a.name}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="resource_btn"><a @click="toClearPoi">{{page.btn2}}</a><a @click="toSubmitPoi">{{page.btn}}</a></div>
    </div>
    <div class="showNearBy box-shadow" v-if="ContentPage.length !==0 ">
      <div class="nearBy_content">
        <p class="resource_tit resource_special">
          <span>{{page.line3}}</span>
          <a class="total"><i></i><span>资源总数</span><span>:</span><span>{{ContentPageTotal}}</span></a>
        </p>
        <div class="select_poi_content">
          <a v-for="(item,index) in ContentPage" :key="index" :class="item.className" @click="toShowNodes(item.layerid)">
            <span>{{item.name}}</span><span>：</span><span>{{item.value}}</span>
          </a>
        </div>
 <!--       <div class="select_poi_close"><a>{{page.btn3}}</a></div>-->
      </div>
    </div>
  </div>
</template>
<script>

  import {getSearchResource} from '../../../../api/ecoapi';
  import TimeLine from './TimeLine.vue';
  import backUrl from '../../../../static/img/common/search/back.png';
  import resourch from '../../../../static/img/common/search/resource_nearby.png';
  import search from '../../../../static/img/common/search/search_nearby.png';
  import {Fun} from '../../../../static/js/OneMap/apiFuns';
  import {getPOI} from '../../../../api/secapi';

  export default{
    data(){
      return{
          page:{
              line1:'选择需要搜索的半径：',
              line2:'请选择需要搜索的对象：',
              line3:'已选择的POI对象:',
              btn:'确定',
              btn2:'清除',
              btn3:'关闭'
          },
          query:{
              range:'0.5',
              poi:[]
          },
          center:{
              name:'',
              jd:'',
              wd:''
          },
          ContentPageTotal:0,   /*显示已经点击的落点的总数*/
          ContentPage:[],  /*显示已经点击的落点的各项的数量*/
          laodNodes:[],
        pagePoi:[]
      }
    },
    computed:{
      // pagePoi:function(){
      //     return this.$store.state.Search.POI;        /*在vuex部分 store下的index.js 中公共定义*/
      // },
      clearNearByNodes:function(){
        return this.$store.state.Resource.clearNearByNodes;
      }
    },
    mounted(){
      this.toLoadPOI()
    },
    watch:{
      ContentPage:{
        handler:function(){},
        deep:true
      },
      pagePoi:{
          handler:function(){},
          deep:true
      },
      clearNearByNodes:{
        handler:function(val,oldVal){
          if(val ==='yes'){
            this.query.poi=[];
            $('.poi_content span').each(function(){
                if($(this).attr('class')!==''){
                  $(this).attr('class','');
                }
            });
            this.ContentPage=[];
            this.$store.state.Resource.clearNearByNodes ='no';
          }
        },
        deep:true
      },
      query:{
          handler:function(){},
          deep:true
      }
    },
    methods:{
      toClearPoi:function(){
        /*清楚周边搜索的落点及图层*/
        $('.poi_content span').each(function(){
          if($(this).attr('class')!==''){
            $(this).attr('class','');
          }
        });
        this.ContentPage=[];
        this.query.poi=[];
        Fun.clearLoadPopAndNodes(2);  /*不清除落点*/
      },
      toClose:function(){
          this.$emit('closeResouce','on');
          this.query.poi=[];
      },
      async toShowNodes(oid){
        for(let k=0;k<this.ContentPage.length;k++){
            if(this.ContentPage[k].layerid === oid){
              if(this.ContentPage[k].className ==='on'){
                this.ContentPage[k].className='';
                document.getElementById("iframeGisMap").contentWindow.module.layerQuery.featureNearbyQuery.closePointJsonCircleSearchResultLayer(oid);
              }else{
                this.ContentPage[k].className='on';
                document.getElementById("iframeGisMap").contentWindow.module.layerQuery.featureNearbyQuery.openPointJsonCircleSearchResultLayer(oid);
              }

            }
        }
      },
      async getSubmitPoi(query){
          let tables = [],node;
          for(let j=0;j<query.poi.length;j++){
            node = await document.getElementById("iframeGisMap").contentWindow.module.common.layerControl.mapLayerXml.getLayerNodeById(query.poi[j]);
            tables.push(node.table);
          }
          query.tables = tables.join(',');
          let data = await getSearchResource(query);
          if(data){
            this.ContentPage=[];
            this.ContentPageTotal=0;
            for(let i=0;i<data.length;i++){
              this.ContentPage.push({
                name:data[i].obj_Name,
                value:data[i].count,
                className:'on',
                layerid:data[i].layerid
              });
              this.ContentPageTotal += data[i].count;
            }
          }
      },
      async toSubmitPoi(){
          /*将query参数传输到后台进行落点*/
          /*先清除已经落图的弹窗*/
          Fun.clearLoadPopAndNodes(3);
          /*单点落点*/
          if(this.query.poi.length ===0){
              alert('请选择想要搜索的POI项！')
          }else{
      //    console.log('在中心为'+this.center.name+'，范围为'+this.query.range+'的区域，对符合POI项为'+this.query.poi.join('， ')+'的项目进行地图落点');

            let oquery ={
              range: this.query.range,
              wd:this.$store.state.Resource.searchCenter.wd,
              jd:this.$store.state.Resource.searchCenter.jd,
              poi:this.query.poi,
              layerid: this.$store.state.Resource.searchCenter.layerid,
              tableName:this.$store.state.Resource.searchCenter.tableName
            };
            //出现弹窗
            this.getSubmitPoi(oquery);
            let da;
            for(let i=0;i<oquery.poi.length;i++){
              da = oquery.poi[i];
              document.getElementById("iframeGisMap").contentWindow.module.layerQuery.featureNearbyQuery.loadPointJsonLayerByCircleSearch(da,oquery.jd,oquery.wd,Number(this.query.range)*1000);
            }
          }
      },
      toDefineRange:function(arg){
          this.query.range = arg;
      },
      toAddPoi:function(ev,parentName,layerid){
          //let name = parentName + '-' + tabName;
          let name =layerid;
          let cls = ev.currentTarget.className;
          let index = cls.indexOf('on');
          if(index !== -1){
            ev.currentTarget.className = ev.currentTarget.className.replace('on','');
            let idx = this.query.poi.indexOf(name);
            this.query.poi.splice(idx,1);
          }else{
              if(ev.currentTarget.className!==''){
                ev.currentTarget.className =  ev.currentTarget.className.push(' on');
              }else{
                ev.currentTarget.className ='on';
              }
              this.query.poi.push(name);
          }
//          console.log(this.query.poi);
      },
      async toLoadPOI(){
        let data = await getPOI();
        let arr = data,res=[];
        if(arr!=={}){
          //{}==={} false[]===[] false
          if(arr.topGroupList && arr.topGroupList.length!==0){
            for(let m =0;m<arr.topGroupList.length;m++){
              let brr = arr.topGroupList[m], drr,a,b,c;
              drr=[];
              for(let j=0;j<brr.topGroupTwoList.length;j++){
                a =   brr.topGroupTwoList[j];
                drr.push({
                  name:a.label,
                  layerid:a.id || 'null'
                })
              }
              res.push({
                name:brr.label,
                sub:[].concat(drr)
              })
            }
          }else{
            res = []
          }
        }else{
          res=[]
        }
        this.pagePoi = res;
      }
    },
    components:{
      TimeLine
    }
  }
</script>
<style scoped>
  @import '../../../../assets/css/center-search.css';

  /*导航栏的特殊样式*/
  ::-webkit-scrollbar{width:16px!important;height:16px!important;}
  ::-webkit-scrollbar-track,
  ::-webkit-scrollbar-thumb{border-radius:999px!important; border:4px solid transparent!important;}
  ::-webkit-scrollbar-track{box-shadow:1px 1px 5px rgba(185,165,150,.2) inset!important;}
  ::-webkit-scrollbar-thumb{min-height:20px!important;background-clip:content-box!important;box-shadow: 0 0 0 5px rgba(25,109,180,0.5) inset!important;}
  ::-webkit-scrollbar-corner{/*background:transparent;*/}

  .nearBy{width:100%;height:100%; }
  .box-shadow{
    background-color: rgba(4,30,56,0.85)!important; border:1px solid #0084ff!important;text-align: left;
    -webkit-border-radius: 8px!important;
    -moz-border-radius: 8px!important;
    border-radius: 8px!important;}
  .resource_bg{width:100%;height:75%;}
  .resource_bg .resource_timeline,
  .resource_bg .resource_poi,
  .resource_bg .resource_btn{width: 90%;margin:0 auto;}
  .resource_bg .resource_timeline{border-bottom:1px solid #0982a2;margin-top:20px;}
  .resource_bg .resource_timeline .timeline{padding:20px 0 0 0; width:100%; height:85px;}
  .resource_bg .resource_poi{height:67%;width: 90%;margin:0 auto;}
  .resource_bg div .resource_tit,
  .showNearBy div .resource_tit {color: #00d8ff;font-size:22px; padding:0;    position: relative;}
  .resource_bg div .resource_special {margin-top: 10px;margin-bottom: 10px;}
  .resource_bg div .resource_tit .back{ display: inline-block;position:absolute;left:100%;margin-left: -30px; background: url('../../../../static/img/common/search/cross_dkg.png') no-repeat center;background-size: contain;    width: 18px;
    height: 18px;}
  .resource_bg .resource_poi .poi {overflow-x: hidden;overflow-y: auto;height: calc(100% - 55px);text-align:left;width:100%;}
  .poi .items{width:100%;clear:both;}
  .poi .items .poi_tit{font-size: 18px;color:#fff;padding:6px 0;width:100%;display: block;}
  .poi .items .poi_content{clear: both; width:100%;}
  .poi .items .poi_content span{ cursor: pointer;width: auto;display: block;float: left; color: #00d8ff;font-size: 16px; padding:6px 20px;}
  .poi .items .poi_content span.on,.poi .poi_content span:hover{color:#ffab27; cursor: pointer;}
  .resource_bg .resource_btn{text-align: right;}
  .resource_bg .resource_btn a{ cursor: pointer;margin-top:10px;display: inline-block;color:#00d8ff;padding:2px 25px;width:auto;font-size: 16px; border: 1px solid #2f5ca9;-webkit-border-radius:5px;  -moz-border-radius:5px; border-radius:5px;}
  .resource_bg .resource_btn a:first-child{margin-right: 20px;}
  .resource_bg .resource_btn a:last-child{background-color: #196db4;color:#fff;border:1px solid transparent;}
  .showNearBy{
    width: 100%;
    height:22%;
    margin-top: 4%;
  }
  .showNearBy div.nearBy_content {width: 90%;height:100%;  margin:0 auto;padding:10px 0;}
  .showNearBy div  .resource_tit{position: relative;}
  .showNearBy div  .resource_tit .total{display:block;text-decoration: none;text-align: right; position: absolute;right:0;width:auto;height:auto;top:0;}
  .showNearBy div  .resource_tit .total span,
  .showNearBy div  .resource_tit .total i{display: inline-block;vertical-align: middle;}
  .showNearBy div  .resource_tit .total i{width:10px;height:10px; -webkit-border-radius:10px;  -moz-border-radius:10px;  border-radius:10px;background-color: #009bff;margin-right: 10px;}
  .select_poi_content{ width:100%;text-align: left;  margin:3% 0 0 0;overflow-x: hidden;overflow-y: auto;height:70%;}
  .select_poi_content a{ cursor: pointer; display: inline-block;vertical-align: middle;width:auto;height:auto;margin-right: 20px;color: #00d8ff;font-size: 16px; padding:2px 8px;}
  .select_poi_content a.on,
  .select_poi_content a:hover{color:#ffab27;}
  .select_poi_close{width:100%;text-align: right;}
  .select_poi_close a{display: inline-block; padding:2px 25px;width:auto;font-size: 16px; height:auto;cursor: pointer; background-color: #196db4;color:#fff;-webkit-border-radius:5px;  -moz-border-radius:5px; border-radius:5px;}
</style>
