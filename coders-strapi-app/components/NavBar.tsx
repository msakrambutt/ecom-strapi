import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import { ICartItem } from '@/types/page';

interface IPropType{
    cart:ICartItem[];
}

const NavBar = ({cart}:IPropType) => {  
  return <nav className='container flex w-full fixed top-0 right-0 left-0 bg-white  mt-0 items-center justify-between py-1 px-5  mx-auto md:flex-row lg:flex-row flex-col z-[990] mb-3'>
        <Link href="/" >
            <div className='flex items-center cursor-pointer' >
                <Image src="/logo.png" alt="logo" width="35" height="35" />
                <span className='font-bold ml-2 text-primary'>BMS Store</span>
            </div>
        </Link>
        <ul className='flex items-center'>
            <li className='mr-6 font-medium text-gray-600'>
                <Link href="/">Home</Link>
            </li>
            <li className='mr-6 font-medium text-gray-600'>
                <Link href="#">About</Link>
            </li>
            {/* <li className='mr-6 font-medium text-gray-600'>
                <Link href="#">Categories</Link>
            </li> */}
            <li className='mr-6 font-medium text-gray-600'>
                <Link href="#">Contact us</Link>
            </li>
            <li className='mr-6 font-medium text-gray-600'>
                <span className='flex'>
                <Link href="/viewcart"><Image src="/top-header.png" alt="" width={55} height={55}/></Link>
                <span className='bg-primary rounded-full text-white w-7 h-7 text-center'>{cart.length}</span>
                </span>
                
            </li>
        </ul>

        <ul className='flex items-center'>
            <li className='mr-6 font-medium text-gray-600'>
                <Link href="#" className='hover:text-gray-400'><button>Login in</button></Link>
            </li>
            <li className='font-medium text-gray-600'>
                <Link href="#" className='bg-primary py-2 px-4 rounded-sm text-white hover:bg-primary-dark transition-all'><button>Sign up</button></Link>
            </li>
        </ul>
    </nav>
    
};

export default NavBar;