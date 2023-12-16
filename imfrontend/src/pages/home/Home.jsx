import React, { useEffect, useState } from 'react';
import getUserData from '../../services/getUserData';
import OffcanvasExample from '../../components/navbar/navbar';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [user, setUser] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const userData = await getUserData(navigate);
      setUser(userData);
    };

    fetchData();
  }, []);

  return (
    <div>
      {user && (
        <>
          <OffcanvasExample UserName={user.name.split(' ')[0]} />
          <h1>{user.name}</h1>
        </>
      )}
    </div>
  );
}

export default Home;
