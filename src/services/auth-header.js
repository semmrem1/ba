export default function authHeader() {
    let person = JSON.parse(localStorage.getItem('person'));
  
    if (person && person.accessToken) { //user with jwt available
      return { Authorization: 'Bearer ' + person.accessToken }; //return the necessary header
    } else {
      return {};
    }
  }