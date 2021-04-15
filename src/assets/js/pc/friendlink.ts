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
import Modal from "/@/components/pc/Modal.vue";
// 引入公共js文件
import utils from "/@/assets/js/public/function";
// 引入axios钩子
import axios from "/@/hooks/axios.ts";
// api 接口文件
import { applyFriendLink, getFriendLinkList } from "/@/api/pc/friendlink.ts";
export default {
    name: "other",
    components: {
        Footer,
        Header,
        Menu,
        load,
        TopIM,
        Drawer,
        Modal,
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
            // 菜单是否显示
            showRef: 0,
            // load加载
            loading: true,
            // 友情链接列表
            friendLinkList: [],
            // modal显示标识
            modalShow:false,
            // modal标题
            modalTitle:'申请友链',
            // 友情链接名称
            friendname: '',
            // 友情链接url
            friendlink: '',
            // 友情链接logo url
            friendlogo: '',
        });

        /**
         * @name: 打开模态框
         * @author: camellia
         * @email: guanchao_gc@qq.com
         * @date: 2021-01-26 
         */
        const openModal = () => {
            data.modalShow = true;
        }

        /**
         * @name: 点击模态框确定或者取消
         * @author: camellia
         * @email: guanchao_gc@qq.com
         * @date: 2021-01-26 
         * @param:	sign	boolean	点击确定传true，点击取消传false
         */
        const confirmModal = (sign:boolean) => {
            if (!sign)
            {
                data.modalShow = false;return;
            }
            if (!data.friendlink)
            {
                // 调用自定义alert弹窗
                utils.alertMsg(2000, '请输入友情链接url!');return;
            }
            else if (!data.friendlogo)
            {
                // 调用自定义alert弹窗
                utils.alertMsg(2000, '请输入友情icon链接!'); return;
            }
            else if (!data.friendname)
            {
                // 调用自定义alert弹窗
                utils.alertMsg(2000, '请输入友情链接名称!'); return;
            }
            // 开启自定义loading（返回一个html节点）
            utils.alertLoadExec(true);
            let info = {
                friendlink: data.friendlink,
                logo: data.friendlogo,
                friendname: data.friendname,
            };
            let param = utils.encryptCode(utils.createRouterParam(info));
            try {
                applyFriendLink(param).then(function (response: any) {
                    // 关闭自定义loading（需要将创建时的节点传入）
                    utils.alertLoadExec(false);
                    utils.alertMsg(2000, response.data.msg);
                    data.modalShow = false;
                });
            } catch (error) {
                utils.alertLoadExec(false);
                utils.alertMsg(2000, '系统错误');
            }
            /*axios.post('/index.php/friendlink/applyFriendLink', { params: param })
                .then(function (response: any) {
                    // 关闭自定义loading（需要将创建时的节点传入）
                    utils.alertLoadExec(false);
                    utils.alertMsg(2000, response.data.msg);
                    data.modalShow = false;
                })
                .catch(function (error: any) {
                    // 关闭自定义loading（需要将创建时的节点传入）
                    utils.alertLoadExec(false);
                 });//*/
        }

        /**
         * @name: 友情链接跳页
         * @author: camellia
         * @email: guanchao_gc@qq.com
         * @date: 2021-01-26 
         * @param:	str	string	链接
         */
        const jumpFriendLink = (str: string) => {
            window.open(str);
        }

        /**
         * @name: 去列表页
         * @author: camellia
         * @email: guanchao_gc@qq.com
         * @date: 2021-01-18 
         */
        const goToList = (label_id: number) => {
            router.push({
                path: '/pc/articleList',
                query: {
                    label_id: utils.encryptCode({ 'label_id': label_id })
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
            try {
                getFriendLinkList({}).then(function (response: any) {
                    data.friendLinkList = response.friendLinkList;
                    data.loading = false;
                    // 回到滚动条刷新前位置
                    utils.goToScrollTop();
                });
            } catch (error) {
                utils.alertMsg(2000, '系统错误');
            }
            /*axios.get('/index.php/friendlink/getFriendLinkList', {})
                .then(function (response: any) {
                    data.friendLinkList = response.data.friendLinkList;
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
            goToList, jumpFriendLink, openModal, confirmModal,
            ...dataRef
        }
    }
};

