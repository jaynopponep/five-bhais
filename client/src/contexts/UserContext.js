import React, { createContext, useState, useEffect } from "react";

// Create the context
const UserContext = createContext();

// This component will wrap your application and provide user data
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching user data from an API or local storage
    const fetchUserData = async () => {
      // Assuming you fetch user data here (e.g., from localStorage or an API)
      // For demonstration, we'll just use a hardcoded user
      const user = {
        email: "user@example.com",
        userType: "customer",
      };
      setCurrentUser(user);
      setIsLoading(false);
    };

    fetchUserData();
  }, []);

  if (isLoading) {
    return <div>Loading user data...</div>; // Optional: Loading component while fetching user data
  }

  return (
    <UserContext.Provider value={{ currentUser }}>
      {children}
    </UserContext.Provider>
  );
};
