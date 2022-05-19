import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  content: {},
};

export const someSpaceSlice = createSlice({
  name: "someSpace",
  initialState,
  reducers: {
    setSomeSpaceLoad: (state) => {
      state.loading = true;
    },
    finishSomeSpaceLoad: (state) => {
      state.loading = false;
    },
    setSomeSpaceData: (state, action) => {
      state.content = action.payload;
    }
  },
});

export const {setSomeSpaceLoad, finishSomeSpaceLoad, setSomeSpaceData} = someSpaceSlice.actions;

export default someSpaceSlice.reducer;
