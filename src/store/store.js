import { configureStore } from "@reduxjs/toolkit";
import dataSlice from "./reducer/data";

const store = configureStore({
  reducer: { data: dataSlice.reducer },
});

export default store;
