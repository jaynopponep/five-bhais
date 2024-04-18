import { LogIn } from 'lucide-react';

export default function Navbar() {
  return (
    <>
      <div className="bg-customBrown text-customLight flex justify-between items-center p-4">
        <div className="text-5xl font-extrabold">Bhai Brothers</div>
        <div className="text-2xl flex justify-around w-80">
          <div>Menu</div>
          <div>About</div>
          <div className="font-extrabold flex items-center justify-between w-[105px]">
            <LogIn />
            <div>Sign In</div>
          </div>
        </div>

      </div>
    </>
  );
}
