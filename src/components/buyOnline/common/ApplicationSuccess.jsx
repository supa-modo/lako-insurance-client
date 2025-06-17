import React from "react";
import { motion } from "framer-motion";
import {
  TbCheck,
  TbMail,
  TbPhone,
  TbDownload,
  TbHome,
  TbClipboardCheck,
  TbClock,
  TbShield,
  TbPhoneCall,
  TbMailFilled,
  TbArrowRampLeft,
  TbArrowRampRight,
  TbArrowRight,
  TbHomeDot,
  TbCreditCard,
  TbCopy,
  TbCopyCheck,
} from "react-icons/tb";
import { Link } from "react-router-dom";
import { FiCheckCircle } from "react-icons/fi";
import { formatCurrency } from "../../../utils/formatCurrency";

const ApplicationSuccess = ({
  applicationData,
  onStartNew,
  paymentCompleted = false,
}) => {
  const [isCopied, setIsCopied] = React.useState(false);

  const formatDate = (dateString) => {
    if (!dateString) return "Not specified";
    return new Date(dateString).toLocaleDateString("en-GB");
  };

  const handleCopyApplicationNumber = async () => {
    const applicationNumber = applicationData?.applicationNumber || " ";

    try {
      await navigator.clipboard.writeText(applicationNumber);
      setIsCopied(true);

      // Revert back to copy icon after 2 seconds
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (err) {
      // Fallback for browsers that don't support clipboard API
      const textArea = document.createElement("textarea");
      textArea.value = applicationNumber;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);

      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    }
  };

  const handlePrintSummary = () => {
    const printContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&display=swap" rel="stylesheet">
          <title>Insurance Application Summary - ${
            applicationData?.applicationNumber || "PA202412010001"
          }</title>
          <style>
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            
            body {
              font-family: 'Outfit', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              line-height: 1.5;
              color: #333;
              background: white;
              min-height: 100vh;
              display: flex;
              flex-direction: column;
            }
            
            .page-container {
              max-width: 820px;
              margin: 0 auto;
              padding: 20px;
              flex: 1;
              display: flex;
              flex-direction: column;
            }
            
            /* Header Styles */
            .header {
              display: flex;
              align-items: center;
              justify-content: space-between;
              margin-bottom: 30px;
              padding-bottom: 15px;
              border-bottom: 1px solid #e0e0e0;
            }
            
            .header-left {
              display: flex;
              align-items: center;
              gap: 15px;
            }
            
            .logo {
              max-width: 100px;
              height: auto;
            }
            
            .header-center {
              text-align: center;
              flex: 1;
            }
            
            .header-center h1 {
              color: #247f7c;
              margin: 0 0 5px 0;
              font-size: 22px;
              font-weight: 600;
            }
            
            .header-center h2 {
              color: #e07b13;
              margin: 0;
              font-size: 16px;
              font-weight: 500;
            }

            .header-right {
              text-align: right;
              font-size: 11px;
              color: #718096;
              font-weight: 400;
              font-family: monospace;
            }
            
            /* Application Details Section */
            .application-details {
              border: 1px solid #e0e0e0;
              border-radius: 4px;
              margin-bottom: 30px;
            }
            
            .section-header {
              background: #3d66651a;
              padding: 12px 20px;
              border-bottom: 1px solid #e0e0e0;
              color: #e07b13;
              font-size: 16px;
              font-weight: 500;
            }
            
            .section-body {
              padding: 20px;
            }
            
            .detail-grid {
              display: grid;
              grid-template-columns: repeat(3, 1fr);
              gap: 10px;
            }
            
            .detail-item {
              margin-bottom: 15px;
            }
            
            .detail-label {
              font-size: 13px;
              color: #718096;
              font-weight: 400;
              margin-bottom: 4px;
            }
            
            .detail-value {
              font-size: 14px;
              color: #2d3748;
              font-weight: 400;
            }
            
            .highlight-value {
              color: #1b5f5d;
              font-weight: 500;
            }
            
            /* Important Information Section - No Border */
            .important-info {
              margin-bottom: 25px;
            }
            
            .info-title {
              font-size: 16px;
              color: #e07b13;
              font-weight: 500;
              margin-bottom: 12px;
            }
            
            .info-content {
              font-size: 13px;
              color: #4a5568;
              line-height: 1.5;
              font-weight: 400;
            }
            
            .info-item {
              margin-bottom: 6px;
            }
            
            .info-item strong {
              color: #247f7c;
            }
            
            /* Contact Information Section - Corporate Letter Style */
            .contact-section {
              margin-top: 0px;
              border-top: 1px solid #e0e0e0;
              padding-top: 15px;
            }
            
            .contact-title {
              font-size: 14px;
              color: #e07b13;
              font-weight: 500;
              margin-bottom: 10px;
            }
            
            .contact-info {
              font-size: 13px;
              color: #4a5568;
              line-height: 1.8;
            }
            
            .contact-row {
              display: flex;
              margin-bottom: 4px;
            }
            
            .contact-label {
              min-width: 120px;
              font-weight: 500;
            }
            
            /* Footer - Always at bottom */
            .footer {
              margin-top: auto;
              text-align: center;
              padding: 20px 0 0 0;
              border-top: 1px solid #e0e0e0;
              color: #718096;
              font-size: 12px;
            }
            
            .footer-text {
              font-size: 12px;
              color: #182928;
              font-weight: 500;
            }
            
            .footer-logo {
              width: 70px;
              height: auto;
              margin: 0 auto 5px auto;
              display: block;
              opacity: 0.8;
            }
            
            /* Print-specific adjustments */
            @media print {
              body { 
                font-size: 12px;
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
              }
              
              .page-container { 
                padding: 15px;
              }
              
              .application-details {
                border: 1px solid #e0e0e0;
              }
              
              .section-header {
                padding: 10px 15px;
              }
              
              .section-body {
                padding: 15px;
              }
              
              .footer { 
                margin-top: 20px;
              }
            }
          </style>
        </head>
        <body>
          <div class="page-container">
            <!-- Header -->
            <div class="header">
              <div class="header-left">
                <img src="/lako-logo.png" alt="Lako Insurance" class="logo" />
              </div>
              <div class="header-center">
                <h1>Insurance Application Summary</h1>
                <h2>${
                  applicationData?.insuranceType
                    ? applicationData.insuranceType.charAt(0).toUpperCase() +
                      applicationData.insuranceType.slice(1)
                    : "N/A"
                } Insurance</h2>
              </div>
              <div class="header-right">
                <p>Generated <br/> ${new Date().toLocaleDateString(
                  "en-GB"
                )} ${new Date().toLocaleTimeString("en-GB")}</p>
              </div>
            </div>
  
            <!-- Application Details Section -->
            <div class="application-details">
              <div class="section-header">
                Application Details
              </div>
              <div class="section-body">
                <div class="detail-grid">
                  <div class="detail-item">
                    <div class="detail-label">Application Number</div>
                    <div class="detail-value highlight-value">${
                      applicationData?.applicationNumber || "N/A"
                    }</div>
                  </div>
                  
                  <div class="detail-item">
                    <div class="detail-label">Applicant Name</div>
                    <div class="detail-value">${[
                      applicationData?.firstName,
                      applicationData?.middleName,
                      applicationData?.lastName,
                    ]
                      .filter(Boolean)
                      .join(" ")}</div>
                  </div>
                  
                  <div class="detail-item">
                    <div class="detail-label">Email Address</div>
                    <div class="detail-value">${
                      applicationData?.emailAddress || "N/A"
                    }</div>
                  </div>
                  
                  <div class="detail-item">
                    <div class="detail-label">Mobile Number</div>
                    <div class="detail-value">${
                      applicationData?.mobileNumber || "N/A"
                    }</div>
                  </div>
                  
                  <div class="detail-item">
                    <div class="detail-label">Insurance Type</div>
                    <div class="detail-value">${
                      applicationData?.insuranceType
                        ? applicationData.insuranceType
                            .charAt(0)
                            .toUpperCase() +
                          applicationData.insuranceType.slice(1)
                        : "N/A"
                    } - ${
      applicationData?.coverType
        ? applicationData.coverType.charAt(0).toUpperCase() +
          applicationData.coverType.slice(1)
        : "N/A"
    }</div>
                  </div>
                  
                  <div class="detail-item">
                    <div class="detail-label">Insurance Provider</div>
                    <div class="detail-value">${
                      applicationData?.insuranceProvider || "N/A"
                    }</div>
                  </div>
                  
                  <div class="detail-item">
                    <div class="detail-label">Annual Premium</div>
                    <div class="detail-value highlight-value">${formatCurrency(
                      applicationData?.premiumAmount || 0
                    )}</div>
                  </div>
                  
                  <div class="detail-item">
                    <div class="detail-label">Policy Start Date</div>
                    <div class="detail-value">${formatDate(
                      applicationData?.policyStartDate
                    )}</div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Important Information Section - No Border -->
            <div class="important-info">
              <div class="info-title">Important Information</div>
              <div class="info-content">
                <div class="info-item">
                  <strong>Application:</strong> A confirmation email for your application will be sent shortly as our underwriting team reviews your details & documents.
                </div>
                
                <div class="info-item">
                  <strong>Payment:</strong> ${
                    paymentCompleted
                      ? "Payment completed as part of the application process. The policy documents will be shared to your email after application approval."
                      : "Payment for this policy was part of your application process."
                  }
                </div>
                
                <div class="info-item">
                  <strong>Follow-Up:</strong> If we need any additional
              documents or information, we'll contact you via email or phone
              only through our communication channels below.
                </div>
                
                <div class="info-item">
                  <strong>Questions:</strong> If you have any queries about your application, please reach out to us through any of our contact options below.
                </div>
              </div>
            </div>
            
            <!-- Contact Information Section - Corporate Letter Style -->
            <div class="contact-section">
              <div class="contact-title">Contact Us Through</div>
              <div class="contact-info">
                <div class="contact-row">
                  <div class="contact-label">Telephone:</div>
                  <div>+254 720 636363 / +254 769 868686 / +254 726 581487</div>
                </div>
                <div class="contact-row">
                  <div class="contact-label">Email:</div>
                  <div>info@lako.co.ke or ykola@lako.co.ke</div>
                </div>
                <div class="contact-row">
                  <div class="contact-label">Website:</div>
                  <div>www.lako.co.ke</div>
                </div>
              </div>
            </div>
            
            <!-- Footer - Always at bottom -->
            <div class="footer">
              <img src="/lako-logo.png" alt="Lako Insurance" class="footer-logo" />
              <p class="footer-text">This is an automatic system-generated document. Please retain it for your records.</p>
             
              <p>© ${new Date().getFullYear()} Lako Insurance. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Open print content in new window
    const printWindow = window.open("", "_blank");
    printWindow.document.write(printContent);
    printWindow.document.close();

    // Wait for content to load, then print
    printWindow.onload = () => {
      printWindow.print();
      printWindow.close();
    };
  };

  return (
    <div className="">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center mt-4 mb-8"
      >
        {/* Success Icon */}
        <FiCheckCircle className="w-11 md:w-12 h-11 md:h-12 text-green-700 flex items-center justify-center mx-auto mb-4" />

        <h1 className="text-[1.2rem] md:text-xl lg:text-2xl font-bold text-green-700 mb-2">
          Application Completed Successfully!
        </h1>
        <p className="text-[0.95rem] md:text-base lg:text-lg  text-gray-700 max-w-3xl mx-auto">
          Thank you for choosing our insurance services. Your personal accident
          insurance application has been received and is being processed.
        </p>
      </motion.div>

      {/* Application Details Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 md:p-6 lg:p-8 mb-8"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[1.05rem] md:text-lg lg:text-xl font-semibold text-neutral-700">
            Application Summary
          </h2>
          <span className="bg-green-100 border border-green-300 text-green-800 text-[0.8rem] md:text-sm font-medium px-3 py-0.5 md:py-1 rounded-full">
            Completed
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-5 lg:gap-6">
          <div>
            <label className="text-[0.8rem] md:text-sm font-medium text-gray-500">
              Application Number
            </label>
            <p className="text-[0.9rem] md:text-base lg:text-[1.05rem] font-semibold font-lexend text-primary-700">
              {applicationData?.applicationNumber || "PA202412010001"}
            </p>
          </div>

          <div>
            <label className="text-[0.8rem] md:text-sm font-medium text-gray-500">
              Applicant Name
            </label>
            <p className="text-sm md:text-[0.93rem] lg:text-base font-semibold font-lexend text-primary-700">
              {[
                applicationData?.firstName,
                applicationData?.middleName,
                applicationData?.lastName,
              ]
                .filter(Boolean)
                .join(" ")}
            </p>
          </div>

          <div>
            <label className="text-[0.8rem] md:text-sm font-medium text-gray-500">
              Email Address
            </label>
            <p className="text-sm md:text-[0.93rem] lg:text-base font-semibold font-lexend text-primary-700">
              {applicationData?.emailAddress}
            </p>
          </div>

          <div>
            <label className="text-[0.8rem] md:text-sm font-medium text-gray-500">
              Mobile Number
            </label>
            <p className="text-sm md:text-[0.93rem] lg:text-base font-semibold font-lexend text-primary-700">
              {applicationData?.mobileNumber}
            </p>
          </div>

          <div>
            <label className="text-[0.8rem] md:text-sm font-medium text-gray-500">
              Insurance Type
            </label>
            <p className="text-sm md:text-[0.93rem] lg:text-base font-semibold font-lexend text-primary-700 capitalize">
              {applicationData?.insuranceType} - {applicationData?.coverType}
            </p>
          </div>

          <div>
            <label className="text-[0.8rem] md:text-sm font-medium text-gray-500">
              Insurance Provider
            </label>
            <p className="text-sm md:text-[0.93rem] lg:text-base font-semibold font-lexend text-primary-700">
              {applicationData?.insuranceProvider}
            </p>
          </div>

          <div>
            <label className="text-[0.8rem] md:text-sm font-medium text-gray-500">
              Annual Premium
            </label>
            <p className="text-sm md:text-[0.93rem] lg:text-base font-semibold font-lexend text-primary-700">
              {formatCurrency(applicationData?.premiumAmount || 0)}
            </p>
          </div>

          <div>
            <label className="text-[0.8rem] md:text-sm font-medium text-gray-500">
              Policy Start Date
            </label>
            <p className="text-sm md:text-[0.93rem] lg:text-base font-semibold font-lexend text-primary-700">
              {formatDate(applicationData?.policyStartDate)}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Important Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="bg-yellow-50 rounded-xl border border-yellow-200 p-4 md:p-6 mb-8"
      >
        <h3 className="text-lg font-semibold text-secondary-700 mb-4">
          Important Information
        </h3>
        <div className="space-y-3 text-sm text-gray-700">
          <div className="flex items-start">
            <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
            <p>
              <strong>Application:</strong> An email with confirmation of your
              application will be sent to you within 2 minutes as our
              underwriting team reviews your application & documents.
            </p>
          </div>

          <div className="flex items-start">
            <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
            <p>
              <strong>Payment:</strong>{" "}
              {paymentCompleted
                ? "Payment for this policy has been completed as part of the application process. Once the application is approved, your policy documents will be sent via email."
                : "Payment for this policy has been completed as part of the application process."}
            </p>
          </div>
          <div className="flex items-start">
            <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
            <p>
              <strong>Additional Information:</strong> If we need any additional
              documents or information, we'll contact you via email or phone
              only through our communication channels below.
            </p>
          </div>
          <div className="flex items-start">
            <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
            <p>
              <strong>Questions:</strong> If you have any questions about your
              application, please contact us using the contact details below.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Contact Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="bg-white rounded-xl border border-gray-200 p-4 md:p-6 mb-8"
      >
        <h3 className="text-base lg:text-lg font-semibold text-primary-700 mb-4">
          Need Help?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm md:text-[0.9rem] lg:text-base">
          <div className="flex items-center space-x-3 ">
            <div className="w-14 h-14 bg-primary-100 rounded-lg flex items-center justify-center">
              <TbPhoneCall size={28} className=" text-primary-600" />
            </div>
            <div>
              <p className="font-semibold text-gray-800">Call Us</p>
              <p className="text-sm font-lexend text-gray-600">
                +254 726 581487 or +254 720 636363
              </p>
              <p className="text-xs text-gray-500">Mon-Fri, 8AM-6PM</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-14 h-14 bg-primary-100 rounded-lg flex items-center justify-center">
              <TbMailFilled size={28} className=" text-primary-600" />
            </div>
            <div>
              <p className="font-semibold text-gray-800">Email Us</p>
              <p className="text-sm text-gray-600">support@lako.co.ke</p>
              <p className="text-xs text-gray-500">
                We'll respond within 24 hours
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.0 }}
        className="flex flex-col md:flex-row gap-2.5 md:gap-4 justify-center"
      >
        <button
          onClick={onStartNew}
          className="flex items-center justify-center px-6 py-2.5 bg-primary-600 text-sm lg:text-base text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
        >
          Apply for Another Policy
          <TbArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2" />
        </button>

        <Link
          to="/"
          className="flex items-center justify-center px-6 py-2.5 bg-gray-200 text-sm lg:text-base text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
        >
          <TbHomeDot className="w-5 h-5 mr-2" />
          Back to Home
        </Link>

        <button
          onClick={handlePrintSummary}
          className="flex items-center justify-center px-6 py-2.5 border border-gray-300 text-sm lg:text-base text-secondary-600 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
        >
          <TbDownload className="w-5 h-5 mr-2" />
          Print Summary
        </button>
      </motion.div>

      {/* Reference Number for Easy Access */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.2 }}
        className="text-center mt-8 p-4 bg-gray-50 rounded-lg"
      >
        <p className="text-[0.83rem] md:text-sm text-gray-600">
          Please save your application number:
          <span className="font-lexend text-[0.9rem] font-semibold text-primary-600 ml-2">
            {applicationData?.applicationNumber || "PA202412010001"}
          </span>
          <button
            onClick={handleCopyApplicationNumber}
            className={`ml-2 transition-colors cursor-pointer ${
              isCopied ? " text-green-600" : " text-gray-600"
            }`}
            title={isCopied ? "Copied!" : "Copy application number"}
          >
            {isCopied ? <TbCheck size={16} /> : <TbCopy size={16} />}
          </button>
        </p>
      </motion.div>
    </div>
  );
};

export default ApplicationSuccess;
