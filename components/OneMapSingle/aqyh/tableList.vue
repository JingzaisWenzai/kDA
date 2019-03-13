<template>
    <div v-if="tableList!=''">
      <div class="b_d_b">
        <!--<div class="b_d_b_1">
                 <span>风险点  信息列表</span>
              </div>-->
        <div class="b_d_b_a">
          <span>风险点  信息列表<img src="../../../static/img/sec/sec_3.png"  @click="toClose"></span>
          <div class="b_d_b_flow">
            <table>
              <thead>
              <tr>
                <td >序号</td>
                <td>类型细分</td>
                <td class="bfb">预警内容</td>
                <td>发生时间</td>
                <td>发生时间</td>
                <td>发生时间</td>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(item,index) in contentData" :key="index">
                <td >{{index}}</td>
                <td>{{item.type}}</td>
                <td >{{item.alertCon}}</td>
                <td>{{item.time}}</td>
                <td >{{item.ad0}}</td>
                <td>{{item.peocess}}</td>
              </tr>
              </tbody>
            </table>
            <foot-bar :total="total" :display="display" :current-page='current' @pagechange="pagechange"></foot-bar>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import FootBar from '../../../components/OneMap/Common/FootBar.vue';
  import {getStore} from "../../../static/js/OneMap/common/common.js";
  import {getTablelist} from "../../../api/secapi.js"
    export default {
        name: "selectAddress",
      data:function () {
        return {
          /*tableList:"11",*/
          address:["福保街道","园岭街道","南园街道","福田街道","香蜜湖街道","沙头街道","梅林街道","华富街道","莲花街道","华强北街道"],
          allcontent:[],
          contentData:[],
          //分页插件数据
          total: 0,     // 记录总条数
          display: 10,   // 每页显示条数
          current: 1   // 当前的页数
        }
      },
      watch:{
        tableList:function (newVal, oldVal) {
        /*  alert(newVal);*/
          this.initData1(newVal);
        }
      },
      computed: {
        tableList() {
          return this.$store.state.tableList;
        }
      },
      mounted(){

      },
      methods:{
        pagechange:function(currentPage){
          this.contentData = this.allcontent.slice((currentPage-1)*this.display,currentPage*this.display)
        },
        toClose(){
          this.$store.state.tableList = "";
        },
        async initData1 (nameVal) {
          let tableList = await getTablelist(nameVal);

          this.allcontent = tableList;
          this.contentData = this.allcontent.slice(0,this.display)
          this.total = this.allcontent.length;
        }
      },
      components: {
        FootBar
      }
    }
</script>

<style scoped>

  .b_d_b{
    width: auto;
    text-align: left;
    position: absolute;
    bottom: 70px;
    left: 52px;
  }

  .b_d_b .b_d_b_a .b_d_b_flow{
  /*  overflow-y: auto;*/
    height: 600px;
    width: 99.9%;
    background-color: #041825;
    opacity: 0.7;
    margin: 0px 1px;
  }
  .b_d_b .b_d_b_a span img{
    margin: 15px;
    float: right;
    cursor:pointer;
  }
  .b_d_b .b_d_b_a span{
    height: 42px;
    line-height: 42px;
    display: inline-block;
    color: #b1d8ed;
    width: 99.8%;
    /*margin:5px 30px;*/
    padding-left: 30px;
    font-size: 24px;
    background-color: #11223a;
    margin: 0px 1px;
    /*opacity: 0.9;*/
  }
  .b_d_b .b_d_b_a table{
    float: left;
    table-layout:fixed;
    width: 100%;
    height: 520px;
    text-align: left;
    margin-top: 25px;
    margin-bottom: 10px;
    padding:0px 20px;
    overflow: hidden;
  }
  .b_d_b .b_d_b_a table thead{width:680px; height:40px; line-height: 40px; text-align: center;
    margin: 0px auto; overflow: hidden; font-size: 20px; color: #ffffff;}
  .b_d_b .b_d_b_a table tbody{width:680px; height:360px;  text-align: center;
    margin: 0px auto; overflow: hidden; font-size: 16px; color: #43d3ff;}
  .b_d_b .b_d_b_a table tbody tr{height: 35px;
  }

  .b_d_b .b_d_b_a table tbody tr td{
    border: 1px solid #3e7db2;
    border-width:0px 1px 1px 0px;
  }
  .b_d_b .b_d_b_a table thead tr td{
    border: 1px solid #3e7db2;
    border-width:1px 1px 1px 0px;
  }

  .b_d_b .b_d_b_a table tbody tr td:nth-child(1),.b_d_b .b_d_b_a table thead tr td:nth-child(1){
    border: 1px solid #3e7db2;
    border-width:0px 1px 1px 1px;
  }
  .b_d_b .b_d_b_a table thead tr td:nth-child(1){
    border: 1px solid #3e7db2;
    border-width:1px;
  }
  .b_d_b .b_d_b_a table thead tr td:nth-child(1),.b_d_b .b_d_b_a table tbody tr td:nth-child(1){
    width: 10%;
  }
  .b_d_b_a{
    height: 645px;
    width: 770px;
    border: 1px solid #3e7db2;
  }
  .b_d_b_a img{cursor: pointer;}
</style>
