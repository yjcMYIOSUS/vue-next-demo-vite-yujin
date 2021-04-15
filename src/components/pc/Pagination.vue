
<template>
  <!-- 自定义分页组件 -->
  <div class="page-bar">
    <ul>
      <li class="first">
        <!-- <span>共{{dataNum}}条记录 第 {{cur}} / {{all}} 页</span> -->
        <span>共{{ dataNum }}条记录 </span>
      </li>
      <li v-if="cur > 1" class="prev-next">
        <!-- 点击上一页 -->
        <a v-on:click="cur--, pageClick()"> prev </a>
      </li>
      <li v-if="cur == 1" class="prev-next">
        <!-- 点击第一页时显示 -->
        <a class="banclick"> prev </a>
      </li>
      <li
        class="li_a"
        v-for="index in indexs"
        v-bind:class="{ active: cur == index }"
      >
        <!-- 页码 -->
        <a v-on:click="btnClick(index)"> {{ index }}</a>
      </li>
      <li v-if="cur != all" class="prev-next">
        <!-- 点击下一页 -->
        <a v-on:click="cur++, pageClick()"> next </a>
      </li>
      <li v-if="cur == all" class="prev-next">
        <!-- 点击最后一页时显示 -->
        <a class="banclick"> next </a>
      </li>

      <li class="last_li">
        <!-- 共有多少页 -->
        跳至<input type="text" class="page-input" @blur.prevent="changePage()" v-model="jumpPage">页
      </li>

      <li class="last_li">
        <!-- 共有多少页 -->
        <span
          >共<i>{{ all }}</i
          >页</span
        >
      </li>
    </ul>
  </div>
</template>
<script>
// 引入js文件
import Pagination from "/@/assets/js/components/pc/Pagination";
// 使用js对象
export default {
  ...Pagination,
};
</script>
<style lang="scss" scoped>
@import "../../assets/css/components/pc/Pagination.scss";
</style>