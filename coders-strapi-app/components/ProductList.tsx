import { IProducts } from '@/types/page';
import React from 'react'
import ProductCard from './ProductCard';
interface IPropType{
    products:IProducts[];
}
const ProductList = ({products}:IPropType) => {
  return (
  <div className='grid lg:grid-cols-5 md:grid-cols-3  grid-cols-1  gap-5 mt-10 gap-y-10'>
    {
        products.map((product,idx)=>(
        <ProductCard  key={idx} product={product}/>
        ))

    }
  </div>
  )
}

export default ProductList;
// products.map((product,idx)=>{
        //     return (
        //     <div key={product.id}>
        //     {idx===1 ? (
        //     <ProductCardImage  product={product}/>
        //     ):(
        //     <ProductCard  product={product}/>
        //     )}
        //     </div>
        //     )
        // })