import { Card, CardMedia, CardContent, Typography, } from "@mui/material";
import { TProduct } from "../../../types/product";

type TProps = {
   productInfo: TProduct;
}
const ProductCard = ({ productInfo }: TProps) =>
{

   return (
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
               <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                     Sorry there is no product to show
                  </Typography>
               </CardContent>
            )
         }
      </Card>
   )
}

export default ProductCard;
