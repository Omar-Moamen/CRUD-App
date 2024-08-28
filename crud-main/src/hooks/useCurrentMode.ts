import { useTheme } from "@mui/material";

function useCurrentMode()
{
   const theme = useTheme();
   const currentMode = theme.palette.mode;

   return { currentMode };
}

export default useCurrentMode;
