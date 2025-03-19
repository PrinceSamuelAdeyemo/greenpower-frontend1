import axios from "axios";


const installments_api = axios.create({
    baseURL: 'https://api-affiliate.greenpowernig.com/v1/api/installments',
    //headers: {'X-Custom-Header': 'foobar'}
  });

export default installments_api