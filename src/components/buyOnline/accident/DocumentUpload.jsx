import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  TbChevronLeft,
  TbChevronRight,
  TbUpload,
  TbFile,
  TbTrash,
  TbCheck,
  TbAlertCircle,
  TbDownload,
  TbEye,
  TbFolderOpen,
  TbFileCheck,
} from "react-icons/tb";
import { FaEye } from "react-icons/fa6";

const DocumentUpload = ({ formData, updateFormData, nextStep, prevStep }) => {
  const [uploadedFiles, setUploadedFiles] = useState(formData.documents || {});
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});
  const fileInputRefs = useRef({});

  // Effect to handle external updates to formData.documents (like reset)
  useEffect(() => {
    if (formData.documents !== uploadedFiles) {
      // Clean up existing file previews before updating
      Object.values(uploadedFiles).forEach((fileData) => {
        if (fileData?.preview) {
          URL.revokeObjectURL(fileData.preview);
        }
      });

      // Update state with new documents (could be empty object for reset)
      setUploadedFiles(formData.documents || {});

      // Clear file inputs when reset
      if (!formData.documents || Object.keys(formData.documents).length === 0) {
        Object.values(fileInputRefs.current).forEach((input) => {
          if (input) {
            input.value = "";
          }
        });
      }
    }
  }, [formData.documents]);

  // Cleanup effect for component unmount
  useEffect(() => {
    return () => {
      // Clean up all object URLs when component unmounts
      Object.values(uploadedFiles).forEach((fileData) => {
        if (fileData?.preview) {
          URL.revokeObjectURL(fileData.preview);
        }
      });
    };
  }, []);

  const documentTypes = [
    {
      id: "national_id",
      name: "Upload ID/Passport",
      required: true,
      description: "Clear copy of your National ID or Passport",
      acceptedFormats: "PDF, JPEG, PNG",
      maxSize: "5MB",
    },
    {
      id: "kra_pin",
      name: "Upload KRA Pin",
      required: true,
      description: "KRA PIN certificate or document",
      acceptedFormats: "PDF, JPEG, PNG",
      maxSize: "5MB",
    },
    {
      id: "attachment_letter",
      name: "Upload Internship/Attachment Letter",
      required: false,
      description: "Letter from institution (for students) or employer",
      acceptedFormats: "PDF, JPEG, PNG",
      maxSize: "5MB",
    },
    {
      id: "other",
      name: "Upload Other Documents",
      required: false,
      description: "Any additional supporting documents",
      acceptedFormats: "PDF, JPEG, PNG",
      maxSize: "5MB",
    },
  ];

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e, documentType) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0], documentType);
    }
  };

  const handleFileSelect = (e, documentType) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0], documentType);
    }
  };

  const validateFile = (file) => {
    const maxSize = 5 * 1024 * 1024; // 5MB
    const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];

    if (file.size > maxSize) {
      return "File size must be less than 5MB";
    }

    if (!allowedTypes.includes(file.type)) {
      return "Only PDF, JPEG, and PNG files are allowed";
    }

    return null;
  };

  const handleFileUpload = async (file, documentType) => {
    const error = validateFile(file);
    if (error) {
      alert(error);
      return;
    }

    // Simulate upload progress
    setUploadProgress((prev) => ({ ...prev, [documentType]: 0 }));

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        const newProgress = (prev[documentType] || 0) + 10;
        if (newProgress >= 100) {
          clearInterval(interval);

          // Create a preview URL for the file
          const fileData = {
            file: file,
            name: file.name,
            size: file.size,
            type: file.type,
            uploadedAt: new Date().toISOString(),
            preview: URL.createObjectURL(file),
          };

          const newUploadedFiles = {
            ...uploadedFiles,
            [documentType]: fileData,
          };

          setUploadedFiles(newUploadedFiles);
          updateFormData("documents", newUploadedFiles);

          return { ...prev, [documentType]: 100 };
        }
        return { ...prev, [documentType]: newProgress };
      });
    }, 100);
  };

  const removeFile = (documentType) => {
    const newUploadedFiles = { ...uploadedFiles };

    // Revoke the object URL to free memory
    if (newUploadedFiles[documentType]?.preview) {
      URL.revokeObjectURL(newUploadedFiles[documentType].preview);
    }

    delete newUploadedFiles[documentType];
    setUploadedFiles(newUploadedFiles);
    updateFormData("documents", newUploadedFiles);

    // Remove upload progress
    setUploadProgress((prev) => {
      const newProgress = { ...prev };
      delete newProgress[documentType];
      return newProgress;
    });

    // Clear the file input
    if (fileInputRefs.current[documentType]) {
      fileInputRefs.current[documentType].value = "";
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const canContinue = () => {
    const requiredDocs = documentTypes.filter((doc) => doc.required);
    return requiredDocs.every((doc) => uploadedFiles[doc.id]);
  };

  const handleContinue = () => {
    if (canContinue()) {
      nextStep();
    }
  };

  const previewFile = (file) => {
    if (file.type.startsWith("image/")) {
      // For images, open in a new window
      window.open(file.preview, "_blank");
    } else {
      // For PDFs and other files, trigger download
      const link = document.createElement("a");
      link.href = file.preview;
      link.download = file.name;
      link.click();
    }
  };

  return (
    <div className="space-y-5 md:space-y-8">
      <div className="text-center mb-8">
        <h3 className="flex items-center justify-center text-lg md:text-xl lg:text-2xl font-bold text-primary-700/90 mb-2">
          <span className="block lg:hidden mr-1">4.</span>{" "}
          <span className="">Upload Required Documents</span>
        </h3>
        <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto">
          Please upload the required documents to complete your application. All
          files must be in PDF, JPEG, or PNG format and under 5MB.
        </p>
      </div>

      <div className="space-y-6">
        {documentTypes.map((docType) => (
          <motion.div
            key={docType.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="border-b pb-4 lg:border border-gray-200 lg:rounded-xl lg:p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <h4 className="text-base md:text-lg font-semibold text-secondary-600">
                    {docType.name}
                  </h4>
                  {docType.required && (
                    <span className="ml-2 text-red-500 text-sm">*</span>
                  )}
                  {uploadedFiles[docType.id] && (
                    <TbFileCheck className="ml-2 w-5 h-5 text-green-600" />
                  )}
                </div>
                <p className="text-sm text-gray-600 mb-1">
                  {docType.description}
                </p>
                <p className="text-xs text-gray-500">
                  Accepted formats: {docType.acceptedFormats} • Max size:{" "}
                  {docType.maxSize}
                </p>
              </div>
            </div>

            {!uploadedFiles[docType.id] ? (
              <div
                className={`border-2 border-dashed rounded-xl p-6 text-center transition-colors ${
                  dragActive
                    ? "border-primary-500 bg-primary-50"
                    : "border-gray-300 hover:border-primary-400"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={(e) => handleDrop(e, docType.id)}
              >
                <input
                  ref={(el) => (fileInputRefs.current[docType.id] = el)}
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => handleFileSelect(e, docType.id)}
                  className="hidden"
                />

                {uploadProgress[docType.id] > 0 &&
                uploadProgress[docType.id] < 100 ? (
                  <div className="space-y-3">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto">
                      <TbUpload className="w-6 h-6 text-primary-600 animate-bounce" />
                    </div>
                    <div>
                      <p className="text-gray-700 font-medium">Uploading...</p>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                        <div
                          className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${uploadProgress[docType.id]}%` }}
                        ></div>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        {uploadProgress[docType.id]}%
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <TbUpload className="w-8 md:w-12 h-8 md:h-12 text-gray-400 mx-auto" />
                    <div>
                      <p className="text-gray-600 text-sm md:text-base mb-2">
                        Drag and drop your file here, or{" "}
                        <button
                          type="button"
                          onClick={() =>
                            fileInputRefs.current[docType.id]?.click()
                          }
                          className="text-primary-600 hover:text-primary-700 font-medium underline underline-offset-4"
                        >
                          browse
                        </button>
                      </p>
                      <p className="text-xs text-gray-500">
                        {docType.acceptedFormats} up to {docType.maxSize}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                      <TbFile className="w-5 h-5 text-primary-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 max-w-[250px] md:max-w-[300px] lg:max-w-none truncate">
                        {uploadedFiles[docType.id].name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatFileSize(uploadedFiles[docType.id].size)} •
                        Uploaded{" "}
                        {new Date(
                          uploadedFiles[docType.id].uploadedAt
                        ).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center md:space-x-2">
                    <button
                      type="button"
                      onClick={() => previewFile(uploadedFiles[docType.id])}
                      className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                      title="Preview file"
                    >
                      <span className="hidden md:block text-sm text-primary-600 underline underline-offset-2">
                        Preview
                      </span>
                      <TbFolderOpen className="w-5 h-5 md:hidden" />
                    </button>
                    <button
                      type="button"
                      onClick={() => removeFile(docType.id)}
                      className="p-2 text-red-500 hover:text-red-700 transition-colors"
                      title="Remove file"
                    >
                      <TbTrash className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Requirements Check */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h5 className="text-sm font-medium text-gray-900 mb-3">
          Upload Requirements:
        </h5>
        <div className="space-y-2">
          {documentTypes
            .filter((doc) => doc.required)
            .map((doc) => (
              <div key={doc.id} className="flex items-center text-sm">
                {uploadedFiles[doc.id] ? (
                  <TbCheck className="w-4 h-4 text-green-500 mr-2" />
                ) : (
                  <div className="w-4 h-4 border border-gray-300 rounded mr-2"></div>
                )}
                <span
                  className={
                    uploadedFiles[doc.id] ? "text-green-700" : "text-gray-600"
                  }
                >
                  {doc.name}
                </span>
              </div>
            ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center pt-6 border-t border-gray-200">
        <button
          onClick={prevStep}
          className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <TbChevronLeft className="w-4 h-4 mr-2" />
          Back
        </button>

        <button
          onClick={handleContinue}
          disabled={!canContinue()}
          className={`flex items-center px-6 py-2 rounded-lg font-medium transition-colors ${
            canContinue()
              ? "bg-primary-600 text-white hover:bg-primary-700"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Continue
          <TbChevronRight className="w-4 h-4 ml-2" />
        </button>
      </div>

      {!canContinue() && (
        <div className="text-center">
          <p className="text-sm text-red-600">
            Please upload all required documents to continue
          </p>
        </div>
      )}
    </div>
  );
};

export default DocumentUpload;
