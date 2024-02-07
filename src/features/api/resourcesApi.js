import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const urlApi = "http://localhost:4000/api";

// Define a service using a base URL and expected endpoints
export const resourcesApi = createApi({
  reducerPath: "resourcesApi",
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

  tagTypes: ["Like", "Resources", "Resource", "Contributions"],

  endpoints: (builder) => ({
    getResources: builder.query({
      query: (filter) => {
        console.log(filter);
        if (filter) {
          console.log("paso por el if");
          return `/search/resources?filter=${filter}`;
        }
        return "/resources";
      },
      providesTags: ["Resources"],
    }),
    getResourcesBasic: builder.query({
      query: (filter) => {
        if (filter) {
          return `/search/resources/basic?filter=${filter}`;
        }
        return "/resources/basic";
      },
      providesTags: ["Resources"],
    }),

    getResourcesEspecific: builder.query({
      query: (filter) => {
        if (filter) {
          return `/search/resources/especific?filter=${filter}`;
        }
        return "/resources/especific";
      },
      providesTags: ["Resources"],
    }),

    getResourceById: builder.query({
      query: (resourceId) => `/resources/${resourceId}`,
      providesTags: ["Resource"],
    }),
    getPopular: builder.query({
      query: () => "/resources/popular",
      providesTags: ["Like"],
    }),
    getContributions: builder.query({
      query: () => "/resources/contributions",
      providesTags: ["Contributions"],
    }),

    likedResource: builder.mutation({
      query: (resourceId) => ({
        url: `/resources/like/${resourceId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Like", "Resource"],
    }),
    favoriteResource: builder.mutation({
      query: (resourceId) => ({
        url: `/resources/favorite/${resourceId}`,
        method: "PATCH",
      }),
    }),
    crateResource: builder.mutation({
      query: (resource) => ({
        url: `/resources`,
        method: "POST",
        body: resource,
      }),
      invalidatesTags: ["Resources", "Contributions"],
    }),
    editResource: builder.mutation({
      query: ({ resource, resourceId }) => ({
        url: `/resources/${resourceId}`,
        method: "PUT",
        body: resource,
      }),
      invalidatesTags: ["Resources", "Contributions"],
    }),
    deleteResource: builder.mutation({
      query: (resourceId) => ({
        url: `/resources/${resourceId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Contributions"],
    }),
  }),
});

export const {
  useGetPopularQuery,
  useLazyGetResourcesQuery,
  useLazyGetResourcesBasicQuery,
  useLazyGetResourcesEspecificQuery,
  useGetResourceByIdQuery,
  useGetContributionsQuery,
  useLikedResourceMutation,
  useFavoriteResourceMutation,
  useCrateResourceMutation,
  useEditResourceMutation,
  useDeleteResourceMutation,
} = resourcesApi;
