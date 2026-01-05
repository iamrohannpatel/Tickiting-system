import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/OtherPage/NotFound";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import { AuthProvider, useAuth } from "./context/AuthContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { TicketProvider } from "./context/TicketContext";
import { Toaster } from 'react-hot-toast';

import Profile from "./pages/Profile/Profile";
import Blank from "./pages/Blank";
import TeacherDashboard from "./pages/Dashboard/TeacherDashboard";
import AdminDashboard from "./pages/Dashboard/AdminDashboard";
import MaintenanceDashboard from "./pages/Dashboard/MaintenanceDashboard";
import CreateTicket from "./pages/Tickets/CreateTicket";
import TicketDetail from "./pages/Tickets/TicketDetail";

// Helper component to redirect based on role
const RedirectToDashboard = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  switch (user.role) {
    case 'admin':
      return <Navigate to="/admin" replace />;
    case 'teacher':
      return <Navigate to="/teacher" replace />;
    case 'maintenance':
      return <Navigate to="/maintenance" replace />;
    default:
      return <Navigate to="/signin" replace />;
  }
};

export default function App() {
  return (
    <AuthProvider>
      <TicketProvider>
        <Router>
          <ScrollToTop />
          <Toaster position="top-right" reverseOrder={false} />
          <Routes>
            {/* Public Routes */}
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />

            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route element={<AppLayout />}>
                {/* Redirect root to appropriate dashboard */}
                <Route index path="/" element={<RedirectToDashboard />} />

                {/* Role Specific Dashboards */}
                <Route element={<ProtectedRoute allowedRoles={['teacher']} />}>
                  <Route path="/teacher" element={<TeacherDashboard />} />
                  <Route path="/teacher/create-ticket" element={<CreateTicket />} />
                  <Route path="/teacher/ticket/:id" element={<TicketDetail />} />
                </Route>

                <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
                  <Route path="/admin" element={<AdminDashboard />} />
                  <Route path="/admin/ticket/:id" element={<TicketDetail />} />
                </Route>

                <Route element={<ProtectedRoute allowedRoles={['maintenance']} />}>
                  <Route path="/maintenance" element={<MaintenanceDashboard />} />
                  <Route path="/maintenance/ticket/:id" element={<TicketDetail />} />
                </Route>

                {/* Common Pages */}
                <Route path="/profile" element={<Profile />} />
                <Route path="/blank" element={<Blank />} />
              </Route>
            </Route>

            {/* Fallback Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </TicketProvider>
    </AuthProvider>
  );
}
