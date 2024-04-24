import Navbar from "./_components/navbar";
import foodPic from "../../public/food.png"
import Image from "next/image"
import Link from "next/link";
import ReviewCard from "./_components/reviewCard";

export default function Landing() {
  return (
    <div>
      <Navbar />
      <div className="bg-customLight h-full pb-10 overflow-hidden">
        <div className="h-[450px] flex items-center justify-center">
          <div className="absolute z-50 text-6xl text-customLight text-center flex flex-col items-center justify-center">
            <div>Experience The <span className="text-customOrange">Flavors</span></div>
            <div>of <span className="text-customOrange">India</span> in <span className="text-customOrange">NYC</span></div>
            <div className="bg-customOrange text-3xl font-bold w-56 h-12 rounded-lg flex items-center justify-center mt-16">
              <Link href="signup">Get Started</Link>
            </div>
          </div>
          <div className="h-[450px] w-screen relative">
            <div className="bg-customBlack/60 w-screen h-[450px] z-10 absolute"></div>
            <Image layout="fill" src={foodPic} alt="food" objectFit="cover" />
          </div>
        </div>
        <div className="flex flex-col justify-center items-center">
          <div className="text-5xl text-center font-bold mt-12 mb-6">Reviews</div>
          <div className="flex justify-between w-11/12">
            <ReviewCard />
            <ReviewCard />
            <ReviewCard />

          </div>
        </div>
      </div>
    </div>
  );
}
