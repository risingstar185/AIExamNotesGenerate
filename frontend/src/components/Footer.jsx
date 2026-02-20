import React from "react";
import { Link } from "react-router-dom";


const Footer = () => {
  return (
    <footer className="bg-white border-t mt-16">
      <div className="max-w-6xl mx-auto px-6 py-10">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Brand */}
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              ExamNotes <span className="text-blue-600">AI</span>
            </h2>
            <p className="text-sm text-gray-500 mt-2">
              Smart AI-powered notes to help you study faster and better.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link to="/" className="hover:text-blue-600">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="hover:text-blue-600">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/history" className="hover:text-blue-600">
                  History
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">
              Legal
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link to="/privacy" className="hover:text-blue-600">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-blue-600">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-blue-600">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="border-t mt-8 pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} ExamNotes AI. All rights reserved.
        </div>

      </div>
    </footer>
  );
};

export default Footer;
