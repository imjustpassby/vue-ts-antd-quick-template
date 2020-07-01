import { ErrorHandler } from 'vue-router/types/router';
import router from './index';
import store from '@/store';
import Vue from 'vue';
import VueRouter, { RawLocation, Route } from 'vue-router';
// 重写 router 的 push 方法，添加全局异常捕获
const originalPush = VueRouter.prototype.push;
import NProgress from 'nprogress';

VueRouter.prototype.push = function push(
  location: RawLocation,
  onComplete?: Function,
  onAbort?: ErrorHandler
) {
  if (onComplete || onAbort) {
    return originalPush.call(this, location, onComplete, onAbort);
  }
  return (
    originalPush
      .call(this, location)
      // @ts-ignore
      .catch((err: Error) => {
        // 不需要输出报错信息，请注释掉
        console.log(err);
        return err;
      })
  );
};

/* 
  需要登录才能访问的地址
*/
const needLoginPaths = ['/my'];

/**
 * 全局前置守卫
 * 参数或查询的改变并不会触发进入/离开的导航守卫
 */
router.beforeEach(
  (
    to: Route,
    from: Route,
    next: (to?: RawLocation | false | ((vm: Vue) => any) | void) => void
  ) => {
    NProgress.start();
    if (to.matched.length !== 0) {
      // 匹配到路由路径
      if (store.state.user.loginSuccess === 'true') {
        // 登录后正常导航
        next();
        NProgress.done();
      } else {
        if (needLoginPaths.includes(to.path)) {
          // 没登陆的处理逻辑
          Vue.prototype.$message.warning('请登录');
          NProgress.done();
        } else {
          next();
          NProgress.done();
        }
      }
    } else {
      // 路由不存在，跳转至404页面。
      next({ name: '404' });
      NProgress.done();
    }
  }
);

router.afterEach(() => {
  NProgress.done();
});
