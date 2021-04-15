<template>
    <div ref='editor' ></div>
    <!-- <button @click='syncHTML'>同步内容</button>
    <div :innerHTML='content.html'></div> -->
</template>

<script>
  // 引入js文件
  import Wangeditor from "/@/assets/js/components/pc/Wangeditor";

  // 使用js对象
  export default {
    ...Wangeditor,
  };
</script>
