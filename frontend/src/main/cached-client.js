import axios from 'axios';
import Storage from './storage';

class CachedClient {
    async get(url) {
        if (navigator.onLine) {
            return axios.get(url).then((response) => {
                Storage.set(url, JSON.stringify(response.data));
                return response;
            });
        }
        let cached = await Storage.get(url);
        if (cached !== null) {
            return {
                data: JSON.parse(cached)
            };
        }

        throw new Error(`No records in cache for GET ${url}`);
    }
}

export default new CachedClient();
