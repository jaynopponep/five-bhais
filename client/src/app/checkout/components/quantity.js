"use client"
import { CirclePlus, CircleMinus } from 'lucide-react';

export default function Quantity({ item, quantity, updateQuantity }) {
  return (
    <div className="flex">
      <div className="flex items-center gap-2">
        <div className="cursor-pointer" onClick={() => updateQuantity(item._id.$oid, -1)}><CircleMinus /></div>
        <div>{quantity}</div>
        <div className="cursor-pointer" onClick={() => updateQuantity(item._id.$oid, 1)}><CirclePlus /></div>
      </div>
    </div>
  );
}