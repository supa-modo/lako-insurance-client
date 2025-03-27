import { NavLink } from "react-router-dom";
import {
  FiHome,
  FiUsers,
  FiFileText,
  FiSettings,
  FiDatabase,
  FiBarChart2,
  FiLayers,
} from "react-icons/fi";

const navItems = [
  { name: "Dashboard", icon: FiHome, path: "/admin/dashboard" },
  { name: "User Queries", icon: FiUsers, path: "/admin/queries" },
  { name: "Reports", icon: FiFileText, path: "/admin/reports" },
  { name: "Companies", icon: FiDatabase, path: "/admin/companies" },
  { name: "Plans", icon: FiLayers, path: "/admin/plans" },
  { name: "Analytics", icon: FiBarChart2, path: "/admin/analytics" },
  { name: "Settings", icon: FiSettings, path: "/admin/settings" },
];

const AdminSidebar = () => {
  return (
    <aside className="bg-white w-64 min-h-full shadow-soft hidden md:block">
      <nav className="mt-4">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 text-gray-700 hover:bg-primary-50 hover:text-primary-500 transition-colors ${
                    isActive
                      ? "bg-primary-50 text-primary-500 border-r-4 border-primary-500"
                      : ""
                  }`
                }
              >
                <item.icon className="h-5 w-5 mr-3" />
                <span className="font-medium">{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
