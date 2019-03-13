<template>
  <nav>
    <ul class="pagination">
      <li ><a href="javascript:;">共{{page}}页 </a></li>
      <li :class="{'disabled': current == 1}"><a href="javascript:;" @click="setCurrent(current - 1)"> 上一页 </a></li>
      <li :class="{'disabled': current == 1}"><a href="javascript:;" @click="setCurrent(1)"> 首页 </a></li>
      <li v-for="(p,index) in grouplist" :class="{'active': current == p.val}" :key="index"><a href="javascript:;"
                                                                          @click="setCurrent(p.val)"> {{ p.text }} </a>
      </li>
      <li :class="{'disabled': current == page}"><a href="javascript:;" @click="setCurrent(page)"> 尾页 </a></li>
      <li class="nextpage" :class="{'disabled': current == page}"><a href="javascript:;" @click="setCurrent(current + 1)">下一页</a></li>
     <!-- <li>跳转<input type="text" v-model="changePage"></li>
      <li class="confirm" @click="jumpPage(changePage)">确定</li>-->
    </ul>
  </nav>
</template>

<script>
  import $ from 'jquery';
  export default{
    data(){
      return {
        current: this.currentPage
      }
    },
    props: {
      total: {// 数据总条数
        type: Number,
        default: 0
      },
      display: {// 每页显示条数
        type: Number,
        default: 10
      },
      currentPage: {// 当前页码
        type: Number,
        default: 1
      },
      pagegroup: {// 分页条数
        type: Number,
        default: 5,
        coerce: function (v) {
          v = v > 0 ? v : 5;
          return v % 2 === 1 ? v : v + 1;
        }
      }
    },
    computed: {
      page: function () { // 总页数
        return Math.ceil(this.total / this.display);
      },
      grouplist: function () { // 获取分页页码
        var len = this.page, temp = [], list = [], count = Math.floor(this.pagegroup / 2), center = this.current;
        if (len <= this.pagegroup) {
          while (len--) {
            temp.push({text: this.page - len, val: this.page - len});
          }
          ;
          return temp;
        }
        while (len--) {
          temp.push(this.page - len);
        }
        ;
        var idx = temp.indexOf(center);
        (idx < count) && ( center = center + count - idx);
        (this.current > this.page - count) && ( center = this.page - count);
        temp = temp.splice(center - count - 1, this.pagegroup);
        do {
          var t = temp.shift();
          list.push({
            text: t,
            val: t
          });
        } while (temp.length);
        if (this.page > this.pagegroup) {
          (this.current > count + 1) && list.unshift({text: '...', val: list[0].val - 1});
          (this.current < this.page - count) && list.push({text: '...', val: list[list.length - 1].val + 1});
        }
        return list;
      }
    },
    methods: {
      setCurrent: function (idx) {
        if (this.current != idx && idx > 0 && idx < this.page + 1) {
          this.current = idx;
          this.$emit('pagechange', this.current);
        }
      }
    }
  }
</script>

<style scoped>
  .pagination {
    overflow: hidden;
    display: table;
    margin: 0 auto;
    /*width: 100%;*/
    height: 50px;}

  .pagination li {
    float: left;
    height: 50px;
    border-radius: 5px;
    margin: 3px;
    color: #fff;
  }
  .pagination li input{
    width: 50px;
    height: 30px;
    line-height: 30px;
    margin-top: 8px;
  }
  .pagination .confirm{
     padding-top: 10px;
  }
  .pagination li :hover {
    background: #196db4;
    /*color: #196db4;*/
  }
  .pagination li :hover a {
          color: #fff;
        }

  .pagination li a {
          display: block;
          width: 50px;
          height: 50px;
          text-align: center;
          line-height: 50px;
          font-size: 18px;
          border-radius: 5px;
          text-decoration: none;
          color: #fff;
        }
  .pagination li:nth-child(1) a,.pagination li:nth-child(2) a,.pagination .nextpage a {
    width: 100px;

  }
  .pagination .active {
    background: #6477FF;
  }
  .pagination .active  a {
        color: #fff;
      }


</style>
