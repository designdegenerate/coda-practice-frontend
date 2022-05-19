import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  content: [],
};

export const spacesSlice = createSlice({
  name: "space",
  initialState,
  reducers: {
    setSpacesLoad: (state) => {
      state.loading = true;
    },
    finishSpacesLoad: (state) => {
      state.loading = false;
    },
    setSpacesData: (state, action) => {
      state.content = action.payload;
    }
  },
});

export const {setSpacesLoad, finishSpacesLoad, setSpacesData} = spacesSlice.actions;

export default spacesSlice.reducer;
