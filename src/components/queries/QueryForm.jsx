import React, { useState, useEffect } from "react";
import {
  TbX,
  TbUser,
  TbMail,
  TbPhone,
  TbCalendarTime,
  TbCurrencyDollar,
  TbShieldCheck,
  TbCheck,
  TbAlertCircle,
  TbFileDescription,
  TbClipboard,
  TbInfoCircle,
  TbStar,
  TbFiles,
} from "react-icons/tb";

const QueryForm = ({ query, onSubmit, onCancel }) => {
  const initialFormState = {
    clientName: "",
    email: "",
    phone: "",
    summary: "",
    details: "",
    budgetType: "single", // 'single' or 'range'
    budget: "",
    budgetMin: "",
    budgetMax: "",
    coverageType: "",
    requirements: "",
    preferredPlans: [],
    isPriority: false,
    notes: "",
    status: "new", // new, processing, processed, converted
    age: "",
  };

  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [preferredPlan, setPreferredPlan] = useState("");

  useEffect(() => {
    if (query) {
      // Convert budget if it's a range object
      let budgetType = "single";
      let budgetValue = "";
      let budgetMin = "";
      let budgetMax = "";

      if (query.budget) {
        if (typeof query.budget === "object") {
          budgetType = "range";
          budgetMin = query.budget.min.toString();
          budgetMax = query.budget.max.toString();
        } else {
          budgetValue = query.budget.toString();
        }
      }

      // Create a deep copy of the preferences array to avoid reference issues
      const preferredPlans = query.preferredPlans
        ? [...query.preferredPlans]
        : [];

      setFormData({
        ...query,
        budgetType,
        budget: budgetValue,
        budgetMin,
        budgetMax,
        preferredPlans,
      });
    }
  }, [query]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error when field is updated
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const addPreferredPlan = () => {
    if (preferredPlan.trim()) {
      setFormData((prev) => ({
        ...prev,
        preferredPlans: [...prev.preferredPlans, preferredPlan.trim()],
      }));
      setPreferredPlan("");
    }
  };

  const removePreferredPlan = (index) => {
    setFormData((prev) => ({
      ...prev,
      preferredPlans: prev.preferredPlans.filter((_, i) => i !== index),
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.clientName.trim()) {
      newErrors.clientName = "Client name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    if (!formData.summary.trim()) {
      newErrors.summary = "Summary is required";
    }

    if (formData.budgetType === "single" && formData.budget.trim()) {
      if (isNaN(formData.budget) || parseFloat(formData.budget) <= 0) {
        newErrors.budget = "Budget must be a positive number";
      }
    }

    if (formData.budgetType === "range") {
      if (
        formData.budgetMin.trim() &&
        (isNaN(formData.budgetMin) || parseFloat(formData.budgetMin) <= 0)
      ) {
        newErrors.budgetMin = "Minimum budget must be a positive number";
      }

      if (
        formData.budgetMax.trim() &&
        (isNaN(formData.budgetMax) || parseFloat(formData.budgetMax) <= 0)
      ) {
        newErrors.budgetMax = "Maximum budget must be a positive number";
      }

      if (
        formData.budgetMin.trim() &&
        formData.budgetMax.trim() &&
        parseFloat(formData.budgetMin) >= parseFloat(formData.budgetMax)
      ) {
        newErrors.budgetMax =
          "Maximum budget must be greater than minimum budget";
      }
    }

    if (
      formData.age.trim() &&
      (isNaN(formData.age) || parseFloat(formData.age) <= 0)
    ) {
      newErrors.age = "Age must be a positive number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Format the data for submission
    const formattedData = { ...formData };

    // Process budget based on type
    if (formData.budgetType === "single") {
      formattedData.budget = formData.budget.trim()
        ? parseFloat(formData.budget)
        : null;
    } else {
      formattedData.budget = {
        min: formData.budgetMin.trim() ? parseFloat(formData.budgetMin) : 0,
        max: formData.budgetMax.trim() ? parseFloat(formData.budgetMax) : 0,
      };
    }

    // Format age
    if (formData.age.trim()) {
      formattedData.age = parseInt(formData.age);
    }

    // Remove temporary form fields
    delete formattedData.budgetType;
    delete formattedData.budgetMin;
    delete formattedData.budgetMax;

    onSubmit(formattedData);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm flex flex-col h-full overflow-hidden">
      <div className="p-4 border-b border-neutral-200 flex items-center justify-between">
        <h2 className="text-lg font-medium text-neutral-900">
          {query ? "Edit Query" : "Add New Query"}
        </h2>
        <button
          type="button"
          onClick={onCancel}
          className="p-2 text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100 rounded-md"
          aria-label="Close"
        >
          <TbX className="h-5 w-5" />
        </button>
      </div>

      <div className="flex-1 overflow-auto p-5">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Client Information */}
          <div className="space-y-4">
            <h3 className="text-md font-medium text-neutral-900 flex items-center">
              <TbUser className="mr-2 text-primary-500" />
              Client Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  className="block text-sm font-medium text-neutral-700 mb-1"
                  htmlFor="clientName"
                >
                  Client Name*
                </label>
                <input
                  type="text"
                  id="clientName"
                  name="clientName"
                  value={formData.clientName}
                  onChange={handleChange}
                  className={`block w-full rounded-md border ${
                    errors.clientName ? "border-red-300" : "border-neutral-300"
                  } py-2 px-3 text-neutral-900 shadow-sm focus:border-primary-500 focus:ring-primary-500`}
                />
                {errors.clientName && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <TbAlertCircle className="h-4 w-4 mr-1" />
                    {errors.clientName}
                  </p>
                )}
              </div>

              <div>
                <label
                  className="block text-sm font-medium text-neutral-700 mb-1"
                  htmlFor="age"
                >
                  Age
                </label>
                <input
                  type="text"
                  id="age"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  placeholder="Optional"
                  className={`block w-full rounded-md border ${
                    errors.age ? "border-red-300" : "border-neutral-300"
                  } py-2 px-3 text-neutral-900 shadow-sm focus:border-primary-500 focus:ring-primary-500`}
                />
                {errors.age && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <TbAlertCircle className="h-4 w-4 mr-1" />
                    {errors.age}
                  </p>
                )}
              </div>

              <div>
                <label
                  className="block text-sm font-medium text-neutral-700 mb-1"
                  htmlFor="email"
                >
                  Email Address*
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <TbMail className="h-5 w-5 text-neutral-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`block w-full rounded-md border ${
                      errors.email ? "border-red-300" : "border-neutral-300"
                    } py-2 pl-10 pr-3 text-neutral-900 shadow-sm focus:border-primary-500 focus:ring-primary-500`}
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <TbAlertCircle className="h-4 w-4 mr-1" />
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label
                  className="block text-sm font-medium text-neutral-700 mb-1"
                  htmlFor="phone"
                >
                  Phone Number*
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <TbPhone className="h-5 w-5 text-neutral-400" />
                  </div>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`block w-full rounded-md border ${
                      errors.phone ? "border-red-300" : "border-neutral-300"
                    } py-2 pl-10 pr-3 text-neutral-900 shadow-sm focus:border-primary-500 focus:ring-primary-500`}
                  />
                </div>
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <TbAlertCircle className="h-4 w-4 mr-1" />
                    {errors.phone}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Query Information */}
          <div className="space-y-4">
            <h3 className="text-md font-medium text-neutral-900 flex items-center">
              <TbFileDescription className="mr-2 text-primary-500" />
              Query Information
            </h3>

            <div>
              <label
                className="block text-sm font-medium text-neutral-700 mb-1"
                htmlFor="summary"
              >
                Summary*
              </label>
              <input
                type="text"
                id="summary"
                name="summary"
                value={formData.summary}
                onChange={handleChange}
                placeholder="Brief summary of the query"
                className={`block w-full rounded-md border ${
                  errors.summary ? "border-red-300" : "border-neutral-300"
                } py-2 px-3 text-neutral-900 shadow-sm focus:border-primary-500 focus:ring-primary-500`}
              />
              {errors.summary && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <TbAlertCircle className="h-4 w-4 mr-1" />
                  {errors.summary}
                </p>
              )}
            </div>

            <div>
              <label
                className="block text-sm font-medium text-neutral-700 mb-1"
                htmlFor="details"
              >
                Details
              </label>
              <textarea
                id="details"
                name="details"
                rows="4"
                value={formData.details}
                onChange={handleChange}
                placeholder="Detailed description of the client's needs and requirements"
                className="block w-full rounded-md border border-neutral-300 py-2 px-3 text-neutral-900 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Budget
              </label>
              <div className="flex items-center mb-3 space-x-4">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="budgetTypeSingle"
                    name="budgetType"
                    value="single"
                    checked={formData.budgetType === "single"}
                    onChange={handleChange}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300"
                  />
                  <label
                    htmlFor="budgetTypeSingle"
                    className="ml-2 text-sm text-neutral-700"
                  >
                    Single Amount
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="radio"
                    id="budgetTypeRange"
                    name="budgetType"
                    value="range"
                    checked={formData.budgetType === "range"}
                    onChange={handleChange}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300"
                  />
                  <label
                    htmlFor="budgetTypeRange"
                    className="ml-2 text-sm text-neutral-700"
                  >
                    Budget Range
                  </label>
                </div>
              </div>

              {formData.budgetType === "single" ? (
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <TbCurrencyDollar className="h-5 w-5 text-neutral-400" />
                  </div>
                  <input
                    type="text"
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    placeholder="Enter budget amount"
                    className={`block w-full rounded-md border ${
                      errors.budget ? "border-red-300" : "border-neutral-300"
                    } py-2 pl-10 pr-3 text-neutral-900 shadow-sm focus:border-primary-500 focus:ring-primary-500`}
                  />
                  {errors.budget && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <TbAlertCircle className="h-4 w-4 mr-1" />
                      {errors.budget}
                    </p>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <TbCurrencyDollar className="h-5 w-5 text-neutral-400" />
                      </div>
                      <input
                        type="text"
                        id="budgetMin"
                        name="budgetMin"
                        value={formData.budgetMin}
                        onChange={handleChange}
                        placeholder="Minimum"
                        className={`block w-full rounded-md border ${
                          errors.budgetMin
                            ? "border-red-300"
                            : "border-neutral-300"
                        } py-2 pl-10 pr-3 text-neutral-900 shadow-sm focus:border-primary-500 focus:ring-primary-500`}
                      />
                    </div>
                    {errors.budgetMin && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <TbAlertCircle className="h-4 w-4 mr-1" />
                        {errors.budgetMin}
                      </p>
                    )}
                  </div>

                  <div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <TbCurrencyDollar className="h-5 w-5 text-neutral-400" />
                      </div>
                      <input
                        type="text"
                        id="budgetMax"
                        name="budgetMax"
                        value={formData.budgetMax}
                        onChange={handleChange}
                        placeholder="Maximum"
                        className={`block w-full rounded-md border ${
                          errors.budgetMax
                            ? "border-red-300"
                            : "border-neutral-300"
                        } py-2 pl-10 pr-3 text-neutral-900 shadow-sm focus:border-primary-500 focus:ring-primary-500`}
                      />
                    </div>
                    {errors.budgetMax && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <TbAlertCircle className="h-4 w-4 mr-1" />
                        {errors.budgetMax}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Coverage Information */}
          <div className="space-y-4">
            <h3 className="text-md font-medium text-neutral-900 flex items-center">
              <TbShieldCheck className="mr-2 text-primary-500" />
              Coverage Information
            </h3>

            <div>
              <label
                className="block text-sm font-medium text-neutral-700 mb-1"
                htmlFor="coverageType"
              >
                Coverage Type
              </label>
              <select
                id="coverageType"
                name="coverageType"
                value={formData.coverageType}
                onChange={handleChange}
                className="block w-full rounded-md border border-neutral-300 py-2 px-3 text-neutral-900 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              >
                <option value="">Select coverage type</option>
                <option value="Health Insurance">Health Insurance</option>
                <option value="Life Insurance">Life Insurance</option>
                <option value="Auto Insurance">Auto Insurance</option>
                <option value="Property Insurance">Property Insurance</option>
                <option value="Business Insurance">Business Insurance</option>
                <option value="Travel Insurance">Travel Insurance</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label
                className="block text-sm font-medium text-neutral-700 mb-1"
                htmlFor="preferredPlans"
              >
                Preferred Insurance Plans
              </label>
              <div className="flex">
                <input
                  type="text"
                  id="preferredPlan"
                  value={preferredPlan}
                  onChange={(e) => setPreferredPlan(e.target.value)}
                  placeholder="Add preferred insurance plan"
                  className="block w-full rounded-l-md border border-neutral-300 py-2 px-3 text-neutral-900 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                />
                <button
                  type="button"
                  onClick={addPreferredPlan}
                  className="px-4 py-2 bg-primary-600 text-white rounded-r-md hover:bg-primary-700"
                >
                  Add
                </button>
              </div>

              {formData.preferredPlans.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {formData.preferredPlans.map((plan, index) => (
                    <div
                      key={index}
                      className="inline-flex items-center px-2.5 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800"
                    >
                      {plan}
                      <button
                        type="button"
                        onClick={() => removePreferredPlan(index)}
                        className="ml-1.5 text-primary-600 hover:text-primary-900"
                      >
                        <TbX className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label
                className="block text-sm font-medium text-neutral-700 mb-1"
                htmlFor="requirements"
              >
                Specific Requirements
              </label>
              <textarea
                id="requirements"
                name="requirements"
                rows="3"
                value={formData.requirements}
                onChange={handleChange}
                placeholder="Any specific requirements or conditions for the insurance"
                className="block w-full rounded-md border border-neutral-300 py-2 px-3 text-neutral-900 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              ></textarea>
            </div>
          </div>

          {/* Internal Information */}
          <div className="space-y-4">
            <h3 className="text-md font-medium text-neutral-900 flex items-center">
              <TbInfoCircle className="mr-2 text-primary-500" />
              Internal Information
            </h3>

            <div className="flex items-start">
              <div className="flex h-5 items-center">
                <input
                  id="isPriority"
                  name="isPriority"
                  type="checkbox"
                  checked={formData.isPriority}
                  onChange={handleChange}
                  className="h-4 w-4 rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
                />
              </div>
              <div className="ml-3 text-sm">
                <label
                  htmlFor="isPriority"
                  className="font-medium text-neutral-700 flex items-center"
                >
                  Priority Query
                  <TbStar className="ml-1 h-4 w-4 text-yellow-500" />
                </label>
                <p className="text-neutral-500">
                  Mark this query as high priority for immediate attention
                </p>
              </div>
            </div>

            {query && (
              <div>
                <label
                  className="block text-sm font-medium text-neutral-700 mb-1"
                  htmlFor="status"
                >
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="block w-full rounded-md border border-neutral-300 py-2 px-3 text-neutral-900 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                >
                  <option value="new">New Query</option>
                  <option value="processing">Processing</option>
                  <option value="processed">Processed</option>
                  <option value="converted">Converted to Lead</option>
                </select>
              </div>
            )}

            <div>
              <label
                className="block text-sm font-medium text-neutral-700 mb-1"
                htmlFor="notes"
              >
                Processing Notes
              </label>
              <textarea
                id="notes"
                name="notes"
                rows="3"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Internal notes about processing this query"
                className="block w-full rounded-md border border-neutral-300 py-2 px-3 text-neutral-900 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              ></textarea>
            </div>
          </div>
        </form>
      </div>

      <div className="border-t border-neutral-200 p-4 flex flex-wrap justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-white border border-neutral-300 text-neutral-700 rounded-md hover:bg-neutral-50"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 flex items-center"
        >
          <TbCheck className="mr-2 h-5 w-5" />
          {query ? "Update Query" : "Save Query"}
        </button>
      </div>
    </div>
  );
};

export default QueryForm;
