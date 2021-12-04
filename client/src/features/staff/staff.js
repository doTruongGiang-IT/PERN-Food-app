import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
    staffs: [],
    staff: {},
    loading: false,
    errors: null
};

export const getStaffs = createAsyncThunk(
    'staff/getStaffs',
    async () => {
        const res = await axios.get("http://localhost:5000/api/staff");
        return res.data;
    }
);

export const getStaff = createAsyncThunk(
    'staff/getStaff',
    async (id) => {
        const res = await axios.get(`http://localhost:5000/api/staff/${id}`);
        return res.data;
    }
);

export const staffSlice = createSlice({
    name: 'staff',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getStaffs.pending, (state) => {
                return {...state, loading: true};
            })
            .addCase(getStaffs.fulfilled, (state, action) => {
                return {...state, loading: false, staffs: action.payload};
            })
            .addCase(getStaffs.rejected, (state) => {
                return {...state, loading: false, errors: true};
            })
            .addCase(getStaff.pending, (state) => {
                return {...state, loading: true};
            })
            .addCase(getStaff.fulfilled, (state, action) => {
                return {...state, loading: false, staff: action.payload};
            })
            .addCase(getStaff.rejected, (state) => {
                return {...state, loading: false, errors: true};
            })
    }
});

export const selectStaffs = state => state.staff.staffs;
export const selectStaff = state => state.staff.staff;

export default staffSlice.reducer;
