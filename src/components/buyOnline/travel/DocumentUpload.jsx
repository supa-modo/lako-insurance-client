import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  TbUpload,
  TbFileText,
  TbCheck,
  TbX,
  TbArrowLeft,
  TbArrowRight,
  TbAlertCircle,
  TbEye,
  TbTrash,
  TbId,
  TbCamera,
} from "react-icons/tb";
import { FaPassport } from "react-icons/fa6";

const DocumentUpload = ({ formData, updateFormData, nextStep, prevStep }) => {
  const [dragOver, setDragOver] = useState(null);
  const [uploadProgress, setUploadProgress] = useState({});

  const requiredDocuments = [
    {
      id: "passport",
      title: "Passport Copy",
      description: "Clear copy of your passport bio-data page",
      icon: <FaPassport className="w-6 h-6" />,
      required: true,
      acceptedFormats: "PDF, JPG, PNG",
      maxSize: "5MB",
    },
    {
      id: "nationalId",
      title: "National ID Copy",
      description: "Copy of your national ID (front and back)",
      icon: <TbId className="w-6 h-6" />,
      required: true,
      acceptedFormats: "PDF, JPG, PNG",
      maxSize: "5MB",
    },
    {
      id: "passportPhoto",
      title: "Passport Size Photo",
      description: "Recent passport size photograph",
      icon: <TbCamera className="w-6 h-6" />,
      required: true,
      acceptedFormats: "JPG, PNG",
      maxSize: "2MB",
    },
  ];

  const handleFileUpload = (documentId, files) => {
    const file = files[0];
    if (!file) return;

    // Validate file size
    const maxSize =
      documentId === "passportPhoto" ? 2 * 1024 * 1024 : 5 * 1024 * 1024; // 2MB for photo, 5MB for others
    if (file.size > maxSize) {
      alert(
        `File size must be less than ${
          documentId === "passportPhoto" ? "2MB" : "5MB"
        }`
      );
      return;
    }

    // Validate file type
    const allowedTypes =
      documentId === "passportPhoto"
        ? ["image/jpeg", "image/png"]
        : ["image/jpeg", "image/png", "application/pdf"];

    if (!allowedTypes.includes(file.type)) {
      alert("Please upload a valid file format (PDF, JPG, or PNG)");
      return;
    }

    // Simulate upload progress
    setUploadProgress((prev) => ({ ...prev, [documentId]: 0 }));

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        const newProgress = (prev[documentId] || 0) + 10;
        if (newProgress >= 100) {
          clearInterval(interval);

          // Create file data object
          const fileData = {
            file: file,
            name: file.name,
            size: file.size,
            type: file.type,
            url: URL.createObjectURL(file),
            uploadedAt: new Date().toISOString(),
          };

          // Update form data
          const currentDocuments = formData.documents || {};
          updateFormData("documents", {
            ...currentDocuments,
            [documentId]: fileData,
          });

          return { ...prev, [documentId]: 100 };
        }
        return { ...prev, [documentId]: newProgress };
      });
    }, 100);
  };

  const handleDragOver = (e, documentId) => {
    e.preventDefault();
    setDragOver(documentId);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(null);
  };

  const handleDrop = (e, documentId) => {
    e.preventDefault();
    setDragOver(null);
    const files = Array.from(e.dataTransfer.files);
    handleFileUpload(documentId, files);
  };

  const removeDocument = (documentId) => {
    const currentDocuments = formData.documents || {};
    const newDocuments = { ...currentDocuments };

    // Revoke the URL to prevent memory leaks
    if (newDocuments[documentId]?.url) {
      URL.revokeObjectURL(newDocuments[documentId].url);
    }

    delete newDocuments[documentId];
    updateFormData("documents", newDocuments);

    // Remove upload progress
    setUploadProgress((prev) => {
      const newProgress = { ...prev };
      delete newProgress[documentId];
      return newProgress;
    });
  };

  const viewDocument = (documentId) => {
    const document = formData.documents?.[documentId];
    if (document?.url) {
      window.open(document.url, "_blank");
    }
  };

  const validateDocuments = () => {
    const uploadedDocs = formData.documents || {};
    const missingRequired = requiredDocuments
      .filter((doc) => doc.required && !uploadedDocs[doc.id])
      .map((doc) => doc.title);

    return missingRequired.length === 0;
  };

  const handleNext = () => {
    if (validateDocuments()) {
      nextStep();
    } else {
      alert("Please upload all required documents before continuing.");
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <div className="text-center mb-8">
          <h3 className="flex items-center justify-center text-lg md:text-xl lg:text-2xl font-bold text-primary-700/90 mb-3">
            <span className="block lg:hidden mr-1">5.</span>
            <TbUpload className="w-6 h-6 md:w-7 md:h-7 mr-2" />
            Upload Documents
          </h3>
          <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto">
            Upload the required documents for your travel insurance application.
            All documents should be clear and legible.
          </p>
        </div>

        <div className="space-y-6">
          {requiredDocuments.map((document) => {
            const uploadedDoc = formData.documents?.[document.id];
            const progress = uploadProgress[document.id];
            const isUploaded = uploadedDoc && progress === 100;
            const isUploading = progress > 0 && progress < 100;

            return (
              <motion.div
                key={document.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white border border-gray-200 rounded-lg p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mr-4">
                      {document.icon}
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800 mb-1">
                        {document.title}
                        {document.required && (
                          <span className="text-red-500 ml-1">*</span>
                        )}
                      </h4>
                      <p className="text-gray-600 text-sm mb-2">
                        {document.description}
                      </p>
                      <div className="text-xs text-gray-500">
                        Accepted: {document.acceptedFormats} • Max size:{" "}
                        {document.maxSize}
                      </div>
                    </div>
                  </div>

                  {isUploaded && (
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => viewDocument(document.id)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="View document"
                      >
                        <TbEye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => removeDocument(document.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Remove document"
                      >
                        <TbTrash className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Upload Area */}
                {!isUploaded && (
                  <div
                    className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                      dragOver === document.id
                        ? "border-primary-400 bg-primary-50"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                    onDragOver={(e) => handleDragOver(e, document.id)}
                    onDragLeave={handleDragLeave}
                    onDrop={(e) => handleDrop(e, document.id)}
                  >
                    {isUploading ? (
                      <div className="space-y-3">
                        <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto">
                          <TbUpload className="w-6 h-6 text-primary-600 animate-bounce" />
                        </div>
                        <div>
                          <p className="text-gray-700 font-medium">
                            Uploading...
                          </p>
                          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                            <div
                              className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${progress}%` }}
                            ></div>
                          </div>
                          <p className="text-sm text-gray-500 mt-1">
                            {progress}%
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                          <TbUpload className="w-6 h-6 text-gray-400" />
                        </div>
                        <div>
                          <p className="text-gray-700 font-medium">
                            Drag and drop your file here, or{" "}
                            <label className="text-primary-600 cursor-pointer hover:underline">
                              browse
                              <input
                                type="file"
                                className="hidden"
                                accept={
                                  document.id === "passportPhoto"
                                    ? "image/*"
                                    : "image/*,application/pdf"
                                }
                                onChange={(e) =>
                                  handleFileUpload(document.id, e.target.files)
                                }
                              />
                            </label>
                          </p>
                          <p className="text-sm text-gray-500">
                            {document.acceptedFormats} • Max {document.maxSize}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Uploaded File Info */}
                {isUploaded && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                        <TbCheck className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium text-green-800">
                          {uploadedDoc.name}
                        </p>
                        <p className="text-sm text-green-600">
                          {formatFileSize(uploadedDoc.size)} • Uploaded
                          successfully
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Important Information */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-8"
        >
          <div className="flex items-start">
            <TbAlertCircle className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
            <div>
              <h4 className="font-semibold text-blue-800 mb-1">
                Document Requirements
              </h4>
              <ul className="text-blue-700 text-sm space-y-1">
                <li>• All documents must be clear, legible, and in color</li>
                <li>
                  • Passport must be valid for at least 6 months from travel
                  date
                </li>
                <li>
                  • Documents should match the personal information provided
                </li>
                <li>
                  • Files will be securely stored and used only for policy
                  processing
                </li>
                <li>• You can update documents later if needed</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8">
          <button
            onClick={prevStep}
            className="flex items-center px-6 py-3 text-gray-600 hover:text-gray-800 font-medium transition-colors"
          >
            <TbArrowLeft className="w-5 h-5 mr-2" />
            Back
          </button>

          <button
            onClick={handleNext}
            className={`flex items-center px-8 py-3 rounded-lg font-semibold transition-all ${
              validateDocuments()
                ? "bg-primary-600 hover:bg-primary-700 text-white shadow-lg hover:shadow-xl"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Continue
            <TbArrowRight className="w-5 h-5 ml-2" />
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default DocumentUpload;
