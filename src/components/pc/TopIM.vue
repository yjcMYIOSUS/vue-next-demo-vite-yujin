<template>
  <div class="view" >
    <div class="div" >
      <img src="../../assets/img/comment.png" alt="" class="image" @click="showDrawer()">
    </div>
    <div class="div"  v-if="topShow">
      <img src="../../assets/img/up.png" alt="image" class="image" @click="goto()">
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import "../../assets/css/components/pc/TopIm.scss";
</style>

<script lang="ts">
  // 引入js文件
  import TopIm from "../../assets/js/components/pc/TopIm";
  // 使用js对象
  export default {
    ...TopIm,
  };
</script>

