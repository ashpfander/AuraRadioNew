import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { SIGNUP_USER } from '../utils/mutations';
import AuthService from '../utils/auth'; 

function SignUpForm() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [signup, { data, loading, error }] = useMutation(SIGNUP_USER, {
    onError: (error) => {
      if (error.graphQLErrors[0].extensions.code === "USER_ALREADY_EXISTS") {
        setErrorMessage("Account already exists with this email, please log in.");
      } else {
        setErrorMessage("An error occurred. Please try again.");
      }
    },
    onCompleted: (data) => {
      const token = data.signup.token; 
      AuthService.handleSignUpSuccess(token); 
      window.location.replace('/moods'); 
    }
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage('');
    try {
      await signup({
        variables: { username, email, password }
      });
    } catch (e) {
      console.error('Error signing up:', e);
    }
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <form onSubmit={handleSubmit} className="col-5">
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username:</label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email:</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password:</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}
        <button type="submit" className="btn btn-primary" disabled={loading}>Sign Up</button>
        <div className="mt-3">
          <a href="/login">Already have a log in? Log In</a>
        </div>
      </form>
    </div>
  );
}

export default SignUpForm;



