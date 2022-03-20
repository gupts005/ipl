import { createSlice } from "@reduxjs/toolkit";

const userByIdSlice = createSlice({
  name: "userById",
  initialState: {
    items: [],
    changed: false,
  },
  reducers: {
    replaceUserById(state, action) {
      state.changed = action.payload.changed;
      state.items = action.payload.items;
    },
    updateUser(state, action) {
      const newItem = action.payload.items;
      let oldItem = state.items;
      oldItem.firstName = newItem.firstName;
      oldItem.lastName = newItem.lastName;
      oldItem.email = newItem.email;
      oldItem.mobileNumber = newItem.mobileNumber;
      if (newItem.profilePicture !== 'https://firebasestorage.googleapis.com/v0/b/sportsgeek-74e1e.appspot.com/o/null?alt=media') {
        oldItem.profilePicture = newItem.profilePicture;
      }
      oldItem.genderId = newItem.genderId;
      const combinedData = {...oldItem};
      console.log(combinedData,'combinedData  combinedData');
      state.changed = true;
      state.items = combinedData;
    },
  },
});

export const userByIdActions = userByIdSlice.actions;

export default userByIdSlice;
