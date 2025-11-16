import { createSlice } from "@reduxjs/toolkit";

const intialState ={
    
    cartItem:[] }
const cartSlice = createSlice({
    name:"cart",
    initialState:intialState,
    reducers:{
        setCart:(state,value)=>{
            if(state.cartItem._id !==value.payload._id)
            state.cartItem.push(value.payload)
        },
        RemoveId:(state,value)=>{
              state.cartItem =state.cartItem.filter((item) => item._id!==value.payload)
        }

    }

})

export const {setCart,RemoveId} = cartSlice.actions
export default cartSlice.reducer