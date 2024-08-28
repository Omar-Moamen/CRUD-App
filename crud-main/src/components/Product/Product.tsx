import { memo } from "react";
import { useAppDispatch, useAppSelector } from "../../store/rtkHooks";
import { actDeleteProduct } from "../../store/products/act/actDeleteProduct";
import { TProduct } from "../../types/product";
import { useNavigate } from "react-router";
import TooltipButton from "../common/TooltipButton/TooltipButton";
import { TableCell, TableRow } from "@mui/material";
// Styles
import styles from './styles.module.css';


type TProps = TProduct & { idx?: number };

const { orderCell, titleCell, descriptionCell, btnsContainer } = styles;

const Product = memo(({ id, title, description, price, category, idx }: TProps) =>
{
   const dispatch = useAppDispatch();
   const { token, user } = useAppSelector(state => state.auth);
   const navigate = useNavigate();

   return (
      <>
         <TableRow
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
         >
            <TableCell className={orderCell} scope="row">
               {`#${idx! + 1}`}
            </TableCell>
            <TableCell className={titleCell} align="center">{title}</TableCell>
            <TableCell className={descriptionCell} align="center">{description}</TableCell>
            <TableCell align="center">&#36;{price}</TableCell>
            <TableCell align="center">{category}</TableCell>
            <TableCell align="center">
               <div className={btnsContainer}>
                  <TooltipButton
                     text="Details"
                     title="You don't have this permission"
                     placement="top"
                     disabled={token && user ? false : true}
                     color="info"
                     onClick={() => navigate(`products/${id}/product-details`)}
                  />
                  <TooltipButton
                     text="Edit"
                     title="You don't have this permission"
                     placement="top"
                     disabled={token && user && user.sub === "SuperAdmin" ? false : true}
                     color="success"
                     onClick={() => { navigate(`/products/${id}/edit`) }}
                  />
                  <TooltipButton
                     text="Delete"
                     title="You don't have this permission"
                     placement="top"
                     disabled={token && user && user.sub === "SuperAdmin" ? false : true}
                     color="error"
                     onClick={() => dispatch(actDeleteProduct(id))}
                  />
               </div>
            </TableCell>

         </TableRow>
      </>
   )
})

export default Product;
