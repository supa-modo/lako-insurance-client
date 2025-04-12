import React from "react";
import { NavLink } from "react-router-dom";
import {
  TbInbox,
  TbSend,
  TbStar,
  TbTrash,
  TbMailPause,
  TbTemplate,
  TbFolders,
  TbUsers,
  TbTag,
  TbArchive,
  TbChevronRight,
  TbPlus,
  TbFolder,
  TbPencil,
  TbMailExclamation,
  TbFilter,
  TbChevronDown,
} from "react-icons/tb";
import { BsSendPlus } from "react-icons/bs";

const EmailSidebar = ({ onComposeClick, folder, counts = {} }) => {
  // Email folder structure
  const mainFolders = [
    {
      id: "inbox",
      name: "Inbox",
      icon: TbInbox,
      count: counts.inbox || 0,
      unread: counts.unread || 0,
      route: "/admin/mail",
    },
    {
      id: "sent",
      name: "Sent Items",
      icon: TbSend,
      count: counts.sent || 0,
      route: "/admin/mail/sent",
    },
    {
      id: "drafts",
      name: "Drafts",
      icon: TbMailPause,
      count: counts.drafts || 0,
      route: "/admin/mail/drafts",
    },
    {
      id: "starred",
      name: "Starred",
      icon: TbStar,
      count: counts.starred || 0,
      route: "/admin/mail/starred",
    },
    {
      id: "spam",
      name: "Spam",
      icon: TbMailExclamation,
      route: "/admin/mail/spam",
    },
    {
      id: "trash",
      name: "Trash",
      icon: TbTrash,
      route: "/admin/mail/trash",
    },
  ];

  const customFolders = [
    {
      id: "clients",
      name: "Clients",
      icon: TbUsers,
      route: "/admin/mail/folder/clients",
    },
    {
      id: "leads",
      name: "Leads",
      icon: TbUsers,
      route: "/admin/mail/folder/leads",
    },
    {
      id: "insurance",
      name: "Insurance Providers",
      icon: TbFolder,
      route: "/admin/mail/folder/insurance",
    },
  ];

  const labels = [
    { id: "important", name: "Important", color: "bg-red-500" },
    { id: "personal", name: "Personal", color: "bg-blue-500" },
    { id: "claims", name: "Claims", color: "bg-yellow-500" },
    { id: "follow-up", name: "Follow-up", color: "bg-purple-500" },
  ];

  return (
    <div className="w-full h-full shadow-sm overflow-hidden flex flex-col">
      {/* Compose button */}
      <div className="p-4">
        <button
          onClick={onComposeClick}
          className="w-full bg-primary-600 hover:bg-primary-700 text-white py-2.5 px-4 rounded-md flex items-center justify-center transition-colors"
        >
          <BsSendPlus className="mr-3 h-5 w-5 rotate-12" /> Compose Email
        </button>
      </div>

      {/* Folders */}
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
        <div className="px-3 pb-2">
          <div className="mb-4">
            <div className="text-[0.65rem] uppercase tracking-wide text-secondary-700 font-semibold px-3 py-1">
              Main
            </div>
            <ul className="space-y-1">
              {mainFolders.map((folder) => (
                <li key={folder.id}>
                  <NavLink
                    to={folder.route}
                    end={folder.id === "inbox"}
                    className={({ isActive }) =>
                      `flex items-center justify-between px-3 py-2.5 rounded-md transition-all duration-200 group
                      ${
                        isActive
                          ? "bg-primary-100 text-primary-700 font-medium"
                          : "text-neutral-800 hover:bg-secondary-100 hover:bg-opacity-90"
                      }`
                    }
                  >
                    <div className="flex items-center">
                      <folder.icon className="h-5 w-5 mr-3" />
                      <span className="text-sm">{folder.name}</span>
                    </div>
                    {(folder.count > 0 || folder.unread > 0) && (
                      <div className="flex items-center">
                        {folder.unread > 0 && (
                          <span className="bg-primary-500 text-white text-xs px-2 py-0.5 rounded-full mr-2">
                            {folder.unread}
                          </span>
                        )}
                        {/* {folder.count > 0 && folder.id !== "inbox" && (
                          <span className="bg-primary-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                            {folder.count}
                          </span>
                        )} */}
                      </div>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-4">
            <div className="text-[0.65rem] uppercase tracking-wide text-secondary-700 font-semibold px-3 py-1 flex justify-between items-center">
              <span>Folders</span>
              <button className="text-neutral-500 hover:text-primary-700">
                <TbPlus className="h-4 w-4" />
              </button>
            </div>
            <ul className="space-y-1">
              {customFolders.map((folder) => (
                <li key={folder.id}>
                  <NavLink
                    to={folder.route}
                    className={({ isActive }) =>
                      `flex items-center justify-between px-3 py-2.5 rounded-md transition-all duration-200 group
                      ${
                        isActive
                          ? "bg-primary-50 text-primary-700 font-medium"
                          : "text-neutral-800 hover:bg-secondary-100 hover:bg-opacity-90"
                      }`
                    }
                  >
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-md text-neutral-700 group-hover:text-primary-700">
                        <folder.icon className="h-5 w-5" />
                      </div>
                      <span className="text-sm ml-2">{folder.name}</span>
                    </div>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-4">
            <div className="text-[0.65rem] uppercase tracking-wide text-secondary-700 font-semibold px-3 py-1 flex justify-between items-center">
              <span>Labels</span>
              <button className="text-neutral-500 hover:text-neutral-700">
                <TbPlus className="h-4 w-4" />
              </button>
            </div>
            <ul className="space-y-1">
              {labels.map((label) => (
                <li key={label.id}>
                  <NavLink
                    to={`/admin/mail/label/${label.id}`}
                    className={({ isActive }) =>
                      `flex items-center px-3 py-2 rounded-lg transition-all duration-200
                      ${
                        isActive
                          ? "bg-primary-50 text-primary-700 font-medium"
                          : "text-neutral-800 hover:bg-white hover:bg-opacity-90"
                      }`
                    }
                  >
                    <div
                      className={`h-3 w-3 rounded-full ${label.color} mr-3`}
                    ></div>
                    <span className="text-sm">{label.name}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Storage indicator */}
      {/* <div className="p-4 border-t border-neutral-300">
        <div className="mb-2 flex justify-between items-center text-xs text-neutral-500">
          <span>Storage</span>
          <span>65% of 15GB used</span>
        </div>
        <div className="w-full bg-neutral-300 rounded-full h-2">
          <div className="bg-primary-500 h-2 rounded-full w-[65%]"></div>
        </div>
      </div> */}
    </div>
  );
};

export default EmailSidebar;
