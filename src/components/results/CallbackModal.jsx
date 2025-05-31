import React, { useState } from "react";
import { FiPhone, FiX, FiChevronRight, FiArrowRight } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import {
  TbCalendarTime,
  TbMessageCircle,
  TbPhoneCall,
  TbCheck,
  TbAlertTriangle,
} from "react-icons/tb";
import contactService from "../../services/contactService";
import { useToast } from "../../hooks/useToast";

const CallbackModal = ({ isOpen, onClose }) => {
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    preferredTime: "Morning (9am - 12pm)",
    namePhone: "",
    notes: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', or null
  const [validationErrors, setValidationErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear validation errors when user starts typing
    if (validationErrors[name]) {
      setValidationErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }
  };

  const parseNamePhone = (namePhoneString) => {
    const trimmed = namePhoneString.trim();

    // Try to split by common separators
    const separators = [" - ", "-", "  ", " | ", "|", " — ", "—"];
    let name = "";
    let phone = "";

    for (const separator of separators) {
      if (trimmed.includes(separator)) {
        const parts = trimmed.split(separator);
        if (parts.length >= 2) {
          name = parts[0].trim();
          phone = parts.slice(1).join(" ").trim();
          break;
        }
      }
    }

    // If no separator found, try to identify phone number pattern
    if (!name && !phone) {
      // Enhanced phone pattern to catch more formats
      const phonePattern =
        /(\+?\d{1,4}[-.\s]?\(?\d{1,4}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9})/;
      const phoneMatch = trimmed.match(phonePattern);

      if (phoneMatch) {
        phone = phoneMatch[0].trim();
        name = trimmed.replace(phoneMatch[0], "").trim();
        // Clean up any remaining separators from name
        name = name.replace(/^[-\s|—]+|[-\s|—]+$/g, "").trim();
      } else {
        // Last resort: look for any sequence of numbers as phone
        const simplePhonePattern = /\d{7,}/;
        const simplePhoneMatch = trimmed.match(simplePhonePattern);

        if (simplePhoneMatch) {
          phone = simplePhoneMatch[0];
          name = trimmed.replace(simplePhoneMatch[0], "").trim();
          name = name.replace(/^[-\s|—]+|[-\s|—]+$/g, "").trim();
        } else {
          // Assume it's all name if no phone pattern found
          name = trimmed;
        }
      }
    }

    return { name, phone };
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.namePhone.trim()) {
      errors.namePhone = "Name and phone number are required";
    } else {
      const { name, phone } = parseNamePhone(formData.namePhone);

      if (!name || name.length < 2) {
        errors.namePhone =
          "Please provide a valid name (at least 2 characters). Format: 'John Doe - +254712345678'";
      } else if (!phone || phone.length < 7) {
        errors.namePhone =
          "Please provide a valid phone number (at least 7 digits). Format: 'John Doe - +254712345678'";
      }
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const { name, phone } = parseNamePhone(formData.namePhone);

      const callbackData = {
        name: name.trim(),
        phone: phone.trim(),
        subject: `Callback Request - ${formData.preferredTime}`,
        message: `Callback request for ${formData.preferredTime}${
          formData.notes ? `. Additional notes: ${formData.notes}` : ""
        }`,
        type: "callback",
        priority: "high",
        preferredTime: formData.preferredTime,
      };

      console.log("Sending callback request data:", callbackData);

      // Use the standard createContactMessage method instead of createCallbackRequest
      const response = await contactService.createContactMessage(callbackData);

      if (response.success !== false) {
        setSubmitStatus("success");
        // Auto close after 5 seconds
        setTimeout(() => {
          setFormData({
            preferredTime: "Morning (9am - 12pm)",
            namePhone: "",
            notes: "",
          });
          setSubmitStatus(null);
          onClose();
        }, 5000);
      } else {
        throw new Error(
          response.message || "Failed to submit callback request"
        );
      }
    } catch (error) {
      console.error("Error submitting callback request:", error);
      console.error("Error response:", error.response?.data);
      const errorMessage =
        error.response?.data?.message ||
        "Failed to submit callback request. Please try again.";
      setSubmitStatus("error");
      // Auto close after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null);
        onClose();
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const modalVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
        delay: 0.1,
      },
    },
    exit: {
      opacity: 0,
      y: 20,
      scale: 0.95,
      transition: { duration: 0.2 },
    },
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={modalVariants}
          className="fixed inset-0 bg-black/60 backdrop-blur-[3px] flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            variants={contentVariants}
            className="bg-white rounded-xl max-w-md w-full p-6 relative animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-neutral-600 hover:text-red-600 transition-colors"
              onClick={onClose}
            >
              <FiX className="h-5 w-5" />
            </button>

            {/* Success State */}
            {submitStatus === "success" && (
              <div className="text-center py-8">
                <div className="h-16 w-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                  <TbCheck className="h-9 w-9 text-white" />
                </div>
                <h3 className="text-xl font-bold text-green-700 font-outfit mb-2">
                  Request Submitted👍
                </h3>
                <p className="text-gray-600 text-sm font-outfit mb-4">
                  Your callback request has been submitted successfully. We'll
                  contact you shortly.
                </p>
                <div className="text-xs text-gray-500 font-outfit">
                  This window will close in 5 seconds...
                </div>
              </div>
            )}

            {/* Error State */}
            {submitStatus === "error" && (
              <div className="text-center py-8">
                <div className="h-16 w-16 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                  <TbAlertTriangle className="h-9 w-9 text-white" />
                </div>
                <h3 className="text-xl font-bold text-red-700 font-outfit mb-2">
                  Submission Failed💥
                </h3>
                <p className="text-gray-600 text-sm font-outfit mb-4">
                  Sorry, there was an error submitting your request. Please try
                  again or contact us directly.
                </p>
                <div className="text-xs text-gray-500 font-outfit">
                  This window will close in 5 seconds...
                </div>
              </div>
            )}

            {/* Form State */}
            {!submitStatus && (
              <>
                <div className="text-center mb-4 relative z-10">
                  <div className="h-16 w-16 bg-gradient-to-br from-secondary-400 to-secondary-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                    <TbPhoneCall className="h-9 w-9 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-neutral-800 font-outfit mb-1">
                    Request a Callback
                  </h3>
                  <p className="text-neutral-800 text-sm font-outfit">
                    We'll have an insurance expert contact you shortly
                  </p>
                </div>

                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div>
                    <label className="block text-sm font-semibold text-primary-600 mb-1 font-outfit">
                      Preferred Time
                    </label>
                    <select
                      name="preferredTime"
                      value={formData.preferredTime}
                      onChange={handleChange}
                      className="w-full h-11 px-3 rounded-lg border-2 focus:border bg-white text-gray-700 border-gray-200 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 outline-none font-outfit  shadow-sm hover:border-primary-300"
                    >
                      <option value="Morning (9am - 12pm)">
                        Morning (9am - 12pm)
                      </option>
                      <option value="Afternoon (12pm - 4pm)">
                        Afternoon (12pm - 4pm)
                      </option>
                      <option value="Evening (4pm - 7pm)">
                        Evening (4pm - 7pm)
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-primary-600 mb-1 font-outfit">
                      Name and Phone Number
                    </label>
                    <input
                      type="text"
                      name="namePhone"
                      value={formData.namePhone}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 rounded-lg border-2 focus:border bg-white text-gray-700 ${
                        validationErrors.namePhone
                          ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                          : "border-gray-200 focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                      } focus:outline-none font-outfit shadow-sm hover:border-primary-300`}
                      placeholder="John Doe - +254712345678"
                      required
                    />
                    {validationErrors.namePhone && (
                      <p className="mt-2 text-sm text-red-600 font-outfit">
                        {validationErrors.namePhone}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-primary-600 mb-1 font-outfit">
                      Additional Notes
                    </label>
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      className="w-full px-3 py-2 rounded-lg border-2 focus:border bg-white text-gray-700 border-gray-200 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 focus:outline-none font-outfit shadow-sm hover:border-primary-300"
                      rows={3}
                      placeholder="Any specific questions or concerns?"
                    ></textarea>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-gradient-to-r from-secondary-600 to-secondary-700 hover:from-secondary-700 hover:to-secondary-800 text-white font-medium rounded-lg shadow-md transition-colors flex items-center justify-center font-outfit mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    <span className="inline-flex items-center font-semibold">
                      {isSubmitting ? (
                        <>
                          <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                          Submitting...
                        </>
                      ) : (
                        <>
                          Request Callback
                          <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </span>
                  </motion.button>

                  <p className="text-xs text-center text-neutral-700 mt-2 font-outfit">
                    Safeguarding what's truly yours. Lako Insurance.
                  </p>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CallbackModal;
