import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";

type Props = {};

const BackToHome = (props: Props) => {
   return (
      <Link
         href="/"
         className="w-full block bg-gray-50 p-2 text-black font-[500] text-base hover:text-blue-600"
      >
         <FontAwesomeIcon style={{ fontSize: "16px" }} icon={faAngleLeft} />
         <span className="ml-2">Back To Home</span>
      </Link>
   );
};

export default BackToHome;
