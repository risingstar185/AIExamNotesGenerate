import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { serverUrl } from "../App";

const Pricing = () => {
  const navigate = useNavigate();
  const [selectedPrice, setSelectedPrice] = React.useState(null);
  const [paying, setPaying] = React.useState(false);
  const [payingAmount, setPayingAmount] = React.useState(null);

  const handlePaying = async (amount) => {
    try {
      setPayingAmount(amount);
      setPaying(true);
  
       const result=await axios.post(serverUrl + '/api/credits/order',{amount},{withCredentials:true})
       if(result.data.url){
        window.location.href=result.data.url
       }
     setPaying(false)
    } catch (error) {
      console.log(error);
      setPaying(false)
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 py-16 px-6">
      <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-12">
        Choose Your Plan
      </h1>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <PricingCard
          title="Starter"
          price="₹100"
          amount={100}
          description="Perfect for trying out the basics"
          features={[
            "Access to basic features",
            "Limited usage",
            "Community support",
          ]}
          credits="50 credits"
          selectedPrice={selectedPrice}
          setSelectedPrice={setSelectedPrice}
          onBuy={handlePaying}
          paying={paying}
          payingAmount={payingAmount}
        />

        <PricingCard
          popular
          title="Popular"
          price="₹200"
          amount={200}
          description="Best value for regular users"
          features={[
            "All basic features",
            "Priority support",
            "More usage limit",
          ]}
          credits="120 credits"
          selectedPrice={selectedPrice}
          setSelectedPrice={setSelectedPrice}
          onBuy={handlePaying}
          paying={paying}
          payingAmount={payingAmount}
        />

        <PricingCard
          title="Pro"
          price="₹500"
          amount={500}
          description="Advanced plan for power users"
          features={[
            "All features unlocked",
            "Unlimited usage",
            "Premium support",
          ]}
          credits="300 credits"
          selectedPrice={selectedPrice}
          setSelectedPrice={setSelectedPrice}
          onBuy={handlePaying}
          paying={paying}
          payingAmount={payingAmount}
        />
      </div>
    </div>
  );
};

function PricingCard({
  title,
  price,
  amount,
  features,
  credits,
  description,
  popular,
  selectedPrice,
  setSelectedPrice,
  onBuy,
  paying,
  payingAmount,
}) {
  const isSelected = selectedPrice === amount;
  const isPayingThisCard = paying && payingAmount === amount;

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      onClick={() => setSelectedPrice(amount)}
      className={`relative cursor-pointer rounded-xl p-6 bg-white border transition 
        ${
          isSelected
            ? "border-black shadow-lg"
            : popular
            ? "border-blue-500 shadow-lg"
            : "border-gray-300"
        }`}
    >
      {popular && !isSelected && (
        <span className="absolute top-0 right-0 bg-blue-600 text-white text-xs px-3 py-1 rounded-bl-xl">
          MOST POPULAR
        </span>
      )}

      {isSelected && (
        <span className="absolute top-0 left-0 bg-green-600 text-white text-xs px-3 py-1 rounded-br-xl">
          SELECTED
        </span>
      )}

      <h3 className="text-2xl font-bold mb-2">{title}</h3>
      <p className="text-gray-500 mb-4">{description}</p>
      <p className="text-4xl font-extrabold mb-2">{price}</p>
      <p className="text-sm text-indigo-600">{credits}</p>

      <ul className="mt-5 space-y-2 text-sm text-gray-600">
        {features.map((f, i) => (
          <li key={i} className="flex items-center gap-2">
            <span className="text-green-500">✔</span>
            {f}
          </li>
        ))}
      </ul>
      
      <button
        disabled={isPayingThisCard}
        onClick={(e) => {
          e.stopPropagation();
          onBuy(amount);
        }}
        className={`w-full mt-5 py-2 rounded-lg font-medium transition 
        ${
          isPayingThisCard
            ? "bg-gray-400 cursor-not-allowed"
            : isSelected
            ? "bg-black text-white"
            : "bg-indigo-600 hover:bg-indigo-700 text-white"
        }`}
      >
        {isPayingThisCard ? "Processing..." : "Buy Now"}
      </button>

    </motion.div>
  );
}

export default Pricing;
