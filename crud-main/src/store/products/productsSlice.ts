import { createSlice } from "@reduxjs/toolkit";
import { TProduct } from "../../types/product";
import { TError, TLoading } from "../../types/shared";

import { isString } from "../../types/guards";
import { getAllProducts } from "./actions/getAllProducts";
import { getSingleProduct } from "./actions/getSingleProduct";
import { addProduct } from "./actions/addProduct";
import { updateProduct } from "./actions/updateProduct";
import { deleteProduct } from "./actions/deleteProduct";

type TProductsState = {
   records: TProduct[],
   productInfo: TProduct | null,
   loading: TLoading,
   error: TError,
}

const initialState: TProductsState = {
   records: [],
   productInfo: null,
   loading: false,
   error: null,
}

const productsSlice = createSlice({
   name: 'products',
   initialState,
   reducers: {
      cleanProductInfo: (state) =>
      {
         state.loading = false;
         state.productInfo = null;
      }
   },
   extraReducers: (builder) =>
   {
      // Get All Products
      builder
         .addCase(getAllProducts.pending, (state) =>
         {
            state.loading = true;
            state.error = null;
         })
         .addCase(getAllProducts.fulfilled, (state, { payload }) =>
         {
            state.loading = false;
            state.error = null;
            state.records = payload.product;
         })
         .addCase(getAllProducts.rejected, (state, { payload }) =>
         {
            state.loading = false;
            if (isString(payload))
               state.error = payload;
         })

         // Get Single Product
         .addCase(getSingleProduct.pending, (state) =>
         {
            state.loading = true;
            state.error = null;
         })
         .addCase(getSingleProduct.fulfilled, (state, { payload }) =>
         {
            state.loading = false;
            state.error = null;
            state.productInfo = payload.message;
         })
         .addCase(getSingleProduct.rejected, (state, { payload }) =>
         {
            state.loading = false;
            if (isString(payload))
               state.error = payload;
         })

         // Add Product
         .addCase(addProduct.pending, (state) =>
         {
            state.loading = true;
            state.error = null;
         })
         .addCase(addProduct.fulfilled, (state, { payload }) =>
         {
            state.loading = false;
            state.error = null;
            state.records.push(payload.message);
         })
         .addCase(addProduct.rejected, (state, { payload }) =>
         {
            state.loading = false;
            if (isString(payload))
               state.error = payload;
         })

         // Edit Product
         .addCase(updateProduct.pending, (state) =>
         {
            state.loading = true;
            state.error = null;
         })
         .addCase(updateProduct.fulfilled, (state) =>
         {
            state.loading = false;
            state.error = null;
         })
         .addCase(updateProduct.rejected, (state, { payload }) =>
         {
            state.loading = false;
            if (isString(payload))
               state.error = payload;
         })

         // Delete Product
         .addCase(deleteProduct.pending, (state) =>
         {
            state.loading = true;
            state.error = null;
         })
         .addCase(deleteProduct.fulfilled, (state, { payload }) =>
         {
            state.loading = false;
            state.error = null;
            state.records = state.records.filter(el => (el["_id"] !== payload));
         })
         .addCase(deleteProduct.rejected, (state, { payload }) =>
         {
            state.loading = false;
            if (isString(payload))
               state.error = payload;
         })
   }
})

export const { cleanProductInfo } = productsSlice.actions;
export default productsSlice.reducer;