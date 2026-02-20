import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PaymentFailed = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/pricing");
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-red-50">
      <div className="bg-white shadow-lg rounded-xl p-10 text-center">
        <div className="text-6xl mb-4">⚠️</div>
        <h1 className="text-2xl font-bold text-red-600 mb-2">
          Payment Unsuccessful
        </h1>
        <p className="text-gray-600 mb-4">
          Your transaction could not be completed.
        </p>
        <p className="text-sm text-gray-400">
          Redirecting to pricing page...
        </p>

        <button
          onClick={() => navigate("/pricing")}
          className="mt-4 bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition"
        >
          Try Again Now
        </button>
      </div>
    </div>
  );
};

export default PaymentFailed;