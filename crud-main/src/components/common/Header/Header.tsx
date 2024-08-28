import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import useAuthInfo from '../../../hooks/useAuthInfo';
import { userLogout } from '../../../store/auth/authSlice';
import { TSetFunc } from '../../../types/shared';
import
{
   AppBar,
   Box,
   CssBaseline,
   IconButton,
   Toolbar,
   Typography,
   Button,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DrawerAppBar from '../DrawerAppBar/DrawerAppBar';
import { cyan, grey } from '@mui/material/colors';
// Styles
import styles from './styles.module.css';
import DarkModeButton from '../DarkModeButton/DarkModeButton';
import Avatar from '../Avatar/Avatar';




const toolbarStyles = {
   '&.MuiToolbar-root': { minHeight: "100%" },
   overFlow: "hidden",
}

const navBtnOverrides = {
   color: "#FFF",
   height: "100% !important",
   borderRadius: '2px',
   mx: "10px",
   "&:hover": {
      color: cyan[400],
      backgroundColor: "transparent"
   }
};

const { mainHeader, logo } = styles;

const Header = ({ setMyMode }: { setMyMode: TSetFunc }) =>
{
   const { dispatch, token, user } = useAuthInfo()

   const [mobileOpen, setMobileOpen] = useState(false);


   const handleDrawerToggle = (): void =>
   {
      setMobileOpen((prevState) => !prevState);
   };

   const userLogoutHandler = () =>
   {
      dispatch(userLogout())
   }

   return (
      <header className={mainHeader}>
         <CssBaseline />
         <AppBar component="nav" sx={{ height: "72px", bgcolor: grey[900] }}>
            <Toolbar sx={toolbarStyles}>
               <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerToggle}
                  sx={{ mr: 2, display: { sm: 'none' } }}
               >
                  <MenuIcon />
               </IconButton>

               <Button
                  className={logo}
                  component={NavLink}
                  sx={{
                     display: { xs: 'none', sm: 'block' },
                     color: grey[50],
                     "&:hover": {
                        color: grey[300],
                        backgroundColor: "transparent"
                     }
                  }}
                  to="/"
               >
                  CRUD-APP
               </Button>

               <Box
                  sx={{
                     display: { xs: 'none', sm: 'flex' },
                     alignItems: "center",
                     flexGrow: 1
                  }}
               >
                  <Button sx={navBtnOverrides} component={NavLink} to='/'>
                     Home
                  </Button>
                  <Button sx={navBtnOverrides} component={NavLink} to='profile'>
                     Profile
                  </Button>
               </Box>

               <Box
                  sx={{
                     display: { xs: 'none', sm: 'flex' },
                     alignItems: "center",
                     height: "100%",
                  }}
               >
                  {
                     !token ? (
                        <>
                           <Button sx={navBtnOverrides} component={NavLink} to='login'>
                              Login
                           </Button>
                           <Typography component="span" mx=".5rem">|</Typography>
                           <Button sx={navBtnOverrides} component={NavLink} to='register'>
                              Sign Up
                           </Button>
                        </>
                     ) :
                        (
                           <>
                              <Avatar user={user} />
                              <Button
                                 sx={{ textTransform: "capitalize" }}
                                 variant='outlined'
                                 size='small'
                                 color='error'
                                 onClick={userLogoutHandler}
                              >
                                 Logout
                              </Button>
                           </>
                        )
                  }
                  <DarkModeButton setMyMode={setMyMode} />
               </Box>
            </Toolbar>
         </AppBar>

         <Box component="main" sx={{ p: 3 }}>
            <Toolbar />
         </Box>
         <DrawerAppBar
            handleDrawerToggle={handleDrawerToggle}
            mobileOpen={mobileOpen}
            logoutHandler={userLogoutHandler}
            setMyMode={setMyMode}
         />
      </header>
   );
}

export default Header;