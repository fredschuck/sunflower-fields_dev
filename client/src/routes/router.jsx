import { createBrowserRouter } from "react-router-dom";
import { MainLayout, DashboardLayout } from "../layouts/_index.js";
import {
  Landing,
  Pricing,
  Login,
  Signup,
  Dashboard,
  NotFound,
  //   EditCard,
  //   SocialLinks,
  //   CardPreview,
  //   DownloadCard,
  //   CreateCard
} from "../pages/_index.js";
import ProtectedRoute from "./ProtectedRoute.jsx";
// import AdminRoute from "./AdminRoute.jsx";
// import QuickNav from "../components/layout/Navbar/QuickNav.jsx";
// import Navbar from "../components/layout/Navbar/Navbar.jsx";

const router = createBrowserRouter([
  {
    element: <MainLayout />, // Wraps public pages with navbar
    children: [
      { path: "/", element: <Landing /> },
      { path: "/pricing", element: <Pricing /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
    ],
  },
  {
    path: "/dashboard",
    element: (
      // <ProtectedRoute>
      <Dashboard />
      // </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Dashboard /> },
      //
      //   { path: "create-card", element: <CreateCard /> },
    ],
  },
  //   {
  //     path: "/admin",
  //     element: <AdminRoute adminOnly={true} />,
  //     children: [
  //       // Add admin routes here (e.g., /admin/users)
  //     ],
  //   },
  //   {
  //     path: "/onboarding",
  //     element: (
  //       <ProtectedRoute>
  //         <Navbar />
  //         <QuickNav />
  //         <Onboarding />
  //       </ProtectedRoute>
  //     ),
  //   },
  {
    path: "*", // Catch-all for 404
    element: <NotFound />,
  },
]);

export default router;

// Basic protected route
// <ProtectedRoute>
//   <DashboardLayout />
// </ProtectedRoute>

// Role-based route
// <ProtectedRoute allowedRoles={['premium', 'business']}>
//   <PremiumFeatures />
// </ProtectedRoute>

// Basic admin route
// <AdminRoute>
//   <AdminDashboard />
// </AdminRoute>

// Admin route with specific permissions
// <AdminRoute requiredPermissions={['manage_users', 'view_analytics']}>
//   <UserManagement />
// </AdminRoute>
