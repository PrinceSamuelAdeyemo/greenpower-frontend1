import axios from "axios";


const wallets_api = axios.create({
    baseURL: 'https://stagging-affiliate.greenpowernig.com/v1/api/wallets',
    //headers: {'X-Custom-Header': 'foobar'}
  });

export default wallets_api