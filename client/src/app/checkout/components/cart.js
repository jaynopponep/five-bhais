"use client"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Quantity from "./quantity";

export default function Cart({ cart, updateQuantity }) {

  const getItemTotal = (price, quantity) => {
    return (price * quantity).toFixed(2);
  }

  return (
    <div className="text-ellipsis truncate">
      <Table className="w-full border-customBrown text-xl">
        <TableHeader className="text-customBlack text-xl font-bold border-b-4 border-customBrown ">
          <TableRow className="hover:bg-customLight">
            <TableHead className="w-[350px] text-customBlack">Name</TableHead>
            <TableHead className="w-[350px] text-customBlack">Price</TableHead>
            <TableHead className="w-[300px] text-customBlack">Quantity</TableHead>
            <TableHead className="w-[300px] text-right text-customBlack">Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cart.map((item, index) => (
            <TableRow key={index} className="hover:bg-customLight border-b-2 border-customBrown" >
              {/* Add code here to render the data for each item */}
              <TableCell className="text-customOrange uppercase">{item.name}</TableCell>
              <TableCell>${item.price.toFixed(2)}</TableCell>
              <TableCell className="text-ellipsis truncate w-[500px]"><Quantity item={item} quantity={item.quantity} updateQuantity={updateQuantity} /></TableCell>
              <TableCell className="text-right">${getItemTotal(item.price, item.quantity)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}