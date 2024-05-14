"use client";

import { useEffect, useState } from "react";
import StaffList from "../components/staffList";
import Loading from "../../_components/loading";
import { fetchUser } from "../../manageUser";
import { fetchStaff } from "./actions";
import { useRouter } from "next/navigation";

const StaffPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [staff, setStaff] = useState([]);
  useEffect(() => {
    fetchUser()
      .then((data) => {
        if (data.role !== "manager") {
          router.push("/");
        } else {
          fetchStaff()
            .then((data) => {
              setStaff(data);
              setIsLoading(false);
            })
            .catch((error) => console.error(error));
        }
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {}, []);

  if (isLoading) return <Loading />;

  return (
    <div className="min-h-screen bg-customLight">
      <StaffList staff={staff} />
    </div>
  );
};

export default StaffPage;
