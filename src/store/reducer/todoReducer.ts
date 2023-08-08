import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

export interface TodoState {
  todoList: { id: string; text: string }[];
  inputValue: string;
}

const initialState: TodoState = {
  todoList: [],
  inputValue: "",
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    setInputValue: (state, action: PayloadAction<string>) => {
      state.inputValue = action.payload;
    },
    addTodo: (state, action: PayloadAction<TodoState["todoList"][0]>) => {
      state.todoList.push(action.payload);
      state.inputValue = "";
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      state.todoList = state.todoList.filter((f) => f.id !== action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { addTodo, setInputValue, deleteTodo } = todoSlice.actions;

export default todoSlice.reducer;
