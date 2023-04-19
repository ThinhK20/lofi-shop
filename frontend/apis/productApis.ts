import axios from "axios"

const getAllProductsStr = process.env.NEXT_PUBLIC_API + "/api/product";
const getProductStr = process.env.NEXT_PUBLIC_API + "/api/product/";
const getProductPhotosStr = process.env.NEXT_PUBLIC_API + "/api/product/photo/";
const getProductSizeStr = process.env.NEXT_PUBLIC_API + "/api/product/size/";
const getProductColorStr = process.env.NEXT_PUBLIC_API + "/api/product/color/"; 
const getProductInfoStr = process.env.NEXT_PUBLIC_API + "/api/product/allInfo/"; 

export const productApis = {
    getAllProducts: async() => {
        return (await axios.get(getAllProductsStr)).data
    },
    getProduct: async(id : string) => {
        return (await axios.get(getProductStr + id)).data
    },
    getProductPhotos: async(id: string) => {
        return (await axios.get(getProductPhotosStr + id)).data
    },
    getProductSize: async(id: string) => {
        return (await axios.get(getProductSizeStr + id)).data
    },
    getProductColor: async(id: string) => {
        return (await axios.get(getProductColorStr + id)).data
    },
    getProductInfo:async (id: string) => {
        return (await axios.get(getProductInfoStr + id)).data
    }
}