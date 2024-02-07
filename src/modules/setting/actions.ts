import { createAction } from "typesafe-actions";
import * as type from "../setting/types";
import { createStandardAction } from "typesafe-actions/dist/deprecated/create-standard-action";

// 액션 정의

export const GET_SETTING_LIST = "settings/GET_SETTING_LIST" as const;
export const CHANGE_SETTING = "settings/CHANGE_SETTING" as const;
export const PUT_SETTING = "settings/PUT_SETTING";

export const getSettingList = (settingItemList: type.settingItem[]) => ({
  type: GET_SETTING_LIST,
  payload: settingItemList,
});

export const putSetting = (settingItemList: type.settingItem[]) => ({
  type: PUT_SETTING,
  payload: settingItemList,
});

export const changeSetting = createAction(CHANGE_SETTING, ({ key, value }) => ({
  key,
  value,
}));
