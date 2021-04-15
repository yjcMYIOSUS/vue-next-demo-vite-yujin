<template>
  <div v-if="loading == true" class="loading-my">
    <img src="../../assets/img/loading.gif" alt="">
  </div>
</template>
<style lang="scss" scoped>
  .loading-my{
    margin: auto;
    width: 100px;
    padding-top: 20%;
    height: 100vh;
    z-index:200;
  }
</style>
<script lang="ts">
  import {
      ref,
      reactive,
      toRefs,
  } from "vue";
  // 使用js对象
  export default {
    name: "loading",
    // 传递来的参数
    props: { 
        loading: {
            type: Boolean,
            default: false, 
        },
    },
    // VUE3 语法 第一个执行的钩子函数
    // setup官方文档 : https://www.vue3js.cn/docs/zh/guide/composition-api-setup.html#参数
    setup(props: any, content: any) {
        const data = reactive({
            loading: props.loading,
        });
        const dataRef = toRefs(data);
        return {
            ...dataRef
        }
    },//*/
  };
</script>

