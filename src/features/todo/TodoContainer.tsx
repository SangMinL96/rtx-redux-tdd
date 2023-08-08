import { css } from "@emotion/react";
import React from "react";
import TodoList from "./TodoList";
import TodoInput from "./TodoInput";

function TodoContainer() {
  return (
    <div css={wrapper}>
      <h5>리덕스 TDD 투두리스트 🚀</h5>
      <TodoList />
      <TodoInput />
    </div>
  );
}

export default TodoContainer;

const wrapper = css`
  width: 100%;
  height: 100%;
  padding: 20px;
  h5 {
    font-size: 20px;
  }
`;
