import axios from 'axios';
export default class Auth {

  static init() {
    this.setAuthHeader();
  }

  // Sets user details in localStorage
  static setSession(token) {
    if(token) {
      localStorage.setItem('access_token', token.access_token);
      localStorage.setItem('user', JSON.stringify(token.user));
    } else {
      localStorage.removeItem('access_token');
      localStorage.removeItem('user');
    }
    this.setAuthHeader();
  }

  static setAuthHeader() {
    let token = this.isAuthenticated();
    if(token) axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    else delete axios.defaults.headers.common['Authorization'];
  }

  // checks if the user is authenticated (returns token)
  static isAuthenticated() {
    return localStorage.getItem('access_token') || null;
  }

}
