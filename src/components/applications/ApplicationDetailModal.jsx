import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  TbX,
  TbShield,
  TbUser,
  TbMail,
  TbPhone,
  TbCalendar,
  TbMapPin,
  TbSchool,
  TbId,
  TbUsers,
  TbFileText,
  TbCurrencyDollar,
  TbCalendarTime,
  TbCheck,
  TbAlertCircle,
  TbEdit,
  TbTrash,
  TbDownload,
  TbFile,
  TbHistory,
  TbLoader,
  TbClipboard,
  TbBuilding,
  TbHeart,
  TbUserCheck,
  TbMedicalCross,
  TbClock,
  TbExternalLink,
  TbEye,
  TbStethoscope,
  TbPhoneCall,
  TbMailFilled,
  TbInfoCircle,
  TbFileCheck,
  TbFileDownload,
  TbLoader2,
  TbFolderOpen,
  TbCoins,
  TbBuildingBank,
} from "react-icons/tb";
import { PiUserDuotone, PiUsersDuotone } from "react-icons/pi";
import applicationService from "../../services/applicationService";
import { useToast } from "../../hooks/useToast";
import ToastContainer from "../../components/ui/ToastContainer";

const ApplicationDetailModal = ({ application, onClose }) => {
  const { toasts, toast, removeToast } = useToast();
  const [documents, setDocuments] = useState([]);
  const [loadingDocuments, setLoadingDocuments] = useState(false);
  const [downloadingDoc, setDownloadingDoc] = useState(null);

  // Fetch application documents
  useEffect(() => {
    if (application && application.id) {
      fetchDocuments(application.id);
    }
  }, [application]);

  const fetchDocuments = async (applicationId) => {
    setLoadingDocuments(true);
    try {
      const response = await applicationService.getApplicationDocuments(
        applicationId
      );
      if (response.success) {
        setDocuments(response.data);
      } else {
        console.error("Failed to fetch documents:", response.message);
        setDocuments([]);
      }
    } catch (error) {
      console.error("Error fetching documents:", error);
      setDocuments([]);
    } finally {
      setLoadingDocuments(false);
    }
  };

  const handleDownloadDocument = async (documentId, fileName) => {
    setDownloadingDoc(documentId);
    try {
      const blob = await applicationService.downloadDocument(documentId);

      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast.success("Document downloaded successfully!");
    } catch (error) {
      console.error("Error downloading document:", error);
      toast.error("Failed to download document. Please try again.");
    } finally {
      setDownloadingDoc(null);
    }
  };

  const handlePreviewDocument = async (documentId, fileName, mimeType) => {
    try {
      const blob = await applicationService.downloadDocument(documentId);

      // For images and PDFs, open in new tab
      if (mimeType.startsWith("image/") || mimeType === "application/pdf") {
        const url = window.URL.createObjectURL(blob);
        window.open(url, "_blank");
        // Clean up URL after a delay
        setTimeout(() => window.URL.revokeObjectURL(url), 1000);
      } else {
        // For other file types, trigger download
        handleDownloadDocument(documentId, fileName);
      }
    } catch (error) {
      console.error("Error previewing document:", error);
      toast.error(
        "Failed to preview document. Please try downloading instead."
      );
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Not provided";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return "Not provided";
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "submitted":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "under_review":
        return "bg-yellow-50 text-yellow-700 border-yellow-200";
      case "approved":
        return "bg-green-50 text-green-700 border-green-200";
      case "rejected":
        return "bg-red-50 text-red-700 border-red-200";
      case "cancelled":
        return "bg-gray-50 text-gray-700 border-gray-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "submitted":
        return <TbClipboard className="w-4 h-4" />;
      case "under_review":
        return <TbEye className="w-4 h-4" />;
      case "approved":
        return <TbCheck className="w-4 h-4" />;
      case "rejected":
        return <TbX className="w-4 h-4" />;
      case "cancelled":
        return <TbX className="w-4 h-4" />;
      default:
        return <TbClipboard className="w-4 h-4" />;
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const getDocumentTypeIcon = (documentType) => {
    switch (documentType?.toLowerCase()) {
      case "national_id":
      case "id":
        return <TbId className="h-5 w-5 text-blue-600" />;
      case "kra_pin":
      case "kra":
        return <TbFileText className="h-5 w-5 text-green-600" />;
      case "medical_report":
      case "medical":
        return <TbMedicalCross className="h-5 w-5 text-red-600" />;
      case "passport_photo":
      case "photo":
        return <TbUser className="h-5 w-5 text-purple-600" />;
      default:
        return <TbFile className="h-5 w-5 text-gray-600" />;
    }
  };

  const getDocumentTypeColor = (documentType) => {
    switch (documentType?.toLowerCase()) {
      case "national_id":
      case "id":
        return "bg-blue-100 border-blue-200";
      case "kra_pin":
      case "kra":
        return "bg-green-100 border-green-200";
      case "medical_report":
      case "medical":
        return "bg-red-100 border-red-200";
      case "passport_photo":
      case "photo":
        return "bg-purple-100 border-purple-200";
      default:
        return "bg-gray-100 border-gray-200";
    }
  };

  if (!application) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-[1.5px] flex items-start justify-end z-50 p-3 font-outfit"
      onClick={handleBackdropClick}
    >
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="w-[750px] h-[calc(100vh-24px)] bg-white shadow-2xl overflow-hidden rounded-xl border border-gray-200"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-700 to-primary-600 px-6 py-4 relative">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-white/10 blur-xl"></div>
            <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-white/10 blur-xl"></div>
          </div>
          <div className="relative flex justify-between items-center z-10">
            <div className="flex items-center">
              <TbEye className="h-6 w-6 text-white mr-3" />
              <div>
                <h2 className="text-white font-semibold text-lg font-lexend">
                  Application Details
                </h2>
                <p className="text-white/80 text-sm">
                  {application.firstName} {application.lastName} •{" "}
                  {application.applicationNumber}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div
                className={`inline-flex px-3 py-1.5 text-sm font-medium rounded-lg border capitalize ${getStatusColor(
                  application.status
                )}`}
              >
                {getStatusIcon(application.status)}
                <span className="ml-1.5">
                  {application.status?.replace("_", " ")}
                </span>
              </div>
              <button
                onClick={onClose}
                className="text-white/80 hover:text-white transition-colors rounded-full p-1 hover:bg-white/10"
              >
                <TbX className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col h-[calc(100vh-120px)] md:h-[calc(100vh-100px)]">
          <div className="overflow-y-auto flex-1 px-3 md:px-6 py-5">
            <div className="space-y-6">
              {/* Application Overview Card */}
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <h3 className=" font-semibold text-secondary-700 mb-4">
                  Application Overview
                </h3>

                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 text-gray-600">
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm text-neutral-700 font-medium">
                        Application Number
                      </p>
                      <p className="font-semibold text-gray-600">
                        {application.applicationNumber}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-semibold capitalize text-primary-600">
                        {application.insuranceType?.replace("-", " ")}
                      </p>
                      <p className="font-semibold capitalize">
                        {application.coverType || "Not specified"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm text-neutral-700 font-medium">
                        Submitted
                      </p>
                      <p className="font-semibold text-[0.95rem] text-gray-600">
                        {formatDateTime(application.createdAt)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Policy Details Card */}
                {(application.policyStartDate ||
                  application.premiumAmount ||
                  application.insuranceProvider) && (
                  <div className="mt-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {application.insuranceProvider && (
                        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 text-gray-400">
                          <div className="flex items-center mb-2">
                            <p className="text-sm text-neutral-700 font-medium">
                              {application.selectedPlan?.name}
                            </p>
                          </div>
                          <p className="font-semibold text-[0.95rem] text-gray-600">
                            {application.insuranceProvider}
                          </p>
                        </div>
                      )}
                      {application.policyStartDate && (
                        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 text-gray-400">
                          <div className="flex items-center mb-2">
                            <TbCalendar size={18} className=" mr-2" />
                            <p className="text-sm text-neutral-700 font-medium">
                              Policy Start Date
                            </p>
                          </div>
                          <p className="font-semibold text-[0.95rem] text-gray-600">
                            {formatDate(application.policyStartDate)}
                          </p>
                        </div>
                      )}

                      {application.premiumAmount && (
                        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 text-gray-400">
                          <div className="flex items-center mb-2">
                            <TbCoins size={18} className=" mr-2" />
                            <p className="text-sm text-neutral-700 font-medium">
                              Premium Amount
                            </p>
                          </div>
                          <p className="font-semibold text-[0.95rem] text-gray-600">
                            KSH{" "}
                            {Number(application.premiumAmount).toLocaleString()}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Applicant details Card */}
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <h3 className=" font-semibold text-secondary-700 mb-4 ">
                  Applicant Details
                </h3>

                <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                  <div>
                    <p className="text-sm text-neutral-700 font-medium mb-1">
                      Full Name
                    </p>
                    <p className="font-semibold text-gray-600">
                      {[
                        application.firstName,
                        application.middleName,
                        application.lastName,
                      ]
                        .filter(Boolean)
                        .join(" ")}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-neutral-700 font-medium mb-1">
                      ID Number
                    </p>
                    <p className="font-semibold text-gray-600">
                      {application.idNumber}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-neutral-700 font-medium mb-1">
                      Gender
                    </p>
                    <p className="font-semibold text-gray-600 capitalize">
                      {application.gender || "Not specified"}
                    </p>
                  </div>

                  {application.kraPin && (
                    <div>
                      <p className="text-sm text-neutral-700 font-medium mb-1">
                        KRA PIN
                      </p>
                      <p className="font-semibold text-gray-600">
                        {application.kraPin}
                      </p>
                    </div>
                  )}

                  <div>
                    <p className="text-sm text-neutral-700 font-medium mb-1">
                      Email Address
                    </p>
                    <a
                      href={`mailto:${application.emailAddress}`}
                      className="font-semibold text-gray-600 hover:text-gray-700 transition-colors "
                    >
                      <span className="flex items-center">
                        {application.emailAddress}{" "}
                        <TbExternalLink className=" ml-1.5 w-4 h-4" />
                      </span>
                    </a>
                  </div>

                  <div>
                    <p className="text-sm text-neutral-700 font-medium mb-1">
                      Mobile Number
                    </p>
                    <a
                      href={`tel:${application.mobileNumber}`}
                      className="font-semibold text-gray-600 hover:text-gray-700 transition-colors "
                    >
                      <span className="flex items-center">
                        {application.mobileNumber}{" "}
                        <TbExternalLink className=" ml-1.5 w-4 h-4" />
                      </span>
                    </a>
                  </div>

                  <div>
                    <p className="text-sm text-neutral-700 font-medium mb-1">
                      Date of Birth
                    </p>
                    <p className="font-semibold text-gray-600">
                      {formatDate(application.dateOfBirth)}
                    </p>
                  </div>

                  {application.postalAddress && (
                    <div>
                      <p className="text-sm text-neutral-700 font-medium mb-1">
                        Postal Address
                      </p>
                      <p className="font-semibold text-gray-600">
                        {application.postalAddress}
                      </p>
                    </div>
                  )}

                  {application.town && (
                    <div>
                      <p className="text-sm text-neutral-700 font-medium mb-1">
                        Town/City
                      </p>
                      <p className="font-semibold text-gray-600">
                        {application.town}
                      </p>
                    </div>
                  )}

                  {application.universityCollegeSchool ? (
                    <div>
                      <p className="text-sm text-neutral-700 font-medium mb-1">
                        Institution
                      </p>
                      <p className="font-semibold text-gray-600 flex items-center">
                        <TbSchool className="h-4 w-4 mr-2 text-blue-600" />
                        {application.universityCollegeSchool}
                      </p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-sm text-neutral-700 font-medium mb-1">
                        ---
                      </p>
                    </div>
                  )}
                </div>

                {/* Emergency contacts and beneficiaries Card */}
                <div className="pt-6">
                  <h3 className=" font-semibold text-secondary-700 mb-3 ">
                    Emergency Contacts & Beneficiaries
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <span className="text-sm text-neutral-700 font-medium mb-2 flex items-center">
                        <PiUserDuotone
                          size={18}
                          className=" text-gray-400 mr-2 flex-shrink-0"
                        />
                        Next of Kin
                      </span>
                      <div className="flex items-center justify-between">
                        <p className="font-semibold text-primary-600">
                          {application.nextOfKinName || "Not specified"}
                        </p>
                        <p className="text-sm font-medium text-gray-600">
                          {application.nextOfKinContacts || "Not specified"}
                        </p>
                      </div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <span className="text-sm text-neutral-700 font-medium mb-2 flex items-center">
                        <PiUserDuotone
                          size={18}
                          className=" text-gray-400 mr-2 flex-shrink-0"
                        />
                        Beneficiary
                      </span>

                      <div className="flex items-center justify-between">
                        <p className="font-semibold text-primary-600">
                          {application.beneficiaryName || "Not specified"}
                        </p>
                        <p className="text-sm font-medium text-gray-600">
                          {application.beneficiaryContacts || "Not specified"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Medical History Card */}
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <h3 className="font-semibold text-secondary-700 mb-4 ">
                  Medical History
                </h3>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div
                      className={`p-3 rounded-lg border ${
                        application.previousAccidents
                          ? "bg-red-50 border-red-200"
                          : "bg-gray-50 border-gray-200"
                      }`}
                    >
                      <div className="flex items-center">
                        <div
                          className={`w-5 h-5 rounded border-2 mr-3 flex items-center justify-center ${
                            application.previousAccidents
                              ? "bg-red-500 border-red-500"
                              : "bg-gray-200 border-gray-300"
                          }`}
                        >
                          {application.previousAccidents && (
                            <TbCheck className="w-3 h-3 text-white" />
                          )}
                        </div>
                        <span
                          className={`text-sm font-medium ${
                            application.previousAccidents
                              ? "text-red-700"
                              : "text-gray-600"
                          }`}
                        >
                          Previous Accidents
                        </span>
                      </div>
                    </div>

                    <div
                      className={`p-3 rounded-lg border ${
                        application.physicalDisability
                          ? "bg-red-50 border-red-200"
                          : "bg-gray-50 border-gray-200"
                      }`}
                    >
                      <div className="flex items-center">
                        <div
                          className={`w-5 h-5 rounded border-2 mr-3 flex items-center justify-center ${
                            application.physicalDisability
                              ? "bg-red-500 border-red-500"
                              : "bg-gray-200 border-gray-300"
                          }`}
                        >
                          {application.physicalDisability && (
                            <TbCheck className="w-3 h-3 text-white" />
                          )}
                        </div>
                        <span
                          className={`text-sm font-medium ${
                            application.physicalDisability
                              ? "text-red-700"
                              : "text-gray-600"
                          }`}
                        >
                          Physical Disability
                        </span>
                      </div>
                    </div>

                    <div
                      className={`p-3 rounded-lg border ${
                        application.chronicIllness
                          ? "bg-red-50 border-red-200"
                          : "bg-gray-50 border-gray-200"
                      }`}
                    >
                      <div className="flex items-center">
                        <div
                          className={`w-5 h-5 rounded border-2 mr-3 flex items-center justify-center ${
                            application.chronicIllness
                              ? "bg-red-500 border-red-500"
                              : "bg-gray-200 border-gray-300"
                          }`}
                        >
                          {application.chronicIllness && (
                            <TbCheck className="w-3 h-3 text-white" />
                          )}
                        </div>
                        <span
                          className={`text-sm font-medium ${
                            application.chronicIllness
                              ? "text-red-700"
                              : "text-gray-600"
                          }`}
                        >
                          Chronic Illness
                        </span>
                      </div>
                    </div>
                  </div>

                  {application.medicalHistoryDetails && (
                    <div className="mt-4">
                      <p className="text-sm text-neutral-700 font-medium mb-2">
                        Medical History Details
                      </p>
                      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
                          {application.medicalHistoryDetails}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Documents Card */}
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-secondary-700 ">
                    Documents ({documents.length})
                  </h3>
                  {loadingDocuments && (
                    <div className="flex items-center text-sm text-gray-500">
                      <TbLoader className="h-4 w-4 animate-spin mr-2" />
                      Loading documents...
                    </div>
                  )}
                </div>

                {loadingDocuments ? (
                  <div className="text-center py-8">
                    <TbLoader className="h-8 w-8 animate-spin text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-500 font-medium">
                      Loading documents...
                    </p>
                  </div>
                ) : documents.length === 0 ? (
                  <div className="text-center py-8">
                    <TbFile className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500 font-medium">
                      No documents uploaded
                    </p>
                    <p className="text-sm text-gray-400">
                      Documents will appear here once uploaded
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {documents.map((doc) => (
                      <div
                        key={doc.id}
                        className={`p-4 rounded-lg border transition-all hover:shadow-md ${getDocumentTypeColor(
                          doc.documentType
                        )}`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-center space-x-3 flex-1">
                            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border">
                              {getDocumentTypeIcon(doc.documentType)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 max-w-[170px] truncate">
                                {doc.fileName}
                              </p>
                              <p className="text-xs text-gray-500">
                                {doc.documentType
                                  ?.replace("_", " ")
                                  .toUpperCase()}{" "}
                                • {formatFileSize(doc.fileSize)}
                              </p>
                              <p className="text-xs text-gray-400">
                                {formatDateTime(doc.uploadedAt)}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-1">
                            <button
                              onClick={() =>
                                handlePreviewDocument(
                                  doc.id,
                                  doc.fileName,
                                  doc.mimeType
                                )
                              }
                              disabled={downloadingDoc === doc.id}
                              className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                              title="Preview Document"
                            >
                              {downloadingDoc === doc.id ? (
                                <TbLoader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <TbFolderOpen className="h-4 w-4" />
                              )}
                            </button>
                            <button
                              onClick={() =>
                                handleDownloadDocument(doc.id, doc.fileName)
                              }
                              disabled={downloadingDoc === doc.id}
                              className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                              title="Download Document"
                            >
                              {downloadingDoc === doc.id ? (
                                <TbLoader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <TbDownload className="h-4 w-4" />
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Agent Information Card */}
              {application.isAgentPurchase &&
                (application.agentName ||
                  application.agentEmail ||
                  application.agentPhone) && (
                  <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <TbUsers className="h-5 w-5 mr-2 text-green-600" />
                      Agent Information
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {application.agentName && (
                        <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                          <div className="flex items-center mb-2">
                            <TbUser className="h-5 w-5 text-indigo-600 mr-2" />
                            <p className="text-sm text-indigo-700 font-medium">
                              Agent Name
                            </p>
                          </div>
                          <p className="font-semibold text-indigo-700">
                            {application.agentName}
                          </p>
                        </div>
                      )}

                      {application.agentEmail && (
                        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                          <div className="flex items-center mb-2">
                            <TbMail className="h-5 w-5 text-blue-600 mr-2" />
                            <p className="text-sm text-blue-700 font-medium">
                              Agent Email
                            </p>
                          </div>
                          <a
                            href={`mailto:${application.agentEmail}`}
                            className="font-semibold text-blue-700 hover:text-blue-800 transition-colors"
                          >
                            {application.agentEmail}
                          </a>
                        </div>
                      )}

                      {application.agentPhone && (
                        <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                          <div className="flex items-center mb-2">
                            <TbPhone className="h-5 w-5 text-green-600 mr-2" />
                            <p className="text-sm text-green-700 font-medium">
                              Agent Phone
                            </p>
                          </div>
                          <a
                            href={`tel:${application.agentPhone}`}
                            className="font-semibold text-green-700 hover:text-green-800 transition-colors"
                          >
                            {application.agentPhone}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                )}

              {/* Application Timeline Card */}
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <TbHistory className="h-5 w-5 mr-2 text-green-600" />
                  Application Timeline
                </h3>

                <div className="space-y-4">
                  <div className="flex items-center p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                    <div className="w-8 h-8 bg-blue-500 rounded-full mr-4 flex items-center justify-center">
                      <TbClipboard className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-blue-700">
                        Application Created
                      </p>
                      <p className="text-xs text-blue-600">
                        {formatDateTime(application.createdAt)}
                      </p>
                    </div>
                  </div>

                  {application.updatedAt &&
                    application.updatedAt !== application.createdAt && (
                      <div className="flex items-center p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
                        <div className="w-8 h-8 bg-yellow-500 rounded-full mr-4 flex items-center justify-center">
                          <TbEdit className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-yellow-700">
                            Last Updated
                          </p>
                          <p className="text-xs text-yellow-600">
                            {formatDateTime(application.updatedAt)}
                          </p>
                        </div>
                      </div>
                    )}

                  {application.processedAt && (
                    <div
                      className={`flex items-center p-3 rounded-lg border-l-4 ${
                        application.status === "approved"
                          ? "bg-green-50 border-green-500"
                          : application.status === "rejected"
                          ? "bg-red-50 border-red-500"
                          : "bg-gray-50 border-gray-500"
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full mr-4 flex items-center justify-center ${
                          application.status === "approved"
                            ? "bg-green-500"
                            : application.status === "rejected"
                            ? "bg-red-500"
                            : "bg-gray-500"
                        }`}
                      >
                        {application.status === "approved" ? (
                          <TbCheck className="w-4 h-4 text-white" />
                        ) : (
                          <TbClock className="w-4 h-4 text-white" />
                        )}
                      </div>
                      <div>
                        <p
                          className={`text-sm font-medium ${
                            application.status === "approved"
                              ? "text-green-700"
                              : application.status === "rejected"
                              ? "text-red-700"
                              : "text-gray-700"
                          }`}
                        >
                          Application Processed
                        </p>
                        <p
                          className={`text-xs ${
                            application.status === "approved"
                              ? "text-green-600"
                              : application.status === "rejected"
                              ? "text-red-600"
                              : "text-gray-600"
                          }`}
                        >
                          {formatDateTime(application.processedAt)}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 bg-white px-6 py-4">
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-500">
                Application #{application.applicationNumber} • Created{" "}
                {formatDate(application.createdAt)}
              </div>
              <button
                onClick={onClose}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Toast Container */}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
};

export default ApplicationDetailModal;
