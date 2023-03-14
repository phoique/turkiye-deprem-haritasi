import earthquakeApi from './earthquakeApi';
import {store, homeSlice} from '../store';

const earthquakeServices = earthquakeApi.injectEndpoints({
  endpoints: builder => ({
    // Son depremleri getiren servis.
    getLastEarthquakes: builder.query({
      query: params => ({
        url: '/kandilli/live',
        method: 'GET',
        params,
      }),
      transformResponse: response => {
        if (response) {
          store.dispatch(homeSlice.actions.setEarthquakes(response));
          return homeSlice.earthquakeAdapter
            .getSelectors()
            .selectAll(store.getState().home.earthquakes);
        }
        return response;
      },
      providesTags: result =>
        earthquakeApi.providesTags(
          result?.data,
          'getLastEarthquakes',
          'earthquake_id',
        ),
      extraOptions: {
        toastErrorMessageKey: 'getLastEarthquakes',
      },
    }),

    // Depremleri bazı parametrelere göre search eden servis.
    earthquakeSearch: builder.query({
      query: body => ({
        url: '/data/search',
        method: 'POST',
        body,
      }),
      providesTags: result =>
        earthquakeApi.providesTags(
          result?.data,
          'earthquakeSearch',
          'earthquake_id',
        ),
      extraOptions: {
        toastErrorMessageKey: 'earthquakeSearch',
      },
    }),
  }),
});

export default earthquakeServices;
