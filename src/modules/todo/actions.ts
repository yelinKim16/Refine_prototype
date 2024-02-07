import { deprecated } from "typesafe-actions";

// 이를 통해 액션 생성 함수 편리하게 구현.
const { createStandardAction } = deprecated;

// 액션 정의
export const ADD_TODO = "todo/ADD_TODO";
export const DELETE_TODO = "todo/DELETE_TODO";

export const addTodo = createStandardAction(ADD_TODO)<{
  todo: string;
}>();

export const deleteTodo = createStandardAction(DELETE_TODO)();
