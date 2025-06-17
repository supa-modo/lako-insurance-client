import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  TbMapPin,
  TbCalendar,
  TbUsers,
  TbArrowLeft,
  TbArrowRight,
  TbPlane,
  TbBriefcase,
  TbBeach,
  TbSchool,
  TbHeart,
  TbStethoscope,
} from "react-icons/tb";

const TravelDetailsForm = ({
  formData,
  updateFormData,
  nextStep,
  prevStep,
}) => {
  const [errors, setErrors] = useState({});

  const travelPurposes = [
    { id: "leisure", label: "Leisure/Tourism", icon: <TbBeach /> },
    { id: "business", label: "Business", icon: <TbBriefcase /> },
    { id: "education", label: "Education/Study", icon: <TbSchool /> },
    { id: "medical", label: "Medical Treatment", icon: <TbStethoscope /> },
    { id: "family", label: "Visiting Family", icon: <TbHeart /> },
    { id: "other", label: "Other", icon: <TbPlane /> },
  ];

  const commonDestinations = [
    "United States",
    "United Kingdom",
    "Canada",
    "Australia",
    "Germany",
    "France",
    "Dubai/UAE",
    "India",
    "China",
    "South Africa",
    "Tanzania",
    "Uganda",
    "Rwanda",
    "Other",
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.destination?.trim()) {
      newErrors.destination = "Destination is required";
    }

    if (!formData.departureDate) {
      newErrors.departureDate = "Departure date is required";
    } else {
      const departureDate = new Date(formData.departureDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (departureDate < today) {
        newErrors.departureDate = "Departure date cannot be in the past";
      }
    }

    if (!formData.returnDate) {
      newErrors.returnDate = "Return date is required";
    } else if (formData.departureDate && formData.returnDate) {
      const departureDate = new Date(formData.departureDate);
      const returnDate = new Date(formData.returnDate);

      if (returnDate <= departureDate) {
        newErrors.returnDate = "Return date must be after departure date";
      }

      // Check trip duration limits
      const diffTime = Math.abs(returnDate - departureDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (formData.tripType === "single-trip" && diffDays > 180) {
        newErrors.returnDate =
          "Single trip coverage is limited to 180 days maximum";
      }

      if (formData.tripType === "annual-multi-trip" && diffDays > 45) {
        newErrors.returnDate =
          "Each trip in annual multi-trip coverage is limited to 45 days maximum";
      }
    }

    if (!formData.travelPurpose) {
      newErrors.travelPurpose = "Purpose of travel is required";
    }

    if (!formData.numberOfTravelers || formData.numberOfTravelers < 1) {
      newErrors.numberOfTravelers = "Number of travelers must be at least 1";
    }

    if (formData.numberOfTravelers > 10) {
      newErrors.numberOfTravelers =
        "For groups larger than 10, please contact us directly";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      nextStep();
    }
  };

  const handleInputChange = (field, value) => {
    updateFormData(field, value);
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  // Calculate trip duration
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

  return (
    <div className="">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <div className="text-center mb-8">
          <h3 className="flex items-center justify-center text-lg md:text-xl lg:text-2xl font-bold text-primary-700/90 mb-3">
            <span className="block lg:hidden mr-1">2.</span>
            <TbMapPin className="w-6 h-6 md:w-7 md:h-7 mr-2" />
            Travel Details
          </h3>
          <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto">
            Provide information about your trip including destination, dates,
            and purpose of travel
          </p>
        </div>

        <div className="space-y-6">
          {/* Destination */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Destination <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.destination || ""}
                onChange={(e) =>
                  handleInputChange("destination", e.target.value)
                }
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors ${
                  errors.destination
                    ? "border-red-500 bg-red-50"
                    : "border-gray-300 bg-white"
                }`}
              >
                <option value="">Select destination</option>
                {commonDestinations.map((dest) => (
                  <option key={dest} value={dest}>
                    {dest}
                  </option>
                ))}
              </select>
              {formData.destination === "Other" && (
                <div className="mt-2">
                  <input
                    type="text"
                    placeholder="Specify destination"
                    value={formData.customDestination || ""}
                    onChange={(e) =>
                      handleInputChange("customDestination", e.target.value)
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              )}
              {errors.destination && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.destination}
                </p>
              )}
            </div>

            {/* Trip Duration Info */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-700 mb-2">
                Trip Duration
              </h4>
              {getTripDuration() > 0 ? (
                <div className="text-lg font-bold text-primary-600">
                  {getTripDuration()} days
                </div>
              ) : (
                <div className="text-gray-500">
                  Select dates to see duration
                </div>
              )}
              <p className="text-xs text-gray-600 mt-1">
                {formData.tripType === "single-trip"
                  ? "Maximum 180 days for single trip"
                  : "Maximum 45 days per trip"}
              </p>
            </div>
          </div>

          {/* Travel Dates */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Departure Date <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <TbCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="date"
                  value={formData.departureDate || ""}
                  onChange={(e) =>
                    handleInputChange("departureDate", e.target.value)
                  }
                  min={new Date().toISOString().split("T")[0]}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors ${
                    errors.departureDate
                      ? "border-red-500 bg-red-50"
                      : "border-gray-300 bg-white"
                  }`}
                />
              </div>
              {errors.departureDate && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.departureDate}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Return Date <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <TbCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="date"
                  value={formData.returnDate || ""}
                  onChange={(e) =>
                    handleInputChange("returnDate", e.target.value)
                  }
                  min={
                    formData.departureDate ||
                    new Date().toISOString().split("T")[0]
                  }
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors ${
                    errors.returnDate
                      ? "border-red-500 bg-red-50"
                      : "border-gray-300 bg-white"
                  }`}
                />
              </div>
              {errors.returnDate && (
                <p className="text-red-500 text-sm mt-1">{errors.returnDate}</p>
              )}
            </div>
          </div>

          {/* Purpose of Travel */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Purpose of Travel <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {travelPurposes.map((purpose) => (
                <button
                  key={purpose.id}
                  type="button"
                  onClick={() => handleInputChange("travelPurpose", purpose.id)}
                  className={`p-3 rounded-lg border-2 transition-all flex items-center space-x-2 ${
                    formData.travelPurpose === purpose.id
                      ? "border-primary-500 bg-primary-50 text-primary-700"
                      : "border-gray-200 hover:border-gray-300 text-gray-700"
                  }`}
                >
                  <span className="text-lg">{purpose.icon}</span>
                  <span className="text-sm font-medium">{purpose.label}</span>
                </button>
              ))}
            </div>
            {errors.travelPurpose && (
              <p className="text-red-500 text-sm mt-1">
                {errors.travelPurpose}
              </p>
            )}
          </div>

          {/* Number of Travelers */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Number of Travelers <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <TbUsers className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={formData.numberOfTravelers || ""}
                  onChange={(e) =>
                    handleInputChange(
                      "numberOfTravelers",
                      parseInt(e.target.value)
                    )
                  }
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors ${
                    errors.numberOfTravelers
                      ? "border-red-500 bg-red-50"
                      : "border-gray-300 bg-white"
                  }`}
                  placeholder="1"
                />
              </div>
              {errors.numberOfTravelers && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.numberOfTravelers}
                </p>
              )}
              <p className="text-gray-500 text-xs mt-1">
                Each traveler will need separate coverage
              </p>
            </div>
          </div>

          {/* Information Box */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-blue-50 border border-blue-200 rounded-lg p-4"
          >
            <div className="flex items-start">
              <div className="text-blue-600 mr-3 mt-0.5">ℹ️</div>
              <div>
                <h4 className="font-semibold text-blue-800 mb-1">
                  Important Notes
                </h4>
                <ul className="text-blue-700 text-sm space-y-1">
                  <li>
                    • Coverage begins 24 hours before departure or immediately
                    if purchased within 24 hours of departure
                  </li>
                  <li>
                    • For family coverage, each member needs to be listed
                    separately
                  </li>
                  <li>
                    • Travel to high-risk destinations may require additional
                    premium
                  </li>
                  <li>
                    • Business travel may include additional coverage options
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8">
          <button
            onClick={prevStep}
            className="flex items-center px-6 py-3 text-gray-600 hover:text-gray-800 font-medium transition-colors"
          >
            <TbArrowLeft className="w-5 h-5 mr-2" />
            Back
          </button>

          <button
            onClick={handleNext}
            className="flex items-center px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl"
          >
            Continue
            <TbArrowRight className="w-5 h-5 ml-2" />
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default TravelDetailsForm;
