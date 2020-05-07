import axios from 'axios';

const API_URL = "http://env-9201482.jcloud.ik-server.com/api/auth/signin";

class AuthService {
  login(user) {
    return axios
      .post(API_URL, {
        username: user.username,
        password: user.password
      })
      .then(response => {
        if (response.data.token) {
          localStorage.setItem('user', JSON.stringify(response.data));
          localStorage.setItem('token', JSON.stringify(response.data.token));
          console.log(response)
        }        
      })
      .catch(response => {
        console.log("ERROR LOGIN")
        console.log(response)
        return response.data;
      })
      ;
  }

  logout() {
    localStorage.removeItem('user');
  }
}

export default new AuthService();
