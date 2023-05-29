import { ICartItem, SetCartPropType, SetCartQuantityType } from '@/types/page';
import Image from 'next/image';
import Link from 'next/link';
import React,{ useEffect, useState } from 'react';

interface IPropType{
  cart:ICartItem[];
  setCart: SetCartPropType;
  productQty:number;
  setProductQty:SetCartQuantityType;
  subtotal:number;
  setSubtotal:SetCartQuantityType;
}

const ViewCart = ({cart,setCart,productQty,setProductQty,setSubtotal,subtotal}:IPropType) => {

  useEffect(()=>{
    let myTotal=0;
    let myQuantity=0;
    for(let index=0;index<cart.length;index++){
      const elememt=cart[index];
      myTotal=myTotal+cart[index].Price;
      myQuantity=myQuantity+cart[index].Quantity
    }
    setSubtotal(myTotal);
    setProductQty(myQuantity);
  },[cart,setProductQty,setSubtotal])

  const removeFromCart = (idx:number) => {
    setCart((prevItems) => prevItems.filter((item,id) => id !== idx));
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // setProductQty(Number(e.target.value));
    
  };

  const handleIncrement = (title:string,price:number,quantity:number,slug:string,image:string,unitPrice:number) => {
    // setProductQty((prevQuantity) => prevQuantity + 1); no need whene cart refresh automatically Quantity refesh
            const newItem:ICartItem={
              Title:title,
              Price:price,
              Quantity:quantity,
              Slug:slug,
              Image:image,
              OriginalPrice:unitPrice
              }
              setCart((prevCart) => {
                const existingItemIndex = prevCart.findIndex(
                  (item) => item.Slug === slug
              )
              if (existingItemIndex !== -1) {
                const updatedCart = [...prevCart];
                const existingItem = updatedCart[existingItemIndex];
                const updatedItem = {
                  ...existingItem,
                  Price: existingItem.Price+existingItem.OriginalPrice,
                  Quantity: existingItem.Quantity+1,

                };
                updatedCart[existingItemIndex] = updatedItem;
                console.log(updatedItem);
                return updatedCart;
              }
              return [...prevCart, newItem];
            });
  }

  const handleDecrement = (title:string,price:number,quantity:number,slug:string,image:string,unitPrice:number) => {
    // setProductQty((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
    if(quantity>1){
    const newItem:ICartItem={
      Title:title,
      Price:price,
      Quantity:quantity,
      Slug:slug,
      Image:image,
      OriginalPrice:unitPrice
      }
      setCart((prevCart) => {
        const existingItemIndex = prevCart.findIndex(
          (item) => item.Slug === slug
      )
      if (existingItemIndex !== -1) {
        const updatedCart = [...prevCart];
        const existingItem = updatedCart[existingItemIndex];
        const updatedItem = {
          ...existingItem,
          Price: existingItem.Price-existingItem.OriginalPrice,
          Quantity: existingItem.Quantity-1,

        };
        updatedCart[existingItemIndex] = updatedItem;
        console.log(updatedItem);
        return updatedCart;
      }
      return [...prevCart, newItem];
    });
  }
  // else{
  //       setProductQty((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));

  // }
  };

  

  return (
    <section className="text-gray-600 body-font flex lg:w-2/3  w-full">
    <div className="container px-5 py-24 mx-auto min-h-screen flex">
      {/* left side */}
    <div className="w-full mb-12">
      <h2 className='lg:text-2xl text-xl font-bold pb-3'>Shopping Cart</h2>
      <div className='cart'>{cart.length ? ` `:`Your cart is empty!`}</div>
      <div className=' px-8 flex flex-col'>
        {cart.map((item,idx)=>{
          return (
          <div key={idx} className='lg:flex gap-5 leading-normal py-5 w-full'>
            <div className=''> 
            <Image alt="" className=" h-40 w-40 border bg-gray-200 object-cover object-center rounded p-1" src={"http://localhost:1337"+item.Image} width={75} height={75} />
                {/* quantity */}
        <div className="mx-auto p-1">
          <div className="flex items-center mb-1">
          <button
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-2 rounded-l"
          onClick={()=>handleDecrement(item.Title,item.Price,item.Quantity,item.Slug,item.Image,item.OriginalPrice)}
        >
          -
        </button>
        <input
          type="number"
          className="border border-gray-300 text-center w-10"
          value={item.Quantity}
          onChange={handleQuantityChange}
        />
        <button
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-2 rounded-r"
          onClick={()=>handleIncrement(item.Title,item.Price,item.Quantity,item.Slug,item.Image,item.OriginalPrice)}
        >
          +
        </button>
      </div>
      </div>
          {/* quantity */}
            </div>
            <div className=''>
            {item.Title}
            <h2>Category Name</h2>
            <h3>Delivery Estimation</h3>
            <h3>5 Working Days</h3>
            <span className='font-bold'>Quantity{' '}({item.Quantity})</span><br/>
            <span className='font-bold'>Rs{item.Price}/-</span>{' '}
            <span className='font-bold'><button className='bg-primary py-1 px-3 rounded-lg mt-3 text-white hover:bg-primary-dark transition-all' onClick={()=> removeFromCart (idx)}>Delete</button></span>
            </div>
          </div>
          )
        })}
        </div>
        
    </div>
    {/* Right Side */}
    <div className='py-5  mx-auto w-full lg:w-1/3 leading-loose'>
              <h2 className='lg:text-2xl text-xl'>Order Summary</h2><br/>
              <h2 className='font-bold'>Quantity{' '}{productQty}Products</h2>
              <div className='font-bold'>
              Subtotal: {subtotal}<br/>
              <Link href="/checkout"><button type='button' className=' py-2 bg-primary-dark w-[100%] text-white cursor-pointer mt-5 mx-auto'>Checkout</button></Link>
              </div>
        </div>
    </div>
  </section>
  )
}

export default ViewCart;