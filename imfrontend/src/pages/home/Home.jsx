import React, { useEffect, useState } from 'react';
import getUserData from '../../services/getUserData';
import OffcanvasExample from '../../components/navbar/navbar';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/loading/loading.component';
import styles from './styles/home.module.css';

function Home() {
  const [user, setUser] = useState();
  const isLoading = user === undefined

  useEffect(() => {
    const fetchData = async () => {
      const userData = await getUserData();
      
      setUser(userData)
    };

    fetchData();
  }, []);

  return (
    <div>
      {isLoading && <div className={styles.loading}>
        <Loading />
      </div>}
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
