import React, { ReactNode, useState } from "react";
import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { imageAssets } from "@/assets";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import HeaderCard from "./HeaderCard";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "@/redux/userSlice";
import { useRouter } from "next/router";
import { RouterNodeType } from "@/types/RouterNodeType";
import { AppState } from "@/redux/store";

const LinkItem = (props: RouterNodeType) => {
   const active = props.path === props.href;
   const activeColor = "text-blue-600";
   return (
      <Link
         {...props}
         href={props.href}
         className={`${active ? activeColor : ""} `}
         target={props.target}
      >
         {props.children}
      </Link>
   );
};

const Header = () => {
   const { asPath } = useRouter();
   const user = useSelector((state: AppState) => state.user.data);
   const dispatch = useDispatch();

   const handleLogout = () => {
      if (!user) return;
      dispatch(setLogout());
   };

   return (
      <Navbar fluid={true} rounded={true} className="bg-gray-800">
         {/* LOGO AREA */}
         <Navbar.Brand>
            <Link className="w-full" href={"/"} legacyBehavior>
               <div className=" flex">
                  <img
                     src={imageAssets.logo.src}
                     className="mr-3 h-6 sm:h-9  bg-black rounded-full p-1"
                     alt="Flowbite Logo"
                  />
                  <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                     LofiShop
                  </span>
               </div>
            </Link>
         </Navbar.Brand>

         {/* Cart & Notify*/}
         {user && (
            <div className="md:order-3 flex content-center gap-8">
               <div className=" hover:bg-slate-300 cursor-pointer rounded-full">
                  <Dropdown
                     arrowIcon={false}
                     inline={true}
                     label={
                        <FontAwesomeIcon
                           className="p-4"
                           icon={faCartShopping}
                        />
                     }
                  >
                     <Dropdown.Header>
                        <span className="block truncate text-sm font-medium">
                           Cart
                        </span>
                     </Dropdown.Header>
                     <Dropdown.Item>
                        <HeaderCard />
                     </Dropdown.Item>
                     <Dropdown.Item>
                        <HeaderCard />
                     </Dropdown.Item>
                     <Dropdown.Item>
                        <HeaderCard />
                     </Dropdown.Item>
                     <Dropdown.Divider />
                     <Dropdown.Item>
                        <div className="flex items-center justify-between w-full">
                           <span>Thêm 3 sản phẩm vào giỏ</span>
                           <Link
                              href={"/cart"}
                              className="btn px-8 py-2 hover:opacity-80 bg-blue-600 text-white "
                           >
                              Xem giỏ hàng
                           </Link>
                        </div>
                     </Dropdown.Item>
                  </Dropdown>
               </div>
               <div className=" hover:bg-slate-300 cursor-pointer rounded-full">
                  <Dropdown
                     arrowIcon={false}
                     inline={true}
                     label={<FontAwesomeIcon className="p-4" icon={faBell} />}
                  >
                     <Dropdown.Header>
                        <span className="block truncate text-sm font-medium">
                           Notification
                        </span>
                     </Dropdown.Header>
                     <Dropdown.Item>Genshin impact mecha</Dropdown.Item>
                  </Dropdown>
               </div>
            </div>
         )}

         {/* AUTHENTICATION AREA */}
         <div className="flex md:order-4 gap-4">
            {user ? (
               <>
                  <Dropdown
                     className="object-cover"
                     arrowIcon={false}
                     inline={true}
                     label={
                        <Avatar
                           alt="User settings"
                           img={user.avatar?.toString()}
                           rounded={true}
                        />
                     }
                  >
                     <Dropdown.Header>
                        <span className="block text-sm">{user.username}</span>
                        <span className="block truncate text-sm font-medium">
                           {user.email}
                        </span>
                     </Dropdown.Header>
                     <Dropdown.Item>Dashboard</Dropdown.Item>
                     <Dropdown.Item>Settings</Dropdown.Item>
                     <Dropdown.Item>Earnings</Dropdown.Item>
                     <Dropdown.Divider />
                     <Dropdown.Item onClick={handleLogout}>
                        Log out
                     </Dropdown.Item>
                  </Dropdown>
               </>
            ) : (
               <>
                  <Link
                     href={"/auth/login"}
                     className="btn bg-blue-600 px-4 py-1 text-white rounded-lg hover:brightness-90"
                  >
                     Login
                  </Link>
                  <Link
                     href={"/auth/sign-up"}
                     className="text-white hover:brightness-90 btn  bg-slate-500 px-4 py-1 rounded-xl"
                  >
                     Sign Up
                  </Link>
               </>
            )}

            <Navbar.Toggle />
         </div>

         {/* COLLAPSE AREA */}
         <Navbar.Collapse>
            <Navbar.Collapse>
               <LinkItem href="/" path={asPath}>
                  Home
               </LinkItem>
            </Navbar.Collapse>
            <Navbar.Collapse>
               <LinkItem path={asPath} href={"/about"}>
                  About
               </LinkItem>
            </Navbar.Collapse>
            <Navbar.Collapse>
               <LinkItem path={asPath} href={"/services"}>
                  Services
               </LinkItem>
            </Navbar.Collapse>

            <Navbar.Collapse>
               <LinkItem path={asPath} href="/contact">
                  Contact
               </LinkItem>
            </Navbar.Collapse>
         </Navbar.Collapse>

         {/* SEARCH AREA  */}
         <div className="flex md:order-2" style={{ flexBasis: "35%" }}>
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
   );
};

export default Header;
