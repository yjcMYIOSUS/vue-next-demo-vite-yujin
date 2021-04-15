import { useRouter } from "vue-router";
import {
  PropType,
  ref,
  watch,
  reactive,
  toRefs,
  inject,
  provide
} from "vue";
import { common,userinfo } from "/@/hooks/common.ts";
// 引入公共js文件
import utils from "/@/assets/js/public/function";
/**
 * @name: 定义返回的类型
 * @author: camellia
 * @email: guanchao_gc@qq.com
 * @date: 2021-01-10 15:15:53
 */
interface dataRef {
  showMenu: () => void;
  jumPage: (str: string)=>void;
  showSearch:()=>void;
  showLogin:() => void;
  goToOldVersion:() => void;
}
export default {
  name: "Menu",
  /**
   * @name: 父组件传递来的参数
   * @author: camellia
   * @email: guanchao_gc@qq.com
   * @date: 2021-01-10 
   */
  props: {
    show: {
      // type: Boolean as PropType<boolean>,// 布尔类型
      type: Number,// 数字类型
      default: 0, // 默认值是0
    },
  },
  // VUE3语法 setup函数
  // setup官方文档 ：https://www.vue3js.cn/docs/zh/guide/composition-api-setup.html#参数
  setup(props: any, content: any): dataRef {
    const router = useRouter();
    // let menuShow = inject('menuShow')
    /**
     * @name: 声明data
     * @author: camellia
     * @email: guanchao_gc@qq.com
     * @date: 2021-01-10 
     */
    const data = reactive({
      // 菜单显示标识
      menuShow: 0,
      // 是否登录标识
      is_login:userinfo.userid ? true : false,
      // 用户头像
      figureurl:'',
      // 登录框样式
      loginstyle: { },

    });
    /**
     * @name: 监听父组件传过来的值变化
     * @author: camellia
     * @email: guanchao_gc@qq.com
     * @date: 2021-01-10 
     */
    watch(
      () => props.show,
      (show: number) => {
        data.menuShow = props.show
      }
    );
    /**
     * @name: 监听登录状态
     * @author: camellia
     * @email: guanchao_gc@qq.com
     * @date: 2021-01-23 
     */
    watch(
      () => userinfo.userid,
      () => {
        data.is_login = userinfo.userid ? true : false;
        data.figureurl = userinfo.figureurl;
        data.loginstyle = { 'background': 'url("' + userinfo.figureurl + '") center center / 100%'}
      }
    );

    /**
     * @name: 展示菜单
     * @author: camellia
     * @email: guanchao_gc@qq.com
     * @date: 2021-01-10 
     */
    const showMenu = () => {
      data.menuShow = 1;
      // 子组件向父组件传值
      content.emit('showMenuByChild', data.menuShow);
      // 菜单显示标识（is_menu,is_search,is_login）
      common.menuSign = 'is_menu';
      utils.setLabelStyle('body', 'overflow-y: hidden;');
    };
    /**
     * @name: 显示搜索框
     * @author: camellia
     * @email: guanchao_gc@qq.com
     * @date: 2021-01-19 
     */
    const showSearch = () => {
      data.menuShow = 1;
      // 子组件向父组件传值
      content.emit('showMenuByChild', data.menuShow);
      // 菜单显示标识（is_menu,is_search,is_login）
      common.menuSign = 'is_search';
      utils.setLabelStyle('body', 'overflow-y: hidden;');
    }
    /**
     * @name: 显示登录框
     * @author: camellia
     * @email: guanchao_gc@qq.com
     * @date: 2021-01-19 
     */
    const showLogin = () => {
      data.menuShow = 1;
      // 子组件向父组件传值
      content.emit('showMenuByChild', data.menuShow);
      // 菜单显示标识（is_menu,is_search,is_login）
      common.menuSign = 'is_login';
      // 获取当前连接
      common.currectUrl = window.location.href;
      utils.setLabelStyle('body', 'overflow-y: hidden;');
    }
    /**
     * @name: 跳页
     * @author: camellia
     * @email: guanchao_gc@qq.com
     * @date: 2021-01-10 
     */
    const jumPage = (str: string) => {
      router.push(str);
    };

    /**
     * @name: 去旧版
     * @author: camellia
     * @email: guanchao_gc@qq.com
     * @date: 2021-01-21 
     */
    const goToOldVersion = () => {
      window.open('https://l.guanchao.site');
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
      showMenu, showSearch, showLogin, goToOldVersion,
      ...dataRef
    }
  },

  methods: {},
};