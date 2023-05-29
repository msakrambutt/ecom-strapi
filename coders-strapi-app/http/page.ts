import axios from "axios";

const api=axios.create({
    baseURL:process.env.API_BASE_URL,
    headers:{
        Authorization:`Bearer ${process.env.BACKEND_API_KEY}`,
        'Content-Type':'application/json'
    },
});

//Categories
export const fetchCategories=async(queryString:string)=> api.get(`/api/categories?${queryString}`);
// export const fetchCategories1=async()=> api.get('/api/categories')
export const fetchCategories1=async()=> api.get('/api/categories?populate=*')



//Products
// export const fetchCategories=async()=> api.get('/api/categories?populate=*')
export const fetchProducts=async(queryString:string)=> api.get(`/api/products?${queryString}`)

export const fetchProductBySlug=async(queryString:string)=> api.get(`/api/products?${queryString}`);