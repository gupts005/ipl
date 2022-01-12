import { createSlice } from '@reduxjs/toolkit';

const teamSlice = createSlice({
  name: 'team',
  initialState: {
    teamItems: [],
    changed: false,
  },
  reducers: {
    replaceTeam(state, action) {
      state.totalQuantity = action.payload.totalQuantity;
      state.teamItems = action.payload.teamItems;
    },
    // addItemToCart(state, action) {
    //   const newItem = action.payload;
    //   const existingItem = state.teamItems.find((item) => item.id === newItem.id);
    //   state.totalQuantity++;
    //   state.changed = true;
    //   if (!existingItem) {
    //     state.teamItems.push({
    //       id: newItem.id,
    //       price: newItem.price,
    //       quantity: 1,
    //       totalPrice: newItem.price,
    //       name: newItem.title,
    //     });
    //   } else {
    //     existingItem.quantity++;
    //     existingItem.totalPrice = existingItem.totalPrice + newItem.price;
    //   }
    // },
    // removeItemFromCart(state, action) {
    //   const id = action.payload;
    //   const existingItem = state.teamItems.find((item) => item.id === id);
    //   state.totalQuantity--;
    //   state.changed = true;
    //   if (existingItem.quantity === 1) {
    //     state.teamItems = state.teamItems.filter((item) => item.id !== id);
    //   } else {
    //     existingItem.quantity--;
    //     existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
    //   }
    // },
  },
});

export const teamActions = teamSlice.actions;

export default teamSlice;
