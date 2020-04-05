import authHeader from './auth-header';

const nodeURL = 'http://localhost:3000/';

class PersonService {
  getPublicContent() {
    return this.$http.get(nodeURL + 'all');
  }

  getUserBoard() {
    return this.$http.get(nodeURL + 'person', { headers: authHeader() });
  }

  // getModeratorBoard() {
  //   return this.$http.get(nodeURL + 'mod', { headers: authHeader() });
  // }

  // getAdminBoard() {
  //   return this.$http.get(nodeURL + 'admin', { headers: authHeader() });
  // }
}

export default new PersonService();