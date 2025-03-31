import { NavLink } from "react-router-dom";
import {
  TbHome,
  TbUsers,
  TbFileText,
  TbSettings,
  TbDatabase,
  TbChartBar,
  TbStack,
  TbMessages,
  TbMailbox,
  TbBuildingStore,
  TbAddressBook,
  TbChevronRight,
  TbHeadphones,
  TbClipboard,
  TbActivity,
  TbCalendarEvent,
  TbShieldCheck,
  TbBell,
  TbClock,
  TbListCheck,
  TbArrowsExchange,
  TbPremiumRights,
  TbTargetArrow,
  TbHeart,
  TbUserCheck,
  TbUserPlus,
  TbShieldHalfFilled,
  TbStack2,
  TbShieldCheckFilled,
  TbMailStar,
  TbShieldQuestion,
} from "react-icons/tb";
import { MdSpaceDashboard } from "react-icons/md";
import { useState, useEffect, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  PiAddressBookDuotone,
  PiBuildingOfficeDuotone,
  PiUserCheckBold,
  PiUsersDuotone,
} from "react-icons/pi";
import {
  RiUserAddLine,
  RiUserFollowLine,
  RiUserReceived2Line,
  RiUserShared2Line,
} from "react-icons/ri";

// Navigation items structure with nested menu capabilities
const navItems = [
  {
    name: "Dashboard",
    icon: MdSpaceDashboard,
    path: "/admin/dashboard",
  },
  {
    name: "Clients & Leads",
    icon: PiUsersDuotone,
    path: "/admin/clients",
    badge: 7,
    badgeColor: "bg-secondary-500",
    submenu: [
      {
        name: "Client Management",
        path: "/admin/clients",
        icon: RiUserFollowLine,
      },
      {
        name: "Lead Pipeline",
        path: "/admin/leads",
        icon: RiUserAddLine,
      },
      {
        name: "Converted Clients",
        path: "/admin/clients/converted",
        icon: RiUserShared2Line,
      },
    ],
  },
  {
    name: "Queries",
    icon: TbShieldQuestion,
    path: "/admin/queries",
    submenu: [
      {
        name: "New Queries",
        path: "/admin/queries/new",
        badge: "5",
        badgeColor: "bg-secondary-500",
      },
      {
        name: "Processed Queries",
        path: "/admin/queries/processed",
      },
    ],
  },
  {
    name: "Insurance",
    icon: TbShieldHalfFilled,
    path: "/admin/plans",
    submenu: [
      {
        name: "Insurance Companies",
        path: "/admin/companies",
        icon: PiBuildingOfficeDuotone,
      },
      {
        name: "Insurance Plans",
        path: "/admin/plans",
        icon: TbStack2,
        badge: "New",
        badgeColor: "bg-green-500",
      },
      {
        name: "Active Policies",
        path: "/admin/policies",
        icon: TbShieldCheckFilled,
      },
    ],
  },
  {
    name: "Renewals",
    icon: TbCalendarEvent,
    path: "/admin/renewals",
    badge: "12",
    badgeColor: "bg-yellow-500",
  },
  {
    name: "Email Center",
    icon: TbMailStar,
    path: "/admin/mail",
    // submenu: [
    //   {
    //     name: "Email Center",
    //     path: "/admin/mail",
    //     icon: TbMailStar,
    //   },
    //   {
    //     name: "SMS Campaigns",
    //     path: "/admin/sms",
    //     icon: TbMessages,
    //   },
    //   {
    //     name: "Call Logs",
    //     path: "/admin/calls",
    //     icon: TbHeadphones,
    //   },
    // ],
  },
  {
    name: "Tasks",
    icon: TbListCheck,
    path: "/admin/tasks",
  },
  {
    name: "Reports",
    icon: TbFileText,
    path: "/admin/reports",
  },
  {
    name: "Analytics",
    icon: TbChartBar,
    path: "/admin/analytics",
  },
  {
    name: "Settings",
    icon: TbSettings,
    path: "/admin/settings",
  },
];

