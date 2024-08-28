import { useForm, SubmitHandler } from "react-hook-form"
import { useAppDispatch, useAppSelector } from "../../../store/rtkHooks";
import { actAddProduct } from "../../../store/products/act/actAddProduct";
import { TProduct } from "../../../types/product";
import ErrorFeedback from "../../feedback/ErrorFeedback/ErrorFeedback";
import useCurrentMode from "../../../hooks/useCurrentMode";
import { Box, Button, TextField } from "@mui/material";
// Styles
import styles from './styles.module.css';
import Form from "../Form/Form";

type TProps = {
   setOpenModal: (arg: boolean) => void;
}

const { AddForm } = styles;

const AddProductForm = ({ setOpenModal }: TProps) =>
{
   const dispatch = useAppDispatch();
   const { loading, error } = useAppSelector(state => state.products);
   const { register, handleSubmit, reset, formState: { errors } } = useForm<TProduct>();

   const { currentMode } = useCurrentMode();

   const onSubmit: SubmitHandler<TProduct> = (data) =>
   {
      dispatch(actAddProduct(data))
         .unwrap()
         .then(() => reset())
         .then(() => setOpenModal(false))
         // err = error to avoid crashing the app.. already handled error below
         .catch(err => err = error);
   }

   return (
      <Form
         className={AddForm}
         heading="Add new product"
         divider={false}
         bgColor="none"
         onSubmit={handleSubmit(onSubmit)}
      >
         <TextField
            id="title"
            {...register('title', { required: "Title is required", maxLength: 30 })}
            label="Title"
            variant="outlined"
            error={!!errors.title}
            helperText={errors.title?.message}
         />
         <TextField
            id="description"
            {...register('description', { required: "Description is required" })}
            label="Description"
            variant="outlined"
            error={!!errors.description}
            helperText={errors.description?.message}
         />
         <TextField
            id="image"
            {...register('image', { required: "Image url is required" })}
            label="Image URL"
            variant="outlined"
            error={!!errors.image}
            helperText={errors.image?.message}
         />
         <TextField
            id="price"
            {...register('price', { required: "Price is required" })}
            label="Price"
            variant="outlined"
            error={!!errors.price}
            helperText={errors.price?.message}
         />
         <TextField
            id="category"
            {...register('category', { required: "Category is required" })}
            label="Category"
            variant="outlined"
            error={!!errors.category}
            helperText={errors.category?.message}
         />
         <Button
            type="submit"
            variant={currentMode === "light" ? "contained" : "outlined"}
         >
            {loading === "pending" ? "Submitting..." : "Submit"}
         </Button>

         <ErrorFeedback error={error} />

      </Form>
   )
}

export default AddProductForm
