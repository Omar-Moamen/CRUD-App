import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from "../../../utils/axiosErrorHandler";



export const actGetSingleProduct = createAsyncThunk("products/actGetSingleProduct",
   async (productId: number, thunkAPI) =>
   {
      const { rejectWithValue, signal } = thunkAPI;
      try
      {
         const response = await axios.get(`products/${productId}`, { signal, });
         return response.data;
      }
      catch (error)
      {
         return rejectWithValue(axiosErrorHandler(error));
      }
   })