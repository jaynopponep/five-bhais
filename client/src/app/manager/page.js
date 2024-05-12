"use client"
import Navbar from "../_components/navbar";
import Link from "next/link";
import { useState, useEffect } from "react";
import { fetchStaff } from "./actions"
import StaffTable from "./components/staffTable";
import { CirclePlus, Trash } from 'lucide-react';


export default function SurferMenu() {
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    fetchStaff()
        .then((data) => {
          const flattenedMenu = data.flatMap(({ sectionTitle, items }) =>
              items.map((item) => ({ ...item, sectionTitle }))
          );
          setMenu(flattenedMenu)
        })
        .catch((error) => console.error(error));
  }, []);

  return (
      <div className="bg-customLight">
        <Navbar />
        <div className="flex flex-col justify-center items-center text-customBlack pb-16">
          <div className="text-6xl font-bold mt-20 mb-4">Manage Staff</div>
          <div className="flex w-9/12 pb-2 text-customLight items-center">
            <Link href="menu/add-item">
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
          <StaffTable items={menu} />
        </div>
      </div >
  );
}