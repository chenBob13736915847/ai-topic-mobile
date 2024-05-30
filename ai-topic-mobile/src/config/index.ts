/**
 * @description: 全局变量
 * @param {String} str
 */
// 环境域名
const envHost = {
  // 对应proxy
  dev: '/api',
  // 对应测试环境主域名
  test: '//testm.10jqka.com.cn',
  // 对应正式环境主域名
  release: '',
};

type EnvHostKey = keyof typeof envHost;

const CURRENT_MODE = process.env.KINFISHER_MODE as EnvHostKey;

const BASE_URL_API = envHost[CURRENT_MODE];

// 相同域名接口申明(自动拼接域名前缀)
const interfaceApi = {
  interfaceDemo: '/interfaceDemo',
};
(Object.keys(interfaceApi) as Array<keyof typeof interfaceApi>).forEach(
  key => (interfaceApi[key] = BASE_URL_API + interfaceApi[key]),
);

// 不同域名接口申明
const diffHostInterface = {
  // 对应开发环境主域名
  dev: {},
  // 对应测试环境主域名
  test: {},
  // 对应正式环境主域名
  release: {},
};

export default {
  APPID: 'PROGRAM-ai-topic-mobile',

  STAT: {
    // TODO:记得修改此处
    pageId: 'test',
    url_ver: 'SJCGBS-000',
  },

  API: {
    ...interfaceApi,
    // 其余域名自行填充
    ...diffHostInterface[CURRENT_MODE],
  },

  URL: {},
};
