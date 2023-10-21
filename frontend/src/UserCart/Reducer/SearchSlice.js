import { createSlice } from '@reduxjs/toolkit';

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    results: [],
    loading: false,
    error: null,
  },
  reducers: {
    searchStarted: (state) => {
      state.loading = true;
    },
    searchSuccess: (state, action) => {
      state.loading = false;
      state.results = [action.payload];
      state.error = null;
    },
    searchFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
export const { searchStarted, searchSuccess, searchFailure } = searchSlice.actions;
console.log(searchSuccess)
export default searchSlice.reducer;
