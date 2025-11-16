import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../Slice/auth.js";
import userReducer from "../Slice/user.js"
import CartReducer from "../Slice/Cart.js"

const rootReducer = combineReducers({
  auth: authReducer,
  user:userReducer,
  cart:CartReducer,
  
});

export default rootReducer;


