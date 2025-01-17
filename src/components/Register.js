// components/Register.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBInput,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
} from 'mdb-react-ui-kit';

import './Register.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [message, setMessage] = useState('');
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const navigate = useNavigate();

  const validatePassword = (password) => {
    // Password must have at least 6 characters
    return password.length >= 6;
  };

  useEffect(() => {
    if (registrationSuccess) {
      // Introduce a delay before redirecting to the login page
      const delay = setTimeout(() => {
        navigate('/login');
      }, 4000); // 4000 milliseconds (4 seconds)

      // Clear the timeout if the component is unmounted
      return () => clearTimeout(delay);
    }
  }, [registrationSuccess, navigate]);

  const handleRegister = async () => {
    // Check if all fields are filled out
    if (!username || !email || !password || !confirmPassword || !agreeTerms) {
      setMessage('Please fill out all fields and agree to the terms.');
      return;
    }

    try {
      // Check if the user has agreed to the terms
      if (!agreeTerms) {
        setMessage('Please agree to our terms and conditions before registering.');
        return;
      }

      // Check if the password and confirm password match
      if (password !== confirmPassword) {
        setMessage("Passwords don't match.");
        return;
      }

      // Validate the password
      if (!validatePassword(password)) {
        setMessage('Password must have at least 6 characters.');
        return;
      }

      // Print the body to the console for debugging purposes
      const body = JSON.stringify({ username, email, password });
      console.log("Sending body:", body);

      const url = 'http://ec2-3-141-10-4.us-east-2.compute.amazonaws.com:4000/register';
      //let urlcorto = 'http://localhost:40000/register';

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: body, // Send the body
      });

      // Parse response and log it for debugging
      const data = await response.json();
      console.log("Response:", data);
      console.log("Hasta aqui si llega por lo menos");
      if (response.ok) {
        setRegistrationSuccess(true);
        setMessage('User registered successfully! Redirecting you to login...');
      } else {
        setMessage(data.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      //let message='Error internal server error' + error;
      setMessage('Internal server error');
    }
  };

  return (
      <MDBContainer className="mt-5 pb-5" fluid>
        <MDBRow className="justify-content-center">
          <MDBCol lg="8">
            <MDBCard>
              <MDBRow className="m-0">
                <MDBCol md="6">
                  <MDBCardImage
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                      alt="image"
                      fluid
                  />
                </MDBCol>
                <MDBCol md="6">
                  <MDBCardBody>
                    <MDBRow className="mb-4">
                      <MDBCol className="text-center">
                        <h2>Register</h2>
                      </MDBCol>
                    </MDBRow>

                    <MDBRow className="mb-4">
                      <MDBCol>
                        <label className="font-label">Username</label>
                        <MDBInput
                            id="formControlLg"
                            type="text"
                            size="sm"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                      </MDBCol>
                    </MDBRow>

                    <MDBRow className="mb-4">
                      <MDBCol>
                        <label className="font-label">Email</label>
                        <MDBInput
                            id="formControlLg"
                            type="email"
                            size="sm"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                      </MDBCol>
                    </MDBRow>

                    <MDBRow className="mb-4">
                      <MDBCol>
                        <label className="font-label">Password</label>
                        <MDBInput
                            id="formControlLg"
                            type="password"
                            size="sm"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                      </MDBCol>
                    </MDBRow>

                    <MDBRow className="mb-4">
                      <MDBCol>
                        <label className="font-label">Confirm Password</label>
                        <MDBInput
                            id="formControlLg"
                            type="password"
                            size="sm"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                      </MDBCol>
                    </MDBRow>

                    <MDBRow className="mb-4">
                      <MDBCol>
                        <div className="form-check">
                          <input
                              className="form-check-input"
                              type="checkbox"
                              value={agreeTerms}
                              id="agreeTerms"
                              onChange={() => setAgreeTerms(!agreeTerms)}
                          />
                          <label className="form-check-label" htmlFor="agreeTerms">
                            I agree to the terms and conditions
                          </label>
                        </div>
                      </MDBCol>
                    </MDBRow>

                    <MDBRow className="mb-4 justify-content-center">
                      <MDBCol>
                        <button
                            className="btn btn-primary btn-lg"
                            onClick={handleRegister}
                            style={{ width: '100%' }}
                        >
                          Register
                        </button>
                      </MDBCol>
                    </MDBRow>

                    <MDBRow className="mb-4">
                      <MDBCol>
                        <div className="divider d-flex align-items-center">
                          <p className="text-center fw-bold mx-3 mb-0 text-black">OR</p>
                        </div>
                      </MDBCol>
                    </MDBRow>

                    <MDBRow className="mb-4">
                      <MDBCol className="text-center">
                        <p className="mb-2 text-black">Already have an account?</p>
                        <Link to="/login" className="fw-bold">
                          Login here
                        </Link>
                      </MDBCol>
                    </MDBRow>

                    {message && (
                        <MDBRow>
                          <MDBCol>
                            {registrationSuccess ? (
                                <p className="text-center text-success">{message}</p>
                            ) : (
                                <p className="text-center text-danger">{message}</p>
                            )}
                          </MDBCol>
                        </MDBRow>
                    )}
                  </MDBCardBody>
                </MDBCol>
              </MDBRow>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
  );
};

export default Register;
