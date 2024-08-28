import { Box, Container, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import LottieHandler from '../components/feedback/LottieHandler/LottieHandler';

const Error = () =>
{
   return (
      <Container maxWidth="md">
         <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="space-around"
            position="absolute"
            top="40%"
            left="50%"
            sx={{ translate: "-50% -50%" }}
         >

            <LottieHandler type={"notFound"} width='450px' />

            <Box>
               <Typography
                  component={NavLink}
                  to="/"
                  variant="h6"
                  color="primary"
                  display="block"
                  mt="15rem"
                  sx={{ textDecoration: "none" }}
               >
                  How about returning to safety?
               </Typography>
            </Box>
         </Box>
      </Container>
   )
}

export default Error
