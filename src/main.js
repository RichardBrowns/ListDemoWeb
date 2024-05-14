import { createApp } from 'vue'
import App from './App.vue'
// 引入axios包
import axios from 'axios';
// 引入element-plus图形库
import ElementPlus from 'element-plus';
import * as ELIcons from '@element-plus/icons-vue';
import 'element-plus/dist/index.css';
//导入路由配置
import router from './router/index';

axios.defaults.baseURL = 'http://localhost:8080';

const app = createApp(App);
// 在创建的应用实例上挂载axios
app.config.globalProperties.$axios = axios;
// 注册Vue Router
app.use(router);
//全局注册Element Plus
app.use(ElementPlus);
//全局注册Element Plus 图标
for (const iconName in ELIcons){
    app.component(iconName, ELIcons[iconName]);
}
app.mount('#app');