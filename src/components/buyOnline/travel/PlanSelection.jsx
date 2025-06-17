import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  TbShield,
  TbCheck,
  TbArrowLeft,
  TbArrowRight,
  TbCurrencyDollar,
  TbHeartbeat,
  TbLuggage,
  TbPlane,
  TbPhone,
  TbUsers,
} from "react-icons/tb";
import { formatCurrency } from "../../../utils/formatCurrency";

const PlanSelection = ({ formData, updateFormData, nextStep, prevStep }) => {
  const [selectedPlan, setSelectedPlan] = useState(
    formData.selectedPlan || null
  );

  // Calculate trip duration for pricing
  const getTripDuration = () => {
    if (formData.departureDate && formData.returnDate) {
      const departureDate = new Date(formData.departureDate);
      const returnDate = new Date(formData.returnDate);
      const diffTime = Math.abs(returnDate - departureDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays;
    }
    return 0;
  };

  const tripDuration = getTripDuration();

  // Pricing based on AAR Kenya's travel insurance rates
  const calculatePremium = (
    basePremium,
    tripType,
    duration,
    numberOfTravelers = 1
  ) => {
    let premium = basePremium;

    if (tripType === "single-trip") {
      // Duration-based pricing for single trips
      if (duration <= 7) premium = basePremium;
      else if (duration <= 15) premium = basePremium * 1.5;
      else if (duration <= 31) premium = basePremium * 2.5;
      else if (duration <= 60) premium = basePremium * 3.5;
      else if (duration <= 90) premium = basePremium * 4.5;
      else premium = basePremium * 5.5;
    } else {
      // Annual multi-trip pricing
      premium = basePremium * 6; // Annual premium is roughly 6x single trip base
    }

    return premium * numberOfTravelers;
  };

  const travelPlans = [
    {
      id: "bronze",
      name: "Bronze Plan",
      description: "Essential coverage for budget travelers",
      color: "orange",
      popular: false,
      basePremium: 28, // USD as per AAR rates
      features: {
        medical: "50,000",
        luggage: "750",
        cancellation: "1,000",
        delay: "100",
        assistance: true,
        repatriation: "15,000",
        personalAccident: "10,000",
      },
      coverage: [
        "Emergency medical expenses up to $50,000",
        "Personal accident cover up to $10,000",
        "Luggage protection up to $750",
        "Trip cancellation up to $1,000",
        "Travel delay compensation",
        "24/7 emergency assistance",
        "Repatriation of mortal remains",
      ],
    },
    {
      id: "silver",
      name: "Silver Plan",
      description: "Comprehensive protection for most travelers",
      color: "gray",
      popular: true,
      basePremium: 32,
      features: {
        medical: "60,000",
        luggage: "1,000",
        cancellation: "1,000",
        delay: "100",
        assistance: true,
        repatriation: "20,000",
        personalAccident: "15,000",
      },
      coverage: [
        "Emergency medical expenses up to $60,000",
        "Personal accident cover up to $15,000",
        "Luggage protection up to $1,000",
        "Trip cancellation up to $1,000",
        "Travel delay compensation",
        "24/7 emergency assistance",
        "Repatriation of mortal remains",
        "Emergency dental cover up to $300",
      ],
    },
    {
      id: "gold",
      name: "Gold Plan",
      description: "Premium coverage with enhanced benefits",
      color: "yellow",
      popular: false,
      basePremium: 35,
      features: {
        medical: "100,000",
        luggage: "1,500",
        cancellation: "1,000",
        delay: "100",
        assistance: true,
        repatriation: "30,000",
        personalAccident: "25,000",
      },
      coverage: [
        "Emergency medical expenses up to $100,000",
        "Personal accident cover up to $25,000",
        "Luggage protection up to $1,500",
        "Trip cancellation up to $1,000",
        "Travel delay compensation",
        "24/7 emergency assistance",
        "Repatriation of mortal remains",
        "Emergency dental cover up to $350",
        "In-hospital cash benefit",
        "Personal liability up to $150,000",
      ],
    },
  ];

  const handlePlanSelect = (plan) => {
    const premium = calculatePremium(
      plan.basePremium,
      formData.tripType,
      tripDuration,
      formData.numberOfTravelers
    );

    const planWithPremium = {
      ...plan,
      annualPremium: premium,
      calculatedPremium: premium,
      tripDuration,
      numberOfTravelers: formData.numberOfTravelers,
    };

    setSelectedPlan(planWithPremium);
    updateFormData("selectedPlan", planWithPremium);
    updateFormData("premiumAmount", premium);
    updateFormData("insuranceProvider", "AAR Insurance");
  };

  const handleNext = () => {
    if (selectedPlan) {
      nextStep();
    }
  };

  const getColorClasses = (color, isSelected) => {
    const colorMap = {
      orange: {
        border: isSelected ? "border-orange-500" : "border-orange-200",
        bg: isSelected ? "bg-orange-50" : "bg-white",
        accent: "text-orange-600",
        icon: "bg-orange-100 text-orange-600",
      },
      gray: {
        border: isSelected ? "border-gray-500" : "border-gray-200",
        bg: isSelected ? "bg-gray-50" : "bg-white",
        accent: "text-gray-600",
        icon: "bg-gray-100 text-gray-600",
      },
      yellow: {
        border: isSelected ? "border-yellow-500" : "border-yellow-200",
        bg: isSelected ? "bg-yellow-50" : "bg-white",
        accent: "text-yellow-600",
        icon: "bg-yellow-100 text-yellow-600",
      },
    };
    return colorMap[color];
  };

  return (
    <div className="">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto"
      >
        <div className="text-center mb-8">
          <h3 className="flex items-center justify-center text-lg md:text-xl lg:text-2xl font-bold text-primary-700/90 mb-3">
            <span className="block lg:hidden mr-1">3.</span>
            <TbShield className="w-6 h-6 md:w-7 md:h-7 mr-2" />
            Choose Your Coverage Plan
          </h3>
          <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto">
            Select the level of coverage that best suits your travel needs and
            budget
          </p>
        </div>

        {/* Trip Summary */}
        <div className="bg-blue-50 rounded-lg p-4 mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-blue-600 font-semibold">Trip Type</div>
              <div className="text-blue-800 capitalize">
                {formData.tripType?.replace("-", " ")}
              </div>
            </div>
            <div>
              <div className="text-blue-600 font-semibold">Duration</div>
              <div className="text-blue-800">{tripDuration} days</div>
            </div>
            <div>
              <div className="text-blue-600 font-semibold">Travelers</div>
              <div className="text-blue-800">{formData.numberOfTravelers}</div>
            </div>
            <div>
              <div className="text-blue-600 font-semibold">Destination</div>
              <div className="text-blue-800">{formData.destination}</div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {travelPlans.map((plan) => {
            const isSelected = selectedPlan?.id === plan.id;
            const colors = getColorClasses(plan.color, isSelected);
            const calculatedPremium = calculatePremium(
              plan.basePremium,
              formData.tripType,
              tripDuration,
              formData.numberOfTravelers
            );

            return (
              <motion.div
                key={plan.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`relative p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${colors.border} ${colors.bg} hover:shadow-lg`}
                onClick={() => handlePlanSelect(plan)}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-3 left-6">
                    <span className="bg-primary-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}

                {/* Selection Indicator */}
                <div className="absolute top-4 right-4">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      isSelected
                        ? "border-primary-500 bg-primary-500"
                        : "border-gray-300"
                    }`}
                  >
                    {isSelected && <TbCheck className="w-4 h-4 text-white" />}
                  </div>
                </div>

                {/* Plan Header */}
                <div className="text-center mb-4">
                  <div
                    className={`w-16 h-16 rounded-full ${colors.icon} flex items-center justify-center mx-auto mb-3`}
                  >
                    <TbShield className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-800 mb-1">
                    {plan.name}
                  </h4>
                  <p className="text-gray-600 text-sm">{plan.description}</p>
                </div>

                {/* Pricing */}
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-gray-800 mb-1">
                    {formatCurrency(calculatedPremium)}
                  </div>
                  <div className="text-gray-600 text-sm">
                    {formData.tripType === "annual-multi-trip"
                      ? "per year"
                      : `for ${tripDuration} days`}
                  </div>
                  {formData.numberOfTravelers > 1 && (
                    <div className="text-gray-500 text-xs">
                      ({formData.numberOfTravelers} travelers)
                    </div>
                  )}
                </div>

                {/* Key Features */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-sm">
                    <TbHeartbeat className="w-4 h-4 text-red-500 mr-2" />
                    <span>Medical: ${plan.features.medical}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <TbLuggage className="w-4 h-4 text-blue-500 mr-2" />
                    <span>Luggage: ${plan.features.luggage}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <TbPlane className="w-4 h-4 text-green-500 mr-2" />
                    <span>Cancellation: ${plan.features.cancellation}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <TbPhone className="w-4 h-4 text-purple-500 mr-2" />
                    <span>24/7 Assistance</span>
                  </div>
                </div>

                {/* Coverage Details */}
                <div className="border-t pt-4">
                  <h5 className="font-semibold text-gray-700 mb-2 text-sm">
                    Coverage includes:
                  </h5>
                  <ul className="space-y-1">
                    {plan.coverage.slice(0, 4).map((item, index) => (
                      <li
                        key={index}
                        className="flex items-start text-xs text-gray-600"
                      >
                        <TbCheck className="w-3 h-3 text-green-500 mr-1 mt-0.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                    {plan.coverage.length > 4 && (
                      <li className="text-xs text-gray-500">
                        +{plan.coverage.length - 4} more benefits
                      </li>
                    )}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-gray-50 rounded-lg p-6 mb-8"
        >
          <h4 className="font-bold text-gray-800 mb-4">Coverage Comparison</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Coverage</th>
                  <th className="text-center py-2">Bronze</th>
                  <th className="text-center py-2">Silver</th>
                  <th className="text-center py-2">Gold</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-2">Emergency Medical</td>
                  <td className="text-center">$50,000</td>
                  <td className="text-center">$60,000</td>
                  <td className="text-center">$100,000</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">Personal Accident</td>
                  <td className="text-center">$10,000</td>
                  <td className="text-center">$15,000</td>
                  <td className="text-center">$25,000</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">Luggage Protection</td>
                  <td className="text-center">$750</td>
                  <td className="text-center">$1,000</td>
                  <td className="text-center">$1,500</td>
                </tr>
                <tr>
                  <td className="py-2">Personal Liability</td>
                  <td className="text-center">$75,000</td>
                  <td className="text-center">$100,000</td>
                  <td className="text-center">$150,000</td>
                </tr>
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Important Information */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8"
        >
          <div className="flex items-start">
            <div className="text-yellow-600 mr-3 mt-0.5">⚠️</div>
            <div>
              <h4 className="font-semibold text-yellow-800 mb-1">
                Coverage Exclusions
              </h4>
              <ul className="text-yellow-700 text-sm space-y-1">
                <li>• Pre-existing medical conditions (unless declared)</li>
                <li>
                  • High-risk activities (extreme sports, professional sports)
                </li>
                <li>• Travel to countries under government travel advisory</li>
                <li>• Age limit: 80 years maximum</li>
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
            disabled={!selectedPlan}
            className={`flex items-center px-8 py-3 rounded-lg font-semibold transition-all ${
              selectedPlan
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

export default PlanSelection;
