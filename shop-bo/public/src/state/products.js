import { createSlice } from "@reduxjs/toolkit";
import { env } from "../constants";

const productsSlice = createSlice({
  name: "products",
  initialState: {
    loading: false,
    products: [],
  },
  reducers: {
    productsLoading(state) {
      state.loading = true;
    },
    productsReceived(state, action) {
      state.products = action.payload.products;
      state.loading = false;
    },
  },
});

const { productsLoading, productsReceived } = productsSlice.actions;

// Define a thunk that dispatches those action creators
export const fetchProducts = () => async (dispatch) => {
  dispatch(productsLoading());

  try {
    const response = await fetch(`${env.API_URL}/products`);
    dispatch(productsReceived(await response.json()));
  } catch (e) {
    console.error(e);
  }
};

// Define a thunk that dispatches those action creators
export const editProduct = (id, body) => async (dispatch) => {
  dispatch(productsLoading());

  const response = await fetch(`${env.API_URL}/products/${id ? id : ""}`, {
    method: id ? "PUT" : "POST",
    body,
  });
  dispatch(productsReceived(await response.json()));
};

// Define a thunk that dispatches those action creators
export const deleteProduct = (id) => async (dispatch) => {
  dispatch(productsLoading());

  const response = await fetch(`${env.API_URL}/products/${id}`, { method: "DELETE" });
  dispatch(productsReceived(await response.json()));
};

export default productsSlice.reducer;
