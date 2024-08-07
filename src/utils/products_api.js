import axios from "axios";


const products_api = axios.create({
    baseURL: 'https://greenpower.reni.com.ng/v1/api/products',
    //headers: {'X-Custom-Header': 'foobar'}
  });

export default products_api