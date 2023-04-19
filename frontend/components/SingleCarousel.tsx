import { imageAssets } from "@/assets";
import { Carousel } from "flowbite-react";

import React from "react";

type Props = {};

const SingleCarousel = (props: Props) => {
   return (
      <div className="h-56 sm:h-64 xl:h-96 2xl:h-96">
         <Carousel slideInterval={5000}>
            <img src={imageAssets.carousel1.src} alt="carousel-1" />
            <img src={imageAssets.carousel2.src} alt="carousel-2" />
            <img src={imageAssets.carousel3.src} alt="carousel-3" />
            <img src={imageAssets.carousel4.src} alt="carousel-4" />
            <img src={imageAssets.carousel5.src} alt="carousel-5" />
         </Carousel>
      </div>
   );
};

export default SingleCarousel;
