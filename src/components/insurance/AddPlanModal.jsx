import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  TbX,
  TbDeviceFloppy,
  TbShieldCheck,
  TbCurrencyDollar,
  TbUsers,
  TbInfoCircle,
  TbCheck,
  TbAlertCircle,
} from "react-icons/tb";

const AddPlanModal = ({ companies, onClose, onSave }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    companyId: "",
    name: "",
    planType: "",
    insuranceType: "seniors",
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
    hasCovidCoverage: false,
    covidCoverageLimit: "",
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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="bg-primary-50 px-6 py-4 border-b border-primary-200">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <TbShieldCheck className="h-6 w-6 text-primary-600 mr-3" />
              <div>
                <h2 className="text-xl font-bold text-primary-900">
                  Add New Insurance Plan
                </h2>
                <p className="text-sm text-primary-700">
                  Create a new insurance plan for your organization
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-primary-100 rounded-lg transition-colors"
            >
              <TbX className="h-5 w-5 text-primary-600" />
            </button>
          </div>
        </div>

        {/* Success Message */}
        {success && (
          <div className="bg-green-50 border-b border-green-200 p-4">
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
          <div className="bg-red-50 border-b border-red-200 p-4">
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
        <div className="overflow-y-auto max-h-[calc(90vh-140px)]">
          <form onSubmit={handleSubmit} className="p-6">
            {/* Basic Information */}
            <div className="mb-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <TbInfoCircle className="mr-2 h-5 w-5 text-primary-600" />
                Basic Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Insurance Company */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Insurance Company *
                  </label>
                  <select
                    value={formData.companyId}
                    onChange={(e) =>
                      handleInputChange("companyId", e.target.value)
                    }
                    required
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
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
                    Plan Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    required
                    placeholder="e.g., Senior Citizen Health Plan"
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>

                {/* Plan Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Plan Type *
                  </label>
                  <select
                    value={formData.planType}
                    onChange={(e) =>
                      handleInputChange("planType", e.target.value)
                    }
                    required
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="">Select plan type</option>
                    <option value="Bronze">Bronze</option>
                    <option value="Silver">Silver</option>
                    <option value="Gold">Gold</option>
                    <option value="Platinum">Platinum</option>
                    <option value="Diamond">Diamond</option>
                  </select>
                </div>

                {/* Insurance Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Insurance Type *
                  </label>
                  <select
                    value={formData.insuranceType}
                    onChange={(e) =>
                      handleInputChange("insuranceType", e.target.value)
                    }
                    required
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="seniors">Seniors</option>
                    <option value="family">Family</option>
                    <option value="individual">Individual</option>
                    <option value="personal-accident">Personal Accident</option>
                    <option value="travel">Travel</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Age Eligibility */}
            <div className="mb-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <TbUsers className="mr-2 h-5 w-5 text-primary-600" />
                Age Eligibility
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Minimum Age *
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
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Maximum Age *
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
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
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
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>
            </div>

            {/* Coverage Limits */}
            <div className="mb-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <TbShieldCheck className="mr-2 h-5 w-5 text-primary-600" />
                Coverage Limits
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Inpatient Coverage Limit (KES) *
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
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Outpatient Coverage Limit (KES) *
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
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
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
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
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
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>
            </div>

            {/* Additional Benefits */}
            <div className="mb-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Additional Benefits
              </h3>

              {/* Dental Coverage */}
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
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
                    className="ml-2 text-sm font-medium text-gray-900"
                  >
                    Dental Coverage
                  </label>
                </div>

                {formData.hasDental && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
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
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
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
                        className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
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
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <div className="flex items-center mb-3">
                  <input
                    type="checkbox"
                    id="hasOptical"
                    checked={formData.hasOptical}
                    onChange={(e) =>
                      handleInputChange("hasOptical", e.target.checked)
                    }
                    className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                  />
                  <label
                    htmlFor="hasOptical"
                    className="ml-2 text-sm font-medium text-gray-900"
                  >
                    Optical Coverage
                  </label>
                </div>

                {formData.hasOptical && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
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
                          handleInputChange("opticalPremium", e.target.value)
                        }
                        min="0"
                        placeholder="5000"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
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
                        className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
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
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <div className="flex items-center mb-3">
                  <input
                    type="checkbox"
                    id="hasMaternity"
                    checked={formData.hasMaternity}
                    onChange={(e) =>
                      handleInputChange("hasMaternity", e.target.checked)
                    }
                    className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                  />
                  <label
                    htmlFor="hasMaternity"
                    className="ml-2 text-sm font-medium text-gray-900"
                  >
                    Maternity Coverage
                  </label>
                </div>

                {formData.hasMaternity && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                        min="0"
                        placeholder="200000"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
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
                          handleInputChange("maternityPremium", e.target.value)
                        }
                        min="0"
                        placeholder="25000"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* COVID Coverage */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <input
                    type="checkbox"
                    id="hasCovidCoverage"
                    checked={formData.hasCovidCoverage}
                    onChange={(e) =>
                      handleInputChange("hasCovidCoverage", e.target.checked)
                    }
                    className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                  />
                  <label
                    htmlFor="hasCovidCoverage"
                    className="ml-2 text-sm font-medium text-gray-900"
                  >
                    COVID-19 Coverage
                  </label>
                </div>

                {formData.hasCovidCoverage && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Coverage Limit (KES)
                    </label>
                    <input
                      type="number"
                      value={formData.covidCoverageLimit}
                      onChange={(e) =>
                        handleInputChange("covidCoverageLimit", e.target.value)
                      }
                      min="0"
                      placeholder="100000"
                      className="w-full max-w-xs px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Premium Information */}
            <div className="mb-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <TbCurrencyDollar className="mr-2 h-5 w-5 text-primary-600" />
                Premium Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Premium Structure
                  </label>
                  <select
                    value={formData.premiumStructure}
                    onChange={(e) =>
                      handleInputChange("premiumStructure", e.target.value)
                    }
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
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
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
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
                        handleInputChange("premiumsByAgeRange", e.target.value)
                      }
                      rows={3}
                      placeholder='{"65-69": 57952, "70-74": 68341, "75+": 78729}'
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Other Settings */}
            <div className="mb-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Other Settings
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Geographical Coverage
                  </label>
                  <input
                    type="text"
                    value={formData.geographicalCoverage}
                    onChange={(e) =>
                      handleInputChange("geographicalCoverage", e.target.value)
                    }
                    placeholder="e.g., Kenya, East Africa"
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>

                <div className="flex items-center pt-8">
                  <input
                    type="checkbox"
                    id="isNhifApplicable"
                    checked={formData.isNhifApplicable}
                    onChange={(e) =>
                      handleInputChange("isNhifApplicable", e.target.checked)
                    }
                    className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                  />
                  <label
                    htmlFor="isNhifApplicable"
                    className="ml-2 text-sm font-medium text-gray-900"
                  >
                    NHIF Benefits Applicable
                  </label>
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 focus:ring-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
            >
              {loading ? (
                <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              ) : (
                <TbDeviceFloppy className="mr-2 h-4 w-4" />
              )}
              {loading ? "Creating..." : "Create Plan"}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AddPlanModal;
