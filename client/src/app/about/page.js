"use client"
import Navbar from "../_components/navbar";
import Link from "next/link";
import { useState, useEffect } from "react";
import login from "./actions";
import { Alert, AlertTitle } from "@/components/ui/alert"
import { useRouter } from 'next/navigation'
import { fetchUser, setUser } from "../manageUser";
import Loading from '../_components/loading';

export default function Login() {
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetchUser()
      .then((user) => {
        if (user.role != "surfer") {
          router.push("/")
        } else {
          setIsLoading(false);
        }
      })
      .catch((error) => console.error(error));
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

    </div >
  );
}