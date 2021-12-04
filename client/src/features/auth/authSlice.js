import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    auth: {},
    loading: false,
    errors: null
};

export const createUser = createAsyncThunk(
    'auth/createUser',
    async (user) => {
        const res = await axios.post("http://localhost:5000/api/auth/register", user);
        return res.data;
    }
);

export const getAuth = createAsyncThunk(
    'auth/getAuth',
    async (user) => {
        const res = await axios.post("http://localhost:5000/api/auth/login", user);
        return res.data
    }
);

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.auth = {};
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createUser.pending, (state) => {
                return {...state, loading: true};
            })
            .addCase(createUser.fulfilled, (state, action) => {
                return {...state, auth: action.payload, loading: false, errors: false};
            })
            .addCase(createUser.rejected, (state) => {
                return {...state, loading: false, errors: true};
            })
            .addCase(getAuth.pending, (state) => {
                return {...state, loading: true};
            })
            .addCase(getAuth.fulfilled, (state, action) => {
                return {...state, auth: action.payload, loading: false, errors: false};
            })
            .addCase(getAuth.rejected, (state, action) => {
                return {...state, loading: false, errors: true};
            })
    }
});

export const {logout} = authSlice.actions;

export const selectAuth = state => state.auth.auth;
export const selectAuthErrors = state => state.auth.errors;

export default authSlice.reducer;