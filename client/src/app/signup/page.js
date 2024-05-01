"use client"
import Navbar from "../_components/navbar";
import Link from "next/link";
import { useState } from "react";
import signUp from "./actions";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"


export default function SignUp() {

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    initialDeposit: "",
    password: "",
    confirmPassword: "",
  });

  const [errorMsg, setErrorMsg] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setErrorMsg("Passwords do not match.")
    } else {
      setErrorMsg("")
      try {
        const user = await signUp(formData);
        if (user) {
          window.location.href = "/";
        }
      } catch (error) {
        setErrorMsg(error.message || "An error occurred. Try again.")
      }
    }
  };

  return (
    <div className="bg-customLight h-screen">
      <Navbar />

      <div>
        <div className="flex flex-col justify-center items-center text-customBlack">
          {errorMsg ? <Alert variant="destructive" className="w-[250px] text-center absolute top-24">
            <AlertTitle>{errorMsg}</AlertTitle>
          </Alert> : null}

          <div className="text-5xl font-bold mt-20 mb-4">Sign Up</div>
          <form onSubmit={handleSubmit} className="flex flex-col items-left w-[350px]">
            <div className="flex">
              <div>
                <label
                  className="text-xl font-semibold text-left"
                  htmlFor="firstName">First Name</label>
                <input
                  className="w-[170px] bg-customLight border-2 border-customBlack rounded-md p-1 mb-3"
                  id="firstName"
                  name="firstName"
                  type="text"
                  placeholder=""
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label
                  className="text-xl font-semibold text-left"
                  htmlFor="lastName">Last Name</label>
                <input
                  className="w-[170px] bg-customLight border-2 border-customBlack rounded-md p-1 mb-3"
                  id="lastName"
                  name="lastName"
                  type="text"
                  placeholder=""
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <label
              className="text-xl font-semibold text-left"
              htmlFor="email">Email</label>
            <input
              className="w-full bg-customLight border-2 border-customBlack rounded-md p-1 mb-3"
              id="email"
              name="email"
              type="email"
              placeholder=""
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <label
              className="text-xl font-semibold text-left"
              htmlFor="initialDeposit">Initial Deposit ($)</label>
            <input
              className="w-full bg-customLight border-2 border-customBlack rounded-md p-1 mb-3"
              id="initialDeposit"
              name="initialDeposit"
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              value={formData.initialDeposit}
              onChange={handleInputChange}
              required
            />
            <label
              className="text-xl font-semibold text-left"
              htmlFor="password">Password</label>
            <input
              className="w-full bg-customLight border-2 border-customBlack rounded-md p-1 mb-3"
              id="password"
              name="password"
              type="password"
              placeholder=""
              value={formData.password}
              onChange={handleInputChange}
              required
            />
            <label
              className="text-xl font-semibold text-left"
              htmlFor="confirmPassword">Confirm Password</label>
            <input
              className="w-full bg-customLight border-2 border-customBlack rounded-md p-1 mb-3"
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder=""
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
            />
            <button className="w-[350px] mt-2 h-12 flex justify-center items-center rounded-lg bg-customOrange text-customLight hover:text-customBG hover:bg-customMain transition-colors duration-300">
              <p className="font-bold text-base md:text-xl">Create Account</p>
            </button>
          </form>
          <div className="text-lg mt-3 font-semilight">Already have an account? <Link href="login" className="font-bold text-blue-600">Log In</Link></div>
        </div>

      </div>
    </div >
  );
}