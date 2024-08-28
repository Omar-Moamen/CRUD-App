import { Container, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import LottieHandler from '../components/feedback/LottieHandler/LottieHandler';

const Error = () =>
{
   return (
      <Container
         maxWidth="md"
         sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: "center",
            textAlign: "center",
            pt: "8rem",
         }}
      >
         <LottieHandler type={"notFound"} width='450px' />

         <Typography
            component={NavLink}
            to="/"
            variant="h6"
            color="primary"
            display="block"
            sx={{ textDecoration: "none" }}
         >
            How about returning to safety?
         </Typography>
      </Container>
   )
}

export default Error
