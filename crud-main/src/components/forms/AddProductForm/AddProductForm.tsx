import { useForm, SubmitHandler } from "react-hook-form"
import { useAppDispatch, useAppSelector } from "../../../store/rtkHooks";
import { actAddProduct } from "../../../store/products/act/actAddProduct";
import { TProduct } from "../../../types/product";
import ErrorFeedback from "../../feedback/ErrorFeedback/ErrorFeedback";
import useCurrentMode from "../../../hooks/useCurrentMode";
import { Button, TextField } from "@mui/material";
import Form from "../Form/Form";
// Styles
import styles from './styles.module.css';

type TProps = {
   setOpenModal: (arg: boolean) => void;
}

const { AddForm } = styles;

const AddProductForm = ({ setOpenModal }: TProps) =>
{
   const dispatch = useAppDispatch();
   const { token } = useAppSelector(state => state.auth);
   const { loading, error } = useAppSelector(state => state.products);
   const { register, handleSubmit, reset, formState: { errors } } = useForm<TProduct>();

   const { currentMode } = useCurrentMode();

   const onSubmit: SubmitHandler<TProduct> = (data) =>
   {
      const { quantity } = data;
      const convertedQuantity = Number(Math.floor(quantity))
      const productWithToken = { ...data, quantity: convertedQuantity, token, }

      dispatch(actAddProduct(productWithToken))
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
            id="price"
            {...register('price', { required: "Price is required" })}
            label="Price"
            variant="outlined"
            error={!!errors.price}
            helperText={errors.price?.message}
         />
         <TextField
            id="quantity"
            {...register('quantity', { required: "Quantity is required" })}
            label="Quantity"
            variant="outlined"
            error={!!errors.quantity}
            helperText={errors.quantity?.message}
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
