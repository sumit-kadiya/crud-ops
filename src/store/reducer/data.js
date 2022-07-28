import { createSlice } from "@reduxjs/toolkit";

const dataSlice = createSlice({
  name: "data",
  initialState: {
    data: [],
  },
  reducers: {
    setdata(state, action) {
      state.data = action.payload;
    },
    addData(state, action) {
      const newUser = action.payload;
      state.data.push({
        id: newUser.id,
        first_name: newUser.fname,
        last_name: newUser.lname,
        email: newUser.email,
        avatar: "https://statinfer.com/wp-content/uploads/dummy-user.png",
      });
    },
    deleteData(state, action) {
      const id = action.payload;
      state.data = state.data.filter((item) => item.id !== id);
    },
  },
});

export const dataActions = dataSlice.actions;

export default dataSlice;
