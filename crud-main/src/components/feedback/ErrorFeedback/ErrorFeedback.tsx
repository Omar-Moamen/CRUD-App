import { Alert } from "@mui/material"
import { TError } from "../../../types/shared"

const ErrorFeedback = ({ error }: { error: TError }) =>
{
   return (
      <>
         {error && <Alert severity="error">{error}</Alert>}
      </>
   )
}

export default ErrorFeedback;
