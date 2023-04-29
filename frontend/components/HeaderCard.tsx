import { formatPrice } from "@/utilities/FormatFunc";
import TextOverflow from "@/styles/TextOverflow";
import React from "react";
import { CartProductType } from "@/types/CartProductType";

type Props = {
   product: CartProductType;
};

const HeaderCard = (props: Props) => {
   return (
      <div className="flex items-center">
         <img
            src={props.product.PhotoUrl}
            alt="header-img-card"
            className="w-10 h-10 mr-4"
         />
         <TextOverflow className="pr-5 max-w-xs">
            {props.product.Name} x {props.product.Quantity}
         </TextOverflow>
         <span className="pr-5 text-gray-600 ">{props.product.Color}</span>
         <span className="text-blue-600 ">
            {formatPrice(props.product.Price)}
         </span>
      </div>
   );
};

export default HeaderCard;
