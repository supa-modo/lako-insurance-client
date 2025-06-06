import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  TbPlus,
  TbEdit,
  TbTrash,
  TbSearch,
  TbFilter,
  TbDotsVertical,
  TbUser,
  TbMail,
  TbPhone,
  TbShield,
  TbKey,
  TbEye,
  TbEyeOff,
  TbRefresh,
  TbChevronDown,
  TbUserCheck,
  TbUserOff,
  TbX,
  TbAlertTriangle,
  TbChevronLeft,
  TbChevronRight,
  TbUsers,
  TbUserPlus,
  TbUserCog,
  TbShieldCheck,
  TbDatabase,
  TbReport,
  TbDatabaseExport,
} from "react-icons/tb";
import { userAPI } from "../../api/superadminApi";
import CreateUserModal from "./CreateUserModal";
import EditUserModal from "./EditUserModal";
import ConfirmDialog from "../common/ConfirmDialog";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showResetPasswordDialog, setShowResetPasswordDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [statistics, setStatistics] = useState({
    totalUsers: 0,
    activeUsers: 0,
    twoFAEnabled: 0,
    adminUsers: 0,
  });

  const roles = ["superadmin", "admin", "agent", "manager", "staff"];
  const roleColors = {
    superadmin: "bg-red-100 text-red-800 border-red-200",
    admin: "bg-purple-100 text-purple-800 border-purple-200",
    agent: "bg-blue-100 text-blue-800 border-blue-200",
    manager: "bg-green-100 text-green-800 border-green-200",
    staff: "bg-gray-100 text-gray-800 border-gray-200",
  };

  useEffect(() => {
    fetchUsers();
  }, [currentPage, searchTerm, roleFilter, statusFilter]);

  useEffect(() => {
    calculateStatistics();
  }, [users]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const params = {
        page: currentPage,
        limit: 10,
        search: searchTerm || undefined,
        role: roleFilter !== "all" ? roleFilter : undefined,
        status: statusFilter !== "all" ? statusFilter : undefined,
      };

      const response = await userAPI.getUsers(params);
      setUsers(response.data.users);
      setTotalPages(response.data.pagination.totalPages);
    } catch (error) {
      console.error("Error fetching users:", error);
      setError("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const calculateStatistics = () => {
    setStatistics({
      totalUsers: users.length,
      activeUsers: users.filter((user) => user.isActive).length,
      twoFAEnabled: users.filter((user) => user.twoFactorEnabled).length,
      adminUsers: users.filter((user) =>
        ["admin", "superadmin"].includes(user.role)
      ).length,
    });
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchUsers();
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  const handleCreateUser = async (userData) => {
    try {
      await userAPI.createUser(userData);
      setShowCreateModal(false);
      fetchUsers();
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  };

  const handleEditUser = async (userData) => {
    try {
      await userAPI.updateUser(selectedUser.id, userData);
      setShowEditModal(false);
      setSelectedUser(null);
      fetchUsers();
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  };

  const handleDeleteUser = async () => {
    try {
      await userAPI.deleteUser(selectedUser.id);
      setShowDeleteDialog(false);
      setSelectedUser(null);
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleResetPassword = async () => {
    try {
      await userAPI.resetUserPassword(selectedUser.id, newPassword);
      setShowResetPasswordDialog(false);
      setSelectedUser(null);
      setNewPassword("");
    } catch (error) {
      console.error("Error resetting password:", error);
    }
  };

  const UserRow = ({ user, index }) => (
    <motion.tr
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
    >
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10">
            <div className="h-10 w-10 rounded-full bg-primary-500 flex items-center justify-center">
              <TbUser className="h-5 w-5 text-white" />
            </div>
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">
              {user.firstName} {user.lastName}
            </div>
            <div className="text-sm text-gray-500 flex items-center">
              <TbMail className="h-3 w-3 mr-1" />
              {user.email}
            </div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
            roleColors[user.role]
          }`}
        >
          {user.role}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900 flex items-center">
          <TbPhone className="h-3 w-3 mr-1" />
          {user.phone || "N/A"}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
            user.isActive
              ? "bg-green-100 text-green-800 border-green-200"
              : "bg-red-100 text-red-800 border-red-200"
          }`}
        >
          {user.isActive ? (
            <TbUserCheck className="h-3 w-3 mr-1" />
          ) : (
            <TbUserOff className="h-3 w-3 mr-1" />
          )}
          {user.isActive ? "Active" : "Inactive"}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
            user.twoFactorEnabled
              ? "bg-green-100 text-green-800 border-green-200"
              : "bg-gray-100 text-gray-800 border-gray-200"
          }`}
        >
          <TbShield className="h-3 w-3 mr-1" />
          {user.twoFactorEnabled ? "Enabled" : "Disabled"}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {new Date(user.createdAt).toLocaleDateString()}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <div className="relative">
          <button
            onClick={() =>
              setOpenDropdown(openDropdown === user.id ? null : user.id)
            }
            className="inline-flex items-center px-3 py-2 border border-gray-200 text-sm leading-4 font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-primary-500 transition-all"
          >
            <TbDotsVertical className="h-4 w-4" />
          </button>

          <AnimatePresence>
            {openDropdown === user.id && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="origin-top-right absolute right-0 mt-2 w-56 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-20"
              >
                <div className="py-1">
                  <button
                    onClick={() => {
                      setSelectedUser(user);
                      setShowEditModal(true);
                      setOpenDropdown(null);
                    }}
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left transition-colors"
                  >
                    <TbEdit className="h-4 w-4 mr-2" />
                    Edit User
                  </button>
                  <button
                    onClick={() => {
                      setSelectedUser(user);
                      setShowResetPasswordDialog(true);
                      setOpenDropdown(null);
                    }}
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left transition-colors"
                  >
                    <TbKey className="h-4 w-4 mr-2" />
                    Reset Password
                  </button>
                  <div className="border-t border-gray-100"></div>
                  <button
                    onClick={() => {
                      setSelectedUser(user);
                      setShowDeleteDialog(true);
                      setOpenDropdown(null);
                    }}
                    className="flex items-center px-4 py-2 text-sm text-red-700 hover:bg-red-50 w-full text-left transition-colors"
                  >
                    <TbTrash className="h-4 w-4 mr-2" />
                    Delete User
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </td>
    </motion.tr>
  );

  const Pagination = () => (
    <div className="flex items-center justify-between px-6 py-3 bg-white border-t border-gray-200">
      <div className="text-sm text-gray-500">
        Showing page {currentPage} of {totalPages}
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="inline-flex items-center px-3 py-2 border border-gray-200 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          <TbChevronLeft className="h-4 w-4 mr-1" />
          Previous
        </button>
        <span className="text-sm text-gray-500">
          {currentPage} / {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="inline-flex items-center px-3 py-2 border border-gray-200 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          Next
          <TbChevronRight className="h-4 w-4 ml-1" />
        </button>
      </div>
    </div>
  );

  if (loading && users.length === 0) {
    return (
      <div className="h-[calc(100vh-64px)] flex flex-col overflow-hidden">
        <div className="flex items-center justify-center flex-1">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-64px)] flex flex-col overflow-hidden">
      {/* Page Header */}
      <div className="bg-white px-8 py-3 border-b border-gray-200 flex-shrink-0">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-[1.3rem] font-bold text-secondary-700">
              User Management
            </h1>
            <p className="text-gray-500 text-sm">
              Create, edit, and manage user accounts and roles
            </p>
          </div>

          <div className="flex flex-wrap mt-4 md:mt-0 space-x-2">
            <button
              onClick={handleRefresh}
              className="bg-white border border-gray-200 rounded-lg p-2 text-gray-500 hover:text-primary-600 hover:border-primary-300 focus:outline-none focus:ring-1 focus:ring-primary-500 transition-all"
            >
              <TbRefresh
                className={`h-5 w-5 ${isRefreshing ? "animate-spin" : ""}`}
              />
            </button>

            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-primary-600 text-white rounded-lg px-4 py-2 text-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 flex items-center transition-all"
            >
              <TbUserPlus className="h-4 w-4 mr-2" />
              Add User
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-y-auto flex-1 px-8 py-6 space-y-6">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white px-6 py-4 rounded-xl border border-gray-200 border-l-4 border-l-blue-500 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">
                  {statistics.totalUsers}
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <TbUsers className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white px-6 py-4 rounded-xl border border-gray-200 border-l-4 border-l-green-500 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Active Users
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {statistics.activeUsers}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <TbUserCheck className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white px-6 py-4 rounded-xl border border-gray-200 border-l-4 border-l-purple-500 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">2FA Enabled</p>
                <p className="text-2xl font-bold text-gray-900">
                  {statistics.twoFAEnabled}
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <TbShieldCheck className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white px-6 py-4 rounded-xl border border-gray-200 border-l-4 border-l-amber-500 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Admin Users</p>
                <p className="text-2xl font-bold text-gray-900">
                  {statistics.adminUsers}
                </p>
              </div>
              <div className="p-3 bg-amber-100 rounded-lg">
                <TbUserCog className="h-6 w-6 text-amber-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white px-6 py-4 rounded-xl shadow-md border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <TbSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            <div className="relative">
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="w-full pl-4 pr-8 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 appearance-none"
              >
                <option value="all">All Roles</option>
                {roles.map((role) => (
                  <option key={role} value={role}>
                    {role.charAt(0).toUpperCase() + role.slice(1)}
                  </option>
                ))}
              </select>
              <TbChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>

            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full pl-4 pr-8 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 appearance-none"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
              <TbChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>

            <div className="flex items-center text-sm text-gray-500">
              <TbFilter className="h-4 w-4 mr-1" />
              {users.length} results
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center">
              <TbAlertTriangle className="h-5 w-5 text-red-500 mr-2" />
              <p className="text-red-800">{error}</p>
              <button
                onClick={() => setError(null)}
                className="ml-auto text-red-500 hover:text-red-700"
              >
                <TbX className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}

        {/* Users Table */}
        <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Phone
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    2FA
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <AnimatePresence>
                  {users.map((user, index) => (
                    <UserRow key={user.id} user={user} index={index} />
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && <Pagination />}
        </div>

        {/* Empty State */}
        {users.length === 0 && !loading && (
          <div className="text-center py-12">
            <TbUser className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No users found
            </h3>
            <p className="text-gray-500 mb-6">
              {searchTerm || roleFilter !== "all" || statusFilter !== "all"
                ? "Try adjusting your search criteria"
                : "Get started by creating your first user"}
            </p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-primary-600 text-white rounded-lg px-4 py-2 text-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 flex items-center mx-auto"
            >
              <TbPlus className="h-4 w-4 mr-2" />
              Add User
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="bg-white border-t border-gray-200 px-8 py-3 flex-shrink-0">
        <div className="flex flex-wrap justify-between items-center text-sm text-gray-600">
          <div>{users.length} users total</div>
          <div className="flex space-x-4">
            <button className="flex items-center hover:text-primary-600">
              <TbReport className="mr-1 h-4 w-4" />
              Generate Report
            </button>
            <button className="flex items-center hover:text-primary-600">
              <TbDatabaseExport className="mr-1 h-4 w-4" />
              Export Data
            </button>
          </div>
        </div>
      </div>

      {/* Modals and Dialogs */}
      <CreateUserModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={handleCreateUser}
      />

      <EditUserModal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setSelectedUser(null);
        }}
        user={selectedUser}
        onSubmit={handleEditUser}
      />

      <ConfirmDialog
        isOpen={showDeleteDialog}
        title="Delete User"
        message={`Are you sure you want to delete ${selectedUser?.firstName} ${selectedUser?.lastName}? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleDeleteUser}
        onCancel={() => {
          setShowDeleteDialog(false);
          setSelectedUser(null);
        }}
        type="danger"
      />

      {/* Reset Password Dialog */}
      <AnimatePresence>
        {showResetPasswordDialog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Reset Password for {selectedUser?.firstName}{" "}
                {selectedUser?.lastName}
              </h3>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Enter new password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <TbEyeOff className="h-4 w-4" />
                    ) : (
                      <TbEye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => {
                    setShowResetPasswordDialog(false);
                    setSelectedUser(null);
                    setNewPassword("");
                  }}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-gray-500"
                >
                  Cancel
                </button>
                <button
                  onClick={handleResetPassword}
                  disabled={!newPassword}
                  className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-1 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Reset Password
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Click outside handler for dropdown */}
      {openDropdown && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => setOpenDropdown(null)}
        />
      )}
    </div>
  );
};

export default UserManagement;
