import { createSlice } from '@reduxjs/toolkit';

const venueSlice = createSlice({
  name: 'venue',
  initialState: {
    items: [],
    changed: false,
  },
  reducers: {
    replaceVenue(state, action) {
      state.totalQuantity = action.payload.totalQuantity;
      state.items = action.payload.items;
    },
    // addItemToCart(state, action) {
    //   const newItem = action.payload;
    //   const existingItem = state.items.find((item) => item.id === newItem.id);
    //   state.totalQuantity++;
    //   state.changed = true;
    //   if (!existingItem) {
    //     state.items.push({
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
    //   const existingItem = state.items.find((item) => item.id === id);
    //   state.totalQuantity--;
    //   state.changed = true;
    //   if (existingItem.quantity === 1) {
    //     state.items = state.items.filter((item) => item.id !== id);
    //   } else {
    //     existingItem.quantity--;
    //     existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
    //   }
    // },
  },
});

export const venueActions = venueSlice.actions;

export default venueSlice;
