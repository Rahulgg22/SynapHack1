import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function ProtectedRoute({ allow = [], children, redirect = "/" }) {
  const { role } = useAuth();
  if (allow.length > 0 && !allow.includes(role)) {
    return <Navigate to={redirect} replace />;
  }
  return children;
}


