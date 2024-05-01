import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ userLoggedData }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!userLoggedData) {
      navigate("/signUp");
    }
  }, []);
  return <Outlet />;
};

export default ProtectedRoute;
  
