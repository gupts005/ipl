import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    items: [],
    changed: false,
  },
  reducers: {
    replaceChat(state, action) {
      state.items = action.payload.items;
      state.changed = action.payload.changed;
    },
    updateChat(state, action) {
      const newItem = action.payload;
      // console.log(newItem, " updateItem");
      const existingItem = state.items.find(
        (item) => item.publicChatId === newItem.publicChatId
      );
      // console.log(existingItem, " existing item");
      if (!existingItem) {
        state.items.push({
          userId: newItem.userId,
          message: newItem.message,
          lastName: newItem.lastName,
          profilePicture: newItem.profilePicture,
          firstName: newItem.firstName,
          chatTimestamp: newItem.chatTimestamp,
          publicChatId: newItem.publicChatId,
          status: newItem.status
        });
      }
    },
  },
});

export const chatActions = chatSlice.actions;

export default chatSlice;
