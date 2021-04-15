import { useRouter } from "vue-router";
import {
  PropType,
  ref,
  watch,
  reactive,
  toRefs,
  inject,
  provide,
  onMounted
} from "vue";
import { common, webScoketObject, userinfo } from "/@/hooks/common.ts";
// 引入公共js文件
import utils from "/@/assets/js/public/function";
// 定义返回的类型
interface dataRef {
  close: () => void;
}
export default {
  name: "Drawer",
  // VUE3语法 setup函数
  // setup官方文档:https://www.vue3js.cn/docs/zh/guide/composition-api-setup.html#参数
  setup(props: any, content:any): dataRef 
  {
    const router = useRouter();
    /**
     * @name: 监听公共状态栏值变化(控制抽屉显示)
     * @author: camellia
     * @email: guanchao_gc@qq.com
     * @date: 2021-01-10 
     */
    watch(
      () => common.drawerShow,
      () => {
        data.drawerShow = common.drawerShow;       
      }
    );
    /**
     * @name: 声明data
     * @author: camellia
     * @email: guanchao_gc@qq.com
     * @date: 2021-01-10 
     */
    const data = reactive({
      drawerShow: common.drawerShow,
      scoketObject: new WebSocket('wss://guanchao.site/websocket/'),
    });

    // 初始化客户端套接字并建立连接
    // var sock = new WebSocket("wss://guanchao.site/websocket/");
    // var sock = new WebSocket("wss://l.guanchao.site/websocket");
    // var sock = new WebSocket("ws://111.231.162.140:9502");
    // 清除定时器(销毁之前链接的webscoket)
    clearInterval(webScoketObject.timer);
    // 连接建立时触发
    data.scoketObject.onopen = (event: any) => {
      console.log("Connection open ...");
      webScoketObject.timer = window.setInterval(function () { //每隔5秒钟发送一次心跳，避免websocket连接因超时而自动断开
        console.log('每隔10秒钟发送一次心跳');
        var ping = { "type": "ping","user_id":userinfo.userid };
        try {
          data.scoketObject.send(JSON.stringify(ping));
        } catch (error) {
          clearInterval(webScoketObject.timer);
        }
      }, 5000);
    }
    // 接收到服务端推送时执行
    data.scoketObject.onmessage = (event: any) => {
      var msg = event.data;
      // console.log(event);
      console.log(msg);
      console.log("webscoket 接收到返回消息！");
    };
    // 连接关闭时触发
    data.scoketObject.onclose = (event: any) => {
      console.log("Connection closed ...");
    };
    // 出错时触发
    data.scoketObject.onerror = (event: any) => {
      webScoketObject.timer = 0;
      console.log('Error occured: ' + event.data);
    };

    
    // 发送消息给webscoket
    const sendMessage = () => {
      var data:any = {} ;
      data.msg = "你好啊~";
      data.id = 111;
      var str = JSON.stringify(data);
      console.log(str);
      // 将输入框变更信息通过 send 方法发送到服务器
      if (data.scoketObject.readyState === 1) 
      {
        data.scoketObject.send(str);
        console.log('消息发送---success!');
      } 
      else
      {
        console.log('消息发送---faild!');
      }  
    };//*/
    
    /**
     * @name: 关闭组件
     * @author: camellia
     * @email: guanchao_gc@qq.com
     * @date: 2021-01-10 
     */
    const close = () => {
      data.drawerShow = false;
      common.drawerShow = data.drawerShow;
      utils.setLabelStyle('body', '');
    }
    /**
     * @name: 将data绑定值dataRef
     * @author: camellia
     * @email: guanchao_gc@qq.com
     * @date: 2021-01-10 
     */
    const dataRef = toRefs(data);
    return {
      close,
      ...dataRef
    }
  },
}