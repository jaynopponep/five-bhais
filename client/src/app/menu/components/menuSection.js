"use client"
import Link from "next/link";
import { useState } from "react";
import MenuItem from "./menuItem";

export default function MenuSection({ title, items, userType }) {

  return (
    <div className="">
      <div className="flex flex-col text-customBlack">
        <div className="text-5xl font-bold mb-4 mt-8 capitalize">{title}</div>
        <div className="px-4">
          {items.map((item, idx) => (
            <MenuItem key={idx} foodItem={item} userType={userType} />
          ))}
        </div>
      </div>
    </div >
  );
}