<template>
 <!-- <div class="f_b_img">-->
  <!--  <div class="h_a">
      <span><img src="../../static/img/sec/sec_1.png"/></span>
      <span>福保街道</span>
    </div>-->
    <div class="h_b">
      <div class="h_b_a">
        <ul>
          <li><img src="../../../static/img/sec/sec_2.png"/></li>
          <li v-on:click="addressClick(-1,-2)" style="cursor: pointer;">福田区</li>
          <li v-show="showCommunity">></li>
          <li v-on:click="addressClick(-1,-1)" v-show="showCommunity" style="cursor: pointer;">{{community.name}}</li>
        </ul>
      </div>
      <div class="h_b_b">
        <ul>
          <li v-for="(item, index) in this.address" v-bind:key="index">
            <a :class="item.selectClass?'selectClass':''" v-on:click="addressClick(index,0)">{{item.name}}</a>
          </li>
          <!--<li v-show="showCommunity" v-for="(item, index) in this.community.data" v-bind:key="'1-'+index">-->
            <!--<a  :class="item.selectClass?'selectClass ':' '"-->
               <!--v-on:click="addressClick(index,1)">{{item.properties.SQNAME}}</a>-->
          <!--</li>-->
        </ul>
      </div>
    </div>
<!--  </div>-->
</template>

<script>
  import {Fun} from "../../../static/js/OneMap/apiFuns.js"
  export default {
    name: "selectAddress",
    data: function () {
      return {
        // address:["福保","园岭","南园","福田","香蜜湖","沙头","梅林","华富","莲花","华强北"],
        address: [],
        community: {name: '', data: [], selected: {data: [-1, -1], disable: false}},
        showCommunity: false,
        index:0,
        mapType:0,
        mapId : 'layer_arcgis_basemap_futainqu'
      }
    },
    watch: {

    },
    mounted: function () {
      var $this = this
      this.$myAxios.myGet('../../../web/data/communityGeoData.json').then(function (data) {
        console.log(data)
        $this.address = data

        for(let i = 0,j = $this.address.length;i<j;i+=1){
          $this.$set($this.address[i],'selectClass',false)
          for(let n = 0,m = $this.address[i].data.length;n<m;n+=1){
            $this.$set($this.address[i].data[n],'selectClass',false)
          }
        }
      })
    },
    methods: {
      addressClick: function (index, type) {

        // this.mapType = this.$store.state.mapType

        // if(this.mapType === 0){
        //   for(let i = 0,j = this.address.length;i<j;i+=1){
        //     this.address[i].id = this.changeId(this.address[i].id,false)
        //   }
        //   this.mapId = this.changeId(this.mapId,false)
        // }else {
        //   for(let i = 0,j = this.address.length;i<j;i+=1){
        //     this.address[i].id = this.changeId(this.address[i].id,true)
        //   }
        //   this.mapId = this.changeId(this.mapId,true)
        // }


        console.log(index,type)

        if(type === 0){
          //点击街道
          for(let n = 0,m = this.address.length;n<m;n+=1){
            this.address[n].selectClass = false
            for(let i = 0,j = this.address[n].data.length;i<j;i+=1){
              this.address[n].data[i].selectClass = false
            }
          }
          this.address[index].selectClass = true
          this.community = this.address[index]
          this.index = index
          this.showCommunity = true
          // this.$store.state.addressStreet = '福田区-'+this.address[index].name
          this.$store.state.addressStreet = this.address[index].name
          document.getElementById("iframeGisMap").contentWindow.module.common.layerControl.mapLayerOperate.removeSingleLayerById('layer_basegeo_boundary_shequ_anquan');
          // document.getElementById("iframeGisMap").contentWindow.module.common.layerControl.mapLayerOperate.loadSingleLayerById(this.address[index].id);
          document.getElementById("iframeGisMap").contentWindow.module.layerControl.basegeoLayer.baseMap.layer_arcgis_tilelayer_futianBaseMap_load(this.address[index].id)
          document.getElementById("iframeGisMap").contentWindow.module.common.mapTool.mapOperate.setMapViewCenter(this.address[index].coordinates[0], this.address[index].coordinates[1])
          document.getElementById("iframeGisMap").contentWindow.module.common.mapTool.mapOperate.setMapViewZoom(6);
          Fun.clearLoadPopAndNodes(0);
        }else if(type === 1){
          //点击社区
          for(let n = 0,m = this.address.length;n<m;n+=1){
            for(let i = 0,j = this.address[n].data.length;i<j;i+=1){
              if(i === index && n === this.index){
              }else {
                if(this.address[n].data[i].selectClass === true){
                  this.address[n].data[i].selectClass = false
                }
              }
            }
          }
          this.address[this.index].data[index].selectClass = true
          // this.$store.state.addressStreet = '福田区-'+this.address[index].name+'-'+this.address[this.index].data[index].properties.SQNAME
          this.$store.state.addressStreet = this.address[this.index].data[index].properties.SQNAME
          // document.getElementById("iframeGisMap").contentWindow.module.common.layerControl.mapLayerOperate.removeSingleLayerById(this.address[this.index].id);
          let tempCoordinates = this.address[this.index].data[index].geometry.coordinates
          document.getElementById("iframeGisMap").contentWindow.module.layerControl.basegeoLayer.boundary.load_layer_basegeo_boundary_shequ_anquan("layer_basegeo_boundary_shequ_anquan","SQNAME",this.address[this.index].data[index].properties.SQNAME);
          document.getElementById("iframeGisMap").contentWindow.module.common.mapTool.mapOperate.setMapViewCenter(tempCoordinates[0], tempCoordinates[1])
          document.getElementById("iframeGisMap").contentWindow.module.common.mapTool.mapOperate.setMapViewZoom(6);
          Fun.clearLoadPopAndNodes(0);
        }else {
          this.showCommunity = false;
          if(type === -2){
            //点击福田区
            for(let n = 0,m = this.address.length;n<m;n+=1){
              this.address[n].selectClass = false
              for(let i = 0,j = this.address[n].data.length;i<j;i+=1){
                this.address[n].data[i].selectClass = false
                }
            }
            this.$store.state.addressStreet = '福田区';
            document.getElementById("iframeGisMap").contentWindow.module.common.layerControl.mapLayerOperate.removeSingleLayerById('layer_basegeo_boundary_shequ_anquan');
            // document.getElementById("iframeGisMap").contentWindow.module.common.layerControl.mapLayerOperate.loadSingleLayerById(this.mapId);
            document.getElementById("iframeGisMap").contentWindow.module.layerControl.basegeoLayer.baseMap.layer_arcgis_tilelayer_futianBaseMap_load(this.mapId)
            document.getElementById("iframeGisMap").contentWindow.module.common.mapTool.mapOperate.setMapViewCenter(114.049, 22.539)
            document.getElementById("iframeGisMap").contentWindow.module.common.mapTool.mapOperate.setMapViewZoom(4);
            Fun.clearLoadPopAndNodes(0);
          }
        }
//        console.log(this.$store.state.addressStreet)
      },
      changeId(id,state){
        if(state){
          if(id.search('1') !== -1){
            return id
          }else {
            return id+'1'
          }
        }else {
          if(id.search('1') !== -1){
            return id.split('1')[0]
          }else {
            return id
          }
        }
      }
    }
  }
