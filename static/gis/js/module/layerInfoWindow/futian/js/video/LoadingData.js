/**
 * Created by dongxin on 2017-04-20.
 */


var getData = {};

(function (q) {

    var topics = {}, // 回调函数存放的数组
        subUid = -1,
        params = {
            "dataType": 'json',
            "contentType": "application/json; charset=utf-8",
        };
    // 发布方法
    q.publish = function (name, type, url, obj) {

        if (!topics[name]) {
            return false;
        }

        params.type = type.toUpperCase();
        params.url = url;
        params.data = params.type === 'GET'?obj:JSON.stringify(obj);
        params.success = function (response) {
            //if (response.result == true) {
            //
            //    setTimeout(function () {
            //        var subscribers = topics[name],
            //            len = subscribers ? subscribers.length : 0;
            //
            //        while (len--) {
            //            subscribers[len].func(response);
            //        }
            //    }, 0);
            //
            //} else {
            //    console.log(response.msg);
            //}

            setTimeout(function () {
                var subscribers = topics[name],
                    len = subscribers ? subscribers.length : 0;
                while (len--) {
                    subscribers[len].func(response, subscribers[len].params);
                }
            }, 0);

            //setTimeout(function(){
            //    hidden();
            //},500);
        };
        params.error = function (res) {
            //console.log(res.error);
            //hidden();
            console.log('数据加载失败，请检查网络是否通畅' + url);
        };
        console.log(params)
        $.ajax(params);

        return true;

    };
    //订阅方法
    q.subscribe = function (name, func, obj) {

        if (!topics[name]) {
            topics[name] = [];
        }

        var token = (++subUid).toString();

        var temp = -1;
        if (topics[name].length > 0) {
            for (var i = 0, j = topics[name].length; i < j; i += 1) {
                if (topics[name][i]['func'] === func) {
                    if (topics[name][i].params !== obj) {
                        topics[name][i].params = obj;
                    }
                    temp = 0;
                }
            }

            if (temp === -1) {
                topics[name].push({
                    token: token,
                    func: func,
                    params: obj
                });
            }

        } else {
            topics[name].push({
                token: token,
                func: func,
                params: obj
            });
        }
        return token;
    };
})(getData);
