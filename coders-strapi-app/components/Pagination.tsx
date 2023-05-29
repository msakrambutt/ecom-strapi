import { TDirection } from '@/types/page';
import React from 'react';
import qs from 'qs';
import { useRouter } from 'next/router';


interface IPropType{
    page:number;
    pageCount:number;
    redirectUrl?:string;
}
const Pagination = ({page,pageCount,redirectUrl='/'}:IPropType) => {
    const router=useRouter();

    const isNextDisabled=():boolean=>{
        //4
        return page>=pageCount;
    }
    const isPrevDisabled=():boolean=>{
        return page<=1;
    }

    const handlePagination=async(direction:TDirection)=>{
        if(direction ===1 && isNextDisabled()){
            return;
        }

        if(direction ===-1 && isPrevDisabled()){
            return;
        }
        const queryString=qs.stringify({
            ...router.query,
            page:page+direction,
        });
        router.push(`${redirectUrl}?${queryString}`)
    }
  return (
  <div className='flex justify-center mt-44'>
        <button onClick={()=>handlePagination(-1)} className={`${'bg-primary py2 px-4 text-white w-24 rounded'} ${isPrevDisabled() ? 'disabled' :''}`}>Previous</button>
        <button onClick={()=>handlePagination(1)} className={`${'bg-primary py2 px-4 text-white w-24 rounded ml-4'} ${isNextDisabled() ? 'disabled': ''}`}>Next</button>

    </div>
  );
  
}

export default Pagination;
