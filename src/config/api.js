
// export const apiLogin = "http://192.168.100.70:8888/api";  //https://192.168.100.152:8080   http://192.168.100.70:8888

import axios from 'axios';

export const api= axios.create({
  baseURL: 'https://6637a9cc288fedf69380f762.mockapi.io/people',
  headers: {
    'authorization': 'Bearer ' + localStorage.getItem('authToken'),
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});


