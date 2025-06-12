import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import CoverTypeSelection from "./CoverTypeSelection";
import PlanSelection from "./PlanSelection";
import PersonalDetailsForm from "./PersonalDetailsForm";
import DocumentUpload from "./DocumentUpload";
import ReviewAndSubmit from "./ReviewAndSubmit";
import ApplicationSuccess from "../common/ApplicationSuccess";
import PaymentComponent from "../common/PaymentComponent";
import applicationService from "../../../services/applicationService";

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
  const [draftApplication, setDraftApplication] = useState(null);
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [showApplicationSuccess, setShowApplicationSuccess] = useState(false);
  const [isCreatingDraft, setIsCreatingDraft] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  // Scroll to top when validation errors are set
  React.useEffect(() => {
    if (Object.keys(validationErrors).length > 0 && currentStep === 5) {
      // Small delay to ensure the component has rendered
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 100);
    }
  }, [validationErrors, currentStep]);

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
      title: "Payment & Success",
      description: "Complete payment and confirmation",
      component: "payment-success",
    },
  ];

  // Function to reset all form data to default values
  const resetFormData = () => {
    updateFormData("insuranceType", "personal-accident");
    updateFormData("coverType", "");
    updateFormData("selectedPlan", null);
    updateFormData("firstName", "");
    updateFormData("middleName", "");
    updateFormData("lastName", "");
    updateFormData("dateOfBirth", "");
    updateFormData("gender", "");
    updateFormData("universityCollegeSchool", "");
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
    updateFormData("previousAccidents", false);
    updateFormData("physicalDisability", false);
    updateFormData("chronicIllness", false);
    updateFormData("medicalHistoryDetails", "");
    updateFormData("policyStartDate", "");
    updateFormData("premiumAmount", null);
    updateFormData("insuranceProvider", "");
    updateFormData("isAgentPurchase", false);
    updateFormData("agentName", "");
    updateFormData("agentEmail", "");
    updateFormData("agentPhone", "");
    updateFormData("documents", {});
  };

  // Create draft application before payment
  const createDraftApplication = async () => {
    if (draftApplication) {
      return draftApplication; // Return existing draft if already created
    }

    setIsCreatingDraft(true);
    try {
      console.log("Creating draft application for payment...");

      // Helper function to convert empty strings to null
      const sanitizeField = (value) => {
        if (typeof value === "string" && value.trim() === "") {
          return null;
        }
        return value || null;
      };

      // Create draft application payload
      const draftPayload = {
        // Basic application info
        insuranceType: "personal-accident",
        coverType: formData.coverType,
        status: "pending_payment", // Set as pending payment

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

        // Educational details (for students)
        universityCollegeSchool: sanitizeField(
          formData.universityCollegeSchool
        ),
        kraPin: sanitizeField(formData.kraPin),

        // Next of kin and beneficiary
        nextOfKinName: sanitizeField(formData.nextOfKinName),
        nextOfKinContacts: sanitizeField(formData.nextOfKinContacts),
        beneficiaryName: sanitizeField(formData.beneficiaryName),
        beneficiaryContacts: sanitizeField(formData.beneficiaryContacts),

        // Health and medical history
        previousAccidents: formData.previousAccidents || false,
        physicalDisability: formData.physicalDisability || false,
        chronicIllness: formData.chronicIllness || false,
        medicalHistoryDetails: sanitizeField(formData.medicalHistoryDetails),

        // Policy details
        policyStartDate:
          formData.policyStartDate || new Date().toISOString().split("T")[0],
        selectedPlanId: formData.selectedPlan?.id || null,
        premiumAmount: formData.premiumAmount || null,
        insuranceProvider: sanitizeField(formData.insuranceProvider),

        // Agent details if applicable
        isAgentPurchase: formData.isAgentPurchase || false,
        agentName: sanitizeField(formData.agentName),
        agentEmail: sanitizeField(formData.agentEmail),
        agentPhone: sanitizeField(formData.agentPhone),
      };

      console.log("Draft application payload:", draftPayload);

      // Create the draft application
      const response = await applicationService.createApplication(draftPayload);

      if (!response.success) {
        throw new Error(
          response.message || "Failed to create draft application"
        );
      }

      const createdDraft = response.data;
      console.log("Created draft application:", createdDraft);

      setDraftApplication(createdDraft);
      return createdDraft;
    } catch (error) {
      console.error("Error creating draft application:", error);
      throw error;
    } finally {
      setIsCreatingDraft(false);
    }
  };

  // Handle moving to payment step - create draft application first
  const handleProceedToPayment = async () => {
    // Clear previous validation errors
    setValidationErrors({});

    try {
      await createDraftApplication();
      nextStep(); // Move to payment step
    } catch (error) {
      console.error("Error proceeding to payment:", error);

      // Check if this is a validation error from the server
      if (
        error.response &&
        error.response.data &&
        error.response.data.errorType === "validation"
      ) {
        const serverValidationErrors = error.response.data.errors || {};
        setValidationErrors(serverValidationErrors);

        // Show a more specific error message
        const errorFields = Object.keys(serverValidationErrors);
        const errorMessage =
          errorFields.length > 0
            ? `Please correct the following errors: ${errorFields.join(", ")}`
            : "Please check your information and try again.";

        // Don't show alert, let the validation errors display in the UI
        console.log("Validation errors set:", serverValidationErrors);
      } else {
        // For non-validation errors, show generic alert
        alert("Failed to prepare application for payment. Please try again.");
      }
    }
  };

  // Handle payment completion - update draft application to submitted
  const handlePaymentComplete = async (paymentData) => {
    // Prevent duplicate processing
    if (isProcessingPayment || paymentCompleted) {
      console.log("Payment already being processed or completed, skipping...");
      return;
    }

    setIsProcessingPayment(true);
    console.log("Payment completed:", paymentData);
    setPaymentCompleted(true);

    try {
      // Update the draft application to submitted status
      await updateDraftApplicationAfterPayment(paymentData);
      setShowApplicationSuccess(true);
    } catch (error) {
      console.error("Error updating application after payment:", error);
      // Reset flags on error
      setIsProcessingPayment(false);
      setPaymentCompleted(false);
      // Handle application update error - payment succeeded but app update failed
      alert(
        "Payment successful but application update failed. Please contact support with your payment reference: " +
          paymentData.paymentReference
      );
    }
  };

  // Upload documents to application
  const uploadDocumentsToApplication = async (applicationId) => {
    try {
      console.log("Uploading documents to application:", applicationId);

      // First, check if documents already exist for this application
      console.log("Checking for existing documents...");
      const existingDocsResponse =
        await applicationService.getApplicationDocuments(applicationId);

      if (
        existingDocsResponse.success &&
        existingDocsResponse.data &&
        existingDocsResponse.data.length > 0
      ) {
        console.log(
          "Documents already uploaded for this application, skipping upload..."
        );
        console.log("Existing documents:", existingDocsResponse.data);
        return; // Skip upload if documents already exist
      }

      console.log("No existing documents found, proceeding with upload...");
      console.log("Form data documents:", formData.documents);

      const uploadPromises = [];
      const documentTypes = [];

      Object.entries(formData.documents).forEach(([docType, fileData]) => {
        console.log(
          `Processing document type: ${docType}, fileData:`,
          fileData
        );
        if (fileData && fileData.file) {
          console.log("Adding file to upload:", fileData.name);
          uploadPromises.push(fileData.file);
          documentTypes.push(docType);
        }
      });

      console.log("Total files to upload:", uploadPromises.length);

      if (uploadPromises.length > 0) {
        // Create FormData for upload
        const uploadFormData = new FormData();

        uploadPromises.forEach((file, index) => {
          uploadFormData.append("documents", file);
          uploadFormData.append("documentTypes", documentTypes[index]);
        });

        console.log("Calling applicationService.uploadDocuments with:", {
          applicationId,
          formDataEntries: Array.from(uploadFormData.entries()),
        });

        const uploadResponse = await applicationService.uploadDocuments(
          applicationId,
          uploadFormData
        );

        console.log("Upload response:", uploadResponse);

        if (uploadResponse.success) {
          console.log("Documents uploaded successfully:", uploadResponse.data);
        } else {
          console.error("Document upload failed:", uploadResponse.message);
        }
      } else {
        console.log("No files to upload");
      }
    } catch (error) {
      console.error("Error uploading documents:", error);
      // Don't throw here - documents can be uploaded later
    }
  };

  // Update draft application after successful payment
  const updateDraftApplicationAfterPayment = async (paymentData) => {
    setIsSubmitting(true);
    try {
      console.log("Updating draft application after successful payment...");

      if (!draftApplication) {
        throw new Error("Draft application not found");
      }

      // Update application status and add payment reference
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
      console.log("Updated application:", updatedApplication);
      setSubmittedApplication(updatedApplication);

      // Upload documents to the now-submitted application (with duplicate check)
      console.log("Checking documents for upload:", formData.documents);
      if (formData.documents && Object.keys(formData.documents).length > 0) {
        console.log("Documents found, starting upload...");
        await uploadDocumentsToApplication(updatedApplication.id);
      } else {
        console.log("No documents to upload or documents object is empty");
      }

      return updatedApplication;
    } catch (error) {
      console.error("Error updating application:", error);
      throw error;
    } finally {
      setIsSubmitting(false);
      setIsProcessingPayment(false); // Reset the processing flag
    }
  };

  // Handle payment cancellation or going back
  const handlePaymentCancel = () => {
    // Reset payment states and go back to review step
    setPaymentCompleted(false);
    setShowApplicationSuccess(false);
    prevStep();
  };

  // Reset flow completely
  const handleStartNewApplication = () => {
    setPaymentCompleted(false);
    setShowApplicationSuccess(false);
    setSubmittedApplication(null);
    setDraftApplication(null); // Clear draft application
    resetFlow();
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
            nextStep={handleProceedToPayment}
            prevStep={prevStep}
            isSubmitting={isSubmitting || isCreatingDraft}
            validationErrors={validationErrors}
            setValidationErrors={setValidationErrors}
          />
        );
      case 6:
        // For personal-accident insurance, payment is mandatory
        // Show payment component first, then success component after payment
        if (!paymentCompleted && !showApplicationSuccess) {
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
              applicationData={submittedApplication}
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
            Personal Accident Insurance
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

export default PersonalAccidentFlow;
