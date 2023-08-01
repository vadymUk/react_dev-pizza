import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export type SearchPizzaParams = {
    sortBY: string;
    order: string;
    category: string;
    search: string;
    currentPage: string
}


export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams >(
    "pizza/fetchPizzaStatus",
    async (params) => {
        const { sortBY, order, category, search, currentPage } = params;
        const {data} = await axios.get<Pizza[]>(
            `https://637cfd3b9c2635df8f7f0355.mockapi.io/pizzas?page=${currentPage}&limit=4&${category}&sortBy=${sortBY}&order=${order}${search}`
        );
        return data;
    }
);

export enum Status {
    LOADING = "loading",
    SUCCESS = "success",
    ERROR = "error"
}

type Pizza = {
    id: string;
    title: string;
    price: number;
    imageUrl: string;
    sizes: number[];
    types: number[];
};

interface PizzaSliceState{
    items:Pizza[];
    status:Status;
}

const initialState: PizzaSliceState = {
    items: [],
    status: Status.LOADING
};

export const pizzasSlice = createSlice({
    name: "pizza",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchPizzas.pending, (state) => {
            state.items = [];
            state.status = Status.LOADING;
        });
        builder.addCase(fetchPizzas.fulfilled, (state, action) => {
            state.items = action.payload;
            state.status = Status.SUCCESS;
        });
        builder.addCase(fetchPizzas.rejected, (state) => {
            state.items = [];
            state.status = Status.ERROR;
        });
    },
});


export default pizzasSlice.reducer;
