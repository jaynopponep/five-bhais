"use client"
import Navbar from "../_components/navbar";
import Link from "next/link";
import { useState, useEffect } from "react";
import MenuSection from "./components/menuSection";
import fetchMenu from "./actions"

export default function Menu() {
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    fetchMenu()
      .then((data) => setMenu(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="bg-customLight">
      <Navbar />
      <div className="flex flex-col justify-center items-center text-customBlack">
        <div className="text-6xl font-bold mt-20 mb-4">Menu</div>
        <div className="border border-customBrown w-11/12 px-16 p-4">
          <MenuSection />
          <MenuSection />
          <MenuSection />
          <MenuSection />
        </div>
      </div>
    </div >
  );
}