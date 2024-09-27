import
{
   Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
   Container,
   Alert,
} from "@mui/material"
import ProductsList from "../components/ProductsList/ProductsList"
import AddProductModal from "../components/common/productModals/AddProductModal/AddProductModal"
import { useAppDispatch, useAppSelector } from "../store/rtkHooks"
import { Suspense, useEffect, useState } from "react"
import { getAllProducts } from "../store/products/actions/getAllProducts"
import { grey } from "@mui/material/colors"
import useCurrentMode from "../hooks/useCurrentMode"
import ProductDetailsModal from "../components/common/productModals/ProductDetailsModal/ProductDetailsModal"
import LottieHandler from "../components/feedback/LottieHandler/LottieHandler"

const thOverrides = { fontWeight: "bold" };

const Home = () =>
{
   const dispatch = useAppDispatch();
   const { records, productInfo, loading, error } = useAppSelector(state => state.products);
   const { currentMode } = useCurrentMode();
   const [open, setOpen] = useState(false);

   useEffect(() =>
   {
      dispatch(getAllProducts());
   }, [dispatch]);

   const handleClose = () => { setOpen(false) };

   return (
      <Container sx={{ minHeight: 'calc(100vh - 150px)' }} maxWidth="lg">
         <Suspense fallback={<LottieHandler type="loading" width="150px" />}>

            {error && <Alert severity="error">{error}</Alert>}

            <AddProductModal />
            <ProductDetailsModal
               productInfo={productInfo!}
               loading={loading}
               open={open}
               onClose={handleClose}
            />

            <TableContainer sx={{ mb: "50px" }} component={Paper}>
               <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                     <TableRow sx={{ bgcolor: currentMode === "light" ? "ghostwhite" : grey[900] }}>
                        <TableCell sx={thOverrides}>#</TableCell>
                        <TableCell sx={thOverrides} align="center">Title</TableCell>
                        <TableCell sx={thOverrides} align="center">Price</TableCell>
                        <TableCell sx={thOverrides} align="center">Quantity</TableCell>
                        <TableCell sx={thOverrides} align="center">Operations</TableCell>
                     </TableRow>
                  </TableHead>
                  <TableBody>

                     <ProductsList records={records} setOpen={setOpen} />

                  </TableBody>
               </Table>
            </TableContainer>
         </Suspense>
      </Container>
   )
}

export default Home;
