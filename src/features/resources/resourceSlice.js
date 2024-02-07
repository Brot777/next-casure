import { createSlice } from "@reduxjs/toolkit";

export const resourceSlice = createSlice({
  name: "resource",
  initialState: [],
  reducers: {
    addResources: (state, action) => {
      return action.payload;
    },
    switchLike: (state, action) => {
      const indexResource = state.findIndex(
        (resource) => action.payload.idFeacture == resource._id
      );
      if (indexResource != -1) {
        state[indexResource].likes = action.payload.updatedLikes;
      }
    },
    switchFavorite: (state, action) => {
      state[action.payload.indexResource].favorites =
        action.payload.updatedFavorites;
    },
  },
});

export const { addResources, switchLike, switchFavorite } =
  resourceSlice.actions;

export default resourceSlice.reducer;
