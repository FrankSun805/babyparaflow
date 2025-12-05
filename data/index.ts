// 导出所有教育APP屏幕数据
export * from './eduAppScreens';
export * from './eduAppScreens2';

import { EDU_APP_SCREENS } from './eduAppScreens';
import { EDU_APP_SCREENS_2 } from './eduAppScreens2';

// 合并所有屏幕
export const ALL_EDU_SCREENS = {
  ...EDU_APP_SCREENS,
  ...EDU_APP_SCREENS_2,
};

