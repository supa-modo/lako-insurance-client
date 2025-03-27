import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/public/HomePage";
import ComparisonPage from "./pages/public/ComparisonPage";
import ResultsPage from "./pages/public/ResultsPage";
import AdminLoginPage from "./pages/admin/AdminLoginPage";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import Layout from "./components/layout/Layout";
import AdminLayout from "./components/layout/AdminLayout";
import { Provider } from "react-redux";
import store from "./store";
import AuthGuard from "./components/AuthGuard";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="compare" element={<ComparisonPage />} />
            <Route path="results/:id" element={<ResultsPage />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminLoginPage />} />
            <Route path="dashboard" element={
              <AuthGuard>
                <AdminDashboardPage />
              </AuthGuard>
            } />
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
