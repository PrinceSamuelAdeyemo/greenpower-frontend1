import axios from "axios";


const products_api = axios.create({
    baseURL: 'https://api-affiliate.greenpowernig.com/v1/api/products',
    /* headers: {
      'Content-Type': 'multipart/form-data'
    } */
  });

export default products_api