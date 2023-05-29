import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { Dispatch, SetStateAction } from 'react';


export interface IPagination{
    page:number;
    pageSize:number;
    pageCount:number;
    total:number;
}

export interface IResourceMeta{
    pagination:IPagination;
}

export interface IImageCategoryData{
    data:{
        attributes:{
            formats:{
                thumbnail:{
                    url:string;
                }
            }
        }
    }
}

export interface ICategoryAttribute{
    Title:string;
    Slug:string;
    Image:IImageCategoryData;

}


export interface ICollectionResponse<T>{
    data:T;
    meta:IResourceMeta;
}
export interface ICategory{
    id:number;
    attributes:ICategoryAttribute;
}
export interface IImageData{
    data:{
        attributes:{
            formats:{
                small:{
                    url:string;
                }
            }
        }
    }
}
export interface IProductsAttribute{
    Title:string;
    Description:string;
    Price:number;
    Weight:string;
    Slug:string;
    Quantity:number;
    StockInHand:number;
    Size:number;
    Image:IImageData;
    createdAt:string;
}

export interface ICartItem{
    Title:string;
    Price:number;
    Quantity:number;
    Slug:string;
    Image:string;
    OriginalPrice:number;

}
export type SetCartPropType = Dispatch<SetStateAction<ICartItem[]>>;
export type SetCartQuantityType = Dispatch<SetStateAction<number>>;


export interface IProducts{
    id:number;
    attributes:IProductsAttribute;
}

export type TDirection= 1|-1;

export interface IQueryOptions{
    filters:any;
    sort:any;
    populate:any;
    pagination:{
        page:number;
        pageSize:number;

    }
}
