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
import { updateStaffDetails, deleteStaff } from '@/app/manager/edit-staff/actions';
import { useRouter } from 'next/navigation';

export default function StaffTable({ staff }) {
    const router = useRouter();

    const handleEditClick = async (itemId) => {
        router.push(`/manager/edit-staff?itemId=${itemId}`);
    };

    // This function handles clicking the trash icon
    const handleDeleteClick = async (item) => {
        await deleteStaff(item)
        window.location.reload();
    };

    return (
        <div className="w-9/12 text-ellipsis truncate">
            <Table className="border-2 border-customBrown text-xl">
                <TableHeader className="bg-customBrown text-customLight text-2xl font-bold">
                    <TableRow className="hover:bg-customBrown">
                        <TableHead className="w-[55px] border-customLight flex items-center"><Checkbox /></TableHead>
                        <TableHead className="w-[400px] text-customLight text-center">Name</TableHead>
                        <TableHead className="w-[400px] text-customLight text-center">Role</TableHead>
                        <TableHead className="w-[400px] text-customLight text-center">Net Complaints</TableHead>
                        <TableHead className="text-customLight w-[300px] text-center">Pay (hr)</TableHead>
                        <TableHead className="text-right text-customLight">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {staff.map((item, index) => (
                        <TableRow key={index} className={index % 2 === 1 ? "bg-customBrown/10 hover:bg-customBrown/10" : "hover:bg-customLight"}>
                            <TableCell className="flex mt-1"><Checkbox /></TableCell>
                            <TableCell className="text-center">{item.name}</TableCell>
                            <TableCell className="text-center text-ellipsis truncate w-[500px]">{item.role}</TableCell>
                            <TableCell className="text-center">{item.netComplaints}0</TableCell>
                            <TableCell className="text-center">{item.pay}</TableCell>
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
