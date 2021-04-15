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
// api 接口文件
import {  } from "/@/api/pc/other.ts";
export default {
    name: "other",
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
            friendLinkList:[],
        });

        /**
         * @name: 去列表页
         * @author: camellia
         * @email: guanchao_gc@qq.com
         * @date: 2021-01-18 
         */
        const goToList = (label_id:number) => {
            router.push(
            {
                path: '/pc/articleList',
                query: {
                    label_id: utils.encryptCode({ 'label_id': label_id})
                }
            });
        }

        /**
         * @name: 获取标签数据
         * @author: camellia
         * @email: guanchao_gc@qq.com
         * @date: 2021-01-06 
         */
        const getData = () => {
            //  http://www.axios-js.com/zh-cn/docs/
            data.loading = true;
            axios.get('/index.php/friendlink/getFriendLinkList', {})
            .then(function (response: any) {
                data.friendLinkList = response.data.friendLinkList;
                data.loading = false;
                // 回到滚动条刷新前位置
                utils.goToScrollTop();
            })
            .catch(function (error: any) {});//*/
        }
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

        // ===================================================================
        // 初始调用
        getData();

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
            goToList,
            ...dataRef
        }
    },
    methods: {
    }
};

