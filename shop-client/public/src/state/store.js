import {configureStore} from "@reduxjs/toolkit";
import productsReducer from "./products";
import orderReducer from "./orders";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    orders: orderReducer,
  },
});
