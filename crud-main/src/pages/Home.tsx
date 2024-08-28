import
{
   Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
   Container,
   Alert
} from "@mui/material"
import ProductsList from "../components/ProductsList/ProductsList"
import AddProductModal from "../components/common/productModals/AddProductModal/AddProductModal"
import { useAppDispatch, useAppSelector } from "../store/rtkHooks"
import { useEffect } from "react"
import { actGetAllProducts } from "../store/products/act/actGetAllProducts"
import Loading from "../components/feedback/Loading/Loading"

const thOverrides = { fontWeight: "bold", color: "#90caf9" }

const Home = () =>
{
   const dispatch = useAppDispatch();
   const { records, loading, error } = useAppSelector(state => state.products);

   useEffect(() =>
   {
      const promise = dispatch(actGetAllProducts());
      // promise.abort() will cancel the request if a user bounce occurred
      return () => { promise.abort() }
   }, [dispatch]);

   return (
      <Container sx={{ minHeight: 'calc(100vh - 150px)' }} maxWidth="lg">
         {
            <Loading status={loading} size="150px">
               {error && <Alert severity="error">{error}</Alert>}
               <AddProductModal />
               <TableContainer sx={{ mb: "50px" }} component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                     <TableHead>
                        <TableRow>
                           <TableCell sx={thOverrides}>#</TableCell>
                           <TableCell sx={thOverrides} align="center">Title</TableCell>
                           <TableCell sx={thOverrides} align="center">Description</TableCell>
                           <TableCell sx={thOverrides} align="center">Price</TableCell>
                           <TableCell sx={thOverrides} align="center">Category</TableCell>
                           <TableCell sx={thOverrides} align="center">Operations</TableCell>
                        </TableRow>
                     </TableHead>
                     <TableBody>

                        <ProductsList records={records} />

                     </TableBody>
                  </Table>
               </TableContainer>
            </Loading>
         }
      </Container>
   )
}

export default Home
