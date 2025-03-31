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
} from "react-icons/tb";

const EmailList = ({ emails = [], onSelectEmail, selectedFolder }) => {
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
    navigate(`/admin/mail/view/${email.id}`);
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

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm flex flex-col h-full">
      {/* Toolbar */}
      <div className="p-4 border-b border-neutral-200 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              className="rounded text-primary-600 focus:ring-primary-500 h-4 w-4 mr-2"
              checked={
                selectedEmails.length === emails.length && emails.length > 0
              }
              onChange={toggleSelectAll}
            />
            <span className="text-sm text-neutral-600 hidden sm:inline">
              {selectedEmails.length > 0
                ? `${selectedEmails.length} selected`
                : "None selected"}
            </span>
          </div>

          {/* Only show these buttons when emails are selected */}
          {selectedEmails.length > 0 && (
            <div className="flex space-x-2">
              <button className="p-1.5 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-md">
                <TbArchive className="h-5 w-5" />
              </button>
              <button className="p-1.5 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-md">
                <TbTag className="h-5 w-5" />
              </button>
              <button className="p-1.5 text-neutral-600 hover:text-red-700 hover:bg-neutral-100 rounded-md">
                <TbTrash className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>

        <div className="text-sm text-neutral-500">
          {emails.length} email{emails.length !== 1 ? "s" : ""}
        </div>
      </div>

      {/* Email List */}
      <div className="flex-1 overflow-y-auto">
        {emails.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full p-8 text-center">
            <div className="bg-white p-4 rounded-full mb-4 shadow-sm">
              <TbMail className="h-8 w-8 text-primary-500" />
            </div>
            <h3 className="text-lg font-medium text-neutral-900 mb-1">
              No emails found
            </h3>
            <p className="text-neutral-700 max-w-md">
              {selectedFolder === "inbox"
                ? "Your inbox is empty. Emails you receive will appear here."
                : `There are no emails in ${selectedFolder}.`}
            </p>
          </div>
        ) : (
          <table className="min-w-full divide-y divide-neutral-200">
            <thead className="bg-white">
              <tr>
                <th scope="col" className="w-12 px-4 py-3"></th>
                <th scope="col" className="w-12 px-2 py-3"></th>
                <th
                  scope="col"
                  className="px-3 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort("sender")}
                >
                  Sender
                </th>
                <th
                  scope="col"
                  className="px-3 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider cursor-pointer flex-1"
                  onClick={() => requestSort("subject")}
                >
                  Subject
                </th>
                <th
                  scope="col"
                  className="px-3 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider cursor-pointer w-32"
                  onClick={() => requestSort("date")}
                >
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-neutral-200">
              {sortedEmails.map((email) => (
                <tr
                  key={email.id}
                  onClick={() => handleEmailClick(email)}
                  className={`cursor-pointer ${
                    !email.read
                      ? "font-medium bg-blue-50/50"
                      : "hover:bg-primary-50/30"
                  }`}
                >
                  <td className="px-4 py-3 whitespace-nowrap">
                    <input
                      type="checkbox"
                      className="rounded text-primary-600 focus:ring-primary-500 h-4 w-4"
                      checked={selectedEmails.includes(email.id)}
                      onChange={(e) => toggleEmailSelection(email.id, e)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </td>
                  <td className="px-2 py-3 whitespace-nowrap">
                    <button
                      className="text-neutral-400 hover:text-yellow-400"
                      onClick={(e) => toggleStar(email.id, e)}
                    >
                      {email.starred ? (
                        <TbStarFilled className="h-5 w-5 text-yellow-400" />
                      ) : (
                        <TbStar className="h-5 w-5" />
                      )}
                    </button>
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      {email.read ? (
                        <TbMailOpened className="h-5 w-5 text-neutral-400 mr-2" />
                      ) : (
                        <TbMail className="h-5 w-5 text-primary-500 mr-2" />
                      )}
                      <span>{email.sender}</span>
                    </div>
                  </td>
                  <td className="px-3 py-3">
                    <div className="flex items-center">
                      <span className="truncate max-w-xs inline-block">
                        {email.subject}
                      </span>
                      {email.hasAttachment && (
                        <TbPaperclip className="h-4 w-4 text-neutral-400 ml-2" />
                      )}
                      {email.important && (
                        <TbAlertCircle className="h-4 w-4 text-red-500 ml-2" />
                      )}
                    </div>
                    <div className="text-sm text-neutral-500 truncate max-w-xs">
                      {email.preview}
                    </div>
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap text-sm text-neutral-500">
                    {formatDate(email.date)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      <div className="p-4 border-t border-neutral-200 flex items-center justify-between bg-white">
        <button className="px-4 py-2 text-sm text-neutral-800 hover:bg-primary-50 rounded-md disabled:opacity-50 disabled:cursor-not-allowed">
          Previous
        </button>
        <span className="text-sm text-neutral-800">Page 1 of 5</span>
        <button className="px-4 py-2 text-sm text-neutral-800 hover:bg-primary-50 rounded-md">
          Next
        </button>
      </div>
    </div>
  );
};

export default EmailList;
