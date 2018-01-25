import idbKeyval from 'idb-keyval';

class Storage {
    constructor() {
        this.namespace = 'fast_enough:';
    }

    async get(key) {
        const value = await idbKeyval.get(this.getNamespacedKey(key));

        if (value === undefined) {
            return null;
        }
        return value;
    }

    set(key, value) {
        idbKeyval.set(this.getNamespacedKey(key), value);
    }

    getNamespacedKey(key) {
        return this.namespace + key;
    }
}

export default new Storage();
