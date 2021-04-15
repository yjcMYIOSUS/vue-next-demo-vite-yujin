import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
// 公共状态文件
import { common } from "/@/hooks/common.ts";
// 引入公共函数js文件
import utils from "/@/assets/js/public/function";


// 默认请求连接
// axios.defaults.baseURL = "http://xxxx.xxx.xxxx/index.php";

// 超时时间（ms）
axios.defaults.timeout = 2000 * 1000;
// axios请求开启cookie，支持跨域请求携带cookie
axios.defaults.withCredentials = true;
// axios 请求头
axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.headers['token'] = localStorage.getItem('token') || ''
axios.defaults.headers.post['Content-Type'] = 'application/json'

// 请求拦截
axios.interceptors.request.use(
  (config: AxiosRequestConfig) => { 
    // 可在这里做一些数据的校验。
    // session的校验等。
    return config 
  },
  (error: AxiosError) => { 
    return error 
  }
)

// 响应拦截
axios.interceptors.response.use((result: AxiosResponse) => {
  // ===========================================================
  // 返回方式一
  /*console.log(result);
  if (result.status === 200) {
    if (result.data && result.data.code > 0) {
      return Promise.resolve(result);
    } else {
      alert(result.data.msg || "操作失败");
      return Promise.reject(result);
    }
  } else {
    alert("网络异常");
    return Promise.reject(result);
  }//*/

  // ==========================================================
  // 返回方式二
  // 返回数据前做了什么
  // console.log(result);
  if (result.data.code < -100) 
  {
    if (result.data.msg)
    {
      // 调用自定义alert
      utils.alert(result.data.msg, function () {
        window.location.assign('/pc/index');
      });
    }
    return Promise.reject(result.data.data)
  }
  return result;
}, (err: AxiosError) => {
  utils.alertLoadExec(false);
  // 返回数据前做了什么
  return Promise.reject(err)
})
export default axios