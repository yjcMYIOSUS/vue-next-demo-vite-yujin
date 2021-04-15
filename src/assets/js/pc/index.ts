import {
    PropType,
    ref,
    watch,
    reactive,
    toRefs,
    getCurrentInstance,
    provide,
    inject,
    onBeforeMount,// 在组件挂载之前执行的函数
    onMounted,
    onBeforeUpdate,// 在组件修改之前执行的函数
    onUpdated,
    onBeforeUnmount,// 在组件卸载之前执行的函数
    onUnmounted,
    nextTick
} from "vue";
// 引入axios钩子
import axios from "/@/hooks/axios.ts";
// 引入路由
import { useRouter, useRoute } from "vue-router";

// 引入各个自定义组件(懒加载)
// const HelloWorld = () => import("/@/components/HelloWorld.vue");
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
// 公共状态文件
import { common } from "/@/hooks/common.ts";
// api 接口文件
import { getdata } from "/@/api/pc/index.ts";
import { urlRegex } from "wangeditor/dist/utils/const";
export default {
    name: "index",
    components: {
        HelloWorld,
        Footer,
        Header,
        Menu,
        load,
        TopIM,
        Drawer,
        Pagination,
    },
    /**
     * @name: 自定义指令（局部注册）
     * @author: camellia
     * @email: guanchao_gc@qq.com
     * @date: 2021-02-25 
     */
    directives: {
        // v-part
        part: {
            // 指令的定义,防止按钮重复点击
            mounted(el: any, binding:any) {
                // el.focus()
                console.log(el);
                console.log(binding);
                // console.log('自定义局部指令注册成功！');
                el.addEventListener('click', () => {
                    if (!el.disabled) {
                        el.disabled = true;
                        setTimeout(() => {
                            el.disabled = false;
                        }, binding.value || 300);
                    }
                });
            }
        }
    },
    // VUE3 语法 第一个执行的钩子函数
    // setup官方文档 ：https://www.vue3js.cn/docs/zh/guide/composition-api-setup.html#参数
    // setup(props: any, content: any) {
    setup(props: any, content: any) {
        const router = useRouter();
        const route = useRoute()
        //获取上下文实例，ctx=vue2的this
        // const { ctx,proxy } = getCurrentInstance();
        /**
         * @name: 声明data
         * @author: camellia
         * @email: guanchao_gc@qq.com
         * @date: 2021-01-10 
         */
        const data = reactive({
            // 展示menu
            showRef: 0,
            // 全局参数
            glabl: common.glabl,
            // loading 是否显示
            loading: true,
            // 文章列表
            articleList:[],
            // 数据页数
            articlePage:0,
            // 当前页
            currentPage: route.query.page ? route.query.page : 1,
            // 分页显示页码数
            dataNum:7,
            // 查询条件
            search:'search',
            // 数据总条数
            dataDatanum:'',
            // 显示欢迎语
            welcomeMessage:'凭君莫话封侯事，一将功成万骨枯。',
            // 欢迎图片
            welcomeImage:{},
        });
        /**
         * @name: loading显示时间
         * @author: camellia
         * @email: guanchao_gc@qq.com
         * @date: 2021-01-10 
         */
        // utils.sleep(1000).then(() => {
        //     // 这里写sleep之后需要去做的事情
        //     data.loading = false;
        //     common.loading = false;
        // });
        // ===================================================================
        /**
         * @name: 右上角菜单
         * @author: camellia
         * @email: guanchao_gc@qq.com
         * @date: 2021-01-10 
         */
        const closeMenu = (param: number) => {
            // param就是子组件传过来的值
            data.showRef = param;
        }
        /**
         * @name: menu子组件传递来的值
         * @author: camellia
         * @email: guanchao_gc@qq.com
         * @date: 2021-01-10
         */
        const showMenuByChild = (param: number) => {
            data.showRef = param;
        }
        // ===================================================================
        /**
         * @name: 跳转详情页
         * @author: camellia
         * @email: guanchao_gc@qq.com
         * @date: 2021-01-10 
         */
        const jumPage = (article_id: number) => {
            router.push(
            {
                path: '/pc/articleDetail',
                query: {
                    article_id: utils.encryptCode({ 'article_id': article_id })
                }
            });//*/
            document.documentElement.scrollTop = 0;
        }
        /**
         * @name: 获取页面数据
         * @author: camellia
         * @email: guanchao_gc@qq.com
         * @date: 2021-01-13 
         * @param:	data	type	description
         * @return:	data	type	description
         */
        const getData = (sign:string = '') => {
            // 文档 ：http://www.axios-js.com/zh-cn/docs/
            let param = {
                page: data.currentPage
            };
            data.loading = true;
            try {
                getdata(param).then(function (response: any) {
                    data.articlePage = response.articlePage;
                    data.articleList = response.articleShow;
                    data.dataDatanum = response.dataDatanum;
                    data.loading = false;

                    // 回到滚动条刷新前位置
                    if (sign) 
                    {
                        let currectWidth = window.screen.height;
                        if (currectWidth == 1080) 
                        {
                            utils.goToScrollTop(968);
                        }
                        else 
                        {
                            utils.goToScrollTop(650);
                        }
                    }
                    else 
                    {
                        utils.goToScrollTop();
                    }
                    randomWelcomeMessage();
                });
            } catch (error) {
                utils.alertMsg(2000, '系统错误');
            }
            /*// proxy.$axios.get('/index.php/index/getdata', { params: param})
            axios.get('/index.php/index/getdata', { params: param })
            .then(function (response:any) {
                data.articlePage = response.data.articlePage;
                data.articleList = response.data.articleShow;
                data.dataDatanum = response.data.dataDatanum;
                data.loading = false;

                // 回到滚动条刷新前位置
                if (sign)
                {
                    let currectWidth = window.screen.height;
                    if (currectWidth == 1080)
                    {
                        utils.goToScrollTop(968);
                    }
                    else
                    {
                        utils.goToScrollTop(650);
                    }
                }
                else
                {
                    utils.goToScrollTop();
                }
            })
            .catch(function (error:any) {});//*/
        }
        /**
         * @name: 随机欢迎语
         * @author: camellia
         * @email: guanchao_gc@qq.com
         * @date: 2021-03-11 
         * @param:	data	type	description
         * @return:	data	type	description
         */
        const randomWelcomeMessage = () => {
            var array = [
                '凭君莫话封侯事，一将功成万骨枯。',
                '侯门一入深似海，从此萧郎是路人。',
                '雨打梨花深闭门，孤负青春，虚负青春。',
                '闲时与你立黄昏，灶前笑问粥可温。',
                '屋漏偏逢连夜雨，每逢佳节倍思亲。'
            ];
            var imageArray = [
                "https://resource.guanchao.site/uploads/sowing/welcome-image3.jpg",
                "https://resource.guanchao.site/uploads/sowing/welcome-image5.jpg",
            ];
            let index = Math.floor(Math.random() * (5 - 0)) + 0; 
            data.welcomeMessage = array[index];
            let indexImage = Math.floor(Math.random() * (2 - 0)) + 0; 
            data.welcomeImage = {
                'background-image': 'url(' + imageArray[indexImage]+')'
            };
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
            getData('page');
            router.push(
            { 
                path: '/pc/index', 
                query: { 
                    page: JSON.stringify(data.currentPage) 
                }
            });
            // router.push(`/pc/index/${data.currentPage}/${data.search}`);
        }
        /*const showMenu = () => {
            if(data.showRef == 0)
            {
                data.showRef = 1;
            }
            else
            {
                data.showRef = 0;
            }
          // this.$refs.menuShowObj.getSrcList(this.showRef);
        }//*/
        // provide('menuShow', data.showRef)

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
            jumPage,
            getData,
            changePage,
            closeMenu, randomWelcomeMessage,
            ...dataRef
        }
    },//*/
};

