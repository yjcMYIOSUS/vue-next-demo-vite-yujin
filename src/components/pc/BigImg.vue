<template>
    <!-- https://www.cnblogs.com/xiaoyao181/p/8550398.html -->
    <!-- https://www.jb51.net/article/121227.htm -->
    <!-- 过渡动画 -->
    <div name="fade">
   　　 <div class="img-view" @click="bigImg">
   　　　　 <!-- 遮罩层 -->
   　　　　 <div class="img-layer"></div>
   　　　　 <div class="img">
   　　　　　　 <img :src="imgSrc">
   　　　　 </div>
    　　</div>
　　</div>
</template>
<script>
  // 引入js文件
  import BigImg from "/@/assets/js/components/pc/BigImg";
  // 使用js对象
  export default {
    ...BigImg,
  };
</script>
<style lang="scss" scoped>
    @import "../../assets/css/components/pc/BigImg.scss";
</style>

