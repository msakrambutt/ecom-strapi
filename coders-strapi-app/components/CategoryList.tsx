import { ICategory } from '@/types/page';
import React from 'react'
import CategoryCard from './CategoryCard';

interface IPropType{
    categories:ICategory[];
}
const CategoryList = ({categories}:IPropType) => {
  return (
    <div className='grid lg:grid-cols-2 md:grid-cols-2  grid-cols-1  gap-5 mt-10 gap-y-10'>
        {
        categories.map((category,idx)=>(
        <CategoryCard  key={idx} category={category}/>
        ))
        }
    </div>
  )
}

export default CategoryList;