import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPizzas = createAsyncThunk(
    "pizza/fetchPizzaStatus",
    async (params) => {
        const { sortBY, order, category, search, currentPage } = params;
        const response = await axios.get(
            `https://637cfd3b9c2635df8f7f0355.mockapi.io/pizzas?page=${currentPage}&limit=4&${category}&sortBy=${sortBY}&order=${order}${search}`
        );
        return response.data;
    }
);

const initialState = {
    items: [],
    status: "loading",
};

export const pizzasSlice = createSlice({
    name: "pizza",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchPizzas.pending, (state) => {
            state.items = [];
            state.status = "loading";
        });
        builder.addCase(fetchPizzas.fulfilled, (state, action) => {
            state.items = action.payload;
            state.status = "success";
        });
        builder.addCase(fetchPizzas.rejected, (state, action) => {
            state.items = [];
            state.status = "error";
        });
    },
});

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
