<template>
  <div class="o">
    <ul>
      <li  v-for="(item, index) in data" v-bind:key="index">
        <a v-bind:title="item.view_name" @click="showReport($event,index)">{{item.view_name}}</a>
      </li>
    </ul>

    <el-dialog
      :visible.sync="centerDialogVisible"
      fullscreen
      center>
      <iframe style="width: 100%;height: 950px;" :src="tableauUrl"></iframe>
    </el-dialog>
  </div>
</template>

<script>
  import bus from '../../../assets/js/main'
  import { tableau_list, tableau_ticket } from '../../../api/tizheng'

  export default {
    name: "reportList",
    props:['url'],
    data:function(){
      return {
        data:[
          {object_id:1,view_name:'2018年8月27日福田区体征日报'},
          {object_id:2,view_name:'2018年8月12日福田区体征日报'},
          {object_id:3,view_name:'2018年7月30日福田区体征日报'},
          {object_id:4,view_name:'2018年7月22日福田区体征日报'},
          {object_id:2,view_name:'2018年8月12日福田区体征日报'},
          {object_id:3,view_name:'2018年7月30日福田区体征日报'},
          {object_id:4,view_name:'2018年7月22日福田区体征日报'}
        ],
        centerDialogVisible: false,
        tableauBaseUrl:'http://10.190.65.33:80/trusted/',
        tableauUrl:'',
      }
    },
    methods:{
      showReport:function (event,data) {

        for(var i = 0,j = event.currentTarget.parentElement.parentElement.childNodes;i<j.length;i+=1){
          if(i === data){
            event.currentTarget.style.color = '#ffc000'
          }else {
            j[i].childNodes[0].style.color = '#69dcff'
          }
        }
        // bus.$emit('totalPage',this.data.length)
        this.openTableau(this.data[data].view_url)
      },
      openTableau(command){
        let $this = this
        tableau_ticket().then(function(data) {
          $this.tableauUrl = $this.tableauBaseUrl+data.data+'/views/'+command
          console.log($this.tableauUrl)
          $this.centerDialogVisible = true
          // bus.$emit('showTableauList')
        })
      }
    },
    mounted:function () {

      console.log(this.url)
      this.openTableau(this.url)
      return;

      let $this = this
      tableau_list().then(function(data) {
        console.log(data)
        $this.data = data.data
      })
    }
  }
</script>

<style lang="scss" scoped>
  .o {
    /*width: 322px;*/
    /*height: 399px;*/
    width: 382px;
    height: 485px;
    text-align: left;
    margin: 0px auto;
    /*padding: 41.5px 30px;*/
    overflow: hidden;
    background: url(../../../assets/img/cstz_15.png) no-repeat;
    /*top: 100px;*/
    /*left: 300px;*/
    position: absolute;
    z-index: 99999;
  }

  .o ul {
    width: 105%;
    height: 455px;
    text-align: left;
    margin: 20px 0 0 0;
    padding: 0;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .o ul li {
    /*width: 322px;*/
    width: 100%;
    height: 57px;
    line-height: 57px;
    text-align: left;
    margin: 0px auto;
    float: left;
    display: inline;
    overflow: hidden;
  }

  .o ul li a {
    /*width: 322px;*/
    width: 100%;
    height: 57px;
    line-height: 57px;
    text-decoration: none;
    display: block;
    font-size: 20px;
    color: #69dcff;
    text-align: center;
  }

  .o ul li a:hover, .o ul li a:active, .o ul li a:focus {
    /*width: 322px;*/
    height: 57px;
    line-height: 57px;
    text-decoration: underline;
    display: block;
    font-size: 20px;
    color: #ffc000;
  }

</style>
