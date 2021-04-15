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
// 引入axios钩子
import axios from "/@/hooks/axios.ts";
import { useRouter, useRoute } from "vue-router";
import Footer from "/@/components/pc/Footer.vue";
import Header from "/@/components/pc/Header.vue";
import Menu from "/@/components/pc/Menu.vue";
import load from "/@/components/pc/loading.vue";
import TopIM from "/@/components/pc/TopIM.vue";
import Drawer from "/@/components/pc/Drawer.vue";
// 引入公共js文件
import utils from "/@/assets/js/public/function";
// api 接口文件
import { getFileList } from "/@/api/pc/placeOnFile.ts";
export default {
    name: "placeOnFile",
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
        const route = useRoute();
        /**
         * @name: 声明data
         * @author: camellia
         * @email: guanchao_gc@qq.com
         * @date: 2021-01-18 
         */
        const data = reactive({
            // 菜单显示标识
            showRef: 0,
            // loading显示标识
            loading: true,
            // 数据列表
            dataList:[
                {
                    title:'2020 年',
                    list:[
                        {
                            month:'十一月 16',
                            title:'CSS - 元素数量选择器'
                        },
                        {
                            month: '十一月 16',
                            title: 'CSS - 元素数量选择器'
                        },
                    ]
                },
                {
                    title: '2019 年',
                    list: [
                        {
                            month: '十一月 16',
                            title: 'CSS - 元素数量选择器'
                        },
                        {
                            month: '十一月 16',
                            title: 'CSS - 元素数量选择器'
                        },
                    ]
                }
            ],
            // 文章数量
            articleCount:0,
        });

        /**
         * @name: loading显示时间
         * @author: camellia
         * @email: guanchao_gc@qq.com
         * @date: 2021-01-18 
         */
        // utils.sleep(1000).then(() => {
        //     // 这里写sleep之后需要去做的事情
        //     data.loading = false;
        // });

        // ===================================================================
        /**
         * @name: 右上角菜单
         * @author: camellia
         * @email: guanchao_gc@qq.com
         * @date: 2021-01-18 
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
         * @name: 获取初始数据
         * @author: camellia
         * @email: guanchao_gc@qq.com
         * @date: 2021-01-15 
         */
        const getData = () => {
            // 文档 ：http://www.axios-js.com/zh-cn/docs/
            let param = {};
            data.loading = true;
            try {
                getFileList(param).then(function (response: any) {
                    data.dataList = response.dataList;
                    data.articleCount = response.articleCount;
                    data.loading = false;
                    utils.goToScrollTop();
                });
            } catch (error) {
                utils.alertMsg(2000, '系统错误');
            }
            /*axios.get('/index.php/placeonfile/getFileList', { params: param })
                .then(function (response: any) {
                    data.dataList = response.data.dataList;
                    data.articleCount = response.data.articleCount;
                    data.loading = false;
                    utils.goToScrollTop();
                })
                .catch(function (error: any) { });//*/
        }
        /**
         * @name: 去文章详情页
         * @author: camellia
         * @email: guanchao_gc@qq.com
         * @date: 2021-01-19 
         * @param:	data	type	description
         * @return:	data	type	description
         */
        const geTOArticle = (article_id: number) =>{
            router.push(
            {
                path: '/pc/articleDetail',
                query: {
                    article_id: utils.encryptCode({ 'article_id': article_id })
                }
            });
        }

        // =============================================================================
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
            closeMenu, geTOArticle,
            ...dataRef
        }
    },
    methods: {}
};

