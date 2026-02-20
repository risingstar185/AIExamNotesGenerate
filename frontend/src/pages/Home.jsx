import React from "react";
import Navbar from "../components/Navbar";
import book from "../assets/books.jpg";
import { motion } from "framer-motion";
import Footer from "../components/Footer";
import Note from "./Note";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate=useNavigate()
  return (
    <div className="bg-gradient-to-br from-slate-50 via-white to-slate-100 min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 pt-16 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Create Smart <br /> AI Notes in Seconds
          </h1>

          <p className="mt-6 max-w-xl text-lg text-gray-600 leading-relaxed">
            Say goodbye to manual note-taking and hello to effortless
            organization with our AI-powered note-taking app. Create smart
            notes in seconds and stay organized like never before.
          </p>

          <div className="mt-10 flex gap-4">
            <motion.button onClick={()=>navigate('/note')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all cursor-pointer"
            >
              Get Started
            </motion.button>

            <button className="px-8 py-3 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 transition">
              Learn More
            </button>
          </div>
        </motion.div>

        {/* Right Image */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="absolute -inset-4 bg-gradient-to-r from-blue-400 to-purple-500 rounded-3xl blur-3xl opacity-20"></div>
          <img
            src={book}
            alt="Hero"
            className="relative w-full rounded-3xl shadow-2xl"
          />
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <Feature
            icon="🎁"
            title="Free Credits"
            desc="Get 50 free credits to create AI-powered exam notes and resources."
          />
          <Feature
            icon="⚡"
            title="Instant Generation"
            desc="Create notes, charts, and PDFs instantly with AI assistance."
          />
          <Feature
            icon="📈"
            title="Upgrade Anytime"
            desc="Easily upgrade for more credits whenever you need."
          />
          <Feature
            icon="⬇️"
            title="Free Download"
            desc="Download clean, printable PDFs instantly."
          />
        </div>
      </section>
      <Footer/>
    </div>
  );
};

function Feature({ icon, title, desc }) {
  return (
    <motion.div
      whileHover={{ y: -10, scale: 1.05 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className="relative rounded-2xl p-6 bg-white/70 backdrop-blur-lg border border-gray-200 shadow-md hover:shadow-xl transition-all"
    >
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-lg font-semibold mb-2 text-gray-800">{title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
    </motion.div>
  );
}

export default Home;
