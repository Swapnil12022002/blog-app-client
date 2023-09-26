import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlices";
import categoryReducer from "./slices/categorySlices";
const store = configureStore({
  reducer: {
    users: userReducer,
    categories: categoryReducer,
  },
});

export default store;
