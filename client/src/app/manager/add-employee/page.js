"use client";
import React, { useState, useEffect } from 'react';
import Navbar from '../../_components/navbar';
import { Alert, AlertTitle } from "@/components/ui/alert";
import { postNewStaff } from "./actions"; // Importing the function to post new employee data
import { fetchUser } from "../../manageUser";
import Loading from "../../_components/loading";

export default function AddEmployee() {
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    pay: "",
    email: "",
    password: "",
    role: "",
  });
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    fetchUser().then(data => {
      if (data.role !== "manager") {
        window.location.href = "/";
      } else {
        setIsLoading(false);
      }
    }).catch(error => console.error(error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    try {
      const response = await postNewStaff(formData);
      if (response.success) {
        setSuccessMsg(response.message);
        setErrorMsg("");
        setTimeout(() => window.location.href = "/staff", 2000);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      setErrorMsg(error.message || "An error occurred. Try again.");
      setSuccessMsg("");
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="bg-customLight h-screen">
      <Navbar />
      <div className="flex flex-col justify-center items-center text-customBlack">
        {errorMsg && (
          <Alert variant="destructive" className="w-[250px] text-center absolute top-24">
            <AlertTitle>{errorMsg}</AlertTitle>
          </Alert>
        )}
        {successMsg && (
          <Alert variant="default" className="w-[250px] text-center absolute top-24">
            <AlertTitle>{successMsg}</AlertTitle>
          </Alert>
        )}
        <div className="text-5xl font-bold mt-24 mb-4">Add Employee</div>
        <form className="flex flex-col items-left w-[350px]">
          <label className="text-xl font-semibold text-left" htmlFor="email">
            Name
          </label>
          <input
            className="w-full bg-customLight border-2 border-customBlack rounded-md p-1 mb-3"
            id="name"
            name="name"
            type="text"
            placeholder=""
            value={formData.name}
            onChange={handleInputChange}
            required
          />
          <label
            className="text-xl font-semibold text-left"
            htmlFor="description"
          >
            Description
          </label>
          <input
            className="w-full bg-customLight border-2 border-customBlack rounded-md p-1 mb-3"
            id="description"
            name="description"
            type="text"
            placeholder=""
            value={formData.description}
            onChange={handleInputChange}
            required
          />
          <label className="text-xl font-semibold text-left" htmlFor="price">
            Price
          </label>
          <input
            className="w-full bg-customLight border-2 border-customBlack rounded-md p-1 mb-3"
            id="price"
            name="price"
            type="number"
            placeholder=""
            value={formData.price}
            onChange={handleInputChange}
            required
          />
          <label
            className="text-xl font-semibold text-left"
            htmlFor="role"
          >
            Role
          </label>
          <select
            className="w-full bg-customLight border-2 border-customBlack rounded-md p-1 mb-3"
            id="role"
            name="role"
            value={formData.category}
            onChange={handleInputChange}
            placeholder="Select a role"
            required
          >
            <option value="">Select a role</option>
            <option value="deliverydriver">Delivery Driver</option>
            <option value="foodimporter">Food Importer</option>
            <option value="chef">Chef</option>
          </select>
        </form>
        <button
          onClick={handleSubmit}
          className="w-[350px] mt-2 h-12 flex justify-center items-center rounded-lg bg-customOrange text-customLight hover:text-customBG hover:bg-customMain transition-colors duration-300"
        >
          <p className="font-bold text-base md:text-xl">Add Staff</p>
        </button>
      </div>
    </div>
  );
}
