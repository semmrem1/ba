const loginURL = 'http://localhost:3000/';
const registerURL =  'https://cors-anywhere.herokuapp.com/http://env-9201482.jcloud.ik-server.com/';

class AuthService {
  login(person) {
    return this.$http
      .post(loginURL + 'login', {
        email: person.email,
        password: person.password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem('person', JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('person');
  }

  register(person) {
    return this.$http.post(registerURL + 'registerperson', {
      email: person.email,
      password: person.password
    });
  }
}

export default new AuthService();