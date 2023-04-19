import { Rating } from "flowbite-react";
import React, { useState } from "react";
import CommentBox from "./CommentBox";
import WYSIWYG from "./WYSIWYG";
import { ProductType } from "@/types/ProductType";

type Props = {
   product: ProductType;
};

const CommentSection = (props: Props) => {
   const [ratingStars] = useState(
      Array(Math.floor(props.product.rating)).fill("start")
   );

   return (
      <div className="flex align-middle border-none gap-8 mt-10 bg-white p-4">
         <div className="w-full">
            <h1 className="font-[500] text-black text-2xl">
               Đánh giá sản phẩm
            </h1>
            <div className="flex gap-12 bg-slate-200 px-4 py-10  my-4 ">
               <div style={{ flexBasis: "20%" }}>
                  <h1 className="text-blue-600">
                     <span className="mx-1 text-3xl">
                        {props.product.rating}
                     </span>
                     <span className="text-2xl">trên 5</span>
                  </h1>
                  <Rating className="my-3">
                     {ratingStars.map((_, key) => {
                        return <Rating.Star key={key} />;
                     })}
                  </Rating>
               </div>
               <div className="grid grid-cols-7 gap-4 ">
                  <div className="px-4 py-2 bg-white text-center cursor-pointer hover:opacity-75 border-blue-600 text-blue-600 border-2">
                     Tất cả
                  </div>
                  <div className="px-4 py-2 bg-white  text-center cursor-pointer hover:opacity-75">
                     5 sao
                  </div>
                  <div className="px-4 py-2 bg-white  text-center cursor-pointer hover:opacity-75">
                     4 sao
                  </div>
                  <div className="px-4 py-2 bg-white  text-center cursor-pointer hover:opacity-75">
                     3 sao
                  </div>
                  <div className="px-4 py-2 bg-white  text-center cursor-pointer hover:opacity-75">
                     2 sao
                  </div>
                  <div className="px-4 py-2 bg-white  text-center cursor-pointer hover:opacity-75">
                     1 sao
                  </div>
                  <div className="px-4 py-2 bg-white  text-center cursor-pointer hover:opacity-75">
                     Có bình luận
                  </div>
                  <div className="px-4 py-2 bg-white  text-center cursor-pointer hover:opacity-75">
                     Có hình ảnh / video
                  </div>
               </div>
            </div>
            <div>
               <WYSIWYG classname="bg-white" height="200px" />
            </div>
            <div>
               <CommentBox />
               <CommentBox />
            </div>
         </div>
      </div>
   );
};

export default CommentSection;