const AdminSidebar = ({ collapsed }) => {
  // Initialize all submenus as open by default
  const [openSubmenus, setOpenSubmenus] = useState(() => {
    const initialOpen = {};
    navItems.forEach((item) => {
      if (item.submenu) {
        initialOpen[item.name] = true;
      }
    });
    return initialOpen;
  });

  // Handle submenu toggle
  const toggleSubmenu = (itemName) => {
    setOpenSubmenus((prev) => ({
      ...prev,
      [itemName]: !prev[itemName],
    }));
  };

  // Reset all submenus to open when sidebar expands
  useEffect(() => {
    if (!collapsed) {
      const allOpen = {};
      navItems.forEach((item) => {
        if (item.submenu) {
          allOpen[item.name] = true;
        }
      });
      setOpenSubmenus(allOpen);
    }
  }, [collapsed]);

  return (
    <aside
      className={`h-full bg-neutral-900 border-r border-white/10 flex flex-col transition-all duration-300 font-lexend ${
        collapsed ? "w-20" : "w-[280px]"
      }`}
    >
      {/* Sidebar content */}
      <div className="flex-1 overflow-y-auto py-6 px-3 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
        {/* Navigation links */}
        <nav className="space-y-1">
          {navItems.map((item) => (
            <div key={item.name} className="mb-1">
              {/* Main menu item */}
              {item.path ? (
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 group
                    ${
                      isActive
                        ? "bg-white/20 text-secondary-500 font-medium"
                        : "text-white/80 hover:text-white hover:bg-white/10"
                    }`
                  }
                  onClick={
                    item.submenu ? () => toggleSubmenu(item.name) : undefined
                  }
                >
                  <div className="flex items-center">
                    <div
                      className={({
                        isActive,
                      }) => ` flex-shrink-0 h-7 w-7 flex items-center justify-center rounded-md
                        ${
                          isActive
                            ? "text-secondary-500"
                            : "text-white/70 group-hover:text-white"
                        }`}
                    >
                      <item.icon
                        className={`${
                          collapsed ? "h-6 w-6" : "h-[1.3rem] w-[1.3rem]"
                        }`}
                      />
                    </div>
                    {!collapsed && (
                      <span className="text-sm ml-2">{item.name}</span>
                    )}
                  </div>

                  {!collapsed && (
                    <div className="flex items-center">
                      {item.badge && (
                        <span
                          className={`${item.badgeColor} text-white text-xs px-2 py-0.5 rounded-full mr-2`}
                        >
                          {item.badge}
                        </span>
                      )}
                      {item.submenu && (
                        <TbChevronRight
                          className={`h-4 w-4 text-white/30 group-hover:text-white/60 transition-transform duration-300 ${
                            openSubmenus[item.name] ? "rotate-90" : ""
                          }`}
                        />
                      )}
                    </div>
                  )}
                </NavLink>
              ) : (
                <button
                  className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg transition-all duration-200 group
                  text-white/70 hover:text-white hover:bg-white/5`}
                  onClick={() => toggleSubmenu(item.name)}
                >
                  <div className="flex items-center">
                    <div className="mr-3 flex-shrink-0 h-7 w-7 flex items-center justify-center rounded-md text-white/70 group-hover:text-white">
                      <item.icon
                        className={`${collapsed ? "h-6 w-6" : "h-5 w-5"}`}
                      />
                    </div>
                    {!collapsed && <span className="text-sm">{item.name}</span>}
                  </div>

                  {!collapsed && (
                    <div className="flex items-center">
                      {item.badge && (
                        <span
                          className={`${item.badgeColor} text-white text-xs px-2 py-0.5 rounded-full mr-2`}
                        >
                          {item.badge}
                        </span>
                      )}
                      {item.submenu && (
                        <TbChevronRight
                          className={`h-4 w-4 text-white/30 group-hover:text-white/60 transition-transform duration-300 ${
                            openSubmenus[item.name] ? "rotate-90" : ""
                          }`}
                        />
                      )}
                    </div>
                  )}
                </button>
              )}

              {/* Submenu items */}
              {!collapsed && item.submenu && (
                <AnimatePresence>
                  {openSubmenus[item.name] && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="mt-1 ml-7 space-y-1 border-l border-white/10 pl-3"
                    >
                      {item.submenu.map((subItem) => (
                        <NavLink
                          key={subItem.name}
                          to={subItem.path}
                          className={({ isActive }) =>
                            `flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all duration-200
                            ${
                              isActive
                                ? "bg-white/5 text-white"
                                : "text-white/60 hover:text-white hover:bg-white/5"
                            }`
                          }
                        >
                          <div className="flex items-center">
                            {subItem.icon && (
                              <subItem.icon className="h-4 w-4 mr-2 text-white/50" />
                            )}
                            <span className="text-xs">{subItem.name}</span>
                          </div>
                          {subItem.badge && (
                            <span
                              className={`${subItem.badgeColor} text-white text-xs px-1.5 py-0.5 rounded-full text-[10px]`}
                            >
                              {subItem.badge}
                            </span>
                          )}
                        </NavLink>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Bottom section */}
      <div className="px-4 py-3 border-t border-white/10">
        <div className="text-xs text-white/50 flex items-center space-x-2">
          <img
            src="/lako-logo.png"
            alt="Lako Insurance CRM"
            className="w-12 h-10"
          />
          {!collapsed && <span className="">Lako Insurance CRM v1.3.1</span>}
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;
