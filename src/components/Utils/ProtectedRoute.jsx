import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ userLoggedData }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!userLoggedData) {
      navigate("/signUp");
    }
  }, [userLoggedData, navigate]);

  if (!userLoggedData) {
    return null; // You might want to return null or a loading indicator while redirecting
  }

  return <Outlet />;
};

export default ProtectedRoute;
