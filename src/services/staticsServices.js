import earthquakeApi from './earthquakeApi';

const staticsServices = earthquakeApi.injectEndpoints({
  endpoints: builder => ({
    // Türkiyedeki ilçeleri getiren servis.
    cityList: builder.query({
      query: () => ({
        url: '/statics/cities',
        method: 'GET',
      }),
      providesTags: () => earthquakeApi.providesTags([], 'cityList'),
      extraOptions: {
        toastErrorMessageKey: 'cityList',
      },
    }),
  }),
});

export default staticsServices;
