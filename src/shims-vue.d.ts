declare module '*.vue' {
  import Vue from 'vue';
  export default Vue;
}

declare module 'ant-design-vue' {
  const antd: any;
  export default antd;
}

declare module 'nprogress' {
  const NProgress: any;
  export default NProgress;
}
