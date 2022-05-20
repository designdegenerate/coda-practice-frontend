import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token"),
  profile: null,
  space: null
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      localStorage.setItem("token", action.payload.token);
      state.token = action.payload.token;
      state.profile = action.payload.user;
      state.space = action.payload.space;
    },
    logOut: (state, action) => {
      localStorage.removeItem("token");
      state.token = null;
      state.profile = null;
      state.space = null;
    },
    tokenStillValid: (state, action) => {
      state.profile = action.payload.profile;
      state.space = action.payload.space;
    },
    deleteUserStory: (state, action) => {
      const id = action.payload;
      state.space.stories = state.space.stories.filter(
        (story) => story.id !== id
      );
    }
  },
});

export const { deleteUserStory, loginSuccess, logOut, tokenStillValid } = userSlice.actions;

export default userSlice.reducer;
