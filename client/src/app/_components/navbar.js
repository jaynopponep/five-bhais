import { LogIn } from 'lucide-react';
import Link from 'next/link'
import { fetchUser, logout } from "../manageUser"
import { useState, useEffect } from "react";
import { ShoppingCart, UserRound, LogOut } from 'lucide-react';

const handleLogout = () => {
  logout()
    .then(() => {
      window.location.reload();
    })
    .catch((error) => console.error(error));
}

const SurferNavbar = () => {
  return (
    <>
      <div className="bg-customBrown text-customLight flex justify-between items-center p-4">
        <Link href="/" className="text-5xl font-extrabold">Bhai Brothers</Link>
        <div className="text-2xl flex justify-around w-80">
          <Link href="menu"><div>Menu</div></Link>
          <Link href="about"><div>About</div></Link>
          <Link href="login" className="font-extrabold flex items-center justify-between w-[105px]">
            <LogIn />
            <div>Sign In</div>
          </Link>
        </div>

      </div>
    </>
  );
}

const CustomerNavBar = () => {
  return (
    <>
      <div className="bg-customBrown text-customLight flex justify-between items-center p-4">
        <Link href="/" className="text-5xl font-extrabold">Bhai Brothers</Link>
        <div className="text-2xl flex justify-around w-96 items-center">
          <Link href="menu"><div>Menu</div></Link>
          <Link href="about"><div>About</div></Link>
          <Link href="checkout" className="">
            <ShoppingCart />
          </Link>
          <Link href="profile" className="">
            <UserRound />
          </Link>
          <div className="cursor-pointer" onClick={handleLogout}>
            <LogOut />
          </div>
        </div>

      </div>
    </>
  );
}

export default function Navbar() {
  const [userType, setUserType] = useState("surfer");
  useEffect(() => {
    fetchUser()
      .then((user) => {
        setUserType(user.role);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      {userType === "customer" ? <CustomerNavBar /> : <SurferNavbar />}
    </>
  );
}
