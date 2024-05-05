"use client"
import Link from "next/link";
import { useState } from "react";

export default function MenuItem({ name, description, price, userType }) {

  return (
    <div className="border-b-2 border-customBrown p-2 mb-4">
      <div className="flex flex-col text-customBlack">
        <div className="flex justify-between">
          <div className="text-2xl text-customOrange font-bold uppercase truncate">{name}</div>
          {userType === "customer" ? (
            <div className="flex justify-between items-center text-xl rounded-full bg-customBrown text-customLight w-56 px-4 cursor-pointer">
              <div className="">Add to Cart</div>
              <div className="">${price}</div>
            </div>
          ) : (
            <div className="text-2xl font-bold">${price}</div>
          )}
        </div>
        <div className="text-xl font-light truncate lowercase">{description}</div>
      </div>
    </div >
  );
}