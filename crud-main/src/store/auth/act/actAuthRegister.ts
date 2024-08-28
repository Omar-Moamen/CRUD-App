import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from "../../../utils/axiosErrorHandler";
import { TRegisterData } from "../../../types/shared";

export const actAuthRegister = createAsyncThunk('auth/actAuthRegister',
   async (formData: TRegisterData, thunkAPI) =>
   {
      const { rejectWithValue } = thunkAPI;
      try
      {
         const response = await axios.post('http://localhost:8080/register', formData);
         return response.data;
      }
      catch (error)
      {
         return rejectWithValue(axiosErrorHandler(error))
      }
   })