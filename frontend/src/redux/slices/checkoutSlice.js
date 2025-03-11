import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async Thunk to create a checkout session
export const createCheckout = createAsyncThunk(
    "checkout/createCheckout",
    async ({ checkoutItems, shippingAddress, paymentMethod, totalPrice }, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/checkout`,
                { checkoutItems, shippingAddress, paymentMethod, totalPrice },
                {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("userToken")}`
                    }
                }
            );

            return response.data;
        } catch (error) {
            console.error("Error in the createCheckoutThunk", error);
            rejectWithValue(error.response.data);
        }
    }
)

export const getCheckout = createAsyncThunk(
    "checkout/getCheckout",
    async (checkoutId, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}`,
                {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("userToken")}`
                    }
                }
            );
            return response.data;
        } catch (error) {
            console.error("Error in the getCheckoutThunk", error);
            rejectWithValue(error.response.data);
        }
    })

// Create the checkoutSlice
const checkoutSlice = createSlice({
    name: "checkout",
    initialState: {
        checkout: null,
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createCheckout.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createCheckout.fulfilled, (state, action) => {
                state.loading = false;
                state.checkout = action.payload;
            })
            .addCase(createCheckout.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Failed to create checkout";
            })
            .addCase(getCheckout.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getCheckout.fulfilled, (state, action) => {
                state.loading = false;
                state.checkout = action.payload;
            })
            .addCase(getCheckout.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Failed to get checkout";
            })
    }
})

export default checkoutSlice.reducer
