import { imageAssets } from "@/assets";
import BackToHome from "@/components/BackToHome";
import Image from "next/image";
import React from "react";

type Props = {};

const Custom404 = (props: Props) => {
   return (
      <div className="max-w-full">
         <BackToHome />
         <Image
            alt="Loading gif"
            src={imageAssets.NotFound.src}
            width={imageAssets.NotFound.width}
            height={imageAssets.NotFound.height}
         />
         <div className="absolute top-1/3 p-12 left-[30%] translate-x-[-50%] text-center bg-[#fcfaf8]">
            <h1 className="font-bold text-9xl text-red-600 mb-8">404</h1>
            <h2 className="text-black font-bold text-7xl">Not Found</h2>
         </div>
      </div>
   );
};

export default Custom404;
