"use client"
import Link from "next/link";
import { useState } from "react";

export default function MenuTable({ items }) {

  return (
    <div className="">
      <div className="flex">
        <div className="text-2xl font-bold w-3/4">Item</div>
        <div className="text-2xl font-bold w-1/4">Price</div>
      </div>
      <div className="px-4">
        {items.map((item, idx) => (
          <div className="flex justify-between items-center border-b border-customBrown p-2">
            <div className="text-xl font-bold">{item.name}</div>
            <div className="text-xl">{item.price}</div>
          </div>
        ))}
      </div>
    </div >
  );
}