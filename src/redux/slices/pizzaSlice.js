import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
};

export const pizzasSlice = createSlice({
    name: "pizza",
    initialState,
    reducers: {
        setItems: (state, action) => {
            state.items = action.payload;
        },
    },
});

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
