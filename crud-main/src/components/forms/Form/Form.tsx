import { Box, Divider, Typography } from "@mui/material"
import useCurrentMode from "../../../hooks/useCurrentMode"
import { grey } from "@mui/material/colors";

type TFormProps = {
   children: React.ReactNode;
   heading?: string;
   className?: string;
   divider?: boolean;
   bgColor?: string;
   onSubmit?: React.FormEventHandler<HTMLFormElement> | undefined;
}

const Form = ({
   children,
   heading,
   className,
   bgColor,
   divider = true,
   onSubmit
}: TFormProps) =>
{
   const { currentMode } = useCurrentMode();

   return (
      <Box
         component="form"
         className={className}
         bgcolor={!bgColor ?
            (currentMode === "light" ? grey[100] : grey[900]) : bgColor}
         onSubmit={onSubmit}
      >
         <Typography variant="h5" component="h5" color="primary">
            {heading}
         </Typography>
         {divider && <Divider sx={{ mb: "20px" }} />}
         {children}
      </Box>
   )
}

export default Form;
