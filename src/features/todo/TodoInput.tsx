import { useAppDispatch, useAppSelector } from "../../store/hook";
import { addTodo, setInputValue } from "../../store/reducer/todoReducer";
import { css } from "@emotion/react";
import React, { useId } from "react";
import uuid from "react-uuid";
function TodoInput() {
  const inputValue = useAppSelector((state) => state.todo.inputValue);
  const dispatch = useAppDispatch();
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(addTodo({ id: uuid(), text: inputValue }));
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setInputValue(e.target.value));
  };

  return (
    <form css={formCss} onSubmit={onSubmit}>
      <div className="input_box">
        <input
          placeholder="할일을 입력해주세요"
          type="text"
          value={inputValue}
          onChange={onChange}
        />
        {inputValue.length > 1 && (
          <div className="input delete" onClick={() => dispatch(setInputValue(""))}>
            x
          </div>
        )}
      </div>
    </form>
  );
}

export default TodoInput;

const formCss = css`
  width: calc(100% - 40px);
  position: fixed;
  bottom: 20px;
  padding: 0 20px;
  .input_box {
    position: relative;
    input {
      font-size: 14px;
      width: 100%;
      height: 50px;
      border: 1px solid #eeeeee;
      border-radius: 8px;
      box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.2);
      padding: 0 20px;
      &:focus {
        outline: none;
      }
      &::placeholder {
        font-size: 14px;
        color: #cbcbcb;
      }
    }
  }
`;
