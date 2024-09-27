import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import axiosErrorHandler from '../../../utils/axiosErrorHandler';
import { TProduct } from '../../../types/product';
import { getUserToken } from '../../../utils/getUserToken';

type TResponse = {
   product: TProduct[]
};



export const getAllProducts = createAsyncThunk('products/getAllProducts',
   async (_, thunkAPI) =>
   {
      const token = await getUserToken();

      const { rejectWithValue } = thunkAPI;
      try
      {
         const response = await axios.get<TResponse>('http://localhost:8080', {
            headers: {
               Authorization: token,
            }
         });
         return response.data;
      }
      catch (error)
      {
         return rejectWithValue(axiosErrorHandler(error));
      }
   })