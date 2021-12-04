import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
    users: [],
    user: {},
    loading: false,
    errors: null
};

export const getUsers = createAsyncThunk(
    'user/getUsers',
    async () => {
        const res = await axios.get("http://localhost:5000/api/user");
        return res.data;
    }
);

export const getUser = createAsyncThunk(
    'user/getUser',
    async (id) => {
        const res = await axios.get(`http://localhost:5000/api/user/${id}`);
        return res.data;
    }
);

export const updateUser = createAsyncThunk(
    'user/updateUser',
    async (user) => {
        const res = await axios.put(`http://localhost:5000/api/user/${user.id}`, user);
        return res.data;
    }
);

export const deleteUser = createAsyncThunk(
    'user/deleteUser',
    async (id) => {
        const res = await axios.delete(`http://localhost:5000/api/user/${id}`);
        return res.data;
    }
);

export const staffSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        deleteRedUser: (state, action) => {
            state.users = state.users.filter(user => user.userid !== action.payload);
        },
    },
    extraReducers: builder => {
        builder
            .addCase(getUsers.pending, (state) => {
                return {...state, loading: true};
            })
            .addCase(getUsers.fulfilled, (state, action) => {
                return {...state, loading: false, users: action.payload};
            })
            .addCase(getUsers.rejected, (state) => {
                return {...state, loading: false, errors: true};
            })
            .addCase(getUser.pending, (state) => {
                return {...state, loading: true};
            })
            .addCase(getUser.fulfilled, (state, action) => {
                return {...state, loading: false, user: action.payload};
            })
            .addCase(getUser.rejected, (state) => {
                return {...state, loading: false, errors: true};
            })
            .addCase(updateUser.pending, (state) => {
                return {...state, loading: true};
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                return {...state, loading: false};
            })
            .addCase(updateUser.rejected, (state) => {
                return {...state, loading: false, errors: true};
            })
            .addCase(deleteUser.pending, (state) => {
                return {...state, loading: true};
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                return {...state, loading: false};
            })
            .addCase(deleteUser.rejected, (state) => {
                return {...state, loading: false, errors: true};
            })
    }
});

export const { deleteRedUser } = staffSlice.actions;

export const selectUsers = state => state.user.users;
export const selectUser = state => state.user.user;

export default staffSlice.reducer;
