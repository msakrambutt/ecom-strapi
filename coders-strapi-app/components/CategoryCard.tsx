import { ICategory } from '@/types/page';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

interface IPropType{
    category:ICategory;
}
const CategoryCard = ({category}:IPropType) => {
  return (
    <div>
         {/* section */}
    <section className=" text-gray-600 body-font">
        <div className="container px-5  mx-auto">
          <div className="flex flex-wrap -m-4">
                <div className="mx-auto  text-center">
                  <div className="bg-gray-200 p-5 rounded-lg">
                    <Image
                      className="h-60 rounded w-72 object-cover object-center mb-6" 
                      src={category.attributes.Image.data.attributes.formats.thumbnail.url}
                      alt='content' height={175} width={175}
                    />
                    <h3 className=" text-primary-dark text-xs font-medium title-font">
                     {category.attributes.Title}
                    </h3>
                    <h2 className="text-md text-gray-900 font-medium title-font mb-4">
                    {category.attributes.Slug}
                    </h2>  
                    <Link href={`/category/${category.attributes.Slug}`} className=''><button className="lg:mt-2 xl:mt-0 flex-shrink-0 inline-flex text-white bg-primary border-0 py-2 px-6 focus:outline-none hover:bg-primary-dark rounded">View Products</button></Link>
                  </div>
                </div>
          </div>
        </div>
      </section>


    {/* end section */}
    </div>
  )
}

export default CategoryCard;