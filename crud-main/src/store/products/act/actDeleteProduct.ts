import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from "../../../utils/axiosErrorHandler";
import { TProductIdWithToken } from "../../../types/shared";

export const actDeleteProduct = createAsyncThunk('products/actDeleteProduct',
   async (productIdWithToken: TProductIdWithToken, thunkAPI) =>
   {
      const { _id, token } = productIdWithToken;
      const { rejectWithValue } = thunkAPI;
      try
      {
         await axios.delete(`/${_id}`, {
            headers: {
               Authorization: token,
            }
         });

         return _id;
      }
      catch (error)
      {
         return rejectWithValue(axiosErrorHandler(error));
      }
   }
)