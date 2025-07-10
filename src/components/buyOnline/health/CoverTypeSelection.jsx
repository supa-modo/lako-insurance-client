import React from "react";
import { motion } from "framer-motion";
import {
  TbChevronLeft,
  TbChevronRight,
  TbUser,
  TbUsers,
  TbUserHeart,
  TbCheck,
  TbClock,
  TbShield,
  TbHeartPlus,
} from "react-icons/tb";

const CoverTypeSelection = ({
  formData,
  updateFormData,
  nextStep,
  prevStep,
}) => {
  const coverTypes = [
    {
      id: "individual",
      name: "Individual Cover",
      icon: <TbUser className="h-6 w-6 md:h-7 md:w-7" />,
      description: "Comprehensive health coverage for yourself",
      features: [
        "Outpatient & Inpatient care",
        "Emergency medical services",
        "Specialist consultations",
        "Diagnostic tests & imaging",
        "Prescription medications",
        "Dental & optical benefits",
      ],
      idealFor: "Single individuals seeking comprehensive health protection",
      ageRange: "18-80 years",
      premium: "From KSh 12,000/year",
      popular: true,
    },
    {
      id: "family",
      name: "Family Cover",
      icon: <TbUsers className="h-6 w-6 md:h-7 md:w-7" />,
      description: "Protect your entire family with one comprehensive plan",
      features: [
        "Covers spouse & children",
        "Maternity & child wellness",
        "Family outpatient benefits",
        "Emergency coverage for all",
        "Vaccination programs",
        "Annual health checkups",
      ],
      idealFor: "Families with spouse and/or dependents",
      ageRange: "Principal: 18-65, Dependents: 0-25",
      premium: "From KSh 35,000/year",
      popular: false,
    },
    {
      id: "seniors",
      name: "Seniors Cover",
      icon: <TbUserHeart className="h-6 w-6 md:h-7 md:w-7" />,
      description: "Specialized health coverage designed for senior citizens",
      features: [
        "Age-specific health benefits",
        "Chronic disease management",
        "Regular health monitoring",
        "Medication coverage",
        "Specialist geriatric care",
        "Home care services",
      ],
      idealFor: "Senior citizens requiring specialized healthcare",
      ageRange: "60+ years",
      premium: "From KSh 25,000/year",
      popular: false,
    },
  ];

  const handleCoverTypeSelect = (coverType) => {
    updateFormData("coverType", coverType);
  };

  const handleContinue = () => {
    if (formData.coverType) {
      nextStep();
    }
  };

  return (
    <div className="space-y-6 md:space-y-8">
      <div className="text-center mb-8">
        <h3 className="flex items-center justify-center text-lg md:text-xl lg:text-2xl font-bold text-primary-700/90 mb-2">
          <span className="block lg:hidden mr-1">1.</span>
          <span className="">Choose Your Coverage Type</span>
        </h3>
        <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto">
          Select the type of health insurance coverage that best fits your
          needs. Each option is designed for different life stages and family
          situations.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
        {coverTypes.map((coverType) => (
          <motion.div
            key={coverType.id}
            whileTap={{ scale: 0.98 }}
            className={`relative rounded-xl border-2 cursor-pointer transition-all duration-300 ${
              formData.coverType === coverType.id
                ? "border-primary-500 bg-primary-50 shadow-lg"
                : "border-gray-200 bg-white hover:border-primary-300 shadow-sm"
            }`}
            onClick={() => handleCoverTypeSelect(coverType.id)}
          >
            {/* Popular badge */}
            {coverType.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-secondary-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
                  Most Popular
                </span>
              </div>
            )}

            <div className="p-4 md:p-6">
              {/* Header */}
              <div className="flex items-center mb-4">
                <div
                  className={`flex-shrink-0 h-12 w-12 md:h-14 md:w-14 rounded-full flex items-center justify-center ${
                    formData.coverType === coverType.id
                      ? "bg-primary-100 text-primary-600"
                      : "bg-secondary-100 text-secondary-600"
                  } mr-4 shadow-sm`}
                >
                  {coverType.icon}
                </div>
                <div className="flex-grow">
                  <h4
                    className={`text-base md:text-lg font-bold ${
                      formData.coverType === coverType.id
                        ? "text-primary-700"
                        : "text-gray-700"
                    }`}
                  >
                    {coverType.name}
                  </h4>
                  <p
                    className={`text-sm ${
                      formData.coverType === coverType.id
                        ? "text-primary-600"
                        : "text-gray-600"
                    }`}
                  >
                    {coverType.description}
                  </p>
                </div>
                {formData.coverType === coverType.id && (
                  <div className="absolute top-3 right-3">
                    <div className="h-6 w-6 rounded-full bg-primary-600 flex items-center justify-center">
                      <TbCheck className="h-4 w-4 text-white" />
                    </div>
                  </div>
                )}
              </div>

              {/* Key Info */}
              <div className="mb-4 space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <TbClock className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="font-medium">Age Range:</span>
                  <span className="ml-2">{coverType.ageRange}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <TbShield className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="font-medium">Premium:</span>
                  <span className="ml-2 font-semibold text-green-600">
                    {coverType.premium}
                  </span>
                </div>
              </div>

              {/* Features */}
              <div className="mb-4">
                <h5 className="text-sm font-semibold text-gray-700 mb-3">
                  Key Benefits:
                </h5>
                <div className="grid grid-cols-1 gap-2">
                  {coverType.features.slice(0, 4).map((feature, index) => (
                    <div key={index} className="flex items-center text-xs">
                      <div
                        className={`w-1.5 h-1.5 rounded-full mr-2 ${
                          formData.coverType === coverType.id
                            ? "bg-primary-500"
                            : "bg-gray-400"
                        }`}
                      ></div>
                      <span
                        className={
                          formData.coverType === coverType.id
                            ? "text-primary-700"
                            : "text-gray-600"
                        }
                      >
                        {feature}
                      </span>
                    </div>
                  ))}
                  {coverType.features.length > 4 && (
                    <div className="flex items-center text-xs">
                      <div
                        className={`w-1.5 h-1.5 rounded-full mr-2 ${
                          formData.coverType === coverType.id
                            ? "bg-primary-500"
                            : "bg-gray-400"
                        }`}
                      ></div>
                      <span
                        className={
                          formData.coverType === coverType.id
                            ? "text-primary-600"
                            : "text-gray-500"
                        }
                      >
                        +{coverType.features.length - 4} more benefits
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Ideal for */}
              <div
                className={`rounded-lg p-3 text-xs ${
                  formData.coverType === coverType.id
                    ? "bg-primary-100/80 border border-primary-200"
                    : "bg-gray-50 border border-gray-200"
                }`}
              >
                <div className="flex items-start">
                  <TbHeartPlus
                    className={`w-4 h-4 mr-2 mt-0.5 flex-shrink-0 ${
                      formData.coverType === coverType.id
                        ? "text-primary-600"
                        : "text-gray-500"
                    }`}
                  />
                  <div>
                    <span
                      className={`font-medium ${
                        formData.coverType === coverType.id
                          ? "text-primary-700"
                          : "text-gray-700"
                      }`}
                    >
                      Ideal for:{" "}
                    </span>
                    <span
                      className={
                        formData.coverType === coverType.id
                          ? "text-primary-600"
                          : "text-gray-600"
                      }
                    >
                      {coverType.idealFor}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Information Note */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start">
          <TbShield className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <h5 className="text-blue-800 font-medium mb-1">
              Important Information
            </h5>
            <p className="text-blue-700 text-sm">
              All health insurance plans include comprehensive medical coverage.
              Premium amounts shown are starting prices and may vary based on
              age, medical history, and selected benefits. Family plans require
              additional information about dependents.
            </p>
          </div>
        </div>
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
          disabled={!formData.coverType}
          className={`flex items-center px-6 py-2 rounded-lg font-medium transition-colors ${
            formData.coverType
              ? "bg-primary-600 text-white hover:bg-primary-700"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Continue
          <TbChevronRight className="w-4 h-4 ml-2" />
        </button>
      </div>

      {!formData.coverType && (
        <div className="text-center">
          <p className="text-sm text-red-600">
            Please select a coverage type to continue
          </p>
        </div>
      )}
    </div>
  );
};

export default CoverTypeSelection;
