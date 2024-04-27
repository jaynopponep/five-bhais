"use client"
import Navbar from "../../_components/navbar";
import Link from "next/link";
import { useState, useEffect } from "react";
import MenuSection from "./menuSection";
import { fetchMenu } from "../actions"

export default function SurferMenu() {
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    fetchMenu()
      .then((data) => setMenu(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="bg-customLight">
      <Navbar />
      <div className="flex flex-col justify-center items-center text-customBlack pb-16">
        <div className="text-6xl font-bold mt-20 mb-4">Menu</div>
        <div className="border border-customBrown w-10/12 px-16 p-4">
          {menu.map((section, idx) => (
            <MenuSection key={idx} title={section.sectionTitle} items={section.items} />
          ))}
        </div>
      </div>
    </div >
  );
}