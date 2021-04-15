import {
    PropType,
    ref,
    watch,
    reactive,
    toRefs,
    provide,
    inject,
    onBeforeMount,// 在组件挂载之前执行的函数
    onMounted,
    onBeforeUpdate,// 在组件修改之前执行的函数
    onUpdated,
    onBeforeUnmount,// 在组件卸载之前执行的函数
    onUnmounted
} from "vue";

import { useRouter } from "vue-router";
import Footer from "/@/components/pc/Footer.vue";
import Header from "/@/components/pc/Header.vue";
import Menu from "/@/components/pc/Menu.vue";
import load from "/@/components/pc/loading.vue";
import TopIM from "/@/components/pc/TopIM.vue";
import Drawer from "/@/components/pc/Drawer.vue";
// 引入公共js文件
import utils from "/@/assets/js/public/function";
// 引入axios钩子
import axios from "/@/hooks/axios.ts";
export default {
    name: "label",
    components: {
        Footer,
        Header,
        Menu,
        load,
        TopIM,
        Drawer,
    },
    // VUE3 语法 第一个执行的钩子函数
    // setup官方文档
    // https://www.vue3js.cn/docs/zh/guide/composition-api-setup.html#参数
    setup(props: any, content: any) {
        // 实例化路由
        var router = useRouter();
        /**
         * @name: 全局变量
         * @author: camellia
         * @email: guanchao_gc@qq.com
         * @date: 2020-12-24 
         */
        const data = reactive({
            showRef: 0,
            loading: true,
            labelList:[],
            labelCount:0,
        });
        
        // 滚动条回顶部
        utils.goToScrollTop(1);

        /**
         * @name: loading显示时间
         * @author: camellia
         * @email: guanchao_gc@qq.com
         * @date: 2020-12-24 
         */
        utils.sleep(1000).then(() => {
            // 这里写sleep之后需要去做的事情
            data.loading = false;
        });

        // ===================================================================
        /**
         * @name: 右上角菜单
         * @author: camellia
         * @email: guanchao_gc@qq.com
         * @date: 2021-01-06 
         */
        const closeMenu = (param: number) => {
            // param就是子组件传过来的值
            data.showRef = param;
        }
        const showMenuByChild = (param: number) => {
            data.showRef = param;
        }
        // ===================================================================

        /**
         * @name: 将data绑定值dataRef
         * @author: camellia
         * @email: guanchao_gc@qq.com
         * @date: 2021-01-10 
         */
        const dataRef = toRefs(data);
        return {
            showMenuByChild,
            closeMenu,
            ...dataRef
        }
    },
    methods: {
    }
};

