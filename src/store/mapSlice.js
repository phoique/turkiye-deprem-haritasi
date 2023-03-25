import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  filter: {
    city: null,
  },
};

const mapSlice = createSlice({
  name: 'map',
  initialState: {...initialState},
  reducers: {
    reset: () => initialState,
    setFilterData: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export default mapSlice;
