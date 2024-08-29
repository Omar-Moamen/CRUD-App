import { Navigate } from "react-router"
import { useAppSelector } from "../../store/rtkHooks";

type TProtectedRouteProps = {
   children: React.ReactNode;
}

const ProtectedRoute = ({ children }: TProtectedRouteProps) =>
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
