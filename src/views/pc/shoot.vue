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
      <section class="container galleries">
        <header class="header">
          <h1 class="header-title">摄影</h1>
          <p class="header-subtitle">Photography</p>
        </header>

        <div class="wrap padding-bottom">
          <a href="./colorful" class="item">
            <img
              class="lazyload"
              src="https://guanchao.site/uploads/atricle/5fb31e9c9d939.jpeg"
              alt="colorful"
            />
            <div class="title-wrap">
              <div class="mask">
                <h3 class="title">colorful</h3>
              </div>
            </div>
          </a>

          <a href="./记事" class="item">
            <img
              class="lazyload"
              src="https://guanchao.site/uploads/atricle/5fb31e9c9d939.jpeg"
              alt="记事"
            />
            <div class="title-wrap">
              <div class="mask">
                <h3 class="title">记事</h3>
              </div>
            </div>
          </a>

          <a href="./深圳日记" class="item">
            <img
              class="lazyload"
              src="https://guanchao.site/uploads/atricle/5fb31e9c9d939.jpeg"
              alt="深圳日记"
            />
            <div class="title-wrap">
              <div class="mask">
                <h3 class="title">深圳日记</h3>
              </div>
            </div>
          </a>

          <a href="./金陵之旅" class="item">
            <img
              class="lazyload"
              src="https://guanchao.site/uploads/atricle/5fb31e9c9d939.jpeg"
              alt="金陵之旅"
            />
            <div class="title-wrap">
              <div class="mask">
                <h3 class="title">金陵之旅</h3>
              </div>
            </div>
          </a>
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
</style>

<script lang="ts">
// 引入js文件
import shoot from "/@/assets/js/pc/shoot";

// 使用js对象
export default {
  ...shoot,
};
</script>
