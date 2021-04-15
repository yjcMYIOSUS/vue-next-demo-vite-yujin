import { useRouter } from "vue-router";
import {
  watch,
  reactive,
  toRefs,
} from "vue";
import { common } from "/@/hooks/common.ts";
// 引入公共js文件
import utils from "/@/assets/js/public/function";
// 定义返回的类型
interface dataRef {
  bigImg: () => void;
}
export default {
  name: "BigImg",
  /**
   * @name: 父组件传递来的参数
   * @author: camellia
   * @email: guanchao_gc@qq.com
   * @date: 2021-01-10 
   */
  props: {
    imgSrc: {
      type: String,
      default: '', 
    },
  },
  // VUE3语法 setup函数
  // setup官方文档:https://www.vue3js.cn/docs/zh/guide/composition-api-setup.html#参数
  setup(props: any, content:any): dataRef 
  {
    /**
     * @name: 声明data
     * @author: camellia
     * @email: guanchao_gc@qq.com
     * @date: 2021-01-10 
     */
    const data = reactive({
    });

    /**
     * @name: 大图
     * @author: camellia
     * @email: guanchao_gc@qq.com
     * @date: 2021-01-22 
     */
    const bigImg = () => {
      common.bigImgShow = false;
      content.emit('closeBigImg', common.bigImgShow);
    }
  
    /**
     * @name: 将data绑定值dataRef
     * @author: camellia
     * @email: guanchao_gc@qq.com
     * @date: 2021-01-10 
     */
    const dataRef = toRefs(data);
    return {
      bigImg,
      ...dataRef
    }
  },
}