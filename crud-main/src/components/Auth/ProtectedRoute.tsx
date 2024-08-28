import { Navigate } from "react-router"
import { useAppSelector } from "../../store/rtkHooks";
import { jwtDecode } from "jwt-decode";

type TProps = {
   children: React.ReactNode;
}

const ProtectedRoute = ({ children }: TProps) =>
{
   const { token } = useAppSelector(state => state.auth);

   if (!token)
   {
      return (<Navigate to="/login?message=login_required" replace={true} />)
   }

   return (
      <>
         {children}
      </>
   )
}

export default ProtectedRoute;
