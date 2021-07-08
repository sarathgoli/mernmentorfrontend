import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name : "user",
  initialState:{
    user : null
  },
  reducers :{
    login_redux:(state, action) => {
      state.user = action.payload;
    },
    logout_redux: (state) => {
      state.user = null;
    }
  }
});

export const {login_redux, logout_redux} = userSlice.actions;

export const selectUser = (state) => state.user.user;

export default userSlice.reducer;