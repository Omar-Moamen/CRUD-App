import useAuthInfo from '../../../../hooks/useAuthInfo';
import { useState } from 'react';
import AddProductForm from '../../../forms/AddProductForm/AddProductForm';
import TooltipButton from '../../TooltipButton/TooltipButton';
// MUI
import { Backdrop, Box, Modal, Fade } from '@mui/material';
// Styles
import styles from './styles.module.css';

const { modalBtn, addProductContainer } = styles;

export default function AddProductModal()
{
   const { token, user } = useAuthInfo()
   const [open, setOpen] = useState(false);
   const handleOpen = () => setOpen(true);
   const handleClose = () => setOpen(false);

   return (
      <div style={{ width: 'fit-content', margin: 'auto' }}>
         <TooltipButton
            className={modalBtn}
            text="Add Product"
            title="You don't have this permission"
            placement='top'
            size="medium"
            color="success"
            disabled={token && user ? false : true}
            onClick={handleOpen}
         />

         <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            aria-modal
            aria-hidden={false}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
               backdrop: {
                  timeout: 500,
               },
            }}
         >
            <Fade in={open}>
               <Box
                  className={addProductContainer}
                  sx={{
                     bgcolor: 'background.paper',
                     boxShadow: 24,
                     width: { xs: "255px", sm: "400px" },
                     p: { xs: "1.25rem", sm: "2rem" },
                  }}>

                  <AddProductForm setOpenModal={setOpen} />

               </Box>
            </Fade>
         </Modal>
      </div>
   );
}