import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/rtkHooks"
import { getSingleProduct } from "../store/products/actions/getSingleProduct";
import { cleanProductInfo } from "../store/products/productsSlice";
import { useParams } from "react-router";

const useProductDetails = () =>
{
   const dispatch = useAppDispatch();
   const { token } = useAppSelector(state => state.auth);
   const { productInfo, loading, error } = useAppSelector(state => state.products);
   const { productId } = useParams();

   console.log(productId)

   useEffect(() =>
   {
      const productIdWithToken = { _id: productId!, token, }
      const promise = dispatch(getSingleProduct(productIdWithToken))

      return () =>
      {
         dispatch(cleanProductInfo());
         // promise.abort() will cancel the request if a user bounce occurred
         promise.abort();
      }

   }, [dispatch, productId, token])

   return { productInfo, loading, error, dispatch }
}

export default useProductDetails;
