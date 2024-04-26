"use client"
import Link from "next/link";
import { useState } from "react";

export default function MenuItem() {

  return (
    <div className="border-b-2 border-customBrown p-2 mb-4">
      <div className="flex flex-col text-customBlack">
        <div className="flex justify-between">
          <div className="text-2xl text-customOrange font-bold uppercase truncate">Lahsooni Gobi</div>
          <div className="text-2xl font-bold">$4.00</div>
        </div>
        <div className="text-xl font-light truncate lowercase">crispy cauliflower, tomato-garlic chili chutney</div>
      </div>
    </div >
  );
}