import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/public/HomePage";
import ComparisonPage from "./pages/public/ComparisonPage";
import ResultsPage from "./pages/public/ResultsPage";
import AdminLoginPage from "./pages/admin/AdminLoginPage";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import PageNotFound from "./pages/public/PageNotFound";
import Layout from "./components/layout/Layout";
import AdminLayout from "./components/layout/AdminLayout";
import { Provider } from "react-redux";
import store from "./store";
import AuthGuard from "./components/AuthGuard";
import ScrollToTop from "./components/utils/ScrollToTop";
import { Analytics } from "@vercel/analytics/react"

function App() {
  return (
    <>
    <Analytics/>
    <Provider store={store}>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="compare" element={<ComparisonPage />} />
            <Route path="results" element={<ResultsPage />} />
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
            {/* other admin routes to come here */}
          </Route>

          {/* 404 Page Not Found - Catch All */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </Provider>
    </>
  );
}

export default App;
