export type InvoiceType = {
   cart: ProductInvoiceType[];
   order: {
      createdDate: string;
      id: string;
      paymentType: string;
      totalPrice: number;
      userId: string;
   };
};

type ProductInvoiceType = {
   colorId: string;
   description: string;
   material: string;
   name: string;
   orders: number;
   origin: string;
   photoUrl: string;
   price: number;
   productId: string;
   quantity: number;
   rating: number;
   sample: string;
   sizeId: string;
   stripeId: string;
   style: string;
   subCategory: string;
   userId: string;
};
