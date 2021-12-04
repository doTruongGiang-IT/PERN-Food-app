import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
    pizzas: [],
    drinks: [],
    searchAndFilterPizzas: [],
    searchAndFilterDrinks: [],
    products: [],
    product: {},
    orderProducts: {},
    loading: false,
    error: false
};

export const getPizzas = createAsyncThunk(
    'pizzas/getPizzas',
    async () => {
        const res = await axios.get('http://localhost:5000/api/product/pizzas');
        return res.data;
    }
);

export const getDrinks = createAsyncThunk(
    'pizzas/getDrinks',
    async () => {
        const res = await axios.get('http://localhost:5000/api/drinks');
        return res.data;
    }
);

export const getOrderProducts = createAsyncThunk(
    'pizzas/getOrderProducts',
    async (id) => {
        const res = await axios.get(`http://localhost:5000/api/product/${id}`);
        return res.data;
    }
);

export const getAllProducts = createAsyncThunk(
    'pizzas/getAllProducts',
    async (id) => {
        const res = await axios.get(`http://localhost:5000/api/product`);
        return res.data;
    }
);

export const getProduct = createAsyncThunk(
    'pizzas/getProduct',
    async (id) => {
        const res = await axios.get(`http://localhost:5000/api/product/${id}`);
        return res.data;
    }
);

export const createProduct = createAsyncThunk(
    'pizzas/createProduct',
    async (product) => {
        const res = await axios.post(`http://localhost:5000/api/product`, product);
        return res.data;
    }
);

export const updateProduct = createAsyncThunk(
    'pizzas/updateProduct',
    async (product) => {
        const res = await axios.put(`http://localhost:5000/api/product/${product.id}`, product);
        return res.data;
    }
);

export const deleteProduct = createAsyncThunk(
    'pizzas/deleteProduct',
    async (id) => {
        const res = await axios.delete(`http://localhost:5000/api/product/${id}`);
        return res.data;
    }
);

export const pizzaSlice = createSlice({
    name: 'pizzas',
    initialState,
    reducers: {
        search: (state, action) => {
            state.searchAndFilterPizzas = state.pizzas.filter(pizza => pizza.product_name.toLowerCase().includes(action.payload.toLowerCase()));
        },
        filter: (state, action) => {
            state.searchAndFilterPizzas = state.pizzas.filter(pizza => pizza.product_size === action.payload);
        },
        searchDrinks: (state, action) => {
            state.searchAndFilterDrinks = state.drinks.filter(pizza => pizza.product_name.toLowerCase().includes(action.payload.toLowerCase()));
        },
        deleteRedPro: (state, action) => {
            state.products = state.products.filter(product => product.productid !== action.payload);
        },
    },
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
            .addCase(getDrinks.pending, (state) => {
                return {...state, loading: true};
            })
            .addCase(getDrinks.fulfilled, (state, action) => {
                return {...state, drinks: action.payload, loading: false};
            })
            .addCase(getDrinks.rejected, (state) => {
                return {...state, loading: false, error: true}
            })
            .addCase(getOrderProducts.pending, (state) => {
                return {...state, loading: true};
            })
            .addCase(getOrderProducts.fulfilled, (state, action) => {
                return {...state, orderProducts: action.payload, loading: false};
            })
            .addCase(getOrderProducts.rejected, (state) => {
                return {...state, loading: false, error: true}
            })
            .addCase(getAllProducts.pending, (state) => {
                return {...state, loading: true};
            })
            .addCase(getAllProducts.fulfilled, (state, action) => {
                return {...state, products: action.payload, loading: false};
            })
            .addCase(getAllProducts.rejected, (state) => {
                return {...state, loading: false, error: true}
            })
            .addCase(getProduct.pending, (state) => {
                return {...state, loading: true};
            })
            .addCase(getProduct.fulfilled, (state, action) => {
                return {...state, product: action.payload, loading: false};
            })
            .addCase(getProduct.rejected, (state) => {
                return {...state, loading: false, error: true}
            })
            .addCase(createProduct.pending, (state) => {
                return {...state, loading: true};
            })
            .addCase(createProduct.fulfilled, (state) => {
                return {...state, loading: false};
            })
            .addCase(createProduct.rejected, (state) => {
                return {...state, loading: false, error: true}
            })
            .addCase(updateProduct.pending, (state) => {
                return {...state, loading: true};
            })
            .addCase(updateProduct.fulfilled, (state) => {
                return {...state, loading: false};
            })
            .addCase(updateProduct.rejected, (state) => {
                return {...state, loading: false, error: true}
            })
            .addCase(deleteProduct.pending, (state) => {
                return {...state, loading: true};
            })
            .addCase(deleteProduct.fulfilled, (state) => {
                return {...state, loading: false};
            })
            .addCase(deleteProduct.rejected, (state) => {
                return {...state, loading: false, error: true}
            })
    }
});

export const {search, filter, searchDrinks, deleteRedPro} = pizzaSlice.actions;

export const selectPizzas = (state) => state.pizzas.pizzas;
export const selectDrinks = (state) => state.pizzas.drinks;
export const selectAllProducts = (state) => state.pizzas.products;
export const selectProduct = (state) => state.pizzas.product;
export const selectOrderProducts = (state) => state.pizzas.orderProducts;
export const selectSearchAndFilterPizzas = (state) => state.pizzas.searchAndFilterPizzas;
export const selectSearchAndFilterDrinks = (state) => state.pizzas.searchAndFilterDrinks;

export default pizzaSlice.reducer;