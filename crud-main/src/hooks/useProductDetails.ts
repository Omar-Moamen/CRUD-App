import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/rtkHooks"
import { actGetSingleProduct } from "../store/products/act/actGetSingleProduct";
import { useParams } from "react-router";
import { cleanProductInfo } from "../store/products/productsSlice";

const useProductDetails = () =>
{
   const dispatch = useAppDispatch();
   const { token } = useAppSelector(state => state.auth)
   const { productInfo, loading, error } = useAppSelector(state => state.products);
   const { productId } = useParams();

   useEffect(() =>
   {
      if (token && productId)
      {
         const productIdWithToken = { _id: productId, token, }
         const promise = dispatch(actGetSingleProduct(productIdWithToken))

         return () =>
         {
            dispatch(cleanProductInfo());
            // promise.abort() will cancel the request if a user bounce occurred
            promise.abort();
         }
      }
   }, [dispatch, productId, token])

   return { productInfo, loading, error, dispatch }
}

export default useProductDetails;
