// Login.jsx
import React, { useEffect, useState } from 'react';
import styles from './styles/Login.module.css';
import { MDBContainer, MDBCard, MDBCardBody, MDBCardImage, MDBRow, MDBCol, MDBIcon, MDBInput } from 'mdb-react-ui-kit';
import SubmitButton from '../../components/submitButton/submitButton'
import authService from '../../services/authService.service';
import { useNavigate  } from 'react-router-dom';
import getUserData from '../../services/getUserData.service';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();  

  const isTokenPresent = () => {
    const token = localStorage.getItem('accessToken');
    return !!token;
  }
  useEffect(() => {
    const fetchData = async () => {
      const UserData = await getUserData();
      if(isTokenPresent() && UserData){
        navigate("/");
      }
    };
  
    fetchData();
  }, []);
  

  async function HandleSubmit() {
    try {
      const authenticationSuccess = await authService(formData);
      if (authenticationSuccess) {
        navigate("/");
      }
    } catch (error) {
      
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));  

  }
  
  return (

    <div className={styles.loginPage}>
      <MDBContainer className="my-5">
        <MDBCard>
          <MDBRow className="g-0">
            <MDBCol md="6">
              <MDBCardImage
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
                alt="login form"
                className="rounded-start w-100"
              />
            </MDBCol>
            <MDBCol md="6">
              <MDBCardBody className="d-flex flex-column">
                <div className="d-flex flex-row mt-2">
                  <MDBIcon fas icon="cubes fa-3x me-3" style={{ color: '#ff6219' }} />
                  <span className="h1 fw-bold mb-0">Simple StockManager</span>
                </div>
                <h5 className="fw-normal my-4 pb-3" style={{ letterSpacing: '1px' }}>
                  Sign into your account
                </h5>
                <MDBInput
                  wrapperClass="mb-4"
                  label="Email address"
                  id="formControlLg"
                  type="email"
                  size="lg"
                  name="email"
                  onChange={handleChange}
                  value={formData.email}
                />
                <MDBInput
                  wrapperClass="mb-4"
                  label="Password"
                  id="formControlLg"
                  type="password"
                  size="lg"
                  name="password"
                  onChange={handleChange}
                  value={formData.password}
                />
                <SubmitButton onClick={HandleSubmit}>Login</SubmitButton>
                <div className="d-flex flex-row justify-content-start">
                  <a href="#!" className="small text-muted me-1">
                    Terms of use.
                  </a>
                  <a href="#!" className="small text-muted">
                    Privacy policy
                  </a>
                </div>
              </MDBCardBody>
            </MDBCol>
          </MDBRow>
        </MDBCard>
      </MDBContainer>
    </div>
  );
}

export default Login;
