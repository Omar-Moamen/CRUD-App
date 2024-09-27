import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/rtkHooks"
import { getSingleProduct } from "../store/products/actions/getSingleProduct";
import { cleanProductInfo } from "../store/products/productsSlice";
import { useParams } from "react-router";

const useProductDetails = () =>
{
   const dispatch = useAppDispatch();
   const { productInfo, loading, error } = useAppSelector(state => state.products);
   const { productId } = useParams();

   console.log(productId)

   useEffect(() =>
   {
      const promise = dispatch(getSingleProduct(productId!))

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
