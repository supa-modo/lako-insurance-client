import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import HomePage from "./pages/public/HomePage";
import AboutPage from "./pages/public/AboutPage";
import ContactPage from "./pages/public/ContactPage";
import NewComparisonPage from "./pages/public/NewComparisonPage";
import ResultsPage from "./pages/public/ResultsPage";
import BuyOnlinePage from "./pages/public/BuyOnlinePage";
import AdminLoginPage from "./pages/admin/AdminLoginPage";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import LeadManagementPage from "./pages/admin/LeadManagementPage";
import ClientManagementPage from "./pages/admin/ClientManagementPage";
import PageNotFound from "./pages/public/PageNotFound";
import Layout from "./components/layout/Layout";
import AdminLayout from "./components/layout/AdminLayout";
import AuthGuard from "./components/AuthGuard";
import ScrollToTop from "./utils/ScrollToTop";
import { Analytics } from "@vercel/analytics/react";
import EmailCenterPage from "./pages/admin/EmailCenterPage";
import QueryManagementPage from "./pages/admin/QueryManagementPage";
import TaskManagementPage from "./pages/admin/TaskManagementPage";
import SettingsPage from "./pages/admin/SettingsPage";
import CalendarPage from "./pages/admin/CalendarPage";
import AnalyticsAndReportsPage from "./pages/admin/AnalyticsAndReportsPage";
import ProcessedQueriesPage from "./pages/admin/ProcessedQueriesPage";
import RenewalsPage from "./pages/admin/RenewalsPage";
import InsurancePlanManagementPage from "./pages/admin/InsurancePlanManagementPage";
import InsuranceCompanyManagementPage from "./pages/admin/InsuranceCompanyManagementPage";
import { ModalProvider } from "./context/ModalContext";
import { AuthProvider } from "./context/AuthContext";
import { ComparisonProvider } from "./context/ComparisonContext";
import { NotificationProvider } from "./context/NotificationContext";
import ServiceDetailsPage from "./pages/public/ServiceDetailsPage";
import ContactMessagesPage from "./pages/admin/ContactMessagesPage";
import FeatureFlagDemo from "./components/debug/FeatureFlagDemo";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";
import {
  SuperAdminDashboard,
  UserManagement,
  SecurityAnalytics,
  AuditLogs,
  UserActivities,
  SuperAdminGuard,
} from "./components/SuperAdmin";
import InsuranceApplicationManagementPage from "./pages/admin/InsuranceApplicationManagementPage";
import ApprovedApplicationsPage from "./pages/admin/ApprovedApplicationsPage";
import PendingApplicationsPage from "./pages/admin/PendingApplicationsPage";
import ProcessedApplicationsPage from "./pages/admin/ProcessedApplicationsPage";

