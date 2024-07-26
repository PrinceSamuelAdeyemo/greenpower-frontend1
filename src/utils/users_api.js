import axios from "axios";


const users_api = axios.create({
    baseURL: 'https://greenpower.reni.com.ng/v1/api/users',
    //headers: {'X-Custom-Header': 'foobar'}
  });

export default users_api