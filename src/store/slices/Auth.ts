import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { supabase } from "api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "utils/constants";

export type token = string | null;
export type isAuthenticated = boolean;

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

export type AuthData = {
  email: string;
  password: string;
};

export const signIn = createAsyncThunk(
  "auth/signIn",
  async (credentials: AuthData, thunkAPI) => {
    try {
      await supabase.auth.signInWithPassword(credentials);
      return thunkAPI.dispatch(authenticate());
    } catch (error) {
      return thunkAPI.rejectWithValue({
        error: "Wystąpił błąd, spróbuj ponownie później",
      });
    }
  },
);

export const authenticate = createAsyncThunk(
  "auth/autenticate",
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem(ACCESS_TOKEN);
      const refreshToken = localStorage.getItem(REFRESH_TOKEN);
      if (!token && !refreshToken) {
        const session = await supabase.auth.getSession();
        const { access_token, refresh_token } = session?.data?.session || {};
        localStorage.setItem(ACCESS_TOKEN, access_token as string);
        localStorage.setItem(REFRESH_TOKEN, refresh_token as string);
        return thunkAPI.fulfillWithValue(access_token as string);
      }
      const response = await supabase.auth.setSession({
        access_token: token as string,
        refresh_token: refreshToken as string,
      });
      const { error, data } = response;
      if (error) {
        return thunkAPI.rejectWithValue({
          error: "Wystąpił błąd, spróbuj ponownie później",
        });
      }
      const { access_token, refresh_token } = data?.session || {};
      localStorage.setItem(ACCESS_TOKEN, access_token as string);
      localStorage.setItem(REFRESH_TOKEN, refresh_token as string);
      return thunkAPI.fulfillWithValue(access_token as string);
    } catch (error) {
      return thunkAPI.rejectWithValue({
        error: "Wystąpił błąd, spróbuj ponownie później",
      });
    }
  },
);

export const signUp = createAsyncThunk(
  "auth/signUp",
  async (data: AuthData, thunkAPI) => {
    try {
      await supabase.auth.signUp(data);
      return thunkAPI.fulfillWithValue("success");
    } catch (error) {
      return thunkAPI.rejectWithValue({
        error: "Wystąpił błąd, spróbuj ponownie później",
      });
    }
  },
);

const AuthSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    signOut(state) {
      state.isAuthenticated = false;
      state.isLoading = false;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signIn.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(signIn.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(signUp.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(signUp.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(authenticate.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(authenticate.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(
      authenticate.fulfilled,
      (state, action: PayloadAction<string>) => {
        console.log("test");
        state.isAuthenticated = true;
        state.isLoading = false;
        state.token = action.payload;
      },
    );
  },
});

export const { signOut } = AuthSlice.actions;

export default AuthSlice.reducer;
