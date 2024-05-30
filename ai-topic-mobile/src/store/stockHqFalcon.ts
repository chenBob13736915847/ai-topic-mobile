/*
 * 行情数据管理
 * 设置防抖，2s内只能触发一次
 */
import { defineStore } from '@king-fisher/store';
import { errorReport } from '@/utils/index';

enum HqField {
  code = 'code',
  name = 'name',
  chg = 'chg',
  latestPrice = 'latestPrice',
  marketId = 'marketId',
}

// 防抖定时器
let timer: any = null;

/**
 * @example
 * ```js
 * 注册: ...mapActions(useStockHqStore, ['registerStocks'])
 this.registerStocks(['300033_33','300036_36'], data => {
    Object.entries(data).forEach(([code, value]) => {
      console.log(code, value);
      const stock = this.tableData.find(item => item.code === code);
      if (stock) {
        stock.rise = value.chg;
      }
    });
  });
  * ```
 */
export const useStockHqStore = defineStore('stockHq', {
  state: () => ({
    connectDelay: 1000,
    // 股票代码与市场id的集合 ['300033_33']
    codeWithIdList: [] as string[],
    stockGroupMap: {} as Record<string, unknown>,
  }),
  actions: {
    // 批量注册股票
    registerStocks(stockList: string[], callback: (arg0: Record<string, unknown>) => any) {
      // 合并去重
      this.codeWithIdList = Array.from(new Set([...this.codeWithIdList, ...stockList]));

      // 防抖
      if (timer) {
        clearTimeout(timer);
      }

      timer = setTimeout(async () => {
        timer = null;
        try {
          const { codes, markets } = this.getCodesAndIdsFromList();

          // 注销行情协议
          _f.Falcon.disWebHqFalcon();

          // 断开后得延迟一段时间，否则无法重新连接
          await new Promise(res => setTimeout(res, 50));

          // 注册行情协议
          _f.Falcon.initWebHqFalcon(
            _Global.APPID,
            {
              stockList: codes,
              marketList: markets,
              // 可选值代码code 名称name 现价latestPrice 市场marketId 涨跌幅chg
              stationFieldList: [HqField.name, HqField.chg],
            },
            (res: { [key: string]: any }) => {
              if (!res || Object.keys(res).length < 1) {
                return;
              }

              this.packageHqData(res, callback);
            },
          );
        } catch (error) {
          errorReport(error);
        }
      }, this.connectDelay);
    },
    // 解析代码以及市场id列表
    getCodesAndIdsFromList() {
      const codes: string[] = [];
      const markets: string[] = [];
      this.codeWithIdList.forEach(item => {
        const [code, market] = item.split('_');
        codes.push(code);
        markets.push(market);
      });
      return { codes, markets };
    },
    /**
     * 组装行情数据，若需自定义组装，可在此处修改
     * @res 行情数据 格式：{ '300033': { code: '300033', name: '同花顺' } }
     * @callback 回调函数
     */
    packageHqData(res: { [key: string]: any }, callback: (arg0: Record<string, unknown>) => any) {
      const newMap = {} as Record<string, unknown>;
      // 遍历res数据，将数据组装成股票分组的形式
      Object.keys(res).forEach(key => {
        const item = res[key];
        if (this.stockGroupMap[key]) {
          this.stockGroupMap[key] = item;
        } else {
          newMap[key] = item;
        }
      });
      this.stockGroupMap = { ...this.stockGroupMap, ...newMap };
      callback && callback(this.stockGroupMap);
    },
    // 断开行情请求
    disconnect() {
      _f.Falcon.disWebHqFalcon();
      clearTimeout(timer);
      // eslint-disable-next-line thsjs/no-redundant-assignments
      timer = null;
    },
  },
});
