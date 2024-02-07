import { createSlice } from "@reduxjs/toolkit";

export const commentSlice = createSlice({
  name: "comment",
  initialState: [],
  reducers: {
    addComments: (state, action) => {
      return action.payload;
    },
    addComment: (state, action) => {
      state.unshift(action.payload);
    },
    deleteCommentOfState: (state, action) => {
      return (state = state.filter(
        (comment) => action.payload.commentId !== comment._id
      ));
    },
    switchLikeComment: (state, action) => {
      const indexComment = state.findIndex(
        (comment) => action.payload.idFeacture == comment._id
      );
      if (indexComment != -1) {
        state[indexComment].likes = action.payload.updatedLikes;
      }
    },
  },
});

export const {
  addComments,
  addComment,
  deleteCommentOfState,
  switchLikeComment,
} = commentSlice.actions;

export default commentSlice.reducer;
