import {createSlice, createEntityAdapter} from '@reduxjs/toolkit';

const earthquakeAdapter = createEntityAdapter({
  selectId: earthquake => earthquake.earthquake_id,
});

const initialState = {
  earthquakes: earthquakeAdapter.getInitialState(),
  limit: 20,
  page: 1,
  hasMore: true,
  selectedEarthquakeId: null,
};

const homeSlice = createSlice({
  name: 'home',
  initialState: {...initialState},

  reducers: {
    reset: () => initialState,
    setEarthquakes: (state, action) => {
      if (action.payload.length < state.limit) {
        state.hasMore = false;
      }
      earthquakeAdapter.addMany(state.earthquakes, action.payload);
    },
    setNextPage: state => {
      if (state.hasMore) state.page += 1;
    },
    setSelectedEarthquakeId: (state, action) => {
      state.selectedEarthquakeId = action.payload;
    },
  },
});

export default {...homeSlice, earthquakeAdapter};
