"use client";
import React, { useState, useEffect } from "react";
import Navbar from "../../_components/navbar";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { postNewStaff } from "./actions"; // Importing the function to post new employee data
import { fetchUser } from "../../manageUser";
import Loading from "../../_components/loading";
import { useRouter } from "next/navigation";

export default function AddEmployee() {
  const router = useRouter();
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
    fetchUser()
      .then((data) => {
        if (data.role !== "manager") {
          router.push("/");
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
    setSuccessMsg("");
    try {
      const response = await postNewStaff(formData);
      if (response.success) {
        setSuccessMsg(response.message);
        setErrorMsg("");
        setTimeout(() => router.push("/manager/manage-staff"), 2000);
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
          <Alert
            variant="destructive"
            className="w-[250px] text-center absolute top-24"
          >
            <AlertTitle>{errorMsg}</AlertTitle>
          </Alert>
        )}
        {successMsg && (
          <Alert
            variant="default"
            className="w-[250px] text-center absolute top-24"
          >
            <AlertTitle>{successMsg}</AlertTitle>
          </Alert>
        )}
        <div className="text-5xl font-bold mt-24 mb-10">Employee Dashboard</div> 

        <div className="flex flex-wrap justify-between px-10 mt-10">
        <div className="w-full sm:w-1/2 lg:w-1/3 mb-4">
            <div className="bg-white rounded-lg p-11 shadow-md mb-4 mr-6">
            <h2 className="text-xl font-semibold mb-4 ">Orders</h2>
            <button

          className="w-[120px] mt-1 h-9 flex justify-center items-center rounded-lg bg-customOrange text-customLight hover:text-customBG hover:bg-customMain transition-colors duration-300"
        >
          <p className="font-bold text-base md:text-l">View Orders</p>
        </button>

            </div>
        </div>
        <div className="w-full sm:w-1/2 lg:w-1/3 mb-4">
            <div className="bg-white rounded-lg p-11 shadow-md mb-4 mr-6">
            <h2 className="text-xl font-semibold mb-4">Reviews</h2>

            <button

          className="w-[150px] mt-1 h-9 flex justify-center items-center rounded-lg bg-customOrange text-customLight hover:text-customBG hover:bg-customMain transition-colors duration-300"
        >
          <p className="font-bold text-base md:text-l">Browse Reviews</p>
        </button>

            </div>
        </div>
        <div className="w-full sm:w-1/2 lg:w-1/3 mb-4">
            <div className="bg-white rounded-lg p-11 shadow-md">
            <h2 className="text-xl font-semibold mb-4">HR</h2>

            <button
        //   onClick={handleSubmit}
          className="w-[120px] mt-1 h-9 flex justify-center items-center rounded-lg bg-customOrange text-customLight hover:text-customBG hover:bg-customMain transition-colors duration-300"
        >
          <p className="font-bold text-base md:text-l">Resources</p>
        </button>
            {/* <p>Learn About Resources</p> */}
            </div>
        </div>
        <div className="w-full sm:w-1/2 lg:w-1/3 mb-4">
            <div className="bg-white rounded-lg p-11 shadow-md mb-4 mr-6">
            <h2 className="text-xl font-semibold mb-4">Complaints</h2>

            <button

          className="w-[150px] mt-1 h-9 flex justify-center items-center rounded-lg bg-customOrange text-customLight hover:text-customBG hover:bg-customMain transition-colors duration-300"
        >
          <p className="font-bold text-base md:text-l">View Complaints</p>
        </button>

            {/* <p>File / View Complaints</p> */}
            </div>
        </div>
        <div className="w-full sm:w-1/2 lg:w-1/3 mb-4">
            <div className="bg-white rounded-lg p-11 shadow-md mb-4 mr-6">
            <h2 className="text-xl font-semibold mb-4">Delivery</h2>

            <button

          className="w-[120px] mt-1 h-9 flex justify-center items-center rounded-lg bg-customOrange text-customLight hover:text-customBG hover:bg-customMain transition-colors duration-300"
        >
          <p className="font-bold text-base md:text-l">View Delivery</p>

        </button>
            
            {/* <p>Check / Pick Up Delivery</p> */}

            </div>
        </div>
        <div className="w-full sm:w-1/2 lg:w-1/3 mb-4">
            <div className="bg-white rounded-lg p-11 shadow-md">
            <h2 className="text-xl font-semibold mb-4">Rewards</h2>
            {/* <p>Explore Rewards</p>*/}
            <button

          className="w-[120px] mt-1 h-9 flex justify-center items-center rounded-lg bg-customOrange text-customLight hover:text-customBG hover:bg-customMain transition-colors duration-300"
        >
          <p className="font-bold text-base md:text-l">Perks At Work</p>
        </button>
            </div>
        </div>
        </div>


        </div>



      </div>
    // </div>
  );
}




