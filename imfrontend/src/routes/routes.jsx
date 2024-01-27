// Routes.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../pages/home/Home.jsx';
import Login from '../pages/Login/Login.jsx';
import SignUp from '../pages/SignUp.jsx';
import PrivateRoute from './PrivateRoute'; // Certifique-se de que o caminho está correto
import Stock from '../pages/stock/Stock.jsx';
import CreateNewStock from '../pages/createNewStock/CreateNewStock..jsx';

const RoutesComponent = () => {
  return (
    <Router>
      <Routes>
        {/* Púublic routes */}
        <Route path="/login" element={<Login />} />
        {/* Private routes*/}
        <Route path="/" element={<PrivateRoute element={<Home />} />} />
        <Route path="/signup" element={<PrivateRoute element={<SignUp />} />} />
        <Route path="/stock/:id" element={<PrivateRoute element={<Stock />} />} /> 
        <Route path="/createNewStock" element={<PrivateRoute element={<CreateNewStock />} />} /> 
      </Routes>
    </Router>
  );
};

export default RoutesComponent;
