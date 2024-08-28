import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import axiosErrorHandler from '../../../utils/axiosErrorHandler';
import { TProduct } from '../../../types/product';

type TResponse = TProduct[];

export const actGetAllProducts = createAsyncThunk('products/actGetAllProducts',
   async (_, thunkAPI) =>
   {
      const { rejectWithValue, signal } = thunkAPI;
      try
      {
         const response = await axios.get<TResponse>('/products', { signal, });
         return response.data;
      }
      catch (error)
      {
         return rejectWithValue(axiosErrorHandler(error));
      }
   })