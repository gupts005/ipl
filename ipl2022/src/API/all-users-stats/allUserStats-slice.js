import { createSlice } from "@reduxjs/toolkit";

const allUserStatsSlice = createSlice({
  name: "allUserStats",
  initialState: {
    items: [],
    changed: false,
  },
  reducers: {
    replaceallUserStats(state, action) {
      state.items = action.payload.items;
    },
    replaceData(state, action) {
      state.changed = true;
      let incoming = action.payload;
      console.log(incoming,' incoming state data');
      // const findsum = (data) => {
        state.items.forEach((element) => {
          let obj = incoming.find(o => o.userId == element.userId);
          if(obj)
          element.availablePoints += obj.contestPoints;
        });
        state.items.sort((obj1,obj2) =>{
          if (obj1.availablePoints < obj2.availablePoints){
            return 1;
          }
          else if(obj1.availablePoints > obj2.availablePoints){
            return -1;
          }
          return 0;    
        });
    }
  },
});

export const allUserStatsActions = allUserStatsSlice.actions;

export default allUserStatsSlice;
