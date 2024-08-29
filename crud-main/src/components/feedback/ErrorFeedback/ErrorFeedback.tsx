import { Alert } from "@mui/material"
import { TError } from "../../../types/shared"

type TErrorFeedbackProps = {
   error: TError
   severity?: "warning" | "error"
}
const ErrorFeedback = ({ error, severity = "error" }: TErrorFeedbackProps) =>
{
   return (
      <>
         {error && <Alert severity={severity}>{error}</Alert>}
      </>
   )
}

export default ErrorFeedback;
