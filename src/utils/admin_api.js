import axios from "axios";


const admin_api = axios.create({
    baseURL: 'https://api-affiliate.greenpowernig.com/v1/api/admin',
    //headers: {'X-Custom-Header': 'foobar'}
  });

export default admin_api