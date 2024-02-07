import { configureStore } from "@reduxjs/toolkit";

/* QUERY */
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { resourcesApi } from "../features/api/resourcesApi";
import { usersApi } from "../features/api/usersApi";
import { authApi } from "../features/api/auth";
import { commentApi } from "../features/api/commentApi";

/* REDUX */
import resourceReducer from "../features/resources/resourceSlice.js";
import resourceDetailsReducer from "../features/resources/resourceDetailsSlice.js";
import sesionReducer from "../features/sesion/sesionSlice.js";
import commentReducer from "../features/comments/commentSlice.js";
import editResourceReducer from "../features/resources/editResouceSlice";

export const store = configureStore({
  reducer: {
    resource: resourceReducer,
    resourceDetails: resourceDetailsReducer,
    sesion: sesionReducer,
    comment: commentReducer,
    editResource: editResourceReducer,
    [resourcesApi.reducerPath]: resourcesApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [commentApi.reducerPath]: commentApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      resourcesApi.middleware,
      usersApi.middleware,
      authApi.middleware,
      commentApi.middleware
    ),
});

setupListeners(store.dispatch);
