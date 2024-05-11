"use client";

import { useEffect, useState } from "react";
import ChefMenu from "./components/chefMenu";
import CustomerMenu from "./components/customerMenu";
import SurferMenu from "./components/surferMenu";
import Loading from "../_components/loading";
import { fetchUser } from "../manageUser";

const MenuPage = () => {
  const [userType, setUserType] = useState(""); // State to store user type
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchUser()
      .then((data) => {
        setUserType(data.role);
        setIsLoading(false);
      })
      .catch((error) => console.error(error));
  }, []);

  const renderMenuComponent = () => {
    switch (userType) {
      case "chef":
        return <ChefMenu />;
      case "customer":
      case "vipcustomer":
        return <CustomerMenu />;
      default:
        return <SurferMenu />;
    }
  };

  if (isLoading) return <Loading />;

  return <div>{renderMenuComponent()}</div>;
};

export default MenuPage;
