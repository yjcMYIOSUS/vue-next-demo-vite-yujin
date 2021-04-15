import {
  PropType,
  ref,
  watch,
  computed,
  reactive,
  toRefs,
  inject,
  provide,
  onMounted
} from "vue";
// 引入公共js文件
import utils from "/@/assets/js/public/function";
// 定义返回的类型
interface dataRef {
  btnClick: (val:number) => void;
  pageClick: () => void;
  changePage: () => void;
}
export default {
  name: "Pagination",
  props: {
    // 总页数
    'dataAll': {
      type: Number,
      default: 100,
      required: true
    },
    // 当前页数
    'dataCur': {
      type: Number,
      default: 1,
      required: true
    },
    // 页面条数
    'datanum': {
      type: Number,
      default: 7
    },
    // 数据总量
    'dataDatanum': {
      type: Number,
      default: 456
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
    const data:any = reactive({
      all: props.dataAll, //总页数
      cur: Number(props.dataCur),//当前页码
      num: props.datanum, //一页显示的数量  奇数
      dataNum: props.dataDatanum,//数据的数量
      jumpPage:0,// 跳转页码
      indexs:computed(()=>{
        var left = 1;
        var right = data.all;
        var ar = [];
        if (data.all >= data.num) 
        {
          if (data.cur > 3 && data.cur < data.all - 2) 
          {
            left = data.cur - (data.num - 1) / 2;
            right = Number(data.cur) + Number((data.num - 1) / 2);
          } 
          else 
          {
            if (data.cur <= 3) 
            {
              left = 1
              right = data.num
            } 
            else 
            {
              right = data.all
              left = data.all - (data.num - 1);
            }
          }
        }
        while (left <= right) 
        {
          ar.push(left)
          left++
        }
        return ar
      })
    });

    /**
     * @name: 页码点击事件
     * @author: camellia
     * @email: guanchao_gc@qq.com
     * @date: 2021-01-11 
     */
    const btnClick = (val:Number) => { 
      if (val != data.cur) 
      {
        data.cur = val
        content.emit('changePage', data.cur);
      }
    };
    /**
     * @name: 点击上一页下一页
     * @author: camellia
     * @email: guanchao_gc@qq.com
     * @date: 2021-01-11 
     */
    const pageClick = () => {
      //父组件通过changePage方法来接受当前的页码
      //这里是点击下一页执行函数
      content.emit('changePage', data.cur)
    }

    /**
     * @name: 跳至 xxx 页
     * @author: camellia
     * @email: guanchao_gc@qq.com
     * @date: 2021-01-13 
     */
    const changePage = () => {
      if (data.jumpPage > data.all || data.jumpPage < 1 || isNaN(data.jumpPage) )
      {
        utils.alertMsg(2000,"参数错误！");return;
      }
      content.emit('changePage', Number(data.jumpPage))
    }

    /**
     * @name: 将data绑定值dataRef
     * @author: camellia
     * @email: guanchao_gc@qq.com
     * @date: 2021-01-10 
     */
    const dataRef = toRefs(data);
    return {
      btnClick,
      pageClick,
      changePage,
      ...dataRef
    }
  },
}