<template>
  <div>
    <nuxt/>
  </div>
</template>

<style>
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*, *:before, *:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
.el-notification{
  width: auto;
}
::-webkit-scrollbar-thumb {
  -webkit-box-shadow: 0 0 0 5px hsla(26,20%,66%,.05) inset!important;
  background-image: -webkit-gradient(linear,left bottom,left top,color-stop(.44,#7a99d9),color-stop(.72,#497dbd),color-stop(.86,#1c3a94)) !important;
}

/* ie 滚动条*/
html{
  scrollbar-arrow-color: #1c3a94; /**//*三角箭头的颜色*/
  /*scrollbar-face-color: #1c3a94; !**!!*立体滚动条的颜色*!*/
  scrollbar-face-color:rgba(33,56,84,1);
  scrollbar-3dlight-color: red; /**//*立体滚动条亮边的颜色*/
  /*scrollbar-highlight-color: #666; !**!!*滚动条空白部分的颜色*!*/
  scrollbar-highlight-color: rgba(44,67,101,0.5); /**//*滚动条空白部分的颜色*/
  scrollbar-shadow-color: rgba(33,56,84,0.5); /**//*立体滚动条阴影的颜色*/
  scrollbar-darkshadow-color: purple; /**//*立体滚动条强阴影的颜色*/
  scrollbar-track-color: rgba(44,67,101,0.1); /**//*立体滚动条背景颜色*/
  scrollbar-base-color:#f8f8f8; /**//*滚动条的基本颜色*/
}
</style>

