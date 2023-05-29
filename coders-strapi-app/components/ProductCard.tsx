import { IProducts } from '@/types/page';
import { MDXRemote ,MDXRemoteSerializeResult} from 'next-mdx-remote';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
interface IPropType{
    product:IProducts;
}
const ProductCard = ({product}:IPropType) => {
  return <div className='container px-5  mx-[150px]'>

    {/* section */}
    <section className="text-gray-600 body-font">
        <div className="">
          <div className="flex flex-wrap -m-4">
                <div className="mx-auto  text-center">
                  <div className="bg-gray-200 p-5 rounded-lg">
                    <Image
                      className=" h-60 rounded w-72 object-cover object-center mb-6" 
                      src={"http://localhost:1337"+product.attributes.Image.data.attributes.formats.small.url}
                      alt='content' height={175} width={175}
                    />
                    <h3 className=" text-primary-dark text-xs font-medium title-font">
                     {product.attributes.Title}
                    </h3>
                    <h2 className="text-md text-gray-900 font-medium title-font mb-4">
                    {product.attributes.Weight}
                    </h2>
                    {product.attributes.StockInHand>0 ? 
                    <>
                    <span className='text-primary text-xs'>(stock available)</span><Link href={`/products/${product.attributes.Slug}`}><button className="lg:mt-2 xl:mt-0 flex-shrink-0 inline-flex text-white bg-primary border-0 py-2 px-6 focus:outline-none hover:bg-primary-dark rounded">View Details</button></Link>
                    </>
                    : 
                    <>
                    <span className='text-red-500 text-xs'>(out of stock)</span><button className="lg:mt-2 xl:mt-0 flex-shrink-0 inline-flex text-white bg-primary border-0 py-2 px-6 focus:outline-none  rounded" disabled={true}>View Details</button>
                    </>
                    }
                  </div>
                </div>
          </div>
        </div>
      </section>


    {/* end section */}


    {/* <div className="flex items-center my-5 justify-center max-w-fit px-5">
            <div>
            <Image src={"http://localhost:1337"+product.attributes.Image.data.attributes.formats.small.url}
            height={175} width={175} alt="P-logo" />
            </div>
            <div className='px-5'>
            <Link href={`/products/${product.attributes.Slug}`} className=''>
            <h1 className='text-sm text-left text-gray-600 font-bold hover:decoration-2  hover:cursor-pointer border-2  hover:border-primary max-w-fit max-h-fit'>
            {product.attributes.Title}
            </h1>
            </Link>
            <p className=' text-gray-500 text-justify text-xs  py-2'>
            
            {product.attributes.Description.slice(0,255)}{' '}
            {product.attributes.Description.length>250 ? '...':''}
           
            </p>
            </div>
    </div> */}
  </div>;
  
}

export default ProductCard;

{/* rounded-lg overflow-hidden  */} 
{/* <MDXRemote {...product.attributes.Description as MDXRemoteSerializeResult} > */}
 {/* {product.attributes.Description}{' '}  */}
            {/* </MDXRemote> */}
