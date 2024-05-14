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
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

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


  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    try {
      const data = await login(formData);
      if (data) {
        setUser(data.user);
        router.push("/")
      }
    } catch (error) {
      setErrorMsg(error.message || "An error occurred. Try again.")
    }
  };

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
              <div>${thisUser.balance}</div>
            </div>
            <div className="flex flex-row gap-3 text-xl text-left">
              <div className="font-semibold">Status:</div>
              <div>{thisUser.role}</div>
            </div>
          </div>

        </div>

      </div>
    </div >
  );
}