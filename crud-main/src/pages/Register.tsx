import { Navigate } from "react-router";
import RegisterForm from "../components/forms/RegisterForm/RegisterForm"
import useAuthInfo from "../hooks/useAuthInfo";

const Register = () =>
{
   const { token, user } = useAuthInfo();

   if (token || user)
   {
      return <Navigate to="/" replace={true} />;
   }

   return (
      <RegisterForm />
   )
}

export default Register
