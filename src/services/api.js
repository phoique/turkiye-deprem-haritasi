import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import i18n from '../languages';
import toast from './toast';

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://api.orhanaydogdu.com.tr/deprem',
});

const baseQueryCustom = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  // Hata durumunda toast fırlatıp fırlatılmaması.
  if (result.error && extraOptions?.toastErrorMessageKey) {
    toast.show(
      i18n.t(`services.error.${extraOptions.toastErrorMessageKey}`),
      'error',
    );
  }

  if (result?.data?.result) {
    // Olumlu sonuç sonrası toast fırlatıp fırlatılmaması.
    if (extraOptions?.toastSuccessMessageKey) {
      toast.show(
        i18n.t(`services.success.${extraOptions.toastSuccessMessageKey}`),
        'success',
      );
    }
    result.data = result.data.result;
  }

  return result;
};

const api = createApi({
  reducerPath: 'api',
  refetchOnFocus: true,
  refetchOnReconnect: true,
  baseQuery: baseQueryCustom,
  endpoints: builder => ({
    getLastEarthquakes: builder.query({
      query: () => ({
        url: '/kandilli/live',
        method: 'GET',
      }),
      providesTags: result =>
        providesTags(result?.data, 'getLastEarthquakes', 'earthquake_id'),
      extraOptions: {
        toastErrorMessageKey: 'getLastEarthquakes',
      },
    }),
  }),
});

/**
 *
 * @param {Array} result
 * @param {string} type
 * @param {string} idKey
 * @returns {Array}
 */
const providesTags = (result, type, idKey = 'id') => {
  if (result) {
    if (Array.isArray(result)) {
      if (result.length) {
        return [
          ...result.map(item => ({type, id: item[idKey]})),
          {type, id: 'LIST'},
        ];
      }
      return [{type, id: 'LIST'}];
    }
    return [{type, id: result[idKey]}];
  }
  return [];
};

/**
 *
 * @param {string} type
 * @param {string} id
 * @returns {Array}
 */
const invalidatesTags = (type, id) => {
  if (Array.isArray(type)) {
    if (id) return type.map(t => ({type: t, id}));
    return type.map(t => ({type: t, id: 'LIST'}));
  }
  if (id) return [{type, id}];
  return [{type, id: 'LIST'}];
};

export default {...api, providesTags, invalidatesTags};
