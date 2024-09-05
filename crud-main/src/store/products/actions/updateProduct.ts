import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from "../../../utils/axiosErrorHandler";
import { TProduct } from "../../../types/product";
import { TToken } from "../../../types/shared";

type TProductWithToken = TProduct & {
   token: TToken
}

export const updateProduct = createAsyncThunk('products/updateProduct',
   async (productWithToken: TProductWithToken, thunkAPI) =>
   {
      const { token, _id, title, price, quantity } = productWithToken;
      const { rejectWithValue, signal } = thunkAPI;

      try
      {
         const response = await axios.put(`/${_id}`,
            {
               title,
               price,
               quantity
            },
            {
               headers: { Authorization: token, },
               signal,
            }

         )
         return response.data;
      }
      catch (error)
      {
         return rejectWithValue(axiosErrorHandler(error));
      }
   })