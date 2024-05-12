"use client"
import Navbar from "../../_components/navbar";
import Link from "next/link";
import StaffTable from "./staffTable";
import { CirclePlus, Trash } from 'lucide-react';


export default function StaffList({ staff }) {

    return (
        <div className="bg-customLight">
            <Navbar />
            <div className="flex flex-col justify-center items-center text-customBlack pb-16">
                <div className="text-6xl font-bold mt-20 mb-4">Manage Staff</div>
                <div className="flex w-9/12 pb-2 text-customLight items-center">
                    <Link href="/manager/add-employee">
                        <div className="flex justify-around bg-green-600 mr-4 p-2 rounded-full w-20 cursor-pointer">
                            <CirclePlus />
                            <div>New</div>
                        </div>
                    </Link>
                    <div className="flex justify-around bg-red-600 p-2 rounded-full w-24 cursor-pointer">
                        <Trash />
                        <div>Delete</div>
                    </div>
                </div>
                <StaffTable staff={staff} />
            </div>
        </div >
    );
}