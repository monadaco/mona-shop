import { createSlice } from "@reduxjs/toolkit";
import { env } from "../constants";

const initialState = {
  loading: false,
  items: {},
  fullName: "",
  email: "",
};

const ordersSlice = createSlice({
  name: "orders",
  initialState: { ...initialState },
  reducers: {
    ordersLoading(state) {
      state.loading = true;
    },
    addItem(state, action) {
      if (state.items[action.payload.id]) {
        state.items[action.payload.id]++;
      } else {
        state.items[action.payload.id] = 1;
      }
    },
    setAmount(state, action) {
      state.items[action.payload.id] = action.payload.amount;
    },
    setEmail(state, action) {
      state.email = action.payload;
    },
    setFullName(state, action) {
      state.fullName = action.payload;
    },
    reset(state) {
      state.loading = false;
      state.items = {};
      state.fullName = "";
      state.email = "";
    },
  },
});

export const { addItem, setAmount, setEmail, setFullName, reset } = ordersSlice.actions;
const { ordersLoading } = ordersSlice.actions;

export const sendOrder = () => async (dispatch, getState) => {
  dispatch(ordersLoading());
  const state = getState();
  const { email, fullName, items } = state.orders;
  try {
    const response = await fetch(`${env.API_URL}/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        fullName,
        items: Object.keys(items).map((productId) => ({
          productId: Number(productId),
          amount: items[productId],
        })),
      }),
    });
    if (response.status === 200) {
      return true;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};

export default ordersSlice.reducer;
