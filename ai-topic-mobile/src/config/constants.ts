// export const LOGO_IMG_URL = 'https://testfund.10jqka.com.cn/public/test/kingfisher.png';
import { getPlatform } from '@king-fisher/hxm-business';
import { getProjectEnv } from '@king-fisher/hxm-native-business';

export const isIos = getPlatform(false) === 'iphone';
export const isDark = _f.Falcon.isDark() as boolean;
export const currentEnv = getProjectEnv();