function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <NotificationProvider>
          <ModalProvider>
            <ComparisonProvider>
              <Router>
                <ScrollToTop />
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<Layout />}>
                    <Route index element={<HomePage />} />
                    {/* <Route path="compare" element={<ComparisonPage />} /> */}
                    <Route path="compare" element={<NewComparisonPage />} />
                    <Route path="results" element={<ResultsPage />} />
                    <Route path="about" element={<AboutPage />} />
                    <Route path="contact" element={<ContactPage />} />
                    <Route path="buy-online" element={<BuyOnlinePage />} />
                    <Route path="demo" element={<FeatureFlagDemo />} />

                    {/* Service Details Route - Using a dynamic parameter */}
                    <Route
                      path="services/:serviceId"
                      element={<ServiceDetailsPage />}
                    />
                  </Route>

                  {/* Admin Login Page (Outside Admin Layout) */}
                  <Route
                    path="/admin/login"
                    exact
                    element={<AdminLoginPage />}
                  />

                  {/* Password Reset Page */}
                  <Route
                    path="/reset-password"
                    element={<ResetPasswordPage />}
                  />

                  {/* Admin Routes with Layout */}
                  <Route path="/admin/*" element={<AdminLayout />}>
                    <Route
                      path="dashboard"
                      element={
                        <AuthGuard>
                          <AdminDashboardPage />
                        </AuthGuard>
                      }
                    />
                    <Route
                      path="plans"
                      element={
                        <AuthGuard>
                          <InsurancePlanManagementPage />
                        </AuthGuard>
                      }
                    />
                    <Route
                      path="companies"
                      element={
                        <AuthGuard>
                          <InsuranceCompanyManagementPage />
                        </AuthGuard>
                      }
                    />
                    <Route
                      path="clients/leads"
                      element={
                        <AuthGuard>
                          <LeadManagementPage />
                        </AuthGuard>
                      }
                    />
                    <Route
                      path="clients/converted"
                      element={
                        <AuthGuard>
                          <ClientManagementPage />
                        </AuthGuard>
                      }
                    />
                    {/* <Route
                      path="renewals"
                      element={
                        <AuthGuard>
                          <RenewalsPage />
                        </AuthGuard>
                      }
                    /> */}

                    <Route
                      path="superAdmin"
                      element={
                        <SuperAdminGuard>
                          <SuperAdminDashboard />
                        </SuperAdminGuard>
                      }
                    />
                    <Route
                      path="users"
                      element={
                        <SuperAdminGuard>
                          <UserManagement />
                        </SuperAdminGuard>
                      }
                    />
                    <Route
                      path="applications"
                      element={
                        <AuthGuard>
                          <InsuranceApplicationManagementPage />
                        </AuthGuard>
                      }
                    />
                    <Route
                      path="approved-applications"
                      element={
                        <AuthGuard>
                          <ApprovedApplicationsPage />
                        </AuthGuard>
                      }
                    />
                    <Route
                      path="applications/pending"
                      element={
                        <AuthGuard>
                          <PendingApplicationsPage />
                        </AuthGuard>
                      }
                    />
                    <Route
                      path="applications/processed"
                      element={
                        <AuthGuard>
                          <ProcessedApplicationsPage />
                        </AuthGuard>
                      }
                    />
                    <Route
                      path="security"
                      element={
                        <SuperAdminGuard>
                          <SecurityAnalytics />
                        </SuperAdminGuard>
                      }
                    />
                    <Route
                      path="audit-logs"
                      element={
                        <SuperAdminGuard>
                          <AuditLogs />
                        </SuperAdminGuard>
                      }
                    />
                    <Route
                      path="user-activities"
                      element={
                        <SuperAdminGuard>
                          <UserActivities />
                        </SuperAdminGuard>
                      }
                    />

                    <Route
                      path="messages"
                      element={
                        <AuthGuard>
                          <ContactMessagesPage />
                        </AuthGuard>
                      }
                    />
                    <Route
                      path="mail"
                      element={
                        <AuthGuard>
                          <EmailCenterPage />
                        </AuthGuard>
                      }
                    />
                    <Route
                      path="queries/all"
                      element={
                        <AuthGuard>
                          <QueryManagementPage />
                        </AuthGuard>
                      }
                    />
                    <Route
                      path="queries/processed"
                      element={
                        <AuthGuard>
                          <ProcessedQueriesPage />
                        </AuthGuard>
                      }
                    />
                    <Route
                      path="tasks"
                      element={
                        <AuthGuard>
                          <TaskManagementPage />
                        </AuthGuard>
                      }
                    />
                    <Route
                      path="settings"
                      element={
                        <AuthGuard>
                          <SettingsPage />
                        </AuthGuard>
                      }
                    />
                    <Route
                      path="calendar"
                      element={
                        <AuthGuard>
                          <CalendarPage />
                        </AuthGuard>
                      }
                    />
                    <Route
                      path="analytics"
                      element={
                        <AuthGuard>
                          <AnalyticsAndReportsPage />
                        </AuthGuard>
                      }
                    />
                  </Route>

                  {/* 404 Page */}
                  <Route path="*" element={<PageNotFound />} />
                </Routes>
                <Analytics />
              </Router>
            </ComparisonProvider>
          </ModalProvider>
        </NotificationProvider>
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;
