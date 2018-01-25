import Storages from 'js-storage';

class Storage {
    constructor() {
        const storage = new Storages.initNamespaceStorage('fast_enough');
        this.storage = storage.localStorage;
    }

    get(key) {
        const value = this.storage.get(key);
        if (value === undefined) {
            return null;
        }

        return value;
    }

    set(key, value) {
        return this.storage.set(key, value);
    }
}

export default new Storage();
