<template>
  <div style="margin-left: 31px;">
    <div class="c_a">
      公共安全
      <div style="float: right;"><span style="cursor: pointer;color: #7af3ff;font-size: 18px;" @click="showTableDetail">查看专题报告</span></div>
    </div>
    <div class="c_b_a">
      <gonggonganquanleft></gonggonganquanleft>
      <div class="c_b_a_b">
        <tab-chart01 v-for="(item, index) in this.data" v-bind:key="index" v-bind:chartData="{item,index}"></tab-chart01>
      </div>
    </div>
    <div class="c_b_b">
      <tab-chart02 v-for="(item, index) in this.data2" v-bind:key="index" v-bind:chartData="{item,index}"></tab-chart02>
    </div>
  </div>
</template>

<script>
  import gonggonganquanleft from '../../../../../components/tizheng/chengshijibenmian/right/gonggonganquan/components/gonggonganquanleft'
  import tabChart01 from '../../../../../components/tizheng/chengshijibenmian/right/gonggonganquan/components/tabChart01'
  import tabChart02 from '../../../../../components/tizheng/chengshijibenmian/right/gonggonganquan/components/tabChart02'
  import bus from '../../../../../assets/js/main'

  import { publicSecurityDetail } from '../../../../../api/tizheng'

  export default {
    name: "gonggonganquan",
    components: {
      gonggonganquanleft,
      tabChart01,
      tabChart02
    },
    data:function () {
      return {
        data: [
          {
            elementNode: {},
            xAxis: {name: '时间', /*nameTextStyleColor: 'red',*/ axisLineColor: 'blue', /*axisLabelColor: 'green'*/},
            yAxis: {name: '件', /*nameTextStyleColor: 'red',*/ axisLineColor: 'blue', /*axisLabelColor: 'green'*/},
            data: [
              {
                name: '测试数据源1',
                color: 'orange',
                data: [{name: '一月', value: 1}, {name: '二月', value: 2}, {name: '三月', value: 3}, {
                  name: '四月',
                  value: 4
                }, {name: '五月', value: 5}, {name: '六月', value: 6}, {name: '七月', value: 7}]
              }/*,
              {
                name: '测试数据源2',
                color: 'orange',
                data: [{name: '一月', value: 7}, {name: '二月', value: 6}, {name: '三月', value: 5}, {
                  name: '四月',
                  value: 4
                }, {name: '五月', value: 3}, {name: '六月', value: 2}, {name: '七月', value: 1}]
              }*/
            ]
          },
          {
            elementNode: {},
            xAxis: {name: '时间', /*nameTextStyleColor: 'red',*/ axisLineColor: 'blue', /*axisLabelColor: 'green'*/},
            yAxis: {name: '件', /*nameTextStyleColor: 'red',*/ axisLineColor: 'blue', /*axisLabelColor: 'green'*/},
            data: [
              {
                name: '测试数据源1',
                // color: 'black',
                data: [{name: '一月', value: 1}, {name: '二月', value: 2}, {name: '三月', value: 3}, {
                  name: '四月',
                  value: 4
                }, {name: '五月', value: 5}, {name: '六月', value: 6}, {name: '七月', value: 7}]
              }/*,
              {
                name: '测试数据源2',
                color: 'orange',
                data: [{name: '一月', value: 7}, {name: '二月', value: 6}, {name: '三月', value: 5}, {
                  name: '四月',
                  value: 4
                }, {name: '五月', value: 3}, {name: '六月', value: 2}, {name: '七月', value: 1}]
              }*/
            ]
          }
        ],
        data2: [
          {
            elementNode: {},
            xAxis: {name: '时间', /*nameTextStyleColor: 'red',*/ axisLineColor: 'blue', /*axisLabelColor: 'green'*/},
            yAxis: {name: '件', /*nameTextStyleColor: 'red',*/ axisLineColor: 'blue', /*axisLabelColor: 'green'*/},
            data: [
              {
                name: '测试数据源1',
                color: 'rgb(64,240,122)',
                data: [{name: '一月', value: 1}, {name: '二月', value: 2}, {name: '三月', value: 3}, {name: '四月', value: 4}, {name: '五月', value: 5}, {name: '六月', value: 6}, {name: '七月', value: 7}]
              }/*,
              {
                name: '测试数据源2',
                color: 'orange',
                data: [{name: '一月', value: 7}, {name: '二月', value: 6}, {name: '三月', value: 5}, {
                  name: '四月',
                  value: 4
                }, {name: '五月', value: 3}, {name: '六月', value: 2}, {name: '七月', value: 1}]
              }*/
            ],
            index:0
          },
          {
            elementNode: {},
            xAxis: {name: '时间', /*nameTextStyleColor: 'red',*/ axisLineColor: 'blue', /*axisLabelColor: 'green'*/},
            yAxis: {name: '件', /*nameTextStyleColor: 'red',*/ axisLineColor: 'blue', /*axisLabelColor: 'green'*/},
            data: [
              {
                name: '测试数据源1',
                color: 'orange',
                data: [{name: '一月', value: 1}, {name: '二月', value: 2}, {name: '三月', value: 3}, {
                  name: '四月',
                  value: 4
                }, {name: '五月', value: 5}, {name: '六月', value: 6}, {name: '七月', value: 7}]
              }/*,
              {
                name: '测试数据源2',
                color: 'orange',
                data: [{name: '一月', value: 7}, {name: '二月', value: 6}, {name: '三月', value: 5}, {
                  name: '四月',
                  value: 4
                }, {name: '五月', value: 3}, {name: '六月', value: 2}, {name: '七月', value: 1}]
              }*/
            ],
            index:1
          },
          {
            elementNode: {},
            xAxis: {name: '时间', /*nameTextStyleColor: 'red',*/ axisLineColor: 'blue', /*axisLabelColor: 'green'*/},
            yAxis: {name: '件', /*nameTextStyleColor: 'red',*/ axisLineColor: 'blue', /*axisLabelColor: 'green'*/},
            data: [
              {
                name: '测试数据源1',
                // color: 'black',
                data: [{name: '一月', value: 1}, {name: '二月', value: 2}, {name: '三月', value: 3}, {
                  name: '四月',
                  value: 4
                }, {name: '五月', value: 5}, {name: '六月', value: 6}, {name: '七月', value: 7}]
              }/*,
              {
                name: '测试数据源2',
                color: 'orange',
                data: [{name: '一月', value: 7}, {name: '二月', value: 6}, {name: '三月', value: 5}, {
                  name: '四月',
                  value: 4
                }, {name: '五月', value: 3}, {name: '六月', value: 2}, {name: '七月', value: 1}]
              }*/
            ],
            index:2
          }
        ]
      }
    },
    mounted:function() {
      var $this = this
      console.log('666')
      publicSecurityDetail().then(function(data) {
        var temp = {}
        temp.data = []
        for(var i in data){
          // temp.data.push(data[i].data)
          // $this.data2.data = data[i]
        }
        Object.keys(data).forEach(function(name, index, array) {
          $this.data2[index].data = [data[name].data]
          $this.data2[index].title.text = data[name].name
        })
      })
    },
    methods:{
      showTableDetail(){
        bus.$emit('showTableauDetail','181128/sheet2')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .c_a {
    width: 1788px;
    height: 48px;
    line-height: 48px;
    text-align: left;
    margin: 0px 0 20px;
    padding: 0px 30px;
    overflow: hidden;
    font-size: 30px;
    color: #ffffff;
    background-color: #011d48;
    border: #013fba solid 1px;
  }

  .c_b_a {
    width: 808px;
    height: 798px;
    text-align: left;
    margin: 0px 20px 0px 0px;
    padding: 20px;
    border: #0238a3 solid 1px;
    border-radius: 5px;
    float: left;
    display: inline;
    overflow: hidden;
  }

  /*.c_b_a_a{width:808px; height:196px; text-align: left; margin: 0px auto 52px; overflow: hidden; }*/
  /*.c_b_a_a_a{width:798px; height:36px; text-align: left; margin: 0px auto 20px; padding-left: 10px; overflow: hidden; font-size: 30px; color: #40c6f0;}*/
  /*.c_b_a_a_b{width:807px; height:140px; text-align: left; margin: 0px 0.5px; overflow: hidden;}*/
  /*.c_b_a_a_b ul{width:857px; height:140px; text-align: left; margin: 0px auto; overflow: hidden;}*/
  /*.c_b_a_a_b ul li{width:209px; height:140px; line-height: 100px; text-align: left; margin: 0px 30px; float: left; display: inline; overflow: hidden; }*/
  /*.c_b_a_a_b_a{width:209px; height:60px; line-height: 30px; text-align: center; margin: 0px auto 30px; overflow: hidden; font-size: 19px; color: #b7ecff;}*/
  /*.c_b_a_a_b_b{width:209px; height:50px; line-height: 50px; text-align: center; margin: 0px auto; overflow: hidden; font-size: 55px; color: #40c6f0;}*/
  /*.c_b_a_a_b_b span:nth-child(2){font-size: 22px; color: #ffffff;}*/
  .c_b_a_b {
    width: 808px;
    height: 550px;
    text-align: left;
    margin: 0px auto;
    overflow: hidden;
    margin-top: 72px;
    :nth-child(2) {
      margin-left: 20px;
    }
  }
  .c_b_b {
    width: 990px;
    height: 840px;
    text-align: left;
    margin: 0px auto;
    float: left;
    display: inline;
    overflow: hidden;
    :nth-child(2){
      margin: 32px auto;
    }
  }

  /*.c_b_a_b_a{width:352px; height:508px; text-align: left; margin: 0px 20px 0px 0px; padding: 20px; border: #0238a3 solid 1px;  border-radius:5px; float: left; display: inline; overflow: hidden;}*/
  /*.c_b_a_b_a_a{width:352px; height:104px; text-align: left; margin: 0px auto 20px; overflow: hidden; }*/
  /*.c_b_a_b_a_a_a{width:352px; height:30px; line-height: 30px; text-align: center; margin: 0px auto 24px; overflow: hidden; font-size: 19px; color: #b7ecff;}*/
  /*.c_b_a_b_a_a_b{width:352px; height:50px; line-height: 50px; text-align: center; margin: 0px auto; overflow: hidden; font-size: 55px; color: #40c6f0;}*/
  /*.c_b_a_b_a_a_b span:nth-child(1){font-size: 22px; color: #ffffff;  vertical-align:10px;}*/
  /*.c_b_a_b_a_b{width:352px; height:384px; text-align: left; margin: 0px auto; overflow: hidden; }*/
  /*.c_b_a_b_b{width:352px; height:508px; text-align: left; margin: 0px auto; padding: 20px; border: #0238a3 solid 1px;  border-radius:5px; float: left; display: inline; overflow: hidden;}*/
  /*.c_b_a_b_b_a{width:352px; height:104px; text-align: left; margin: 0px auto 20px; overflow: hidden; }*/
  /*.c_b_a_b_b_a{width:352px; height:104px; text-align: left; margin: 0px auto 20px; overflow: hidden; }*/
  /*.c_b_a_b_b_a_a{width:352px; height:30px; line-height: 30px; text-align: center; margin: 0px auto 24px; overflow: hidden; font-size: 19px; color: #b7ecff;}*/
  /*.c_b_a_b_b_a_b{width:352px; height:50px; line-height: 50px; text-align: center; margin: 0px auto; overflow: hidden; font-size: 55px; color: #40c6f0;}*/
  /*.c_b_a_b_b_a_b span:nth-child(1){font-size: 22px; color: #ffffff;  vertical-align:10px;}*/
  /*.c_b_a_b_b_b{width:352px; height:384px; text-align: left; margin: 0px auto; overflow: hidden; }*/
</style>
