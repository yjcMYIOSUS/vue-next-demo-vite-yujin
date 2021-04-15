import {
  PropType,
  ref,
  watch,
  reactive,
  toRefs,
  provide,
  inject
} from "vue";
import { useRouter } from "vue-router";
// 引入公共js文件
import utils from "/@/assets/js/public/function";
// 引入axios钩子
import axios from "/@/hooks/axios.ts";
// 引入公共状态文件
import { common, userinfo } from "/@/hooks/common.ts";
// api 接口文件
import { getFooterDataApi } from "/@/api/components/pc/Footer.ts";

export default {
  name: "Footer",
  props: {},
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
      // 文章数量
      articleNum: 0,
      // 留言数量
      messageNum: 0,
      // 用户数量
      userNum: 0,
      // 访客数量
      visitNum: 0,
      // 用户数量
      days: 0,
      // 友情链接列表
      friendLinklist: []
    });

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
     * @name: 去友情链接页
     * @author: camellia
     * @email: guanchao_gc@qq.com
     * @date: 2021-01-26 
     */
    const goToFrienLink = () => {
      router.push('/pc/friendlink');
    }

    /**
     * @name: 获取底部显示数据
     * @author: camellia
     * @email: guanchao_gc@qq.com
     * @date: 2021-01-06 
     */
    const getFooterData = () => {
      //  http://www.axios-js.com/zh-cn/docs/
      getFooterDataApi({}).then(function (response: any) {
        data.articleNum = response.article;
        data.messageNum = response.message;
        data.userNum = response.user;
        data.visitNum = response.visit;
        data.days = response.days;
        data.friendLinklist = response.friendLinklist;
        // 更新用户信息
        userinfo.userid = response.userid;
        userinfo.nickname = response.nickname;
        userinfo.figureurl = response.figureurl;
        userinfo.email = response.email;
      });
      /*axios.get('/index.php/footer/getFooterData', {})
        .then(function (response: any) {
          data.articleNum = response.data.article;
          data.messageNum = response.data.message;
          data.userNum = response.data.user;
          data.visitNum = response.data.visit;
          data.days = response.data.days;
          data.friendLinklist = response.data.friendLinklist;
          // 更新用户信息
          userinfo.userid = response.data.userid;
          userinfo.nickname = response.data.nickname;
          userinfo.figureurl = response.data.figureurl;
          userinfo.email = response.data.email;
        })
        .catch(function (error: any) { });//*/
    }
    /**
     * @name: 跳转备案网站
     * @author: camellia
     * @email: guanchao_gc@qq.com
     * @date: 2021-01-10 
     */
    const jumpToGov = () => {
      window.open('https://beian.miit.gov.cn/');
    }
    // ===================================================================
    // 初始调用
    getFooterData();

    /**
     * @name: 将data绑定值dataRef
     * @author: camellia
     * @email: guanchao_gc@qq.com
     * @date: 2021-01-10 
     */
    const dataRef = toRefs(data);
    return {
      jumpToGov,
      goToFrienLink,
      jumpFriendLink,
      ...dataRef
    }
  },
};