import React from "react";
import { motion } from "framer-motion";
import {
  TbPlane,
  TbCalendarEvent,
  TbCalendarStats,
  TbArrowLeft,
  TbArrowRight,
  TbCheck,
} from "react-icons/tb";

const TripTypeSelection = ({
  formData,
  updateFormData,
  nextStep,
  prevStep,
}) => {
  const handleTripTypeSelect = (tripType) => {
    updateFormData("tripType", tripType);
  };

  const handleNext = () => {
    if (formData.tripType) {
      nextStep();
    }
  };

  const tripTypes = [
    {
      id: "single-trip",
      title: "Single Trip",
      description: "Coverage for one specific trip",
      icon: <TbPlane className="w-8 h-8" />,
      features: [
        "Coverage for up to 180 days",
        "Emergency medical expenses",
        "Trip cancellation & interruption",
        "Luggage protection",
        "24/7 emergency assistance",
      ],
      ideal: "Perfect for vacation, business trips, or one-time travel",
      popular: true,
    },
    {
      id: "annual-multi-trip",
      title: "Annual Multi-Trip",
      description: "Coverage for multiple trips in a year",
      icon: <TbCalendarStats className="w-8 h-8" />,
      features: [
        "Multiple trips up to 45 days each",
        "365-day coverage period",
        "Emergency medical expenses",
        "Trip cancellation & interruption",
        "Comprehensive protection",
      ],
      ideal: "Great for frequent travelers and business professionals",
      popular: false,
    },
  ];

  return (
    <div className="">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl mx-auto"
      >
        <div className="text-center mb-8">
          <h3 className="flex items-center justify-center text-lg md:text-xl lg:text-2xl font-bold text-primary-700/90 mb-3">
            <span className="block lg:hidden mr-1">1.</span>
            <TbCalendarEvent className="w-6 h-6 md:w-7 md:h-7 mr-2" />
            Choose Your Trip Type
          </h3>
          <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto">
            Select the type of travel coverage that best fits your travel plans
            and frequency
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {tripTypes.map((type) => (
            <motion.div
              key={type.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`relative p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                formData.tripType === type.id
                  ? "border-primary-500 bg-primary-50 shadow-lg"
                  : "border-gray-200 bg-white hover:border-primary-300 hover:shadow-md"
              }`}
              onClick={() => handleTripTypeSelect(type.id)}
            >
              {/* Popular Badge */}
              {type.popular && (
                <div className="absolute -top-3 left-6">
                  <span className="bg-secondary-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Selection Indicator */}
              <div className="absolute top-4 right-4">
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    formData.tripType === type.id
                      ? "border-primary-500 bg-primary-500"
                      : "border-gray-300"
                  }`}
                >
                  {formData.tripType === type.id && (
                    <TbCheck className="w-4 h-4 text-white" />
                  )}
                </div>
              </div>

              {/* Header */}
              <div className="flex items-center mb-4">
                <div
                  className={`w-14 h-14 rounded-full flex items-center justify-center mr-4 ${
                    formData.tripType === type.id
                      ? "bg-primary-100 text-primary-600"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {type.icon}
                </div>
                <div>
                  <h4 className="text-lg md:text-xl font-bold text-gray-800 mb-1">
                    {type.title}
                  </h4>
                  <p className="text-gray-600 text-sm">{type.description}</p>
                </div>
              </div>

              {/* Features */}
              <div className="mb-4">
                <h5 className="font-semibold text-gray-700 mb-2">
                  What's included:
                </h5>
                <ul className="space-y-1">
                  {type.features.map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-center text-sm text-gray-600"
                    >
                      <TbCheck className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Ideal For */}
              <div className="border-t pt-4">
                <p className="text-xs text-gray-500 font-medium">
                  <span className="text-primary-600">Ideal for:</span>{" "}
                  {type.ideal}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Info Box */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8"
        >
          <div className="flex items-start">
            <div className="w-5 h-5 text-blue-600 mr-3 mt-0.5">ℹ️</div>
            <div>
              <h4 className="font-semibold text-blue-800 mb-1">
                Important Information
              </h4>
              <ul className="text-blue-700 text-sm space-y-1">
                <li>
                  • Coverage begins from the policy start date and covers trips
                  commencing during the policy period
                </li>
                <li>
                  • Emergency medical coverage includes evacuation and
                  repatriation
                </li>
                <li>
                  • Pre-existing medical conditions are excluded unless declared
                  and accepted
                </li>
                <li>• Age restrictions apply (maximum age 80 years)</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={prevStep}
            className="flex items-center px-6 py-3 text-gray-600 hover:text-gray-800 font-medium transition-colors"
          >
            <TbArrowLeft className="w-5 h-5 mr-2" />
            Back
          </button>

          <button
            onClick={handleNext}
            disabled={!formData.tripType}
            className={`flex items-center px-8 py-3 rounded-lg font-semibold transition-all ${
              formData.tripType
                ? "bg-primary-600 hover:bg-primary-700 text-white shadow-lg hover:shadow-xl"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Continue
            <TbArrowRight className="w-5 h-5 ml-2" />
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default TripTypeSelection;
