// 파일을 분리함으로서 한 파일에선 한 역할만 하기 -> 역할 단위 분리

// 액션 타입으로 정의.
import { ActionType } from "typesafe-actions";
import * as actions from "./actions";

export type TodoAction = ActionType<typeof actions>;

export type Todo = { todo: Array<string> };
