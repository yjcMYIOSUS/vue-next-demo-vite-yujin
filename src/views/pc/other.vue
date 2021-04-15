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
      <section >
        <div class="xttblog">
            <ul class="box">
                <li><a href="#" ><img src="http://thirdqq.qlogo.cn/g?b=oidb&k=chKV5fa4V6wqcOuTiatmibHQ&s=100&t=1555469889" /></a></li>
                <li><a href="#" ><img src="http://thirdqq.qlogo.cn/g?b=oidb&k=chKV5fa4V6wqcOuTiatmibHQ&s=100&t=1555469889" /></a></li>
                <li><a href="#" ><img src="http://thirdqq.qlogo.cn/g?b=oidb&k=chKV5fa4V6wqcOuTiatmibHQ&s=100&t=1555469889" /></a></li>
                <li><a href="#" ><img src="http://thirdqq.qlogo.cn/g?b=oidb&k=chKV5fa4V6wqcOuTiatmibHQ&s=100&t=1555469889" /></a></li>
                <li><a href="#" ><img src="http://thirdqq.qlogo.cn/g?b=oidb&k=chKV5fa4V6wqcOuTiatmibHQ&s=100&t=1555469889" /></a></li>
                <li><a href="#" ><img src="http://thirdqq.qlogo.cn/g?b=oidb&k=chKV5fa4V6wqcOuTiatmibHQ&s=100&t=1555469889" /></a></li>
                <li><a href="#" ><img src="http://thirdqq.qlogo.cn/g?b=oidb&k=chKV5fa4V6wqcOuTiatmibHQ&s=100&t=1555469889" /></a></li>
                <li><a href="#" ><img src="http://thirdqq.qlogo.cn/g?b=oidb&k=chKV5fa4V6wqcOuTiatmibHQ&s=100&t=1555469889" /></a></li>
                <li><a href="#" ><img src="http://thirdqq.qlogo.cn/g?b=oidb&k=chKV5fa4V6wqcOuTiatmibHQ&s=100&t=1555469889" /></a></li>
            </ul>
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
  @import "../../assets/css/pc/other.scss";
</style>

<script lang="ts">
// 引入js文件
import other from "/@/assets/js/pc/other";

// 使用js对象
export default {
  ...other,
};
</script>
