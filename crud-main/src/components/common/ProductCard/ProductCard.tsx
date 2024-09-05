import
{
   Card,
   CardMedia,
   CardContent,
   Typography,
} from "@mui/material";
import Loading from "../../feedback/Loading/Loading";
import { TProduct } from "../../../types/product";
import { TLoading } from "../../../types/shared";

type TProps = {
   productInfo: TProduct;
   loading: TLoading;
}
const ProductCard = ({ productInfo, loading }: TProps) =>
{

   return (
      <Loading status={loading} size="150px">
         <Card sx={{ maxWidth: 345, objectPosition: "0 -160px" }}>
            {productInfo ?
               (<>
                  <CardMedia
                     component="img"
                     alt={productInfo?.title}
                     height="280"
                     image="https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c"
                  />
                  <CardContent>
                     <Typography gutterBottom variant="h6" component="div">
                        {productInfo?.title}
                     </Typography>
                     <Typography mb="10px" variant="subtitle1" color="primary">
                        Price: &#36;{productInfo?.price}
                     </Typography>
                     <Typography variant="subtitle1" color="primary">
                        Quantity: {productInfo?.quantity}
                     </Typography>
                  </CardContent>
               </>) :
               (
                  <Typography variant="h5" component="h5">
                     Sorry there is no product to show
                  </Typography>
               )
            }
         </Card>
      </Loading>
   )
}

export default ProductCard;
