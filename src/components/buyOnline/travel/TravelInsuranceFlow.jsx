import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TripTypeSelection from "./TripTypeSelection";
import TravelDetailsForm from "./TravelDetailsForm";
import PlanSelection from "./PlanSelection";
import PersonalDetailsForm from "./PersonalDetailsForm";
import DocumentUpload from "./DocumentUpload";
import ReviewAndSubmit from "./ReviewAndSubmit";
import ApplicationSuccess from "../common/ApplicationSuccess";
import applicationService from "../../../services/applicationService";

const TravelInsuranceFlow = ({
  currentStep,
  formData,
  updateFormData,
  nextStep,
  prevStep,
  resetFlow,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedApplication, setSubmittedApplication] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const [showApplicationSuccess, setShowApplicationSuccess] = useState(false);

  // Scroll to top when validation errors are set
  React.useEffect(() => {
    if (Object.keys(validationErrors).length > 0 && currentStep === 6) {
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 100);
    }
  }, [validationErrors, currentStep]);

  const steps = [
    {
      title: "Trip Type",
      description: "Choose your trip type",
      component: "tripType",
    },
    {
      title: "Travel Details",
      description: "Trip dates and destinations",
      component: "travelDetails",
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
  ];

  // Handle application submission
  const handleSubmitApplication = async () => {
    setValidationErrors({});
    setIsSubmitting(true);

    try {
      console.log("Submitting travel insurance application...");

      const sanitizeField = (value) => {
        if (typeof value === "string" && value.trim() === "") {
          return null;
        }
        return value || null;
      };

      const applicationPayload = {
        insuranceType: "travel",
        tripType: formData.tripType,
        status: "submitted",
        firstName: formData.firstName,
        middleName: sanitizeField(formData.middleName),
        lastName: formData.lastName,
        dateOfBirth: formData.dateOfBirth,
        gender: formData.gender,
        idNumber: formData.idNumber,
        mobileNumber: formData.mobileNumber,
        emailAddress: formData.emailAddress,
        postalAddress: sanitizeField(formData.postalAddress),
        town: sanitizeField(formData.town),
        kraPin: sanitizeField(formData.kraPin),
        nextOfKinName: sanitizeField(formData.nextOfKinName),
        nextOfKinContacts: sanitizeField(formData.nextOfKinContacts),
        beneficiaryName: sanitizeField(formData.beneficiaryName),
        beneficiaryContacts: sanitizeField(formData.beneficiaryContacts),
        destination: sanitizeField(formData.destination),
        departureDate: formData.departureDate,
        returnDate: formData.returnDate,
        travelPurpose: sanitizeField(formData.travelPurpose),
        numberOfTravelers: formData.numberOfTravelers || 1,
        coverageType: sanitizeField(formData.coverageType),
        selectedPlanId: formData.selectedPlan?.id || null,
        premiumAmount: formData.premiumAmount || null,
        insuranceProvider: sanitizeField(formData.insuranceProvider),
        isAgentPurchase: formData.isAgentPurchase || false,
        agentName: sanitizeField(formData.agentName),
        agentEmail: sanitizeField(formData.agentEmail),
        agentPhone: sanitizeField(formData.agentPhone),
      };

      const response = await applicationService.createApplication(
        applicationPayload
      );

      if (!response.success) {
        throw new Error(response.message || "Failed to submit application");
      }

      const createdApplication = response.data;
      setSubmittedApplication(createdApplication);

      // Upload documents if any
      if (formData.documents && Object.keys(formData.documents).length > 0) {
        await uploadDocumentsToApplication(createdApplication.id);
      }

      setShowApplicationSuccess(true);
    } catch (error) {
      console.error("Error submitting application:", error);

      if (
        error.response &&
        error.response.data &&
        error.response.data.errorType === "validation"
      ) {
        const serverValidationErrors = error.response.data.errors || {};
        setValidationErrors(serverValidationErrors);
      } else {
        alert("Failed to submit application. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Upload documents to application
  const uploadDocumentsToApplication = async (applicationId) => {
    try {
      const uploadPromises = [];
      const documentTypes = [];

      Object.entries(formData.documents).forEach(([docType, fileData]) => {
        if (fileData && fileData.file) {
          uploadPromises.push(fileData.file);
          documentTypes.push(docType);
        }
      });

      if (uploadPromises.length > 0) {
        const uploadFormData = new FormData();

        uploadPromises.forEach((file, index) => {
          uploadFormData.append("documents", file);
          uploadFormData.append("documentTypes", documentTypes[index]);
        });

        const uploadResponse = await applicationService.uploadDocuments(
          applicationId,
          uploadFormData
        );

        if (uploadResponse.success) {
          console.log("Documents uploaded successfully:", uploadResponse.data);
        }
      }
    } catch (error) {
      console.error("Error uploading documents:", error);
    }
  };

  // Reset flow completely
  const handleStartNewApplication = () => {
    setShowApplicationSuccess(false);
    setSubmittedApplication(null);
    setValidationErrors({});
    resetFlow();
  };

  const renderStep = () => {
    if (showApplicationSuccess) {
      return (
        <ApplicationSuccess
          applicationData={submittedApplication}
          onStartNew={handleStartNewApplication}
          paymentCompleted={false}
        />
      );
    }

    switch (currentStep) {
      case 1:
        return (
          <TripTypeSelection
            formData={formData}
            updateFormData={updateFormData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case 2:
        return (
          <TravelDetailsForm
            formData={formData}
            updateFormData={updateFormData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case 3:
        return (
          <PlanSelection
            formData={formData}
            updateFormData={updateFormData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case 4:
        return (
          <PersonalDetailsForm
            formData={formData}
            updateFormData={updateFormData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case 5:
        return (
          <DocumentUpload
            formData={formData}
            updateFormData={updateFormData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case 6:
        return (
          <ReviewAndSubmit
            formData={formData}
            updateFormData={updateFormData}
            nextStep={handleSubmitApplication}
            prevStep={prevStep}
            isSubmitting={isSubmitting}
            validationErrors={validationErrors}
            setValidationErrors={setValidationErrors}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="">
      {/* Progress Bar */}
      {!showApplicationSuccess && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2.5 md:mb-4">
            <h2 className="text-[1.05rem] md:text-xl font-semibold text-neutral-700">
              Travel Insurance
            </h2>
            <span className="text-[0.83rem] md:text-sm font-medium text-gray-500">
              Step {currentStep} of {steps.length}
            </span>
          </div>

          <div className="relative hidden lg:block">
            <div className="flex items-center">
              {steps.map((step, index) => (
                <React.Fragment key={index}>
                  <div className="flex items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-lexend font-medium ${
                        index + 1 <= currentStep
                          ? "bg-primary-600 text-white"
                          : "bg-gray-200 text-neutral-700"
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
                      <div className="text-xs text-neutral-700 font-medium">
                        {step.description}
                      </div>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`flex-1 h-0.5 mx-3.5 ${
                        index + 1 < currentStep
                          ? "bg-primary-600"
                          : "bg-gray-200"
                      }`}
                    />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Current Step Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={showApplicationSuccess ? "success" : currentStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          {renderStep()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default TravelInsuranceFlow;
