import { CartProductType } from "@/types/CartProductType";
import axios from "axios";

const getCart = process.env.NEXT_PUBLIC_API + "/api/users/cart/"; 
const addProductIntoCart = process.env.NEXT_PUBLIC_API + "/api/users/cart/"; 
const deleteProductFromCart = process.env.NEXT_PUBLIC_API + "/api/users/cart/"; 

export const userApis = {
    getCart: async(id: string) => {
        return (await axios.get(getCart + id)).data
    },
    addProductIntoCart: async( data: {
        id: string,
        ProductId: string,
        UserId: string,
        SizeId: string,
        ColorId: string,
        Quantity: number
    }) => {
        const {id, ...others} = data
        return await axios.post(addProductIntoCart + id, others, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
    },
    deleteProductFromCart: async( data: {
        id: string,
        ProductId: string,
        UserId: string,
        SizeId: string,
        ColorId: string,
    }) => {
        const {id, ...others} = data
        return await axios.delete(deleteProductFromCart + id, {
            data: others,
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
    }
} 