// 引入路由
import { useRouter, useRoute } from "vue-router";
import {  
    PropType, 
    ref, 
    watch, 
    reactive, 
    toRefs, 
    inject,
    provide
} from "vue";
import { common, userinfo } from "/@/hooks/common.ts";
// 引入公共js文件
import utils from "/@/assets/js/public/function";
// 引入axios钩子
import axios from "/@/hooks/axios.ts";
// api 接口文件
import { accountLogin, layout, getFooterDataApi, updateNicknameApi, sendEmailCodeApi } from "/@/api/components/pc/Header.ts";
// 定义返回的类型
interface dataRef {
    closeMenu:() => void;
    jumPage: (str:string) => void;
    searchExec:() => void;
    switchLoginStatus: (str: string) => void;
    qqLogin:() => void;
    loginExec:() => void;
    sendEmailCode:() => void;
    logoutExec:() => void;
    updateNickname:() => void;
}
import Uploads from "/@/components/pc/Uploads.vue";
export default {
    name: "Header",
    components: {
        Uploads,
    },
    /**
     * @name: 父组件传递来的参数
     * @author: camellia
     * @email: guanchao_gc@qq.com
     * @date: 2021-01-10 
     */
    props: { 
        show: {
            type: Number,// 数字类型
            default: -1, // 默认值是0
        },
    },
    // VUE3语法 setup函数
    // setup官方文档：https://www.vue3js.cn/docs/zh/guide/composition-api-setup.html#参数
    setup(props: any, content: any): dataRef
    {
        const router = useRouter();
        /**
         * @name: 监听父组件传过来的值变化
         * @author: camellia
         * @email: guanchao_gc@qq.com
         * @date: 2021-01-10 
         */
        watch(
            () => props.show,
            () => {
                data.menuShow = props.show
            }
        );
        
        /**
         * @name: 监听菜单实现状态变化
         * @author: camellia
         * @email: guanchao_gc@qq.com
         * @date: 2021-01-19 
         */
        watch(
            () => common.menuSign,
            () => {
                data.menuSign = common.menuSign;
            }
        );
        
        /**
         * @name: 监听搜索值变化
         * @author: camellia
         * @email: guanchao_gc@qq.com
         * @date: 2021-01-19 
         */
        watch(
            () => common.search,
            () => {
                data.search = common.search;
            }
        );
        
        /**
         * @name: 声明data
         * @author: camellia
         * @email: guanchao_gc@qq.com
         * @date: 2021-01-10 
         */
        const data = reactive({
            // 菜单显示标识
            menuShow:0,
            // 菜单显示状态
            menuSign: common.menuSign,
            // 搜索字符串
            search: common.search,
            // 登录框状态
            is_login:'login',
            // 登录按钮显示文字
            buttonMsg:'登&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;录',
            // 邮箱账号
            email:'',
            // 密码
            password:'',
            // 邮箱验证码
            emailCode:'',
            // 登录标识
            loginSign: userinfo.userid ? true : false,
            // 邮箱验证码发送按钮
            emailButton:false,
            // 用户昵称
            nickname: '',
            // 用户头像信息数组
            userLogoInfo:[],
            // 发送验证码按钮显示
            sendCodeButton:'发送验证码',
        });
        /**
         * @name: 监听登录状态
         * @author: camellia
         * @email: guanchao_gc@qq.com
         * @date: 2021-01-23 
         */
        watch(
            () => userinfo.userid,
            () => {
                data.loginSign = userinfo.userid ? true : false;
                data.nickname = userinfo.nickname;

                data.userLogoInfo = [];
                // 组装图片信息
                var array = userinfo.figureurl.split('/');
                var filename = array[array.length - 1];
                var arr = filename.split('.');
                var ext = arr[arr.length - 1];
                var fileinfo = {
                    'url': userinfo.figureurl,
                    'type': ext,
                    'ext': ext,
                    'name': filename,
                };
                data.userLogoInfo.push(fileinfo);
            }
        );

        /**
         * @name: QQ登录
         * @author: camellia
         * @email: guanchao_gc@qq.com
         * @date: 2021-01-22 
         */
        const qqLogin = () => {
            window.location.assign('https://guanchao.site/index.php/user/qqlogin?now_url='+common.currectUrl);
        }

        /**
         * @name: 账号密码登录/注册/更改密码
         * @author: camellia
         * @email: guanchao_gc@qq.com
         * @date: 2021-01-22 
         */
        const loginExec = () => {
            // 文档 ：http://www.axios-js.com/zh-cn/docs/
            if (data.email == '' || data.password == '')
            {
                utils.alertMsg(3000,'参数错误！');return;
            }
            let info = {
                sign: data.is_login,
                email: data.email,
                password: data.password,
                emailCode: data.emailCode,
            };
            let param = utils.encryptCode(utils.createRouterParam(info));
            try {
                accountLogin(param).then(function (response: any) {
                    userinfo.userid = response.userid;
                    userinfo.figureurl = response.figureurl;
                    userinfo.nickname = response.nickname;
                    userinfo.email = response.email;
                    // 调用自定义alert弹窗
                    utils.alertMsg(2000, response.msg);
                });
            } catch (error) {
                utils.alertLoadExec(false);
                utils.alertMsg(2000, '系统错误!');
            }
            /*axios.post('/index.php/user/accountLogin', { params: param })
                .then(function (response: any) {
                    userinfo.userid = response.data.userid;
                    userinfo.figureurl = response.data.figureurl;
                    userinfo.nickname = response.data.nickname;
                    userinfo.email = response.data.email;
                    // 调用自定义alert弹窗
                    utils.alertMsg(2000,response.data.msg);
                })
                .catch(function (error: any) { });//*/
        }

        /**
         * @name: 退出登录
         * @author: camellia
         * @email: guanchao_gc@qq.com
         * @date: 2021-01-23 
         */
        const logoutExec = () => {
            data.email = '';
            data.password = '';
            data.emailCode = '';
            let param = { };
            layout(param).then(function (response: any) {
                userinfo.userid = '';
                userinfo.figureurl = '';
                userinfo.nickname = '';
                userinfo.email = '';
                utils.alertMsg(2000, '操作成功'); return;
            });
            /*axios.get('/index.php/user/layout', { params: param })
                .then(function (response: any) {
                    userinfo.userid = '';
                    userinfo.figureurl = '';
                    userinfo.nickname = '';
                    userinfo.email = '';
                    utils.alertMsg(2000,'操作成功'); return;
                })
                .catch(function (error: any) { });//*/
        }

        /**
         * @name: 发送邮箱验证码
         * @author: camellia
         * @email: guanchao_gc@qq.com
         * @date: 2021-01-22 
         */
        const sendEmailCode = () => {
            if (data.email == '')
            {
                utils.alertMsg(2000, '请填写邮箱！'); return;
            }
            data.emailButton = true;
            let info = {
                email: data.email,
            };
            let param = utils.encryptCode(utils.createRouterParam(info));
            /*try {
                sendEmailCodeApi(param).then(function (response: any) {
                    // 调用自定义alert弹窗
                    utils.alertMsg(2000, response.msg);
                    data.emailButton = { display: 'block' };
                });
            } 
            catch (error) 
            {
                utils.alertLoadExec(false);
                utils.alertMsg(2000, '系统错误!');
            }//*/
            axios.post('/index.php/user/sendEmailCode', { params: param })
                .then(function (response: any) {
                    // 调用自定义alert弹窗
                    utils.alertMsg(2000, response.data.msg);
                    let maxTime = 60;
                    data.sendCodeButton = "60秒后发送";
                    const timer = setInterval(() => {
                        console.log(111111111);
                        maxTime--;
                        data.sendCodeButton = maxTime + "秒后重新发送";
                        if (maxTime <= 0) {
                            clearInterval(timer);
                            data.sendCodeButton = "发送验证码";
                            data.emailButton = false ;
                        }
                    }, 1000);
                })
                .catch(function (error: any) {
                    console.log(11111);
                 });//*/

        }

        /**
         * @name: 切换登录框状态
         * @author: camellia
         * @email: guanchao_gc@qq.com
         * @date: 2021-01-21 
         */
        const switchLoginStatus = (str:string) => {
            if (str == 'register')
            {
                data.buttonMsg = "注&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;册";
                data.is_login = 'register';
            }
            else if (str == 'login')
            {
                data.buttonMsg = "账&nbsp;&nbsp;号&nbsp;&nbsp;登&nbsp;&nbsp;&nbsp;陆";
                data.is_login = 'login';
            }
            else if (str == 'password')
            {
                data.is_login = 'password';
                data.buttonMsg = "重&nbsp;&nbsp;置&nbsp;&nbsp;密&nbsp;&nbsp;码";
            }
        }

        /**
         * @name: 执行搜索
         * @author: camellia
         * @email: guanchao_gc@qq.com
         * @date: 2021-01-19 
         */
        const searchExec = () => {
            if (data.search == '')
            {
                alert("请输入您要搜索的内容！");return;
            }
            // 关闭导航页
            closeMenu();
            // 公共状态赋值
            common.search = data.search;
            router.push(
            {
                path: '/pc/articleList',
                query: {
                    search: data.search
                }
            });
        }
        /**
         * @name: 关闭导航页
         * @author: camellia
         * @email: guanchao_gc@qq.com
         * @date: 2021-01-10 
         */
        const closeMenu = () => {
            updateSession();
            data.menuShow = 0;
            // 子组件向父组件传值
            content.emit('closeMenu', data.menuShow);
            utils.setLabelStyle('body', '');
        };

        /**
         * @name: 更新session
         * @author: camellia
         * @email: guanchao_gc@qq.com
         * @date: 2021-01-06 
         */
        const updateSession = () => {
            //  http://www.axios-js.com/zh-cn/docs/
            getFooterDataApi({}).then(function (response: any) {
                // 更新用户信息
                userinfo.userid = response.userid;
                userinfo.nickname = response.nickname;
                userinfo.figureurl = response.figureurl;
                userinfo.email = response.email;
            });
            /*axios.get('/index.php/footer/getFooterData', {})
                .then(function (response: any) {
                    // 更新用户信息
                    userinfo.userid = response.data.userid;
                    userinfo.nickname = response.data.nickname;
                    userinfo.figureurl = response.data.figureurl;
                    userinfo.email = response.data.email;
                })
                .catch(function (error: any) { });//*/
        }

        /**
         * @name: 跳页
         * @author: camellia
         * @email: guanchao_gc@qq.com
         * @date: 2021-01-10 
         */
        const jumPage = (str:string,param:number = 0) => {
            utils.setLabelStyle('body', '');
            if (str == '/pc/articleList' && param != 0) 
            {
                // 参数加密
                let cate_id = utils.encryptCode({'cate_id': param});
                content.emit('closeMenu', 0, cate_id);
                common.loading = true;
                router.push({
                    path: str,
                    query:{
                        'cate_id': cate_id
                    }
                });
            }
            else
            {
                router.push(str);
            }
        };

        /**
         * @name: 修改昵称
         * @author: camellia
         * @email: guanchao_gc@qq.com
         * @date: 2021-02-23 
         */
        const updateNickname = () => {
            if (data.nickname == '') 
            {
                utils.alertMsg(2000, '昵称不能为空！'); return;
            }
            try {
                updateNicknameApi({ nickname: data.nickname }).then(function (response: any) {
                    userinfo.nickname = data.nickname;
                    // 调用自定义alert弹窗
                    utils.alertMsg(2000, response.msg);
                });
            } catch (error) {
                utils.alertLoadExec(false);
                utils.alertMsg(2000, '系统错误!');
            }
            /*axios.post('/index.php/user/updateNickname', { nickname: data.nickname })
                .then(function (response: any) {
                    userinfo.nickname = data.nickname;
                    // 调用自定义alert弹窗
                    utils.alertMsg(2000, response.data.msg);
                })
                .catch(function (error: any) { });//*/
        }

        /**
         * @name: 将data绑定值dataRef
         * @author: camellia
         * @email: guanchao_gc@qq.com
         * @date: 2021-01-10 
         */ 
        const dataRef = toRefs(data);
        return {
            jumPage,
            closeMenu, searchExec, switchLoginStatus, qqLogin, loginExec, sendEmailCode, logoutExec, updateNickname,
            ...dataRef
        }
    },
};