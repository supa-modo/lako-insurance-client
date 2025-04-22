import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/public/HomePage";
import AboutPage from "./pages/public/AboutPage";
import ContactPage from "./pages/public/ContactPage";
import NewComparisonPage from "./pages/public/NewComparisonPage";
import ResultsPage from "./pages/public/ResultsPage";
import AdminLoginPage from "./pages/admin/AdminLoginPage";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import AdminDashboardPage2 from "./pages/admin/OldDashboard";
import LeadManagementPage from "./pages/admin/LeadManagementPage";
import ClientManagementPage from "./pages/admin/ClientManagementPage";
import InsurancePlanPage from "./pages/admin/InsurancePlanPage";
import PageNotFound from "./pages/public/PageNotFound";
import Layout from "./components/layout/Layout";
import AdminLayout from "./components/layout/AdminLayout";
import { Provider } from "react-redux";
import store from "./store";
import AuthGuard from "./components/AuthGuard";
import ScrollToTop from "./components/utils/ScrollToTop";
import { Analytics } from "@vercel/analytics/react";
import EmailCenterPage from "./pages/admin/EmailCenterPage";
import QueryManagementPage from "./pages/admin/QueryManagementPage";
import TaskManagementPage from "./pages/admin/TaskManagementPage";
import SettingsPage from "./pages/admin/SettingsPage";
import CalendarPage from "./pages/admin/CalendarPage";
import AnalyticsAndReportsPage from "./pages/admin/AnalyticsAndReportsPage";
import ProcessedQueriesPage from "./pages/admin/ProcessedQueriesPage";
import RenewalsPage from "./pages/admin/RenewalsPage";
import { ModalProvider } from "./context/ModalContext";

function App() {
  return (
    <>
      <Analytics />
      <Provider store={store}>
        <ModalProvider>
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
              </Route>

              {/* Admin Login Page (Outside Admin Layout) */}
              <Route path="/admin" exact element={<AdminLoginPage />} />

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
                  path="dashboard2"
                  element={
                    <AuthGuard>
                      <AdminDashboardPage2 />
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
                <Route
                  path="plans"
                  element={
                    <AuthGuard>
                      <InsurancePlanPage />
                    </AuthGuard>
                  }
                />
                <Route
                  path="renewals"
                  element={
                    <AuthGuard>
                      <RenewalsPage />
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
                <Route
                  path="reports"
                  element={
                    <AuthGuard>
                      <AnalyticsAndReportsPage />
                    </AuthGuard>
                  }
                />
              </Route>

              {/* 404 Page Not Found - Catch All */}
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Router>
        </ModalProvider>
      </Provider>
    </>
  );
}

export default App;
