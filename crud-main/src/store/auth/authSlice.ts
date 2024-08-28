import { createSlice } from "@reduxjs/toolkit";
import { actAuthRegister } from "./act/actAuthRegister";
import { actAuthLogin } from "./act/actAuthLogin";
import { isString } from "../../types/guards";
import { jwtDecode } from "jwt-decode";
import { TUser } from "../../types/user";

type TAuthState = {
   token: string | null;
   user: TUser;
   loading: 'idle' | 'pending' | 'succeeded' | 'failed';
   error: string | null;
}

const initialState: TAuthState = {
   token: null,
   user: null,
   loading: 'idle',
   error: null,
}

const authSlice = createSlice({
   name: "auth",
   initialState,
   reducers: {
      clearAuthUI: (state) =>
      {
         state.loading = 'idle';
         state.error = null;
      },
      userLogout: (state) =>
      {
         state.token = null;
         state.user = null;
      }
   },
   extraReducers: (builder) =>
   {
      // Register
      builder
         .addCase(actAuthRegister.pending, (state) =>
         {
            state.loading = 'pending';
            state.error = null;
         })
         .addCase(actAuthRegister.fulfilled, (state) =>
         {
            state.loading = 'succeeded';
            state.error = null;
         })
         .addCase(actAuthRegister.rejected, (state, { payload }) =>
         {
            state.loading = 'failed';
            if (isString(payload))
               state.error = payload;
         })

      // Login
      builder
         .addCase(actAuthLogin.pending, (state) =>
         {
            state.loading = "pending";
            state.error = null;
         })
         .addCase(actAuthLogin.fulfilled, (state, { payload }) =>
         {
            state.loading = "succeeded";
            state.error = null;
            state.token = payload.accessToken;
            state.user = jwtDecode(payload.accessToken);

         })
         .addCase(actAuthLogin.rejected, (state, { payload }) =>
         {
            state.loading = 'failed';
            if (isString(payload))
            {
               state.error = payload;
            }
         })
   }
});


export const { clearAuthUI, userLogout } = authSlice.actions;
export default authSlice.reducer;