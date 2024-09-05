import { TProduct } from "../../../../types/product";
import { TLoading } from "../../../../types/shared";
import Loading from "../../../feedback/Loading/Loading";
import ProductCard from "../../ProductCard/ProductCard";
import { Dialog, DialogContent } from "@mui/material";

type TProps = {
   productInfo: TProduct;
   open: boolean;
   onClose: () => void;
   loading: TLoading;
}

const ProductDetailsModal = ({ productInfo, open, onClose, loading }: TProps) =>
{
   return (
      <Dialog
         open={open}
         onClose={onClose}
         aria-labelledby="alert-dialog-title"
         aria-describedby="alert-dialog-description"
      >
         <DialogContent sx={{ p: 0 }}>

            <Loading status={loading} size="150px">
               <ProductCard productInfo={productInfo!} />
            </Loading>

         </DialogContent>
      </Dialog>
   )
}

export default ProductDetailsModal
