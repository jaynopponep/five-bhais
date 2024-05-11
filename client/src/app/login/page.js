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
      <div>
        <div className="flex flex-col justify-center items-center text-customBlack">
          {errorMsg ? <Alert variant="destructive" className="w-[250px] text-center absolute top-24">
            <AlertTitle>{errorMsg}</AlertTitle>
          </Alert> : null}
          <div className="text-5xl font-bold mt-20 mb-4">Log In</div>
          <form className="flex flex-col items-left w-[350px]">
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
          </form>
          <button onClick={handleSubmit} className="w-[350px] mt-2 h-12 flex justify-center items-center rounded-lg bg-customOrange text-customLight hover:text-customBG hover:bg-customMain transition-colors duration-300">
            <p className="font-bold text-base md:text-xl">Log In</p>
          </button>
          <div className="text-lg mt-3 font-semilight">Don't have an account? <Link href="signup" className="font-bold text-blue-600">Sign Up</Link></div>
        </div>

      </div>
    </div >
  );
}