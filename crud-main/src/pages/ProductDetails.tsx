import
{
  Container,
  Card,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";
import useProductDetails from "../hooks/useProductDetails";
import Loading from "../components/feedback/Loading/Loading";
import useAuthInfo from "../hooks/useAuthInfo";
import { Navigate } from "react-router";
import ErrorFeedback from "../components/feedback/ErrorFeedback/ErrorFeedback";

const ProductDetails = () =>
{
  const { productInfo, loading, error } = useProductDetails();
  const { token, user } = useAuthInfo();

  if (!token || (user?.role !== "Admin" && user?.role !== "SuperAdmin"))
  {
    return <Navigate to="/" replace={true} />
  }

  if (error)
  {
    return <ErrorFeedback error={error} />
  }

  return (
    <Container maxWidth="lg">

      <Loading status={loading} size="150px">
        <Card sx={{ maxWidth: 345, objectPosition: "0 -160px" }}>
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
        </Card>
      </Loading>
    </Container>
  )
}

export default ProductDetails;
