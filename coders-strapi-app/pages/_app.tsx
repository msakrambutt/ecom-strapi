import Footer from '@/components/Footer'
import NavBar from '@/components/NavBar'
import Shopping from '@/components/Shopping';
import TopHeader from '@/components/TopHeader'
import '@/styles/globals.css'
import { ICartItem } from '@/types/page';
import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
export default function MyApp({ Component, pageProps }:AppProps) {

  useEffect(()=>{
    console.log("running");
  })
    const [cart,setCart]=useState<ICartItem[]>([]);
    const [reloadKey,setReloadKey]=useState<number>(1);
    const [productQty,setProductQty]=useState<number>(1);
    const [subtotal,setSubtotal]=useState<number>(0);




  return <>
  <div className='container mx-auto font-mono px-5'>
  <NavBar key={reloadKey} cart={cart}/>
  <TopHeader/>

  <main className='pb-32'>
  <Component cart={cart} setCart={setCart} subtotal={subtotal}  setSubtotal={setSubtotal} productQty={productQty}  setProductQty={setProductQty} {...pageProps} />
  </main>
  <Footer/>
  </div>
  </> 
}
