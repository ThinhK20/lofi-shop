export const formatPrice = (price: number): string => {
    return new Intl.NumberFormat("vi-VN", {
       style: "currency",
       currency: "VND",
    }).format(price);
 };
 
export const formatK = (num: number): string | number => {
    return Math.abs(num) > 999
       ? (Math.sign(num) * Math.round(Math.abs(num) / 100)) / 10 + "k"
       : Math.sign(num) * Math.abs(num);
 };

export const validateEmail = (email: string): boolean => {
   const re =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
   return re.test(email);
};