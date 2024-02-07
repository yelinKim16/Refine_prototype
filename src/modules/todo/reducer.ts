// Action 실질적 기능 구현 파일

import { TodoAction, Todo } from "./types";
import { createReducer } from "typesafe-actions";
import { ADD_TODO, DELETE_TODO } from "./actions";
import produce from "immer";

const initialState: Todo = {
  todo: [],
};

const todo = createReducer<Todo, TodoAction>(initialState, {
  [ADD_TODO]: (state, action) =>
    produce(state, (draft) => {
      draft.todo.push(action.payload.todo);
    }),
  [DELETE_TODO]: (state, action) =>
    produce(state, (draft) => {
      draft.todo.pop();
    }),
});

export default todo;
