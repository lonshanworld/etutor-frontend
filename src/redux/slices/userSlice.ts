import { User } from "@/model/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface stateType {
    user? : User
}

const initialState : stateType = {
    user : undefined,
} 

export const userSlice = createSlice({
    name : "user",
    initialState,
    reducers : {
        login : (state, action) => {
            state.user = action.payload;
        },
        logout : (state) =>{
            state.user = undefined;
        },
        updateUser : (state, action) => {
            if(state.user){
                state.user = {...state.user, ...action.payload};
            }
        }
    }
});

export default userSlice.reducer;
export const {login, logout, updateUser} = userSlice.actions;