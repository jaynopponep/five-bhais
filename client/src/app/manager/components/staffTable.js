"use client";
import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"; // Adjust this import path to match your project's structure
import { Checkbox } from "@/components/ui/checkbox"; // Adjust this import path to match your project's structure
import { Pencil, Trash } from 'lucide-react'; // Ensure lucide-react is installed
import { updateStaffDetails, deleteStaff } from '@/app/manager/edit-staff/actions';

export default function StaffTable({ items }) {
    // This function handles clicking the pencil icon
    const handleEditClick = async (item) => {
        await updateStaffDetails(item);
    };

    // This function handles clicking the trash icon
    const handleDeleteClick = async (item) => {
        await deleteStaff(item)
    };

    return (
        <div className="w-9/12 text-ellipsis truncate">
            <Table className="border-2 border-customBrown text-xl">
                <TableHeader className="bg-customBrown text-customLight text-2xl font-bold">
                    <TableRow className="hover:bg-customBrown">
                        <TableHead className="w-[55px] border-customLight flex items-center"><Checkbox /></TableHead>
                        <TableHead className="w-[200px] text-customLight">Name</TableHead>
                        <TableHead className="w-[250px] text-customLight">Role</TableHead>
                        <TableHead className="w-[350px] text-customLight">Net Complaints</TableHead>
                        <TableHead className="text-customLight">Pay (hr)</TableHead>
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
                                    <Pencil className="cursor-pointer" onClick={() => handleEditClick(item)} />
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
