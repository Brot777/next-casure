import { createSlice } from "@reduxjs/toolkit";

const initialState = () => {
  try {
    const localStorage = window.localStorage.getItem("sesion");
    return localStorage ? JSON.parse(localStorage) : null;
  } catch (error) {
    return null;
  }
};

export const sesionSlice = createSlice({
  name: "sesion",
  initialState: initialState(),
  reducers: {
    addSesion: (state, action) => {
      return action.payload;
    },
    removeSesion: (state, action) => {
      return null;
    },
  },
});

export const { addSesion, removeSesion } = sesionSlice.actions;

export default sesionSlice.reducer;
