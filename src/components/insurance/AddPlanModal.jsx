import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  TbX,
  TbShieldCheck,
  TbCurrencyDollar,
  TbUsers,
  TbInfoCircle,
  TbCheck,
  TbAlertCircle,
  TbBuildingBank,
  TbStethoscope,
  TbHeartRateMonitor,
  TbAmbulance,
  TbVirus,
  TbEyeglass2,
  TbDental,
  TbBabyCarriage,
  TbShieldHalfFilled,
  TbCoins,
  TbShieldCheckFilled,
  TbChevronDown,
  TbHexagonPlus2,
} from "react-icons/tb";
import { PiCaretDownDuotone, PiTooth, PiUsersDuotone } from "react-icons/pi";
import insuranceService from "../../services/insuranceService";
import { FaCarCrash } from "react-icons/fa";

const AddPlanModal = ({ companies, onClose, onSave }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    companyId: "",
    name: "",
    planType: "default",
    coverType: "",
    insuranceType: "",
    description: "",
    eligibilityAgeMin: "",
    eligibilityAgeMax: "",
    inpatientCoverageLimit: "",
    outpatientCoverageLimit: "",
    hasDental: false,
    dentalCoverageLimit: "",
    dentalPremium: "",
    dentalCoveredInBase: false,
    hasOptical: false,
    opticalCoverageLimit: "",
    opticalPremium: "",
    opticalCoveredInBase: false,
    hasMaternity: false,
    maternityCoverageLimit: "",
    maternityPremium: "",
    lastExpenseCover: "",
    bedLimit: "",
    isNhifApplicable: false,
    renewalAgeLimit: "",
    geographicalCoverage: "",
    premiumStructure: "fixed",
    annualPremium: "",
    premiumsByAgeRange: "",
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Validate required fields
      if (!formData.companyId || !formData.name || !formData.planType) {
        setError("Please fill in all required fields");
        return;
      }

      // Process the form data
      const processedData = {
        ...formData,
        eligibilityAgeMin: parseInt(formData.eligibilityAgeMin) || 0,
        eligibilityAgeMax: parseInt(formData.eligibilityAgeMax) || 100,
        inpatientCoverageLimit:
          parseFloat(formData.inpatientCoverageLimit) || 0,
        outpatientCoverageLimit:
          parseFloat(formData.outpatientCoverageLimit) || 0,
        lastExpenseCover: formData.lastExpenseCover
          ? parseFloat(formData.lastExpenseCover)
          : null,
        renewalAgeLimit: formData.renewalAgeLimit
          ? parseInt(formData.renewalAgeLimit)
          : null,
        annualPremium:
          formData.premiumStructure === "fixed" && formData.annualPremium
            ? parseFloat(formData.annualPremium)
            : null,
        premiumsByAgeRange:
          formData.premiumStructure === "age-based" &&
          formData.premiumsByAgeRange
            ? formData.premiumsByAgeRange
            : null,
        dentalCoverageLimit:
          formData.hasDental && formData.dentalCoverageLimit
            ? parseFloat(formData.dentalCoverageLimit)
            : null,
        dentalPremium:
          formData.hasDental && formData.dentalPremium
            ? parseFloat(formData.dentalPremium)
            : null,
        opticalCoverageLimit:
          formData.hasOptical && formData.opticalCoverageLimit
            ? parseFloat(formData.opticalCoverageLimit)
            : null,
        opticalPremium:
          formData.hasOptical && formData.opticalPremium
            ? parseFloat(formData.opticalPremium)
            : null,
        maternityCoverageLimit:
          formData.hasMaternity && formData.maternityCoverageLimit
            ? parseFloat(formData.maternityCoverageLimit)
            : null,
        maternityPremium:
          formData.hasMaternity && formData.maternityPremium
            ? parseFloat(formData.maternityPremium)
            : null,
      };

      const response = await insuranceService.createPlan(processedData);

      if (response && response.success) {
        setSuccess(true);
        setTimeout(() => {
          onSave();
          onClose();
        }, 1500);
      } else {
        setError(response?.message || "Failed to create plan");
      }
    } catch (err) {
      setError("Failed to create plan. Please try again.");
      console.error("Error creating plan:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const coverTypeOptions = [
    {
      value: "student",
      label: "Student Cover",
      color: "text-pink-600 bg-pink-50 border-pink-300",
      icon: <TbShieldCheck className="w-5 h-5" />,
    },
    {
      value: "individual",
      label: "Individual Cover",
      color: "text-indigo-600 bg-indigo-50 border-indigo-300",
      icon: <TbShieldCheck className="w-5 h-5" />,
    },
    {
      value: "family",
      label: "Family Cover",
      color: "text-secondary-600 bg-secondary-50 border-secondary-300",
      icon: <TbShieldCheck className="w-5 h-5" />,
    },
    {
      value: "group",
      label: "Group Cover",
      color: "text-green-600 bg-green-50 border-green-300",
      icon: <TbShieldCheck className="w-5 h-5" />,
    },
  ];

  const insuranceTypeOptions = [
    {
      value: "seniors",
      label: "Seniors Insurance",
      description: "Medical coverage for individuals aged 55+",
      icon: <PiUsersDuotone className="w-5 h-5" />,
    },
    {
      value: "health",
      label: "Health Insurance",
      description: "Medical coverage for individuals and families",
      icon: <TbHeartRateMonitor className="w-5 h-5" />,
    },
    {
      value: "personal-accident",
      label: "Personal Accident",
      description: "Accident protection",
      icon: <TbAmbulance className="w-5 h-5" />,
    },
    {
      value: "travel",
      label: "Travel Insurance",
      description: "Travel protection",
      icon: <TbBuildingBank className="w-5 h-5" />,
    },
    {
      value: "motor",
      label: "Motor Insurance",
      description: "Motor vehicle protection",
      icon: <FaCarCrash className="w-5 h-5" />,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="fixed inset-0 bg-black/50 backdrop-blur-[1.5px] flex items-start justify-end z-50 p-3 font-lexend"
      onClick={handleBackdropClick}
    >
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className="w-[730px] h-[calc(100vh-24px)] bg-white shadow-2xl overflow-hidden rounded-xl border border-gray-200"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-6 py-4 relative">
          <div className="relative flex justify-between items-center z-10">
            <div className="flex items-center">
              <TbHexagonPlus2 size={40} className=" text-white mr-3" />
              <div>
                <h2 className="text-white font-semibold text-lg font-lexend">
                  Add New Insurance Plan
                </h2>
                <p className="text-white/80 text-sm">
                  Create a comprehensive insurance plan
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white transition-colors rounded-full p-1 hover:bg-white/10"
            >
              <TbX className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Success Message */}
        {success && (
          <div className="bg-green-200 border-b border-green-400 px-6 py-3">
            <div className="flex items-center">
              <TbCheck className="h-5 w-5 text-green-600 mr-2" />
              <p className="text-green-800">
                Insurance plan created successfully!
              </p>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-200 border-b border-red-400 px-6 py-3">
            <div className="flex items-center">
              <TbAlertCircle className="h-5 w-5 text-red-500 mr-2" />
              <p className="text-red-800">{error}</p>
              <button
                onClick={() => setError(null)}
                className="ml-auto text-red-500 hover:text-red-700"
              >
                <TbX className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}

        {/* Form Content */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col h-[calc(100vh-120px)] md:h-[calc(100vh-100px)]"
        >
          <div className="overflow-y-auto flex-1 px-6 py-5">
            <div className="space-y-6">
              {/* Basic Information */}
              <div>
                <h3 className="font-semibold text-neutral-700 mb-4 flex items-center">
                  <TbInfoCircle size={20} className="mr-2 text-primary-600" />
                  Basic Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Insurance Company */}
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Insurance Company <span className="text-red-500">*</span>
                    </label>
                    <div className="relative flex items-center">
                      <select
                        value={formData.companyId}
                        onChange={(e) =>
                          handleInputChange("companyId", e.target.value)
                        }
                        required
                        className="w-full font-lexend text-[0.93rem] bg-neutral-100 text-gray-600 font-medium rounded-lg border border-gray-300 px-4 py-2.5 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors"
                      >
                        <option value="">Select a company</option>
                        {companies.map((company) => (
                          <option key={company.id} value={company.id}>
                            {company.name}
                          </option>
                        ))}
                      </select>

                      <PiCaretDownDuotone
                        size={20}
                        className="absolute right-4 text-gray-600 pointer-events-none"
                      />
                    </div>
                  </div>

                  {/* Plan Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Plan Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                      required
                      placeholder="e.g., Bima Bora AfyaCare"
                      className="w-full font-lexend text-[0.92rem] bg-neutral-100 text-neutral-900l px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-1 focus:outline-none focus:ring-primary-500 focus:border-primary-500 transition-colors"
                    />
                  </div>

                  {/* Geographical Coverage */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Geographical Coverage
                    </label>
                    <input
                      type="text"
                      value={formData.geographicalCoverage}
                      onChange={(e) =>
                        handleInputChange(
                          "geographicalCoverage",
                          e.target.value
                        )
                      }
                      placeholder="e.g., Kenya, East Africa"
                      className="w-full font-lexend text-[0.93rem] bg-neutral-100 text-neutral-900 px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-1 focus:outline-none focus:ring-primary-500 focus:border-primary-500 transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Cover Type Selection */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="font-semibold text-neutral-700 mb-4 flex items-center">
                  <PiUsersDuotone size={20} className="mr-2 text-primary-600" />
                  Cover Type
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-600">
                  {coverTypeOptions.map((option) => (
                    <label
                      key={option.value}
                      className={`relative flex items-center p-4 border-2 rounded-[0.7rem] cursor-pointer transition-all hover:bg-gray-50 ${
                        formData.coverType === option.value
                          ? option.color + " border-current"
                          : "border-gray-200 bg-white hover:border-gray-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="coverType"
                        value={option.value}
                        checked={formData.coverType === option.value}
                        onChange={(e) =>
                          handleInputChange("coverType", e.target.value)
                        }
                        className="sr-only"
                      />
                      <div
                        className={`flex items-center justify-center w-5 h-5 border-2 rounded-full mr-3 transition-colors ${
                          formData.coverType === option.value
                            ? "border-current bg-current"
                            : "border-gray-300"
                        }`}
                      >
                        {formData.coverType === option.value && (
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        )}
                      </div>
                      <div className="flex items-center">
                        <span className="font-medium text-[0.95rem] ml-2">
                          {option.label}
                        </span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Insurance Type Selection */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="font-semibold text-neutral-700 mb-4 flex items-center">
                  <TbShieldHalfFilled
                    size={20}
                    className="mr-2 text-primary-600"
                  />
                  Insurance Type
                </h3>
                <div className="grid grid-cols-1 gap-3 text-gray-600">
                  {insuranceTypeOptions.map((option) => (
                    <label
                      key={option.value}
                      className={`relative flex items-center p-4 border-2 rounded-[0.7rem] cursor-pointer transition-all hover:bg-gray-50 ${
                        formData.insuranceType === option.value
                          ? "text-primary-600 bg-primary-50 border-primary-200"
                          : "border-gray-200 bg-white hover:border-gray-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="insuranceType"
                        value={option.value}
                        checked={formData.insuranceType === option.value}
                        onChange={(e) =>
                          handleInputChange("insuranceType", e.target.value)
                        }
                        className="sr-only"
                      />
                      <div
                        className={`flex items-center justify-center w-5 h-5 border-2 rounded-full mr-4 transition-colors ${
                          formData.insuranceType === option.value
                            ? "border-current bg-current"
                            : "border-gray-300"
                        }`}
                      >
                        {formData.insuranceType === option.value && (
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        )}
                      </div>
                      <div className="flex items-center mr-4">
                        {option.icon}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{option.label}</div>
                        <div className="text-sm text-gray-500">
                          {option.description}
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Age Eligibility */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="font-semibold text-neutral-700 mb-4 flex items-center">
                  <PiUsersDuotone size={20} className="mr-2 text-primary-600" />
                  Age Eligibility
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Minimum Age <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      value={formData.eligibilityAgeMin}
                      onChange={(e) =>
                        handleInputChange("eligibilityAgeMin", e.target.value)
                      }
                      required
                      min="0"
                      max="120"
                      placeholder="0"
                      className="w-full font-lexend text-[0.93rem] bg-neutral-100 text-neutral-900 px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-1 focus:outline-none focus:ring-primary-500 focus:border-primary-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Maximum Age <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      value={formData.eligibilityAgeMax}
                      onChange={(e) =>
                        handleInputChange("eligibilityAgeMax", e.target.value)
                      }
                      required
                      min="0"
                      max="120"
                      placeholder="100"
                      className="w-full font-lexend text-[0.93rem] bg-neutral-100 text-neutral-900 px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-1 focus:outline-none focus:ring-primary-500 focus:border-primary-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Renewal Age Limit
                    </label>
                    <input
                      type="number"
                      value={formData.renewalAgeLimit}
                      onChange={(e) =>
                        handleInputChange("renewalAgeLimit", e.target.value)
                      }
                      min="0"
                      max="120"
                      placeholder="Optional"
                      className="w-full font-lexend text-[0.93rem] bg-neutral-100 text-neutral-900 px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-1 focus:outline-none focus:ring-primary-500 focus:border-primary-500 transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Coverage Limits */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="font-semibold text-neutral-700 mb-4 flex items-center">
                  <TbShieldCheckFilled
                    size={20}
                    className="mr-2 text-primary-600"
                  />
                  Coverage Limits
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Inpatient Coverage Limit (KES){" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      value={formData.inpatientCoverageLimit}
                      onChange={(e) =>
                        handleInputChange(
                          "inpatientCoverageLimit",
                          e.target.value
                        )
                      }
                      required
                      min="0"
                      placeholder="1000000"
                      className="w-full font-lexend text-[0.93rem] bg-neutral-100 text-neutral-900 px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-1 focus:outline-none focus:ring-primary-500 focus:border-primary-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Outpatient Coverage Limit (KES){" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      value={formData.outpatientCoverageLimit}
                      onChange={(e) =>
                        handleInputChange(
                          "outpatientCoverageLimit",
                          e.target.value
                        )
                      }
                      required
                      min="0"
                      placeholder="500000"
                      className="w-full font-lexend text-[0.93rem] bg-neutral-100 text-neutral-900 px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-1 focus:outline-none focus:ring-primary-500 focus:border-primary-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Expense Cover (KES)
                    </label>
                    <input
                      type="number"
                      value={formData.lastExpenseCover}
                      onChange={(e) =>
                        handleInputChange("lastExpenseCover", e.target.value)
                      }
                      min="0"
                      placeholder="200000"
                      className="w-full font-lexend text-[0.93rem] bg-neutral-100 text-neutral-900 px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-1 focus:outline-none focus:ring-primary-500 focus:border-primary-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bed Limit
                    </label>
                    <input
                      type="text"
                      value={formData.bedLimit}
                      onChange={(e) =>
                        handleInputChange("bedLimit", e.target.value)
                      }
                      placeholder="e.g., Semi-private ward"
                      className="w-full font-lexend text-[0.93rem] bg-neutral-100 text-neutral-900 px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-1 focus:outline-none focus:ring-primary-500 focus:border-primary-500 transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Additional Benefits */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="font-semibold text-neutral-700 mb-4">
                  Additional Benefits
                </h3>

                <div className="space-y-4">
                  {/* Dental Coverage */}
                  <div className="border border-gray-200 rounded-[0.8rem] p-4">
                    <div className="flex items-center mb-3">
                      <div
                        className={`relative flex items-center justify-center h-[1.3rem] w-[1.3rem] rounded-[0.3rem] border-2 focus:outline-none ${
                          formData.hasDental === true
                            ? "border-primary-500 bg-primary-100"
                            : "border-gray-400"
                        }`}
                      >
                        <input
                          type="checkbox"
                          id="hasDental"
                          checked={formData.hasDental}
                          onChange={(e) =>
                            handleInputChange("hasDental", e.target.checked)
                          }
                          className="absolute opacity-0 h-full w-full cursor-pointer"
                        />
                        {formData.hasDental && (
                          <div className="">
                            <TbCheck className="text-primary-600" />
                          </div>
                        )}
                      </div>

                      <label
                        htmlFor="hasDental"
                        className="ml-3 text-sm lg:text-[0.95rem] font-medium text-gray-900 flex items-center cursor-pointer"
                      >
                        <PiTooth size={22} className="mr-2  text-primary-600" />
                        Dental Coverage
                      </label>
                    </div>
                    {formData.hasDental && (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Coverage Limit (KES)
                          </label>
                          <input
                            type="number"
                            value={formData.dentalCoverageLimit}
                            onChange={(e) =>
                              handleInputChange(
                                "dentalCoverageLimit",
                                e.target.value
                              )
                            }
                            min="0"
                            placeholder="50000"
                            className="w-full font-lexend text-[0.93rem] bg-neutral-100 text-neutral-900 px-4 py-2 rounded-lg border border-gray-300 focus:ring-1 focus:outline-none focus:ring-primary-500 focus:border-primary-500 transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Additional Premium (KES)
                          </label>
                          <input
                            type="number"
                            value={formData.dentalPremium}
                            onChange={(e) =>
                              handleInputChange("dentalPremium", e.target.value)
                            }
                            min="0"
                            placeholder="10000"
                            className="w-full font-lexend text-[0.93rem] bg-neutral-100 text-neutral-900 px-4 py-2 rounded-lg border border-gray-300 focus:ring-1 focus:outline-none focus:ring-primary-500 focus:border-primary-500 transition-colors"
                          />
                        </div>
                        <div className="flex items-center">
                          <div
                            className={`relative flex items-center justify-center h-6 w-[3.3rem] rounded-full border-2 transition-all duration-200 cursor-pointer ${
                              formData.dentalCoveredInBase
                                ? "bg-primary-500 border-primary-500"
                                : "bg-gray-200 border-gray-300"
                            }`}
                            onClick={() =>
                              handleInputChange(
                                "dentalCoveredInBase",
                                !formData.dentalCoveredInBase
                              )
                            }
                          >
                            <div
                              className={`absolute left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200 ${
                                formData.dentalCoveredInBase
                                  ? "transform translate-x-5"
                                  : ""
                              }`}
                            />
                            {formData.dentalCoveredInBase ? (
                              <TbCheck
                                size={13}
                                className="absolute left-1  text-white z-10"
                              />
                            ) : (
                              <TbX
                                size={13}
                                className="absolute right-1 text-gray-400 z-10"
                              />
                            )}
                          </div>
                          <label
                            className="ml-3 text-sm text-gray-700 cursor-pointer font-medium"
                            onClick={() =>
                              handleInputChange(
                                "dentalCoveredInBase",
                                !formData.dentalCoveredInBase
                              )
                            }
                          >
                            Covered in base premium
                          </label>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Optical Coverage */}
                  <div className="border border-gray-200 rounded-[0.8rem] p-4">
                    <div className="flex items-center mb-3">
                      <div
                        className={`relative flex items-center justify-center h-[1.3rem] w-[1.3rem] rounded-[0.3rem] border-2 focus:outline-none ${
                          formData.hasOptical === true
                            ? "border-primary-500 bg-primary-100"
                            : "border-gray-400"
                        }`}
                      >
                        <input
                          type="checkbox"
                          id="hasOptical"
                          checked={formData.hasOptical}
                          onChange={(e) =>
                            handleInputChange("hasOptical", e.target.checked)
                          }
                          className="absolute opacity-0 h-full w-full cursor-pointer"
                        />
                        {formData.hasOptical && (
                          <div className="">
                            <TbCheck className="text-primary-600" />
                          </div>
                        )}
                      </div>
                      <label
                        htmlFor="hasOptical"
                        className="ml-3 text-sm font-medium text-gray-900 flex items-center cursor-pointer"
                      >
                        <TbEyeglass2 className="mr-2 h-5 w-5 text-primary-600" />
                        Optical Coverage
                      </label>
                    </div>
                    {formData.hasOptical && (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Coverage Limit (KES)
                          </label>
                          <input
                            type="number"
                            value={formData.opticalCoverageLimit}
                            onChange={(e) =>
                              handleInputChange(
                                "opticalCoverageLimit",
                                e.target.value
                              )
                            }
                            min="0"
                            placeholder="30000"
                            className="w-full font-lexend text-[0.93rem] bg-neutral-100 text-neutral-900 px-4 py-2 rounded-lg border border-gray-300 focus:ring-1 focus:outline-none focus:ring-primary-500 focus:border-primary-500 transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Additional Premium (KES)
                          </label>
                          <input
                            type="number"
                            value={formData.opticalPremium}
                            onChange={(e) =>
                              handleInputChange(
                                "opticalPremium",
                                e.target.value
                              )
                            }
                            min="0"
                            placeholder="5000"
                            className="w-full font-lexend text-[0.93rem] bg-neutral-100 text-neutral-900 px-4 py-2 rounded-lg border border-gray-300 focus:ring-1 focus:outline-none focus:ring-primary-500 focus:border-primary-500 transition-colors"
                          />
                        </div>
                        <div className="flex items-center">
                          <div
                            className={`relative flex items-center justify-center h-6 w-[3.3rem] rounded-full border-2 transition-all duration-200 cursor-pointer ${
                              formData.opticalCoveredInBase
                                ? "bg-primary-500 border-primary-500"
                                : "bg-gray-200 border-gray-300"
                            }`}
                            onClick={() =>
                              handleInputChange(
                                "opticalCoveredInBase",
                                !formData.opticalCoveredInBase
                              )
                            }
                          >
                            <div
                              className={`absolute left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200 ${
                                formData.opticalCoveredInBase
                                  ? "transform translate-x-5"
                                  : ""
                              }`}
                            />
                            {formData.opticalCoveredInBase ? (
                              <TbCheck
                                size={13}
                                className="absolute left-1  text-white z-10"
                              />
                            ) : (
                              <TbX
                                size={13}
                                className="absolute right-[0.28rem]  text-gray-400 z-10"
                              />
                            )}
                          </div>
                          <label
                            className="ml-3 text-sm text-gray-700 cursor-pointer font-medium"
                            onClick={() =>
                              handleInputChange(
                                "opticalCoveredInBase",
                                !formData.opticalCoveredInBase
                              )
                            }
                          >
                            Covered in base premium
                          </label>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Maternity Coverage */}
                  <div className="border border-gray-200 rounded-[0.8rem] p-4">
                    <div className="flex items-center mb-3">
                      <div
                        className={`relative flex items-center justify-center h-[1.3rem] w-[1.3rem] rounded-[0.3rem] border-2 focus:outline-none ${
                          formData.hasMaternity === true
                            ? "border-primary-500 bg-primary-100"
                            : "border-gray-400"
                        }`}
                      >
                        <input
                          type="checkbox"
                          id="hasMaternity"
                          checked={formData.hasMaternity}
                          onChange={(e) =>
                            handleInputChange("hasMaternity", e.target.checked)
                          }
                          className="absolute opacity-0 h-full w-full cursor-pointer"
                        />
                        {formData.hasMaternity && (
                          <div className="">
                            <TbCheck className="text-primary-600" />
                          </div>
                        )}
                      </div>
                      <label
                        htmlFor="hasMaternity"
                        className="ml-3 text-sm font-medium text-gray-900 flex items-center cursor-pointer"
                      >
                        <TbBabyCarriage className="mr-2 h-5 w-5 text-primary-600" />
                        Maternity Coverage
                      </label>
                    </div>
                    {formData.hasMaternity && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Coverage Limit (KES)
                          </label>
                          <input
                            type="number"
                            value={formData.maternityCoverageLimit}
                            onChange={(e) =>
                              handleInputChange(
                                "maternityCoverageLimit",
                                e.target.value
                              )
                            }
                            className="w-full font-lexend text-[0.93rem] bg-neutral-100 text-neutral-900 px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-1 focus:outline-none focus:ring-primary-500 focus:border-primary-500 transition-colors"
                            placeholder="50000"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Additional Premium (KES)
                          </label>
                          <input
                            type="number"
                            value={formData.maternityPremium}
                            onChange={(e) =>
                              handleInputChange(
                                "maternityPremium",
                                e.target.value
                              )
                            }
                            className="w-full font-lexend text-[0.93rem] bg-neutral-100 text-neutral-900 px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-1 focus:outline-none focus:ring-primary-500 focus:border-primary-500 transition-colors"
                            placeholder="5000"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Premium Information */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="font-semibold text-neutral-700 mb-4 flex items-center">
                  <TbCoins size={20} className="mr-2 text-primary-600" />
                  Premium Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Premium Structure
                    </label>
                    <div className="relative flex items-center">
                      <select
                        value={formData.premiumStructure}
                        onChange={(e) =>
                          handleInputChange("premiumStructure", e.target.value)
                        }
                        className="w-full font-lexend text-[0.93rem] bg-neutral-100 text-neutral-900 px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-1 focus:outline-none focus:ring-primary-500 focus:border-primary-500 transition-colors"
                      >
                        <option value="fixed">Fixed Premium</option>
                        <option value="age-based">Age-Based Premium</option>
                      </select>

                      <PiCaretDownDuotone
                        size={20}
                        className="absolute right-4 text-gray-600 pointer-events-none"
                      />
                    </div>
                  </div>
                  {formData.premiumStructure === "fixed" ? (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Annual Premium (KES)
                      </label>
                      <input
                        type="number"
                        value={formData.annualPremium}
                        onChange={(e) =>
                          handleInputChange("annualPremium", e.target.value)
                        }
                        min="0"
                        placeholder="50000"
                        className="w-full font-lexend text-[0.93rem] bg-neutral-100 text-neutral-900 px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-1 focus:outline-none focus:ring-primary-500 focus:border-primary-500 transition-colors"
                      />
                    </div>
                  ) : (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Age-Based Premiums (JSON)
                      </label>
                      <textarea
                        value={formData.premiumsByAgeRange}
                        onChange={(e) =>
                          handleInputChange(
                            "premiumsByAgeRange",
                            e.target.value
                          )
                        }
                        rows={3}
                        placeholder='{"65-69": 57952, "70-74": 68341, "75+": 78729}'
                        className="w-full font-lexend text-[0.93rem] bg-neutral-100 text-neutral-900 px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-1 focus:outline-none focus:ring-primary-500 focus:border-primary-500 transition-colors"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Format:{" "}
                        {`{"age-range": premium, "70-74": 68341, "75+": 78729}`}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Other Settings */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="font-semibold text-neutral-700 mb-4">
                  Additional Settings
                </h3>
                <div className="flex items-center">
                  <div
                    className={`relative flex items-center justify-center h-[1.3rem] w-[1.3rem] rounded-[0.3rem] border-2 focus:outline-none ${
                      formData.isNhifApplicable === true
                        ? "border-primary-500 bg-primary-100"
                        : "border-gray-400"
                    }`}
                  >
                    <input
                      type="checkbox"
                      id="isNhifApplicable"
                      checked={formData.isNhifApplicable}
                      onChange={(e) =>
                        handleInputChange("isNhifApplicable", e.target.checked)
                      }
                      className="absolute opacity-0 h-full w-full cursor-pointer"
                    />
                    {formData.isNhifApplicable && (
                      <div className="">
                        <TbCheck className="text-primary-600" />
                      </div>
                    )}
                  </div>
                  <label
                    htmlFor="isNhifApplicable"
                    className="ml-3 text-sm font-medium text-gray-900 cursor-pointer"
                  >
                    NHIF / SHA Benefits Applicable
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Sticky Footer */}
          <div className="border-t border-gray-200 bg-white px-6 py-4">
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center font-medium"
              >
                {loading ? (
                  <>
                    <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Creating...
                  </>
                ) : (
                  <>
                    <TbCheck className="mr-2 h-4 w-4" />
                    Create Plan
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default AddPlanModal;
