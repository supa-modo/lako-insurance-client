import React, { useState, useRef, useEffect } from "react";
import {
  TbX,
  TbSend,
  TbPaperclip,
  TbTrash,
  TbChevronDown,
  TbBold,
  TbItalic,
  TbUnderline,
  TbList,
  TbListNumbers,
  TbLink,
  TbPhoto,
  TbAlignLeft,
  TbMaximize,
  TbMinimize,
  TbAlertTriangle,
  TbUser,
} from "react-icons/tb";

const ComposeEmail = ({ onClose, onSend, email: replyTo = null }) => {
  const [to, setTo] = useState(replyTo ? replyTo.sender : "");
  const [cc, setCc] = useState("");
  const [bcc, setBcc] = useState("");
  const [subject, setSubject] = useState(
    replyTo ? `RE: ${replyTo.subject}` : ""
  );
  const [message, setMessage] = useState(
    replyTo
      ? `\n\n\n-------- Original Message --------\nFrom: ${
          replyTo.sender
        }\nDate: ${new Date(replyTo.date).toLocaleString()}\nSubject: ${
          replyTo.subject
        }\n\n${replyTo.body || ""}`
      : ""
  );
  const [attachments, setAttachments] = useState([]);
  const [showCcBcc, setShowCcBcc] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [errors, setErrors] = useState({});

  const fileInputRef = useRef(null);
  const modalRef = useRef(null);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  // Close on outside click
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [onClose]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    const newErrors = {};
    if (!to.trim()) {
      newErrors.to = "Please specify at least one recipient";
    }

    if (!subject.trim()) {
      newErrors.subject = "Please enter a subject";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSending(true);

    // Prepare email data
    const emailData = {
      to,
      cc,
      bcc,
      subject,
      message,
      attachments,
      date: new Date().toISOString(),
    };

    try {
      // In a real app, this would send the email to a server
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
      onSend(emailData);
    } catch (error) {
      console.error("Failed to send email:", error);
      alert("Failed to send email. Please try again.");
      setIsSending(false);
    }
  };

  const handleAttachFile = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);

    // Add files to attachments list with preview URLs
    const newAttachments = newFiles.map((file) => ({
      name: file.name,
      size: file.size,
      type: file.type,
      file,
      // Create URL for preview if it's an image
      previewUrl: file.type.startsWith("image/")
        ? URL.createObjectURL(file)
        : null,
    }));

    setAttachments([...attachments, ...newAttachments]);

    // Reset file input
    e.target.value = null;
  };

  const removeAttachment = (index) => {
    const newAttachments = [...attachments];

    // Release object URL if it exists
    if (newAttachments[index].previewUrl) {
      URL.revokeObjectURL(newAttachments[index].previewUrl);
    }

    newAttachments.splice(index, 1);
    setAttachments(newAttachments);
  };

  // Format file size
  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  return (
    <div
      ref={modalRef}
      className={`bg-white rounded-lg shadow-xl flex flex-col overflow-hidden ${
        isMaximized
          ? "fixed inset-4 z-50 max-w-full"
          : "w-[1000px] max-w-[95vw] h-[80vh]"
      }`}
    >
      {/* Header */}
      <div className="bg-primary-600 text-white px-4 py-3 flex items-center justify-between">
        <h3 className="font-medium text-secondary-400">{replyTo ? "Reply" : "Compose New Email"}</h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsMaximized(!isMaximized)}
            className="p-1 hover:bg-primary-700 rounded"
            title={isMaximized ? "Minimize" : "Maximize"}
          >
            {isMaximized ? <TbMinimize /> : <TbMaximize />}
          </button>
          <button
            onClick={onClose}
            className="p-1 hover:bg-primary-700 rounded"
            title="Close"
          >
            <TbX />
          </button>
        </div>
      </div>

      {/* Email Form */}
      <form
        onSubmit={handleSubmit}
        className="flex-1 flex flex-col overflow-hidden"
      >
        <div className="p-4 space-y-3 border-b border-neutral-200">
          {/* To */}
          <div className="flex items-start">
            <label
              htmlFor="to"
              className="w-16 text-sm font-medium text-secondary-700 pt-2"
            >
              To:
            </label>
            <div className="flex-1">
              <input
                id="to"
                type="text"
                className={`w-full bg-neutral-300 border border-neutral-400 rounded-md p-2 text-[0.9rem] text-neutral-800 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 placeholder:text-neutral-500 ${
                  errors.to ? "border-red-300" : "border-neutral-300"
                }`}
                placeholder="Recipients"
                value={to}
                onChange={(e) => {
                  setTo(e.target.value);
                  if (errors.to) setErrors({ ...errors, to: undefined });
                }}
              />
              {errors.to && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <TbAlertTriangle className="h-4 w-4 mr-1" /> {errors.to}
                </p>
              )}
            </div>
            <button
              type="button"
              className="text-neutral-600 hover:text-primary-600 text-sm ml-2 px-2 py-1 hover:bg-neutral-100 rounded"
              onClick={() => setShowCcBcc(!showCcBcc)}
            >
              {showCcBcc ? "Hide" : "Cc/Bcc"}
            </button>
          </div>

          {/* Cc & Bcc (conditional) */}
          {showCcBcc && (
            <>
              <div className="flex items-start">
                <label
                  htmlFor="cc"
                  className="w-16 text-sm font-medium text-secondary-700 pt-2"
                >
                  Cc:
                </label>
                <input
                  id="cc"
                  type="text"
                  className="w-full bg-neutral-300 text-[0.9rem] border border-neutral-400 rounded-md p-2 text-neutral-800 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 placeholder:text-neutral-500"
                  placeholder="Carbon copy recipients"
                  value={cc}
                  onChange={(e) => setCc(e.target.value)}
                />
              </div>
              <div className="flex items-start">
                <label
                  htmlFor="bcc"
                  className="w-16 text-sm font-medium text-secondary-700 pt-2"
                >
                  Bcc:
                </label>
                <input
                  id="bcc"
                  type="text"
                  className="w-full border bg-neutral-300 text-[0.9rem] border-neutral-400 rounded-md p-2 text-neutral-800 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 placeholder:text-neutral-500"
                  placeholder="Blind carbon copy recipients"
                  value={bcc}
                  onChange={(e) => setBcc(e.target.value)}
                />
              </div>
            </>
          )}

          {/* Subject */}
          <div className="flex items-start">
            <label
              htmlFor="subject"
              className="w-16 text-sm font-medium text-secondary-700 pt-2"
            >
              Subject:
            </label>
            <div className="flex-1">
              <input
                id="subject"
                type="text"
                className={`w-full border bg-neutral-300 text-[0.9rem] border-neutral-500 rounded-md p-2 text-neutral-800 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 placeholder:text-neutral-500 ${
                  errors.subject ? "border-red-300" : "border-neutral-300"
                }`}
                placeholder="Email subject"
                value={subject}
                onChange={(e) => {
                  setSubject(e.target.value);
                  if (errors.subject)
                    setErrors({ ...errors, subject: undefined });
                }}
              />
              {errors.subject && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <TbAlertTriangle className="h-4 w-4 mr-1" /> {errors.subject}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Formatting toolbar */}
        <div className="border-b border-neutral-200 p-1 flex items-center space-x-1 bg-neutral-50 flex-wrap">
          <button
            type="button"
            className="p-1.5 rounded hover:bg-neutral-200 text-neutral-700"
            title="Bold"
          >
            <TbBold />
          </button>
          <button
            type="button"
            className="p-1.5 rounded hover:bg-neutral-200 text-neutral-700"
            title="Italic"
          >
            <TbItalic />
          </button>
          <button
            type="button"
            className="p-1.5 rounded hover:bg-neutral-200 text-neutral-700"
            title="Underline"
          >
            <TbUnderline />
          </button>
          <div className="border-r border-neutral-300 h-6 mx-1"></div>
          <button
            type="button"
            className="p-1.5 rounded hover:bg-neutral-200 text-neutral-700"
            title="Bulleted list"
          >
            <TbList />
          </button>
          <button
            type="button"
            className="p-1.5 rounded hover:bg-neutral-200 text-neutral-700"
            title="Numbered list"
          >
            <TbListNumbers />
          </button>
          <div className="border-r border-neutral-300 h-6 mx-1"></div>
          <button
            type="button"
            className="p-1.5 rounded hover:bg-neutral-200 text-neutral-700"
            title="Insert link"
          >
            <TbLink />
          </button>
          <button
            type="button"
            className="p-1.5 rounded hover:bg-neutral-200 text-neutral-700"
            title="Insert image"
          >
            <TbPhoto />
          </button>
        </div>

        {/* Message body */}
        <div className="flex-1 p-4 min-h-[200px]">
          <textarea
            className="w-full h-full placeholder:text-neutral-500 resize-none p-2 bg-neutral-300 border border-neutral-400 rounded-md focus:outline-none text-neutral-800"
            placeholder="Compose your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
        </div>

        {/* Attachments */}
        {attachments.length > 0 && (
          <div className="p-3 border-t border-neutral-200 bg-neutral-50">
            <div className="text-sm font-medium text-secondary-700 mb-2 flex items-center">
              <TbPaperclip className="mr-1.5 h-4 w-4" />
              Attachments ({attachments.length})
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {attachments.map((file, index) => (
                <div
                  key={index}
                  className="border border-neutral-300 rounded p-2 flex items-center bg-white"
                >
                  {file.previewUrl ? (
                    <img
                      src={file.previewUrl}
                      alt={file.name}
                      className="h-10 w-10 object-cover rounded mr-2"
                    />
                  ) : (
                    <div className="h-10 w-10 bg-neutral-300 rounded flex items-center justify-center mr-2 text-neutral-600">
                      <TbPaperclip />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div
                      className="text-xs font-medium truncate text-neutral-800"
                      title={file.name}
                    >
                      {file.name}
                    </div>
                    <div className="text-[0.7rem] text-neutral-600">
                      {formatFileSize(file.size)}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeAttachment(index)}
                    className="text-red-400 hover:text-red-600 ml-1"
                  >
                    <TbX className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="p-3 border-t border-neutral-200 flex items-center justify-between bg-neutral-50">
          <div className="flex items-center space-x-2">
            <button
              type="submit"
              className={`px-8 py-2 rounded-md flex items-center ${
                isSending
                  ? "bg-primary-400 text-white cursor-not-allowed"
                  : "bg-primary-600 text-white hover:bg-primary-700"
              }`}
              disabled={isSending}
            >
              <TbSend className="mr-1.5" />
              {isSending ? "Sending..." : "Send"}
            </button>
            <button
              type="button"
              className="p-2 rounded-md flex items-center text-primary-600 hover:bg-primary-50"
              onClick={handleAttachFile}
            >
              <TbPaperclip className="h-5 w-5" />
            </button>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              multiple
              onChange={handleFileChange}
            />
          </div>

          <button
            type="button"
            className="p-2 text-neutral-600 hover:text-red-600 hover:bg-neutral-100 rounded-md"
            onClick={onClose}
            title="Discard draft"
          >
            <TbTrash className="h-6 w-6" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ComposeEmail;
