/*
 * @Author: shantenghui
 * @Date: 2023-08-23 14:39:48
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2024-01-17 16:05:50
 */
const commonLinks = [
  '<link rel="stylesheet" href="https://s.thsi.cn/hxapp/m/zixun/css/backWash_v4.5.css" />',
];
const commonScripts = [
  '<script src="//s.thsi.cn/cb?cd/weblog/0.0.1-alpha.28/weblog.js"></script>',
  '<script src="//s.thsi.cn/cb?cd/ths-frontend-common-lib-container/v1.3.16/common/;user.js;cookie.js;basic.js;bridge.js;zepto.js"></script>',
  '<script src="//s.thsi.cn/cb?cd/ths-frontend-common-lib-container/v1.3.16/business/;stat.js;thsIphoneXAdapter.js"></script>',
  '<script src="https://s.thsi.cn/hxapp/m/zixun/js/backWash_v4.5.js"></script>',
];
process.env.KINFISHER_MODE !== 'release' && commonScripts.push('<script src="//s.thsi.cn/js/m/eruda.js"></script>');
export default defineAppConfig({
  routes: [
    {
      // 页面对应的路由地址
      // 当 path 不为 '/', 且没配置 documentName, 则会取name字段的值(小写)作为路由
      // 详见：https://testfund.10jqka.com.cn/ifundapp_app/public/whw/kingfisher-temp/dist/#/usage/build-config#二web-配置
      path: '/',
      // 编译后的js文件名
      name: 'Index',
      // 页面组件地址
      source: './pages/Index/index.vue',
      // html模板相对于当前文件的地址
      documentPath: '../public/index.html',
      // 需要插入html中的的script内容
      scripts: commonScripts,
      // 需要插入html中的的link内容
      links: commonLinks,
      window: {
        title: 'kingfisher-demo',
      },
    },
  ],

  spaConfig: {
    documentPath: '../public/index.html',
    beforeRender: './beforeRender.js',
    mountScript: `
      import { createPinia, PiniaVuePlugin } from '@king-fisher/store';

      Vue.use(PiniaVuePlugin);

      new Vue({
        router,
        pinia: createPinia(),
        render(h){ return h(App) },
      }).$mount('#app');
    `,
  },
});
