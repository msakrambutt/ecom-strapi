import { IProducts } from '@/types/page';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
interface IPropType{
    product:IProducts;
}

const ProductCardImage = ({product}:IPropType)=> {
  return (
    <div className='bg-gradient-to-r from-violet-500 to-violet-900 rounded flex items-center h-32 justify-center gap-x-10'>
        <Link href="#">
            <span className=' cursor-pointer text-2xl w-2/3 text-white p-6 font-bold '>
                {product.attributes.Title}
            </span>
        </Link>
        <Image src={'/logo1.png'} alt="" width={55} height={55}/>
    </div>

  )
}

export default ProductCardImage;