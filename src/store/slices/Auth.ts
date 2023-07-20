import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getToken } from "utils";

export type token = string | null;
export type isAuthenticated = boolean;

const API_DELAY = 1000;

export type AuthState = {
  isAuthenticated: isAuthenticated;
  token: token;
  isLoading: boolean;
};

const initialState: AuthState = {
  isAuthenticated: false,
  token: null,
  isLoading: false,
};

export const signIn = createAsyncThunk<
  void,
  { email: string; password: string }
>("auth/signIn", async (data, thunkAPI) => {
  try {
    const response = await getToken(data, 1000);
    return thunkAPI.fulfillWithValue(response.token);
  } catch (error) {
    return thunkAPI.rejectWithValue({
      error: "Wystąpił błąd, spróbuj ponownie później",
    });
  }
});

const AuthSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    signOut() {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signIn.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(signIn.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(signIn.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        token: action.payload as string,
      };
    });
  },
});

export const { signOut } = AuthSlice.actions;

export default AuthSlice.reducer;
