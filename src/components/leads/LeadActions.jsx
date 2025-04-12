import React, { useState, useRef, useEffect } from "react";
import {
  TbEye,
  TbEdit,
  TbTrash,
  TbStar,
  TbStarFilled,
  TbSend,
  TbArrowRight,
  TbPhone,
  TbBrandWhatsapp,
  TbCheck,
  TbDotsVertical,
} from "react-icons/tb";

const LeadActions = ({
  lead,
  onView,
  onEdit,
  onDelete,
  onToggleStar,
  onMarkConverted,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Toggle dropdown
  const toggleDropdown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  // Handle action click
  const handleAction = (action, e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(false);
    action();
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="text-gray-400 hover:text-gray-600 p-1 rounded-md hover:bg-gray-100"
        onClick={toggleDropdown}
        aria-label="Lead actions"
      >
        <TbDotsVertical className="h-4 w-4" />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10 overflow-hidden">
          <div className="py-1">
            {/* View details */}
            <button
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
              onClick={(e) => handleAction(() => onView(lead), e)}
            >
              <TbEye className="mr-2 text-blue-500" /> View Details
            </button>

            {/* Edit */}
            <button
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
              onClick={(e) => handleAction(() => onEdit(lead), e)}
            >
              <TbEdit className="mr-2 text-purple-500" /> Edit Lead
            </button>

            <div className="border-t border-gray-100 my-1"></div>

            {/* Star/Unstar */}
            <button
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
              onClick={(e) =>
                handleAction(() => onToggleStar(lead.id, lead.status), e)
              }
            >
              {lead.starred ? (
                <>
                  <TbStar className="mr-2 text-gray-500" /> Remove Star
                </>
              ) : (
                <>
                  <TbStarFilled className="mr-2 text-yellow-500" /> Star Lead
                </>
              )}
            </button>

            {/* Mark as converted (if not already) */}
            {lead.status !== "converted" && (
              <button
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                onClick={(e) => handleAction(() => onMarkConverted(lead.id), e)}
              >
                <TbCheck className="mr-2 text-green-500" /> Mark as Converted
              </button>
            )}

            <div className="border-t border-gray-100 my-1"></div>

            {/* Contact actions */}
            <button
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
              onClick={(e) =>
                handleAction(() => alert(`Email to ${lead.email}`), e)
              }
            >
              <TbSend className="mr-2 text-blue-500" /> Send Email
            </button>

            <button
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
              onClick={(e) =>
                handleAction(() => alert(`Call ${lead.phone}`), e)
              }
            >
              <TbPhone className="mr-2 text-green-500" /> Call Lead
            </button>

            <button
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
              onClick={(e) =>
                handleAction(() => alert(`WhatsApp to ${lead.phone}`), e)
              }
            >
              <TbBrandWhatsapp className="mr-2 text-green-600" /> WhatsApp
            </button>

            <div className="border-t border-gray-100 my-1"></div>

            {/* Delete */}
            <button
              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center"
              onClick={(e) => handleAction(() => onDelete(lead.id), e)}
            >
              <TbTrash className="mr-2" /> Delete Lead
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadActions;
