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
} from "vue";

import { useRouter } from "vue-router";

import Footer from "/@/components/pc/Footer.vue";
import Header from "/@/components/pc/Header.vue";
import Menu from "/@/components/pc/Menu.vue";
import load from "/@/components/pc/loading.vue";
import TopIM from "/@/components/pc/TopIM.vue";
import Drawer from "/@/components/pc/Drawer.vue";
import Wangeditor from "/@/components/pc/Wangeditor.vue";
import Modal from "/@/components/pc/Modal.vue";



// 引入公共js文件
import utils from "/@/assets/js/public/function";
// 引入axios钩子
import axios from "/@/hooks/axios.ts";
// api 接口文件
import { putmessage, getMessgetList } from "/@/api/pc/about.ts";

import { common, userinfo } from "/@/hooks/common.ts";
export default {
    name: "about",
    /**
     * @name: 使用组件
     * @author: camellia
     * @email: guanchao_gc@qq.com
     * @date: 2021-02-25 
     */
    components: {
        Footer,
        Header,
        Menu,
        load,
        TopIM,
        Drawer,
        Modal,
        Wangeditor,
    },
    // VUE3 语法 第一个执行的钩子函数
    // setup官方文档 ：https://www.vue3js.cn/docs/zh/guide/composition-api-setup.html#参数
    setup(props: any, content: any) {
        /**
         * @name: 实例化路由
         * @author: camellia
         * @email: guanchao_gc@qq.com
         * @date: 2021-01-10 
         */
        var router = useRouter();
        
        const data = reactive({
            // 菜单栏关闭标识
            showRef: 0,
            // loading显示标识
            loading:true,
            // 留言列表
            messageList:[],
            // modal显示标识
            modalShow: false,
            // modal标题
            modalTitle: '留言',
            // 回复评论的主键id
            replyid: '',
            // 回复评论内容
            comment_content_replay: '',
            // 邮箱
            email: '',
            // 是否登录标识
            loginSign: userinfo.email ? true : false,

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
         * @name: 提交回复(点击模态框确定或者取消)
         * @author: camellia
         * @email: guanchao_gc@qq.com
         * @date: 2021-01-26 
         * @param:	sign	boolean	点击确定传true，点击取消传false
         */
        const confirmModal = (sign: boolean) => {
            if (!sign) {
                data.modalShow = false; return;
            }
            if (data.comment_content_replay == '') {
                utils.alertMsg(2000, '请输入留言内容！'); return;
            }
            // 开启自定义loading（返回一个html节点）
            utils.alertLoadExec(true);
            let param = {
                email: data.email,
                content_reply: data.comment_content_replay,
                replyid: data.replyid,
            };
            try {
                putmessage(param).then(function (response: any) 
                {
                    if (response.code == 1) {
                        data.modalShow = false;
                    }
                    // 关闭自定义loading（需要将创建时的节点传入）
                    utils.alertLoadExec(false);
                    utils.alertMsg(2000, response.msg);
                    data.comment_content_replay = '';
                });
            } catch (error) {
                utils.alertLoadExec(false);
                utils.alertMsg(2000, '系统错误');
            }
            
            /*axios.get('/index.php/about/putmessage', { params: param })
                .then(function (response: any) {
                    if (response.data.code == 1) {
                        data.modalShow = false;
                    }
                    // 关闭自定义loading（需要将创建时的节点传入）
                    utils.alertLoadExec(false);
                    utils.alertMsg(2000, response.data.msg);
                    data.comment_content_replay = '';
                })
                .catch(function (error: any) {
                    utils.alertLoadExec(false);
                });//*/
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
         * @name: 打开模态框
         * @author: camellia
         * @email: guanchao_gc@qq.com
         * @date: 2021-01-26 
         */
        const openModal = (title:string,replyid: string = '') => {
            data.modalTitle = title;
            data.modalShow = true;
            data.replyid = replyid;
        }
        /**
         * @name: 去我的简历页
         * @author: camellia
         * @email: guanchao_gc@qq.com
         * @date: 2021-01-27 
         */
        const goToMyResume = () => {
            router.push('/pc/resume');
        }
        /**
         * @name: 获取留言列表数据
         * @author: camellia
         * @email: guanchao_gc@qq.com
         * @date: 2021-01-06 
         */
        const getData = () => {
            //  http://www.axios-js.com/zh-cn/docs/
            data.loading = true;
            try {
                getMessgetList({}).then(function (response: any) {
                    console.log(response);
                    data.messageList = response.messageList;
                    data.loading = false;
                    // 回到滚动条刷新前位置
                    utils.goToScrollTop();
                });
            } catch (error) {
                utils.alertLoadExec(false);
                utils.alertMsg(2000, '系统错误');
            }
            /*axios.get('/index.php/about/getMessgetList', {})
                .then(function (response: any) {
                    console.log(response);
                    data.messageList = response.data.messageList;
                    data.loading = false;
                    // 回到滚动条刷新前位置
                    utils.goToScrollTop();
                })
                .catch(function (error: any) { });//*/
        }

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
        const showMenuByChild = (param: number) => {
            data.showRef = param;
        }
        // ===================================================================

        getData();

        /**
         * @name: 将data绑定值dataRef
         * @author: camellia
         * @email: guanchao_gc@qq.com
         * @date: 2021-01-10 
         */
        const dataRef = toRefs(data);
        return {
            showMenuByChild, goToMyResume, openModal, getWangEditorReplayValue, confirmModal,
            closeMenu, getData,
            ...dataRef
        }
    },
    methods: {

    }
};

