import React from "react";
import ProductCard from "./ProductCard";
import { ProductType } from "@/types/ProductType";

type Props = {
   products: Array<ProductType>;
};

const GridProducts = (props: Props) => {
   return (
      <div className="grid grid-cols-6 gap-4 px-10">
         {props.products.map((item) => {
            return <ProductCard size="sm" key={item.id} product={item} />;
         })}
      </div>
   );
};

export default GridProducts;
