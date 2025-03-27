"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  FiCheckCircle,
  FiInfo,
  FiUser,
  FiMail,
  FiPhone,
  FiCalendar,
  FiShield,
  FiDollarSign,
  FiArrowRight,
  FiArrowLeft,
  FiCheck,
  FiHelpCircle,
  FiCreditCard,
  FiStar,
} from "react-icons/fi";
import { useDispatch } from "react-redux";
import { setUserQuery, setLoading } from "../../store/slices/comparisonSlice";
import { submitQuery } from "../../services/queryService";

// Form data
const coverageOptions = [
  {
    value: "basic",
    label: "Basic Coverage",
    description: "Essential protection for fundamental health needs",
    features: ["Hospital admission", "Basic medication", "Emergency care"],
  },
  {
    value: "standard",
    label: "Standard Coverage",
    description: "Balanced protection with broader health benefits",
    features: [
      "All Basic features",
      "Specialist consultations",
      "Chronic condition management",
    ],
  },
  {
    value: "comprehensive",
    label: "Comprehensive Coverage",
    description: "Extensive coverage with additional wellness features",
    features: [
      "All Standard features",
      "Dental & optical care",
      "Preventive screenings",
    ],
  },
  {
    value: "premium",
    label: "Premium Coverage",
    description: "Top-tier protection with premium healthcare services",
    features: [
      "All Comprehensive features",
      "International coverage",
      "VIP hospital rooms",
    ],
  },
];

const budgetRanges = [
  {
    value: 30000,
    label: "Ksh 30,000 - 50,000",
    description: "Budget-friendly option",
    iconBg: "bg-secondary-100",
    icon: <FiStar className="text-secondary-500" />,
  },
  {
    value: 50000,
    label: "Ksh 50,000 - 70,000",
    description: "Moderate coverage",
    iconBg: "bg-secondary-200",
    icon: <FiStar className="text-secondary-600" />,
  },
  {
    value: 70000,
    label: "Ksh 70,000 - 100,000",
    description: "Comprehensive protection",
    iconBg: "bg-secondary-300",
    icon: <FiStar className="text-secondary-700" />,
  },
  {
    value: 100000,
    label: "Ksh 100,000+",
    description: "Premium health security",
    iconBg: "bg-secondary-400",
    icon: <FiStar className="text-secondary-800" />,
  },
];

