import Pusher from 'pusher-js';
import { PUSHER_APP_KEY } from './config';

class PusherClient {
    constructor() {
        this.pusher = new Pusher(PUSHER_APP_KEY);
    }

    subscribeToLeaderboardUpdates(callback) {
        const channel = this.pusher.subscribe('leaderboard');
        channel.bind('updated', (data) => {
            callback(data, channel);
        });
    }
}

export default new PusherClient();
