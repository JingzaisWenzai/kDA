<template>
  <div id="related" class="qiye_related">
    <div class="title">
      <a class="content"><i></i> <span>{{titleName}}</span></a>
      <span class="close" @click="toClose"></span>
    </div>
    <div class="navBar">
      <ul>
        <li :class=" navNow  === index?'active':''" v-for="(item , index) in navBar" :key = 'index' @click="toChangeNav(index)">{{item}}</li>
      </ul>
    </div>

    <div class="related-table" v-if="navContentStyle==='1'">

      <ul v-for="(a , b) in cardBox" :key ='b' >
        <p>{{a.name}}</p>
        <li v-for="(c , d) in a.data" :key='d'><span>{{c.name}}</span><span>:</span><span>{{c.value}}</span></li>
      </ul>
    </div>

    <div class="related-table"  v-else-if="navContentStyle==='2'">
      <table>
        <thead>
        <tr>
          <th>序号</th><th v-for="(e,f) in tableBox.thead" :key="f"> {{e}}</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for ='(g,h) in tableBox.tbody' :key="h">
          <td>{{h + 1}}</td>
          <td v-for="(i,o) in g" :key="o">{{i}}</td>
        </tr>
        </tbody>
      </table>
    </div>

    <div class="related-table"   v-else-if="navContentStyle === '3'">
      <ul>
        <li v-for="(value,key,index) in cardBoxContent" :key='index'><span>{{key}}</span><span>:</span><span>{{value}}</span></li>
      </ul>
    </div>

  </div>
</template>
<script>
  import {getPopUp_ThreeS,getPopUp_Emergency} from '../../../../api/secapi';
  export default{
      data(){
          return {
              navBar:[],
              navBarBox:[
                  ['场所详情','责任人','巡查隐患'],  /*三小场所 ,'预警信息'·· */
                  ['应急物资']                                 /*应急物资*/
              ],
              titleName:'',
              cardBox:[],
              cardBoxContent:{},
              tableBox:{
                  thead:[],
                  tbody:[]
              },
              navNow:0,
              flagType:'',
              navContentStyle:''    /*内容展示的形式*/
          }
      },
      computed:{
        flag1(){
          return this.$store.state.ShowThreeS;  /*三小*/
        },
        flag2(){
          return this.$store.state.ShowEmergency;  /*应急物资*/
        }
      },
      watch:{
        flag1:{
          handler:function(val,oldVal){
            if(val==='yes'){
              this.flagType='1';
              this.getData(this.navNow,this.flagType);
            }
          },
          deep:true
        },
        cardBoxContent:{
          handler:function(val,oldval){},
          deep:true
        },
        flag2:{
          handler:function(val,oldVal){
            if(val==='yes'){
              this.flagType='2';
              this.getData(this.navNow,this.flagType);
            }
          },
          deep:true
        },
        navBar:{
          handler:function(val,oldval){},
          deep:true
        },
        tableBox:{
          handler:function(val,oldval){},
          deep:true
        }
      },
      methods:{
        async getData(nav,type){
          let odata,data,cardBox1, cardBox2;
          let oid = this.$store.state.detailMessageId;
          let name =this.$store.state.detailMessageName;
          this.navBar = this.navBarBox[Number(type) - 1];
          if(nav===0){
            if(type==='1'){
              odata = await getPopUp_ThreeS({id:oid});
              data = odata;
              if(data){
                this.titleName = data.name;
                let a;
                for(let i=0;i<data.data.length;i++){
                  a = data.data[i];
                  if(a.name.indexOf('场所')!==-1){
                    this.cardBoxContent = a.data;
                    this.navContentStyle='3';
                  }
                }
              }else{
                console.log('三小场所接口有误！');
              }

            }else if(type==='2'){
              odata =await getPopUp_Emergency({id:name});
              data = odata;
              if(data){
                this.titleName = data.name;
                this.tableBox = data.data;
                this.navContentStyle='2';
              }else{
                console.log('应急仓库接口有误！');
              }
            }
          }else if(nav === 1){
            if(type==='1'){
              odata = await getPopUp_ThreeS({id:oid});
              data = odata;
              if(data){
                let a;
                for(let i=0;i<data.data.length;i++){
                  a = data.data[i];
                  if(a.name.indexOf('责任')!==-1){
                    this.cardBoxContent = a.data;
                    this.navContentStyle='3';
                  }
                }
              }else{
                console.log('三小场所接口有误！');
              }
            }
          }else if(nav === 2){
            if(type==='1'){
                odata = await getPopUp_ThreeS({id:oid});
                 data = odata;
                if(data) {
                  let a;
                  for (let i = 0; i < data.data.length; i++) {
                    a = data.data[i];
                    if (a.name.indexOf('巡查隐患') !== -1) {
                      this.tableBox = a.data;
                      this.navContentStyle = '2';
                    }else{
                      this.tableBox = {
                        thead:[],
                        tbody:[]
                      };
                      this.navContentStyle = '2';
                    }
                  }
                }
            }
          }
        },
        toClose:function(){
          this.$store.state.ShowThreeS ='no';
          this.$store.state.ShowEmergency ='no';
          this.navNow = 0;
        },
        toChangeNav:function(index){
            this.navNow = index;
            if(this.flagType!==''){
              this.getData(this.navNow,this.flagType);
            }
        }
      }
  }
