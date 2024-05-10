"use client"
import AddressForm from "./addressForm";

export default function CheckoutBox({ formData, handleInputChange, handleSubmit }) {
  return (
    <div className="w-4/12 h-[550px] border-2 border-customBrown rounded-lg p-4 text-2xl">
      <div className="text-4xl font-bold">Checkout</div>
      <div className="flex flex-col gap-3">
        <div>
          <div className="flex justify-between mt-6">
            <div>Delivery</div>
            <div className="font-bold">$3.00</div>
          </div>
          <div className="text-blue-500 ml-2">Switch to pickup (FREE)</div>
        </div>
        <AddressForm
          formData={formData}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
        />
        <div className="flex justify-between">
          <div>Subtotal</div>
          <div className="font-bold">$3.00</div>
        </div>
        <div className="flex justify-between">
          <div>Tax</div>
          <div className="font-bold">$3.00</div>
        </div>
        <div className="flex justify-between border-t pt-2 border-customBrown/70">
          <div>Total</div>
          <div className="font-bold">$3.00</div>
        </div>
      </div>
      <button
        onClick={handleSubmit}
        className="bg-customOrange font-bold text-customLight w-full p-2 rounded-lg mt-4">
        Complete Purchase
      </button>
    </div>
  );
}