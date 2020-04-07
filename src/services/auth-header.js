export default function authHeader() {
    let person = JSON.parse(localStorage.getItem('person'));
  
    if (person && person.accessToken) { //person with jwt available
      return { Authorization: 'Bearer ' + person.accessToken }; //return the necessary header
    } else {
      return {};
    }
  }