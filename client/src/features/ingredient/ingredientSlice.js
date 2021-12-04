import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
    ingredients: [],
    ingredient: {},
    ingredientAdd: {},
    ingredientEdit: {},
    loading: false,
    errors: null
};

export const getAllIngredient = createAsyncThunk(
    'ingredient/getAllIngredient',
    async () => {
        const res = await axios.get("http://localhost:5000/api/ingredient");
        return res.data;
    }
);

export const getIngredient = createAsyncThunk(
    'ingredient/getIngredient',
    async (id) => {
        const res = await axios.get(`http://localhost:5000/api/ingredient/${id}`);
        return res.data;
    }
);

export const createIngredient = createAsyncThunk(
    'ingredient/createIngredient',
    async (ingredient) => {
        const res = await axios.post("http://localhost:5000/api/ingredient", ingredient);
        return res.data;
    }
);

export const updateIngredient = createAsyncThunk(
    'ingredient/updateIngredient',
    async (ingredient) => {
        const res = await axios.put(`http://localhost:5000/api/ingredient/${ingredient.id}`, ingredient);
        return res.data;
    }
);

export const deleteIngredient = createAsyncThunk(
    'ingredient/deleteIngredient',
    async (id) => {
        const res = await axios.delete(`http://localhost:5000/api/ingredient/${id}`);
        return res.data;
    }
);

export const ingredientSlice = createSlice({
    name: 'ingredient',
    initialState,
    reducers: {
        deleteRedIngre: (state, action) => {
            state.ingredients = state.ingredients.filter(ingredient => ingredient.ingredientid !== action.payload);
        },
        resetIngredient: (state) => {
            state.ingredient = {};
        },
    },
    extraReducers: builder => {
        builder 
            .addCase(getAllIngredient.pending, (state) => {
                return {...state, loading: true};
            })
            .addCase(getAllIngredient.fulfilled, (state, action) => {
                return {...state, loading: false, ingredients: action.payload};
            })
            .addCase(getAllIngredient.rejected, (state) => {
                return {...state, loading: false, errors: true};
            })
            .addCase(getIngredient.pending, (state) => {
                return {...state, loading: true};
            })
            .addCase(getIngredient.fulfilled, (state, action) => {
                return {...state, loading: false, ingredient: action.payload};
            })
            .addCase(getIngredient.rejected, (state) => {
                return {...state, loading: false, errors: true};
            })
            .addCase(createIngredient.pending, (state) => {
                return {...state, loading: true};
            })
            .addCase(createIngredient.fulfilled, (state, action) => {
                return {...state, loading: false, ingredientAdd: action.payload};
            })
            .addCase(createIngredient.rejected, (state) => {
                return {...state, loading: false, errors: true};
            })
            .addCase(updateIngredient.pending, (state) => {
                return {...state, loading: true};
            })
            .addCase(updateIngredient.fulfilled, (state, action) => {
                return {...state, loading: false, ingredientEdit: action.payload};
            })
            .addCase(updateIngredient.rejected, (state) => {
                return {...state, loading: false, errors: true};
            })
            .addCase(deleteIngredient.pending, (state) => {
                return {...state, loading: true};
            })
            .addCase(deleteIngredient.fulfilled, (state) => {
                return {...state, loading: false};
            })
            .addCase(deleteIngredient.rejected, (state) => {
                return {...state, loading: false, errors: true};
            })
    }
});

export const {deleteRedIngre, resetIngredient} = ingredientSlice.actions;

export const selectIngredients = state => state.ingredient.ingredients;
export const selectIngredient = state => state.ingredient.ingredient;
export const selectIngredientAdd = state => state.ingredient.ingredientAdd;
export const selectIngredientEdit = state => state.ingredient.ingredientEdit;

export default ingredientSlice.reducer;