import { createSlice } from "@reduxjs/toolkit";

export interface requestState {}

const initialState: requestState = {};

export const requestSlice = createSlice({
  name: "request",
  initialState,
  reducers: {
    // setInputValue: (state, action: PayloadAction<string>) => {
    //   state.inputValue = action.payload;
    // },
    // addrequest: (state, action: PayloadAction<requestState["requestList"][0]>) => {
    //   state.requestList.push(action.payload);
    //   state.inputValue = "";
    // },
    // deleterequest: (state, action: PayloadAction<string>) => {
    //   state.requestList = state.requestList.filter((f) => f.id !== action.payload);
    // },
  },
});

// Action creators are generated for each case reducer function
export const {} = requestSlice.actions;

export default requestSlice.reducer;
