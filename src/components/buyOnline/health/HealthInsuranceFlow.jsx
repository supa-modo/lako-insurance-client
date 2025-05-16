import React, { useState } from "react";
import AgeInputStep from "./AgeInputStep";
import PlanSelectionStep from "./PlanSelectionStep";
import PersonalDetailsForm from "../common/PersonalDetailsForm";
import DocumentUpload from "../common/DocumentUpload";
import PaymentConfirmation from "../common/PaymentConfirmation";
import PurchaseSuccess from "../common/PurchaseSuccess";

const HealthInsuranceFlow = ({ currentStep, formData, updateFormData, nextStep, prevStep, resetFlow }) => {
  const [isComplete, setIsComplete] = useState(false);

  // Handle completion of purchase
  const handleComplete = () => {
    setIsComplete(true);
  };

  // Determine which documents are required based on cover type
  const getRequiredDocuments = () => {
    switch (formData.coverType) {
      case "seniors":
        return ["nationalId", "kraPin", "medicalReport"];
      case "adult":
      case "child":
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
          <AgeInputStep
            formData={formData}
            updateFormData={updateFormData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case 2:
        return (
          <PlanSelectionStep
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
            <h3 className="text-lg font-semibold text-primary-600">Health Insurance</h3>
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

export default HealthInsuranceFlow;
