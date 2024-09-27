import { memo } from "react";
import { useAppDispatch, useAppSelector } from "../../store/rtkHooks";
import { deleteProduct } from "../../store/products/actions/deleteProduct";
import { getSingleProduct } from "../../store/products/actions/getSingleProduct";
import { TProduct } from "../../types/product";
import { useNavigate } from "react-router";
import TooltipButton from "../common/TooltipButton/TooltipButton";
import { TableCell, TableRow } from "@mui/material";
import useCurrentMode from "../../hooks/useCurrentMode";
// Styles
import styles from './styles.module.css';

type TProps = TProduct & {
   idx?: number;
   setOpen: (arg: boolean) => void;
};

const { orderCell, titleCell, btnsContainer } = styles;

const Product = memo(({ _id, title, price, quantity, idx, setOpen }: TProps) =>
{
   const dispatch = useAppDispatch();
   const { token, user } = useAppSelector(state => state.auth);
   const navigate = useNavigate();
   const { currentMode } = useCurrentMode();

   return (
      <>
         <TableRow
            sx={{
               '&:last-child td, &:last-child th': { border: 0 },
               '&:nth-of-type(odd)': {
                  bgcolor: currentMode === "light" ?
                     "whitesmoke" : "#121212"
               },
               '&:nth-of-type(even)': {
                  bgcolor: currentMode === "light" ?
                     "ghostwhite" : ""
               },
            }}
         >
            <TableCell className={orderCell} scope="row"> {`#${idx! + 1}`}</TableCell>
            <TableCell className={titleCell} align="center">{title}</TableCell>
            <TableCell align="center">&#36;{price}</TableCell>
            <TableCell align="center">{quantity}</TableCell>
            <TableCell align="center">
               <div className={btnsContainer}>
                  <TooltipButton
                     text="Details"
                     title="You don't have this permission"
                     placement="top"
                     disabled={token && user ? false : true}
                     color="info"
                     onClick={() =>
                     {
                        setOpen(true);
                        dispatch(getSingleProduct(_id))
                     }}
                  />
                  <TooltipButton
                     text="Edit"
                     title="You don't have this permission"
                     placement="top"
                     disabled={token && user && user.role === "SuperAdmin" ? false : true}
                     color="success"
                     onClick={() => navigate(`${_id}/edit`)}
                  />
                  <TooltipButton
                     text="Delete"
                     title="You don't have this permission"
                     placement="top"
                     disabled={token && user && user.role === "SuperAdmin" ? false : true}
                     color="error"
                     onClick={() => dispatch(deleteProduct({ _id, token }))}
                  />
               </div>
            </TableCell>

         </TableRow>
      </>
   )
})

export default Product;
