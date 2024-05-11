"use client"

import Navbar from "./_components/navbar";
import foodPic from "../../public/food.png"
import Image from "next/image"
import Link from "next/link";
import ReviewCard from "./_components/reviewCard";
import { ChevronLeft, ChevronRight, Circle, CirclePlus } from 'lucide-react';
import { useState, useEffect } from "react";
import { fetchReviews } from "./actions";
import Loading from "./_components/loading";
import { fetchUser } from "./manageUser";

export default function Landing() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState();
  const [reviews, setReviews] = useState([]);
  const [driverReviews, setDriverReviews] = useState([]);

  useEffect(() => {
    fetchUser()
      .then((data) => {
        setUser(data);
        fetchReviews()
          .then((data) => {
            setReviews(data[0]);
            setDriverReviews(data[1]);
            setIsLoading(false);
          })
          .catch((error) => console.error(error));
      })
      .catch((error) => console.error(error));
  }, []);

  const [reviewPageIdx, setReviewPageIdx] = useState(1)
  const [driverReviewPageIdx, setDriverReviewPageIdx] = useState(1)

  const handleClick = (reviewType, direction) => {
    if (reviewType === "review" && direction === "left" && reviewPageIdx > 1) {
      setReviewPageIdx(reviewPageIdx - 1)
    } else if (reviewType === "review" && direction === "right" && reviewPageIdx < Math.ceil(reviews.length / 3)) {
      setReviewPageIdx(reviewPageIdx + 1)
    } else if (reviewType === "driver" && direction === "left" && driverReviewPageIdx > 1) {
      setDriverReviewPageIdx(driverReviewPageIdx - 1)
    } else if (reviewType === "driver" && direction === "right" && driverReviewPageIdx < Math.ceil(driverReviews.length / 3)) {
      setDriverReviewPageIdx(driverReviewPageIdx + 1)
    }
  }

  if (isLoading) return <Loading />;
  return (
    <div>
      <Navbar />
      <div className="bg-customLight h-full pb-10 overflow-hidden">
        <div className="h-[450px] flex items-center justify-center">
          <div className="absolute z-50 text-6xl text-customLight text-center flex flex-col items-center justify-center">
            <div>Experience The <span className="text-customOrange">Flavors</span></div>
            <div>of <span className="text-customOrange">India</span> in <span className="text-customOrange">NYC</span></div>
            <Link href="signup"><div className="bg-customOrange text-3xl font-bold w-56 h-12 rounded-lg flex items-center justify-center mt-16">
              Get Started
            </div></Link>
          </div>
          <div className="h-[450px] w-screen relative">
            <div className="bg-customBlack/60 w-screen h-[450px] z-10 absolute"></div>
            <Image layout="fill" src={foodPic} alt="food" objectFit="cover" />
          </div>
        </div>
        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-col justify-center items-center w-full">
            <div className="flex justify-between w-9/12 items-center">
              <div className="w-[136px]"></div>
              <div className="text-5xl text-center font-bold mt-12 mb-6">Reviews</div>
              {user.role === 'customer' ? (
                <Link href='add-review'>
                  <div className="bg-green-600 text-customLight rounded-full p-2 mt-6 flex justify-between w-[136px]">
                    <CirclePlus />
                    <div>Add Review</div>
                  </div>
                </Link>
              ) : <div className="w-[136px]"></div>}
            </div>
            <div className="flex justify-between w-11/12 items-center">
              <ChevronLeft onClick={() => handleClick("review", "left")} size={64} className="cursor-pointer" />

              {reviews.slice((reviewPageIdx - 1) * 3, reviewPageIdx * 3).map((review, index) => (
                <ReviewCard review={review} key={index} />
              ))}
              <ChevronRight onClick={() => handleClick("review", "right")} size={64} className="cursor-pointer" />
            </div>
            <div className="flex text-customOrange mt-4">
              {Array.from({ length: Math.ceil(reviews.length / 3) }, (_, index) => (
                <Circle key={index} size={24} fill={index + 1 === reviewPageIdx ? "#F75C03" : "none"} />
              ))}
            </div>
          </div>
          <div className="flex flex-col justify-center items-center w-full">
            <div className="flex justify-between w-9/12 items-center">
              <div className="w-[136px]"></div>
              <div className="text-5xl text-center font-bold mt-12 mb-6">Driver Reviews</div>
              {user.role === 'customer' ? (
                <Link href='add-review'>
                  <div className="bg-green-600 text-customLight rounded-full p-2 mt-6 flex justify-between w-[136px]">
                    <CirclePlus />
                    <div>Add Review</div>
                  </div>
                </Link>
              ) : <div className="w-[136px]"></div>}
            </div>
            <div className="flex justify-between w-11/12 items-center">
              <ChevronLeft onClick={() => handleClick("driver", "left")} size={64} className="cursor-pointer" />

              {driverReviews.slice((driverReviewPageIdx - 1) * 3, driverReviewPageIdx * 3).map((review, index) => (
                <ReviewCard review={review} key={index} />
              ))}
              <ChevronRight onClick={() => handleClick("driver", "right")} size={64} className="cursor-pointer" />
            </div>
            <div className="flex text-customOrange mt-4">
              {Array.from({ length: Math.ceil(driverReviews.length / 3) }, (_, index) => (
                <Circle key={index} size={24} fill={index + 1 === driverReviewPageIdx ? "#F75C03" : "none"} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}