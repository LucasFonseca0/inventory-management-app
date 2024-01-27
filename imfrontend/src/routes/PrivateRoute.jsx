// PrivateRoute.jsx
import React, {useEffect, useState } from 'react';
import {  Navigate } from 'react-router-dom';
import NavBar from '../components/navbar/navbar';
import getUserData from '../services/getUserData.service';
import Loading from '../components/loading/loading.component';

const PrivateRoute = ({ element }) => {
  const [user, setUser] = useState();
  const isLoadingUser = user === undefined;

  useEffect(() => {
    const fetchData = async () => {
      const userData = await getUserData();

      setUser(userData);
    };

    fetchData();
  }, []);
  
  const isTokenPresent = () => {
    const token = localStorage.getItem('accessToken');
    return !!token;
  };
  return (isTokenPresent() ) ? 
  <>
  {isLoadingUser && (
        <div >
          <Loading />
        </div>
      )}{user &&<>
  <NavBar UserName={user.name.split(" ")[0]} />
  {element} 
  </>
  }
  </>
  
  : <Navigate to="/login" />;
};

export default PrivateRoute;
