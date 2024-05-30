/*
 * @Author: shantenghui
 * @Date: 2023-08-02 19:45:58
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-12-27 19:37:55
 */
// 手炒至尊版2385235c20 普通版ce19ea099b
window.weblog.setConfig({
  appKey: 'ce19ea099b',
});

export function statClick(str: string, logmap?: Record<string, any>) {
  window.weblog.report({
    id: `${_Global.STAT.pageId}_${str}`,
    action: 'click',
    logmap,
  });
}

export function statShow(str: string, logmap?: Record<string, any>) {
  window.weblog.report({
    id: `${_Global.STAT.pageId}${str ? `_${str}` : ''}`,
    action: 'show',
    logmap,
  });
}
