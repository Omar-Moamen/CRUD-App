import { memo } from "react";
import { useAppDispatch, useAppSelector } from "../../store/rtkHooks";
import { actDeleteProduct } from "../../store/products/act/actDeleteProduct";
import { TProduct } from "../../types/product";
import { useNavigate } from "react-router";
import TooltipButton from "../common/TooltipButton/TooltipButton";
import { TableCell, TableRow } from "@mui/material";
// Styles
import styles from './styles.module.css';
import useCurrentMode from "../../hooks/useCurrentMode";

type TProps = TProduct & { idx?: number };

const { orderCell, titleCell, btnsContainer } = styles;

const Product = memo(({ _id, title, price, quantity, idx }: TProps) =>
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
                     onClick={() => navigate(`products/${_id}`)}
                  />
                  <TooltipButton
                     text="Edit"
                     title="You don't have this permission"
                     placement="top"
                     disabled={token && user && user.sub === "SuperAdmin" ? false : true}
                     color="success"
                     onClick={() => { navigate(`/products/${_id}/edit`) }}
                  />
                  <TooltipButton
                     text="Delete"
                     title="You don't have this permission"
                     placement="top"
                     disabled={token && user && user.sub === "SuperAdmin" ? false : true}
                     color="error"
                     onClick={() => dispatch(actDeleteProduct({ _id, token }))}
                  />
               </div>
            </TableCell>

         </TableRow>
      </>
   )
})

export default Product;
