import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    order: {},
    cart: [],
    loading: false,
    errors: false
};

export const createOrder = createAsyncThunk(
    'cart/createOrder',
    async (order) => {
        const res = await axios.post("http://localhost:5000/api/orders", order);
        return res.data
    }
);

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            if(state.cart.length === 0) {
                state.cart.push(action.payload);
            }else {
                let index = state.cart.findIndex((item) => item.id === action.payload.id);
                if(index !== -1) {
                    state.cart[index].qty += 1;
                }else {
                    state.cart.push(action.payload);
                };
            };
        },
        removeFromCart: (state, action) => {
            // state.cart.filter((item) => item.id !== action.payload);
            let index = state.cart.findIndex((item) => item.id === action.payload);
            if(index !== -1) state.cart.splice(index, 1);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createOrder.pending, (state) => {
                return {...state, loading: true};
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                return {...state, order: action.payload, loading: false};
            })
            .addCase(createOrder.rejected, (state) => {
                return {...state, loading: false, errors: true}
            })
    }
});

export const {addToCart, removeFromCart} = cartSlice.actions;

export const selectCart = (state) => state.cart.cart;
export const selectCartOrder = (state) => state.cart.order;

export default cartSlice.reducer;

