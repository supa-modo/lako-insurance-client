import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TbStar,
  TbStarFilled,
  TbPaperclip,
  TbTag,
  TbTrash,
  TbArchive,
  TbAlertCircle,
  TbMail,
  TbMailOpened,
  TbCheck,
  TbFilter,
  TbArrowUp,
  TbArrowDown,
  TbCheckbox,
  TbSquare,
} from "react-icons/tb";

const EmailList = ({
  emails = [],
  onSelectEmail,
  selectedFolder,
  onDeleteEmail,
}) => {
  const navigate = useNavigate();
  const [selectedEmails, setSelectedEmails] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    key: "date",
    direction: "desc",
  });

  // Handle email selection
  const toggleEmailSelection = (emailId, e) => {
    e.stopPropagation();
    if (selectedEmails.includes(emailId)) {
      setSelectedEmails(selectedEmails.filter((id) => id !== emailId));
    } else {
      setSelectedEmails([...selectedEmails, emailId]);
    }
  };

  // Handle star toggle
  const toggleStar = (emailId, e) => {
    e.stopPropagation();
    // This would update the email's starred status in a real app
    console.log("Toggle star for email", emailId);
  };

  // Handle clicking on email row
  const handleEmailClick = (email) => {
    onSelectEmail(email);
  };

  // Handle select all emails
  const toggleSelectAll = () => {
    if (selectedEmails.length === emails.length) {
      setSelectedEmails([]);
    } else {
      setSelectedEmails(emails.map((email) => email.id));
    }
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();

    // Today's date
    if (date.toDateString() === now.toDateString()) {
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    }

    // This year
    if (date.getFullYear() === now.getFullYear()) {
      return date.toLocaleDateString([], { month: "short", day: "numeric" });
    }

    // Different year
    return date.toLocaleDateString([], {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Handle sort
  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Sort emails
  const sortedEmails = [...emails].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  // Get folder display name
  const getFolderDisplayName = (folder) => {
    switch (folder) {
      case "inbox":
        return "Inbox";
      case "sent":
        return "Sent Items";
      case "drafts":
        return "Drafts";
      case "starred":
        return "Starred";
      case "spam":
        return "Spam";
      case "trash":
        return "Trash";
      default:
        return folder.charAt(0).toUpperCase() + folder.slice(1);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Toolbar */}
      <div className="bg-white px-4 py-3 border-b border-neutral-200 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center space-x-2">
          <button
            onClick={toggleSelectAll}
            className="p-1.5 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-md"
            title={selectedEmails.length > 0 ? "Deselect all" : "Select all"}
          >
            {selectedEmails.length === emails.length && emails.length > 0 ? (
              <TbCheck className="h-5 w-5" />
            ) : (
              <TbSquare className="h-5 w-5" />
            )}
          </button>

          {selectedEmails.length > 0 && (
            <div className="flex space-x-1">
              <button
                className="p-1.5 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-md"
                title="Archive selected"
              >
                <TbArchive className="h-5 w-5" />
              </button>
              <button
                className="p-1.5 text-neutral-600 hover:text-red-700 hover:bg-neutral-100 rounded-md"
                title="Delete selected"
                onClick={() =>
                  selectedEmails.forEach((id) => onDeleteEmail(id))
                }
              >
                <TbTrash className="h-5 w-5" />
              </button>
              <button
                className="p-1.5 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-md"
                title="Apply labels"
              >
                <TbTag className="h-5 w-5" />
              </button>
            </div>
          )}

          <span className="text-sm font-medium text-primary-600 ml-2">
            {selectedFolder && getFolderDisplayName(selectedFolder)}
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-sm text-neutral-500">
            {emails.length} email{emails.length !== 1 ? "s" : ""}
          </span>
          <button className="p-1.5 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-md">
            <TbFilter className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Email List - Scrollable */}
      <div className="flex-1 overflow-y-auto">
        {emails.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full p-8 text-center">
            <div className="p-4 bg-neutral-100 rounded-full mb-4">
              <TbMail className="h-8 w-8 text-neutral-400" />
            </div>
            <h3 className="text-lg font-medium text-neutral-900 mb-1">
              No emails found
            </h3>
            <p className="text-neutral-500 max-w-md">
              {selectedFolder === "inbox"
                ? "Your inbox is empty. Emails you receive will appear here."
                : `There are no emails in ${getFolderDisplayName(
                    selectedFolder
                  )}.`}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-neutral-200">
            {sortedEmails.map((email) => (
              <div
                key={email.id}
                onClick={() => handleEmailClick(email)}
                className={`px-4 py-3 flex items-start hover:bg-primary-50/30 cursor-pointer transition-colors ${
                  !email.read ? "bg-blue-50/40" : ""
                }`}
              >
                <div className="flex items-center mr-3">
                  <input
                    type="checkbox"
                    className="rounded text-primary-600 focus:ring-primary-500 h-4 w-4 cursor-pointer"
                    checked={selectedEmails.includes(email.id)}
                    onChange={(e) => e.stopPropagation()}
                    onClick={(e) => toggleEmailSelection(email.id, e)}
                  />
                </div>

                <button
                  className="text-neutral-400 hover:text-yellow-400 mr-3"
                  onClick={(e) => toggleStar(email.id, e)}
                >
                  {email.starred ? (
                    <TbStarFilled className="h-5 w-5 text-yellow-400" />
                  ) : (
                    <TbStar className="h-5 w-5" />
                  )}
                </button>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center mb-1">
                    <div
                      className={`font-medium text-[0.94rem] ${
                        !email.read ? "text-neutral-900" : "text-neutral-700"
                      } truncate`}
                    >
                      {email.sender}
                    </div>
                    <div className="ml-auto pl-4 text-xs text-neutral-500 whitespace-nowrap">
                      {formatDate(email.date)}
                    </div>
                  </div>

                  <div
                    className={`text-sm ${
                      !email.read ? "font-medium" : ""
                    } text-neutral-800 mb-1 truncate`}
                  >
                    {email.subject}
                    {email.important && (
                      <TbAlertCircle className="h-4 w-4 text-red-500 inline ml-1" />
                    )}
                    {email.hasAttachment && (
                      <TbPaperclip className="h-4 w-4 text-neutral-400 inline ml-1" />
                    )}
                  </div>

                  <div className="text-xs text-neutral-500 truncate">
                    {email.preview}
                  </div>
                </div>

                <div className="ml-2 flex items-center text-neutral-400">
                  {email.read ? (
                    <TbMailOpened className="h-5 w-5" />
                  ) : (
                    <TbMail className="h-5 w-5 text-primary-500" />
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="px-4 py-3 border-t border-neutral-200 flex items-center justify-between bg-white flex-shrink-0">
        <button className="px-4 py-2 text-sm text-neutral-800 hover:bg-primary-50 rounded-md disabled:opacity-50 disabled:cursor-not-allowed">
          Previous
        </button>
        <span className="text-sm text-neutral-600">Page 1 of 5</span>
        <button className="px-4 py-2 text-sm text-neutral-800 hover:bg-primary-50 rounded-md">
          Next
        </button>
      </div>
    </div>
  );
};

export default EmailList;
