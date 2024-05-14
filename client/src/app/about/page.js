"use client"
import Navbar from "../_components/navbar";
import Link from "next/link";
import { useState, useEffect } from "react";
import login from "./actions";
import { Alert, AlertTitle } from "@/components/ui/alert"
import { useRouter } from 'next/navigation'
import { fetchUser, setUser } from "../manageUser";
import Loading from '../_components/loading';

export default function Login() {
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetchUser()
      .then((user) => {
        if (user.role != "surfer") {
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
    try {
      const data = await login(formData);
      if (data) {
        setUser(data.user);
        router.push("/")
      }
    } catch (error) {
      setErrorMsg(error.message || "An error occurred. Try again.")
    }
  };

  if (isLoading) return <Loading />;
  return (
    <div className="bg-customLight h-screen">
        <Navbar />

        <div className="p-4">
          <p>Bhai Brothers, comprised of Abdul A, Jay N, Baljinder H, Meftahul A, and Abrar H, is a company born from the collective passion and entrepreneurial spirit of five close friends. Together, they have created and now run the Bhai Brothers Company, with "Five Bhai's" being their first flagship location.</p>
      
          <p>At Five Bhai's, the menu is a culinary journey across the Indian subcontinent, featuring dishes that pay homage to various regional traditions. Each dish is carefully crafted to offer guests an authentic taste of local flavors, with recipes perfected over centuries. The richness of Punjab is captured in our hearty, spiced curries and grilled meats, all cooked to perfection in a traditional tandoor. From Amritsari kulchas stuffed with aloo to succulent butter chicken, these dishes are aromatic and deeply satisfying.</p>
         
          <p>In contrast, our offerings from Bangladesh focus on the delicate flavors of seafood, imbued with mustard seeds and turmeric, served alongside fragrant rice dishes like khichuri. These recipes reflect the waterways and lush landscapes of the region, providing a light yet flavorful dining experience.</p>
        
          <p>Beyond these, Five Bhai's explores the coastal cuisine of Kerala with its coconut-laden curries and the sophisticated, rice-based thalis of Tamil Nadu. Our menu also includes the vibrant street food delights of Mumbai and the rich, vegetarian fare of Gujarat. Each region's unique culinary heritage is showcased in our diverse menu, ensuring there is something to delight every palate.</p>
          
          <p>Every meal at Five Bhai's is a passage across the Indian subcontinent, inviting our guests to explore an array of flavors as diverse and dynamic as the regions themselves. Join us for a culinary expedition that promises not only to satiate but also to enlighten, offering insights into the culinary history and cultural richness of India.</p>
        </div>
    </div >
  );
}
