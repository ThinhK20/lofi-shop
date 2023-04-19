import React from "react";

type Props = {};

const CarouselButtonLeft = (props: Props) => {
   return (
      <>
         <div
            className="absolute top-0 left-8 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
            data-carousel-prev
         >
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10   bg-gray-800/30 group-hover:bg-gray-800/60  group-focus:ring-gray-800/70 group-focus:outline-none">
               <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
               >
                  <path
                     strokeLinecap="round"
                     strokeLinejoin="round"
                     strokeWidth="2"
                     d="M15 19l-7-7 7-7"
                  ></path>
               </svg>
               <span className="sr-only">Previous</span>
            </span>
         </div>
      </>
   );
};

const CarouselButtonRight = (props: Props) => {
   return (
      <>
         <div
            className="absolute top-0 right-8 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
            data-carousel-next
         >
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10   bg-gray-800/30 group-hover:bg-gray-800/60  group-focus:ring-gray-800/70 group-focus:outline-none">
               <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
               >
                  <path
                     strokeLinecap="round"
                     strokeLinejoin="round"
                     strokeWidth="2"
                     d="M9 5l7 7-7 7"
                  ></path>
               </svg>
               <span className="sr-only">Next</span>
            </span>
         </div>
      </>
   );
};

export { CarouselButtonLeft, CarouselButtonRight };
