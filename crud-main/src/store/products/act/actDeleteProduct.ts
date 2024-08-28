import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from "../../../utils/axiosErrorHandler";

export const actDeleteProduct = createAsyncThunk('products/actDeleteProduct',
   async (productId: number, thunkAPI) =>
   {
      const { rejectWithValue } = thunkAPI;
      try
      {
         await axios.delete(`/products/${productId}`);

         return productId;
      }
      catch (error)
      {
         return rejectWithValue(axiosErrorHandler(error));
      }
   }
)