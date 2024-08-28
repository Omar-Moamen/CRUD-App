import { Navigate } from "react-router";
import UpdateProductForm from "../components/forms/UpdateProductForm/UpdateProductForm"
import useAuthInfo from "../hooks/useAuthInfo"

const UpdateProduct = () =>
{
   const { user, token } = useAuthInfo();

   if (!token || (user?.sub !== "SuperAdmin"))
   {
      return <Navigate to='/' replace={true} />
   }

   return (
      <>
         <UpdateProductForm />
      </>
   )
}

export default UpdateProduct
