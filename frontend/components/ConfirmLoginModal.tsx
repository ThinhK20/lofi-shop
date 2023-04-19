import { faCat } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Modal } from "flowbite-react";
import Link from "next/link";
import React from "react";

type Props = {
   onShow: Function;
};

const ConfirmLoginModal = (props: Props) => {
   return (
      <div
         id="popup-modal"
         tabIndex={-1}
         style={{ background: "rgba(0,0,0,0.6)" }}
         className="fixed top-0 left-0 right-0  z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0  max-h-full"
      >
         <div className="absolute left-1/2 top-1/2 translate-y-[-50%] translate-x-[-50%] w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
               <div className="p-6 text-center">
                  <svg
                     aria-hidden="true"
                     className="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200"
                     fill="none"
                     stroke="currentColor"
                     viewBox="0 0 24 24"
                     xmlns="http://www.w3.org/2000/svg"
                  >
                     <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                     ></path>
                  </svg>
                  <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                     Bạn cần phải đăng nhập trước khi thực hiện tính năng này.
                  </h3>
                  <button
                     data-modal-hide="popup-modal"
                     type="button"
                     className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                  >
                     <Link href={"/auth/login"}>Login</Link>
                  </button>
                  <button
                     data-modal-hide="popup-modal"
                     type="button"
                     onClick={() => props.onShow(false)}
                     className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                  >
                     Cancel
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
};

export default ConfirmLoginModal;
