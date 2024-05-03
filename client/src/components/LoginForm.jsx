import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import AuthService from '../utils/auth'; 

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [login, { data, loading, error }] = useMutation(LOGIN_USER, {
    onError: (error) => {
      setErrorMessage(error.message || 'Login failed, please try again.');
    },
    onCompleted: (data) => {
      AuthService.handleLoginSuccess(data.login.token);
      setErrorMessage(''); 
    }
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await login({
        variables: { email, password }
      });
    } catch (e) {
      console.error('Error logging in:', e);
    }
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <form onSubmit={handleSubmit} className="col-5">
        <div className="alert alert-danger" role="alert" style={{ display: errorMessage ? 'block' : 'none' }}>
          {errorMessage}
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
        <button type="submit" className="btn btn-primary">Log In</button>
        <a href="/signup">Don't have a log in? Sign Up</a>
      </form>
    </div>
  );
}

export default LoginForm;


