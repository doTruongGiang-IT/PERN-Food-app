import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
    cusOrders: [],
    orders: [],
    updatedOrder: {},
    loading: false,
    errors: null
};

export const getAllOrder = createAsyncThunk(
    'order/getAllOrder',
    async () => {
        const res = await axios.get("http://localhost:5000/api/orders");
        return res.data;
    }
);

export const getOrder = createAsyncThunk(
    'order/getOrder',
    async (id) => {
        const res = await axios.get(`http://localhost:5000/api/orders/${id}`);
        return res.data;
    }
);

export const updateStatus = createAsyncThunk(
    'order/updateStatus',
    async (updateOrder) => {
        const res = await axios.put(`http://localhost:5000/api/orders/${updateOrder.id}`, updateOrder);
        return res.data;
    }
)

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllOrder.pending, (state) => {
                return {...state, loading: true};
            })
            .addCase(getAllOrder.fulfilled, (state, action) => {
                return {...state, cusOrders: action.payload, loading: false, errors: false};
            })
            .addCase(getAllOrder.rejected, (state) => {
                return {...state, loading: false, errors: true};
            })
            .addCase(getOrder.pending, (state) => {
                return {...state, loading: true};
            })
            .addCase(getOrder.fulfilled, (state, action) => {
                return {...state, orders: action.payload, loading: false, errors: false};
            })
            .addCase(getOrder.rejected, (state) => {
                return {...state, loading: false, errors: true};
            })
            .addCase(updateStatus.pending, (state) => {
                return {...state, loading: true};
            })
            .addCase(updateStatus.fulfilled, (state, action) => {
                return {...state, updatedOrder: action.payload, loading: false, errors: false};
            })
            .addCase(updateStatus.rejected, (state) => {
                return {...state, loading: false, errors: true};
            })
    }
});

export const selectCusOrders = state => state.order.cusOrders;
export const selectOrders = state => state.order.orders;
export const selectUpdatedOrder = state => state.order.updatedOrder;
export const selectOrderErrors = state => state.order.errors;

export default orderSlice.reducer;