"use client"
import Navbar from "../_components/navbar";
import { useState, useEffect } from "react";
import { Alert, AlertTitle } from "@/components/ui/alert"
import { Star } from "lucide-react"
import Loading from "../_components/loading";
import { fetchUserType } from "../actions";
import { fetchRecentDrivers, postReview } from "./actions";

export default function Login() {
  const [isLoading, setIsLoading] = useState(true);
  const [userType, setUserType] = useState('');
  const [recentDrivers, setRecentDrivers] = useState([]);

  useEffect(() => {
    fetchUserType()
      .then((data) => {
        setUserType(data);
        fetchRecentDrivers()
          .then((data) => {
            setRecentDrivers(data);
            setIsLoading(false);
          })
          .catch((error) => console.error(error));
      })
      .catch((error) => console.error(error));
  }, []);


  const [formData, setFormData] = useState({
    reviewType: "Restaurant",
    driverSelection: "",
    review: "",
    rating: 1,
  });

  const [errorMsg, setErrorMsg] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRatingChange = (rating) => {
    setFormData((prevData) => ({
      ...prevData,
      rating: rating,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    if (formData.reviewType != "driver")
      formData.driverSelection = "";

    try {
      const response = await postReview(formData);
      if (response.message) {
        window.location.href = "/";
      }
    } catch (error) {
      setErrorMsg(error.message || "An error occurred. Try again.")
    }
  };

  if (isLoading) return <Loading />;
  else if (userType != "customer") window.location.href = "/";
  else {
    return (
      <div className="bg-customLight h-screen">
        <Navbar />
        <div>
          <div className="flex flex-col justify-center items-center text-customBlack">
            {errorMsg ? <Alert variant="destructive" className="w-[250px] text-center absolute top-24">
              <AlertTitle>{errorMsg}</AlertTitle>
            </Alert> : null}
            <div className="text-5xl font-bold mt-20 mb-4">Add Review</div>
            <form className="flex flex-col items-left w-[400px]">
              <label className="text-xl font-semibold text-left" htmlFor="reviewType">
                Review Type
              </label>
              <select
                className="w-full bg-customLight border-2 border-customBlack rounded-md p-1 mb-3"
                id="reviewType"
                name="reviewType"
                value={formData.reviewType}
                onChange={handleInputChange}
                required
              >
                <option value="restaurant">Restaurant</option>
                <option value="driver">Driver</option>
              </select>
              {formData.reviewType === "driver" && (
                <>
                  <label className="text-xl font-semibold text-left" htmlFor="driverSelection">
                    Who are you reviewing?
                  </label>
                  <select
                    className="w-full bg-customLight border-2 border-customBlack rounded-md p-1 mb-3"
                    id="driverSelection"
                    name="driverSelection"
                    value={formData.driverSelection}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select a driver</option>
                    {recentDrivers.map((driver) => (
                      <option key={driver.id} value={driver.id}>
                        {driver.name}
                      </option>
                    ))}
                  </select>
                </>
              )}

              <label className="text-xl font-semibold text-left" htmlFor="rating">
                Rating
              </label>
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <div
                    key={star}
                    className="text-customOrange cursor-pointer"
                    onClick={() => handleRatingChange(star)}
                  >
                    {formData.rating >= star ? <Star fill="#F75C03" /> : <Star />}

                  </div>
                ))}
              </div>
              <label
                className="text-xl font-semibold text-left"
                htmlFor="review">Review</label>
              <textarea
                className="w-full h-52 bg-customLight border-2 border-customBlack rounded-md p-1 mb-3"
                id="review"
                name="review"
                type="text"
                placeholder=""
                value={formData.review}
                onChange={handleInputChange}
                required="true"
              />
            </form>
            <button onClick={handleSubmit} className="w-[400px] mt-2 h-12 flex justify-center items-center rounded-lg bg-customOrange text-customLight hover:text-customBG hover:bg-customMain transition-colors duration-300">
              <p className="font-bold text-base md:text-xl">Add Review</p>
            </button>
          </div>

        </div>
      </div >
    );
  }
}