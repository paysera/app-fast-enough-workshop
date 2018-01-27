import jQuery from 'jquery';
import Storage from './storage';

class UserProvider {
    constructor() {
        this.selector = 'input#username';
    }

    async getCurrentUser() {
        let userStored = await Storage.get('username');
        let userInput = jQuery(this.selector).val();

        if (userInput !== '') {
            Storage.set('username', userInput);
            return userInput;
        }

        if (userStored !== null) {
            jQuery(this.selector).val(userStored);
            return userStored;
        }

        return null;
    }

    async updateUserField() {
        jQuery(this.selector).val(await this.getCurrentUser());
    }
}

const instance = new UserProvider();

jQuery(document).ready(() => {
    instance.updateUserField();

});

export default instance;
