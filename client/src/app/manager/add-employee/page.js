"use client";
import Navbar from "../../_components/navbar";
import { useState, useEffect } from "react";
import { Alert, AlertTitle } from "@/components/ui/alert";
import postNewEmployee from "./actions"; // Placeholder for importing the action to post new employee data
import { fetchUser } from "../../manageUser"; 
import Loading from "../../_components/loading"; 


export default function AddEmployee() {
  // State hooks for managing component state
  const [isLoading, setIsLoading] = useState(true); // State to track loading status

  // Effect hook to perform side effects (data fetching)
  useEffect(() => {
    // Fetch user data to ensure the user is a manager
    fetchUser()
      .then((data) => {
        if (data !== "manager") {
          window.location.href = "/"; // Redirect if not a manager
        } else {
          setIsLoading(false); // Set loading to false when check is complete
        }
      })
      .catch((error) => console.error(error)); // Log any errors that occur during fetch
  }, []);

  // Form data state
  const [formData, setFormData] = useState({
    name: "",
    pay: "",
    email: "",
    password: "",
    role: "",
  });

  // State for managing messages on the UI
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // Handle input changes for form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    try {
      // Attempt to post new employee data using an imported action
      const response = await postNewEmployee(formData);
      if (response.message) {
        setSuccessMsg(response.message); // Display success message
        setErrorMsg("");
        setTimeout(() => window.location.href = "/staff", 2000); // Redirect after successful submission
      }
    } catch (error) {
      setErrorMsg(error.message || "An error occurred. Try again."); // Display error message on failure
      setSuccessMsg("");
    }
  };

  // Conditional rendering for loading state
  if (isLoading) return <Loading />;

  // Render the component
  return (
    <div className="bg-customLight h-screen">
      <Navbar /> // Navigation bar component
      <div className="flex flex-col justify-center items-center text-customBlack">
        {errorMsg && ( // Conditionally render error message if present
          <Alert
            variant="destructive"
            className="w-[250px] text-center absolute top-24"
          >
            <AlertTitle>{errorMsg}</AlertTitle>
          </Alert>
        )}
        {successMsg && ( // Conditionally render success message if present
          <Alert
            variant="default"
            className="w-[250px] text-center absolute top-24"
          >
            <AlertTitle>{successMsg}</AlertTitle>
          </Alert>
        )}
        <div className="text-5xl font-bold mt-24 mb-4">Add Employee</div>
        <form className="flex flex-col items-left w-[350px]" onSubmit={handleSubmit}>
          // Input fields for employee data
          { /* Each input field is bound to a state value and updates on change */ }
          <label className="text-xl font-semibold text-left">Name</label>
          <input
            className="w-full bg-customLight border-2 border-customBlack rounded-md p-1 mb-3"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
          <label className="text-xl font-semibold text-left">Pay</label>
          <input
            className="w-full bg-customLight border-2 border-customBlack rounded-md p-1 mb-3"
            name="pay"
            type="number"
            value={formData.pay}
            onChange={handleInputChange}
            required
          />
          <label className="text-xl font-semibold text-left">Email</label>
          <input
            className="w-full bg-customLight border-2 border-customBlack rounded-md p-1 mb-3"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <label className="text-xl font-semibold text-left">Password</label>
          <input
            className="w-full bg-customLight border-2 border-customBlack rounded-md p-1 mb-3"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          <label className="text-xl font-semibold text-left">Role</label>
          <select
            className="w-full bg-customLight border-2 border-customBlack rounded-md p-1 mb-3"
            name="role"
            value={formData.role}
            onChange={handleInputChange}
            required
          >
            // Dropdown options for roles
            <option value="">Select a role</option>
            <option value="delivery driver">Delivery Driver</option>
            <option value="food importer">Food Importer</option>
            <option value="chef">Chef</option>
          </select>
          <button
            type="submit"
            className="w-[350px] mt-2 h-12 flex justify-center items-center rounded-lg bg-customOrange text-customLight hover:text-customBG hover:bg-customMain transition-colors duration-300"
          >
            // Submission button
            <p className="font-bold text-base md:text-xl">Add Employee</p>
          </button>
        </form>
      </div>
    </div>
  );
}
