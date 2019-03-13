/**
 * Created by wangxi on 2018/7/27.
 */

import $ from 'jquery'

var select_location  = {
  id:'',
  data :{},
  default:{},
  createSelect :function(id,arr){
    var $sel = $("<select><option value='-1'>--请选择--</option></select>");

    $(arr).each(function(index, num) {
      var $opts = $("<option value=" + num.id + ">" + num.name + "</option>");
      $sel.append($opts);
    });
    $sel.change(function() {
      while (this != this.parentNode.lastChild) {
        this.parentNode.removeChild(this.parentNode.lastChild);
      }
      var i = this.selectedIndex;
      var cata = arr[i - 1];
      if (i != 0 && cata.children) {
        sels(cata.children)
      }
      $('#' + id).append($sel);
    });
  },
  init:function(obj,id){
     this.id = id;
     this.data = $.entend({},this.default,obj);
     this.createSelect(this.id,this.data);
  }
};

export {select_location as default};


/*


var data = [
  {
  "id": 10,
  "name": '男装',
  "children": [{
    "id": 101,
    "name": '正装'
  },
    {
      "id": 102,
      "name": 'T恤'
    },
    {
      "id": 103,
      "name": '裤衩'
    }
  ]
},
  {
    "id": 20,
    "name": '女装',
    "children": [{
      "id": 201,
      "name": '短裙'
    },
      {
        "id": 202,
        "name": '连衣裙'
      },
      {
        "id": 203,
        "name": '裤子',
        "children": [{
          "id": 2031,
          "name": '长裤'
        },
          {
            "id": 2031,
            "name": '九分裤'
          },
          {
            "id": 2031,
            "name": '七分裤'
          }
        ]
      },
    ]
  },
  {
    "id": 30,
    "name": '童装',
    "children": [{
      "id": 301,
      "name": '帽子'
    },
      {
        "id": 302,
        "name": '套装',
        "children": [{
          "id": 3021,
          "name": "0-3岁"
        },
          {
            "id": 3021,
            "name": "3-6岁"
          },
          {
            "id": 3021,
            "name": "6-9岁"
          },
          {
            "id": 3021,
            "name": "9-12岁"
          }
        ]
      },
      {
        "id": 303,
        "name": '手套'
      }
    ]
  }
];

function sels(arr) {
  var $sel = $("<select><option value='-1'>--请选择--</option></select>");

  $(arr).each(function(index, num) {
    var $opts = $("<option value=" + num.id + ">" + num.name + "</option>");
    $sel.append($opts);
  });
  $sel.change(function() {
    while (this != this.parentNode.lastChild) {
      this.parentNode.removeChild(this.parentNode.lastChild);
    }
    var i = this.selectedIndex;
    var cata = arr[i - 1];
    if (i != 0 && cata.children) {
      sels(cata.children)
    }
  });
  $("#xialakuang").append($sel);
}
*/
