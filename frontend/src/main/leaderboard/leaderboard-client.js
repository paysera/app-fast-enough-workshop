import axios from 'axios';
import { BACKEND_HOST } from '../config';

class LeaderboardClient {
    getLeaderboard() {
        return axios.get(BACKEND_HOST + '/challenge/rest/v1/leaderboard')
            .then((response) => response.data)
        ;
    }

}

export default new LeaderboardClient();
