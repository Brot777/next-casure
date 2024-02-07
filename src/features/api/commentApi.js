import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const urlApi = "http://localhost:4000/api";

// Define a service using a base URL and expected endpoints
export const commentApi = createApi({
  reducerPath: "commentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: urlApi,
    prepareHeaders: (headers) => {
      const localStorage = window.localStorage.getItem("sesion");
      if (localStorage) {
        const user = JSON.parse(localStorage);
        headers.set("authorization", `Bearer ${user.token}`);
      }
      return headers;
    },
  }),

  tagTypes: ["comments"],
  endpoints: (builder) => ({
    getCommentsByResourceId: builder.query({
      query: (resourceId) => `/comments/${resourceId}`,
      providesTags: ["comments"],
    }),
    addComment: builder.mutation({
      query: (comment) => ({
        url: "/comments",
        method: "POST",
        body: comment,
      }),
      invalidatesTags: ["comments"],
    }),
    deleteComment: builder.mutation({
      query: (commentId) => ({
        url: `/comments/${commentId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["comments"],
    }),

    likedComment: builder.mutation({
      query: (commentId) => ({
        url: `/comments/like/${commentId}`,
        method: "PATCH",
      }),
    }),
  }),
});

export const {
  useLazyGetCommentsByResourceIdQuery,
  useAddCommentMutation,
  useLikedCommentMutation,
  useDeleteCommentMutation,
} = commentApi;
