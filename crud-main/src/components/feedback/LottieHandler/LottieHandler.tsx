import Lottie from 'lottie-react';
import notFound from '../../../assets/lottieFiles/not-found.json';
import empty from '../../../assets/lottieFiles/empty.json';
import loading from '../../../assets/lottieFiles/loading.json';
import { Box, Typography } from '@mui/material';
// Styles
import styles from './styles.module.css';

const lottieHandlerMap = {
   notFound,
   empty,
   loading,
}

type TLottieHandlerProps = {
   type: keyof typeof lottieHandlerMap;
   message?: string;
   width?: string;
}

const { lottieWrapper } = styles;

const LottieHandler = ({ type, message, width }: TLottieHandlerProps) =>
{
   const lottie = lottieHandlerMap[type];

   return (
      <Box className={lottieWrapper}>
         <Lottie animationData={lottie} style={{ width: width }} />
         {
            message &&
            <Typography variant="h6" fontWeight="bold" color="primary">
               {message}
            </Typography>
         }
      </Box>
   )
}

export default LottieHandler
