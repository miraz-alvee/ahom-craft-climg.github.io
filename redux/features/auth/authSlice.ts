import { RootState } from '@/redux/store'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export type TUser = {
    email: string;
    full_name: string;
    phone_number: string | null;
    is_premium: boolean;
    user_role: string;
};

// Define a type for the slice state
interface IAuthState {
    token: string | null;
    user: TUser | null;
}

// Define the initial state using that type
const initialState: IAuthState = {
    token: null,
    user: null,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<string>) => {
            state.token = action.payload
        },
        logout: (state) => {
            state.user = null
            state.token = null
        },
        setUser: (state, action: PayloadAction<{ user: TUser; token: string }>) => {
            const { user, token } = action.payload
            state.user = user
            state.token = token
        },
    },
})

export const { login, logout, setUser } = authSlice.actions

export const selectAuth = (state: RootState) => state.auth
export const selectToken = (state: RootState) => state.auth.token
export const selectUser = (state: RootState) => state.auth.user

export default authSlice.reducer