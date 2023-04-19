import { imageAssets } from "@/assets";
import { formatPrice } from "@/utilities/FormatFunc";
import TextOverflow from "@/styles/TextOverflow";
import React from "react";

type Props = {};

const HeaderCard = (props: Props) => {
   return (
      <div className="flex items-center">
         <img
            src={imageAssets.productReview1.src}
            alt="header-img-card"
            className="w-10 h-10 mr-4"
         />
         <TextOverflow className="pr-10 max-w-xs">
            Áo Polo Local Brand Karants Signature
         </TextOverflow>
         <span className="text-blue-600 ">{formatPrice(51024)}</span>
      </div>
   );
};

export default HeaderCard;
