<template>
  <div class="drawer">
    <!-- 遮罩层 -->
    <div class="mask-show" v-if="drawerShow" @click="close()" ></div>
    <!-- 抽屉层 -->
    <div class="setbox" :class="{show: drawerShow}">
      <div class="header">
        <p class="fl">即时聊天</p>
        <button class="off" @click="close()">关闭</button>
      </div>
    </div>
  </div>
</template>
<script>
  // 引入js文件
  import Drawer from "/@/assets/js/components/pc/Drawer";
  // 使用js对象
  export default {
    ...Drawer,
  };
</script>
<style lang="scss" scoped>
    @import "../../assets/css/components/pc/Drawer.scss";
</style>