<template>
  <div class="f_b_img">
    <div class="h_a">
      <span><img src="../../../static/img/sec/sec_1.png"/></span>
     <!-- <span>{{this.community.name||'福田区'}}</span>-->
      <span>{{titleAdress}}</span>
    </div>
    <div class="h_b">
      <div class="h_b_a">
        <ul>
          <li><img src="../../../static/img/sec/sec_2.png"/></li>
          <li v-on:click="addressClick(-1,-2)" style="cursor: pointer;">福田区</li>
          <li v-show="showCommunity">></li>
          <li v-on:click="addressClick(-1,-1)" v-show="showCommunity" style="cursor: pointer;">{{this.community.name}}</li>
        </ul>
      </div>
      <div class="h_b_b">
        <ul>
          <li v-show="!showCommunity" v-for="(item, index) in this.address" v-bind:key="index">
            <a class="b_b_b_0" target="" href="javascript:void(0)" v-bind:title="item.name" v-on:click="addressClick(index,0,item.name)">{{item.name}}</a>
          </li>
          <li v-show="showCommunity" v-for="(item, index) in this.community.data" v-bind:key="'1-'+index">
            <a class="b_b_b_0 b_b_b_1" target="" href="javascript:void(0)" v-bind:title="item.properties.SQNAME"
               v-on:click="addressClick(index,1)">{{item.properties.SQNAME}}</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import {getStore} from "../../../static/js/OneMap/common/common.js"
  import {Fun} from "../../../static/js/OneMap/apiFuns.js";
  export default {
    name: "selectAddress",
    data: function () {
      return {
        // address:["福保","园岭","南园","福田","香蜜湖","沙头","梅林","华富","莲花","华强北"],
        address: [],
        community: {name: '', data: [], selected: {data: [-1, -1], disable: false}},
        showCommunity: false,
        mapType:0
      }
    },
    watch: {
      address: function (value, value2) {
        console.log(value)
        var $this = this
        setTimeout(function () {
          if ($this.community.selected.data[0] !== -1) {
            if (document.all) {
              document.getElementsByClassName('b_b_b_0')[$this.community.selected.data[0]].click();
            }
            // 其它浏览器
            else {
              var e = document.createEvent("MouseEvents");
              e.initEvent("click", true, true);
              document.getElementsByClassName('b_b_b_0')[$this.community.selected.data[0]].dispatchEvent(e);
            }
          }
        }, 2000)
      },
      titleAdress: function (value, value2) {
          if(value){
            let jsonDate = getStore('nodeId');
            console.log(jsonDate)
            this.$store.state.tableList = '';
            let ids = [];
            if(jsonDate.indexOf('[')!==-1){
              ids.push((jsonDate.split('["')[1]).split('"]')[0]);
              document.getElementById("iframeGisMap").contentWindow.module.common.layerControl.mapLayerOperate.closeSingleLayerById(ids[0]);
            }else {
              document.getElementById("iframeGisMap").contentWindow.module.common.layerControl.mapLayerOperate.closeSingleLayerById(jsonDate);
            }

            for(let i = 0;i< Fun.xmlArray.length;i++){
              for(let j = 0;j<Fun.xmlArray[i].nodes.length;j++){
                Fun.xmlArray[i].nodes[j].checked = false;
              }
            }

            if(value==='福田区'){
              this.showCommunity = false;
              Object.keys(document.getElementsByClassName('b_b_b_0')).forEach(function (value1, index1, array1) {
                document.getElementsByClassName('b_b_b_0')[index1].style.color = '#43d3ff'
              })

            }
          }
      }
    },
    mounted: function () {
      var $this = this
      this.$myAxios.myGet('../../../web/data/communityGeoData.json').then(function (data) {
        $this.address = data.data
      })
    },
    computed:{
      titleAdress(){
        return this.$store.state.addressStreet;
      }
    },
    methods: {
      addressClick: function (index, type, name) {
          this.mapType = this.$store.state.mapType;
        if (type === 0 && this.community.selected.disable === false) {
          //点击的是街道
          this.$store.state.addressStreet = name;
          this.showCommunity = true
          this.community.data = this.address[index].data
          this.community.name = this.address[index].name
          this.community.selected.data = [index, -1]
          document.getElementsByClassName('b_b_b_0')[index].style.color = '#ffab27'
          Object.keys(document.getElementsByClassName('b_b_b_0')).forEach(function (value1, index1, array1) {
            if (index1 !== index) {
              document.getElementsByClassName('b_b_b_0')[index1].style.color = '#43d3ff'
            }
          })
          if(this.address[index].id){
            let mapId0;
            if(this.mapType ===0){
              mapId0 =this.address[index].id;
            }else if(this.mapType ===1){
              mapId0 =this.address[index].id + '1';
            }
            document.getElementById("iframeGisMap").contentWindow.module.common.layerControl.mapLayerOperate.loadSingleLayerById(mapId0);
          }
        } else if (type === -1) {
          //切换街道
          this.showCommunity = !this.showCommunity
        } else if (type === -2) {
          //点击的是区
          this.$store.state.addressStreet = '福田区';
          this.showCommunity = false
          Object.keys(document.getElementsByClassName('b_b_b_0')).forEach(function (value1, index1, array1) {
            document.getElementsByClassName('b_b_b_0')[index1].style.color = '#43d3ff'
          })

          //增加浅色图层与深色的区别
          let mapId;
          if(this.mapType ===0){
            mapId ='layer_arcgis_basemap_futainqu';
          }else if(this.mapType ===1){
            mapId ='layer_arcgis_basemap_futainqu1';
          }
          document.getElementById("iframeGisMap").contentWindow.module.common.layerControl.mapLayerOperate.loadSingleLayerById(mapId); // 加载福田区

        } else if (type === 1) {
          //点击的是社区
          this.community.selected.data[1] = index
          document.getElementsByClassName('b_b_b_1')[index].style.color = '#ffab27'
          Object.keys(document.getElementsByClassName('b_b_b_1')).forEach(function (value1, index1, array1) {
            if (index1 !== index) {
              document.getElementsByClassName('b_b_b_1')[index1].style.color = '#43d3ff'
            }
          })
        }
        console.log(this.community.selected.data[0], this.community.selected.data[1])

        if (this.community.selected.data[0] !== -1) {
          //切换街道地图

          if (this.community.selected.data[1] !== -1) {
            //将社区一到屏幕中央并修改zomm值
            var tempCoordinates = this.address[this.community.selected.data[0]].data[this.community.selected.data[1]].geometry.coordinates
            document.getElementById("iframeGisMap").contentWindow.module.common.mapTool.mapOperate.setMapViewCenter(tempCoordinates[0], tempCoordinates[1])
            // document.getElementById("iframeGisMap").contentWindow.module.common.mapTool.mapOperate.setMapViewZoom(15)
          }
        }
      }
    }
  }
