// @document https://babeljs.io/docs/en/configuration

module.exports = {
  presets: ['@vue/cli-plugin-babel/preset'],
  // atom-ui 处理
  // 详见：https://testm.10jqka.com.cn/basic/atom-ui/docs/#/zh-CN/quickstart#di-er-bu-pei-zhi-babel.config.js
  plugins: [
    [
      'import',
      {
        libraryName: '@atom/atom-ui',
        libraryDirectory: 'es',
        style: true,
      },
      '@atom/atom-ui',
    ],
  ],
};
