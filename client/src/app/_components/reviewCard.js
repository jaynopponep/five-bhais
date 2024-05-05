import { Star } from "lucide-react"

export default function ReviewCard({ review }) {
  return (
    <div className="border-2 border-customBrown w-[350px] h-70 rounded-xl p-4">
      <div className="flex justify-between">
        <div className="flex flex-row items-center">
          {Array(review.rating).fill(<Star fill="#F75C03" strokeWidth={0} size={32} />)}
          {Array(5 - review.rating).fill(<Star className="text-customOrange" size={28} />)}
        </div>
        <div className="text-xl">{review.date}</div>
      </div>
      <div className="text-2xl text-justify h-40 line-clamp-5">
        {review.text}
      </div>
      {review.driver ? (
        <div className="text-xl text-left mt-6">- {review.driver} reviewed by {review.author}</div>
      ) : (
        <div className="text-xl text-left mt-6">- {review.author}</div>
      )}
    </div >
  );
}
