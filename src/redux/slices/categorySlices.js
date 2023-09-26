import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURL } from "../../utils/baseURL";

export const createCategoryAction = createAsyncThunk(
  "categories/create",
  async (category, { rejectWithValue, getState }) => {
    const user = getState().users;
    const { userAuth } = user;
    const token = userAuth?.token;
    const config = {
      headers: {
        "Content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await axios.post(
        `${baseURL}/api/v1/categories`,
        category,
        config
      );
      return data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

const categorySlices = createSlice({
  name: "categories",
  initialState: {},
  extraReducers: (builder) => {
    builder.addCase(createCategoryAction.pending, (state) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(createCategoryAction.fulfilled, (state, action) => {
      state.loading = false;
      state.category = action.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(createCategoryAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action.payload.message;
      state.serverErr = action.error.message;
    });
  },
});

export default categorySlices.reducer;
