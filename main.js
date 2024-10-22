// #ifndef VUE3  
import Vue from 'vue'  
import App from './App'  
import ECharts from 'vue-echarts'; // 根据你使用的版本进行调整  
import 'echarts/lib/chart/line'; // 导入需要的图表类型  
import 'echarts/lib/component/title'; // 导入需要的组件  
import 'echarts/lib/component/tooltip';  

Vue.component('v-chart', ECharts);  
Vue.config.productionTip = false  

App.mpType = 'app'  

const app = new Vue({  
    ...App  
})  
app.$mount()  
// #endif  

// #ifdef VUE3  
import { createSSRApp } from 'vue'  
import App from './App.vue'  
import ECharts from 'vue-echarts'; // 根据你使用的版本进行调整  
import 'echarts/lib/chart/line'; // 导入需要的图表类型  
import 'echarts/lib/component/title'; // 导入需要的组件  
import 'echarts/lib/component/tooltip';  

// 使用 app.component 来注册全局组件  
export function createApp() {  
  const app = createSSRApp(App);  
  app.component('v-chart', ECharts); // 注册 ECharts 组件  
  return {  
    app  
  };  
}  
// #endif