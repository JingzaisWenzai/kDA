<template>
  <div class="videoBoxTool">
    <ul>
      <li v-for="(item,index) in videosNum" :key="index" :class="videosNum===4?'videoType1':'videoType2'"
          @click="selectVideo(index)">
        <video id="my-video" class="video-js vjs-default-skin vjs-big-play-centered" controls=""
               x-webkit-airplay="allow" style="width: 100%;height: 100%;" width="100%" height="100%" poster=""
               webkit-playsinline="" playsinline="" x5-video-player-type="h5" preload="auto">
          <source src="" type="rtmp/flv">
          <p class="vjs-no-js"> 播放视频需要启用 JavaScript，推荐使用支持 HTML5 的浏览器访问。
            To view this video please enable JavaScript, and consider upgrading to a web browser that
            <a href="http://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a>
          </p>
        </video>
      </li>
    </ul>
    <span style="cursor: pointer;" @click="changeVideoShow(9)">九宫格</span><span style="cursor: pointer;" @click="changeVideoShow(4)">四宫格</span>
  </div>
</template>

<script>
  import { getUserId, getPlayVideo, getStartHeart, getLogOut } from '../../api/videos'

  export default {
    name: 'videoBox',
    props: [],
    components: {},
    data() {
      return {
        videosNum: 4,
        videoIndex: 0
      }
    },
    mounted() {


    },
    methods: {
      getUserId() {
        let $this = this
        /*获取视频ID*/
        videojs.options.flash.swf = '../gis/js/module/layerInfoWindow/futian/video/video-js.swf'
        //获取用户id
        $.ajax({//http://10.192.76.20:8082
          url: 'http://10.192.76.20:8082/xEyeWeb/user/userLogin.do',
          type: 'post',
          dataType: 'json',
          data: param,
          success: function(data2) {
            console.log(data2)
            if (data2.msg === 'success') {
              //开始播放
              $this.playVideo()
            } else {
              alert('获取用户id失败:' + data2.msg)
            }
          }
        })
      },
      playVideo() {
        let $this = this
        //开始播放
        $.ajax({//http://10.192.76.95:8016
          url: 'http://10.192.76.95:8016/xhwebvideo.xhrtmp?cmd=start&platform=pc&userid=' + data2.userInfo.id + '&cameraid=' + data.video[0].videoId + '&type=realplay',
          type: 'post',
          dataType: 'json',
          success: function(data3) {
            console.log(data3)
            if (data3.descripe === 'success') {
              session = data3.sessionid
              videojs('my-video', {}).ready(function() {
                var player = this
                player.src(data3.rtmpUrl)
                player.play()

                // 启动心跳
                $this.getHeart()
              })
            } else {
              alert('播放失败:' + data3.descripe)
            }
          }
        })
      },
      getHeart() {
        // 启动心跳
        timer = setInterval(function() {
          //发送心跳
          $.ajax({//http://10.192.76.95:8016
            url: 'http://10.192.76.95:8016/xhwebvideo.xhrtmp?cmd=heartbeat&sessionid=' + data3.sessionid + '&type=realplay',
            type: 'post',
            dataType: 'json',
            success: function(data4) {
              console.log(data4)
              if (data4.descripe === 'success') {

              } else {
                alert('发送心跳失败:' + data4.descripe)
              }
            }
          })
        }, 10000)
      },
      logOut() {
        $.ajax({//http://10.192.76.95:8016
          url: 'http://10.192.76.95:8016/xhwebvideo.xhrtmp?cmd=stop&sessionid=' + session,
          type: 'post',
          dataType: 'json',
          success: function(data4) {
            console.log(data4)
            if (data4.descripe === 'success') {
              console.log('暂停成功！')
            } else {
              console.log('暂停失败：' + data4.descripe)
            }
          }
        })
      },
      selectVideo(index) {
        this.videoIndex = index
      },
      changeVideoShow(num) {
        this.videosNum = num
      }
    },
    beforeDestroy() {

    }
  }
</script>

<style lang="scss" scoped>
  .videoBoxTool {
    ul {
      width: 800px;
      height: 600px;
      margin: 0;
      padding: 0;
      background-color: black;
      li {
        list-style: none;
        display: inline-block;
        padding: 2px;
      }
      :nth-child(2n+1) {
        padding-right: 0px;
      }
      .videoType1 {
        width: 400px;
        height: 300px;
      }
      .videoType2 {
        width: 366px;
        height: 200px;
      }
    }
  }
</style>
