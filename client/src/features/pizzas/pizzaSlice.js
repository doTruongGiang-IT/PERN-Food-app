import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
    pizzas: [],
    loading: false,
    error: false
};

export const getPizzas = createAsyncThunk(
    'pizzas/getPizzas',
    async () => {
        const res = await axios.get('http://localhost:5000/api/pizzas');
        return res.data;
    }
);

export const pizzaSlice = createSlice({
    name: 'pizzas',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getPizzas.pending, (state) => {
                return {...state, loading: true};
            })
            .addCase(getPizzas.fulfilled, (state, action) => {
                return {...state, pizzas: action.payload, loading: false};
            })
            .addCase(getPizzas.rejected, (state) => {
                return {...state, loading: false, error: true}
            })
    }
});

export const selectPizzas = (state) => state.pizzas.pizzas;

export default pizzaSlice.reducer;