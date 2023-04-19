export type UserType = {
    id?: string;
    avatar?: File | string |  null;
    email: string;
    phone: string;
    username: string;
}

export interface UserCreateType extends UserType {
    password: string;
    confirmPassword: string;
    acceptedTerm: boolean;
 }
 
export type UserErrorCreateType = {
    [key in keyof UserCreateType]: string
 }

export type UserLoginType = {
    email: string;
    password: string;
}
