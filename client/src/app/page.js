import Navbar from "./_components/navbar";
import foodPic from "../../public/food.png"
import Image from "next/image"

export default function Landing() {
  return (
    <div>
      <Navbar />
      <div className="bg-customLight h-screen">
        <div className="h-[450px] flex items-center justify-center">
          <div className="absolute z-50 text-6xl text-customLight text-center flex flex-col items-center justify-center">
            <div>Experience The <span className="text-customOrange">Flavors</span></div>
            <div>of <span className="text-customOrange">India</span> in <span className="text-customOrange">NYC</span></div>
            <div className="bg-customOrange text-3xl font-bold w-56 h-12 rounded-lg flex items-center justify-center mt-16">Get Started</div>
          </div>
          <div className="h-[450px] w-screen relative">
            <div className="bg-customBlack/60 w-screen h-[450px] z-10 absolute"></div>
            <Image layout="fill" src={foodPic} alt="food" />
          </div>


        </div>
      </div>
    </div>
  );
}