</script>
<style scoped>
  ::-webkit-scrollbar{width:16px;height:16px;}
  ::-webkit-scrollbar-track,
  ::-webkit-scrollbar-thumb{border-radius:999px;border:4px solid transparent;}
  ::-webkit-scrollbar-track{box-shadow:1px 1px 5px rgba(185,165,150,.2) inset;}
  ::-webkit-scrollbar-thumb{min-height:20px;background-clip:content-box;box-shadow: 0 0 0 5px rgba(25,109,180,0.5) inset;}
  ::-webkit-scrollbar-corner{/*background:transparent;*/}

  .qiye_related{ background-color: rgba(2,22,35,0.8); box-shadow:0 0 5px #1c609d; border:1px solid #1c609d; border-radius: 5px;
    width: 100%;  height: 100%;    z-index: 3; padding-bottom: 15px;}
  .qiye_related .title{ width:95%; height: auto; margin:0 auto;  text-align: right;   position: relative; }
  .qiye_related .title a.content{
    display:  block;
    width: 100%;
    height:40px;
    margin: 0 auto;
    text-align: left;
    line-height: 45px;
  }
  .qiye_related .title a.content i,
  .qiye_related .title a.content span{
    display: inline-block;
    vertical-align: middle;
    font-size: 20px;
    color: #5fb6ff;
  }
  .qiye_related .title a.content span{
    padding-left: 15px;
    max-width: 70%;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;
  }
  .qiye_related .title a.content i{
    width:20px;
    height:20px;
    background: url('../../../../static/img/aqyhPop/address.png') no-repeat center;
    background-size: contain;
  }
  .qiye_related .title .close{
    cursor: pointer;
    display: block;
    position: absolute;
    left:100%;
    top:50%;
    margin-left: -30px;
    margin-top: -12px;
    width:20px;
    height:20px;
    background: url('../../../../static/img/aqyhPop/close.png') center no-repeat;
    background-size: contain;
  }
  .qiye_related .related-echart,
  .qiye_related .related-table,
  .qiye_related .navBar{  width:95%;  margin:15px auto 0 auto;}
  .qiye_related .related-echart{
    height:350px;
    border:1px solid #345167;
    background-color: transparent;
  }
  .qiye_related .navBar{max-height: 40px;}
  .qiye_related .navBar ul{ padding:0;text-align: left;margin: 0;display: block; width:100%;height:100%;border:1px solid #345167;border-radius: 5px;}
  .qiye_related .navBar ul li{display: inline-block;vertical-align: middle;width: auto; height:100%; color: rgba(0,252,255,0.5);font-size: 18px;
    padding:6px 20px;background-color: transparent;cursor: pointer;}
  .qiye_related .navBar ul li:hover,.qiye_related .navBar ul li.active{ color: #ffffff;background-color: #196db4; }


  .qiye_related .related-table{ height:255px; overflow-x: hidden; overflow-y: auto; }
  .qiye_related .related-table ul{
    padding-bottom:3px;margin:15px 0 0 0; width: 100%;display: block;
    border:1px solid #1a3d58;height: auto;
  }
  .qiye_related .related-table ul p{
    display: block;width: 100%;text-align: left;padding: 10px 0 10px 15px;color: #00fcff;font-size: 16px;
  }
  .qiye_related .related-table ul li{
    display: inline-block;vertical-align: middle;
    width: 48%;text-align: left;
    padding:6px 0 6px 15px;
  }
  .qiye_related .related-table ul li span{
    display: inline-block;vertical-align: middle;max-width: 70%;
    overflow: hidden;white-space: nowrap; text-overflow: ellipsis;
    color: #00fcff;font-size: 16px;
  }
  .qiye_related .related-table ul li span:nth-child(2){margin-left: 8px;margin-right: 10px;}
  .qiye_related .related-table ul li span:nth-child(3){ color: #a2d0ec; }

  .qiye_related .related-table table{
    display: block;border-collapse: collapse;
    border:1px solid transparent;
  }
  .qiye_related .related-table table tr th,
  .qiye_related .related-table table tr td{
    background-color: transparent;
    color:#a2d0ec;
    font-size: 14px;
    width: 300px;
    border:1px solid #1a3d58;
    padding:10px 0;
    text-align: center;
  }
  .qiye_related .related-table table thead  tr th{
    color:#00fcff;
  }
</style>
