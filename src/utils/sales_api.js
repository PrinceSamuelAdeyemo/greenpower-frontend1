import axios from "axios";


const sales_api = axios.create({
    baseURL: 'https://stagging-affiliate.greenpowernig.com/v1/api/sales',
    //headers: {'X-Custom-Header': 'foobar'}
  });

export default sales_api