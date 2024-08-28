import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from "../../../utils/axiosErrorHandler";
import { TProduct } from "../../../types/product";

export const actUpdateProduct = createAsyncThunk('products/edit',
   async (product: TProduct, thunkAPI) =>
   {
      const { rejectWithValue, signal } = thunkAPI;

      try
      {
         const response = await axios.patch(
            `products/${product.id}`,
            product,
            { signal, }
         )
         return response.data;
      }
      catch (error)
      {
         return rejectWithValue(axiosErrorHandler(error));
      }
   })