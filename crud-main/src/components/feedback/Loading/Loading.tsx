import { TLoading } from "../../../types/shared"
import LottieHandler from "../LottieHandler/LottieHandler";

type TLoadingProps = {
   status: TLoading;
   children: React.ReactNode;
   size?: string;
}

const Loading = ({ children, status, size = "200px" }: TLoadingProps) =>
{

   if (status === "pending")
   {
      return <LottieHandler type="loading" width={size} />
   }

   return (
      <>
         {children}
      </>
   )
}

export default Loading
