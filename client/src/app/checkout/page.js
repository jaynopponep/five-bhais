"use client";
import Navbar from "../_components/navbar";
import { useEffect, useState } from "react";
import { Alert, AlertTitle } from "@/components/ui/alert";
import Cart from "./components/cart";
import CheckoutBox from "./components/checkoutBox";
import Loading from "../_components/loading";
import { placeOrder } from "./actions";
import { fetchUser } from "../manageUser";
import { useRouter } from "next/navigation";

export default function Checkout() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [formData, setFormData] = useState({
    orderType: "delivery",
    address: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
  });
  const [cart, setCart] = useState([]);
  const [successMsg, setSuccessMsg] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
    fetchUser()
        .then((user) => {
          setUser(user);
          if (user.role === "surfer") {
            router.push("/");
          } else {
            setIsLoading(false);
          }
        })
        .catch((error) => console.error(error));
  }, [router]);

  useEffect(() => {
    fetchUser()
        .then((data) => {
          setUser(data);
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

  const toggleOrderType = () => {
    setFormData((prevData) => ({
      ...prevData,
      orderType: formData.orderType === "delivery" ? "pickup" : "delivery",
    }));
  };

  const getSubTotal = () => {
    let total = 0;
    for (const item of cart) {
      total += item.price * item.quantity;
    }
    if (formData.orderType === "delivery") total += 3.0;
    return total.toFixed(2);
  };

  const getTax = () => {
    return (getSubTotal() * 0.08875).toFixed(2);
  };

  const getTotal = () => {
    return (parseFloat(getSubTotal()) + parseFloat(getTax())).toFixed(2);
  };

  const discountedTotal = () => {
    return (getTotal() * 0.9).toFixed(2);
  };

  const getDiscount = () => {
    return (parseFloat(getTotal()) * 0.1).toFixed(2);
  };

  const updateQuantity = (itemID, amount) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    for (const cartItem of cart) {
      if (cartItem._id.$oid === itemID) {
        if (cartItem.quantity + amount < 0) return;
        cartItem.quantity += amount;
        localStorage.setItem("cart", JSON.stringify(cart));
        setCart(cart);
        return;
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    if (
        formData.orderType === "delivery" &&
        (formData.address === "" ||
            formData.city === "" ||
            formData.state === "" ||
            formData.zip === "")
    ) {
      setErrorMsg("Please fill out all fields.");
      return;
    }
    if (user.balance < getTotal()) {
      setErrorMsg("Insufficient balance.");
      return;
    }
    try {
      const total = user.role === "vipcustomer" ? discountedTotal() : getTotal();
      const data = await placeOrder(cart, formData, user.email, total);
      if (data) {
        localStorage.setItem("cart", JSON.stringify([]));
        setCart([]);
        setErrorMsg("");
        const updatedUser = { ...user, balance: user.balance - total };
        sessionStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);
        setSuccessMsg("Order placed successfully!");
      }
    } catch (error) {
      setErrorMsg(error.message || "An error occurred. Try again.");
    }
  };

  if (isLoading) return <Loading />;
  return (
      <div className="bg-customLight pb-10 min-h-screen">
        <Navbar />
        <div className="mt-20 ml-12 flex justify-around">
          {errorMsg ? (
              <Alert
                  variant="destructive"
                  className="w-[250px] text-center absolute top-24"
              >
                <AlertTitle>{errorMsg}</AlertTitle>
              </Alert>
          ) : null}
          {successMsg ? (
              <Alert
                  variant="default"
                  className="w-[250px] text-center absolute top-24"
              >
                <AlertTitle>{successMsg}</AlertTitle>
              </Alert>
          ) : null}
          <div className="w-7/12">
            <div className="text-4xl font-bold mb-6">Your Cart</div>
            {cart.length === 0 ? (
                <div className="text-4xl text-gray-500 text-center mt-56">
                  Your cart is empty.
                </div>
            ) : (
                <Cart cart={cart} updateQuantity={updateQuantity} />
            )}
          </div>
          {cart.length !== 0 && (
              <CheckoutBox
                  formData={formData}
                  handleInputChange={handleInputChange}
                  handleSubmit={handleSubmit}
                  toggleOrderType={toggleOrderType}
                  getSubTotal={getSubTotal}
                  getDiscount={getDiscount}
                  getTax={getTax}
                  getTotal={getTotal}
                  discountedTotal={discountedTotal}
              />
          )}
        </div>
      </div>
  );
}

