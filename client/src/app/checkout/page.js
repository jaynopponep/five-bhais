"use client"
import Navbar from "../_components/navbar";
import { useEffect, useState } from "react";
import { Alert, AlertTitle } from "@/components/ui/alert"
import Cart from './components/cart';
import CheckoutBox from './components/checkoutBox';
import Loading from '../_components/loading';

export default function Checkout() {
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [formData, setFormData] = useState({
    address: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
  });
  const [orderType, setOrderType] = useState("delivery");

  const handleInputChange = (e) => {
    console.log(e)
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    try {
      const user = await login(formData);
      if (user) {
        window.location.href = "/";
      }
    } catch (error) {
      setErrorMsg(error.message || "An error occurred. Try again.")
    }
  };

  return (
    <div className="bg-customLight pb-10">
      <Navbar />
      <div className="mt-20 ml-12 flex justify-around">
        <div className="w-7/12">
          <div className="text-4xl font-bold mb-6">Your Cart</div>
          <Cart />
        </div>
        <CheckoutBox
          formData={formData}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
        />

      </div>
    </div >
  );
}