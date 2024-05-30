/*
 * @Author: shantenghui
 * @Date: 2024-01-10 11:17:32
 * @LastEditors:
 * @LastEditTime: 2024-02-27 15:15:43
 */
/**
 * 初始化小程序分享
 * 参考文档：http://172.20.200.191:8003/pages/viewpage.action?pageId=1000423572
 */
export function initMiniAppBackwash() {
  // 判断是否在小程序环境
  if (_f.Falcon.getProjectEnv === 'OTHER') return;

  window.backWash.init({
    // 是否启用运营中台配置，默认false
    isRemoteConfig: false,
    pageStatConfig: {
      // 页面埋点
      pageId: _Global.STAT.pageId,
    },
    bannerConfig: {
      openBtn: {
        // 底部导航栏打开按钮埋点
        statId: 'open',
      },
      closeBtn: {
        // 说明和openBtn类似
        statId: 'close',
      },
    },
    THSMiniApp: {
      iosScheme: `https://backwash.10jqka.com.cn/universalLink/sjcg.html?command=gotopage&clientUrl=client.html?action=launchFalcon^appId=${_Global.APPID}`,
      androidScheme: `amihexin://command=gotopage&clientUrl=client.html?action=launchFalcon^appId=${_Global.APPID}`,
    },
  });
}
