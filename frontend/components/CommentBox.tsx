import { imageAssets } from "@/assets";
import { Rating } from "flowbite-react";
import React from "react";

type Props = {};

const CommentBox = (props: Props) => {
   return (
      <div className="flex content-center gap-4 my-8">
         <img
            className="w-10 h-10 object-cover rounded-full"
            alt=""
            src={imageAssets.carousel1.src}
         />
         <div>
            <h1 className="text-sm">syromei1308</h1>
            <Rating>
               <Rating.Star className="text-sm" />
               <Rating.Star />
               <Rating.Star />
               <Rating.Star />
            </Rating>
            <div className="text-[12px] opacity-70">
               <span className="mr-2">2022-06-11 </span>|
               <span className="ml-2">Phân loại: Hàng L</span>
            </div>
            <div className="my-4">
               <div className="flex content-center gap-1 my-2">
                  <h1 className="text-sm opacity-70">Chất liệu: </h1>
                  <span className="text-sm  ">ok</span>
               </div>
               <div className="flex content-center gap-1 my-2">
                  <h1 className="text-sm opacity-70">Màu sắc: </h1>
                  <span className="text-sm  ">ok</span>
               </div>
               <div className="flex content-center gap-1 my-2">
                  <h1 className="text-sm opacity-70">Đúng như mô tả: </h1>
                  <span className="text-sm  ">ok</span>
               </div>
            </div>
            <p className="text-sm my-4">1000000000000 điểm</p>
            <div className="flex content-center gap-4">
               <img
                  alt="review-img-user"
                  src={imageAssets.carousel1.src}
                  className="w-20 h-20 object-cover"
               />
               <img
                  alt="review-img-user"
                  src={imageAssets.carousel2.src}
                  className="w-20 h-20 object-cover"
               />
               <img
                  alt="review-img-user"
                  src={imageAssets.carousel3.src}
                  className="w-20 h-20 object-cover"
               />
               <img
                  alt="review-img-user"
                  src={imageAssets.carousel4.src}
                  className="w-20 h-20 object-cover"
               />
            </div>
         </div>
      </div>
   );
};

export default CommentBox;
