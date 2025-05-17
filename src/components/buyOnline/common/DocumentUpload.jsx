import React, { useState } from "react";
import { motion } from "framer-motion";
import { TbChevronLeft, TbChevronRight, TbInfoCircle, TbUpload, TbFile, TbTrash, TbCheck } from "react-icons/tb";

const DocumentUpload = ({ formData, updateFormData, nextStep, prevStep, requiredDocuments = ["nationalId", "kraPin"] }) => {
  const [dragActive, setDragActive] = useState(null);
  
  const documentLabels = {
    nationalId: "National ID",
    kraPin: "KRA Pin Certificate",
    medicalReport: "Medical Report",
    passportPhoto: "Passport Photo",
    proofOfAddress: "Proof of Address"
  };

  const handleDrag = (e, documentType) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(documentType);
    } else if (e.type === "dragleave") {
      setDragActive(null);
    }
  };

  const handleDrop = (e, documentType) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(null);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0], documentType);
    }
  };

  const handleChange = (e, documentType) => {
    e.preventDefault();
    
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0], documentType);
    }
  };

  const handleFile = (file, documentType) => {
    // For demo purposes, just store the file name and create a URL
    // In a real implementation, you would handle file upload to server
    updateFormData(`documents.${documentType}`, {
      name: file.name,
      size: file.size,
      type: file.type,
      url: URL.createObjectURL(file)
    });
  };

  const removeFile = (documentType) => {
    updateFormData(`documents.${documentType}`, null);
  };

  const isFormValid = () => {
    return requiredDocuments.every(doc => formData.documents[doc] !== null);
  };

  const renderDocumentUploader = (documentType) => {
    const document = formData.documents[documentType];
    const isRequired = requiredDocuments.includes(documentType);
    
    return (
      <div className="mb-6">
        <label className="block text-sm font-medium text-slate-700 mb-2">
          {documentLabels[documentType]} {isRequired && <span className="text-red-500">*</span>}
        </label>
        
        {!document ? (
          <div
            className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center transition-all ${
              dragActive === documentType
                ? "border-primary-500 bg-primary-50"
                : "border-slate-300 hover:border-primary-400 hover:bg-slate-50"
            }`}
            onDragEnter={(e) => handleDrag(e, documentType)}
            onDragLeave={(e) => handleDrag(e, documentType)}
            onDragOver={(e) => handleDrag(e, documentType)}
            onDrop={(e) => handleDrop(e, documentType)}
          >
            <TbUpload className="h-10 w-10 text-slate-400 mb-3" />
            <p className="text-sm text-slate-600 text-center mb-2">
              Drag & drop your file here, or{" "}
              <label className="text-secondary-600 font-medium underline underline-offset-4 hover:text-primary-700 cursor-pointer">
                browse
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => handleChange(e, documentType)}
                  accept=".pdf,.jpg,.jpeg,.png"
                />
              </label>
            </p>
            <p className="text-xs text-slate-500 text-center">
              Supported formats: PDF, JPG, PNG (Max size: 5MB)
            </p>
          </div>
        ) : (
          <div className="border rounded-lg p-4 bg-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center mr-3">
                  <TbFile className="h-5 w-5 text-primary-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-700 truncate max-w-[14rem]">
                    {document.name}
                  </p>
                  <p className="text-xs text-slate-500">
                    {(document.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center mr-2">
                  <TbCheck className="h-5 w-5 text-green-600" />
                </div>
                <button
                  type="button"
                  onClick={() => removeFile(documentType)}
                  className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center hover:bg-red-200 transition-colors"
                >
                  <TbTrash className="h-5 w-5 text-red-600" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div>
      <h2 className="text-xl md:text-2xl font-bold text-primary-600 mb-4">Document Upload</h2>
      
      <p className="text-slate-600 text-[0.9rem] md:text-[1.1rem] mb-6">
        Please upload the required documents to complete your insurance application.
      </p>

      <div className="mt-6 px-2 py-3 md:p-4 bg-primary-50 border border-primary-100 rounded-lg flex items-start mb-8">
        <TbInfoCircle className="text-primary-600 h-6 w-6 mt-0.5 mr-3 flex-shrink-0" />
        <div>
          <p className="text-primary-700 text-sm">
            All documents should be clear, legible, and in PDF, JPG, or PNG format. Maximum file size is 5MB per document.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
        {requiredDocuments.map(doc => (
          <div key={doc} className={doc === "medicalReport" ? "md:col-span-2" : ""}>
            {renderDocumentUploader(doc)}
          </div>
        ))}
      </div>

      <div className="flex justify-between mt-8">
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={prevStep}
          className="px-6 py-3 border-2 border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg flex items-center transition-all duration-200 font-medium"
        >
          <TbChevronLeft className="mr-2" />
          Back
        </motion.button>

        <motion.button
          whileHover={isFormValid() ? { scale: 1.03 } : {}}
          whileTap={isFormValid() ? { scale: 0.97 } : {}}
          onClick={nextStep}
          className={`px-8 py-3 rounded-lg flex items-center transition-all duration-200 font-medium shadow-md ${
            isFormValid()
              ? "bg-primary-600 hover:bg-primary-700 text-white"
              : "bg-slate-200 text-slate-400 cursor-not-allowed"
          }`}
          disabled={!isFormValid()}
        >
          Continue
          <TbChevronRight className="ml-2" />
        </motion.button>
      </div>
    </div>
  );
};

export default DocumentUpload;
