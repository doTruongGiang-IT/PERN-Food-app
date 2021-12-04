import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
    suppliers: [],
    supplier: {},
    supplierAdd: {},
    supplierEdit: {},
    loading: false,
    errors: null
};

export const getAllSupplier = createAsyncThunk(
    'supplier/getAllSupplier',
    async () => {
        const res = await axios.get("http://localhost:5000/api/supplier");
        return res.data;
    }
);

export const getSupplier = createAsyncThunk(
    'supplier/getSupplier',
    async (id) => {
        const res = await axios.get(`http://localhost:5000/api/supplier/${id}`);
        return res.data;
    }
);

export const createSupplier = createAsyncThunk(
    'supplier/createSupplier',
    async (supplier) => {
        const res = await axios.post("http://localhost:5000/api/supplier", supplier);
        return res.data;
    }
);

export const updateSupplier = createAsyncThunk(
    'supplier/updateSupplier',
    async (supplier) => {
        const res = await axios.put(`http://localhost:5000/api/supplier/${supplier.id}`, supplier);
        return res.data;
    }
);

export const deleteSupplier = createAsyncThunk(
    'supplier/deleteSupplier',
    async (id) => {
        const res = await axios.delete(`http://localhost:5000/api/supplier/${id}`);
        return res.data;
    }
);

export const supplierSlice = createSlice({
    name: 'supplier',
    initialState,
    reducers: {
        deleteRedSupp: (state, action) => {
            state.suppliers = state.suppliers.filter(supplier => supplier.supplierid !== action.payload);
        },
        resetSupplier: (state) => {
            state.supplier = {};
        },
    },
    extraReducers: builder => {
        builder 
            .addCase(getAllSupplier.pending, (state) => {
                return {...state, loading: true};
            })
            .addCase(getAllSupplier.fulfilled, (state, action) => {
                return {...state, loading: false, suppliers: action.payload};
            })
            .addCase(getAllSupplier.rejected, (state) => {
                return {...state, loading: false, errors: true};
            })
            .addCase(getSupplier.pending, (state) => {
                return {...state, loading: true};
            })
            .addCase(getSupplier.fulfilled, (state, action) => {
                return {...state, loading: false, supplier: action.payload};
            })
            .addCase(getSupplier.rejected, (state) => {
                return {...state, loading: false, errors: true};
            })
            .addCase(createSupplier.pending, (state) => {
                return {...state, loading: true};
            })
            .addCase(createSupplier.fulfilled, (state, action) => {
                return {...state, loading: false, supplierAdd: action.payload};
            })
            .addCase(createSupplier.rejected, (state) => {
                return {...state, loading: false, errors: true};
            })
            .addCase(updateSupplier.pending, (state) => {
                return {...state, loading: true};
            })
            .addCase(updateSupplier.fulfilled, (state, action) => {
                return {...state, loading: false, supplierEdit: action.payload};
            })
            .addCase(updateSupplier.rejected, (state) => {
                return {...state, loading: false, errors: true};
            })
            .addCase(deleteSupplier.pending, (state) => {
                return {...state, loading: true};
            })
            .addCase(deleteSupplier.fulfilled, (state) => {
                return {...state, loading: false};
            })
            .addCase(deleteSupplier.rejected, (state) => {
                return {...state, loading: false, errors: true};
            })
    }
});

export const {deleteRedSupp, resetSupplier} = supplierSlice.actions;

export const selectSuppliers = state => state.supplier.suppliers;
export const selectSupplier = state => state.supplier.supplier;
export const selectSupplierAdd = state => state.supplier.supplierAdd;
export const selectSupplierEdit = state => state.supplier.supplierEdit;

export default supplierSlice.reducer;