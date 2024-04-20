import { Star } from "lucide-react"

export default function Navbar() {
  return (
    <>
      <div className="border-2 border-customBrown w-[400px] h-64 rounded-xl p-4">
        <div className="flex justify-between">
          <div className="flex flex-row items-center">
            <Star fill="#F75C03" strokeWidth={0} size={32} />
            <Star fill="#F75C03" strokeWidth={0} size={32} />
            <Star fill="#F75C03" strokeWidth={0} size={32} />
            <Star fill="#F75C03" strokeWidth={0} size={32} />
            <Star className="text-customOrange" size={28} />
          </div>
          <div className="text-xl">4/13/2024</div>
        </div>
        <div className="text-2xl text-justify">
          Excellent staff, service, and food! Was in town for a few days and had a great meal and great conversation. Highly recommend!
        </div>
        <div className="text-xl text-left mt-6">- John D.</div>
      </div >
    </>
  );
}
