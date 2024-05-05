"use client"

import Navbar from "./_components/navbar";
import foodPic from "../../public/food.png"
import Image from "next/image"
import Link from "next/link";
import ReviewCard from "./_components/reviewCard";
import { ChevronLeft, ChevronRight, Circle } from 'lucide-react';
import { useState } from "react";

export default function Landing() {
  //TODO: Replace these hardcoded reviews with actual reviews from the database

  const review1 = {
    rating: 5,
    date: "4/13/2024",
    text: "Excellent staff, service, and food! Was in town for a few days ace, and food! Was in town for a few days ace, and food! Was in town for a few days ace, and food! Was in town for a few days ace, and food! Was in town for a few days and had a great meal and great conversation. Highly recommend!",
    author: "John D."
  }
  const review2 = {
    rating: 4,
    date: "4/14/2024",
    text: "The food was amazing! The service was great. I would definitely come back.",
    author: "Jane S."
  }
  const review3 = {
    rating: 3,
    date: "4/15/2024",
    text: "The food was good, but the service was slow. The staff was friendly though",
    author: "Jack R."
  }
  const review4 = {
    rating: 5,
    date: "4/16/2024",
    text: "The food was amazing! The service was great. I would definitely come back.",
    author: "Jane S."
  }

  const reviews = [review1, review2, review3, review4, review1, review2, review3]

  const driverReview = {
    rating: 2,
    date: "4/22/2024",
    text: "The food was good, but the delivery took a long time. Sam is not a good delivery driver!",
    driver: "Sam R.",
    author: "Will S."
  }

  const driverReviews = [driverReview, driverReview, driverReview, driverReview, driverReview]

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
          <div className="flex flex-col justify-center items-center w-full">
            <div className="text-5xl text-center font-bold mt-12 mb-6">Reviews</div>
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
            <div className="text-5xl text-center font-bold mt-12 mb-6">Driver Reviews</div>
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
