<template>
  <div class="h_c">
    <ul>
      <li v-for="(item, index) in this.msgData" v-bind:key="index">
        <div class="h_c_a">
          <span><img src="../../../../assets/img/cstz_8.png"/></span>
          <span>{{item.name}}</span>
        </div>
        <div class="h_c_b">
          <div class="h_c_b_a">
            {{item.value}}
          </div>
          <div class="h_c_b_b">
            <div class="h_c_b_b_a">
              {{item.unit}}
            </div>
            <!--<div class="h_c_b_b_b">-->
            <!--<span>{{item.float}}</span>-->
            <!--<span>↑</span>-->
            <!--</div>-->
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'subjectServersMsg',
    props: ['msgData'],
    data: function() {
      return {
        data: [
          { name: '常住人口', number: 284, unit: '万人', float: '9.8%', up: 1 },
          { name: '外来人口', number: 132, unit: '万人', float: '9.8%', up: 1 },
          { name: '人口自然增长率', number: 16.8, unit: '%', float: '', up: 0 }
        ]
      }
    },
    mounted: function() {
      if (this.msgData === undefined) {
        this.msgData = this.data
      }
    }
  }
</script>

<style lang="scss" scoped>
  .h_c {
    width: 830px;
    height: 160px;
    text-align: left;
    margin: 0px auto;
    overflow: hidden;
  }

  .h_c ul {
    width: 830px;
    height: 160px;
    text-align: left;
    margin: 0px auto;
    overflow: hidden;
    padding: 0;
  }

  .h_c ul li { /*width:263px;*/
    height: 160px;
    text-align: left;
    margin: 0px auto;
    float: left;
    display: inline;
    overflow: hidden;
  }

  .h_c ul li:nth-child(2) {
    margin: 0px 20.5px;
  }

  .h_c_a { /*width:263px;*/
    height: 40px;
    line-height: 40px;
    text-align: left;
    margin: 0px auto 20px;
    overflow: hidden;
    font-size: 30px;
    color: #ffffff;
  }

  .h_c_a span {
    float: left;
    display: inline;
    overflow: hidden;
  }

  .h_c_a img {
    width: 9px;
    height: 18px;
    margin: 11px 10px 11px 0px;
  }

  .h_c_b { /*width:263px;*/
    height: 100px;
    text-align: left;
    margin: 0px auto;
    overflow: hidden;
  }

  .h_c_b_a {
    width: auto;
    height: 100px;
    line-height: 100px;
    text-align: left;
    margin: 0px 20px 0px 0px;
    float: left;
    display: inline;
    overflow: hidden;
    font-size: 50px; /*font-size: 70px;*/
    color: #ffab27;
  }

  .h_c_b_b {
    width: auto;
    height: 100px;
    text-align: left;
    margin: 0px auto;
    float: left;
    display: inline;
    overflow: hidden;
  }

  .h_c_b_b_a {
    width: auto;
    line-height: 100px; /*height:50px;line-height: 50px;*/
    text-align: left;
    margin: 0px auto;
    overflow: hidden;
    font-size: 26px;
    color: #ffffff;
  }

  .h_c_b_b_b {
    width: auto;
    height: 50px;
    line-height: 50px;
    text-align: left;
    margin: 0px auto;
    overflow: hidden;
    font-size: 26px;
    color: #ff0000;
  }

  .h_c_b_b_c {
    width: auto;
    height: 50px;
    line-height: 50px;
    text-align: left;
    margin: 0px auto;
    overflow: hidden;
    font-size: 26px;
    color: #019f2a;
  }

</style>
