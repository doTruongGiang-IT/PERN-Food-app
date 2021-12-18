import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    dataPizza: [],
    orderStatus: [],
    statsStaff: [],
    loading: false,
    error: false
};

export const getStatisticsOrders = createAsyncThunk(
    'statistics/getStatisticsOrders',
    async () => {
        const res = await axios.get("http://localhost:5000/api/statistics/order_status");
        return res.data;
    }
);

export const getStatisticsOrderPerStaff = createAsyncThunk(
    'statistics/getStatisticsOrderPerStaff',
    async () => {
        const res = await axios.get("http://localhost:5000/api/statistics/statsStaff");
        return res.data;
    }
);

export const getStatisticsPizza = createAsyncThunk(
    'statistics/getStatisticsPizza',
    async () => {
        const res = await axios.get("http://localhost:5000/api/statistics/pizza");
        return res.data;
    }
);

export const statisticsSlice = createSlice({
    name: 'statistics',
    initialState,
    reducers: {
        statisticsIncome: (state, action) => {

        },
        statisticsBestSeller: (state, action) => {
            state.dataPizza = action.payload.pizzas ? action.payload.pizzas.map(pizza => {
                return {"name": pizza.product_name, "value": 0};
            }) : [];
        },
    },
    extraReducers: builder => {
        builder
            .addCase(getStatisticsOrders.pending, state => {
                return {...state, loading: true};
            })
            .addCase(getStatisticsOrders.fulfilled, (state, action) => {
                return {...state, loading: false, orderStatus: action.payload};
            })
            .addCase(getStatisticsOrders.rejected, state => {
                return {...state, loading: false, error: true};
            })
            .addCase(getStatisticsPizza.pending, state => {
                return {...state, loading: true};
            })
            .addCase(getStatisticsPizza.fulfilled, (state, action) => {
                return {...state, loading: false, dataPizza: action.payload};
            })
            .addCase(getStatisticsPizza.rejected, state => {
                return {...state, loading: false, error: true};
            })
            .addCase(getStatisticsOrderPerStaff.pending, state => {
                return {...state, loading: true};
            })
            .addCase(getStatisticsOrderPerStaff.fulfilled, (state, action) => {
                return {...state, loading: false, statsStaff: action.payload};
            })
            .addCase(getStatisticsOrderPerStaff.rejected, state => {
                return {...state, loading: false, error: true};
            })
    }
});

export const {statisticsBestSeller, statisticsIncome} = statisticsSlice.actions;

export const selectDataPizza = (state) => state.statistics.dataPizza;
export const selectOrderStatus = (state) => state.statistics.orderStatus;
export const selectOrderPerStaff = (state) => state.statistics.statsStaff;

export default statisticsSlice.reducer;