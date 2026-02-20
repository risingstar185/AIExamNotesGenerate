import React from "react";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import TopicForm from "../components/TopicForm";
import Sidebaar from "../components/Sidebaar";
import FinalResult from "../components/FinalResult";

const Note = () => {
  const [result, setResult] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const navigate = useNavigate();


  console.log("Full Result:", result);


  return (
    <div>
      <Navbar />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full px-6 lg:px-8 pt-16"
      >
        <TopicForm
          loading={loading}
          setError={setError}
          setLoading={setLoading}
          setResult={setResult}
        />
      </motion.div>

      {!result && (
        <motion.div
          initial={{ scale: 1.02 }}
          className="h-64 rounded-2xl flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 text-white p-8"
        >
          <span className="text-4xl">📓</span>
          <h2 className="text-2xl font-bold mb-4 text-center">
            Your AI-Powered Exam Notes Generator
          </h2>
        </motion.div>
      )}

      {error && (
        <div className="text-red-500 text-center mt-4">
          {error}
        </div>
      )}

      {result && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className=" mx-auto mt-10 grid lg:grid-cols-4 gap-6"
        >
          <div className="lg:col-span-1">
          <Sidebaar result={result} 
          />

          </div>

          <div className="lg:col-span-3 rounded-2xl bg-blue-300 p-6 shadow-lg">
            <FinalResult result={result} />
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Note;
