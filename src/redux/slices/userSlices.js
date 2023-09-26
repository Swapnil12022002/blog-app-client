import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURL } from "../../utils/baseURL";

export const userRegisterAction = createAsyncThunk(
  "users/register",
  async (user, { rejectWithValue }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const { data } = await axios.post(
        `${baseURL}/api/v1/users/register`,
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

export const userLoginAction = createAsyncThunk(
  "users/login",
  async (userData, { rejectWithValue }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const { data } = await axios.post(
        `${baseURL}/api/v1/users/login`,
        userData,
        config
      );
      localStorage.setItem("userInfo", JSON.stringify(data));
      return data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const userLogoutAction = createAsyncThunk(
  "users/logout",
  async (user, { rejectWithValue }) => {
    try {
      localStorage.removeItem("userInfo");
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

const userLoginFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const userSlices = createSlice({
  name: "users",
  initialState: {
    userAuth: userLoginFromStorage,
  },
  extraReducers: (builder) => {
    //register
    builder.addCase(userRegisterAction.pending, (state) => {
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

    //login
    builder.addCase(userLoginAction.pending, (state) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(userLoginAction.fulfilled, (state, action) => {
      state.loading = false;
      state.userAuth = action.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(userLoginAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action.payload.message;
      state.serverErr = action.error.message;
    });

    //logout
    builder.addCase(userLogoutAction.pending, (state) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(userLogoutAction.fulfilled, (state) => {
      state.loading = false;
      state.userAuth = undefined;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(userLogoutAction, (state, action) => {
      state.loading = false;
      state.appErr = action.payload.message;
      state.serverErr = action.error.message;
    });
  },
});

export default userSlices.reducer;
