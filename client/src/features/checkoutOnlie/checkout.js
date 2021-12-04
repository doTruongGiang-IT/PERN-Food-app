import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { RootState } from '../app/store';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe("pk_test_51JzgJCIO8tPEgH0KY6x3UfCTFQXDuCb1THNOvB1GhZeslKyYx5XtFRNvUB4V8zR08XqepK677oigotmn12IDvFx800qnFsTUJi");

const initialState = {
    // id: "",
    loading: false,
    error: false
};

export const processToCheckOut = createAsyncThunk(
    'checkout/checkout',
    async ({username}) => {
        const stripe = await stripePromise;
        // let result = {sessionId: ""};
        // const checkoutSession = await axios.post("http://localhost:5000/api/payment/create-checkout-session", {
        //     headers: {
        //         "Access-Control-Allow-Origin": "*"
        //     },
        //     products: username
        // },)
        const checkoutSession = await axios({
            method: "POST", 
            url: "http://localhost:5000/api/payment/create-checkout-session",
            data: username,
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        });

        window.location = checkoutSession.data.url;

        const resultCheckout = await stripe?.redirectToCheckout({
            sessionId: checkoutSession.data.sessionId
        });
        return resultCheckout;
    }
);

export const checkoutSlice = createSlice({
    name: 'checkout',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(processToCheckOut.pending, (state) => {
                return {...state, loading: true};
            })
            .addCase(processToCheckOut.fulfilled, (state) => {
                return {...state, loading: false};
            })
            .addCase(processToCheckOut.rejected, (state) => {
                return {...state, loading: false, error: true};
            })
    }
});

// export const selectCheckout = (state: RootState) => state.checkout.id;

export default checkoutSlice.reducer;