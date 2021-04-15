<template>
  <!-- 公共loading组件 -->
  <load :loading=loading />
  <!-- 主体内容 -->
  <div v-if="loading == false">
    <!-- 公共标题组件 -->
    <!-- VUE2.0语法，使用$refs 传值 -->
    <Header v-on:closeMenu=closeMenu v-bind:show=showRef  />
    <!-- <Header :show=showRef   /> -->
    <main id="main">
      <!-- 公共导航组件 -->
      <Menu v-on:showMenuByChild=showMenuByChild :show=showRef />
        <!-- 标题加动图 -->
      <!-- 标题 -->
      <div class="preview">
        <header class="header">
          <h1 class="header-title">{{cat_name}}</h1>
          <div class="header-subtitle">
            <span class="label-button"  @click="cateSonShow(item.id)"  v-for="(item, index) in categoryList" :key="index">{{item.cat_name}}</span>
          </div>
        </header>
      </div>
      <!-- 文章列表 -->
      <div class="container" id="container">
        <section class="row post article-mode">
          <div class="col-lg-4 col-md-6 col-sm-12 post-item" @click="jumPage(item.id)" v-for="(item, index) in articleList" :key="index">
            <div class="post-wrap">
              <div class="post-top" v-if="item.is_top">
                <div >置顶</div>
              </div>

              <span class="post-image">
                <img :src="item.artlogo" draggable="false" class="lazyload" />
              </span>
              <div class="post-content">
                <h5 class="post-title">
                  <span :title="item.arttitle" v-html="item.arttitle"></span>
                </h5>

                <div class="post-excerpt">
                  <p class="substr-3">
                    {{item.artdesc}}
                  </p>
                </div>
                <div class="post-info">
                  <span class="post-info-item">
                    <svg t="1614910067526" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1668" width="15" height="15"><path d="M776.534075 943.9224L345.652184 509.182115l417.000063-429.20433a47.516954 47.516954 0 0 0 0-66.473408 44.58122 44.58122 0 0 0-63.957065 0L246.969578 478.734358a47.516954 47.516954 0 0 0 0 66.473408 39.338837 39.338837 0 0 0 12.581718 8.387812l452.941836 456.926047a47.978283 47.978283 0 0 0 66.725043 0 50.326871 50.326871 0 0 0-2.6841-66.599225z" p-id="1669" fill="#8a8a8a"></path></svg>
                    {{item.putime}}
                  </span>

                  <!-- <span class="post-info-item"
                    ><i class="iconfont iconeye"></i
                    ><span
                      id="/2020/01/30/hexo-theme-zhaoo/"
                      class="leancloud"
                      data-flag-title="hexo-theme-zhaoo"
                    ></span
                  ></span> -->
                  <!-- 浏览数 -->
                  <span class="post-info-item">
                    <svg t="1614909312377" class="icon" viewBox="0 0 1228 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="810" width="15" height="15"><path d="M1213.564424 433.179074C1108.917883 177.419089 880.23159 0 614.486981 0S120.05608 177.419089 15.409539 433.179074a209.293081 209.293081 0 0 0 0 157.641852C120.05608 846.580911 348.742372 1024 614.486981 1024s494.430902-177.419089 599.077443-433.179074a209.293081 209.293081 0 0 0 0-157.641852z m-63.171948 131.720232C1053.234403 802.418151 842.78925 955.83574 614.486981 955.83574s-438.747422-153.609601-535.905494-390.936434a141.896869 141.896869 0 0 1 0-105.798612C175.73956 221.773861 386.184713 68.356272 614.486981 68.356272s438.747422 153.609601 535.905495 390.744422a141.896869 141.896869 0 0 1 0 105.798612z" fill="#8a8a8a" p-id="811"></path><path d="M614.486981 307.219201a204.876805 204.876805 0 1 0 204.876805 204.876805A204.876805 204.876805 0 0 0 614.486981 307.219201z m0 343.125446a138.248641 138.248641 0 1 1 138.248641-138.248641 138.440653 138.440653 0 0 1-138.248641 138.248641z" fill="#8a8a8a" p-id="812"></path></svg>
                    {{item.click_num}}
                  </span>
                  <!-- 评论数 -->
                  <span class="post-info-item">
                    <svg t="1614909432077" class="icon" viewBox="0 0 1060 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1031" width="15" height="15"><path d="M522.96404 978.64404c-9.929697 0-23.169293-6.619798-29.789091-13.239596l-112.536565-115.846464H109.226667c-59.578182 0-109.226667-46.338586-109.226667-109.226667V154.479192c0-59.578182 49.648485-109.226667 109.226667-109.226667H949.94101c59.578182 0 109.226667 49.648485 109.226667 109.226667v589.16202c0 62.888081-49.648485 109.226667-109.226667 109.226667-16.549495 0-26.479192-9.929697-26.479192-26.479192s9.929697-26.479192 26.479192-26.479192c26.479192 0 52.958384-26.479192 52.958384-52.958384V154.479192c0-26.479192-26.479192-52.958384-52.958384-52.958384H109.226667c-26.479192 0-52.958384 26.479192-52.958384 52.958384v589.16202c0 29.789091 26.479192 52.958384 52.958384 52.958384h284.651313c9.929697 0 13.239596 3.309899 19.859394 9.929697l115.846464 115.846465 112.536566-115.846465c6.619798-6.619798 9.929697-9.929697 19.859394-9.929697h105.916768c16.549495 0 26.479192 9.929697 26.479192 26.479192s-9.929697 26.479192-26.479192 26.479192h-95.987071l-112.536566 115.846464c-9.929697 6.619798-19.859394 13.239596-36.408889 13.239596z m0 0" p-id="1032" fill="#8a8a8a"></path><path d="M334.299798 439.130505c0 29.789091-26.479192 56.268283-56.268283 56.268283S221.763232 468.919596 221.763232 439.130505s26.479192-56.268283 56.268283-56.268283 56.268283 23.169293 56.268283 56.268283M585.852121 435.820606c0 29.789091-26.479192 56.268283-56.268283 56.268283-29.789091 0-56.268283-26.479192-56.268282-56.268283 0-29.789091 26.479192-56.268283 56.268282-56.268283 29.789091 0 56.268283 26.479192 56.268283 56.268283m251.552323 3.309899c0 29.789091-26.479192 56.268283-56.268282 56.268283-29.789091 0-56.268283-26.479192-56.268283-56.268283s26.479192-56.268283 56.268283-56.268283c29.789091 0 56.268283 23.169293 56.268282 56.268283" p-id="1033" fill="#8a8a8a"></path></svg>
                    {{item.commentNum}}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section class="paginator">
          <!-- <span class="page-number current">1</span
          ><a class="page-number" href="/page/2/">2</a
          ><a class="page-number" href="/page/3/">3</a
          ><span class="space">&hellip;</span
          ><a class="page-number" href="/page/5/">5</a
          ><a class="extend next" rel="next" href="/page/2/">&gt;</a> -->
          <Pagination :dataAll="articlePage" :dataCur="Number(currentPage)" :datanum="dataNum" :dataDatanum="articlePage * 9" @change-page="changePage"></Pagination>
        </section>
      </div>
    </main>
    <!-- 抽屉组件 -->
    <drawer ></drawer>
    <!-- 置顶和IM按钮 -->
    <TopIM />
    <!-- 网站底部组件 -->
    <Footer/>
  </div>
</template>

<style lang="scss" scoped>
  @import "../../assets/css/pc/index.scss";
  @import "../../assets/css/pc/public.scss";
  @import "../../assets/css/pc/article-list.scss";
</style>

<script lang="ts">
// 引入js文件
import articleList from "/@/assets/js/pc/articleList";

// 使用js对象
export default {
  ...articleList,
};
</script>
