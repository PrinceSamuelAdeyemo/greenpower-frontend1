import axios from "axios";


const upload_product_by_csv = axios.create({
    baseURL: 'http://stagging-affiliate.greenpowernig.com/v1/api/products',
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });

export default upload_product_by_csv