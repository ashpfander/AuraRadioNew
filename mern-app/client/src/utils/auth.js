import jwtDecode from 'jwt-decode';

class AuthService {
  getToken() {
    return localStorage.getItem('id_token');
  }

  // Saves the user token to localStorage
  login(token) {
    localStorage.setItem('id_token', token);
  }

  // Clears the user token and profile data from localStorage
  logout() {
    localStorage.removeItem('id_token');
  }

  // Checks if the user is logged in
  isLoggedIn() {
    const token = this.getToken();
    return token ? true : false;
  }

  // Retrieves the token's payload and checks if the token has expired
  isTokenExpired(token) {
    try {
      const decoded = jwtDecode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      return false;
    }
  }

  // Retrieves the decoded user profile from the token payload
  getProfile() {
    const token = this.getToken();
    return token ? jwtDecode(token) : null;
  }

  // Function to handle successful login
  handleLoginSuccess(token) {
    this.login(token);
    window.location.replace('/moods'); 
  }

  // Function to handle successful signup
  handleSignUpSuccess(token) {
    this.login(token);
    window.location.replace('/moods');
  }

  getUserId() {
    const token = this.getToken();
    if (token) {
      const decoded = jwtDecode(token);
      return decoded.data._id; 
    }
    return null;
}
}

export default new AuthService();
