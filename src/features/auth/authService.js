import axios from 'axios';
export default class Auth {

  // login = (args) => {
  //   return axios.post(`${process.env.REACT_APP_API_URL}/login`,args);
  // }

  // Sets user details in localStorage
  setSession = (token) => {
    if(token) {
      localStorage.setItem('access_token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    else {
      localStorage.removeItem('access_token');
      delete axios.defaults.headers.common['Authorization'];
    }
  }

  // checks if the user is authenticated
  isAuthenticated = () => {
    // Check whether the current time is past the
    // access token's expiry time
    return localStorage.getItem('access_token');
  }

}