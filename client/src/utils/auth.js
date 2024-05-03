import jwtDecode from 'jwt-decode';

class AuthService {
  getToken() {
    return localStorage.getItem('id_token');
  }

  login(token) {
    localStorage.setItem('id_token', token);
  }

  logout() {
    localStorage.removeItem('id_token');
  }

  isLoggedIn() {
    const token = this.getToken();
    return token ? true : false;
  }

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

  getProfile() {
    const token = this.getToken();
    return token ? jwtDecode(token) : null;
  }

  handleLoginSuccess(token) {
    this.login(token);
    window.location.replace('/moods'); 
  }

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
