import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from "../../../utils/axiosErrorHandler";

type TProductData = {
   title: string;
   description: string;
   image: string;
   price: number;
   category: string;
}

export const actAddProduct = createAsyncThunk('products/actAddProduct',
   async (productData: TProductData, thunkAPI) =>
   {
      const { rejectWithValue } = thunkAPI;

      try
      {
         const response = await axios.post('/products', productData, {
            headers: {
               "Content-Type": 'application/json',
            }
         })
         return response.data;
      }
      catch (error)
      {
         return rejectWithValue(axiosErrorHandler(error));
      }
   })