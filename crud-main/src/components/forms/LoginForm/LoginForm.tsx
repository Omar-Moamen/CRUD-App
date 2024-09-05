import { useEffect, useState } from "react";
import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../../validations/loginSchema";
import useAuthInfo from "../../../hooks/useAuthInfo";
import { actAuthLogin } from "../../../store/auth/act/actAuthLogin";
import { clearAuthUI } from "../../../store/auth/authSlice";
import PasswordInput from "../PasswordInput/PasswordInput";
import ErrorFeedback from "../../feedback/ErrorFeedback/ErrorFeedback";
import useCurrentMode from "../../../hooks/useCurrentMode";
import Form from "../Form/Form";
import { Alert, Box, Button, CircularProgress, TextField } from "@mui/material"
// Styles
import styles from './styles.module.css';

type TLoginInputs = z.infer<typeof loginSchema>

const { LogForm } = styles;

const LoginForm = () =>
{
   const { dispatch, loading, error } = useAuthInfo();
   const [searchParams, setSearchParams] = useSearchParams();
   const navigate = useNavigate();

   const {
      register,
      handleSubmit,
      formState: { errors } } =
      useForm<TLoginInputs>({
         mode: "onBlur",
         resolver: zodResolver(loginSchema),
      });

   const { currentMode } = useCurrentMode();
   const [showPassword, setShowPassword] = useState(false);

   //Effects
   useEffect(() =>
   {
      return () => { dispatch(clearAuthUI()); }
   }, [dispatch])

   // Handlers
   const onSubmit: SubmitHandler<TLoginInputs> = async (formData) =>
   {
      dispatch(actAuthLogin(formData))
         .unwrap()
         .then(() => navigate('/', { replace: true }))
         .then(() => setSearchParams(""))
         // (err = error) to avoid crashing the app.. already handled error below
         .catch(err => err = error)
   }

   const handleShowPassword = (): void => setShowPassword(!showPassword);

   return (
      <Form
         className={`neonForm ${LogForm}`}
         heading="Login"
         onSubmit={handleSubmit(onSubmit)}
      >
         {
            searchParams.get("message") === "account_created" ? (
               <Alert severity="success">
                  Your account successfully created, please login
               </Alert>
            ) :
               searchParams.get("message") === "login_required" && (
                  <Alert severity="warning">
                     Please login first
                  </Alert>
               )
         }
         <TextField
            id="email"
            {...register('email')}
            label="Email"
            variant="outlined"
            error={!!errors.email}
            helperText={errors.email?.message}
         />
         <PasswordInput
            id='password'
            label='Password'
            register={register}
            showPassword={showPassword}
            handleShowPassword={handleShowPassword}
            error={(errors.password?.message)!}
         />

         <ErrorFeedback error={error} />

         <Box mt="20px"
            display="flex"
            flexDirection={{ xs: "column", sm: "row" }}
            gap="15px"
            alignItems="center"
         >
            <Button
               type="submit"
               sx={{ width: { xs: "100%", sm: "fit-content" } }}
               variant={currentMode === "light" ? "contained" : "outlined"}
               size="large"
               disabled={!!loading}
            >
               {loading && <CircularProgress sx={{ mr: '10px' }} size={20} />}
               Login
            </Button>
            <Button
               sx={{
                  width: { xs: "100%", sm: "fit-content" },
                  ml: "auto",
                  fontWeight: "bold"
               }}
               type="button"
               variant={currentMode === "light" ? "contained" : "outlined"}
               color="secondary"
               size="large"
               component={NavLink}
               to='/register'
            >
               Register
            </Button>
         </Box>
      </Form >
   )
}

export default LoginForm;
