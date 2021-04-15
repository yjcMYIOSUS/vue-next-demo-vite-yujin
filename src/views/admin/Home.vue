<template>
  <div>
      <a-breadcrumb style="margin: 16px 0">
      <a-breadcrumb-item>User</a-breadcrumb-item>
      <a-breadcrumb-item>xxxx</a-breadcrumb-item>
    </a-breadcrumb>
    <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
        <h1>This is a home page</h1>
        <HelloWorld msg="Hello Vue 3.0 + Vite" />
    </div>
  </div>
</template>

<script lang="ts">
import {  } from "vue";

// 引入js文件
import home from '/@/assets/js/admin/home';
// 使用js对象
export default {
  ...home,
};
</script>
