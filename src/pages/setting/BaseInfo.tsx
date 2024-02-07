import * as React from "react";
import { Card, CardContent, FormControl, Divider, Button } from "@mui/material";
import { Typography } from "@mui/material";
import { Box } from "@mui/material";
import TextField from "@mui/material/TextField";

import { useDispatch, useSelector } from "react-redux";

import { addTodo, deleteTodo } from "modules/todo/actions";
import { RootState } from "modules";

export const BaseInfo: React.FC = (props) => {
  const [value, setValue] = React.useState("");
  const dispatch = useDispatch();

  // list 조회
  const todolist = useSelector((state: RootState) => state.todo.todo);

  // todo update
  const updateTodo = React.useCallback(
    (todo: string) => dispatch(addTodo({ todo: todo })),
    [dispatch]
  );

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateTodo(value);
    setValue("");
  };

  // todo delete
  const removeTodo = React.useCallback(
    () => dispatch(deleteTodo()),
    [dispatch]
  );

  return (
    <FormControl fullWidth>
      <Card>
        <CardContent>
          <Box sx={{ display: "flex", ml: 2, mt: 1 }}>
            <Typography sx={{ ml: 1 }} variant="h5">
              기본 설정
            </Typography>
          </Box>
          <Divider />
          <Box
            sx={{
              m: 3,
            }}
          >
            <form onSubmit={onSubmit}>
              <TextField
                placeholder="TodoList input"
                value={value}
                onChange={onChange}
                size="small"
              />
              <Button type="submit" variant="contained" sx={{ ml: 2 }}>
                등록
              </Button>
            </form>
          </Box>
        </CardContent>
        <Divider />
        <Box sx={{ m: 2 }}>
          <span onClick={removeTodo}>(X)</span>
          {todolist.map((v) => {
            return (
              <li>
                <span>{v}</span>
              </li>
            );
          })}
        </Box>
      </Card>
    </FormControl>
  );
};
export default BaseInfo;
