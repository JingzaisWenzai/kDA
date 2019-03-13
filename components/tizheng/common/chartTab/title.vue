<template>
  <div  class="b_a_a_a">
    <div class="b_a_a_a_a">
      {{this.titleData.name}}
    </div>
    <div class="b_a_a_a_b">
      <ul>
        <li v-for="(item, index) in this.titleData.data" v-bind:key="index">
          <div class="b_a_a_a_b_a">
            {{item.name}}
          </div>
          <div class="b_a_a_a_b_b">
            <span>{{item.value}}</span>
            <span>{{item.icon}}</span>
            <span>{{item.type}}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: "tabTitle",
    props: ['titleData'],
    mounted:function () {
      // console.log(this.titleData)
      $('.b_a_a_a_b ul').eq(this.titleData.index).children().map(function (index, item) {
        if(index>0){
          // $(item).css({
          //   borderLeft: '#153c6b solid 1px'
          // })
          $(item).children().children().eq(0).css({
            color:'#40c6f0'
          })
        }else {
          if($(item).children().children().eq(1).html() === '↓'){
            $(item).children().children().eq(0).css('color','#00e805')
            $(item).children().children().eq(1).css('color','#00e805')
          }
        }
      })
    }
  }
</script>

<style lang="scss" scoped>
  .b_a_a_a_a{color:#40c6f0;font-size: 30px;}
  .b_a_a_a_b{
    color: red;
    text-align: center;
    ul {
      padding: 0;
      li{
        color:white;
        list-style: none;
        display: inline-block;
        margin: auto 0;
        text-align: center;
      }
    }
  }
  .b_a_a_a_b_a{
    font-size: 18px;
    padding: 15px;
  }
  .b_a_a_a_b_b{
    font-size: 35px;
    span{
      /*padding: 5px;*/
      padding: 0;
      color: #ff7f0d;
    }
    span:nth-child(2){
      font-size: 18px;
    }
    span:nth-child(3){
      font-size: 18px;
      color:white;
    }
  }
  /*.b_a_a_a{width:544px; height:156px; text-align: left; margin: 0px 0px 20px 0px; overflow: hidden;}*/
  /*.b_a_a_a_a{width:544px; height:36px; text-align: left; margin: 0px auto 20px; overflow: hidden; font-size: 30px; color: #40c6f0;}*/
  /*.b_a_a_a_b{width:544px; height:100px; text-align: left; margin: 0px auto; overflow: hidden;}*/
  /*.b_a_a_a_b ul{width:544px; height:100px; text-align: left; margin: 0px auto; overflow: hidden;}*/
  /*.b_a_a_a_b ul li{width:271.5px; height:100px; line-height: 100px; text-align: left; margin: 0px auto; float: left; display: inline; overflow: hidden; }*/
  /*.b_a_a_a_b ul li:nth-child(1){border-right:#153c6b solid 1px;}*/
  /*.b_a_a_a_b_a{width:271.5px; height:30px; line-height: 30px; text-align: center; margin: 0px auto 20px; overflow: hidden; font-size: 19px; color: #b7ecff;}*/
  /*.b_a_a_a_b_b{width:271.5px; height:50px; line-height: 50px; text-align: center; margin: 0px auto; overflow: hidden; font-size: 55px; color: #ff7f0d;}*/
  /*.b_a_a_a_b_b span:nth-child(2){font-size: 22px; color: #ff7f0d;}*/
  /*.b_a_a_a_b_b span:nth-child(3){font-size: 22px; color: #ffffff;}*/
  /*.b_a_a_a_b_c{width:271.5px; height:50px; line-height: 50px; text-align: center; margin: 0px auto; overflow: hidden; font-size: 45px; color: #40c6f0;}*/
  /*.b_a_a_a_b_c span:nth-child(2){font-size: 22px; color: #ffffff;}*/
</style>
