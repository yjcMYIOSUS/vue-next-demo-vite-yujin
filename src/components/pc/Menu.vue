<template>
  <div class="preview_self" style="top:0px">
      <!-- 二维码icon -->
      <!-- <nav class="navbar navbar-menu " style="left:15px">
        <img src="/@/assets/img/qrcode.png" alt="" class="img_more" />
      </nav> -->
      <!-- qq/头像 -->
      <nav class="navbar navbar-menu " style="left:15px" @click="showLogin()" v-if="!is_login">
        <img src="../../assets/img/QQ.png"  class="img_more"  />
      </nav>
      <nav class="user_logo navbar " :style="loginstyle" @click="showLogin()" v-else></nav>
      <!-- 回旧版 -->
      <nav class="navbar navbar-menu " style="left: 65px; color: #CCC; width: 60px; font-weight: 500;" @click="goToOldVersion()">
        回旧版
      </nav>
      <!-- 搜索icon -->
      <nav class="navbar navbar-menu " style="right:115px" @click="showSearch()">
        <img src="../../assets/img/search.png"  class="img_more" />
      </nav>
      <!-- 首页icon -->
      <nav class="navbar navbar-hei" @click="jumPage('/pc/index')">
        <img src="../../assets/img/home.png"  class="img_more" />
      </nav>
      <!-- 菜单icon -->
      <nav class="navbar navbar-menu " @click="showMenu()">
        <img src="../../assets/img/more.png"  class="img_more" v-console />
      </nav>
  </div>
</template>

<script lang="ts">
  // 引入scss
  import "/@/assets/css/components/pc/Menu.scss";

  // 引入js文件
  import Menu from "/@/assets/js/components/pc/Menu";

  // 使用js对象
  export default {
    ...Menu,
  };
</script>

