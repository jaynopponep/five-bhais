"use client"
import Navbar from "../../_components/navbar";
import Link from "next/link";
import { useState, useEffect } from "react";
import MenuSection from "./menuSection";
import { fetchMenu } from "../actions"
import MenuTable from "./menuTable";

export default function SurferMenu() {
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    fetchMenu()
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
        <div className="text-6xl font-bold mt-20 mb-4">Chef</div>
        <div className="border border-customBrown w-10/12 px-16 p-4">
          <MenuTable items={menu} />
        </div>
      </div>
    </div >
  );
}