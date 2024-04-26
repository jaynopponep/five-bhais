"use client"
import Link from "next/link";
import { useState } from "react";
import MenuItem from "./menuItem";

export default function MenuSection() {

  return (
    <div className="">
      <div className="flex flex-col text-customBlack">
        <div className="text-5xl font-bold mb-4 mt-8">Appetizer</div>
        <div className="px-4">
          <MenuItem />
          <MenuItem />
          <MenuItem />
        </div>
      </div>
    </div >
  );
}