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
// 引入路由
import { useRouter, useRoute } from "vue-router";
import HelloWorld from "/@/components/HelloWorld.vue";
import Footer from "/@/components/pc/Footer.vue";
import Header from "/@/components/pc/Header.vue";
import Menu from "/@/components/pc/Menu.vue";
import load from "/@/components/pc/loading.vue";
import TopIM from "/@/components/pc/TopIM.vue";
import Drawer from "/@/components/pc/Drawer.vue";
import Pagination from "/@/components/pc/Pagination.vue";
// 引入公共js文件
import utils from "/@/assets/js/public/function";
// api 接口文件
import { getArticleListByCategory } from "/@/api/pc/articleList.ts";
// 公共状态文件
import { common } from "/@/hooks/common.ts";
export default {
    name: "articleList",
    components: {
        HelloWorld,
        Footer,
        Header,
        Menu,
        load,
        TopIM,
        Drawer,
        Pagination
    },
    // VUE3 语法 第一个执行的钩子函数
    // setup官方文档
    // https://www.vue3js.cn/docs/zh/guide/composition-api-setup.html#参数
    setup(props: any, content: any) {
        // 实例化路由
        const router = useRouter();
        const route = useRoute();
        /**
         * @name: 声明data
         * @author: camellia
         * @email: guanchao_gc@qq.com
         * @date: 2021-01-18 
         */
        const data = reactive({
            showRef: 0,
            // loading 是否显示
            loading: true,
            // 文章列表
            articleList: [],
            // 数据页数
            articlePage: 0,
            // 当前页
            currentPage: route.query.page ? route.query.page : 1,
            // 分页显示页码数
            dataNum: 7,
            // 分类id
            cate_id: route.query.cate_id ? route.query.cate_id : '',
            // 分类名称
            cat_name:'',
            // 分类列表
            categoryList:'',
            // 子分类
            cate_id_son: route.query.cate_id_son ? route.query.cate_id_son : '',
            // 标签id
            label_id: route.query.label_id ? route.query.label_id : '',
            // 搜索字符串
            search: route.query.search ? route.query.search : '',
        });

        /**
         * @name: 监听公共状态文件中loading值的变化
         * @author: camellia
         * @email: guanchao_gc@qq.com
         * @date: 2020-12-21 
         */
        watch(
            () => common.loading,
            () => {
                data.loading = common.loading
                // loading显示时间
                utils.sleep(1000).then(() => {
                    // 这里写sleep之后需要去做的事情
                    data.loading = false;
                    common.loading = data.loading;
                });
            }
        );

        /**
         * @name: 监听搜索值变化
         * @author: camellia
         * @email: guanchao_gc@qq.com
         * @date: 2020-12-21 
         */
        watch(
            () => common.search,
            () => {
                data.search = common.search;
                data.currentPage = 1;
                data.cate_id = '';
                data.cate_id_son = '';
                data.label_id = '';
                getData();
            }
        );
        
        /**
         * @name: loading显示时间
         * @author: camellia
         * @email: guanchao_gc@qq.com
         * @date: 2020-12-21 
         */
        // utils.sleep(1000).then(() => {
        //     // 这里写sleep之后需要去做的事情
        //     data.loading = false;
        //     common.loading = data.loading;
        // });

        // ===================================================================
        /**
         * @name: 右上角菜单
         * @author: camellia
         * @email: guanchao_gc@qq.com
         * @date: 2021-01-15 
         * @param:	param	number	menu是否显示
         * @param:	cate	number	显示文章分类id
         */
        const closeMenu = (param: number,cate:string='') => {
            // param就是子组件传过来的值
            data.showRef = param;
            if(cate != '')
            {
                data.cate_id = cate;
                data.currentPage = 1;
                data.cate_id_son = '';
                data.label_id = '';
                getData();
            }
        }
        const showMenuByChild = (param: number) => {
            data.showRef = param;
            // this.$refs.menuShowObj.getSrcList(this.showRef);
        }
        // ===================================================================
        /**
         * @name: 跳详情页
         * @author: camellia
         * @email: guanchao_gc@qq.com
         * @date: 2021-01-14 
         */
        const jumPage = (article_id:number) => {
            router.push(
            {
                path: '/pc/articleDetail',
                query: {
                    article_id: utils.encryptCode({'article_id':article_id})
                }
            });//*/
            document.documentElement.scrollTop = 0;
        }
        /**
         * @name: 获取初始数据
         * @author: camellia
         * @email: guanchao_gc@qq.com
         * @date: 2021-01-15 
         */
        const getData = () => {
            // 文档 ：http://www.axios-js.com/zh-cn/docs/
            let info = {
                page: data.currentPage,
                cate_id: data.cate_id,
                cate_id_son: data.cate_id_son,
                search:data.search,
                label_id:data.label_id
            };
            let param = utils.createRouterParam(info);
            data.loading = true;
            try {
                getArticleListByCategory(param).then(function (response: any) {
                    data.cat_name = response.cateName;
                    data.categoryList = response.cateList;
                    data.articlePage = response.articlePage;
                    data.articleList = response.articleShow;
                    data.loading = false;
                    utils.goToScrollTop();
                });
            } catch (error) {
                utils.alertMsg(2000, '系统错误');
            }
            /*axios.get('/index.php/article/getArticleListByCategory', { params: param })
                .then(function (response: any) {
                    data.cat_name = response.data.cateName;
                    data.categoryList = response.data.cateList;
                    data.articlePage = response.data.articlePage;
                    data.articleList = response.data.articleShow;
                    data.loading = false;
                    utils.goToScrollTop();
                })
                .catch(function (error: any) { });//*/
        }
        /**
         * @name: 分页子组件传递值方法
         * @author: camellia
         * @email: guanchao_gc@qq.com
         * @date: 2021-01-11 
         * @param:	param	Number	子组件传递来的页码
         */
        const changePage = (param: number) => {
            data.currentPage = param;
            getData();

            let info = {
                page: data.currentPage,
                cate_id: data.cate_id,
                cate_id_son: data.cate_id_son,
                label_id: data.label_id,
                search: data.search,
            }
            let routerQuery = utils.createRouterParam(info);
            router.push(
            {
                path: '/pc/articleList',
                query: routerQuery
            });
        }

        /**
         * @name: 子分类显示
         * @author: camellia
         * @email: guanchao_gc@qq.com
         * @date: 2021-01-15 
         * @param:	data	type	description
         * @return:	data	type	description
         */
        const cateSonShow = (cate_id_son:number) =>{
            data.cate_id_son = utils.encryptCode({'cate_id_son': cate_id_son});
            data.currentPage = 1;
            data.cate_id = '';
            getData();
            router.push(
            {
                path: '/pc/articleList',
                query: {
                    page: data.currentPage,
                    cate_id_son: data.cate_id_son
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
            jumPage,
            changePage, cateSonShow,
            // showMenu ,
            closeMenu,
            ...dataRef
        }
    },//*/
    methods: {}
};

