import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async Thunk to fetch all orders
export const fetchAllOrders = createAsyncThunk(
    "adminOrders/fetchAllOrders",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/api/admin/orders`,
                {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("userToken")}`
                    }
                }
            )
            return response.data
        } catch (error) {
            console.error(error)
            rejectWithValue(error.response.data)
        }
    }
)

// Async Thunk to update order status
export const updateOrderStatus = createAsyncThunk(
    "admin/updateOrderStatus",
    async ({ id, status }, { rejectWithValue }) => {
        try {

            const response = await axios.put(
                `${import.meta.env.VITE_BACKEND_URL}/api/admin/orders/${id}`,
                { status },
                {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("userToken")}`
                    }
                }
            )

            return response.data.order

        } catch (error) {
            console.error(error)
            rejectWithValue(error.response.data)
        }
    }
)

// Async Thunk to delete an order
export const deleteOrder = createAsyncThunk(
    "admin/deleteOrder",
    async (orderId, { rejectWithValue }) => {
        try {
            await axios.delete(
                `${import.meta.env.VITE_BACKEND_URL}/api/admin/orders/${orderId}`,
                {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("userToken")}`
                    }
                }
            )
            return orderId
        } catch (error) {
            console.error(error)
            rejectWithValue(error.response.data)
        }
    }
)

// Create the adminOrderSlice
const adminOrderSlice = createSlice({
    name: "adminOrders",
    initialState: {
        orders: [],
        totalOrders: 0,
        totalSales: 0,
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch all orders
            .addCase(fetchAllOrders.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchAllOrders.fulfilled, (state, action) => {
                state.loading = false
                state.orders = action.payload;
                state.totalOrders = action.payload.length;

                //calculate the total sales
                const totalSales = action.payload.reduce((total, order) => {
                    return total + order.totalPrice
                }, 0)
                state.totalSales = totalSales.toFixed(2)
            })

            .addCase(fetchAllOrders.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload?.message || "Failed to fetch orders"
            })
            // Update order status
            .addCase(updateOrderStatus.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(updateOrderStatus.fulfilled, (state, action) => {
                state.loading = false
                state.orders = state.orders.map((order) => {
                    if (order._id === action.payload._id) {
                        return action.payload
                    }
                    return order
                })
            })
            .addCase(updateOrderStatus.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload?.message || "Failed to update order status"
            })
            .addCase(deleteOrder.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(deleteOrder.fulfilled, (state, action) => {
                state.loading = false
                state.orders = state.orders.filter((order) => order._id !== action.payload);
            })
            .addCase(deleteOrder.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload?.message || "Failed to delete order"
            })
    }
})

export default adminOrderSlice.reducer
