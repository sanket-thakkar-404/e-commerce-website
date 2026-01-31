import React from "react";
import Addresses from "./Addresses";
import { Link } from "react-router-dom";

const CheckOutAddress = () => {
  return (
    <div className="h-[85vh] flex-col justify-between items-end max-w-2xl mx-auto">
      {/* Address section */}
      <div className=" w-full px-4 pt-4">
        <Addresses mode="checkout" />
      </div>

      {/* Sticky checkout button */}
      <div className="w-full px-4 pb-4">
        <Link
          to="/checkout"
          className="block w-full py-3 rounded-xl
            bg-green-600 hover:bg-green-700
            text-white font-semibold text-center
            transition-colors"
        >
          Continue to Checkout
        </Link>
      </div>
    </div>
  );
};

export default CheckOutAddress;