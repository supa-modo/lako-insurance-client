import React, { useState } from "react";
import AccidentTypeSelectionStep from "./AccidentTypeSelectionStep";
import PersonalDetailsForm from "../common/PersonalDetailsForm";
import DocumentUpload from "../common/DocumentUpload";
import PaymentConfirmation from "../common/PaymentConfirmation";
import PurchaseSuccess from "../common/PurchaseSuccess";
import AccidentPlanSelectionStep from "./AccidentPlanSelectionStep";

const PersonalAccidentFlow = ({ currentStep, formData, updateFormData, nextStep, prevStep, resetFlow }) => {
  const [isComplete, setIsComplete] = useState(false);

  // Handle completion of purchase
  const handleComplete = () => {
    setIsComplete(true);
  };

  // Determine which documents are required based on accident type
  const getRequiredDocuments = () => {
    switch (formData.accidentType) {
      case "student":
        return ["nationalId", "kraPin", "passportPhoto"];
      case "workplace":
        return ["nationalId", "kraPin", "proofOfAddress"];
      default:
        return ["nationalId", "kraPin"];
    }
  };

  // Render the current step
  const renderStep = () => {
    if (isComplete) {
      return <PurchaseSuccess formData={formData} />;
    }

    switch (currentStep) {
      case 1:
        return (
          <AccidentTypeSelectionStep
            formData={formData}
            updateFormData={updateFormData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case 2:
        return (
          <AccidentPlanSelectionStep
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
            requiredDocuments={getRequiredDocuments()}
          />
        );
      case 5:
        return (
          <PaymentConfirmation
            formData={formData}
            updateFormData={updateFormData}
            prevStep={prevStep}
            onComplete={handleComplete}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div>
      {/* Progress indicator */}
      {!isComplete && (
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold text-primary-600">Personal Accident Insurance</h3>
            <span className="text-sm font-medium text-slate-600">
              Step {currentStep} of 5
            </span>
          </div>
          
          <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary-600 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / 5) * 100}%` }}
            ></div>
          </div>
        </div>
      )}
      
      {renderStep()}
    </div>
  );
};

export default PersonalAccidentFlow;
