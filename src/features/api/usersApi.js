import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const urlApi = "http://localhost:4000/api";

// Define a service using a base URL and expected endpoints
export const usersApi = createApi({
  reducerPath: "usersApi",
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
  endpoints: (builder) => ({
    getUserById: builder.query({
      query: () => "/users/profile",
    }),
  }),
});

export const { useLazyGetUserByIdQuery } = usersApi;
