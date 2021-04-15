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
import { common } from "/@/hooks/common.ts";
// 引入公共js文件
import utils from "/@/assets/js/public/function";
/**
 * @name: 定义返回的类型
 * @author: camellia
 * @email: guanchao_gc@qq.com
 * @date: 2021-01-10 
 */
interface dataRef {
  goto: () => void;
  showDrawer: () => void;
}
export default {
  name: "Menu",
  // VUE3语法 setup函数
  // setup官方文档 : https://www.vue3js.cn/docs/zh/guide/composition-api-setup.html#参数
  setup(props: any, content: any): dataRef 
  {
    const router = useRouter();
    /**
     * @name: 声明data
     * @author: camellia
     * @email: guanchao_gc@qq.com
     * @date: 2021-01-10 
     */
    const data = reactive({
      topShow: common.topShow,
    });
    const showDrawer = () => {
      common.drawerShow = true;
      utils.setLabelStyle('body','overflow-y: hidden;');
    }
    /**
     * @name: 是否显示回到顶部图标
     * @author: camellia
     * @email: guanchao_gc@qq.com
     * @date: 2021-01-10 
     */
    window.onscroll = function () 
    {
      //获取页面的可视窗口高度
      var client_height = (document.documentElement.clientHeight || document.body.clientHeight) / 5;
      //在滚动的时候增加判断,忘了的话很容易出错
      var osTop = document.documentElement.scrollTop || document.body.scrollTop;

      // 将滚动条位置的值存入cookie
      utils.setCookie("scrollTop_val", osTop);

      if (osTop >= client_height) 
      {
        data.topShow = true;
      }
      else 
      {
        data.topShow = false
      }
    }
    /**
     * @name: 回顶部
     * @author: camellia
     * @email: guanchao_gc@qq.com
     * @date: 2021-01-10 
     */
    const goto = () => 
    {
      // 设置定时器
      let timer = setInterval(function () {
        var osTop = document.documentElement.scrollTop || document.body.scrollTop;
        //减小的速度
        var isSpeed = Math.floor(-osTop / 6);
        document.documentElement.scrollTop = document.body.scrollTop = osTop + isSpeed;
        //判断，然后清除定时器
        if (osTop == 0) {
          clearInterval(timer);
        }
        data.topShow = false;//添加在obtn.onclick事件的timer中    
      }, 30);
    };
    /**
     * @name: 将data绑定值dataRef
     * @author: camellia
     * @email: guanchao_gc@qq.com
     * @date: 2021-01-10 
     */
    const dataRef = toRefs(data);
    return {
      goto,
      showDrawer,
      ...dataRef
    }
  },

  methods: {},
};