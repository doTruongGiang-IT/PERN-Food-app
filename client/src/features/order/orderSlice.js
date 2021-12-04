import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
    cusOrders: [],
    searchAndFilterOrders: [],
    orders: [],
    orderDetails: [],
    updatedOrder: {},
    loading: false,
    errors: null
};

export const getAllOrder = createAsyncThunk(
    'order/getAllOrder',
    async () => {
        const res = await axios.get("http://localhost:5000/api/order");
        return res.data;
    }
);

export const getUserOrder = createAsyncThunk(
    'order/getUserOrder',
    async (id) => {
        const res = await axios.get(`http://localhost:5000/api/order/user/${id}`);
        return res.data;
    }
);

export const getDetailsUserOrder = createAsyncThunk(
    'order/getDetailsUserOrder',
    async (id) => {
        const res = await axios.get(`http://localhost:5000/api/order_detail/order/${id}`);
        return res.data;
    }
);

export const updateOrder = createAsyncThunk(
    'order/updateOrder',
    async (updateOrder) => {
        const res = await axios.put(`http://localhost:5000/api/order/${updateOrder.id}`, updateOrder);
        return res.data;
    }
)

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        filter: (state, action) => {
            state.searchAndFilterOrders = state.cusOrders.filter(order => {
                if(action.payload.startDate === "" && action.payload.endDate === "") {
                    if(action.payload.status !== "all" && action.payload.staffid !== "0") {
                        return (order.status.toLowerCase() === action.payload.status.toLowerCase() && order.staffid === Number.parseInt(action.payload.staffid));
                    };
                    if(action.payload.staffid === "0") {
                        return (order.status.toLowerCase() === action.payload.status.toLowerCase());
                    };
                    if(action.payload.status === "all") {
                        return (order.staffid === Number.parseInt(action.payload.staffid));
                    };
                }else {
                    // return (new Date(order.placed_at) > new Date(action.payload.startDate) && new Date(order.placed_at) < new Date(action.payload.endDate));
                    if(action.payload.status === "all" && action.payload.staffid === "0") {
                        return (new Date(order.placed_at) > new Date(action.payload.startDate) && new Date(order.placed_at) < new Date(action.payload.endDate));
                    };  
                    if(action.payload.status !== "all" && action.payload.staffid !== "0") {
                        return (order.status.toLowerCase() === action.payload.status.toLowerCase() && order.staffid === Number.parseInt(action.payload.staffid) && (new Date(order.placed_at) > new Date(action.payload.startDate) && new Date(order.placed_at) < new Date(action.payload.endDate)));
                    };
                    if(action.payload.staffid === "0") {
                        return (order.status.toLowerCase() === action.payload.status.toLowerCase() && (new Date(order.placed_at) > new Date(action.payload.startDate) && new Date(order.placed_at) < new Date(action.payload.endDate)));
                    };
                    if(action.payload.status === "all") {
                        return (order.staffid === Number.parseInt(action.payload.staffid) && (new Date(order.placed_at) > new Date(action.payload.startDate) && new Date(order.placed_at) < new Date(action.payload.endDate)));
                    };
                };
            });
        },
    },
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
            .addCase(getUserOrder.pending, (state) => {
                return {...state, loading: true};
            })
            .addCase(getUserOrder.fulfilled, (state, action) => {
                return {...state, orders: action.payload, loading: false, errors: false};
            })
            .addCase(getUserOrder.rejected, (state) => {
                return {...state, loading: false, errors: true};
            })
            .addCase(updateOrder.pending, (state) => {
                return {...state, loading: true};
            })
            .addCase(updateOrder.fulfilled, (state, action) => {
                return {...state, updatedOrder: action.payload, loading: false, errors: false};
            })
            .addCase(updateOrder.rejected, (state) => {
                return {...state, loading: false, errors: true};
            })
            .addCase(getDetailsUserOrder.pending, (state) => {
                return {...state, loading: true};
            })
            .addCase(getDetailsUserOrder.fulfilled, (state, action) => {
                return {...state, orderDetails: action.payload, loading: false, errors: false};
            })
            .addCase(getDetailsUserOrder.rejected, (state) => {
                return {...state, loading: false, errors: true};
            })
    }
});

export const {filter} = orderSlice.actions;

export const selectCusOrders = state => state.order.cusOrders;
export const selectDetailsOrders = state => state.order.orderDetails;
export const selectOrders = state => state.order.orders;
export const selectUpdatedOrder = state => state.order.updatedOrder;
export const selectOrderErrors = state => state.order.errors;
export const selectSearchAndFilterOrders = state => state.order.searchAndFilterOrders;

export default orderSlice.reducer;