 // 引入vue3中vue框架的createApp这个方法，创建一个实例
import { createApp } from "vue";
// 引入vuex
import store from "/@/store";

// ======================================================
// 引入路由
import { Router, useRouter } from 'vue-router'
import router from "/@/router";

// import ElementPlus from 'element-plus';
// import '../node_modules/element-plus/lib/theme-chalk/index.css';
// import Antd from "ant-design-vue";
// import "../node_modules/ant-design-vue/dist/antd.css";

//配置请求数据
import { AxiosInstance } from "axios";
// 引入自定义封装的axios
import axios from "./hooks/axios";

// =======================================================
//全局配置axios，router （这种方式在TS以及VUE3.0中不推荐在原型链上挂载一些东西这种适用方法）
declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $axios: AxiosInstance;
        // $router: Router;
    }
}

import App from "/@/App.vue";

// 创建实例
const app = createApp(App);
app.use(router);
app.use(store);

// =======================================================
// 注册一个全局自定义指令 `v-focus`
app.directive('console', {
    // 当被绑定的元素插入到 DOM 中时……
    mounted(el) {
        // Focus the element
        // el.focus()
        console.log('自定义全局指令v-console 注册成功');
    }
})

// =======================================================
// vue3版本的全局函数
// === Vue.prototype.name = 'vue2'
app.config.globalProperties.$axios = axios;  
// app.config.globalProperties.$router = router;
// 调用
/**
    import {getCurrentInstance,} from "vue";
    //获取上下文实例，ctx=vue2的this
    const { ctx } = getCurrentInstance();
    ctx.$router.push('/xxx/xxxx');
 */
// =======================================================
// 加载UI框架
// app.use(Antd);
// app.use(ElementPlus);

// 将实例挂载至节点
app.mount("#app");