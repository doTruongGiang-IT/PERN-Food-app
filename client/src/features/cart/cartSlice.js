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
        const res = await axios.post("http://localhost:5000/api/order", order);
        return res.data
    }
);

export const selectLatestOrder = createAsyncThunk(
    'cart/selectLatestOrder',
    async (userid) => {
        const res = await axios.get(`http://localhost:5000/api/order/latest/${userid}`);
        return res.data
    }
);

export const createOrderDetails = createAsyncThunk(
    'cart/createOrderDetail',
    async (detail) => {
        const res = await axios.post("http://localhost:5000/api/order_detail", detail);
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
                let index = state.cart.findIndex((item) => item.productid === action.payload.productid);
                if(index !== -1) {
                    state.cart[index].qty += 1;
                }else {
                    state.cart.push(action.payload);
                };
            };
        },
        upQuantity: (state, action) => {
            let index = state.cart.findIndex((item) => item.productid === action.payload.productid);
            if(index !== -1) {
                state.cart[index].qty += 1;
            };
        },
        downQuantity: (state, action) => {
            let index = state.cart.findIndex((item) => item.productid === action.payload.productid);
            if(index !== -1) {
                state.cart[index].qty -= 1;
            };
            if(state.cart[index].qty === 0) {
                state.cart.splice(index, 1);
            };
        },
        addCheese: (state, action) => {
            state.cart = state.cart.map(cartItem => {
                if(cartItem.productid === action.payload.productid) {
                    return cartItem = {...cartItem, moreCheese: action.payload.moreCheese};
                }else {
                    return cartItem
                };
            });
        },
        removeFromCart: (state, action) => {
            // state.cart.filter((item) => item.id !== action.payload);
            let index = state.cart.findIndex((item) => item.productid === action.payload);
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
            .addCase(selectLatestOrder.pending, (state) => {
                return {...state, loading: true};
            })
            .addCase(selectLatestOrder.fulfilled, (state, action) => {
                return {...state, order: action.payload, loading: false};
            })
            .addCase(selectLatestOrder.rejected, (state) => {
                return {...state, loading: false, errors: true}
            })
            .addCase(createOrderDetails.pending, (state) => {
                return {...state, loading: true};
            })
            .addCase(createOrderDetails.fulfilled, (state, action) => {
                return {...state, loading: false};
            })
            .addCase(createOrderDetails.rejected, (state) => {
                return {...state, loading: false, errors: true}
            })
    }
});

export const {addToCart, removeFromCart, addCheese, upQuantity, downQuantity} = cartSlice.actions;

export const selectCart = (state) => state.cart.cart;
export const selectCartOrder = (state) => state.cart.order;

export default cartSlice.reducer;

