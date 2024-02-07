import { combineReducers } from "redux";
import todo from "./todo/reducer";
import setting from "./setting/reducer";
import { Todo } from "./todo/types";
import { SettingList } from "./setting/types";

export type RootState = {
  todo: Todo;
  setting: SettingList;
};

const rootReducer = combineReducers({
  todo,
  setting,
});
export default rootReducer;
