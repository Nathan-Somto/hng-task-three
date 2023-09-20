import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import {User} from 'firebase/auth';
export interface UserState {
    User: User | null
}
const initialState: UserState = {
    User: null
}
type SetUserAction = {
    payload: {
        user: User | null
    },
    type:string
}
const userSlice = createSlice ({
    name: 'user',
    initialState,
    reducers:{
        setUser: (state, action:SetUserAction) => {
            state.User = action.payload.user
        }
    }
});
export const {setUser} = userSlice.actions
export const selectUser = (state:RootState) => state.user.User;
export default userSlice.reducer