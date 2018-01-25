import Pusher from 'pusher-js';
import { PUSHER_APP_KEY } from './config';

class PusherClient {
    constructor() {
        this.pusher = new Pusher(PUSHER_APP_KEY);
    }
}

export default new PusherClient();
