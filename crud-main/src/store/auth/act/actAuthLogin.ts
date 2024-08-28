import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from "../../../utils/axiosErrorHandler";
import { TLoginData } from "../../../types/shared";

type TResponse = {
   accessToken: string;
   message: string;
}

export const actAuthLogin = createAsyncThunk("auth/actAuthLogin",
   async (formData: TLoginData, thunkAPI) =>
   {
      const { rejectWithValue } = thunkAPI;
      try
      {
         const response = await axios.post<TResponse>('http://localhost:8080/login', formData);
         return response.data;
      }
      catch (error)
      {
         return rejectWithValue(axiosErrorHandler(error));
      }
   }
);