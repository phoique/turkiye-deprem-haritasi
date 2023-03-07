import React from 'react';
import {configureStore} from '@reduxjs/toolkit';
import {Provider} from 'react-redux';
import {setupListeners} from '@reduxjs/toolkit/query';
import {earthquakeApi} from '../services';

import homeSlice from './homeSlice';

export const store = configureStore({
  reducer: {
    [earthquakeApi.reducerPath]: earthquakeApi.reducer,
    home: homeSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(earthquakeApi.middleware),
  devTools: process.env.REACT_APP_ENV !== 'production',
});

setupListeners(store.dispatch);

export const StoreProvider = ({children}) => {
  return <Provider store={store}>{children}</Provider>;
};
