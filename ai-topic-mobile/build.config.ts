import { join } from 'path';
import webpack from 'webpack';

function resolve(dir) {
  return join(__dirname, dir);
}

// @note 目前修改配置后需要重新run start
// @document https://testfund.10jqka.com.cn/public/whw/kingfisher-temp/dist/#/usage/build-config
export default defineBuildConfig({
  publicPath: process.env.VUE_APP_BASE_URL,

  // @config 不同环境将构建引用不同的产物
  importOnDemand: [
    {
      // tsconfig配置别名以获取提示，还需要设置alias
      libraryName: 'importTest',
      // {buildTarget}占位符，会编译成hummer/web，不设置libraryDirectory默认为lib/{buildTarget}
      libraryDirectory: '{buildTarget}',
    },
  ],

  // @config webpack链式调用配置修改
  onGetWebpackChain(chain) {
    // 别名
    chain
      .resolve.alias.set('@', resolve('src'))
      .set('_c', resolve('src/components'))
      .set('_v', resolve('src/views'));

    // 将变量注入每个模块
    chain.plugin('provide-js').use(webpack.ProvidePlugin, [
      {
        // 全局配置项
        _Global: [resolve('./src/config/index.ts'), 'default'],
        // 工具库（改为@king-fisher/hxm-common维护）
        _t: ['@king-fisher/hxm-business', 'default'],
        // falcon 协议二次封装
        _f: ['@king-fisher/hxm-native-business', 'default'],
      },
    ]);

    chain.module
      .rule('less')
      .use('style-resources-loader')
      .loader('style-resources-loader')
      .options({
        // 这里的路径不能使用 @ 符号，否则会报错
        patterns: './node_modules/@king-fisher/hxm-styles/src/common.less',
      })
      .end();
  },

  proxy: {
    '/api': {
      target: 'https://testm.10jqka.com.cn',
      ws: false,
      changeOrigin: true,
      pathRewrite: {
        '^/api': '',
      },
    },
  },

  // @config skywalking配置
  monitor: {
    // 性能数据采样率。流量越大设置越小、业务越重要可适当调大，参考可见http://172.20.200.191:8003/pages/viewpage.action?pageId=664470948#SkyWalkingWeb端接入说明-2、性能采样率的设定（rate）
    rate: 0.001,
    service: 'mobileweb-ai-topic-mobile',
    pagePath: ['"PROGRAM-ai-topic-mobile" || "root"'],
    // serviceVersion: ["getPlatform() + '_1'"],
  },

  // @config 是否MPA应用
  web: {
    mpa: true,
  },

  // @config 过滤不需要转换 px 的 class
  // selectorBlackList: ['no-vw', 'no-hm'], // 默认 ['no-vw', 'no-hm']，无需担心被覆盖

  // @config 自定义图片base64限制、css预处理工具
  // loader: {
  //   asset: {
  //     maxSize: 10 * 1024, // 10k 默认 8k
  //   },
  //   style: {
  //     preProcessors: ['scss'], // 默认 less
  //   },
  // },

  // @config Babel配置处理
  babel: {
    includeNodeModules: [
      'node_modules/@vue',
      'node_modules/@ths-m/',
      'node_modules/vue',
    ],
    // excludeNodeModules: ['node_modules'], // 默认，无需特意配置
  },

  // @config debug处理
  // debug: {
  //   minimize: false, // 是否压缩产物，默认开启
  //   cache: false, // 是否开启换成，默认开启
  //   analyze: true, // 依赖包分析
  // },

  styleTransform: {
    onePxTransform: false,
    designWidth: 375,
    targetUnit: 'rem',
    rootRemValue: 100,
    // 过滤不需要转换 px 的 class
    // selectorBlackList: ['no-vw', 'no-hm'], // 默认 ['no-vw', 'no-hm']，无需担心被覆盖
    // dynamicOptions: (filePath: string) => {
    //   if (filePath.includes('@atom')) {
    //     return { designWidth: 375 };
    //   }
    //   return {};
    // },
    customPackages: [
      {
        packageName: '@atom/atom-ui',
        options: {
          designWidth: 375,
        },
      },
    ],
  },
});
