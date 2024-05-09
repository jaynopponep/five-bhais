"use client";

import { useEffect, useState } from "react";
import ChefMenu from "./components/chefMenu";
import CustomerMenu from "./components/customerMenu";
import SurferMenu from "./components/surferMenu";
import Loading from "../_components/loading";
import { fetchUserType } from "./actions";

const MenuPage = () => {
  const [userType, setUserType] = useState(""); // State to store user type
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // placeholder, need to automatically retrieve email
    fetchUserType()
      .then((data) => {
        setUserType(data);
        setIsLoading(false);
      })
      .catch((error) => console.error(error));
  }, []);

  // Function to render the appropriate menu component based on user type
  const renderMenuComponent = () => {
    switch (userType) {
      case "chef":
        return <ChefMenu />;
      case "customer":
        return <CustomerMenu />;
      default:
        return <SurferMenu />;
    }
  };

  if (isLoading) return <Loading />;

  return <div>{renderMenuComponent()}</div>;
};

export default MenuPage;
