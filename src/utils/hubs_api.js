import axios from "axios";


const hubs_api = axios.create({
    baseURL: 'https://greenpower.reni.com.ng/v1/api/hubs',
    //headers: {'X-Custom-Header': 'foobar'}
  });

export default hubs_api