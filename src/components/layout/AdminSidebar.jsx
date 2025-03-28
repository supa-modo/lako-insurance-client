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
} from "react-icons/tb";
import { useState } from "react";
import { motion } from "framer-motion";

const navItems = [
  {
    name: "Dashboard",
    icon: TbHome,
    path: "/admin/dashboard",
  },
  {
    name: "Clients",
    icon: TbUsers,
    path: "/admin/clients",
    badge: 7,
    badgeColor: "bg-secondary-500",
  },
  {
    name: "Queries",
    icon: TbAddressBook,
    path: "/admin/queries",
  },
  {
    name: "Reports",
    icon: TbFileText,
    path: "/admin/reports",
  },
  {
    name: "Insurance Companies",
    icon: TbBuildingStore,
    path: "/admin/companies",
  },
  {
    name: "Insurance Plans",
    icon: TbStack,
    path: "/admin/plans",
    badge: "New",
    badgeColor: "bg-green-500",
  },
  {
    name: "Analytics",
    icon: TbChartBar,
    path: "/admin/analytics",
  },
  {
    name: "Email Center",
    icon: TbMailbox,
    path: "/admin/mail",
  },
  {
    name: "Support",
    icon: TbHeadphones,
    path: "/admin/support",
  },
  {
    name: "Settings",
    icon: TbSettings,
    path: "/admin/settings",
  },
];

const AdminSidebar = () => {
  const [expanded, setExpanded] = useState(true);

  return (
    <aside className="w-[280px] h-full bg-white/5 backdrop-blur-md border-r border-white/10 flex flex-col">
      {/* Sidebar content */}
      <div className="flex-1 overflow-y-auto py-6 px-3">
        {/* Navigation links */}
        <nav className="space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 group
                ${
                  isActive
                    ? "bg-white/10 text-white font-medium"
                    : "text-white/70 hover:text-white hover:bg-white/5"
                }`
              }
            >
              <div className="flex items-center">
                <div
                  className={`mr-3 flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-md
                  ${
                    item.path === "/admin/dashboard"
                      ? "text-secondary-400"
                      : "text-white/70 group-hover:text-white"
                  }
                `}
                >
                  <item.icon className="h-5 w-5" />
                </div>
                <span className="text-sm font-outfit">{item.name}</span>
              </div>

              <div className="flex items-center">
                {item.badge && (
                  <span
                    className={`${item.badgeColor} text-white text-xs px-2 py-0.5 rounded-full mr-2`}
                  >
                    {item.badge}
                  </span>
                )}
                <TbChevronRight className="h-4 w-4 text-white/30 group-hover:text-white/60 transition-colors" />
              </div>
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Bottom section with server status */}
      <div className="p-4 border-t border-white/10">
        <div className="bg-white/5 rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-white/80">System Status</h3>
            <span className="h-2 w-2 rounded-full bg-green-500"></span>
          </div>
          <div className="space-y-2">
            <div>
              <div className="flex justify-between items-center text-xs text-white/60 mb-1">
                <span>API Server</span>
                <span>99.9%</span>
              </div>
              <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500 rounded-full"
                  style={{ width: "99.9%" }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center text-xs text-white/60 mb-1">
                <span>Database</span>
                <span>98.5%</span>
              </div>
              <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500 rounded-full"
                  style={{ width: "98.5%" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 text-center text-xs text-white/50">
          v1.2.4 Last updated: Today 09:45
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;
