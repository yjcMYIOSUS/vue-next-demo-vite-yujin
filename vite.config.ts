// 官方文档
// https://cn.vitejs.dev/config/#%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6%E8%A7%A3%E6%9E%90

import vue from '@vitejs/plugin-vue'
import path from 'path'
export default {
  plugins: [vue()],
  resolve: {
    alias: {
      '/@': path.resolve(__dirname, './src')
    }
  },
  server: {
    // 请求接口
    proxy: {
      // 选项写法
      '/index.php': {
        // 请求连接
        target: 'https://guanchao.site',
        // 是否允许跨域
        changeOrigin: true,
        // 路由重写，将api/ 重写为空
        // rewrite: path => path.replace(/^\/api/, '')
      }
    },
    // 运行端口
    port:3006,
    // https:true,

  },
  build:{
    // 打包压缩方式
    minify: 'terser',

  }

}