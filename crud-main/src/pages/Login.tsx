import { Navigate } from "react-router";
import LoginForm from "../components/forms/LoginForm/LoginForm"
import useAuthInfo from "../hooks/useAuthInfo";

const Login = () =>
{
   const { token, user } = useAuthInfo();

   if (token || user)
   {
      return <Navigate to="/" replace={true} />;
   }

   return (
      <LoginForm />
   )
}

export default Login
