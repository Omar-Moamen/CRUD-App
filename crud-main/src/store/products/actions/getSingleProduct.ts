import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from "../../../utils/axiosErrorHandler";
import { getUserToken } from "../../../utils/getUserToken";

export const getSingleProduct = createAsyncThunk("products/getSingleProduct",
   async (_id: string, thunkAPI) =>
   {
      const { rejectWithValue, signal } = thunkAPI;
      const token = await getUserToken();

      try
      {
         const response = await axios.get(`http://localhost:8080/${_id}`, {
            headers: {
               Authorization: token,
            },
            signal,
         });
         return response.data;
      }
      catch (error)
      {
         return rejectWithValue(axiosErrorHandler(error));
      }
   })