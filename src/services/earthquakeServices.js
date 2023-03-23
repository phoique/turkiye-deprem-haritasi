import earthquakeApi from './earthquakeApi';
import {store, homeSlice} from '../store';

earthquakeApi.enhanceEndpoints({
  addTagTypes: ['getLastEarthquakes', 'earthquakeSearch'],
});

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
          result,
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
        earthquakeApi.providesTags(result, 'earthquakeSearch', 'earthquake_id'),
      extraOptions: {
        toastErrorMessageKey: 'earthquakeSearch',
      },
    }),
  }),
});

export default earthquakeServices;