const ComparisonPage = () => {
  const [step, setStep] = useState(1);
  const [animateIn, setAnimateIn] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      age: 60,
      desiredCoverage: "",
      budget: 0,
    },
    mode: "onChange",
  });

  const watchedValues = watch();

  // Animation effect when changing steps
  useEffect(() => {
    // Auto-scroll to top when step changes
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);

  const onSubmit = async (data) => {
    try {
      dispatch(setLoading(true));
      dispatch(setUserQuery(data));

      // Submit the query to the API
      const response = await submitQuery(data);

      dispatch(setLoading(false));

      // Navigate to results page with the report ID
      navigate(`/results/${response.reportId}`);
    } catch (error) {
      console.error("Error submitting query:", error);
      dispatch(setLoading(false));
    }
  };

  const changeStep = (newStep) => {
    setAnimateIn(false);
    setTimeout(() => {
      setStep(newStep);
      setAnimateIn(true);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-neutral-50 py-12 sm:py-16 px-4 sm:px-6 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-secondary-100 rounded-full opacity-30 blur-3xl"></div>
      <div className="absolute bottom-20 -left-40 w-96 h-96 bg-primary-100 rounded-full opacity-20 blur-3xl"></div>

      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-10 sm:mb-14 space-y-4">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium bg-secondary-100 text-secondary-700 shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-secondary-500 mr-2"></span>
            <span>Personalized Insurance Matching</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-gray-800 leading-tight">
            Find Your <span className="text-secondary-500">Perfect</span>{" "}
            Insurance Plan
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Our AI-powered comparison tool analyzes top insurance options to
            find the perfect plan for your unique needs.
          </p>
        </div>

        {/* Progress Indicator with Animated Transitions */}
        <div className="mb-10 sm:mb-12">
          <div className="flex items-center justify-between relative max-w-md mx-auto">
            {/* Progress Line */}
            <div className="absolute left-0 right-0 top-1/2 transform -translate-y-1/2 h-1 bg-gray-200 rounded-full">
              <div
                className="h-full bg-secondary-500 rounded-full transition-all duration-700 ease-in-out"
                style={{ width: step === 1 ? "0%" : "100%" }}
              ></div>
            </div>

            {/* Step 1 */}
            <div className="relative z-10 flex flex-col items-center">
              <div
                className={`h-12 w-12 sm:h-14 sm:w-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-500
                  ${
                    step >= 1
                      ? "bg-secondary-500 text-white"
                      : "bg-white border-2 border-gray-300 text-gray-600"
                  }`}
              >
                {step > 1 ? (
                  <FiCheckCircle className="h-6 w-6 sm:h-7 sm:w-7" />
                ) : (
                  <FiUser className="h-6 w-6 sm:h-7 sm:w-7" />
                )}
              </div>
              <p
                className={`mt-2 text-sm sm:text-base font-medium ${
                  step >= 1 ? "text-secondary-600" : "text-gray-500"
                }`}
              >
                Personal Details
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative z-10 flex flex-col items-center">
              <div
                className={`h-12 w-12 sm:h-14 sm:w-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-500
                  ${
                    step >= 2
                      ? "bg-secondary-500 text-white"
                      : "bg-white border-2 border-gray-300 text-gray-600"
                  }`}
              >
                {step > 2 ? (
                  <FiCheckCircle className="h-6 w-6 sm:h-7 sm:w-7" />
                ) : (
                  <FiShield className="h-6 w-6 sm:h-7 sm:w-7" />
                )}
              </div>
              <p
                className={`mt-2 text-sm sm:text-base font-medium ${
                  step >= 2 ? "text-secondary-600" : "text-gray-500"
                }`}
              >
                Insurance Preferences
              </p>
            </div>
          </div>
        </div>

        {/* Form Container with Modern Design */}
        <div
          className={`bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-500 transform hover:shadow-2xl ${
            animateIn ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          <div className="p-6 sm:p-10">
            <form
              onSubmit={handleSubmit(
                step === 2 ? onSubmit : () => changeStep(2)
              )}
              className="space-y-8"
            >
              {step === 1 ? (
                <div className="space-y-8">
                  <div className="flex items-center space-x-4 mb-8">
                    <div className="h-12 w-12 rounded-full bg-secondary-100 flex items-center justify-center">
                      <FiUser className="h-6 w-6 text-secondary-600" />
                    </div>
                    <div>
                      <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                        Personal Information
                      </h2>
                      <p className="text-gray-500 text-sm sm:text-base">
                        Please provide your details for a personalized quote
                      </p>
                    </div>
                  </div>

                  {/* Input Fields with Icons */}
                  <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
                    <div className="space-y-2">
                      <label
                        htmlFor="name"
                        className="text-sm font-medium text-gray-700 flex items-center"
                      >
                        Full Name{" "}
                        <span className="text-secondary-500 ml-1">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <FiUser className="text-gray-400 h-5 w-5" />
                        </div>
                        <input
                          id="name"
                          type="text"
                          className={`w-full h-12 pl-11 pr-4 text-gray-700 rounded-lg border-2 bg-white
                          transition-all duration-200 focus:ring-2 focus:ring-secondary-100 focus:border-secondary-500 outline-none
                          ${
                            errors.name
                              ? "border-red-300"
                              : "border-gray-200 hover:border-secondary-300"
                          }`}
                          placeholder="John Doe"
                          {...register("name", {
                            required: "Name is required",
                          })}
                        />
                      </div>
                      {errors.name && (
                        <p className="mt-1 text-red-600 text-xs flex items-center">
                          <FiInfo className="mr-1 h-3 w-3" />{" "}
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="email"
                        className="text-sm font-medium text-gray-700 flex items-center"
                      >
                        Email Address{" "}
                        <span className="text-secondary-500 ml-1">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <FiMail className="text-gray-400 h-5 w-5" />
                        </div>
                        <input
                          id="email"
                          type="email"
                          className={`w-full h-12 pl-11 pr-4 text-gray-700 rounded-lg border-2 bg-white
                          transition-all duration-200 focus:ring-2 focus:ring-secondary-100 focus:border-secondary-500 outline-none
                          ${
                            errors.email
                              ? "border-red-300"
                              : "border-gray-200 hover:border-secondary-300"
                          }`}
                          placeholder="john@example.com"
                          {...register("email", {
                            required: "Email is required",
                            pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              message: "Invalid email address",
                            },
                          })}
                        />
                      </div>
                      {errors.email && (
                        <p className="mt-1 text-red-600 text-xs flex items-center">
                          <FiInfo className="mr-1 h-3 w-3" />{" "}
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
                    <div className="space-y-2">
                      <label
                        htmlFor="phone"
                        className="text-sm font-medium text-gray-700 flex items-center"
                      >
                        Phone Number{" "}
                        <span className="text-secondary-500 ml-1">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <FiPhone className="text-gray-400 h-5 w-5" />
                        </div>
                        <input
                          id="phone"
                          type="tel"
                          className={`w-full h-12 pl-11 pr-4 text-gray-700 rounded-lg border-2 bg-white
                          transition-all duration-200 focus:ring-2 focus:ring-secondary-100 focus:border-secondary-500 outline-none
                          ${
                            errors.phone
                              ? "border-red-300"
                              : "border-gray-200 hover:border-secondary-300"
                          }`}
                          placeholder="+254 700 000000"
                          {...register("phone", {
                            required: "Phone number is required",
                          })}
                        />
                      </div>
                      {errors.phone && (
                        <p className="mt-1 text-red-600 text-xs flex items-center">
                          <FiInfo className="mr-1 h-3 w-3" />{" "}
                          {errors.phone.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="age"
                        className="text-sm font-medium text-gray-700 flex items-center"
                      >
                        Age <span className="text-secondary-500 ml-1">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <FiCalendar className="text-gray-400 h-5 w-5" />
                        </div>
                        <input
                          id="age"
                          type="number"
                          min="60"
                          max="90"
                          className={`w-full h-12 pl-11 pr-4 text-gray-700 rounded-lg border-2 bg-white
                          transition-all duration-200 focus:ring-2 focus:ring-secondary-100 focus:border-secondary-500 outline-none
                          ${
                            errors.age
                              ? "border-red-300"
                              : "border-gray-200 hover:border-secondary-300"
                          }`}
                          {...register("age", {
                            required: "Age is required",
                            min: {
                              value: 60,
                              message: "Age must be 60 or older",
                            },
                            max: {
                              value: 90,
                              message: "Age must be 90 or younger",
                            },
                          })}
                        />
                      </div>
                      {errors.age && (
                        <p className="mt-1 text-red-600 text-xs flex items-center">
                          <FiInfo className="mr-1 h-3 w-3" />{" "}
                          {errors.age.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      className="w-full h-14 relative overflow-hidden bg-secondary-500 text-white text-base sm:text-lg font-semibold rounded-xl
                      shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-secondary-600 group"
                    >
                      <span className="relative z-10 flex items-center justify-center">
                        Continue to Insurance Preferences
                        <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-secondary-600 to-secondary-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-8">
                  <div className="flex items-center space-x-4 mb-8">
                    <div className="h-12 w-12 rounded-full bg-secondary-100 flex items-center justify-center">
                      <FiShield className="h-6 w-6 text-secondary-600" />
                    </div>
                    <div>
                      <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                        Insurance Preferences
                      </h2>
                      <p className="text-gray-500 text-sm sm:text-base">
                        Help us understand what coverage would work best for you
                      </p>
                    </div>
                  </div>

                  {/* Coverage Options with Modern Cards */}
                  <div className="space-y-4">
                    <label className="text-base font-medium text-gray-700 flex items-center">
                      <FiShield className="mr-2 text-secondary-500 h-4 w-4" />
                      Desired Coverage Level{" "}
                      <span className="text-secondary-500 ml-1">*</span>
                    </label>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      {coverageOptions.map((option) => (
                        <div
                          key={option.value}
                          className={`relative border-2 rounded-xl p-4 sm:p-5 cursor-pointer transition-all duration-300 
                          ${
                            watchedValues.desiredCoverage === option.value
                              ? "border-secondary-500 bg-secondary-50 shadow-md transform scale-[1.02]"
                              : "border-gray-200 hover:border-secondary-300 hover:bg-neutral-50"
                          }`}
                          onClick={() => {
                            const input = document.getElementById(
                              `coverage-${option.value}`
                            );
                            if (input) input.click();
                          }}
                        >
                          <div className="flex items-start">
                            <input
                              id={`coverage-${option.value}`}
                              type="radio"
                              className="sr-only"
                              value={option.value}
                              {...register("desiredCoverage", {
                                required: "Please select a coverage level",
                              })}
                            />
                            <div className="w-full">
                              <div className="flex justify-between items-center mb-2">
                                <p className="font-bold text-base sm:text-lg text-gray-800">
                                  {option.label}
                                </p>
                                {watchedValues.desiredCoverage ===
                                  option.value && (
                                  <div className="h-5 w-5 rounded-full bg-secondary-500 flex items-center justify-center">
                                    <FiCheck className="text-white h-3 w-3" />
                                  </div>
                                )}
                              </div>
                              <p className="text-sm text-gray-600 mb-3">
                                {option.description}
                              </p>
                              <div className="bg-neutral-50 rounded-lg p-2 mt-1">
                                <p className="text-xs font-medium text-gray-700 mb-1">
                                  Key features:
                                </p>
                                <ul className="space-y-1">
                                  {option.features.map((feature, idx) => (
                                    <li
                                      key={idx}
                                      className="flex items-center text-xs text-gray-600"
                                    >
                                      <FiCheck className="text-secondary-500 mr-1 h-3 w-3 flex-shrink-0" />
                                      {feature}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                          {watchedValues.desiredCoverage === option.value && (
                            <div className="absolute -top-1.5 -right-1.5 h-6 w-6 rounded-full bg-secondary-500 flex items-center justify-center shadow-md">
                              <FiCheck className="text-white h-3 w-3" />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                    {errors.desiredCoverage && (
                      <p className="mt-1 text-red-600 text-xs flex items-center">
                        <FiInfo className="mr-1 h-3 w-3" />{" "}
                        {errors.desiredCoverage.message}
                      </p>
                    )}
                  </div>

                  {/* Budget Ranges with Modern Cards */}
                  <div className="space-y-4">
                    <label className="text-base font-medium text-gray-700 flex items-center">
                      <FiCreditCard className="mr-2 text-secondary-500 h-4 w-4" />
                      Budget Range (Annual Premium){" "}
                      <span className="text-secondary-500 ml-1">*</span>
                    </label>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      {budgetRanges.map((range) => (
                        <div
                          key={range.value}
                          className={`relative border-2 rounded-xl p-4 sm:p-5 cursor-pointer transition-all duration-300 
                          ${
                            Number(watchedValues.budget) === range.value
                              ? "border-secondary-500 bg-secondary-50 shadow-md transform scale-[1.02]"
                              : "border-gray-200 hover:border-secondary-300 hover:bg-neutral-50"
                          }`}
                          onClick={() => {
                            const input = document.getElementById(
                              `budget-${range.value}`
                            );
                            if (input) input.click();
                          }}
                        >
                          <div className="flex items-start">
                            <input
                              id={`budget-${range.value}`}
                              type="radio"
                              className="sr-only"
                              value={range.value}
                              {...register("budget", {
                                required: "Please select a budget range",
                              })}
                            />
                            <div className="w-full">
                              <div className="flex justify-between items-center">
                                <div className="flex items-center mb-1.5">
                                  <div
                                    className={`w-6 h-6 rounded-full ${range.iconBg} flex items-center justify-center mr-2`}
                                  >
                                    {range.icon}
                                  </div>
                                  <p className="font-bold text-base sm:text-lg text-gray-800">
                                    {range.label}
                                  </p>
                                </div>
                                {Number(watchedValues.budget) ===
                                  range.value && (
                                  <div className="h-5 w-5 rounded-full bg-secondary-500 flex items-center justify-center">
                                    <FiCheck className="text-white h-3 w-3" />
                                  </div>
                                )}
                              </div>
                              <div className="ml-8">
                                <p className="text-sm text-gray-600">
                                  {range.description}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    {errors.budget && (
                      <p className="mt-1 text-red-600 text-xs flex items-center">
                        <FiInfo className="mr-1 h-3 w-3" />{" "}
                        {errors.budget.message}
                      </p>
                    )}
                  </div>

                  {/* Information Alert */}
                  <div className="flex items-start p-4 sm:p-5 bg-secondary-50 border border-secondary-100 rounded-xl text-gray-700 space-x-3">
                    <FiHelpCircle className="h-5 w-5 sm:h-6 sm:w-6 text-secondary-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-sm sm:text-base mb-1">
                        What happens next?
                      </h4>
                      <p className="text-sm">
                        After submitting this form, you'll receive a
                        personalized comparison of insurance plans matched to
                        your criteria. Your information is kept secure and
                        confidential.
                      </p>
                    </div>
                  </div>

                  {/* Navigation Buttons */}
                  <div className="flex gap-4 pt-4">
                    <button
                      type="button"
                      onClick={() => changeStep(1)}
                      className="w-1/2 h-14 bg-white border-2 border-gray-300 hover:border-gray-400 text-gray-700 
                      text-base font-semibold rounded-xl shadow-sm hover:shadow-md transition-all duration-300 
                      flex items-center justify-center gap-2 hover:bg-gray-50"
                    >
                      <FiArrowLeft className="h-4 w-4" /> Back
                    </button>
                    <button
                      type="submit"
                      className="w-1/2 h-14 relative overflow-hidden bg-secondary-500 text-white text-base font-semibold rounded-xl
                      shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-secondary-600 group"
                    >
                      <span className="relative z-10 flex items-center justify-center">
                        Compare Plans{" "}
                        <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-secondary-600 to-secondary-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Insurance Logos */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500 mb-4">
            Trusted by Kenya's top insurance providers
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4">
            {[
              "jubilee.png",
              "britam.png",
              "cic.png",
              "aar.png",
              "madison.png",
            ].map((logo, index) => (
              <div
                key={index}
                className="grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
              >
                <img
                  src={`/${logo}`}
                  alt={`Insurance provider ${index + 1}`}
                  className="h-10 object-contain"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Security Note */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500 flex items-center justify-center">
            <FiShield className="h-3 w-3 mr-1" />
            Your information is protected with bank-level security
          </p>
        </div>
      </div>
    </div>
  );
};

export default ComparisonPage;
