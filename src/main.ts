import './router/permission.ts';
import '@/assets/style/index.less';
import '@/utils/antd/components-ant.ts';
import 'nprogress/nprogress.css';
import App from './App.vue';
import router from './router';
import store from './store';
import Vue from 'vue';

Vue.config.productionTip = false;
Vue.config.devtools = process.env.NODE_ENV === 'development'; // 生产环境下不允许使用 devtools

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
