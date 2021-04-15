// 官方文档
// https://github.com/vitejs/vite/blob/master/src/node/config.ts
import { resolve } from "path";

function pathResolve(dir: string) 
{
  return resolve(__dirname, ".", dir);
}

module.exports = {
  alias: {
    "/@/": pathResolve("src"),
  },
  optimizeDeps: {
    // include: ["@ant-design/icons-vue"],
  },
  // 端口
  port: 3005,
  // 压缩(使用esbuild，打包之后的代码360浏览器运行报错)
  minify: 'terser',
  // 是否自动在浏览器打开
  open: false,
  // 是否开启 https
  https: false,
  // 服务端渲染
  ssr: false,
  // 反向代理
  proxy: {
    // 模块标识
    '/index.php': {
      // 请求连接
      target: 'https://guanchao.site',
      // 是否允许跨域
      changeOrigin: true,
      // 路由重写，将api/ 重写为空
      // rewrite: path => path.replace(/^\/api/, '')
    },
  },
};