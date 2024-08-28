import
{
  Container,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Alert,
} from "@mui/material";
import useProductDetails from "../hooks/useProductDetails";
import Loading from "../components/feedback/Loading/Loading";
import useAuthInfo from "../hooks/useAuthInfo";
import { Navigate } from "react-router";

const ProductDetails = () =>
{
  const { productInfo, loading, error } = useProductDetails();
  const { token, user } = useAuthInfo();

  if (!token || (user?.sub !== "Admin" && user?.sub !== "SuperAdmin"))
  {
    return <Navigate to="/" replace={true} />
  }

  return (
    <Container maxWidth="lg">
      {error && <Alert severity="error">{error}</Alert>}
      <Loading status={loading} size="150px">
        <Card sx={{ maxWidth: 345, objectPosition: "0 -160px" }}>
          <CardMedia
            component="img"
            alt={productInfo?.title}
            height="280"
            image={productInfo?.image}
          />
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              {productInfo?.title}
            </Typography>
            <Typography mb="10px" variant="body2" color="text.secondary">
              {productInfo?.description}
            </Typography>
            <Typography mb="10px" variant="subtitle1" color="primary">
              Price: &#36;{productInfo?.price}
            </Typography>
            <Typography variant="subtitle1" color="primary">
              Category: {productInfo?.category}
            </Typography>
          </CardContent>
        </Card>
      </Loading>
    </Container>
  )
}

export default ProductDetails;
