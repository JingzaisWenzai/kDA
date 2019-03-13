<template>
  <div class="filter_videoType">
    <i class = 'close' @click="toClose"></i>
    <div class="type">
      视频类型：
      <el-dropdown @command="handleClick" trigger="click">
        <span class="el-dropdown-link"><span>{{title}}</span><i class="el-icon-arrow-down el-icon--right"></i></span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-for="(item,index) in videoType" :key="index" :command="{item,index}">{{item.name}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div>
      <ul>
        <li v-for="(item,index) in types" :key="index">
          <a :class="item.selectClass?'selectClass':''" @click="selectAction(item,$event,index)">{{item.name}}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

  import bus from '../../../assets/js/main'

    export default {
        name: "videoType",
      data(){
          return{
            videoType:[
              {
                'name':'重点区域',
                'data':[{name:'市民中心'},{name:'莲花山公园'},{name:'华强北'},{name:'福田口岸'}]
              },
              {
                'name':'道路',
                'data':[{name:'深南大道'},{name:'滨河大道'},{name:'北环大道'}]
              },
              {
                'name':'其他',
                'data':[{name:'易涝点'},{name:'港口'},{name:'地铁站'},{name:'三小场所'},{name:'公园'},{name:'海堤'},{name:'学校'},{name:'工地'},{name:'河道'}]
              }
            ],
            types:[],
            showVideoType:true,
            title:'',
            index:0
          }
      },
      props:['layerId'],
      mounted(){
        this.types = this.videoType[0].data
        this.title = this.videoType[0].name
        for(let i = 0,j = this.videoType.length;i<j;i+=1){
          if(i === 0){
            this.$set(this.videoType[i],"selectClass", true)
          }else {
            this.$set(this.videoType[i],"selectClass", false)
          }
          for(let n = 0,m = this.videoType[i].data.length;n<m;n+=1){
            this.$set(this.videoType[i].data[n],"selectClass", false)
          }
        }

      },
      methods:{
        handleClick(command){
          this.title = command.item.name
          this.types = command.item.data
          this.index = command.index
          // this.videoType.selectClass = !this.videoType.selectClass
        },
        toClose:function(){
          bus.$emit('videoTypeFilter',{state:false});
        },
        selectAction(item,event,index){
          let temp = event.currentTarget.className
          for(let i = 0,j = this.videoType.length;i<j;i+=1){
            for(let n = 0,m = this.videoType[i].data.length;n<m;n+=1){
              if(this.videoType[i].data[n].selectClass === true){
                if(i === this.index && index === n){
                }else {
                  this.videoType[i].data[n].selectClass = false
                }
                document.getElementById("iframeGisMap").contentWindow.module.common.layerControl.mapLayerOperate.removeSingleLayerById(this.layerId);
                var node = document.getElementById("iframeGisMap").contentWindow.module.common.layerControl.mapLayerXml.getLayerNodeById(this.layerId);
                node.query = '';
                document.getElementById("iframeGisMap").contentWindow.module.common.layerControl.mapLayerOperate.loadSingleLayerByNode(node);
              }
            }
          }

          this.types[index].selectClass = !this.types[index].selectClass

          if(this.types[index].selectClass === true){
            document.getElementById("iframeGisMap").contentWindow.module.common.layerControl.mapLayerOperate.removeSingleLayerById(this.layerId);
            var node = document.getElementById("iframeGisMap").contentWindow.module.common.layerControl.mapLayerXml.getLayerNodeById(this.layerId);
            node.query += '&name='+item.name;
            document.getElementById("iframeGisMap").contentWindow.module.common.layerControl.mapLayerOperate.loadSingleLayerByNode(node);
          }


          // if(temp.search('selectClass') !== -1){
          //   event.currentTarget.className = ''
          //   document.getElementById("iframeGisMap").contentWindow.module.common.layerControl.mapLayerOperate.removeSingleLayerById(this.layerId);
          //   document.getElementById("iframeGisMap").contentWindow.module.common.layerControl.mapLayerOperate.loadSingleLayerById(this.layerId)
          // }else {
          //   event.currentTarget.className = 'selectClass'
          //
          //   document.getElementById("iframeGisMap").contentWindow.module.common.layerControl.mapLayerOperate.removeSingleLayerById(this.layerId);
          //   var node = document.getElementById("iframeGisMap").contentWindow.module.common.layerControl.mapLayerXml.getLayerNodeById(this.layerId);
          //   node.query = 'name='+item.name;
          //   document.getElementById("iframeGisMap").contentWindow.module.common.layerControl.mapLayerOperate.loadSingleLayerByNode(node);
          // }
        }
      }
    }
</script>

<style lang="scss" scoped>
  .filter_videoType{
    text-align:left;
    width:100%;
    height:100%;
    border:1px solid #00d8ff;
    background-color: rgba(0,58,88,0.7);
    -webkit-border-radius:5px;
    -moz-border-radius:5px;
    border-radius:5px;
    padding: 15px 10px;
    position: relative;
    .close{
      position: absolute;
      top:10px;
      left:100%;
      margin-left: -40px;
      cursor:pointer;
      width:24px;
      height:24px;
      background: url('../../../static/img/yxzx/close.png') no-repeat center;
      background-size: contain;
    }
    .el-dropdown-link{
      color: #81fbff;
      font-size: 16px;
    }
    .type{
      color: white;
      font-size: 16px;
      cursor:pointer;
    }
    ul{
      padding: 10px 0;
      li{
        list-style: none;
        display: inline-block;
        margin: 6px;
        a{
          color: #81fbff;
          font-size: 16px;
          padding: 5px;
          background-color: #076081;
          border-radius: 5px;
          text-decoration:none;
        }
        a:hover{
          color:#ffc600;
        }
        .selectClass{
          color:#ffc600;
        }
      }
    }
  }
</style>
<style lang="scss">
  .el-dropdown-menu{
    background-color: #076081 !important;
    li{
      color: #81fbff;
      /*font-size: 14px;*/
    }
    li:hover{
      color:#ffc600 !important;
      background: #076081 !important;
    }
  }
</style>
