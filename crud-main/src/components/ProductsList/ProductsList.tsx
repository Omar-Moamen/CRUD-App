import Product from '../Product/Product';
import { TProduct } from '../../types/product';

type TProps = {
   records: TProduct[];
}

const ProductsList = ({ records }: TProps) =>
{
   const products = records.length > 0 &&
      (records.map((product, idx) => (
         <Product key={product.id} {...product} idx={idx} />
      )));

   return (
      <>
         {products}
      </>
   )
}

export default ProductsList;
