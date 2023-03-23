import earthquakeApi from './earthquakeApi';

earthquakeApi.enhanceEndpoints({
  addTagTypes: ['cityList'],
});

const staticsServices = earthquakeApi.injectEndpoints({
  endpoints: builder => ({
    // Türkiyedeki ilçeleri getiren servis.
    cityList: builder.query({
      query: () => ({
        url: '/statics/cities',
        method: 'GET',
      }),
      providesTags: result =>
        earthquakeApi.providesTags(
          Object.values(result || {}),
          'cityList',
          'cityCode',
        ),
      extraOptions: {
        toastErrorMessageKey: 'cityList',
      },
    }),
  }),
});

export default staticsServices;
