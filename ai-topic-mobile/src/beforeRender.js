/*
 * @Author: shantenghui
 * @Date: 2023-08-02 19:45:58
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2024-02-27 15:49:07
 */
import { Toast } from '@atom/atom-ui';
import '@atom/b2c-tokens/dist/variables.css';

import fl from '@king-fisher/falcon';
import VueI18n from 'vue-i18n';
import en from '@/config/locales/en.js';
import zh from '@/config/locales/zh.js';

const largeScreenAdaptation = () => {
  const largeScreenWidth = 480;
  // 大屏适配
  if (window.innerWidth > largeScreenWidth) {
    document.documentElement.style.fontSize = '100px';
    document.documentElement.dataset.largeScreen = true;
  }
};

export default Vue => {
  largeScreenAdaptation();
  Vue.use(VueI18n);
  // 使用 falcon 获取应用当前语言，指定给 i18n，获取不到时默认使用英文
  const chinese = 'zh';
  const canUseFalcon = 'Falcon' in window && window['Falcon'] && window['Falcon'] !== null;
  const locale = canUseFalcon ? fl?.getAppBaseInfo()?.language || chinese : chinese;
  const i18n = new VueI18n({
    locale,
    fallbackLocale: chinese,
    messages: {
      zh,
      en,
    },
  });
  window.i18n = i18n;

  Vue.use(Toast);

  // 注册全局过滤器
  // eslint-disable-next-line no-undef
  Object.keys(_t.Filters).forEach(key => Vue.filter(key, _t.Filters[key]));

  // 阻止启用生产信息
  Vue.config.productionTip = false;
};
