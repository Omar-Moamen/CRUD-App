import { TSetFunc } from '../../../types/shared';
import { NavLink } from 'react-router-dom';
import useAuthInfo from '../../../hooks/useAuthInfo';
import
{
   Box,
   Button,
   Divider,
   Drawer,
   List,
   ListItem,
   ListItemButton,
   ListItemText,
   Typography,
} from '@mui/material';
// Styles
import styles from './styles.module.css';
import DarkModeButton from '../DarkModeButton/DarkModeButton';
import Avatar from '../Avatar/Avatar';


type TDrawerProps = {
   handleDrawerToggle: () => void;
   setMyMode: TSetFunc;
   mobileOpen: boolean;
   logoutHandler: () => void;
}

const { welcomeMessage, logoutBtn } = styles

const DrawerAppBar = ({
   handleDrawerToggle,
   setMyMode,
   mobileOpen,
   logoutHandler }: TDrawerProps) =>
{
   const { token, user } = useAuthInfo()

   const drawerWidth = 240;


   const drawer = (
      <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center', px: "10px" }}>
         <Avatar user={user} margin='20px 0px !important' />

         <Divider sx={{ mb: "5px" }} />
         <DarkModeButton setMyMode={setMyMode} />
         <Divider sx={{ mt: "5px" }} />

         <List sx={{ height: 'calc(100vh - 100px)' }}>

            <ListItem disablePadding>
               <ListItemButton component={NavLink} to='/'>
                  <ListItemText sx={{ textAlign: "center" }} primary={"Home"} />
               </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
               <ListItemButton component={NavLink} to='profile'>
                  <ListItemText sx={{ textAlign: "center" }} primary={"Profile"} />
               </ListItemButton>
            </ListItem>

            <Divider sx={{ mt: "15px" }} />

            <Box display={"block"} marginTop={"25px"}>

               {!token ?
                  (<>
                     <ListItem disablePadding>
                        <ListItemButton component={NavLink} to='register'>
                           <ListItemText sx={{ textAlign: "center" }} primary={"Register"} />
                        </ListItemButton>
                     </ListItem>
                     <ListItem disablePadding>
                        <ListItemButton component={NavLink} to='login'>
                           <ListItemText sx={{ textAlign: "center" }} primary={"Login"} />
                        </ListItemButton>
                     </ListItem>
                  </>) :
                  (
                     <>
                        <ListItem sx={{ width: '100%', mt: "20px" }} disablePadding>
                           <Button
                              className={logoutBtn} variant='outlined'
                              color='error'
                              onClick={logoutHandler}
                              size='large'
                           >
                              Logout
                           </Button>
                        </ListItem>
                     </>
                  )
               }
            </Box>
         </List>
      </Box>
   );

   return (
      <nav>
         <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
               keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
               display: { xs: 'block', sm: 'none' },
               '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
         >
            {drawer}
         </Drawer>
      </nav>
   )
}

export default DrawerAppBar
