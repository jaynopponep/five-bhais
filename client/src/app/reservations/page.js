"use client"
import Navbar from "../_components/navbar";
import { useEffect, useState } from "react";
import { Alert, AlertTitle } from "@/components/ui/alert"
import { fetchUser } from "../manageUser";
import { useRouter } from 'next/navigation'
import Loading from '../_components/loading';
import { Calendar } from "@/components/ui/calendar"
import TimePicker from 'react-time-picker';
import { postReservation } from "./actions";
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';

export default function Reservations() {
  const [isLoading, setIsLoading] = useState(true);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState('10:00')
  const [formData, setFormData] = useState({
    lastName: "",
    date: "",
    time: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetchUser()
      .then((user) => {
        if (user.role != "customer" && user.role != "vipcustomer") {
          router.push("/")
        } else {
          setIsLoading(false);
        }
      })
      .catch((error) => console.error(error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    formData.date = date.toDateString();
    formData.time = time;
    console.log(formData)
    try {
      const data = await postReservation(formData);
      if (data) {
        setSuccessMsg(data.message);
        setErrorMsg("");
      }
    } catch (error) {
      setSuccessMsg("");
      setErrorMsg(error.message || "An error occurred. Try again.")
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="bg-customLight h-screen">
      <Navbar />

      <div className="">
        <div className="flex flex-col justify-center items-center text-customBlack">
          {errorMsg ? <Alert variant="destructive" className="w-[250px] text-center absolute top-24">
            <AlertTitle>{errorMsg}</AlertTitle>
          </Alert> : null}
          {successMsg ? (
            <Alert
              variant="default"
              className="w-[250px] text-center absolute top-24"
            >
              <AlertTitle>{successMsg}</AlertTitle>
            </Alert>
          ) : null}

          <div className="text-5xl font-bold mt-10 mb-4">Make a Reservation</div>
          <form onSubmit={handleSubmit} className="flex flex-col items-left w-[350px]">
            <label
              className="text-xl font-semibold text-left"
              htmlFor="lastName">Last Name</label>
            <input
              className="w-full bg-customLight border-2 border-customBlack rounded-md p-1 mb-3"
              id="lastName"
              name="lastName"
              type="text"
              placeholder=""
              value={formData.lastName}
              onChange={handleInputChange}
              required
            />
            <label
              className="text-xl font-semibold text-left"
              htmlFor="lastName">Select a date</label>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border-2 border-customBrown w-72 text-center pt-4 pl-4"
            />
            <label
              className="text-xl font-semibold text-left mt-3"
              htmlFor="lastName">Select a time</label>
            <TimePicker className="w-32" onChange={setTime} value={time} />
            <button className="w-[350px] mt-5 h-12 flex justify-center items-center rounded-lg bg-customOrange text-customLight hover:text-customBG hover:bg-customMain transition-colors duration-300">
              <p className="font-bold text-base md:text-xl">Confirm Reservation</p>
            </button>
          </form>
        </div>

      </div>
    </div >
  );
}