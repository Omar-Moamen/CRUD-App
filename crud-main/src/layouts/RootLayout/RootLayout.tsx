import { Box, createTheme, CssBaseline, ThemeProvider } from "@mui/material"
import { Outlet } from "react-router"
import Header from "../../components/common/Header/Header"
import { useMemo, useState } from "react";

const RootLayout = () =>
{
   const [myMode, setMyMode] = useState(localStorage.currentMode || "dark");

   const darkTheme = useMemo(() => createTheme({
      palette: {
         mode: myMode,
      },
   }), [myMode])

   return (
      <ThemeProvider theme={darkTheme}>
         <CssBaseline />
         <Header setMyMode={setMyMode} />
         <Box mt="30px">
            <Outlet />
         </Box>
      </ThemeProvider>
   )
}

export default RootLayout
