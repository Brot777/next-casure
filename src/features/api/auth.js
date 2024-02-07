import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const urlApi = "http://localhost:4000/api";

// Define a service using a base URL and expected endpoints
export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: urlApi,
  }),
  endpoints: (builder) => ({
    singIn: builder.mutation({
      query: (credentials) => ({
        url: "/auth/singin",
        method: "POST",
        body: credentials,
      }),
    }),
    singUp: builder.mutation({
      query: (credentials) => ({
        url: "/auth/singup",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { useSingInMutation, useSingUpMutation } = authApi;
