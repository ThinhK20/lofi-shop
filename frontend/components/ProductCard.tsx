import React, { useState } from "react";
import TextOverflow from "@/styles/TextOverflow";
import { useRouter } from "next/router";
import { formatK, formatPrice } from "@/utilities/FormatFunc";
import { ProductType } from "@/types/ProductType";
import Link from "next/link";

type Props = {
   product: ProductType;
   size: "sm" | "md";
};

const ProductCard = (props: Props) => {
   const router = useRouter();
   const [ratingStars] = useState(
      Array(Math.floor(props.product.rating)).fill("star")
   );
   return (
      <>
         <div
            className={`p-2 cursor-pointer ${
               props.size === "sm" && "w-[200px]"
            }  ${props.size === "md" && "w-[300px]"}  `}
            onClick={() => router.push(`/product/${props.product.id}`)}
         >
            <div className=" max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
               <Link href={`/product/${props.product.id}`}>
                  <img
                     className={`rounded-t-lg ${
                        props.size === "md" && "h-[185px]"
                     } ${
                        props.size === "sm" && "h-[110px]"
                     }  w-[100%] object-cover`}
                     src={
                        props.product.photoUrl ||
                        "https://flowbite.com/docs/images/blog/image-1.jpg"
                     }
                     alt="product-img"
                  />
               </Link>
               <div className="p-4 flex flex-col gap-4">
                  <Link href={`/product/${props.product.id}`}>
                     <h5
                        className={`${props.size === "md" && "text-base"} ${
                           props.size === "sm" && "text-xs"
                        }  font-semibold tracking-tight text-gray-900 dark:text-white w-[180px]`}
                     >
                        <TextOverflow
                           className={`${props.size === "md" && "w-[250px]"} ${
                              props.size === "sm" && "w-[150px]"
                           }`}
                        >
                           {props.product.name}
                        </TextOverflow>
                     </h5>
                  </Link>
                  <div className=" flex items-center">
                     {ratingStars.map((_, key) => (
                        <svg
                           key={key}
                           className="h-5 w-5 text-yellow-300"
                           fill="currentColor"
                           viewBox="0 0 20 20"
                           xmlns="http://www.w3.org/2000/svg"
                        >
                           <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                     ))}

                     <span className="mr-2 ml-3 rounded bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-800 dark:bg-blue-200 dark:text-blue-800">
                        {props.product.rating}
                     </span>
                  </div>
                  <div className="flex items-center gap-2 align-middle">
                     <span
                        className={`${props.size === "md" && "text-lg"} ${
                           props.size === "sm" && "text-sm"
                        }  text-red-600 font-bold dark:text-white`}
                     >
                        {formatPrice(props.product.price)}
                     </span>
                     <span className="opacity-60 text-sm">
                        ({formatK(props.product.orders)})
                     </span>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};

export default ProductCard;
