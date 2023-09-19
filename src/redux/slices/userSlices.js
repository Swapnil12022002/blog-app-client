import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const userRegisterAction = createAsyncThunk(
  "users/register",
  async (user, { rejectWithValue, getState, dispatch }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/v1/users/register",
        user,
        config
      );
      return data;
    } catch (error) {
      if (!error.response) {
        throw error;
      } else {
        return rejectWithValue(error.response.data);
      }
    }
  }
);

const userSlices = createSlice({
  name: "users",
  initialState: {
    userAuth: "login",
  },
  extraReducers: (builder) => {
    builder.addCase(userRegisterAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(userRegisterAction.fulfilled, (state, action) => {
      state.loading = false;
      state.registered = action.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(userRegisterAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action.payload.message;
      state.serverErr = action.error.message;
    });
  },
});

export default userSlices.reducer;
