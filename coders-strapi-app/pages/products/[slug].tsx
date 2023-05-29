import { fetchProductBySlug } from '@/http/page';
import { ICartItem, ICollectionResponse, IProducts, SetCartPropType, SetCartQuantityType} from '@/types/page';
import { AxiosResponse } from 'axios';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import QueryString from 'qs';
import React, { useState } from 'react'
import qs from 'qs';
import Head from 'next/head';
import Image from 'next/image';
import { MDXRemote,MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serializeMarkdown } from '@/utils';

interface IPropType{
    product:IProducts;
    notFound?:boolean;
    cart: ICartItem;
    setCart: SetCartPropType;

}

const Slug = ({product,notFound=false,cart,setCart}:IPropType) => {
          const [quantity,setQuantity]=useState<number>(1);
          const addToCart=()=>{
          const newItem:ICartItem={
            Title:product.attributes.Title,
            Price:product.attributes.Price*quantity,
            Quantity:quantity,
            Slug:product.attributes.Slug,
            Image:product.attributes.Image.data.attributes.formats.small.url,
            OriginalPrice:product.attributes.Price
            }
            setCart((prevCart) => {
              const existingItemIndex = prevCart.findIndex(
                (item) => item.Slug === newItem.Slug
              );
              if (existingItemIndex !== -1) {
                const updatedCart = [...prevCart];
                const existingItem = updatedCart[existingItemIndex];
                const updatedItem = {
                  ...existingItem,
                  Price: existingItem.Price + newItem.Price,
                  Quantity: existingItem.Quantity + quantity,
                };
                updatedCart[existingItemIndex] = updatedItem;
                return updatedCart;
              }
              return [...prevCart, newItem];
            });
      }
      const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuantity(Number(e.target.value));
        cart.Price=cart.Price*quantity;
      };
    
      const handleIncrement = () => {
        setQuantity((prevQuantity) => prevQuantity + 1);
      };
    
      const handleDecrement = () => {
        setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
      };
    
  return (
    <>
        <Head>
        <title>{product.attributes.Title}</title>
        <meta name="description" content='Generated by create next app'/>
        <link rel="icons" href="/favicon.ico"/>
        </Head>
        <div>
        {/* <div className='my-12 grid lg:grid-cols-2 gap-12'> */}
            {/* <div className='col-span-2'>
                <h1 className='text-3xl font-bold py-2'>{product.attributes.Title}</h1>
                <div className='text-lg text-gray-600 leading-8'>
                    <Image className=' my-12 mb-6' 
                    src={"http://localhost:1337"+product.attributes.Image.data.attributes.formats.small.url}
                     alt={product.attributes.Title}  height={375} width={375}/>
                    
                </div>
            </div> */}
            {/* Right side */}
            <div>
            <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-5 mx-auto">
    <div className="lg:w-4/5 mx-auto w-full h-full py-3 flex flex-wrap">
      <Image alt="" className="lg:w-1/2 w-full lg:h-full h-full object-cover object-center rounded p-1" src={"http://localhost:1337"+product.attributes.Image.data.attributes.formats.small.url} width={75} height={75} />
      <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
        <h2 className="text-sm title-font text-gray-500 tracking-widest">BMS Store </h2>
        <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{product.attributes.Title}</h1>
        <div className="flex mb-4">
          <span className="flex items-center">
            <svg fill="currentColor" stroke="currentColor" strokeLinecap="round"  strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <svg fill="currentColor" stroke="currentColor" strokeLinecap="round"  strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <svg fill="currentColor" stroke="currentColor" strokeLinecap="round"  strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <svg fill="currentColor" stroke="currentColor" strokeLinecap="round"  strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <svg fill="none" stroke="currentColor" strokeLinecap="round"  strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <span className="text-gray-600 ml-3">4 Reviews</span>
          </span>
          
        </div>
        <p className="leading-relaxed">{product.attributes.Description}</p><br/>
        <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
          <div className=" ml-6 items-center">
            <span className="mr-3 font-bold">Free Delivery on {' '}{product.attributes.Quantity}{' '}Quantity</span><br/>
          </div>
        </div>
        {/* quantity */}
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">Quantity</h1>
          <div className="flex items-center mb-4">
          <button
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
          onClick={handleDecrement}
        >
          -
        </button>
        <input
          type="number"
          className="border border-gray-300 text-center w-20"
          value={quantity}
          onChange={handleQuantityChange}
        />
        <button
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r"
          onClick={handleIncrement}
        >
          +
        </button>
      </div>
      </div>
          {/* quantity */}
        <div className="flex">
          <div className="flex mx-2">
            <button  onClick={addToCart} className="flex ml-auto mx-2 text-white bg-primary border-0 py-2 px-6 focus:outline-none hover:bg-primary-dark rounded">Add to Cart</button>
            <span className="title-font font-medium text-2xl text-gray-900">Rs{' '}{product.attributes.Price}/-</span>
 
          </div>
          
        </div>
      </div>
    </div>
  </div>
</section>
                
            </div>
        </div>
    </>
  )
}

export async function getServerSideProps(context:GetServerSidePropsContext){
    const querString=qs.stringify({
        populate:['Image.data'],
        sort:['id:asc'],
        filters:{
            Slug:{
                $eq:context.query.slug,
            },
        },

    });

    const {data:products}:AxiosResponse<ICollectionResponse<IProducts[]>>=
    await fetchProductBySlug(querString);
    if(products.data.length===0){
        return {
            noFound:true,
        };
    }

    return {
        props:{
            // product:await serializeMarkdown(products.data[0]),
            product:products.data[0],
        }
    }
}
export default Slug;

 {/* <MDXRemote {...product.attributes.Description as MDXRemoteSerializeResult} > */}
                     {/* <p className='text-gray-500 text-justify text-xs  py-2'>
                     {product.attributes.Description}
                     </p> */}
                     {/* </MDXRemote> */}