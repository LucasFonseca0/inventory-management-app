// Routes.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../pages/home/Home.jsx';
import Login from '../pages/Login/Login.jsx';
import SignUp from '../pages/SignUp.jsx';
import PrivateRoute from './PrivateRoute'; // Certifique-se de que o caminho está correto

const RoutesComponent = () => {
  return (
    <Router>
      <Routes>
        {/* Púublic routes */}
        <Route path="/login" element={<Login />} />
        {/* Private routes*/}
        <Route path="/" element={<PrivateRoute element={<Home />} />} />
        <Route path="/signup" element={<PrivateRoute element={<SignUp />} />} />
      </Routes>
    </Router>
  );
};

export default RoutesComponent;
