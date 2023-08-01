import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getCartFromLS } from "../../utils/getItemFromLS";
import { calcTotalPrice } from "../../utils/calcTotalPrice";

export type CartItem = {
    id: string;
    title: string;
    price: number;
    imageUrl: string;
    type: string;
    size: number;
    count: number
}

interface CartSliceState {
    totalPrice: number;
    items: CartItem[]
}

const {totalPrice, items} = getCartFromLS()

const initialState: CartSliceState = {
    totalPrice: totalPrice,
    items: items,
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<CartItem>) => {
            const findItem = state.items.find(
                (obj) => obj.id === action.payload.id
            );

            if (findItem) {
                findItem.count++;
            } else {
                state.items.push({ ...action.payload, count: 1 });
            }
            state.totalPrice = calcTotalPrice(state.items)
        },
        plusItem: (state, action: PayloadAction<string>) => {
            const findItem = state.items.find(
                (obj) => obj.id === action.payload
            );

            if (findItem) {
                findItem.count++;
            }
        },
        minusItem: (state, action: PayloadAction<string>) => {
            const findItem = state.items.find(
                (obj) => obj.id === action.payload
            );
            
            if (findItem) {
                findItem.count--;
            }
        },
        removeItem: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter(
                (obj) => obj.id !== action.payload
            );
        },
        clearItems: (state) => {
            state.items = [];
            state.totalPrice = 0;
        },
        totalPricePlus: (state) => {
            state.totalPrice = state.items.reduce((sum, obj) => {
                return obj.price * obj.count + sum;
            }, 0);
        },
        totalPriceMinus: (state) => {
            state.totalPrice = state.items.reduce((sum, obj) => {
                return obj.price * obj.count + obj.price - obj.price + sum;
            }, 0);
        },
    },
});

export const {
    addItem,
    removeItem,
    plusItem,
    minusItem,
    clearItems,
    totalPricePlus,
    totalPriceMinus,
} = cartSlice.actions;

export default cartSlice.reducer;
