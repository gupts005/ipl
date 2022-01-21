import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "users",
  initialState: {
    items: [],
    changed: false,
  },
  reducers: {
    replaceUsers(state, action) {
      state.items = action.payload.items;
    },
    addUser(state, action) {
      const newItem = action.payload;
      console.log(newItem, " newItem");
      const existingItem = state.items.find(
        (item) => item.userId === newItem.userId
      );
      console.log(existingItem, " existing item");
      // state.changed = true;
      if (!existingItem) {
        state.changed = true;
        state.items.push({
          firstName: newItem.firstName,
          lastName: newItem.lastName,
          genderId: newItem.genderId,
          genderName: newItem.genderName,
          username: newItem.username,
          password: newItem.password,
          profilePicture: newItem.profilePicture,
          roleId: newItem.roleId,
          roleName: newItem.roleName,
          availablePoints: newItem.availablePoints,
          status: newItem.status,
          mobileNumber: newItem.mobileNumber,
          email: newItem.email,
        });
      }
    },
    updateUser(state, action) {
      const newItem = action.payload;
      console.log(newItem, " updateItem");
      const existingItem = state.items.find(
        (item) => item.userId === newItem.userId
      );
      console.log(existingItem, " existing item");
      if (existingItem) {
        state.changed = true;
        let a = state.items.map((item) =>
          item.userId === newItem.userId
            ? {
                ...item,
                firstName: newItem.firstName,
                lastName: newItem.lastName,
                genderId: newItem.genderId,
                username: newItem.username,
                profilePicture: newItem.profilePicture,
                availablePoints: newItem.availablePoints,
                mobileNumber: newItem.mobileNumber,
                email: newItem.email
              }
            : item
        );
        state.items = a;
      }
    },
    deleteUser(state, action) {
      const id = action.payload;
      console.log(id);
      const existingItem = state.items.find((item) => item.userId === id);
      console.log(existingItem, " deleting existing item");
      if (existingItem) {
        state.changed = true;
        state.items = state.items.filter((item) => item.userId !== id);
      }
    },
    updateActiveStatus(state, action) {
      const data = action.payload;
      console.log(data, " payload of status");
      const existingItem = state.items.find(
        (item) => item.userId === data.userId
      );
      console.log(existingItem, " status existing item");
      if (existingItem) {
        state.changed = true;
        let a = state.items.map((item) =>
          item.userId === data.userId
            ? {
                ...item,
                status: data.status,
              }
            : item
        );
        state.items = a;
        console.log(a);
      }
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice;
