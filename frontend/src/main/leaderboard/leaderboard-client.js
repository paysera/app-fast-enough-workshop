import CachedClient from '../cached-client';
import { BACKEND_HOST } from '../config';

class LeaderboardClient {
    getLeaderboard() {
        return CachedClient.get(BACKEND_HOST + '/challenge/rest/v1/leaderboard')
            .then((response) => response.data)
            .catch((error) => {
                console.log(error.message);
                return [];
            })
        ;
    }
}

export default new LeaderboardClient();
