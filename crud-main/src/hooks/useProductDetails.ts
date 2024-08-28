import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/rtkHooks"
import { actGetSingleProduct } from "../store/products/act/actGetSingleProduct";
import { useParams } from "react-router";
import { cleanProductInfo } from "../store/products/productsSlice";

const useProductDetails = () =>
{
   const dispatch = useAppDispatch();
   const { productInfo, loading, error } = useAppSelector(state => state.products);
   const { productId } = useParams();

   useEffect(() =>
   {
      const promise = dispatch(actGetSingleProduct(Number(productId)))

      return () =>
      {
         dispatch(cleanProductInfo());
         // promise.abort() will cancel the request if a user bounce occurred
         promise.abort();
      }
   }, [dispatch, productId])

   return { productInfo, loading, error, dispatch }
}

export default useProductDetails;
