import produce from "immer";
import { createReducer, ActionType } from "typesafe-actions";
import * as actions from "./actions"; // actions 파일 import 제거
import * as type from "./types";
import { GET_SETTING_LIST, CHANGE_SETTING } from "./actions";
import { settingItem } from "./types";
import { handleAction } from "redux-actions";

const initialSetting: settingItem = {
  breakfastStartTime: "09:00",
  breakfastEndTime: "10:00",
};

const initialState: type.SettingList = {
  settingList: [initialSetting],
};

const settings = createReducer<type.SettingList, type.changeSettingListAction>(
  initialState,
  {
    [GET_SETTING_LIST]: (state, action) =>
      produce(state, (draft) => {
        draft.settingList = action.payload;
      }),
    // [CHANGE_SETTING]: (state, action: ChangeSettingListAction) =>
    // produce(state, (draft) => {
    //   const { key, value } = action.payload;
    //   if (!draft.settings.data[key]) {
    //     draft.settings.data[key] = {};
    //   }
    //   draft.settings.data[key].data = value;
    // }),
  }
);

export default settings;
