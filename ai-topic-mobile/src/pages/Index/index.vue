<!--
 * @Author: shantenghui
 * @Date: 2023-09-13 15:42:22
 * @LastEditors:
 * @LastEditTime: 2024-01-03 17:06:45
-->
<!-- eslint-disable vue/no-deprecated-filter -->
<template>
  <div>
    <p>index.html</p>
    <p>isDark: {{ isDark }}</p>
    <p>filter test：{{ param | judgeIsNull }}</p>
    <p class="locale">{{ errorMsg }}</p>
  </div>
</template>

<script>
import { mapActions } from '@king-fisher/store';
import { useStockHqStore } from '@/store/stockHqFalcon';
import { initMiniAppBackwash } from '@/utils/backwash';
import { statShow } from '@/utils/stat';

export default {
  name: 'Index',
  data() {
    return {
      param: null,
      isDark: _f.Falcon.isDark(),
      errorMsg: window.i18n.t('func-matrix_network_error_msg'),
    };
  },
  // eslint-disable-next-line vue/no-deprecated-destroyed-lifecycle
  destroyed() {
    // 断开连接，不需要可以删除
    this.disconnect();
  },
  mounted() {
    // eslint-disable-next-line no-console
    console.log(_t.Tools.getOS());
    // 页面埋点
    statShow();
    // 初始化回流
    initMiniAppBackwash();
    // 行情数据请求
    this.registerStocks(['300033_33']);
  },
  methods: {
    // 使用store中的actions，作为参考，不需要可以删除
    ...mapActions(useStockHqStore, ['disconnect', 'registerStocks']),
  },
};
</script>

<style lang="less">
@import url('./index.less');
</style>
