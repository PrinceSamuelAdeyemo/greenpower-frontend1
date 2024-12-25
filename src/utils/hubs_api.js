import axios from "axios";


const hubs_api = axios.create({
    baseURL: 'https://stagging-affiliate.greenpowernig.com/v1/api/hubs',
    //headers: {'X-Custom-Header': 'foobar'}
  });

export default hubs_api