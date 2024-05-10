"use client"

const handleAddToCart = (item) => {
  item.quantity = 1;
  if (localStorage.getItem("cart")) {
    localStorage.setItem("cart", JSON.stringify([...JSON.parse(localStorage.getItem("cart")), item]));
  } else {
    localStorage.setItem("cart", JSON.stringify([item]));
  }
}

export default function MenuItem({ foodItem, userType }) {

  return (
    <div className="border-b-2 border-customBrown p-2 mb-4">
      <div className="flex flex-col text-customBlack">
        <div className="flex justify-between">
          <div className="text-2xl text-customOrange font-bold uppercase truncate">{foodItem.name}</div>
          {userType === "customer" ? (
            <div className="flex justify-between items-center text-xl rounded-full bg-customBrown text-customLight w-56 px-4 cursor-pointer">
              <div onClick={() => handleAddToCart(foodItem)} className="">Add to Cart</div>
              <div className="">${foodItem.price}</div>
            </div>
          ) : (
            <div className="text-2xl font-bold">${foodItem.price}</div>
          )}
        </div>
        <div className="text-xl font-light truncate lowercase">{foodItem.description}</div>
      </div>
    </div >
  );
}