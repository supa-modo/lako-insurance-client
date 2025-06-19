import { NavLink, useNavigate } from "react-router-dom";
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
  TbBuildingBank,
  TbMessage,
  TbShieldPlus,
  TbListDetails,
  TbClockExclamation,
  TbUsers,
  TbShield,
  TbActivity,
  TbDatabase,
  TbReport,
  TbUserCog,
  TbShieldX,
} from "react-icons/tb";
import { MdSpaceDashboard } from "react-icons/md";
import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PiUsersDuotone } from "react-icons/pi";
import { LuLogOut } from "react-icons/lu";
import {
  RiAdminLine,
  RiUserFollowLine,
  RiUserShared2Line,
} from "react-icons/ri";
import { useAuth } from "../../context/AuthContext";

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
    category: "Insurance Applications",
    items: [
      {
        name: "All Applications",
        icon: TbListDetails,
        path: "/admin/applications",
        submenu: [
          {
            name: "Processed Applications",
            path: "/admin/applications/processed",
            icon: TbListCheck,
          },
          {
            name: "Pending Applications",
            path: "/admin/applications/pending",
            icon: TbClockExclamation,
          },
        ],
      },
      {
        name: "Approved Applications",
        icon: TbShieldCheckFilled,
        path: "/admin/approved-applications",
      },
    ],
  },
  {
    category: "Insurance",
    items: [
      {
        name: "Insurance Plans",
        icon: TbShieldHalfFilled,
        path: "/admin/plans",
      },
      {
        name: "Insurance Companies",
        icon: TbBuildingBank,
        path: "/admin/companies",
      },
    ],
  },
  {
    category: "Communication",
    items: [
      // {
      //   name: "Email Center",
      //   icon: TbMailStar,
      //   path: "/admin/mail",
      // },
      {
        name: "Callbacks & Messages",
        icon: TbMessage,
        path: "/admin/messages",
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
  // {
  //   category: "Analytics",
  //   items: [
  //     {
  //       name: "Analytics & Reports",
  //       icon: TbChartBar,
  //       path: "/admin/analytics",
  //     },
  //   ],
  // },
  {
    category: "SuperAdmin",
    items: [
      {
        name: "SuperAdmin Panel",
        icon: RiAdminLine,
        path: "/admin/superAdmin",
        badge: "SA",
        badgeColor: "bg-red-500",
        requiresSuperAdmin: true,
        submenu: [
          {
            name: "User Management",
            path: "/admin/users",
            icon: PiUsersDuotone,
          },
          {
            name: "Security Analytics",
            path: "/admin/security",
            icon: TbShield,
          },
          {
            name: "Audit Logs",
            path: "/admin/audit-logs",
            icon: TbFileText,
          },
          {
            name: "User Activities",
            path: "/admin/user-activities",
            icon: TbActivity,
          },
        ],
      },
    ],
  },
  {
    category: "null",
    items: [
      {
        name: "Settings",
        icon: TbSettings,
        //TODO: To chnage this later after working on the settings page
        path: "/admin/security",
      },
    ],
  },
];

const AdminSidebar = ({ collapsed }) => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  // Always show all nav items including SuperAdmin
  const allNavItems = navItems;

  // Initialize only the "Clients & Leads" submenu as open by default
  const [openSubmenus, setOpenSubmenus] = useState({});
  const [showAccessError, setShowAccessError] = useState(false);

  // Handle submenu toggle - close other open submenus when opening a new one
  const toggleSubmenu = (itemName, requiresSuperAdmin = false) => {
    // Check SuperAdmin access if required
    if (requiresSuperAdmin && user?.role !== "superadmin") {
      setShowAccessError(true);
      setTimeout(() => setShowAccessError(false), 8000);
      return;
    }

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

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  // Reset submenu state when sidebar expands or user role changes
  useEffect(() => {
    if (!collapsed) {
      // Reset submenus to empty state when sidebar expands
      setOpenSubmenus({});
    }
  }, [collapsed]);

  // Initialize default open state when user role changes
  useEffect(() => {
    const initialOpen = {};
    if (user?.role === "superadmin") {
      // No default open menus for better UX
    }
    setOpenSubmenus(initialOpen);
  }, [user?.role]);

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
          {allNavItems.map((category, index) => (
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
                                toggleSubmenu(
                                  item.name,
                                  item.requiresSuperAdmin
                                );
                                // Navigate to the main path for "All Applications"
                                if (item.name === "All Applications") {
                                  navigate("/admin/applications");
                                }
                                // Navigate to SuperAdmin if authorized
                                if (
                                  item.name === "SuperAdmin Panel" &&
                                  user?.role === "superadmin"
                                ) {
                                  navigate("/admin/superAdmin");
                                }
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
              {index < allNavItems.length - 1 && (
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
      <div className="border-t border-white/10 px-3 py-4">
        <div className="rounded-xl bg-white/10 backdrop-blur-sm p-1.5 border border-white/5">
          <button
            onClick={() => {
              handleLogout();
            }}
            className={`flex w-full justify-center items-center rounded-lg ${
              !collapsed ? "px-4 space-x-2" : "px-0 justify-center"
            } py-2.5 text-left text-sm font-medium text-white hover:bg-red-500 hover:text-white transition-all duration-200`}
          >
            <LuLogOut className="w-5 h-5" />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </div>

      {/* Access Error Toast */}
      {showAccessError && (
        <div className="fixed top-20 right-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-pulse">
          <div className="flex items-center">
            <TbShieldX className="h-4 w-4 mr-2" />
            <span className="text-sm">
              Access denied. SuperAdmin role required.
            </span>
          </div>
        </div>
      )}
    </aside>
  );
};

export default AdminSidebar;
