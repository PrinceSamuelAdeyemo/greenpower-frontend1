import axios from "axios";


const weighted_points_api = axios.create({
    baseURL: 'https://api-affiliate.greenpowernig.com/v1/api/weightedPoints',
    //headers: {'X-Custom-Header': 'foobar'}
  });

export default weighted_points_api