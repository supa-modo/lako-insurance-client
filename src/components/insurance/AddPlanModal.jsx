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
} from "react-icons/tb";
import { PiTooth } from "react-icons/pi";

const AddPlanModal = ({ companies, onClose, onSave }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    companyId: "",
    name: "",
    planType: "",
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
      const response = await fetch("/api/public/insurance-plans", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(true);
        setTimeout(() => {
          onSave();
          onClose();
        }, 1500);
      } else {
        setError(data.message || "Failed to create plan");
      }
    } catch (err) {
      setError("Failed to create plan");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const planTypeOptions = [
    {
      value: "Bronze",
      label: "Bronze Plan",
      color: "text-orange-600 bg-orange-50 border-orange-200",
      icon: <TbShieldCheck className="w-5 h-5" />,
    },
    {
      value: "Silver",
      label: "Silver Plan",
      color: "text-gray-600 bg-gray-50 border-gray-200",
      icon: <TbShieldCheck className="w-5 h-5" />,
    },
    {
      value: "Gold",
      label: "Gold Plan",
      color: "text-yellow-600 bg-yellow-50 border-yellow-200",
      icon: <TbShieldCheck className="w-5 h-5" />,
    },
    {
      value: "Platinum",
      label: "Platinum Plan",
      color: "text-purple-600 bg-purple-50 border-purple-200",
      icon: <TbShieldCheck className="w-5 h-5" />,
    },
    {
      value: "Diamond",
      label: "Diamond Plan",
      color: "text-blue-600 bg-blue-50 border-blue-200",
      icon: <TbShieldCheck className="w-5 h-5" />,
    },
  ];

  const insuranceTypeOptions = [
    {
      value: "seniors",
      label: "Seniors Insurance",
      description: "For individuals aged 55+",
      icon: <TbUsers className="w-5 h-5" />,
    },
    {
      value: "family",
      label: "Family Insurance",
      description: "Coverage for entire family",
      icon: <TbHeartRateMonitor className="w-5 h-5" />,
    },
    {
      value: "individual",
      label: "Individual Insurance",
      description: "Personal coverage",
      icon: <TbStethoscope className="w-5 h-5" />,
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
  ];

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-[1.5px] flex items-start justify-end z-50 p-3 font-outfit"
      onClick={handleBackdropClick}
    >
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="w-[800px] h-[calc(100vh-24px)] bg-white shadow-2xl overflow-hidden rounded-xl border border-gray-200"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-6 py-4 relative">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-white/10 blur-xl"></div>
            <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-white/10 blur-xl"></div>
          </div>
          <div className="relative flex justify-between items-center z-10">
            <div className="flex items-center">
              <TbShieldCheck className="h-6 w-6 text-white mr-3" />
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
          <div className="bg-green-50 border-b border-green-200 px-6 py-3">
            <div className="flex items-center">
              <TbCheck className="h-5 w-5 text-green-500 mr-2" />
              <p className="text-green-800">
                Insurance plan created successfully!
              </p>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border-b border-red-200 px-6 py-3">
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
          <div className="overflow-y-auto flex-1 px-3 md:px-6 py-5">
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
                    <select
                      value={formData.companyId}
                      onChange={(e) =>
                        handleInputChange("companyId", e.target.value)
                      }
                      required
                      className="w-full font-lexend text-[0.93rem] bg-neutral-100 text-gray-600 font-medium rounded-md border border-neutral-300 px-4 py-2.5 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors"
                    >
                      <option value="">Select a company</option>
                      {companies.map((company) => (
                        <option key={company.id} value={company.id}>
                          {company.name}
                        </option>
                      ))}
                    </select>
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
                      placeholder="e.g., Senior Citizen Health Plan"
                      className="w-full font-lexend text-[0.93rem] bg-neutral-100 text-neutral-900 px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-1 focus:outline-none focus:ring-purple-500 focus:border-purple-500 transition-colors"
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
                      className="w-full font-lexend text-[0.93rem] bg-neutral-100 text-neutral-900 px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-1 focus:outline-none focus:ring-purple-500 focus:border-purple-500 transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Plan Type Selection */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="font-semibold text-neutral-700 mb-4 flex items-center">
                  <TbShieldCheck size={20} className="mr-2 text-primary-600" />
                  Plan Type
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {planTypeOptions.map((option) => (
                    <label
                      key={option.value}
                      className={`relative flex items-center p-4 border rounded-lg cursor-pointer transition-all hover:bg-gray-50 ${
                        formData.planType === option.value
                          ? option.color
                          : "border-gray-200 bg-white"
                      }`}
                    >
                      <input
                        type="radio"
                        name="planType"
                        value={option.value}
                        checked={formData.planType === option.value}
                        onChange={(e) =>
                          handleInputChange("planType", e.target.value)
                        }
                        className="sr-only"
                      />
                      <div
                        className={`flex items-center justify-center w-5 h-5 border-2 rounded-full mr-3 ${
                          formData.planType === option.value
                            ? "border-current bg-current"
                            : "border-gray-300"
                        }`}
                      >
                        {formData.planType === option.value && (
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        )}
                      </div>
                      <div className="flex items-center">
                        {option.icon}
                        <span className="font-medium ml-2">{option.label}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Insurance Type Selection */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="font-semibold text-neutral-700 mb-4 flex items-center">
                  <TbUsers size={20} className="mr-2 text-primary-600" />
                  Insurance Type
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  {insuranceTypeOptions.map((option) => (
                    <label
                      key={option.value}
                      className={`relative flex items-center p-4 border rounded-lg cursor-pointer transition-all hover:bg-gray-50 ${
                        formData.insuranceType === option.value
                          ? "text-primary-600 bg-primary-50 border-primary-200"
                          : "border-gray-200 bg-white"
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
                        className={`flex items-center justify-center w-5 h-5 border-2 rounded-full mr-4 ${
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
                  <TbUsers size={20} className="mr-2 text-primary-600" />
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
                      className="w-full font-lexend text-[0.93rem] bg-neutral-100 text-neutral-900 px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-1 focus:outline-none focus:ring-purple-500 focus:border-purple-500 transition-colors"
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
                      className="w-full font-lexend text-[0.93rem] bg-neutral-100 text-neutral-900 px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-1 focus:outline-none focus:ring-purple-500 focus:border-purple-500 transition-colors"
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
                      className="w-full font-lexend text-[0.93rem] bg-neutral-100 text-neutral-900 px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-1 focus:outline-none focus:ring-purple-500 focus:border-purple-500 transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Coverage Limits */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="font-semibold text-neutral-700 mb-4 flex items-center">
                  <TbShieldCheck size={20} className="mr-2 text-primary-600" />
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
                      className="w-full font-lexend text-[0.93rem] bg-neutral-100 text-neutral-900 px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-1 focus:outline-none focus:ring-purple-500 focus:border-purple-500 transition-colors"
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
                      className="w-full font-lexend text-[0.93rem] bg-neutral-100 text-neutral-900 px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-1 focus:outline-none focus:ring-purple-500 focus:border-purple-500 transition-colors"
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
                      className="w-full font-lexend text-[0.93rem] bg-neutral-100 text-neutral-900 px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-1 focus:outline-none focus:ring-purple-500 focus:border-purple-500 transition-colors"
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
                      className="w-full font-lexend text-[0.93rem] bg-neutral-100 text-neutral-900 px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-1 focus:outline-none focus:ring-purple-500 focus:border-purple-500 transition-colors"
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
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center mb-3">
                      <input
                        type="checkbox"
                        id="hasDental"
                        checked={formData.hasDental}
                        onChange={(e) =>
                          handleInputChange("hasDental", e.target.checked)
                        }
                        className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                      />
                      <label
                        htmlFor="hasDental"
                        className="ml-3 text-sm font-medium text-gray-900 flex items-center"
                      >
                        <PiTooth className="mr-2 h-5 w-5 text-primary-600" />
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
                            className="w-full font-lexend text-[0.93rem] bg-neutral-100 text-neutral-900 px-4 py-2 rounded-lg border border-gray-300 focus:ring-1 focus:outline-none focus:ring-purple-500 focus:border-purple-500 transition-colors"
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
                            className="w-full font-lexend text-[0.93rem] bg-neutral-100 text-neutral-900 px-4 py-2 rounded-lg border border-gray-300 focus:ring-1 focus:outline-none focus:ring-purple-500 focus:border-purple-500 transition-colors"
                          />
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="dentalCoveredInBase"
                            checked={formData.dentalCoveredInBase}
                            onChange={(e) =>
                              handleInputChange(
                                "dentalCoveredInBase",
                                e.target.checked
                              )
                            }
                            className="h-4 w-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                          />
                          <label
                            htmlFor="dentalCoveredInBase"
                            className="ml-2 text-sm text-gray-700"
                          >
                            Covered in base premium
                          </label>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Optical Coverage */}
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center mb-3">
                      <input
                        type="checkbox"
                        id="hasOptical"
                        checked={formData.hasOptical}
                        onChange={(e) =>
                          handleInputChange("hasOptical", e.target.checked)
                        }
                        className="h-4 w-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                      />
                      <label
                        htmlFor="hasOptical"
                        className="ml-3 text-sm font-medium text-gray-900 flex items-center"
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
                            className="w-full font-lexend text-[0.93rem] bg-neutral-100 text-neutral-900 px-4 py-2 rounded-lg border border-gray-300 focus:ring-1 focus:outline-none focus:ring-purple-500 focus:border-purple-500 transition-colors"
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
                            className="w-full font-lexend text-[0.93rem] bg-neutral-100 text-neutral-900 px-4 py-2 rounded-lg border border-gray-300 focus:ring-1 focus:outline-none focus:ring-purple-500 focus:border-purple-500 transition-colors"
                          />
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="opticalCoveredInBase"
                            checked={formData.opticalCoveredInBase}
                            onChange={(e) =>
                              handleInputChange(
                                "opticalCoveredInBase",
                                e.target.checked
                              )
                            }
                            className="h-4 w-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                          />
                          <label
                            htmlFor="opticalCoveredInBase"
                            className="ml-2 text-sm text-gray-700"
                          >
                            Covered in base premium
                          </label>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Maternity Coverage */}
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center mb-3">
                      <input
                        type="checkbox"
                        id="hasMaternity"
                        checked={formData.hasMaternity}
                        onChange={(e) =>
                          handleInputChange("hasMaternity", e.target.checked)
                        }
                        className="h-4 w-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                      />
                      <label
                        htmlFor="hasMaternity"
                        className="ml-3 text-sm font-medium text-gray-900 flex items-center"
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
                            className="w-full font-lexend text-[0.93rem] bg-neutral-100 text-neutral-900 px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-1 focus:outline-none focus:ring-purple-500 focus:border-purple-500 transition-colors"
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
                            className="w-full font-lexend text-[0.93rem] bg-neutral-100 text-neutral-900 px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-1 focus:outline-none focus:ring-purple-500 focus:border-purple-500 transition-colors"
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
                  <TbCurrencyDollar
                    size={20}
                    className="mr-2 text-primary-600"
                  />
                  Premium Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Premium Structure
                    </label>
                    <select
                      value={formData.premiumStructure}
                      onChange={(e) =>
                        handleInputChange("premiumStructure", e.target.value)
                      }
                      className="w-full font-lexend text-[0.93rem] bg-neutral-100 text-neutral-900 px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-1 focus:outline-none focus:ring-purple-500 focus:border-purple-500 transition-colors"
                    >
                      <option value="fixed">Fixed Premium</option>
                      <option value="age-based">Age-Based Premium</option>
                    </select>
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
                        className="w-full font-lexend text-[0.93rem] bg-neutral-100 text-neutral-900 px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-1 focus:outline-none focus:ring-purple-500 focus:border-purple-500 transition-colors"
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
                        className="w-full font-lexend text-[0.93rem] bg-neutral-100 text-neutral-900 px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-1 focus:outline-none focus:ring-purple-500 focus:border-purple-500 transition-colors"
                      />
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
                  <input
                    type="checkbox"
                    id="isNhifApplicable"
                    checked={formData.isNhifApplicable}
                    onChange={(e) =>
                      handleInputChange("isNhifApplicable", e.target.checked)
                    }
                    className="h-4 w-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                  />
                  <label
                    htmlFor="isNhifApplicable"
                    className="ml-3 text-sm font-medium text-gray-900"
                  >
                    NHIF Benefits Applicable
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
    </div>
  );
};

export default AddPlanModal;
