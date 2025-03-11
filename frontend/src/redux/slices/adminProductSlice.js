import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async Thunk to fetch all products
export const fetchAdminProducts = createAsyncThunk(
    "adminProducts/fetchProducts",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/api/admin/products`,
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

// Async Thunk to create a new product
export const createProduct = createAsyncThunk(
    "adminProducts/createProduct",
    async (productData, { rejectWithValue }) => {
        console.log("In createProduct thunk", productData)
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/admin/products`,
                productData,
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

// Async Thunk to update a product
export const updateProduct = createAsyncThunk(
    "adminProducts/updateProduct",
    async ({ id, productData }, { rejectWithValue }) => {

        try {
            console.log("In updateProduct thunk", id)
            const response = await axios.put(
                `${import.meta.env.VITE_BACKEND_URL}/api/admin/products/update/${id}`,
                productData,
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

//Async Thunk to delete a product
export const deleteProduct = createAsyncThunk(
    "adminProducts/deleteProduct",
    async (productId, { rejectWithValue }) => {
        try {
            await axios.delete(
                `${import.meta.env.VITE_BACKEND_URL}/api/admin/products/delete/${productId}`,
                {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("userToken")}`
                    }
                }
            )
            return productId
        } catch (error) {
            console.error(error)
            rejectWithValue(error.response.data)
        }
    }
)

// Create the adminProductSlice
const adminProductSlice = createSlice({
    name: "adminProducts",
    initialState: {
        products: [],
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAdminProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAdminProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(fetchAdminProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Failed to fetch products";
            })
            // create product
            .addCase(createProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.products.push(action.payload);
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Failed to create product";
            })
            // update product
            .addCase(updateProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.products = state.products.map((product) => {
                    if (product._id === action.payload._id) {
                        return action.payload;
                    }
                    return product;
                });
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Failed to update product";
            })
            // delete product
            .addCase(deleteProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.products = state.products.filter((product) => product._id !== action.payload);
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Failed to delete product";
            })
    }
})

export default adminProductSlice.reducer