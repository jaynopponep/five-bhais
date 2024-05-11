"use client";
import Navbar from "../../_components/navbar";
import { useState, useEffect } from "react";
import { Alert, AlertTitle } from "@/components/ui/alert";
import postNewItem from "./actions";
import { fetchUser } from "../../manageUser";
import Loading from "../../_components/loading";

export default function AddItem() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchUser()
      .then((data) => {
        if (data !== "chef") {
          window.location.href = "/menu";
        } else {
          setIsLoading(false);
        }
      })
      .catch((error) => console.error(error));
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
  });

  const [successMsg, setSuccessMsg] = useState("");
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
    setErrorMsg("");
    setSuccessMsg("");
    try {
      const response = await postNewItem(formData);
      if (response.message) {
        setSuccessMsg(response.message);
        setErrorMsg("");
      }
      window.location.href = "/menu";
    } catch (error) {
      setErrorMsg(error.message || "An error occurred. Try again.");
      setSuccessMsg("");
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="bg-customLight h-screen">
      <Navbar />
      <div>
        <div className="flex flex-col justify-center items-center text-customBlack">
          {errorMsg ? (
            <Alert
              variant="destructive"
              className="w-[250px] text-center absolute top-24"
            >
              <AlertTitle>{errorMsg}</AlertTitle>
            </Alert>
          ) : null}
          {successMsg ? (
            <Alert
              variant="default"
              className="w-[250px] text-center absolute top-24"
            >
              <AlertTitle>{successMsg}</AlertTitle>
            </Alert>
          ) : null}
          <div className="text-5xl font-bold mt-24 mb-4">Add Menu Item</div>
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
              htmlFor="category"
            >
              Category
            </label>
            <select
              className="w-full bg-customLight border-2 border-customBlack rounded-md p-1 mb-3"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              placeholder="Select a category"
              required
            >
              <option value="">Select a category</option>
              <option value="appetizer">Appetizer</option>
              <option value="main">Main</option>
              <option value="dessert">Dessert</option>
              <option value="side">Side</option>
              <option value="drink">Drink</option>
            </select>
          </form>
          <button
            onClick={handleSubmit}
            className="w-[350px] mt-2 h-12 flex justify-center items-center rounded-lg bg-customOrange text-customLight hover:text-customBG hover:bg-customMain transition-colors duration-300"
          >
            <p className="font-bold text-base md:text-xl">Add Item</p>
          </button>
        </div>
      </div>
    </div>
  );
}
