<template>
  <!-- 公共loading组件 -->
  <load :loading=loading />
  <!-- 主体内容 -->
  <div v-if="loading == false">
    <!-- 公共标题组件 -->
    <Header v-on:closeMenu=closeMenu :show=showRef  />
    <main id="main" class="mar-bottom">
      <!-- 公共导航组件 -->
      <Menu v-on:showMenuByChild=showMenuByChild  />
      
      <!-- 主体内容 -->
      <section class="archive">
        <div class="archive-container">
          <div class="archive-post">
            <h3 class="archive-total">归档: {{articleCount}} 篇</h3>

            <!-- 树形图 -->
            <div v-for="(item, index) in dataList" :key="index">
              <h3 class="archive-year"  >{{item.year}}</h3>
              <div class="archive-item" v-for="(value, key) in item.list" :key="key">
                <a class="archive-date" @click="geTOArticle(value.id)">{{value.month}}</a>
                <a class="archive-title" @click="geTOArticle(value.id)">{{value.arttitle}}</a>
              </div>
            </div>

          </div>
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
  @import "../../assets/css/pc/placeOnFile.scss";
</style>

<script lang="ts">
// 引入js文件
import placeOnFile from "/@/assets/js/pc/placeOnFile";

// 使用js对象
export default {
  ...placeOnFile,
};
</script>
