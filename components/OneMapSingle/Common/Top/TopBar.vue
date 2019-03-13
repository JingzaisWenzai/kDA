<template>
  <section class="top_container">
    <div class="search_bar"><search-bar  ></search-bar></div>
  <!--  <div class="alert_bar"><alert-bar :alert-info = 'theAlert'></alert-bar></div>-->
    <div class="top_title_eco" v-if="TitMsg.type ==='1'" :title = 'TitMsg.txt'></div>
    <a href="/web/OneMap/SecMap/" class="top_title_sec" v-if="TitMsg.type ==='0'" :title = 'TitMsg.txt'></a>
    <div class="door_bar"><protall-nav></protall-nav></div>
  </section>
</template>
<style scoped>
  .top_container{
    width: 100%;
    height:100%;
    position:relative;
    background:transparent url('../../../../static/img/common/top-bg-single.png') no-repeat center;
    background-size: contain;
  }
  .top_title_eco{position:absolute;top:50%;left:50%;margin-left: -175px;margin-top: -30px;
    background: url('../../../../static/img/eco/top_tit_single.png') no-repeat center;
    background-size: contain;
    width:350px;
    height:60px;
  }
  .top_title_sec{position:absolute;top:50%;left:50%;margin-left: -175px;margin-top: -30px;
    background: url('../../../../static/img/sec/top_tit_single.png') no-repeat center;
    background-size: contain;
    width:350px;
    height:60px;
  }
  .search_bar{ position: absolute;left:20px;top:0;margin-top:10px;width:400px;height:30px;}
  .alert_bar{position: absolute;left:100%;top:0;margin-top:15px;margin-left:-300px;width:150px;height:44px;}
  .door_bar{position: absolute;left:100%;margin-left:-100px;top:0;margin-top:5px;width: 70px;height: 40px;}
</style>
<script>
  import SearchBar from '../Search/SearchIndex.vue';
  import ProtallNav from '../Door/ProtallNav';
  import AlertBar from '../Alert/AlertBar.vue';
  import {getAlarm_report} from '../../../../api/secapi';
  export default{
      props:['TitMsg'],
      data(){
          return{
              title:'生态环境一张图',
              theAlert:{
                val:'',
                thData:[],
                tbData:[]
              }
          }
      },
      mounted(){
        this.$nextTick(function(){
        //  this.toGetAlarmData();
        })
      },
      watch:{
        theAlert:{
            handler:function(val,oldVal){},
            deep:true
        }
      },
      methods:{
        async toGetAlarmData(){
          let odata = await getAlarm_report();
          let data = odata;
          console.log(data);
          if(data.code=== -1){
            this.theAlert.val='0项预警';
            this.theAlert.thData = [];
            this.theAlert.tbData = [];
          }else{
            this.theAlert.val = data.name || '';
            let arr=[];
            let brr=[];
            for(var key1 in data.data[0]){
              arr.push(key1);
            }
            for(let i=0;i<data.data.length;i++){
              let res=[];
              for(var key2 in data.data[i]){
                res.push(data.data[i][key2]);
              }
              brr.push(res);
            }
            this.theAlert.thData = [].concat(arr) ||[];
            this.theAlert.tbData = [].concat(brr) ||[];
          }
        }
      },
      components:{
        SearchBar,
        ProtallNav,
        AlertBar
      }
  }
</script>
