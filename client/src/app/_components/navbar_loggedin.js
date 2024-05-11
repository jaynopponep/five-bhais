import { LucideShoppingBag } from "lucide-react";
import Link from "next/link";

export default function NavbarLogged() {
  return (
    <>
      <div className="bg-customBrown text-customLight flex justify-between items-center p-4">
        <Link href="/" className="text-5xl font-extrabold">
          Bhai Brothers
        </Link>
        <div className="text-2xl flex justify-around w-80">
          <Link href="menu">
            <div>Menu</div>
          </Link>
          <Link href="about">
            <div>About</div>
          </Link>
          <Link
            href="checkout"
            className="font-extrabold flex items-center justify-between w-[105px]"
          >
            <LucideShoppingBag />
          </Link>
        </div>
      </div>
    </>
  );
}
