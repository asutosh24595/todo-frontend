import { configureStore } from "@reduxjs/toolkit";
import { taskSlice } from "./taskSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

// Configuration for Redux-persist
const persistConfig = {
  key: "root", // Key for the persisted state
  version: 1, // Version of the persisted state
  storage, // Storage configuration (using localStorage by default)
};

// Create a persisted reducer with Redux-persist
const persistedReducer = persistReducer(persistConfig, taskSlice.reducer);

// Configure the Redux store
export const store = configureStore({
  reducer: { task: persistedReducer }, // Root reducer with the persisted reducer
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER], // Ignore specific Redux-persist actions
      },
    }),
});

// Create a persistor to persist the Redux store
export let persistor = persistStore(store);

// Export Redux actions from your taskSlice
export const taskActions = taskSlice.actions;
