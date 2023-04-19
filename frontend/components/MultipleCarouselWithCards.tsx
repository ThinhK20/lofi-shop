import React from "react";
import { Carousel, Card } from "flowbite-react";
import { CarouselButtonLeft, CarouselButtonRight } from "./CarouselButtons";
import ProductCard from "./ProductCard";
import { ProductType } from "@/types/ProductType";

type Props = {
   products: Array<ProductType>;
};

const MultipleCarouselWithCards = (props: Props) => {
   return (
      <div className="h-60 sm:h-64 xl:h-96 2xl:h-96">
         <Carousel
            indicators={false}
            leftControl={<CarouselButtonLeft />}
            rightControl={<CarouselButtonRight />}
         >
            <div className="flex h-full grid-cols-5 px-[120px] gap-4 items-center justify-center">
               {props.products.map((item) => {
                  return <ProductCard size="md" key={item.id} product={item} />;
               })}
            </div>
         </Carousel>
      </div>
   );
};

export default MultipleCarouselWithCards;
