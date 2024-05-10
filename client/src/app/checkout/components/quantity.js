"use client"
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function Quantity({ quantity }) {

  useEffect(() => {
  }, []);

  const changeQuantity = (amount) => {
    localStorage.getItem("cart")
  }

  return (
    <div className="border-2 border-customBrown w-28">
      <div className="flex">
        <div onClick={() => changeQuantity(-1)}>-</div>
        <div>{quantity}</div>
        <div onClick={() => changeQuantity(1)}>+</div>
      </div>
    </div>
  );
}

// TODO: fetch menu from mongo
// TODO: use object ID over food name for uniqueness
// TODO: handle quantity on multiple add to cart clicks
// TODO: similarly handle quantity changes here
// TODO: calculate subtotal, tax, and total
// TODO: manage order type
// TODO: create final json that will be sent to the endpoint when its made