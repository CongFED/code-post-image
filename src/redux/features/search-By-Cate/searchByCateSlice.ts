import { createSlice } from "@reduxjs/toolkit";

const searchByCateSlice = createSlice({
  name: "searchByCate",
  initialState: {
    datasearchByCate: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    searchByCateStart: (state) => {
      state.isFetching = true;
    },
    searchByCateSuccess: (state, action) => {
      state.isFetching = false;
      state.datasearchByCate = action.payload;
    },
    searchByCateFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
   
  },
});

export const {
  searchByCateStart,
  searchByCateSuccess,
  searchByCateFailure,

} = searchByCateSlice.actions;
export default searchByCateSlice.reducer;
