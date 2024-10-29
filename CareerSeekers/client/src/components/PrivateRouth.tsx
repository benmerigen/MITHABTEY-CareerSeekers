/**
 * PrivateRoute.tsx
 * This component is used to define private routes in the application.
 * It checks if the user is logged in and redirects to the appropriate page based on the user's authentication status.
 */
import { useSelector } from "react-redux"
import { Outlet, Navigate, useLocation } from "react-router-dom"

// if user is not logged in, render the Outlet component, otherwise redirect to the Sign In page
export function PrivateRouteNotLoggedIn() {
  const { currentUser } = useSelector((state: any) => state.user)
  return currentUser ? <Outlet /> : <Navigate to='/signin' />;
}

// if user is logged in, render the Outlet component, otherwise redirect to the Home page
export function PrivateRouteLoggedIn() {
  const { currentUser } = useSelector((state: any) => state.user)
  return currentUser ? <Navigate to='/home' /> : <Outlet />;
}
// if user is logged in and is an admin, render the Outlet component to allow access to admin-only pages, otherwise redirect to the Home page 
export function ValidateAdmin() {
  const { currentUser } = useSelector((state: any) => state.user)
  const location = useLocation();
  const managerEmail = import.meta.env.VITE_MANAGEREMAIL;
  if (!currentUser || currentUser.role !== 'Admin') {
    return <Navigate to='/home' />;
  }

  // Additional check for the manage permissions page
  if (location.pathname === '/adminpanel/managepermissions' && currentUser.email !== managerEmail) {
    return <Navigate to='/adminpanel' />;
  }

  return <Outlet />;
}