</script>


<style  scoped>
  .h_a{position: absolute;  top: 100px; left: 55px;width:575px; height:36px; line-height: 36px; text-align: left; margin: 0px auto 24px; overflow: hidden; font-size: 36px; color: #43d3ff;}
  .h_a span{float: left; display: inline; overflow: hidden;}
  .h_a span:nth-child(1) img{ width: 24px; height: 36px; margin-right: 10px;}
  .h_b{ position: absolute; top:165px; left: 55px; width:575px; height:210px; text-align: left; margin: 0px auto; overflow: hidden; }
  .h_b_a{width:575px; height:40px; line-height: 40px; text-align: left; margin: 0px auto 20px; overflow: hidden; }
  .h_b_a ul{width:575px; height:40px; line-height: 40px; text-align: left; margin: 0px auto; overflow: hidden;  padding: 0;}
  .h_b_a ul li,.h_b_a ul li a{text-decoration: none; width:auto; height:40px; line-height: 40px; text-align: left; margin: 0px 10px 0px 0px; float: left; display: inline;  overflow: hidden; font-size: 30px; color: #ffffff;}
  .h_b_a ul li a:hover,.h_b_a ul li a:focus{
    text-decoration: none; width:auto; height:40px; line-height: 40px; text-align: left; margin: 0px 10px 0px 0px; float: left; display: inline;
    overflow: hidden; font-size: 30px; color: #FFAB27;
  }
  .h_b_a ul li img{ width: 9px; height: 18px; margin: 11px auto;}
  .h_b_b{width:575px; height:150px; line-height: 50px; text-align: center; margin: 0px auto; overflow: hidden; }
  .h_b_b ul{/*width:126px;*/ height:150px; line-height: 50px; text-align: center; margin: 0px auto; overflow: hidden; padding: 0;}
  .h_b_b ul li{/*width:126px;*/ height:50px; line-height: 50px;
    text-align: center; margin: 0px 10px; float: left; display: inline;  overflow: hidden; }
  .h_b_b ul li a{ /*width:126px;*/ height:50px; display: block; text-decoration: none; font-size: 20px; color: #43d3ff;}
  .h_b_b ul li a:hover,.h_b_b ul li a:active,.h_b_b ul li a:focus,.h_b_b ul li .active{
    /*width:126px;*/  height:50px; display: block; text-decoration:underline; font-size: 20px; color: #ffab27;}

  .f_b_img{
    position: absolute;
    width: 750px;
    height: 100%;
    /*background: linear-gradient(to left, #00141f, #021621, #152e48);*/
    background: linear-gradient(to right,rgba(13,32,42,0.8),transparent) ;
  }

</style>
