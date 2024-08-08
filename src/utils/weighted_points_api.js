import axios from "axios";


const weighted_points_api = axios.create({
    baseURL: 'https://greenpower.reni.com.ng/v1/api/weightedPoints',
    //headers: {'X-Custom-Header': 'foobar'}
  });

export default weighted_points_api