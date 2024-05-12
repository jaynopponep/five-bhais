"use client";

import { useEffect, useState } from "react";
import StaffList from "./components/staffList";
import Loading from "../_components/loading";
import { fetchUser } from "../manageUser";

const StaffPage = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchUser()
            .then((data) => {
                setIsLoading(false);
            })
            .catch((error) => console.error(error));
    }, []);

    const renderMenuComponent = () => {
        return <StaffList />
    };

    if (isLoading) return <Loading />;

    return <div>{renderMenuComponent()}</div>;
};

export default StaffPage;
