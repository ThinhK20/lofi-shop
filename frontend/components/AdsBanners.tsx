import { imageAssets } from "@/assets";
import Image from "next/image";
import React from "react";

type Props = {};

const AdsBanners = (props: Props) => {
   return (
      <div className="grid grid-cols-2 gap-4 py-4">
         <a href="#">
            <Image
               width={imageAssets.adsBanner1.width}
               height={imageAssets.adsBanner1.height}
               src={imageAssets.adsBanner1.src}
               alt="ads-banner-1"
            />
         </a>
         <a href="#">
            <Image
               width={imageAssets.adsBanner2.width}
               height={imageAssets.adsBanner2.height}
               src={imageAssets.adsBanner2.src}
               alt="ads-banner-2"
            />
         </a>
      </div>
   );
};

export default AdsBanners;