</script>


<style  scoped>
  .h_a{width:100%; height:36px; line-height: 36px; text-align: left; margin: 0px auto 24px; overflow: hidden; font-size: 36px; color: #43d3ff;}
  .h_a span{float: left; display: inline; overflow: hidden;}
  .h_a span:nth-child(1) img{ width: 24px; height: 36px; margin-right: 10px;}
  .h_b{ width:100%; height:100%; text-align: left; margin: 0 auto; overflow: hidden; }
  .h_b_a{width:100%; height:30px; line-height: 30px; text-align: left; margin: 0px auto 20px; overflow: hidden; }
  .h_b_a ul{width:100%; height:30px; line-height: 30px; text-align: left; margin: 0px auto; overflow: hidden;  padding: 0;}
  .h_b_a ul li,.h_b_a ul li a{text-decoration: none; width:auto; height:30px; line-height: 30px; text-align: left; margin: 0px 10px 0px 0px; float: left; display: inline;  overflow: hidden; font-size: 22px; color: #ffffff;}
  .h_b_a ul li a:hover,.h_b_a ul li a:focus{
    text-decoration: none; width:auto; height:30px; line-height: 30px; text-align: left; margin: 0px 10px 0px 0px; float: left; display: inline;
    overflow: hidden; font-size: 22px; color: #FFAB27;
  }
  .h_b_a ul li img{ width: 9px; height: 18px; margin: 6px auto;}
  .h_b_b{width:100%; height:70px; line-height: 30px; text-align: center; margin: 0px auto; overflow: hidden; }
  .h_b_b ul{/*width:126px;*/ height:150px; line-height: 30px; text-align: center; margin: 0px auto; overflow: hidden; padding: 0;}
  .h_b_b ul li{/*width:126px;*/ height:30px; line-height: 30px;
    text-align: center; margin: 0px 10px; float: left; display: inline;  overflow: hidden; }
  .h_b_b ul li a{ /*width:126px;*/ height:30px; display: block; text-decoration: none; font-size: 14px; color: #43d3ff;}
  .h_b_b ul li a:hover,.h_b_b ul li a:active,.h_b_b ul li a:focus,.h_b_b ul li .active{
    /*width:126px;*/  height:30px; display: block; text-decoration:underline; font-size: 14px; color: #ffab27;}

  .f_b_img{
    position: absolute;
    width: 530px;
    height: 100%;
    /*background: linear-gradient(to left, #00141f, #021621, #152e48);*/
    background: linear-gradient(to right,rgba(13,32,42,0.8),transparent) ;
  }
  .selectClass{
    color: #ffab27 !important;
  }

</style>
