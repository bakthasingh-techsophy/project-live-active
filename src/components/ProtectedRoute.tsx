import { AppRoutes } from "@utils/AppRoutes";
import { isTokenExpired } from "@utils/tokenUtils";
import React from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  // Check if the token is expired
  const tokenExpired = isTokenExpired();

  // If token is expired, redirect to home ("/")
  if (tokenExpired) {
    return <Navigate to={AppRoutes?.HOME} replace />;
  }

  // Otherwise, render the children
  return <>{children}</>;
};

export default ProtectedRoute;
