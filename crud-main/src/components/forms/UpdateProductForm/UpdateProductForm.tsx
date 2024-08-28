import { useForm, SubmitHandler } from "react-hook-form"
import { actUpdateProduct } from "../../../store/products/act/actUpdateProduct";
import useProductDetails from "../../../hooks/useProductDetails";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import ErrorFeedback from "../../feedback/ErrorFeedback/ErrorFeedback";
import { TProduct } from "../../../types/product";
import { Box, Button, CircularProgress, Container, TextField, Typography } from "@mui/material";
// Styles
import styles from './styles.module.css';
import { grey } from "@mui/material/colors";
import useCurrentMode from "../../../hooks/useCurrentMode";
import Form from "../Form/Form";

const { UpdateForm } = styles;

const UpdateProductForm = () =>
{
   const { dispatch, productInfo, loading, error } = useProductDetails();
   const { register, handleSubmit, reset, formState: { errors } } = useForm<TProduct>();
   const navigate = useNavigate()

   const { currentMode } = useCurrentMode();

   useEffect(() =>
   {
      if (productInfo)
      {
         reset({
            title: productInfo?.title,
            description: productInfo?.description,
            image: productInfo?.image,
            price: productInfo?.price,
            category: productInfo?.category,
         })
      }

      return () => { reset(); };
   }, [productInfo, reset])

   const onSubmit: SubmitHandler<TProduct> = (data) =>
   {
      if ((productInfo?.id))
      {
         dispatch(actUpdateProduct({ ...data, id: productInfo.id }))
            .unwrap()
            .then(() => reset())
            .then(() => navigate('/'))
            // err = error to avoid crashing the app.. already handled error below
            .catch(err => err = error);
      }
   }

   return (
      <Container sx={{ minHeight: 'calc(100vh - 150px)' }} maxWidth="lg">
         <Form
            className={`neonForm ${UpdateForm}`}
            heading="Edit Product"
            onSubmit={handleSubmit(onSubmit)}
         >
            <TextField
               id="title"
               {...register('title')}
               label="Title"
               variant="outlined"
               InputLabelProps={{ shrink: true }}
               error={!!errors.title}
               helperText={errors.title?.message}
            />
            <TextField
               id="description"
               {...register('description')}
               label="Description"
               variant="outlined"
               InputLabelProps={{ shrink: true }}
               error={!!errors.description}
               helperText={errors.description?.message}
            />
            <TextField
               id="image"
               {...register('image')}
               label="Image URL"
               variant="outlined"
               InputLabelProps={{ shrink: true }}
               error={!!errors.image}
               helperText={errors.image?.message}
            />
            <TextField
               id="price"
               {...register('price')}
               label="Price"
               variant="outlined"
               InputLabelProps={{ shrink: true }}
               error={!!errors.price}
               helperText={errors.price?.message}
            />
            <TextField
               id="category"
               {...register('category')}
               label="Category"
               variant="outlined"
               InputLabelProps={{ shrink: true }}
               error={!!errors.category}
               helperText={errors.category?.message}
            />
            <Button
               type="submit"
               variant={currentMode === "light" ? "contained" : "outlined"}
            >
               {
                  loading === "pending" &&
                  <CircularProgress sx={{ mr: '10px' }} size={20} />
               }
               Submit
            </Button>
            <ErrorFeedback error={error} />
         </Form>
      </Container>
   )
}

export default UpdateProductForm
