import { useForm, SubmitHandler } from 'react-hook-form';
import { useEffect, useState } from "react";
import { z } from 'zod';
import { signUpSchema } from '../../../validations/signUpSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { actAuthRegister } from '../../../store/auth/act/actAuthRegister';
import useAuthInfo from '../../../hooks/useAuthInfo';
import { useNavigate } from 'react-router';
import { clearAuthUI } from '../../../store/auth/authSlice';
import ErrorFeedback from '../../feedback/ErrorFeedback/ErrorFeedback';
import PasswordInput from '../PasswordInput/PasswordInput';
import useCurrentMode from '../../../hooks/useCurrentMode';
import { Box, Button, CircularProgress, MenuItem, TextField } from "@mui/material"
// Styles
import styles from './styles.module.css';
import Form from '../Form/Form';


// Infer the type from typeof signUpSchema 
type TSignUpInputs = z.infer<typeof signUpSchema>

const { SignUpForm, fullNameWrapper } = styles;

const RegisterForm = () =>
{
   const { dispatch, loading, error } = useAuthInfo();
   const navigate = useNavigate();

   const {
      register,
      handleSubmit,
      reset,
      formState: { errors } }
      = useForm<TSignUpInputs>({
         mode: "onBlur",
         resolver: zodResolver(signUpSchema),
      })

   const [showPassword, setShowPassword] = useState(false);
   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

   const { currentMode } = useCurrentMode()

   // Effects
   useEffect(() =>
   {
      return () => { dispatch(clearAuthUI()); }
   }, [dispatch])

   // Handlers
   const handleShowPassword = (): void => setShowPassword(!showPassword);
   const handleShowConfirmPassword = (): void => setShowConfirmPassword(!showConfirmPassword);

   const onSubmit: SubmitHandler<TSignUpInputs> = (formData) =>
   {
      const { firstName, lastName, email, role, password } = formData;
      const userData = {
         username: firstName + lastName,
         email,
         role,
         password
      };
      dispatch(actAuthRegister(userData))
         .unwrap()
         .then(() => navigate('/login?message=account_created'))
         // err = error to avoid crashing the app.. already handled error below
         .catch(err => err = error);
   }

   return (
      <Form
         className={`neonForm ${SignUpForm}`}
         heading="SignUp"
         onSubmit={handleSubmit(onSubmit)}
      >

         <Box className={fullNameWrapper}>
            <TextField
               sx={{ flexGrow: 1, }}
               id="firstName"
               label="First Name"
               {...register('firstName')}
               variant="outlined"
               size="medium"
               error={!!errors.firstName}
               helperText={errors.firstName?.message}
            />
            <TextField
               sx={{ flexGrow: 1 }}
               id="lastName"
               label="Last Name"
               {...register('lastName')}
               variant="outlined"
               error={!!errors.lastName}
               helperText={errors.lastName?.message}
            />
         </Box>
         <TextField
            id="email"
            label="Email"
            {...register('email')}
            variant="outlined"
            error={!!errors.email}
            helperText={errors.email?.message}
         />
         <TextField
            sx={{ flexGrow: 1 }}
            id="role"
            label="Role"
            {...register('role')}
            select
            defaultValue="Admin"
            variant="outlined"
            error={!!errors.role}
            helperText={errors.role?.message}
         >
            <MenuItem value="Admin">
               Admin
            </MenuItem>
            <MenuItem value="SuperAdmin">
               SuperAdmin
            </MenuItem>
         </TextField>
         <PasswordInput
            id='password'
            label='Password'
            register={register}
            showPassword={showPassword}
            handleShowPassword={handleShowPassword}
            error={(errors.password?.message)!}
         />
         <PasswordInput
            id='confirmPassword'
            label='Confirm Password'
            register={register}
            showPassword={showConfirmPassword}
            handleShowPassword={handleShowConfirmPassword}
            error={(errors.confirmPassword?.message)!}
         />

         <ErrorFeedback error={error} />

         <Box mt="20px" display="flex" flexDirection={{ xs: "column", sm: "row" }}
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
               {loading && <CircularProgress sx={{ mr: "10px" }} size={20} />}
               Submit
            </Button>
            <Button
               sx={{ width: { xs: "100%", sm: "fit-content" }, ml: "auto" }}
               variant={currentMode === "light" ? "contained" : "outlined"}
               color="secondary"
               size="large"
               disabled={!!loading}
               onClick={() => reset()}
            >
               Reset
            </Button>
         </Box>
      </Form>
   )
}

export default RegisterForm;
