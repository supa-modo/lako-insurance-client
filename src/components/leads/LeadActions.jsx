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
  TbMailFilled,
  TbPhoneCall,
} from "react-icons/tb";
import {FaEye} from "react-icons/fa"

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
        className="text-gray-400 hover:text-gray-600 p-1 rounded-md hover:bg-gray-200"
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
              <FaEye size={15} className="mr-2 text-gray-500" /> View Details
            </button>

            {/* Edit */}
            <button
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
              onClick={(e) => handleAction(() => onEdit(lead), e)}
            >
              <TbEdit size={16} className="mr-2 text-gray-500" /> Edit Lead
            </button>

            <div className="border-t border-gray-200/60 my-1"></div>

            {/* Star/Unstar */}
            <button
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
              onClick={(e) =>
                handleAction(() => onToggleStar(lead.id, lead.status), e)
              }
            >
              {lead.starred ? (
                <>
                  <TbStar size={16} className="mr-2 text-gray-500" /> Remove Star
                </>
              ) : (
                <>
                  <TbStarFilled size={16} className="mr-2 text-amber-500" /> Star Lead
                </>
              )}
            </button>

            {/* Mark as converted (if not already) */}
            {lead.status !== "converted" && (
              <button
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                onClick={(e) => handleAction(() => onMarkConverted(lead.id), e)}
              >
                <TbCheck size={16} className="mr-2 text-green-600" /> Mark as Converted
              </button>
            )}

            <div className="border-t border-gray-100 my-1"></div>

            {/* Contact actions */}
            <a href={`mailto: ${lead.email}`}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
              // onClick={(e) =>
              //   handleAction(() => alert(`Email to ${lead.email}`), e)
              // }
            >
              <TbMailFilled size={16} className="mr-2 text-primary-500" /> Send Email
            </a>

            <a href={`tel: ${lead.phone}`}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
              
            >
              <TbPhoneCall size={16} className="mr-2 text-primary-500" /> Call Lead
            </a>

            <a href={`https://wa.me/${lead.phone}`} target="_blank"
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
              
            >
              <TbBrandWhatsapp size={16} className="mr-2 text-primary-500" /> WhatsApp
            </a>

            <div className="border-t border-gray-100 my-1"></div>

            {/* Delete */}
            <button
              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center"
              onClick={(e) => handleAction(() => onDelete(lead.id), e)}
            >
              <TbTrash size={16} className="mr-2" /> Delete Lead
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadActions;
