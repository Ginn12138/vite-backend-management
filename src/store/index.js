import { configureStore } from "@reduxjs/toolkit";
import tabReducer from "./reducers/tabSlice";

export default configureStore({
  reducer: { tab: tabReducer },
});
