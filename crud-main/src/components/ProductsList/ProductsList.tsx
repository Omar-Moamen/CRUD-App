import Product from '../Product/Product';
import { TProduct } from '../../types/product';

type TProps = {
   records: TProduct[];
   setOpen: (arg: boolean) => void;
}

const ProductsList = ({ records, setOpen }: TProps) =>
{
   const products = records && records.length > 0 &&
      (records.map((product, idx) => (
         <Product key={product["_id"]} {...product} idx={idx} setOpen={setOpen} />
      )));

   return (
      <>
         {products}
      </>
   )
}

export default ProductsList;
