import { configureStore } from "@reduxjs/toolkit";
import filter from "../redux/slices/filterSlice";
import cart from "../redux/slices/cartSlice";
import pizza from "../redux/slices/pizzaSlice";
import { useDispatch } from "react-redux";

export const store = configureStore({
    reducer: { filter, cart, pizza },
});

export type RootState = ReturnType<typeof store.getState>

type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch