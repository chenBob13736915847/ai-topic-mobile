import Vue, { VNode } from 'vue';

import * as HxmUtils from '@king-fisher/hxm-business/index';
import * as HxmNative from '@king-fisher/hxm-native-business/index';
import Config from './config/index';

declare global {
  namespace JSX {
    // tslint:disable no-empty-interface
    interface Element extends VNode {}
    // tslint:disable no-empty-interface
    interface ElementClass extends Vue {}
    interface IntrinsicElements {
      [elem: string]: any;
    }
  }
  interface Window {
    hxmPageStat: any;
    hxmOnceStat: any;
    hxmClickStat: any;
    hxmJumpPageStat: any;
    ClientMonitor: any;
  }

  declare const _t: HxmUtils;
  declare const _f: HxmNative;
  declare const _Global: Config;
}
