"use client"
import Navbar from "../_components/navbar";
import Link from "next/link";
import { useState, useEffect } from "react";
import login from "./actions";
import { Alert, AlertTitle } from "@/components/ui/alert"
import { useRouter } from 'next/navigation'
import Loading from '../_components/loading';

export default function Login() {
  const [isLoading, setIsLoading] = useState(true);
  const [thisUser, setThisUser] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();
  const [formData, setFormData] = useState({
    balance: "",
  });

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    console.log(user)
    if (user.role != "customer" && user.role != "vipcustomer") {
      router.push("/")
    } else {
      setThisUser(user);
      setIsLoading(false);
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleBalanceSubmit = (e) => {
    e.preventDefault();
    setErrorMsg("");
    try {
      const newBalance = parseFloat(formData.balance);
      if (isNaN(newBalance)) {
        setErrorMsg("Please enter a valid balance.");
        return;
      }
      thisUser.balance += newBalance;
      sessionStorage.setItem("user", JSON.stringify(thisUser));
      setThisUser(thisUser);
      // wait 1 second
      setTimeout(() => {
        setFormData({ balance: "" });
      }, 1000);
    } catch (error) {
      setErrorMsg(error.message || "An error occurred. Try again.")
    }
  }


  if (isLoading) return <Loading />;
  return (
    <div className="bg-customLight h-screen">
      <Navbar />

      <div className="flex flex-col items-center justify-center text-customBlack">
        {errorMsg ? <Alert variant="destructive" className="w-[250px] text-center absolute top-24">
          <AlertTitle>{errorMsg}</AlertTitle>
        </Alert> : null}
        <div>
          <div className="text-5xl font-bold mt-20 mb-4">Profile</div>
          <div className="text-left">
            <div className="flex flex-row gap-3 text-xl text-left">
              <div className="font-semibold">Email:</div>
              <div>{thisUser.email}</div>
            </div>
            <div className="flex flex-row gap-3 text-xl text-left">
              <div className="font-semibold">Name:</div>
              <div>{thisUser.fname} {thisUser.lname}</div>
            </div>
            <div className="flex flex-row gap-3 text-xl text-left">
              <div className="font-semibold">Your Balance:</div>
              <div>${thisUser.balance.toFixed(2)}</div>
            </div>
            <div className="flex flex-row gap-3 text-xl text-left">
              <div className="font-semibold">Status:</div>
              <div>{thisUser.role}</div>
            </div>
          </div>
          <div className="mt-8">
            <form onSubmit={handleBalanceSubmit}>
              <div className="flex flex-row gap-3">
                <input
                  type="number"
                  name="balance"
                  id="balance"
                  placeholder="Enter new balance"
                  value={formData.balance}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                  Update Balance
                </button>
              </div>
            </form>
          </div>

        </div>

      </div>
    </div >
  );
}