"use client"

export default function AddressForm({ formData, handleInputChange, handleSubmit }) {
  return (
    <form className="text-xl">
      <input
        className="w-full p-2 mt-2 border-2 border-customBrown rounded-lg bg-customLight focus:outline-none focus:ring-2 focus:ring-blue-500"
        type="text"
        name="address"
        id="address"
        placeholder="Street Address"
        value={formData.address}
        onChange={handleInputChange}
      />
      <input
        className="w-full p-2 mt-2 border-2 border-customBrown rounded-lg bg-customLight focus:outline-none focus:ring-2 focus:ring-blue-500"
        type="text"
        name="address2"
        id="address2"
        placeholder="Apartment, suite, etc. (Optional)"
        value={formData.address2}
        onChange={handleInputChange}
      />
      <div className="flex justify-between">
        <input
          className="w-32 p-2 mt-2 border-2 border-customBrown rounded-lg bg-customLight focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          name="city"
          id="city"
          placeholder="City"
          value={formData.city}
          onChange={handleInputChange}
        />
        <input
          className="w-32 p-2 mt-2 border-2 border-customBrown rounded-lg bg-customLight focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          name="state"
          id="state"
          placeholder="State"
          value={formData.state}
          onChange={handleInputChange}
        />
        <input
          className="w-32 p-2 mt-2 border-2 border-customBrown rounded-lg bg-customLight focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="number"
          name="zip"
          id="zip"
          placeholder="Zip Code"
          value={formData.zip}
          onChange={handleInputChange}
        />
      </div>
    </form>
  );
}