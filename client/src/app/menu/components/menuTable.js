"use client";
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Pencil, Trash } from 'lucide-react';
import { deleteItem } from '../edit-item/actions';
import { useRouter } from 'next/navigation';

export default function MenuTable({ items }) {
  const router = useRouter();

  const handleEditClick = async (itemId) => {
    router.push(`/menu/edit-item?itemId=${itemId}`);
  };

  // This function handles clicking the trash icon
  const handleDeleteClick = async (item) => {
    await deleteItem(item)
  };

  return (
    <div className="w-9/12 text-ellipsis truncate">
      <Table className="border-2 border-customBrown text-xl">
        <TableHeader className="bg-customBrown text-customLight text-2xl font-bold">
          <TableRow className="hover:bg-customBrown">
            <TableHead className="w-[50px] border-customLight flex items-center"><Checkbox /></TableHead>
            <TableHead className="w-[250px] text-customLight">Name</TableHead>
            <TableHead className="w-[500px] text-customLight">Description</TableHead>
            <TableHead className="w-[175px] text-customLight">Section</TableHead>
            <TableHead className="text-customLight">Price</TableHead>
            <TableHead className="text-right text-customLight">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item, index) => (
            <TableRow key={index} className={index % 2 === 1 ? "bg-customBrown/10 hover:bg-customBrown/10" : "hover:bg-customLight"}>
              <TableCell className="flex mt-1"><Checkbox /></TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell className="text-ellipsis truncate w-[500px]">{item.description}</TableCell>
              <TableCell>{item.sectionTitle}</TableCell>
              <TableCell>{item.price}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-around">
                  <Pencil className="cursor-pointer" onClick={() => handleEditClick(item._id.$oid)} />
                  <Trash className="cursor-pointer" onClick={() => handleDeleteClick(item)} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
