// PrivateRoute.jsx
import React from 'react';
import {  Navigate } from 'react-router-dom';

const PrivateRoute = ({ element }) => {
  const isTokenPresent = () => {
    const token = localStorage.getItem('accessToken');
    return !!token;
  };

  return isTokenPresent() ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
