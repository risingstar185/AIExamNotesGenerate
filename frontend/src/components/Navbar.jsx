import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App";
import { setUserData } from "../redux/userSlice";
import image from '../assets/image.png'

const Navbar = () => {
  const { userData } = useSelector((state) => state.user);
  const credits = useSelector(
    (state) => state.user.userData?.user?.credits ?? 0
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showCredits, setShowCredits] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const creditsRef = useRef();
  const profileRef = useRef();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (creditsRef.current && !creditsRef.current.contains(e.target))
        setShowCredits(false);
      if (profileRef.current && !profileRef.current.contains(e.target))
        setShowProfile(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(
        serverUrl + "/api/auth/logout",
        {},
        { withCredentials: true }
      );
      dispatch(setUserData(null));
      navigate("/auth");
    } catch (error) {
      console.error(error);
    }
  };

  const userInitial = userData?.user?.name?.charAt(0)?.toUpperCase() || "A";

  // Reusable Dropdown Component
  const Dropdown = ({ isOpen, children, className }) => (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className={`absolute top-full right-0 mt-3 w-56 bg-black/80 backdrop-blur-xl border border-white/20 rounded-xl p-4 text-sm text-gray-300 shadow-xl ${className}`}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50"
    >
      <div className="w-full h-18 flex items-center justify-between bg-white-400 backdrop-blur-md border-b border-white/10 px-6 lg:px-12 shadow-lg">
        
        {/* LOGO */}
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <img
            src={image}
            alt="Logo"
            className="w-10 h-10 rounded-full ring-2 ring-black/20 group-hover:ring-purple-400 transition"
          />
          <span className="text-lg font-bold text-black tracking-wide">
            ExamNotes <span className="text-purple-400">AI</span>
          </span>
        </div>

        {/* RIGHT ACTIONS */}
        <div className="flex items-center gap-4 relative">
          
          {/* CREDITS */}
          <div ref={creditsRef} className="relative">
            <motion.div
              onClick={() => setShowCredits(!showCredits)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-black/20 text-white text-sm cursor-pointer hover:shadow-lg transition-all duration-300"
            >
              <span>💎</span>
              <span className="font-medium text-black">{credits}</span>
              <span className="ml-1 text-xs text-black">+</span>
            </motion.div>

            <Dropdown isOpen={showCredits}>
              <p className="mb-2 text-gray-200">
                Your credits: <span className="font-semibold">{credits}</span>
              </p>
              <button
                className="w-full py-2 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold hover:opacity-90 transition"
                onClick={() => {
                  setShowCredits(false);
                  navigate("/pricing");
                }}
              >
                Buy More Credits
              </button>
            </Dropdown>
          </div>

          {/* PROFILE */}
          <div ref={profileRef} className="relative">
            <motion.div
              onClick={() => setShowProfile(!showProfile)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold cursor-pointer shadow-md"
            >
              {userInitial}
            </motion.div>

            <Dropdown isOpen={showProfile}>
              <p className="mb-3 text-gray-200">
                Signed in as
                <span className="block font-semibold text-white">
                  {userData?.user?.name}
                </span>
              </p>
              <button
                className="w-full py-2 mb-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition"
                onClick={() => {
                  setShowProfile(false);
                  navigate("/history");
                }}
              >
                History
              </button>
              <button
                className="w-full py-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 font-semibold transition"
                onClick={handleLogout}
              >
                Sign Out
              </button>
            </Dropdown>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
