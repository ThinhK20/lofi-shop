import { UserLoginType, UserType } from "@/types/UserType";
import axios from "axios"

const registerStr = process.env.NEXT_PUBLIC_API + "/api/auth/register";
const loginStr = process.env.NEXT_PUBLIC_API + "/api/auth/login";

export const authApi = {
    register:  (userData : UserType) => {
        return axios.post(registerStr, userData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
    },
    login: (userLoginData: UserLoginType) => {
        return axios.post(loginStr, userLoginData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
    }
}