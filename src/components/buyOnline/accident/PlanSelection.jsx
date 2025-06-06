import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  TbChevronLeft,
  TbChevronRight,
  TbLoader,
  TbCheck,
  TbInfoCircle,
  TbShield,
  TbCurrencyDollar,
  TbBuilding,
  TbStar,
} from "react-icons/tb";
import applicationService from "../../../services/applicationService";

const PlanSelection = ({ formData, updateFormData, nextStep, prevStep }) => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(
    formData.selectedPlan || null
  );

  useEffect(() => {
    fetchPlans();
  }, [formData.coverType]);

  const fetchPlans = async () => {
    setLoading(true);
    setError(null);

    try {
      const filters = {
        coverType: formData.coverType,
        // Add more filters based on cover type
      };

      const response = await applicationService.getPersonalAccidentPlans(
        filters
      );

      if (response.success && Array.isArray(response.data)) {
        setPlans(response.data);
      } else {
        // Fallback to mock data for demo purposes
        console.log("API response not in expected format, using mock data");
        setPlans(getMockPlans(formData.coverType));
      }
    } catch (err) {
      console.error("Error fetching plans:", err);
      setError("Failed to load insurance plans");
      // Use mock data as fallback
      const mockPlans = getMockPlans(formData.coverType);
      console.log("Using mock data:", mockPlans);
      setPlans(Array.isArray(mockPlans) ? mockPlans : []);
    } finally {
      setLoading(false);
    }
  };

  // Mock data for demonstration
  const getMockPlans = (coverType) => {
    const basePlans = [
      {
        id: "jubilee-pa-basic",
        name:
          coverType === "student"
            ? "Student Shield Basic"
            : "Personal Shield Basic",
        companyName: "Jubilee Insurance",
        companyLogo: "/jubilee-logo.png",
        planType: "Basic",
        premiumAmount: coverType === "student" ? 492 : 1200,
        coverageAmount: coverType === "student" ? 500000 : 1000000,
        features: [
          "Medical expenses coverage",
          "Accidental death benefit",
          "Permanent disability cover",
          "24/7 emergency assistance",
          coverType === "student"
            ? "Industrial attachment cover"
            : "Worldwide coverage",
        ],
        popular: coverType === "student",
        rating: 4.5,
        description:
          coverType === "student"
            ? "Comprehensive coverage for students during studies and industrial attachments"
            : "Complete personal accident protection for everyday activities",
      },
      {
        id: "aar-pa-standard",
        name:
          coverType === "student"
            ? "Student Care Standard"
            : "Personal Care Standard",
        companyName: "AAR Insurance",
        companyLogo: "/aar-logo.png",
        planType: "Standard",
        premiumAmount: coverType === "student" ? 650 : 1500,
        coverageAmount: coverType === "student" ? 750000 : 1500000,
        features: [
          "Enhanced medical coverage",
          "Accidental death benefit",
          "Temporary disability allowance",
          "Rehabilitation support",
          "Emergency evacuation",
          coverType === "student"
            ? "Academic activity coverage"
            : "Travel accident cover",
        ],
        popular: false,
        rating: 4.3,
        description:
          "Enhanced protection with additional benefits and higher coverage limits",
      },
      {
        id: "cic-pa-premium",
        name:
          coverType === "student"
            ? "Student Premium Shield"
            : "Individual Premium Shield",
        companyName: "CIC Insurance",
        companyLogo: "/cic-logo.png",
        planType: "Premium",
        premiumAmount: coverType === "student" ? 850 : 2000,
        coverageAmount: coverType === "student" ? 1000000 : 2500000,
        features: [
          "Comprehensive medical coverage",
          "Enhanced death benefits",
          "Permanent & temporary disability",
          "Psychological counseling",
          "Family support benefits",
          "Priority claims processing",
          coverType === "student"
            ? "Internship coverage extension"
            : "Global coverage",
        ],
        popular: false,
        rating: 4.7,
        description:
          "Premium coverage with comprehensive benefits and superior support services",
      },
    ];

    return basePlans;
  };

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
    updateFormData("selectedPlan", plan);
    updateFormData("premiumAmount", plan.premiumAmount);
    updateFormData("insuranceProvider", plan.companyName);
  };

  const handleContinue = () => {
    if (selectedPlan) {
      nextStep();
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <TbLoader className="h-8 w-8 animate-spin text-primary-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading available plans...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={fetchPlans}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Choose Your{" "}
          {formData.coverType === "student" ? "Student" : "Individual"} Accident
          Plan
        </h3>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Compare plans from top insurance providers and select the one that
          best fits your needs and budget.
        </p>
      </div>

      <div className="grid gap-6">
        {Array.isArray(plans) && plans.length > 0 ? (
          plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`relative rounded-xl border-2 p-6 cursor-pointer transition-all duration-200 ${
                selectedPlan?.id === plan.id
                  ? "border-primary-500 bg-primary-50 shadow-lg"
                  : "border-gray-200 bg-white hover:border-primary-300 hover:shadow-md"
              }`}
              onClick={() => handleSelectPlan(plan)}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -top-3 left-6">
                  <span className="bg-secondary-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Selected indicator */}
              {selectedPlan?.id === plan.id && (
                <div className="absolute top-4 right-4">
                  <div className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center">
                    <TbCheck className="w-4 h-4 text-white" />
                  </div>
                </div>
              )}

              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                {/* Plan Info */}
                <div className="flex-1">
                  <div className="flex items-start space-x-4 mb-4">
                    <div className="flex-shrink-0">
                      <img
                        src={plan.companyLogo}
                        alt={plan.companyName}
                        className="w-12 h-12 object-contain rounded-lg bg-gray-50 p-2"
                        onError={(e) => {
                          e.target.src = "/placeholder-logo.png";
                        }}
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="text-lg font-semibold text-gray-900">
                          {plan.name}
                        </h4>
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                          {plan.planType}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">
                        {plan.companyName}
                      </p>
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <TbStar
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(plan.rating)
                                  ? "text-yellow-400 fill-current"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600">
                          {plan.rating}/5
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 mb-4">
                    {plan.description}
                  </p>

                  {/* Features */}
                  <div className="mb-4">
                    <h5 className="text-sm font-medium text-gray-900 mb-2">
                      Key Features:
                    </h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
                      {plan.features.map((feature, idx) => (
                        <div
                          key={idx}
                          className="flex items-start text-sm text-gray-600"
                        >
                          <TbCheck className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Pricing & Coverage */}
                <div className="lg:ml-6 lg:text-right space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm text-gray-600 mb-1">
                      Coverage Amount
                    </div>
                    <div className="text-lg font-bold text-gray-900">
                      {formatCurrency(plan.coverageAmount)}
                    </div>
                  </div>

                  <div className="bg-primary-50 rounded-lg p-4">
                    <div className="text-sm text-primary-600 mb-1">
                      Annual Premium
                    </div>
                    <div className="text-2xl font-bold text-primary-600">
                      {formatCurrency(plan.premiumAmount)}
                    </div>
                    <div className="text-xs text-primary-500">
                      {formatCurrency(Math.round(plan.premiumAmount / 12))}
                      /month
                    </div>
                  </div>

                  <button
                    type="button"
                    className={`w-full lg:w-auto px-6 py-2 rounded-lg font-medium transition-colors ${
                      selectedPlan?.id === plan.id
                        ? "bg-primary-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectPlan(plan);
                    }}
                  >
                    {selectedPlan?.id === plan.id ? "Selected" : "Select Plan"}
                  </button>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-600">
              No plans available for the selected coverage type.
            </p>
            <button
              onClick={fetchPlans}
              className="mt-4 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
            >
              Retry
            </button>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center pt-6 border-t border-gray-200">
        <button
          onClick={prevStep}
          className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <TbChevronLeft className="w-4 h-4 mr-2" />
          Back
        </button>

        <button
          onClick={handleContinue}
          disabled={!selectedPlan}
          className={`flex items-center px-6 py-2 rounded-lg font-medium transition-colors ${
            selectedPlan
              ? "bg-primary-600 text-white hover:bg-primary-700"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Continue
          <TbChevronRight className="w-4 h-4 ml-2" />
        </button>
      </div>

      {selectedPlan && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start">
            <TbInfoCircle className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
            <div className="text-sm text-blue-800">
              <p className="font-medium">Selected: {selectedPlan.name}</p>
              <p>You can review and modify your selection in the next steps.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlanSelection;
