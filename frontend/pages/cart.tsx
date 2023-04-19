import { imageAssets } from "@/assets";
import FooterComponent from "@/components/Footer";
import { Navbar } from "flowbite-react";
import { formatPrice } from "@/utilities/FormatFunc";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { wrapper } from "../redux/store";
import { UserSliceType } from "@/redux/userSlice";

type Props = {
   user: UserSliceType;
};

const Cart = (props: Props) => {
   console.log("User: ", props.user);
   return (
      <div>
         {/* Header cart */}
         <Navbar fluid={true} rounded={true}>
            <Navbar.Brand href="/" className="gap-2">
               <img
                  src={imageAssets.logo.src}
                  className="mr-3 h-6 sm:h-9  bg-black rounded-full p-1"
                  alt="Flowbite Logo"
               />
               <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                  LofiShop
               </span>
               <span>|</span>
               <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                  Giỏ hàng
               </span>
            </Navbar.Brand>
            <div
               className="flex md:order-2 md:mr-[40%]"
               style={{ flexBasis: "35%" }}
            >
               <button
                  type="button"
                  data-collapse-toggle="navbar-search"
                  aria-controls="navbar-search"
                  aria-expanded="false"
                  className="md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 mr-1"
               >
                  <svg
                     className="w-5 h-5"
                     aria-hidden="true"
                     fill="currentColor"
                     viewBox="0 0 20 20"
                     xmlns="http://www.w3.org/2000/svg"
                  >
                     <path
                        fill-rule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clip-rule="evenodd"
                     ></path>
                  </svg>
                  <span className="sr-only">Search</span>
               </button>
               <div className="relative hidden md:block flex-1">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                     <svg
                        className="w-5 h-5 text-gray-500"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                     >
                        <path
                           fill-rule="evenodd"
                           d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                           clip-rule="evenodd"
                        ></path>
                     </svg>
                     <span className="sr-only">Search icon</span>
                  </div>
                  <input
                     type="text"
                     id="search-navbar"
                     className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                     placeholder="Search..."
                  />
               </div>
               <button
                  data-collapse-toggle="navbar-search"
                  type="button"
                  className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                  aria-controls="navbar-search"
                  aria-expanded="false"
               >
                  <span className="sr-only">Open menu</span>
                  <svg
                     className="w-6 h-6"
                     aria-hidden="true"
                     fill="currentColor"
                     viewBox="0 0 20 20"
                     xmlns="http://www.w3.org/2000/svg"
                  >
                     <path
                        fill-rule="evenodd"
                        d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                        clip-rule="evenodd"
                     ></path>
                  </svg>
               </button>
            </div>
         </Navbar>
         {/* Content */}
         <div className="bg-slate-300 px-[10%] py-[48px]">
            {/* Menu selection */}
            <div className="h-14 bg-white py-1 px-4 grid grid-cols-2 items-center text-center">
               <div className="flex items-center gap-4 ">
                  <input type={"checkbox"} />
                  <span>Sản phẩm</span>
               </div>
               <ul className="grid items-center grid-cols-4 ">
                  <li>Đơn giá</li>
                  <li>Số lượng</li>
                  <li>Số tiền</li>
                  <li>Thao tác</li>
               </ul>
            </div>
            {/* Production cards */}
            <div className="py-4">
               {/* Card */}
               <div className="bg-white py-1 px-4 h-40 grid grid-cols-2 items-center text-center">
                  <div className="flex items-center gap-4 ">
                     <input type={"checkbox"} />
                     <img
                        src={imageAssets.productReview1.src}
                        className="h-28 w-28"
                        alt="product-img"
                     />
                     <span>Áo Polo Local Brand Shirt</span>
                     <div className="opacity-70">Size L, M(53- 52kg)</div>
                  </div>
                  <ul className="grid items-center grid-cols-4 ">
                     <li>{formatPrice(199400)}</li>
                     <li className="flex items-center h-7 justify-start text-[10px]">
                        <button type="button">
                           <FontAwesomeIcon
                              className="px-4 py-[8px] mt-[3px] border"
                              icon={faMinus}
                           />
                        </button>
                        <input
                           className="w-14 h-full text-center"
                           type={"number"}
                        />
                        <button type="button">
                           <FontAwesomeIcon
                              className="px-4 py-[8px] mt-[3px] border"
                              icon={faPlus}
                           />
                        </button>
                     </li>
                     <li className="text-blue-600">{formatPrice(214000)}</li>
                     <li>
                        <button className="text-red-600 font-[400]">Xóa</button>
                     </li>
                  </ul>
               </div>
               <div className="bg-white py-1 px-4 h-40 grid grid-cols-2 items-center text-center">
                  <div className="flex items-center gap-4 ">
                     <input type={"checkbox"} />
                     <img
                        src={imageAssets.productReview1.src}
                        className="h-28 w-28"
                        alt="product-img"
                     />
                     <span>Áo Polo Local Brand Shirt</span>
                     <div className="opacity-70">Size L, M(53- 52kg)</div>
                  </div>
                  <ul className="grid items-center grid-cols-4 ">
                     <li>{formatPrice(199400)}</li>
                     <li className="flex items-center h-7 justify-start text-[10px]">
                        <button type="button">
                           <FontAwesomeIcon
                              className="px-4 py-[8px] mt-[3px] border"
                              icon={faMinus}
                           />
                        </button>
                        <input
                           className="w-14 h-full text-center"
                           type={"number"}
                        />
                        <button type="button">
                           <FontAwesomeIcon
                              className="px-4 py-[8px] mt-[3px] border"
                              icon={faPlus}
                           />
                        </button>
                     </li>
                     <li className="text-blue-600">{formatPrice(214000)}</li>
                     <li>
                        <button className="text-red-600 font-[400]">Xóa</button>
                     </li>
                  </ul>
               </div>
            </div>
            {/* Summary box */}
            <div className="bg-white py-1 px-4 flex flex-col items-end justify-center">
               <div className="flex items-center gap-52 py-4 border-b border-separate w-full justify-end">
                  <span>LofiShop Voucher</span>
                  <button type="button" className="text-blue-600">
                     Chọn hoặc nhập mã
                  </button>
               </div>
               <div className="flex items-center gap-52 py-4">
                  <span>Tổng thanh toán (2 Sản Phẩm)</span>
                  <span className="text-blue-600 text-xl font-bold">
                     {formatPrice(500000)}
                  </span>
               </div>
               <div className="flex items-center gap-52 py-4">
                  <button className="btn py-2 px-40 hover:opacity-80 bg-blue-600 text-white">
                     Mua hàng
                  </button>
               </div>
            </div>
         </div>
         {/* Footer */}
         <FooterComponent />
      </div>
   );
};

export default Cart;

export const getServerSideProps = wrapper.getServerSideProps(
   (store) => async () => {
      const user = store.getState().user;

      return {
         props: {
            user,
         },
      };
   }
);
