import axios from 'axios';
import { BACKEND_HOST } from '../config';

class SolutionClient {
    saveSolution(solution) {
        return axios.post(BACKEND_HOST + '/challenge/rest/v1/solutions', solution)
            .then(
                (response) => { return response.data },
                (error) => { return Promise.reject(error.response.data) }
            )
        ;
    }
}

export default new SolutionClient();
