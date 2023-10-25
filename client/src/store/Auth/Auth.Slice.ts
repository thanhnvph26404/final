import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Ipuser, IUser } from "./Auth.interface";

const initialState: Ipuser = {
    users: [],

}

const authSlice = createSlice( {
    name: 'user',
    initialState: initialState,
    reducers: {

        loaduserList: ( state, action: PayloadAction<IUser[]> ) =>
        {
            state.users = action.payload
        },
        // editNewCategory: ( state, action: PayloadAction<IUser> ) =>
        // {
        //     const newCategory = action.payload
        //     state.categories = state.categories.map( ( category ) => category._id === newCategory._id ? newCategory : category )
        // },
        blockUser: ( state, action: PayloadAction<string> ) =>
        {
            state.users = state.users.filter( ( user ) => user._id !== action.payload )
            console.log( state.users );

        }

    }
} )

export const { loaduserList, blockUser } = authSlice.actions
export default authSlice.reducer