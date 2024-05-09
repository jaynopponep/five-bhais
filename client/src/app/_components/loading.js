import { Loader } from "lucide-react";

export default function Loading() {
  return (
    <div className="w-full h-screen flex bg-customLight justify-center items-center"><Loader className="w-10 h-10 text-customOrange animate-spin" /></div>
  )
}