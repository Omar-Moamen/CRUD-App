import { LightModeSharp, DarkModeOutlined } from '@mui/icons-material';
import { TSetFunc } from '../../../types/shared';
import useCurrentMode from '../../../hooks/useCurrentMode';
import { IconButton } from '@mui/material';
import { useCallback } from 'react';
import { grey } from '@mui/material/colors';

const DarkModeButton = ({ setMyMode }: { setMyMode: TSetFunc }) =>
{

   const { currentMode } = useCurrentMode();

   const themeToggleHandler = useCallback(() =>
   {
      setMyMode(currentMode === "dark" ? "light" : "dark");
      localStorage.setItem("currentMode", currentMode === "dark" ? "light" : "dark");
   }, [currentMode, setMyMode])

   return (
      <IconButton edge="end" aria-label="lightMode-on-off"
         color={currentMode === "light" ? "inherit" : "warning"}
         sx={{
            margin: { xs: "auto 0px", sm: "0 0 0 10px" },
            "&:hover": {
               backgroundColor: currentMode === "light" ? "#aaaaaa1c" : "warning",
            }
         }}
         onClick={themeToggleHandler}>
         {
            currentMode === "dark" ?
               <LightModeSharp /> :
               <DarkModeOutlined />
         }
      </IconButton>
   )
}

export default DarkModeButton
