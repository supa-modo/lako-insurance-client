import { NavLink } from "react-router-dom";
import {
  TbFileText,
  TbSettings,
  TbChartBar,
  TbChevronRight,
  TbCalendarEvent,
  TbListCheck,
  TbShieldHalfFilled,
  TbStack2,
  TbShieldCheckFilled,
  TbMailStar,
  TbShieldQuestion,
  TbLogout,
} from "react-icons/tb";
import { MdSpaceDashboard } from "react-icons/md";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PiUsersDuotone } from "react-icons/pi";
import { RiUserFollowLine, RiUserShared2Line } from "react-icons/ri";

// Navigation items with categories for better organization
const navItems = [
  {
    category: "null",
    items: [
      {
        name: "Dashboard",
        icon: MdSpaceDashboard,
        path: "/admin/dashboard",
      },
    ],
  },
  {
    category: "Client Management",
    items: [
      {
        name: "Clients & Leads",
        icon: PiUsersDuotone,
        path: "/admin/clients",
        badge: 7,
        badgeColor: "bg-secondary-500",
        submenu: [
          {
            name: "Client Management",
            path: "/admin/clients/converted",
            icon: RiUserFollowLine,
          },
          {
            name: "Lead Pipeline",
            path: "/admin/clients/leads",
            icon: RiUserShared2Line,
          },
        ],
      },
      {
        name: "Insurance Queries",
        icon: TbShieldQuestion,
        path: "/admin/queries",
        submenu: [
          {
            name: "All Queries",
            path: "/admin/queries/all",
            badge: "5",
            badgeColor: "bg-secondary-500",
          },
          {
            name: "Processed Queries",
            path: "/admin/queries/processed",
          },
        ],
      },
    ],
  },
  {
    category: "Insurance",
    items: [
      {
        name: "Insurance",
        icon: TbShieldHalfFilled,
        path: "/admin/plans",
        submenu: [
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
    ],
  },
  {
    category: "Communication",
    items: [
      {
        name: "Email Center",
        icon: TbMailStar,
        path: "/admin/mail",
      },
      {
        name: "Calendar",
        icon: TbCalendarEvent,
        path: "/admin/calendar",
      },
      {
        name: "Tasks",
        icon: TbListCheck,
        path: "/admin/tasks",
      },
    ],
  },
  {
    category: "Analytics",
    items: [
      {
        name: "Analytics & Reports",
        icon: TbChartBar,
        path: "/admin/analytics",
      },
    ],
  },
  {
    category: "null",
    items: [
      {
        name: "Settings",
        icon: TbSettings,
        path: "/admin/settings",
      },
    ],
  },
];

const AdminSidebar = ({ collapsed }) => {
  // Initialize only the "Clients & Leads" submenu as open by default
  const [openSubmenus, setOpenSubmenus] = useState(() => {
    const initialOpen = {};
    navItems.forEach((category) => {
      category.items.forEach((item) => {
        // Only open "Clients & Leads" by default
        if (item.name === "Clients & Leads") {
          initialOpen[item.name] = true;
        }
      });
    });
    return initialOpen;
  });

  // Handle submenu toggle - close other open submenus when opening a new one
  const toggleSubmenu = (itemName) => {
    setOpenSubmenus((prev) => {
      // Create a new object with all submenus closed
      const allClosed = {};
      // If the clicked item is already open, just close it
      if (prev[itemName]) {
        return allClosed;
      }
      // Otherwise, open only the clicked item
      return {
        ...allClosed,
        [itemName]: true,
      };
    });
  };

  // Reset submenu state when sidebar expands - only "Clients & Leads" is open
  useEffect(() => {
    if (!collapsed) {
      const clientsOnly = {};
      navItems.forEach((category) => {
        category.items.forEach((item) => {
          if (item.name === "Clients & Leads") {
            clientsOnly[item.name] = true;
          }
        });
      });
      setOpenSubmenus(clientsOnly);
    }
  }, [collapsed]);

  return (
    <aside
      className={`h-full bg-primary-800  border-r border-white/10 flex flex-col transition-all duration-300 font-lexend ${
        collapsed ? "w-20" : "w-[285px]"
      }`}
    >
      {/* Sidebar content */}
      <div className="flex-1 overflow-y-auto py-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
        {/* Navigation links by category */}
        <nav>
          {navItems.map((category, index) => (
            <div key={index} className="mb-1 px-3">
              {/* Category label */}
              {category.category !== "null" && !collapsed && (
                <div className="text-[0.65rem] uppercase tracking-wider text-white/40 font-medium px-3 py-1">
                  {category.category}
                </div>
              )}

              {/* Category items */}
              <div className="space-y-1">
                {category.items.map((item) => (
                  <div key={item.name} className="mb-1">
                    {/* Main menu item */}
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        `flex items-center justify-between px-3 py-2 rounded-lg transition-all duration-200 group
                        ${
                          isActive
                            ? "bg-gradient-to-r from-secondary-500/20 to-secondary-500/10 text-secondary-400 font-medium"
                            : "text-white/70 hover:text-white hover:bg-white/5"
                        }`
                      }
                      onClick={
                        item.submenu
                          ? (e) => {
                              if (!collapsed) {
                                e.preventDefault();
                                toggleSubmenu(item.name);
                              }
                            }
                          : undefined
                      }
                    >
                      <div className="flex items-center">
                        <div
                          className={`flex-shrink-0 h-8 w-8 flex items-center justify-center rounded-md ${(
                            isActive
                          ) =>
                            isActive
                              ? "text-secondary-400"
                              : "text-white/60 group-hover:text-white"}`}
                        >
                          <item.icon
                            className={`${
                              collapsed ? "h-7 w-7" : "h-[1.4rem] w-[1.4rem]"
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

                    {/* Submenu items */}
                    {!collapsed && item.submenu && (
                      <AnimatePresence>
                        {openSubmenus[item.name] && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="mt-1 ml-10 space-y-1 border-l border-white/10 pl-3"
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
                                  <span className="text-xs">
                                    {subItem.name}
                                  </span>
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
              </div>

              {/* Category separator */}
              {index < navItems.length - 1 && (
                <div
                  className={`${
                    collapsed ? "mx-3" : "mx-1"
                  } my-3 border-t border-white/5`}
                ></div>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Bottom section with user profile */}
      <div className="border-t border-white/10 px-3 py-2">
        <div
          className={`flex items-center ${
            collapsed ? "justify-center" : "justify-between"
          } p-2 rounded-lg hover:bg-white/5 cursor-pointer group transition-colors`}
        >
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-secondary-700 flex items-center justify-center text-white font-medium">
              A
            </div>
            {!collapsed && (
              <div className="ml-2">
                <div className="text-sm text-white font-medium">Admin User</div>
                <div className="text-xs text-white/50">
                  admin@lakoinsurance.com
                </div>
              </div>
            )}
          </div>

          {!collapsed && (
            <div className="text-white/50 hover:text-white/80 transition-colors">
              <TbLogout className="h-5 w-5" />
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;
