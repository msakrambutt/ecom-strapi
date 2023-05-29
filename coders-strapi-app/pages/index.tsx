import { GetServerSideProps, NextPage,GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { fetchCategories, fetchCategories1, fetchProducts } from '@/http/page';
import { ICategory,ICollectionResponse,IPagination,IProducts, IQueryOptions } from '@/types/page';
import axios,{ AxiosResponse } from 'axios';
import Tabs from '@/components/Tabs';
import ProductList from '@/components/ProductList';
import qs from 'qs';
import Pagination from '@/components/Pagination';
import { useRouter } from 'next/router';
import { debounce } from '@/utils';
import CategoryList from '@/components/CategoryList';

interface IPropTypes{
  categories:{
    items:ICategory[];
    pagination:IPagination;

  };
  products:{
    items:IProducts[];
    pagination:IPagination;
  };
}


const Home:NextPage<IPropTypes>=({categories,products})=> {
  const {page,pageCount}=categories.pagination;
  const router=useRouter();
  const handleSearch=(query:string)=>{
    router.push(`/?search=${query}`)
  }

  return (
    <div>
      <Head>
        <title>BMS Store</title>
        <meta name="description" content='Shaheen BMS Store'/>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icons" href="/favicon.ico"/>
      </Head>
        <Tabs categories={categories.items} 
        handleOnSearch={debounce(handleSearch,500)}/>

        {/* Products */}

        {/* <ProductList products={products.items}/> */}

        {/* Categories */}
        <CategoryList categories={categories.items}/>

        <Pagination page={page} pageCount={pageCount}/>

      </div>
  )
};

export async function getServerSideProps(context:GetServerSidePropsContext){
  //Fetch Products Partial<IQueryOptions>
  const options:Partial<IQueryOptions>={
    populate: ['Image.data'],
    sort: ['id:asc'],
    pagination: {
      page: context.query.page ? +context.query.page : 1,
      pageSize: 4,
    }
    //here + conver string to integer
    // ,
    // filters: undefined
  };

  if(context.query.search){
    options.filters={
      Title:{
        $containsi:context.query.search,
      }
    }
  }
  
  const queryString=qs.stringify(options);
  const {data:products}:AxiosResponse<ICollectionResponse<IProducts[]>>=await fetchProducts(queryString);

  
  // Fetch Categories
    const {
        data:categories
    }:AxiosResponse<ICollectionResponse<ICategory[]>> =await fetchCategories(queryString);
    return {
        props:{
            categories:{
                items:categories.data,
                pagination:categories.meta.pagination,

            },
            products:{
              items:products.data,
              pagination:products.meta.pagination,
            }
        },
    };
}
export default Home;