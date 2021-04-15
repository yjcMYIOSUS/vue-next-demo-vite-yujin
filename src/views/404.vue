<template>
  <div class="top">
     <!-- 公共标题组件 -->
    <Header v-on:closeMenu="closeMenu" :show="showRef" />
    <div class="main404">
      <!-- 公共导航组件 -->
      <Menu v-on:showMenuByChild="showMenuByChild" />
      <div class="content404">
        <div class="imgdiv">
          <img src="../assets/img/404_bg.png" alt="">
        </div>
        <div class="worddiv">
          <p class="nopage">您访问的页面不见了！</p>
          <p class="goindex" @click="this.$router.push('/pc/index')" >去首页>></p>
        </div>
      </div>
    </div>
    <!-- 网站底部组件 -->
    <div class="menu-copyright">
      <p>Copyright© 2017 - 2021 | <a target="_blank" href="https://guanchao.site">时间里的</a> .AllRightsReserved</p>
    </div>
  </div>
 
</template>

<style lang="scss" scoped>
  @import "../assets/css/pc/404.scss";
</style>

<script lang="ts">
  import Footer from "/@/components/pc/Footer.vue";
  import Header from "/@/components/pc/Header.vue";
  import Menu from "/@/components/pc/Menu.vue";
  import {
    PropType,
    ref,
    watch,
    reactive,
    toRefs,
} from "vue";
  // 使用js对象
  export default {
    name: "index",
    components: {
        Footer,
        Header,
        Menu,
    },
    // VUE3 语法 第一个执行的钩子函数
    // setup官方文档
    // https://www.vue3js.cn/docs/zh/guide/composition-api-setup.html#参数
    setup(props: any, content: any) {


        const data = reactive({
            showRef: 0,
        });
        // ===================================================================
        // 右上角菜单
        const closeMenu = (param: number) => {
            // param就是子组件传过来的值
            data.showRef = param;
        }
        const showMenuByChild = (param: number) => {
            data.showRef = param;
            // this.$refs.menuShowObj.getSrcList(this.showRef);
        }
        // ===================================================================
        const dataRef = toRefs(data);
        return {
            showMenuByChild,
            closeMenu,
            ...dataRef
        }
    },//*/
  };
</script>

