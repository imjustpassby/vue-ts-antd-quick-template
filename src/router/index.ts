import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
Vue.use(VueRouter);
const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/my',
    name: 'my',
    component: () => import('@/views/My.vue')
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404.vue')
  }
];

const router = new VueRouter({
  routes,
  scrollBehavior: () => ({
    x: 0,
    y: 0
  })
});

export default router;
