import React, { useState } from "react";
import { motion } from "framer-motion";
import CoverTypeSelection from "./CoverTypeSelection";
import PlanSelection from "./PlanSelection";
import PersonalDetailsForm from "./PersonalDetailsForm";
import DocumentUpload from "./DocumentUpload";
import ReviewAndSubmit from "./ReviewAndSubmit";
import ApplicationSuccess from "../common/ApplicationSuccess";

const PersonalAccidentFlow = ({
  currentStep,
  formData,
  updateFormData,
  nextStep,
  prevStep,
  resetFlow,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedApplication, setSubmittedApplication] = useState(null);

  const steps = [
    {
      title: "Cover Type",
      description: "Choose your coverage type",
      component: "coverType",
    },
    {
      title: "Plan Selection",
      description: "Compare and select a plan",
      component: "planSelection",
    },
    {
      title: "Personal Details",
      description: "Provide your information",
      component: "personalDetails",
    },
    {
      title: "Documents",
      description: "Upload required documents",
      component: "documents",
    },
    {
      title: "Review & Submit",
      description: "Review and submit application",
      component: "review",
    },
    {
      title: "Success",
      description: "Application submitted",
      component: "success",
    },
  ];

  const handleSubmit = async (applicationData) => {
    setIsSubmitting(true);
    try {
      // API call to submit application will go here
      console.log("Submitting application:", applicationData);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Store the submitted application data
      setSubmittedApplication(applicationData);
      nextStep(); // Go to success page
    } catch (error) {
      console.error("Error submitting application:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <CoverTypeSelection
            formData={formData}
            updateFormData={updateFormData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case 2:
        return (
          <PlanSelection
            formData={formData}
            updateFormData={updateFormData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case 3:
        return (
          <PersonalDetailsForm
            formData={formData}
            updateFormData={updateFormData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case 4:
        return (
          <DocumentUpload
            formData={formData}
            updateFormData={updateFormData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case 5:
        return (
          <ReviewAndSubmit
            formData={formData}
            updateFormData={updateFormData}
            onSubmit={handleSubmit}
            prevStep={prevStep}
            isSubmitting={isSubmitting}
          />
        );
      case 6:
        return (
          <ApplicationSuccess
            applicationData={submittedApplication}
            onStartNew={resetFlow}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[1.05rem] md:text-xl font-semibold text-gray-700">
            Personal Accident Insurance
          </h2>
          <span className="text-sm text-gray-500">
            Step {currentStep} of {steps.length}
          </span>
        </div>

        <div className="relative hidden lg:block">
          <div className="flex items-center">
            {steps.map((step, index) => (
              <React.Fragment key={index}>
                <div className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      index + 1 <= currentStep
                        ? "bg-primary-600 text-white"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {index + 1}
                  </div>
                  <div className="ml-2">
                    <div
                      className={`text-sm font-bold ${
                        index + 1 <= currentStep
                          ? "text-primary-600"
                          : "text-gray-700"
                      }`}
                    >
                      {step.title}
                    </div>
                    <div className="text-xs text-gray-500 font-medium">
                      {step.description}
                    </div>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 h-0.5 mx-4 ${
                      index + 1 < currentStep ? "bg-primary-600" : "bg-gray-200"
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Current Step Content */}
      <motion.div
        key={currentStep}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
      >
        {renderStep()}
      </motion.div>
    </div>
  );
};

export default PersonalAccidentFlow;
