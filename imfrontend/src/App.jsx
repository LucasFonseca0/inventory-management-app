// App.js
import React from 'react';
import Routes from './routes/routes.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return<>
   <Routes />
   <ToastContainer />
  </>
}

export default App;

