import axios from 'axios';
import { BACKEND_HOST } from '../config';

class ChallengesClient {
    getChallenges() {
        return axios.get(BACKEND_HOST + '/challenge/rest/v1/challenges')
            .then((response) => response.data)
        ;
    }

}

export default new ChallengesClient();
