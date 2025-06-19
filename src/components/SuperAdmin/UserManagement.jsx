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
  TbChevronUp,
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
  TbMailFilled,
  TbPhoneCall,
  TbShieldHalfFilled,
} from "react-icons/tb";
import { userAPI } from "../../api/superadminApi";
import CreateUserModal from "./CreateUserModal";
import EditUserModal from "./EditUserModal";
import DeleteConfirmationModal from "../ui/DeleteConfirmationModal";
import { PiUserDuotone, PiUsersDuotone } from "react-icons/pi";
import {
  RiUserFollowLine,
  RiUserSettingsLine,
  RiUserUnfollowFill,
  RiUserUnfollowLine,
} from "react-icons/ri";
import { formatDate } from "../../utils/formatDate";

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
  const [selectedUser, setSelectedUser] = useState(null);
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const [showResetPasswordDialog, setShowResetPasswordDialog] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [disable2FAConfirmation, setDisable2FAConfirmation] = useState(null);
  const [isDisabling2FA, setIsDisabling2FA] = useState(false);
  const [statistics, setStatistics] = useState({
    totalUsers: 0,
    activeUsers: 0,
    twoFAEnabled: 0,
    adminUsers: 0,
  });

  const roles = ["superadmin", "admin", "agent", "manager", "staff"];
  const roleColors = {
    superadmin: "bg-red-100 border border-red-300 text-red-800",
    admin: "bg-purple-100 border border-purple-300 text-purple-800",
    agent: "bg-blue-100 border border-blue-300 text-blue-800",
    manager: "bg-green-100 border border-green-300 text-green-800",
    staff: "bg-gray-100 border border-gray-300 text-gray-800",
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
      setIsRefreshing(true);
      const params = {
        page: currentPage,
        limit: 10,
        search: searchTerm || undefined,
        role: roleFilter !== "all" ? roleFilter : undefined,
        status: statusFilter !== "all" ? statusFilter : undefined,
      };

      const response = await userAPI.getUsers(params);
      setUsers(response.data.data.users);
      setTotalPages(response.data.data.pagination.totalPages);
    } catch (error) {
      console.error("Error fetching users:", error);
      setError("Failed to load users");
    } finally {
      setLoading(false);
      setIsRefreshing(false);
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
    if (!deleteConfirmation) return;

    setIsDeleting(true);
    try {
      await userAPI.deleteUser(deleteConfirmation.id);
      setUsers(users.filter((user) => user.id !== deleteConfirmation.id));
      setDeleteConfirmation(null);
    } catch (error) {
      console.error("Error deleting user:", error);
      setError("Failed to delete user");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDisable2FA = async () => {
    if (!disable2FAConfirmation) return;

    setIsDisabling2FA(true);
    try {
      await userAPI.disable2FAForUser(disable2FAConfirmation.id);
      // Refresh users list to show updated 2FA status
      fetchUsers();
      setDisable2FAConfirmation(null);
    } catch (error) {
      console.error("Error disabling 2FA:", error);
      setError("Failed to disable 2FA");
    } finally {
      setIsDisabling2FA(false);
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

  const handleFilterToggle = () => {
    setIsFilterDropdownOpen(!isFilterDropdownOpen);
  };

  const clearAllFilters = () => {
    setRoleFilter("all");
    setStatusFilter("all");
    setSearchTerm("");
  };

  const UserRow = ({ user, index }) => (
    <motion.tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10">
            <div className="h-10 w-10 rounded-full bg-primary-500 flex items-center justify-center">
              <PiUserDuotone className="h-5 w-5 text-white" />
            </div>
          </div>
          <div className="ml-4">
            <div className="text-sm font-semibold text-gray-600">
              {user.firstName} {user.lastName}
            </div>
            <div className="text-sm text-gray-500 flex items-center">
              <TbMailFilled size={16} className=" mr-1" />
              {user.email}
            </div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
            roleColors[user.role]
          }`}
        >
          {user.role}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-600  font-semibold flex items-center">
          <TbPhoneCall size={16} className=" mr-2" />
          {user.phone || "N/A"}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
            user.isActive
              ? "bg-green-100 text-green-800 border-green-300"
              : "bg-red-100 text-red-800 border-red-300"
          }`}
        >
          {user.isActive ? (
            <RiUserFollowLine size={16} className=" mr-1" />
          ) : (
            <RiUserUnfollowFill size={16} className=" mr-1" />
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
          <TbShieldHalfFilled size={16} className=" mr-1" />
          {user.twoFactorEnabled ? "Enabled" : "Disabled"}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {formatDate(user.createdAt)}
      </td>
      <td
        className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex space-x-2">
          <button
            onClick={() => {
              setSelectedUser(user);
              setShowEditModal(true);
            }}
            className="flex items-center border border-blue-300 px-2 py-1 rounded-lg focus:outline-none hover:bg-blue-100 hover:border-blue-300 text-blue-500 hover:text-blue-600"
            title="Edit User"
          >
            <TbEdit className="h-4 w-4 mr-1" />
            <span className="text-xs">Edit</span>
          </button>

          {user.twoFactorEnabled && (
            <button
              onClick={() => setDisable2FAConfirmation(user)}
              className="flex items-center border border-amber-300 px-2 py-1 rounded-lg focus:outline-none hover:bg-amber-100 hover:border-amber-300 text-amber-500 hover:text-amber-600"
              title="Disable 2FA"
            >
              <TbShieldHalfFilled className="h-4 w-4 mr-1" />
              <span className="text-xs">Disable 2FA</span>
            </button>
          )}

          <button
            onClick={() => setDeleteConfirmation(user)}
            className="flex items-center border border-red-300 px-2 py-1 rounded-lg focus:outline-none hover:bg-red-100 hover:border-red-300 text-red-500 hover:text-red-600"
            title="Delete User"
          >
            <TbTrash className="h-4 w-4 mr-1" />
            <span className="text-xs">Delete</span>
          </button>
        </div>
      </td>
    </motion.tr>
  );

  const Pagination = () => (
    <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing page {currentPage} of {totalPages}
          </p>
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
            onClick={() =>
              setCurrentPage(Math.min(totalPages, currentPage + 1))
            }
            disabled={currentPage === totalPages}
            className="inline-flex items-center px-3 py-2 border border-gray-200 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            Next
            <TbChevronRight className="h-4 w-4 ml-1" />
          </button>
        </div>
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
              className="bg-white border border-gray-200 rounded-lg p-2 text-gray-500 hover:text-primary-600 hover:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-500 shadow-sm transition-all"
            >
              <TbRefresh
                className={`h-5 w-5 ${isRefreshing ? "animate-spin" : ""}`}
              />
            </button>

            <div className="relative">
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-4 py-2 bg-neutral-200 border border-gray-600/20 rounded-lg text-sm text-gray-600 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 min-w-[400px] shadow-sm"
              />
              <TbSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <TbX className="h-4 w-4" />
                </button>
              )}
            </div>

            <div className="relative">
              <button
                onClick={handleFilterToggle}
                className={`bg-white border ${
                  roleFilter !== "all" || statusFilter !== "all"
                    ? "border-primary-300 text-primary-600"
                    : "border-gray-200 text-gray-700"
                } rounded-lg px-4 py-2 text-sm hover:text-primary-600 hover:border-primary-300 focus:outline-none focus:ring-1 focus:ring-primary-500 flex items-center shadow-sm transition-all`}
              >
                <TbFilter className="h-4 w-4 mr-2" />
                Filter
                {isFilterDropdownOpen ? (
                  <TbChevronUp className="h-4 w-4 ml-2" />
                ) : (
                  <TbChevronDown className="h-4 w-4 ml-2" />
                )}
              </button>

              {/* Filter Dropdown */}
              {isFilterDropdownOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-10 overflow-hidden">
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="font-medium text-primary-700">
                        Select Filters
                      </h3>
                      {(roleFilter !== "all" || statusFilter !== "all") && (
                        <button
                          onClick={clearAllFilters}
                          className="text-xs text-primary-600 hover:text-primary-800"
                        >
                          Clear all
                        </button>
                      )}
                    </div>

                    {/* Role filter */}
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-neutral-700 mb-2">
                        User Role
                      </h4>
                      <select
                        value={roleFilter}
                        onChange={(e) => setRoleFilter(e.target.value)}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary-500"
                      >
                        <option value="all">All Roles</option>
                        {roles.map((role) => (
                          <option key={role} value={role}>
                            {role.charAt(0).toUpperCase() + role.slice(1)}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Status filter */}
                    <div>
                      <h4 className="text-sm font-semibold text-neutral-700 mb-2">
                        Account Status
                      </h4>
                      <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary-500"
                      >
                        <option value="all">All Status</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-gradient-to-br from-primary-600 to-primary-700 text-white rounded-lg px-4 py-2 text-sm hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary-500 flex items-center shadow-sm transition-all"
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
                <PiUsersDuotone className="h-6 w-6 text-blue-600" />
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
                <RiUserFollowLine className="h-6 w-6 text-green-600" />
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
                <RiUserSettingsLine className="h-6 w-6 text-amber-600" />
              </div>
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
              <thead className="bg-secondary-200/40">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-secondary-700 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-secondary-700 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-secondary-700 uppercase tracking-wider">
                    Phone
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-secondary-700 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-secondary-700 uppercase tracking-wider">
                    2FA
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-secondary-700 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-secondary-700 uppercase tracking-wider">
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

      <DeleteConfirmationModal
        isOpen={!!deleteConfirmation}
        onClose={() => setDeleteConfirmation(null)}
        onConfirm={handleDeleteUser}
        itemName={`${deleteConfirmation?.firstName} ${deleteConfirmation?.lastName}`}
        message={`Are you sure you want to delete ${deleteConfirmation?.firstName} ${deleteConfirmation?.lastName}? This action cannot be undone.`}
        isLoading={isDeleting}
      />

      {/* Disable 2FA Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={!!disable2FAConfirmation}
        onClose={() => setDisable2FAConfirmation(null)}
        onConfirm={handleDisable2FA}
        itemName={`2FA for ${disable2FAConfirmation?.firstName} ${disable2FAConfirmation?.lastName}`}
        message={`Are you sure you want to disable two-factor authentication for ${disable2FAConfirmation?.firstName} ${disable2FAConfirmation?.lastName}? This will reduce their account security.`}
        isLoading={isDisabling2FA}
        actionText="Disable 2FA"
        actionColor="bg-amber-600 hover:bg-amber-700"
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

      {/* Click outside handler for filter dropdown */}
      {isFilterDropdownOpen && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => setIsFilterDropdownOpen(false)}
        />
      )}
    </div>
  );
};

export default UserManagement;
