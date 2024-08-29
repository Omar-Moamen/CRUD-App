import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from "../../../utils/axiosErrorHandler";
import { TToken } from "../../../types/shared";

type TProductWithToken = {
   token: TToken;
   title: string;
   price: number;
   quantity: number;
}

export const actAddProduct = createAsyncThunk('products/actAddProduct',
   async (productWithToken: TProductWithToken, thunkAPI) =>
   {
      const { token, title, price, quantity } = productWithToken;
      const { rejectWithValue } = thunkAPI;

      try
      {
         const response = await axios.post('http://localhost:8080', {}, {
            headers: {
               Authorization: token,
               title,
               price,
               quantity,
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