# ai专题报表

(powered by Kingfisher)

## 项目目录

```
tpl-hxm-web
├─ public
│  ├─ config.json              # 小程序配置文件，配置appid、标题、导航栏颜色等
│  ├─ index.html               # 模板页面
│  └─ theme.json               # 小程序主题变量管理
├─ src
│  ├─ App.vue                  # 根组件
│  ├─ api
│  │  ├─ http.ts               # @king-fisher http 请求封装
│  │  └─ index.ts              # 接口请求方法
│  ├─ assets                   # 静态资源
│  ├─ components               # 组件
│  ├─ config
│  │  ├─ locales               # 国际化
│  │  ├─ constants.ts          # 常量管理
│  │  └─ index.ts              # 公共配置，接口地址管理
│  ├─ pages                    # 页面（MPA情况）
│  ├─ store                    # vuex
│  │  └─ stockHqFalcon.ts      # falcon 行情请求数据管理，不需要可以删除
│  ├─ utils
│  │  ├─ backwash.ts           # 回流
│  │  ├─ index.ts              # 公共方法
│  │  └─ stat.ts               # 埋点方法
│  ├─ app.config.ts            # 小程序路由及页面配置文件
│  ├─ beforeRender.js          # 页面渲染前的勾子，用于注册组件等处理，类似 main.js
│  ├─ global.less              # 全局样式
│  └─ shims-tsx.d.ts           # tsx 文件类型声明
├─ .env.dev                    # 开发环境变量
├─ .env.minirelease            # 小程序正式环境变量
├─ .env.minitest               # 小程序测试环境变量
├─ .env.release                # web 正式环境变量
├─ .env.test                   # web 测试环境变量
├─ .npmrc                      # npm 镜像配置，内网需要删除
├─ babel.config.js             # babel 配置文件，atom-ui统一处理
└─ build.config.ts             # 构建相关配置文件
```

配置文件文档：[Kingfisher-使用配置](https://testfund.10jqka.com.cn/public/whw/kingfisher-temp/dist/#/usage)

## 全局设置

### 全局 js 方法

1. 全局配置，文件地址：`src/config/index.ts`（可调用变量 `_Global` 获取，包括埋点，跳转地址，接口地址）
2. 全局方法，`@king-fisher/hxm-business`（可调用变量 `_t.Tools` 获取，包括分享，数据校验，浏览器环境监测等工具方法）
3. falcon 协议二次封装，`@king-fisher/hxm-native-business`（可调用变量 `_f.Falcon` 获取）
4. 全局埋点方法，文件地址：`src/utils/stat.ts`（可调用 `statShow、statClick` 方法）

### 全局 css 样式

1. 公共样式，在 `@king-fisher/hxm-styles` 中统一后在 global.less 中引入全局（包括字体，动画，iphoneX 适配等）

### 国际化
脚手架项目已接入国际化，使用国际化需要执行以下两个步骤即可：
1、需要让产品在[运营中台](https://e.hexin.cn/#/multilingual/list?appId=27)的【功能矩阵】应用下添加新增key值，填写对应的中英文翻译。之后，选择项目所需的key值进行下载，导出一个json文件给到您；
2、您需要将该文件内容复制到`scr/donfig/locales/locales.json`文件中，随后执行`npm run build:locales`命令进行解析。执行命令后会在对应目录下生成`en.js`、`zh.js`两个多语言文件；
3、在项目中，直接使用`window.i18n.t(${key})`引用即可；

## run

> Nodejs v12.22 起

### install dependencies

```sh
npm i
```

### 开发环境下编译并热重载

```
npm run start
```

**注意内外网镜像地址，内网需要删除`.npmrc`**

### 预发布/测试环境构建

```
// web
npm run build-test
// 小程序
npm run build-test:miniapp
```

### 正式生产环境构建

```
// web
npm run build
// 小程序
npm run build:miniapp
```

## 更新记录

|    jira     |        描述        |  时间   |     开发      |
| :---------: | :----------------: | :-----: | :-----------: |
| <%= JIRA %> | AI报表 | xxxx-xx | chenruifeng@myhexin.com |
