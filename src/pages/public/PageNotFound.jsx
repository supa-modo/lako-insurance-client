import React from "react";
import { Link } from "react-router-dom";
import { TbArrowLeft, TbHome2, TbPhoneCall } from "react-icons/tb";

const PageNotFound = () => {
  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Simple Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-1">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <div className="w-20 md:w-24">
                <img
                  src="/lako-logo.png"
                  alt="Lako Insurance Logo"
                  className="w-full h-full object-cover"
                />
              </div>
            </Link>

            {/* Contact Details */}
            <div className="flex items-center space-x-4">
              <a
                href="tel:+254720636363"
                className="flex items-center text-gray-700 hover:text-primary-600 transition-colors duration-200"
              >
                <TbPhoneCall className="h-4 w-4 md:h-5 md:w-5 mr-2 text-primary-600" />
                <span className="font-semibold text-sm md:text-base">
                  +254 720 636363
                </span>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full text-center">
          {/* 404 Number */}
          <div className="mb-4 md:mb-8">
            <h1 className="text-7xl md:text-8xl lg:text-9xl font-bold text-gray-300 mb-2 md:mb-4">
              404
            </h1>
            <div className="w-16 md:w-24 h-0.5 md:h-1 bg-primary-600 mx-auto mb-4 md:mb-8"></div>
          </div>

          {/* Error Message */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-600 mb-4">
              Page Not Found
            </h2>
            <p className="text-gray-600 leading-relaxed">
              The page you are looking for might have been removed, had its name
              changed, or is temporarily unavailable.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col md:flex-row gap-2.5 md:gap-4 text-sm md:text-[0.93rem]">
            <button
              onClick={handleGoBack}
              className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              <TbArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </button>
            <Link
              to="/"
              className="w-full flex items-center justify-center px-6 py-3 bg-secondary-600 text-white font-medium rounded-lg hover:bg-secondary-700 transition-colors duration-200"
            >
              <TbHome2 className="w-5 h-5 mr-2" />
              Go to Homepage
            </Link>
          </div>

          {/* Additional Help */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-[0.8rem] md:text-sm text-gray-500">
              Need help? Contact our{" "}
              <a
                href="/contact"
                className="text-secondary-600 hover:text-secondary-700 underline underline-offset-4 font-medium"
              >
                support team
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
