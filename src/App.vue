<template>
    <router-view />
</template>

<script lang="ts">
import { onMounted,nextTick } from "vue";
// 引入公共js文件
import utils from "/@/assets/js/public/function";
// 引入路由对象
import { useRouter } from "vue-router";
// 使用js对象
export default {
  name: "App",
  setup(props: any, content: any){
    // 实例化路由
    let router = useRouter();
    // 判断手机端/pc端，跳路由
    let result = utils.IsPC();
    // 获取当前访问路由(不带参数)
    let pathname = utils.getUrlPath();
    // 获取当前访问路由参数
    let params = utils.getUrlParams();
    // 组装一下
    let routerPath = pathname + "?" + params;
    // console.log(pathname);
    // console.log(routerPath);
    // console.log(window.location.hash);

    if(result)
    {
      if(pathname == '/')
      {
        router.push('/pc/index');
        // router.push(window.location.hash);
      }
      else
      {
        router.push(routerPath);
        // router.push(window.location.hash.replace('#',''));
      }
    }
    else
    {
      if(pathname == '#/')
      {
        router.push('/phone');
      }
      else
      {
        router.push(routerPath);
      }
    }    
    
    
  },//*/
};
</script>


