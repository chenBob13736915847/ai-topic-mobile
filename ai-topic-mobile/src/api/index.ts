import http from './http';

/**
 * 公司概况相关接口
 * @yapi http://yapi.myhexin.com/yapi/service/313483/interface/api/419485
 * @param code 股票代码
 * @param market 市场id
 * @returns
 */
export function getOverviewData(code: string, market: string) {
  return http(`${_Global.FUYAO_COMMON_URL}/board_view/get_overview`, 'GET', { code, market });
}
