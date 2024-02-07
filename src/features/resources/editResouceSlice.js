import { createSlice } from "@reduxjs/toolkit";

export const editResourceSlice = createSlice({
  name: "editResource",
  initialState: {},
  reducers: {
    addEditResource: (state, action) => {
      return action.payload;
    },
  },
});

export const { addEditResource } = editResourceSlice.actions;

export default editResourceSlice.reducer;
