<template>
  <footer class="footer-top">
    <div class="footer-main" >
      <!-- <div class="left footer-div mycol-4"></div> -->
      <div class="footer-moudle">
        <!-- 博主信息 -->
        <div class="left footer-div blog-info">
          <p class="title">博主信息</p>
          <p>姓名：camellia</p>
          <p>邮箱：guanchao_gc@qq.com</p>
          <p>访客数：{{visitNum}}</p>
          <p @click="jumpToGov()" class="cursor">备案号：辽ICP备17011241号-2</p>
        </div>
        <!-- 统计 -->
        <div class="left footer-div mycol-3">
          <p class="title">数据统计</p>
          <p>文章总数：{{articleNum}}</p> 
          <p>注册用户：{{userNum}}</p> 
          <p>留言总数：{{messageNum}}</p> 
          <p>运行天数：{{days}}</p>
        </div>
        <!-- 小程序二维码 -->
        <div class="left footer-div mycol-3">
          <p class="title">微信小程序</p>
          <img src="../../assets/img/qcwechat.png" class="qcwechat lazyload" />
        </div>
        <!-- 友情链接 -->
        <div class="left footer-div mycol-3">
          <p class="title">友情链接</p> 
          <span v-for="(item, index) in friendLinklist" :key="index">
            <p class="cursor" @click="jumpFriendLink(item.friendlink)">{{item.friendname}}</p> 
          </span>
          <p class="cursor" @click="goToFrienLink()">更多>></p> 
        </div>
        <!-- 项目架构 -->
        <div class="left footer-div">
          <p class="title">项目架构</p>
          <p>前端框架：vue3 + typescript</p> 
          <p>后端框架：laravel8.19.0</p> 
          <p>全文搜索：sphinx-for-chinese</p> 
          <p>即时聊天：swoole4.5.10</p>
        </div>
      </div>
    </div>
    <div class="menu-copyright">
      <p style="text-align: center;">Copyright© 2017 - 2021 | <a target="_blank" href="https://guanchao.site">时间里的</a> .AllRightsReserved</p>
    </div>
  </footer>
</template>

<style lang="scss">
  @import "../../assets/css/components/pc/Footer.scss";
</style>

<script lang="ts">
    // 引入js文件
  import Footer from "/@/assets/js/components/pc/Footer";

  // 使用js对象
  export default {
    ...Footer,
  };
</script>

