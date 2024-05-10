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
import Loading from '../../_components/loading';
import Quantity from "./quantity";

export default function Cart() {
  const [isLoading, setIsLoading] = useState(true);

  const [cart, setCart] = useState([]);

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem("cart")));
    setIsLoading(false);
  }, []);

  if (isLoading) return <Loading />;
  return (
    <div className="text-ellipsis truncate">
      <Table className="w-full border-customBrown text-xl">
        <TableHeader className="text-customBlack text-xl font-bold border-b-4 border-customBrown ">
          <TableRow className="hover:bg-customLight">
            <TableHead className="w-[350px] text-customBlack">Name</TableHead>
            <TableHead className="w-[350px] text-customBlack">Price</TableHead>
            <TableHead className="w-[300px] text-customBlack">Quantity</TableHead>
            <TableHead className="text-right text-customBlack">Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cart.map((item, index) => (
            <TableRow key={index} className="hover:bg-customLight border-b-2 border-customBrown" >
              {/* Add code here to render the data for each item */}
              <TableCell className="text-customOrange uppercase">{item.name}</TableCell>
              <TableCell>${item.price}</TableCell>
              <TableCell className="text-ellipsis truncate w-[500px]"><Quantity quantity={item.quantity} /></TableCell>
              <TableCell className="text-right">${item.price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}