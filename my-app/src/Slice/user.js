import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user:{
    "firstName":"",
    "lastName":"",
    "email":null,
    "password":null,
    "confirmPassword":null,
    "accountType":"",
    
  }
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
     state.user = { ...state.user, ...action.payload };
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
