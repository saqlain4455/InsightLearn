import { createSlice } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";

const intialState ={
    
    token:localStorage.getItem("token")? JSON.parse(localStorage.getItem("token")) :null}
const authSlice = createSlice({
    name:"auth",
    initialState:intialState,
    reducers:{
        setToken(state,value){
            state.token=value.payload
        },
        RemoveToken:(state)=>{
            state.token=null
           
            
        }
    }

})

export const {setToken,RemoveToken} = authSlice.actions
export default authSlice.reducer
