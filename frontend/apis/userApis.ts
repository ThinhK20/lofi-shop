import axios from "axios";

const getCart = process.env.NEXT_PUBLIC_API + "/api/user/cart/"; 

export const userApis = {
    getCart: async(id: string) => {
        return (await axios.get(getCart + id)).data
    }
} 