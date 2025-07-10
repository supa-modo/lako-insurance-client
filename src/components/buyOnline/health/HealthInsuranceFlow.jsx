import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import AgeEntry from "./AgeEntry";
import PlanSelection from "./PlanSelection";
import PersonalDetailsForm from "./PersonalDetailsForm";
import DocumentUpload from "../common/DocumentUpload";
import ReviewAndSubmit from "./ReviewAndSubmit";
import ApplicationSuccess from "../common/ApplicationSuccess";
import PaymentComponent from "../common/PaymentComponent";
import applicationService from "../../../services/applicationService";

const HealthInsuranceFlow = ({
  currentStep,
  formData,
  updateFormData,
  nextStep,
  prevStep,
  resetFlow,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedApplication, setSubmittedApplication] = useState(null);
  const [draftApplication, setDraftApplication] = useState(null);
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [showApplicationSuccess, setShowApplicationSuccess] = useState(false);
  const [isCreatingDraft, setIsCreatingDraft] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [documentsUploaded, setDocumentsUploaded] = useState(false);

  // Scroll to top when validation errors are set
  React.useEffect(() => {
    if (Object.keys(validationErrors).length > 0 && currentStep === 4) {
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 100);
    }
  }, [validationErrors, currentStep]);

  const steps = [
    {
      title: "Your Age",
      description: "Enter your date of birth",
      component: "ageEntry",
    },
    {
      title: "Plan Selection",
      description: "Choose your health plan",
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
      title: "Payment & Success",
      description: "Complete payment and confirmation",
      component: "payment-success",
    },
  ];

  // Function to reset all form data to default values
  const resetFormData = () => {
    updateFormData("insuranceType", "health");
    updateFormData("coverType", "");
    updateFormData("selectedPlan", null);
    updateFormData("firstName", "");
    updateFormData("middleName", "");
    updateFormData("lastName", "");
    updateFormData("dateOfBirth", "");
    updateFormData("gender", "");
    updateFormData("kraPin", "");
    updateFormData("idNumber", "");
    updateFormData("mobileNumber", "");
    updateFormData("emailAddress", "");
    updateFormData("postalAddress", "");
    updateFormData("town", "");
    updateFormData("nextOfKinName", "");
    updateFormData("nextOfKinContacts", "");
    updateFormData("beneficiaryName", "");
    updateFormData("beneficiaryContacts", "");

    // Health-specific fields
    updateFormData("medicalHistory", {});
    updateFormData("preExistingConditions", []);
    updateFormData("currentMedication", "");
    updateFormData("allergies", "");
    updateFormData("familyMedicalHistory", "");
    updateFormData("dependents", []);
    updateFormData("lifestyle", {});

    updateFormData("policyStartDate", "");
    updateFormData("premiumAmount", null);
    updateFormData("insuranceProvider", "");
    updateFormData("isAgentPurchase", false);
    updateFormData("agentName", "");
    updateFormData("agentEmail", "");
    updateFormData("agentPhone", "");
    updateFormData("documents", {});
    updateFormData("requiresHealthVerification", false);
  };

  // Create draft application before payment or submission
  const createDraftApplication = async () => {
    if (draftApplication) {
      return draftApplication;
    }

    setIsCreatingDraft(true);
    try {
      console.log("Creating draft health insurance application...");

      const sanitizeField = (value) => {
        if (typeof value === "string" && value.trim() === "") {
          return null;
        }
        return value || null;
      };

      // Create draft application payload
      const draftPayload = {
        // Basic application info
        insuranceType: "health",
        coverType: formData.coverType,
        status: formData.requiresHealthVerification
          ? "submitted"
          : "pending_payment",

        // Personal details
        firstName: formData.firstName,
        middleName: sanitizeField(formData.middleName),
        lastName: formData.lastName,
        dateOfBirth: formData.dateOfBirth,
        gender: formData.gender,
        idNumber: formData.idNumber,
        mobileNumber: formData.mobileNumber,
        emailAddress: formData.emailAddress,

        // Address details
        postalAddress: sanitizeField(formData.postalAddress),
        town: sanitizeField(formData.town),
        kraPin: sanitizeField(formData.kraPin),

        // Next of kin and beneficiary
        nextOfKinName: sanitizeField(formData.nextOfKinName),
        nextOfKinContacts: sanitizeField(formData.nextOfKinContacts),
        beneficiaryName: sanitizeField(formData.beneficiaryName),
        beneficiaryContacts: sanitizeField(formData.beneficiaryContacts),

        // Health-specific information
        medicalHistory: formData.medicalHistory || {},
        preExistingConditions: formData.preExistingConditions || [],
        currentMedication: sanitizeField(formData.currentMedication),
        allergies: sanitizeField(formData.allergies),
        familyMedicalHistory: sanitizeField(formData.familyMedicalHistory),
        dependents: formData.dependents || [],
        lifestyle: formData.lifestyle || {},

        // Policy details - health insurance doesn't require start date, so we omit it entirely
        selectedPlanId: formData.selectedPlan?.id || null,
        premiumAmount: formData.premiumAmount || null,
        insuranceProvider: sanitizeField(formData.insuranceProvider),

        // Health verification flag
        requiresHealthVerification:
          formData.requiresHealthVerification || false,

        // Agent details if applicable
        isAgentPurchase: formData.isAgentPurchase || false,
        agentName: sanitizeField(formData.agentName),
        agentEmail: sanitizeField(formData.agentEmail),
        agentPhone: sanitizeField(formData.agentPhone),
      };

      console.log("Draft health insurance application payload:", draftPayload);

      const response = await applicationService.createApplication(draftPayload);

      if (!response.success) {
        throw new Error(
          response.message || "Failed to create draft application"
        );
      }

      const createdDraft = response.data;
      console.log("Created draft health insurance application:", createdDraft);

      setDraftApplication(createdDraft);
      return createdDraft;
    } catch (error) {
      console.error(
        "Error creating draft health insurance application:",
        error
      );
      throw error;
    } finally {
      setIsCreatingDraft(false);
    }
  };

  // Handle moving to payment step or final submission for health verification plans
  const handleProceedToPayment = async () => {
    setValidationErrors({});

    try {
      await createDraftApplication();

      // If plan requires health verification, skip payment and go to success
      if (formData.requiresHealthVerification) {
        setSubmittedApplication(draftApplication);
        setShowApplicationSuccess(true);
        nextStep(); // Move to success step
      } else {
        nextStep(); // Move to payment step
      }
    } catch (error) {
      console.error("Error proceeding to payment/submission:", error);

      if (
        error.response &&
        error.response.data &&
        error.response.data.errorType === "validation"
      ) {
        const serverValidationErrors = error.response.data.errors || {};
        setValidationErrors(serverValidationErrors);
        console.log("Validation errors set:", serverValidationErrors);
      } else {
        alert("Failed to prepare application. Please try again.");
      }
    }
  };

  // Handle payment completion - update draft application to submitted
  const handlePaymentComplete = async (paymentData) => {
    console.log("Health insurance payment complete:", {
      paymentData,
      isProcessingPayment,
      paymentCompleted,
      documentsUploaded,
    });

    if (isProcessingPayment || paymentCompleted) {
      console.log("Payment already being processed or completed, skipping...");
      return;
    }

    setIsProcessingPayment(true);
    setPaymentCompleted(true);

    try {
      await updateDraftApplicationAfterPayment(paymentData);
      setShowApplicationSuccess(true);
    } catch (error) {
      console.error(
        "Error updating health insurance application after payment:",
        error
      );
      setIsProcessingPayment(false);
      setPaymentCompleted(false);
      alert(
        "Payment successful but application update failed. Please contact support with your payment reference: " +
          paymentData.paymentReference
      );
    }
  };

  // Upload documents to application
  const uploadDocumentsToApplication = async (applicationId) => {
    if (documentsUploaded) {
      console.log("Documents already uploaded, skipping...");
      return;
    }

    try {
      console.log(
        "Uploading documents to health insurance application:",
        applicationId
      );
      setDocumentsUploaded(true);

      const existingDocsResponse =
        await applicationService.getApplicationDocuments(applicationId);

      if (
        existingDocsResponse.success &&
        existingDocsResponse.data &&
        existingDocsResponse.data.length > 0
      ) {
        console.log("Documents already uploaded, skipping upload...");
        return;
      }

      if (!formData.documents || Object.keys(formData.documents).length === 0) {
        console.log("No documents to upload");
        return;
      }

      const uploadPromises = [];
      const documentTypes = [];
      let hasValidFiles = false;

      Object.entries(formData.documents).forEach(([docType, fileData]) => {
        if (fileData && fileData.file && fileData.file instanceof File) {
          uploadPromises.push(fileData.file);
          documentTypes.push(docType);
          hasValidFiles = true;
        }
      });

      if (!hasValidFiles) {
        console.log("No valid files found to upload");
        return;
      }

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
        console.log(
          "Health insurance documents uploaded successfully:",
          uploadResponse.data
        );
      } else {
        console.error(
          "Health insurance document upload failed:",
          uploadResponse.message
        );
        setDocumentsUploaded(false);
        throw new Error(uploadResponse.message || "Document upload failed");
      }
    } catch (error) {
      console.error("Error uploading health insurance documents:", error);
      setDocumentsUploaded(false);
    }
  };

  // Update draft application after successful payment
  const updateDraftApplicationAfterPayment = async (paymentData) => {
    setIsSubmitting(true);
    try {
      console.log(
        "Updating draft health insurance application after payment..."
      );

      if (!draftApplication) {
        throw new Error("Draft application not found");
      }

      const updatePayload = {
        status: "submitted",
        paymentReference:
          paymentData.paymentReference || paymentData.mpesaReceiptNumber,
        paymentDate: new Date().toISOString(),
      };

      const updateResponse = await applicationService.updateApplication(
        draftApplication.id,
        updatePayload
      );

      if (!updateResponse.success) {
        throw new Error(
          updateResponse.message || "Failed to update application"
        );
      }

      const updatedApplication = updateResponse.data;
      console.log("Updated health insurance application:", updatedApplication);
      setSubmittedApplication(updatedApplication);

      if (
        formData.documents &&
        Object.keys(formData.documents).length > 0 &&
        !documentsUploaded
      ) {
        try {
          await uploadDocumentsToApplication(updatedApplication.id);
        } catch (uploadError) {
          console.error(
            "Document upload failed but payment was successful:",
            uploadError
          );
        }
      }

      return updatedApplication;
    } catch (error) {
      console.error("Error updating health insurance application:", error);
      throw error;
    } finally {
      setIsSubmitting(false);
      setIsProcessingPayment(false);
    }
  };

  // Handle payment cancellation or going back
  const handlePaymentCancel = () => {
    setPaymentCompleted(false);
    setShowApplicationSuccess(false);
    setIsProcessingPayment(false);
    setDocumentsUploaded(false);
    prevStep();
  };

  // Reset flow completely
  const handleStartNewApplication = () => {
    setPaymentCompleted(false);
    setShowApplicationSuccess(false);
    setSubmittedApplication(null);
    setDraftApplication(null);
    setIsProcessingPayment(false);
    setDocumentsUploaded(false);
    resetFlow();
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <AgeEntry
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
            insuranceType="health"
          />
        );
      case 5:
        return (
          <ReviewAndSubmit
            formData={formData}
            updateFormData={updateFormData}
            nextStep={handleProceedToPayment}
            prevStep={prevStep}
            isSubmitting={isSubmitting || isCreatingDraft}
            validationErrors={validationErrors}
            setValidationErrors={setValidationErrors}
          />
        );
      case 6:
        // For health insurance, check if payment is required
        if (
          !formData.requiresHealthVerification &&
          !paymentCompleted &&
          !showApplicationSuccess
        ) {
          return (
            <PaymentComponent
              applicationData={{
                id: draftApplication?.id,
                applicationNumber: draftApplication?.applicationNumber,
                premiumAmount:
                  formData.premiumAmount ||
                  formData.selectedPlan?.annualPremium,
                firstName: formData.firstName,
                lastName: formData.lastName,
                coverType: formData.coverType,
                insuranceType: formData.insuranceType,
              }}
              onPaymentComplete={handlePaymentComplete}
              onCancel={handlePaymentCancel}
            />
          );
        } else {
          return (
            <ApplicationSuccess
              applicationData={submittedApplication || draftApplication}
              onStartNew={handleStartNewApplication}
              paymentCompleted={paymentCompleted}
            />
          );
        }
      default:
        return null;
    }
  };

  return (
    <div className="">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2.5 md:mb-4">
          <h2 className="text-[1.05rem] md:text-xl font-semibold text-neutral-700">
            Medical Health Insurance
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
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
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

export default HealthInsuranceFlow;
