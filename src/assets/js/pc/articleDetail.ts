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
    onUnmounted,
    nextTick
} from "vue";

//导入代码高亮文件
import hljs from 'highlight.js' 

// 引入axios钩子
import axios from "/@/hooks/axios.ts";

import { useRouter, useRoute } from "vue-router";
import Footer from "/@/components/pc/Footer.vue";
import Header from "/@/components/pc/Header.vue";
import Menu from "/@/components/pc/Menu.vue";
import load from "/@/components/pc/loading.vue";
import TopIM from "/@/components/pc/TopIM.vue";
import Drawer from "/@/components/pc/Drawer.vue";
import Wangeditor from "/@/components/pc/Wangeditor.vue";
import Modal from "/@/components/pc/Modal.vue";
import bigImg from "/@/components/pc/bigImg.vue";

import { common, userinfo } from "/@/hooks/common.ts";
// 引入公共js文件
import utils from "/@/assets/js/public/function";
// api 接口文件
import { putComment, getArticleDetail } from "/@/api/pc/articleDetail.ts";
export default {
    name: "articleDetail",
    components: {
        Footer,
        Header,
        Menu,
        load,
        TopIM,
        Drawer,
        Wangeditor,
        Modal,
        bigImg,
    },
    // VUE3 语法 第一个执行的钩子函数
    // setup官方文档
    // https://www.vue3js.cn/docs/zh/guide/composition-api-setup.html#参数
    setup(props: any, content: any) {
        // 实例化路由
        var router = useRouter();
        // 路由参数
        var route = useRoute();
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
            // 文章id
            article_id: route.query.article_id ? route.query.article_id : '',
            // 文章详情数据
            articleDetail:'',
            // 文章详情内容
            content:'',
            // 微信划过标识
            WXIconShowSign:false,
            // 支付宝划过标识
            ALIconShowSign:false,
            // 上一篇文章对象
            frontArticle:'',
            // 下一篇文章对象
            afterArticle:'',
            // 标签列表
            labelList:[],
            // 是否登录标识
            loginSign: userinfo.email ? true : false,
            // 评价列表
            commonList:[],
            // modal显示标识
            modalShow: false,
            // modal标题
            modalTitle: '评论回复',
            // 回复评论的主键id
            replyid:'',
            // 评论内容
            comment_content: '',
            // 回复评论内容
            comment_content_replay: '',
            // 邮箱
            email:'',
            // 评论数量
            commentCount:'',
            // 资源详情
            resource:'',
            // 是否显示
            showImg: common.bigImgShow,
            // 大图链接
            imgSrc:'',
        });

        /**
         * @name: 监听登录状态变化
         * @author: camellia
         * @email: guanchao_gc@qq.com
         * @date: 2021-01-20 
         */
        watch(
            () => userinfo.email,
            () => {
                data.loginSign = userinfo.email ? true : false;
            }
        );

        /**
         * @name: 监听路由传参变化
         * @author: camellia
         * @email: guanchao_gc@qq.com
         * @date: 2021-01-20 
         */
        watch(
            () => route.query.article_id,
            ()=>{
                data.article_id = route.query.article_id ? route.query.article_id : '';
                if (data.article_id)
                {
                    getData();
                }
            }
        );
        /**
         * @name: 关闭放大图片
         * @author: camellia
         * @email: guanchao_gc@qq.com
         * @date: 2021-03-10 22:38:38
         * @param:	data	type	description
         */
        const closeBigImg = (param: boolean) => {
            data.showImg = param;
        }
        /**
         * @name: 显示大图
         * @author: camellia
         * @email: guanchao_gc@qq.com
         * @date: 2021-03-10 22:37:32
         * @param:	data	type	description
         */
        const imageBoost = (str:string) => {
            data.imgSrc = str;
            data.showImg = true;
            common.bigImgShow = data.showImg;
        }
        window.imageBoost = imageBoost;
        
        /**
         * @name: 下载资源链接
         * @author: camellia
         * @email: guanchao_gc@qq.com
         * @date: 2021-01-27 
         */
        const downloadResource = (str:string) => {
            window.open(str);
        }

        /**
         * @name: 提交回复(点击模态框确定或者取消)
         * @author: camellia
         * @email: guanchao_gc@qq.com
         * @date: 2021-01-26 
         * @param:	sign	boolean	点击确定传true，点击取消传false
         */
        const confirmModal = (sign: boolean) => {
            if (!sign) 
            {
                data.modalShow = false; return;
            }
            if (data.comment_content == '' && data.comment_content_replay == '')
            {
                utils.alertMsg(2000, '请输入评论内容！');return;
            }
            // 开启自定义loading（返回一个html节点）
            utils.alertLoadExec(true);
            let param = {
                article_id: data.article_id,
                email: data.email,
                content: data.comment_content,
                content_reply: data.comment_content_replay,
                replyid: data.replyid,
            };
            try {
                putComment(param).then(function (response: any) 
                {
                    console.log(response);
                    if (response.code == 1) 
                    {
                        data.modalShow = false;
                    }
                    // 关闭自定义loading（需要将创建时的节点传入）
                    utils.alertLoadExec(false);
                    utils.alertMsg(2000, response.msg);
                    data.comment_content = '';
                    data.comment_content_replay = '';
                });
            } catch (error) {
                utils.alertLoadExec(false);
                utils.alertMsg(2000, '系统错误');
            }
            /*axios.get('/index.php/article/putComment', { params: param })
                .then(function (response: any) {
                    if (response.data.code == 1)
                    {
                        data.modalShow = false;
                    }
                    // 关闭自定义loading（需要将创建时的节点传入）
                    utils.alertLoadExec(false);
                    utils.alertMsg(2000, response.data.msg);
                    data.comment_content = '';
                    data.comment_content_replay = '';
                })
                .catch(function (error: any) {
                    utils.alertLoadExec(false);
                 });//*/
        }

        /**
         * @name: 打开模态框
         * @author: camellia
         * @email: guanchao_gc@qq.com
         * @date: 2021-01-26 
         */
        const openModal = (replyid:string) => {
            data.modalShow = true;
            data.replyid = replyid;
        }

        /**
         * @name: 去列表页
         * @author: camellia
         * @email: guanchao_gc@qq.com
         * @date: 2021-01-18 
         */
        const goToList = (label_id: number) => {
            router.push(
            {
                path: '/pc/articleList',
                query: {
                    label_id: utils.encryptCode({ 'label_id': label_id})
                }
            });
        }

        /**
         * @name: 微信支付宝鼠标滑过事件
         * @author: camellia
         * @email: guanchao_gc@qq.com
         * @date: 2021-01-20 
         */
        const changeMask = (str:string) => {
            if (str == 'ali_in')
            {
                data.ALIconShowSign = true;
            }
            else if (str == 'ali_out')
            {
                data.ALIconShowSign = false;
            }
            else if (str == 'wx_in')
            {
                data.WXIconShowSign = true;
            }
            else if (str == 'wx_out')
            {
                data.WXIconShowSign = false;
            }
        }

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
         * @name: editor代码块标签高亮显示
         * @author: camellia
         * @email: guanchao_gc@qq.com
         * @date: 2021-01-19 21:06:22
         */
        const hlCode = (content:string) => {
            //替换pre标签，前端高亮显示
            let c = document.createElement('div');
            c.innerHTML = content;
            for (let i = 0; i < c.getElementsByTagName('pre').length; i++) 
            {
                let con = c.getElementsByTagName('pre')[i].innerHTML;
                c.getElementsByTagName('pre')[i].innerHTML = '<code class="hljs ini">' + con + '</code>';
                hljs.highlightBlock(c.getElementsByTagName('pre')[i]);  //使用插件高亮你的代码块
            }
            content = c.innerHTML;
            return content;
        }
        /**
         * @name: 跳详情页
         * @author: camellia
         * @email: guanchao_gc@qq.com
         * @date: 2021-01-14 
         */
        const jumPage = (article_id: number) => {
            router.push(
            {
                path: '/pc/articleDetail',
                query: {
                    article_id: utils.encryptCode({ 'article_id': article_id})
                }
            });
        }

        /**
         * @name: 获取wangeditor数据
         * @author: camellia
         * @email: guanchao_gc@qq.com
         * @date: 2021-01-19 
         */
        const getWangEditorValue = (str:string) => {
            data.comment_content = str;
        } 
        
        /**
         * @name: 获取评论回复wangeditor数据
         * @author: camellia
         * @email: guanchao_gc@qq.com
         * @date: 2021-01-27 
         */
        const getWangEditorReplayValue = (str: string) => {
            data.comment_content_replay = str;
        }

        /**
         * @name: 获取初始数据
         * @author: camellia
         * @email: guanchao_gc@qq.com
         * @date: 2021-01-15 
         */
        const getData = () => {
            // 文档 ：http://www.axios-js.com/zh-cn/docs/
            let param = {
                article_id:data.article_id
            };
            data.loading = true;
            try {
                getArticleDetail(param).then(function (response: any) {
                    console.log(response);
                    data.content = hlCode(response.detail.content);
                    data.articleDetail = response.detail;
                    data.frontArticle = response.front;
                    data.afterArticle = response.after;
                    data.labelList = response.labelList;
                    data.commonList = response.commonList;
                    data.commentCount = response.commentCount;
                    data.resource = response.resource;
                    data.loading = false;
                    utils.goToScrollTop();
                });
            } catch (error) {
                utils.alertLoadExec(false);
                utils.alertMsg(2000, '系统错误');
            }
            /*axios.get('/index.php/article/getArticleDetail', { params: param })
                .then(function (response: any) {
                    data.content = hlCode(response.data.detail.content);
                    data.articleDetail = response.data.detail; 
                    data.frontArticle = response.data.front; 
                    data.afterArticle = response.data.after;
                    data.labelList = response.data.labelList;
                    data.commonList = response.data.commonList;
                    data.commentCount = response.data.commentCount; 
                    data.resource = response.data.resource;
                    data.loading = false;
                    utils.goToScrollTop();
                })
                .catch(function (error: any) { });//*/
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
            closeMenu,
            hlCode, imageBoost, closeBigImg,
            getData, getWangEditorValue, changeMask, jumPage, goToList, confirmModal, getWangEditorReplayValue, openModal, downloadResource,
            ...dataRef
        }
    },
    methods: {

    }
};

