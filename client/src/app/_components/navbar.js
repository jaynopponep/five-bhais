import { LogIn } from 'lucide-react';
import Link from 'next/link'

export default function Navbar() {
  return (
    <>
      <div className="bg-customBrown text-customLight flex justify-between items-center p-4">
        <Link href="/" className="text-5xl font-extrabold">Bhai Brothers</Link>
        <div className="text-2xl flex justify-around w-80">
          <div>Menu</div>
          <div>About</div>
          <Link href="login" className="font-extrabold flex items-center justify-between w-[105px]">
            <LogIn />
            <div>Sign In</div>
          </Link>
        </div>

      </div>
    </>
  );
}
