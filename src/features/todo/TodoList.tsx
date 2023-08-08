import { useAppDispatch, useAppSelector } from "../../store/hook";
import { deleteTodo } from "@/store/reducer/todoReducer";
import { css } from "@emotion/react";
import React from "react";

function TodoList() {
  const todoList = useAppSelector((state) => state.todo.todoList);
  const dispatch = useAppDispatch();
  const handleTodoDelete = (id: string) => {
    dispatch(deleteTodo(id));
  };
  if (todoList.length === 0)
    return <div css={todoEmptyCss}>오늘의 투두리스트 목록이 없습니다.</div>;
  return (
    <div css={wrapper}>
      {todoList.map((todo) => {
        return (
          <div data-testid="todos" key={`${todo.id}_todo`} css={todoListBox}>
            <p>{todo.text}</p>
            <div
              className="todo delete"
              onClick={() => handleTodoDelete(todo.id)}
            >
              x
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default TodoList;

const wrapper = css`
  margin-top: 20px;
  width: 100%;
  height: 60vh;
`;
const todoListBox = css`
  margin-top: 10px;
  position: relative;
  text-align: start;
  width: 100%;
  padding: 15px 15px;
  padding-right: 40px;
  border: 1px solid #eeeeee;
  border-radius: 8px;
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.2);
`;

const todoEmptyCss = css`
  margin-top: 100px;
  width: 100%;
  height: 250px;
  border: 1px solid #eeeeee;
  border-radius: 8px;
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.2);
  font-size: 20px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
`;
