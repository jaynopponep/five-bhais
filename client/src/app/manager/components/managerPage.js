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

export default function EmployeeTable({ employees }) {
  // This function handles clicking the pencil icon
  const handleEditClick = async (employee) => {
    // placeholder for once the backend is done
    // await updateEmployeeDetails(employee);
    console.log('Update functionality should go here');
  };

  // This function handles clicking the trash icon
  const handleDeleteClick = async (employee) => {
    // placeholder for once the backend is done
    // await deleteEmployee(employee);
    console.log('Delete functionality should go here');
  };

  return (
    <div className="w-9/12 text-ellipsis truncate">
      <Table className="border-2 border-customBrown text-xl">
        <TableHeader className="bg-customBrown text-customLight text-2xl font-bold">
          <TableRow className="hover:bg-customBrown">
            <TableHead className="w-[50px] border-customLight flex items-center"><Checkbox /></TableHead>
            <TableHead className="w-[250px] text-customLight">First Name</TableHead>
            <TableHead className="w-[250px] text-customLight">Last Name</TableHead>
            <TableHead className="w-[250px] text-customLight">Email</TableHead>
            <TableHead className="w-[175px] text-customLight">Position</TableHead>
            <TableHead className="text-right text-customLight">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {employees.map((employee, index) => (
            <TableRow key={index} className={index % 2 === 1 ? "bg-customBrown/10 hover:bg-customBrown/10" : "hover:bg-customLight"}>
              <TableCell className="flex mt-1"><Checkbox /></TableCell>
              <TableCell>{employee.firstName}</TableCell>
              <TableCell>{employee.lastName}</TableCell>
              <TableCell>{employee.email}</TableCell>
              <TableCell>{employee.position}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-around">
                  <Pencil className="cursor-pointer" onClick={() => handleEditClick(employee)} />
                  <Trash className="cursor-pointer" onClick={() => handleDeleteClick(employee)} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
