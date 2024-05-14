"use client";
import AddressForm from "./addressForm";
import { fetchUser } from "../../manageUser";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CheckoutBox({
  formData,
  handleInputChange,
  handleSubmit,
  toggleOrderType,
  getSubTotal,
  getTax,
  getTotal,
  getDiscount,
  discountedTotal,
}) {
  const [userType, setUserType] = useState("");
  useEffect(() => {
    fetchUser()
      .then((data) => {
        setUserType(data.role);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="w-4/12 h-[550px] border-2 border-customBrown rounded-lg p-4 text-2xl">
      <div className="text-4xl font-bold">Checkout</div>
      <div className="flex flex-col gap-3">
        <div>
          {formData.orderType === "delivery" ? (
            <>
              <div className="flex justify-between mt-6">
                <div>Delivery</div>
                <div className="font-bold">$3.00</div>
              </div>

              <div
                className="text-blue-500 ml-2 cursor-pointer"
                onClick={toggleOrderType}
              >
                Switch to pickup (FREE)
              </div>
            </>
          ) : (
            <>
              <div className="flex justify-between mt-6">
                <div>Pickup</div>
                <div className="font-bold">FREE</div>
              </div>
              <div
                className="text-blue-500 ml-2 cursor-pointer"
                onClick={toggleOrderType}
              >
                Switch to delivery ($3.00)
              </div>
            </>
          )}
        </div>
        {formData.orderType === "delivery" && (
          <AddressForm
            formData={formData}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
          />
        )}
        <div className="flex justify-between">
          <div>Subtotal</div>
          <div className="font-bold">${getSubTotal()}</div>
        </div>
        {userType === "vipcustomer" && (
          <div className="flex justify-between">
            <div>VIP Discount -10%</div>
            <div className="font-bold">-${getDiscount()}</div>
          </div>
        )}
        <div className="flex justify-between">
          <div>Tax</div>
          <div className="font-bold">${getTax()}</div>
        </div>
        <div className="flex justify-between border-t pt-2 border-customBrown/70">
          <div>Total</div>
          <div className="font-bold">
            ${userType === "vipcustomer" ? discountedTotal() : getTotal()}
          </div>
        </div>
      </div>
      <Link href="menu">
        <button
          onClick={handleSubmit}
          className="bg-customOrange font-bold text-customLight w-full p-2 rounded-lg mt-4"
        >
          Complete Purchase
        </button>
      </Link>
    </div>
  );
}
