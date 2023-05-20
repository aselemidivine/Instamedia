import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import authReducer from './state';
import { configurateStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import {
  persistentStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";
// Even tho the browser is closed, The user information and data would still be stored in the browser.


const persistConfig = { key: "root", storage, version: 1 };
const persistedReducer = persistReducer(persistConfig, authReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => 
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [ FLUSH, REHYDRATE, PAUSE, REGISTER, PURGE, PERSIST ],
    },
  }),
});


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

