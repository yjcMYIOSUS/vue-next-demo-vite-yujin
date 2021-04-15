<template>
  <!-- 公共loading组件 -->
  <load :loading=loading />
  <!-- 主体内容 -->
  <div v-if="loading == false">
    <!-- 公共标题组件 -->
    <Header v-on:closeMenu="closeMenu" :show="showRef" />
    <main id="main">
      <!-- 公共导航组件 -->
      <Menu v-on:showMenuByChild="showMenuByChild" />
      <!-- 主体内容 -->
      <section class="tags ">
        <header class="header">
          <h1 class="header-title">标签</h1>
          <p class="header-subtitle">共: {{labelCount}} 个</p>
        </header>
        <div class="tags-container padding-bottom">
          <a @click="goToList(item.id)" v-for="(item, index) in labelList" :key="index" :class="item.label">{{item.labelname}}</a >
        </div>
      </section>
    </main>
    <!-- 抽屉组件 -->
    <drawer ></drawer>
    <!-- 置顶和IM按钮 -->
    <TopIM />
    <!-- 网站底部组件 -->
    <Footer />
  </div>
</template>

<style lang="scss" scoped>
  @import "../../assets/css/pc/article-detail.scss";
  @import "../../assets/css/pc/label.scss";
</style>

<script lang="ts">
// 引入js文件
import label from "/@/assets/js/pc/label";

// 使用js对象
export default {
  ...label,
};
</script>
