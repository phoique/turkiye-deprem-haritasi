import React from 'react';
import {configureStore} from '@reduxjs/toolkit';
import {Provider} from 'react-redux';
import {setupListeners} from '@reduxjs/toolkit/query';
import {api} from '../services';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(api.middleware),
  devTools: process.env.REACT_APP_ENV !== 'production',
});

setupListeners(store.dispatch);

export const StoreProvider = ({children}) => {
  return <Provider store={store}>{children}</Provider>;
};
