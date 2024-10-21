import { defineConfig } from 'vite';
import uni from '@dcloudio/vite-plugin-uni';
 
export default defineConfig({
  plugins: [uni()],
  server: {
    host: "localhost", // 指定服务器应该监听哪个IP地址,默认：localhost
    port: 5173,        // 指定开发服务器端口,默认：5173,端口号自己改
    proxy: {           // 为开发服务器配置自定义代理规则
       // 这个代理路径名称/wxapi自行修改，如/proapi
      "/api": {
        target: "http://www.poetryworld.cn:8198", // 目标接口，请求的根地址拿过来
        changeOrigin: true,            // 是否换源
        rewrite: (path) => path.replace(/^\/api/, ""),
      }
    }
  }
});