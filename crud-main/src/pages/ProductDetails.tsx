import { Dialog, DialogContent, } from "@mui/material";
import Loading from "../components/feedback/Loading/Loading";
import useAuthInfo from "../hooks/useAuthInfo";
import { Navigate, useNavigate } from "react-router";
import ErrorFeedback from "../components/feedback/ErrorFeedback/ErrorFeedback";
import { useState } from "react";
import ProductCard from "../components/common/ProductCard/ProductCard";
import useProductDetails from "../hooks/useProductDetails";

const ProductDetails = () =>
{
  const { productInfo, loading, error } = useProductDetails();
  const { token, user } = useAuthInfo();
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  const handleClose = () =>
  {
    setOpen(false);
    navigate('/');
  };

  if (!token || (user?.role !== "Admin" && user?.role !== "SuperAdmin"))
  {
    return <Navigate to="/" replace={true} />
  }

  if (error)
  {
    return <ErrorFeedback error={error} />
  }

  return (
    <Loading status={loading} size="150px">
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent sx={{ p: 0 }}>
          <ProductCard productInfo={productInfo!} loading={loading} />
        </DialogContent>
      </Dialog>
    </Loading>
  )
}

export default ProductDetails;
