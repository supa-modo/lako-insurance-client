import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TbArrowLeft,
  TbStar,
  TbStarFilled,
  TbTrash,
  TbChevronRight,
  TbMailForward,
  TbArchive,
  TbPrinter,
  TbDotsVertical,
  TbAlertCircle,
  TbDownload,
  TbPaperclip,
  TbTag,
  TbMail,
  TbCalendarEvent,
  TbUser,
  TbCheck,
} from "react-icons/tb";
import { BsReplyAllFill, BsReplyFill } from "react-icons/bs";

const EmailDetail = ({ email, onReply, onForward, onDelete, onBack }) => {
  const navigate = useNavigate();
  const [showActions, setShowActions] = useState(false);

  if (!email) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-8 flex flex-col items-center justify-center h-full">
        <div className="bg-primary-50 p-4 rounded-full mb-4">
          <TbMail className="h-8 w-8 text-primary-600" />
        </div>
        <h3 className="text-lg font-medium text-neutral-900 mb-2">
          No email selected
        </h3>
        <p className="text-neutral-700">
          Select an email from the list to view its contents
        </p>
        <button
          onClick={onBack}
          className="mt-4 px-4 py-2 bg-primary-100 text-primary-700 rounded-md hover:bg-primary-200 flex items-center"
        >
          <TbArrowLeft className="mr-2" /> Back to inbox
        </button>
      </div>
    );
  }

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Format email addresses for display
  const formatEmailAddress = (address) => {
    if (!address) return "";
    if (address.includes("<") && address.includes(">")) return address;

    // Extract name from email if possible (e.g., john.doe@example.com -> John Doe)
    const namePart = address.split("@")[0];
    const name = namePart
      .split(/[._-]/)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ");

    return `${name} <${address}>`;
  };

  return (
    <div className="bg-white flex flex-col h-full">
      {/* Email header */}
      <div className="border-b border-neutral-200 p-4 flex-shrink-0">
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={onBack}
            className="p-2 text-primary-600 hover:text-primary-700 hover:bg-primary-50 rounded-md flex items-center"
          >
            <TbArrowLeft className="h-5 w-5 mr-1" /> Back
          </button>

          <div className="flex items-center space-x-2">
            <button className="p-2 text-neutral-600 hover:text-yellow-500 hover:bg-neutral-100 rounded-md">
              {email.starred ? (
                <TbStarFilled className="h-5 w-5 text-yellow-400" />
              ) : (
                <TbStar className="h-5 w-5" />
              )}
            </button>
            <button
              onClick={() => onReply(email)}
              className="p-2 text-neutral-600 hover:text-primary-600 hover:bg-neutral-100 rounded-md"
              title="Reply"
            >
              <BsReplyFill className="h-5 w-5" />
            </button>
            <button
              onClick={() => onForward(email)}
              className="p-2 text-neutral-600 hover:text-primary-600 hover:bg-neutral-100 rounded-md"
              title="Forward"
            >
              <TbMailForward className="h-5 w-5" />
            </button>
            <button
              onClick={() => onDelete(email.id)}
              className="p-2 text-neutral-600 hover:text-red-600 hover:bg-neutral-100 rounded-md"
              title="Delete"
            >
              <TbTrash className="h-5 w-5" />
            </button>
            <div className="relative">
              <button
                onClick={() => setShowActions(!showActions)}
                className="p-2 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-md"
              >
                <TbDotsVertical className="h-5 w-5" />
              </button>

              {/* Dropdown menu */}
              {showActions && (
                <div className="absolute right-0 top-full mt-1 w-48 bg-white shadow-lg rounded-md border border-neutral-200 z-10 py-1">
                  <button className="w-full text-left px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100 flex items-center">
                    <TbArchive className="h-4 w-4 mr-2" /> Archive
                  </button>
                  <button className="w-full text-left px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100 flex items-center">
                    <TbTag className="h-4 w-4 mr-2" /> Label as
                  </button>
                  <button className="w-full text-left px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100 flex items-center">
                    <TbPrinter className="h-4 w-4 mr-2" /> Print
                  </button>
                  <button className="w-full text-left px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100 flex items-center">
                    <TbCalendarEvent className="h-4 w-4 mr-2" /> Add to calendar
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Email subject and sender info */}
        <div>
          <h2 className="text-xl font-semibold text-primary-700 mb-3">
            {email.subject}
            {email.important && (
              <TbAlertCircle className="h-5 w-5 text-red-500 inline ml-2" />
            )}
          </h2>
          <div className="flex items-start">
            <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center mr-3 flex-shrink-0">
              <TbUser className="h-6 w-6 text-primary-500" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-neutral-900">
                    {email.sender}
                  </div>
                  <div className="text-sm text-neutral-500">
                    To: {formatEmailAddress(email.to)}
                    {email.cc && <div>Cc: {formatEmailAddress(email.cc)}</div>}
                  </div>
                </div>
                <div className="text-sm text-neutral-500">
                  {formatDate(email.date)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Email body */}
      <div className="flex-1 overflow-auto p-6 bg-white">
        {/* If HTML content available, render safely */}
        {email.html ? (
          <div dangerouslySetInnerHTML={{ __html: email.html }}></div>
        ) : (
          <div className="whitespace-pre-wrap text-neutral-800">
            {email.body}
          </div>
        )}
      </div>

      {/* Attachments (if any) */}
      {email.attachments && email.attachments.length > 0 && (
        <div className="border-t border-neutral-200 p-4 bg-white flex-shrink-0">
          <h3 className="text-sm font-medium text-neutral-700 mb-3 flex items-center">
            <TbPaperclip className="mr-2 h-5 w-5 text-neutral-500" />
            Attachments ({email.attachments.length})
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {email.attachments.map((attachment, index) => (
              <div
                key={index}
                className="border border-neutral-200 rounded-md bg-white shadow-sm p-3 flex items-center"
              >
                <div className="h-10 w-10 bg-primary-50 rounded flex items-center justify-center mr-3 text-primary-500">
                  <TbPaperclip className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div
                    className="text-sm font-medium text-neutral-900 truncate"
                    title={attachment.name}
                  >
                    {attachment.name}
                  </div>
                  <div className="text-xs text-neutral-500">
                    {attachment.size}
                  </div>
                </div>
                <button className="ml-2 p-1.5 text-neutral-600 hover:text-primary-600 hover:bg-primary-50 rounded">
                  <TbDownload className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Reply quick buttons */}
      <div className="border-t border-neutral-200 p-4 bg-white flex-shrink-0">
        <div className="flex space-x-2 text-[0.9rem] font-medium">
          <button
            onClick={() => onReply(email)}
            className="px-6 py-2 bg-primary-600 text-white rounded-md flex items-center hover:bg-primary-700"
          >
            <BsReplyFill className="mr-1.5" /> Reply
          </button>
          <button
            onClick={() => onReply(email, true)}
            className="px-6 py-2 bg-neutral-200 border border-neutral-300 text-neutral-700 rounded-md flex items-center hover:bg-neutral-300"
          >
            <BsReplyAllFill className="mr-1.5" /> Reply All
          </button>
          <button
            onClick={() => onForward(email)}
            className="px-6 py-2 border border-neutral-300 bg-neutral-200 text-neutral-700 rounded-md flex items-center hover:bg-neutral-300"
          >
            <TbMailForward size={19} className="mr-1.5" /> Forward
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailDetail;
