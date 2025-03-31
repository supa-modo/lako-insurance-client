import React, { useState, useRef } from "react";
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
} from "react-icons/tb";

const ComposeEmail = ({ onClose, onSend, replyTo = null }) => {
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

  const fileInputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!to.trim()) {
      alert("Please specify at least one recipient");
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
      onClose();
    } catch (error) {
      console.error("Failed to send email:", error);
      alert("Failed to send email. Please try again.");
    } finally {
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
      className={`bg-white rounded-lg shadow-xl flex flex-col overflow-hidden border border-neutral-200
        ${isMaximized ? "fixed inset-4 z-50" : "h-[600px] w-[800px]"}`}
    >
      {/* Header */}
      <div className="bg-primary-600 text-white px-4 py-3 flex items-center justify-between">
        <h3 className="font-medium">{replyTo ? "Reply" : "New Message"}</h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsMaximized(!isMaximized)}
            className="p-1 hover:bg-primary-700 rounded"
          >
            {isMaximized ? <TbMinimize /> : <TbMaximize />}
          </button>
          <button
            onClick={onClose}
            className="p-1 hover:bg-primary-700 rounded"
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
          <div className="flex items-center">
            <label
              htmlFor="to"
              className="w-16 text-sm font-medium text-neutral-700"
            >
              To:
            </label>
            <div className="flex-1">
              <input
                id="to"
                type="text"
                className="w-full border-0 focus:ring-0 p-1 text-neutral-800"
                placeholder="Recipients"
                value={to}
                onChange={(e) => setTo(e.target.value)}
              />
            </div>
            <button
              type="button"
              className="text-neutral-500 hover:text-neutral-700 text-sm"
              onClick={() => setShowCcBcc(!showCcBcc)}
            >
              Cc/Bcc <TbChevronDown className="inline h-4 w-4" />
            </button>
          </div>

          {/* Cc & Bcc (conditional) */}
          {showCcBcc && (
            <>
              <div className="flex items-center">
                <label
                  htmlFor="cc"
                  className="w-16 text-sm font-medium text-neutral-700"
                >
                  Cc:
                </label>
                <input
                  id="cc"
                  type="text"
                  className="w-full border-0 focus:ring-0 p-1 text-neutral-800"
                  placeholder="Carbon copy recipients"
                  value={cc}
                  onChange={(e) => setCc(e.target.value)}
                />
              </div>
              <div className="flex items-center">
                <label
                  htmlFor="bcc"
                  className="w-16 text-sm font-medium text-neutral-700"
                >
                  Bcc:
                </label>
                <input
                  id="bcc"
                  type="text"
                  className="w-full border-0 focus:ring-0 p-1 text-neutral-800"
                  placeholder="Blind carbon copy recipients"
                  value={bcc}
                  onChange={(e) => setBcc(e.target.value)}
                />
              </div>
            </>
          )}

          {/* Subject */}
          <div className="flex items-center">
            <label
              htmlFor="subject"
              className="w-16 text-sm font-medium text-neutral-700"
            >
              Subject:
            </label>
            <input
              id="subject"
              type="text"
              className="w-full border-0 focus:ring-0 p-1 text-neutral-800"
              placeholder="Email subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>
        </div>

        {/* Formatting toolbar */}
        <div className="border-b border-neutral-200 p-1 flex items-center space-x-1 bg-neutral-50">
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
        <div className="flex-1 overflow-auto p-4">
          <textarea
            className="w-full h-full resize-none p-2 border-0 focus:ring-0 text-neutral-800"
            placeholder="Compose your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
        </div>

        {/* Attachments */}
        {attachments.length > 0 && (
          <div className="p-3 border-t border-neutral-200 bg-neutral-50">
            <div className="text-sm font-medium text-neutral-700 mb-2">
              Attachments ({attachments.length})
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {attachments.map((file, index) => (
                <div
                  key={index}
                  className="border border-neutral-200 rounded p-2 flex items-center bg-white"
                >
                  {file.previewUrl ? (
                    <img
                      src={file.previewUrl}
                      alt={file.name}
                      className="h-10 w-10 object-cover rounded mr-2"
                    />
                  ) : (
                    <div className="h-10 w-10 bg-neutral-100 rounded flex items-center justify-center mr-2 text-neutral-500">
                      <TbPaperclip />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div
                      className="text-xs font-medium truncate"
                      title={file.name}
                    >
                      {file.name}
                    </div>
                    <div className="text-xs text-neutral-500">
                      {formatFileSize(file.size)}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeAttachment(index)}
                    className="text-neutral-400 hover:text-red-500 ml-1"
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
              className={`px-4 py-2 bg-primary-600 text-white rounded-md flex items-center
              ${
                isSending
                  ? "opacity-70 cursor-not-allowed"
                  : "hover:bg-primary-700"
              }`}
              disabled={isSending}
            >
              <TbSend className="mr-1" />
              {isSending ? "Sending..." : "Send"}
            </button>
            <button
              type="button"
              className="p-2 text-neutral-600 hover:text-neutral-800 hover:bg-neutral-200 rounded-md"
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
            className="p-2 text-neutral-600 hover:text-red-600 hover:bg-neutral-200 rounded-md"
            onClick={onClose}
          >
            <TbTrash className="h-5 w-5" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ComposeEmail;
