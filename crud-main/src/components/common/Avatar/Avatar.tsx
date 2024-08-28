import { Box, Typography } from '@mui/material'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { TUser } from '../../../types/user';
import styles from './styles.module.css';

type TAvatarProps = {
   user: TUser;
   margin?: string;
}

const { avatar } = styles

const Avatar = ({ user, margin = "initial" }: TAvatarProps) =>
{

   return (
      <Box className={avatar} sx={{ margin: margin }}>
         <AccountCircleOutlinedIcon />
         <Typography variant="body1">
            <Typography
               component="span"
               fontWeight="bold"
               color=""
            >
               {user?.username}
            </Typography>
         </Typography>
      </Box>
   )
}

export default Avatar;
