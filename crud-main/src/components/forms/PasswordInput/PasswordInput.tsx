import { FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material'
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { FieldValues, Path, UseFormRegister } from 'react-hook-form';

type TInputProps<TFieldValue extends FieldValues> = {
   id: Path<TFieldValue>;
   label: string;
   showPassword: boolean;
   handleShowPassword: () => void;
   error: string;
   register: UseFormRegister<TFieldValue>;
}

const PasswordInput = <TFieldValue extends FieldValues>({
   id,
   label,
   showPassword,
   handleShowPassword,
   error,
   register }: TInputProps<TFieldValue>) =>
{
   return (
      <>
         <FormControl variant="outlined" error={!!error}>
            <InputLabel htmlFor={id}>{label}</InputLabel>
            <OutlinedInput
               id={id}
               type={showPassword ? 'text' : 'password'}
               error={!!error}
               {...register(id)}
               endAdornment={
                  <InputAdornment position="end">
                     <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleShowPassword}
                        size="small"
                        edge="start"
                     >
                        {showPassword ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
                     </IconButton>
                  </InputAdornment>
               }
               label={label}
            />
            <FormHelperText>{error}</FormHelperText>
         </FormControl>
      </>
   )
}

export default PasswordInput
