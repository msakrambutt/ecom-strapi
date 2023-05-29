import { IProducts } from '@/types/page';
import { serialize } from 'next-mdx-remote/serialize';



export const makeCategory = (slug: string): string => {
    if (typeof slug === 'string') {
        return slug.split('-').join(' ');
    }
    return '';
};

export const capitalizeFirstLetter = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

export const debounce=(fn:(query:string)=>void,timeout=300)=>{
    let timer:NodeJS.Timeout;

    const debounced=(...args:any)=>{

        clearTimeout(timer);
        timer=setTimeout(()=>{
            fn.apply(this,args);
        },timeout);
    }

    return debounced;
}


export const serializeMarkdown=async(item:IProducts)=>{
    const description=await serialize(item.attributes.Description as string);
    return {
        ...item,
        attributes:{
            ...item.attributes,
            description,
        }
    }
}