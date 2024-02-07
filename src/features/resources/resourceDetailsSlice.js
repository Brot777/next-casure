import { createSlice } from "@reduxjs/toolkit";

export const resourceDetailsSlice = createSlice({
  name: "resourceDetails",
  initialState: {},
  reducers: {
    addResourceDetails: (state, action) => {
      return action.payload;
    },
    switchLikeDetails: (state, action) => {
      state.likes = action.payload.updatedLikes;
    },
    switchFavoriteDetails: (state, action) => {
      state[action.payload.indexResource].favorites =
        action.payload.updatedFavorites;
    },
  },
});

export const { addResourceDetails, switchLikeDetails, switchFavoriteDetails } =
  resourceDetailsSlice.actions;

export default resourceDetailsSlice.reducer;
