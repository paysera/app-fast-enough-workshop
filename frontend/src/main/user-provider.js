import jQuery from 'jquery';
import Storage from './storage';

class UserProvider {
    constructor() {
        this.selector = 'input#username';
    }

    getCurrentUser() {
        let userStored = Storage.get('username');
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

    updateUserField() {
        jQuery(this.selector).val(this.getCurrentUser())
    }
}

const instance = new UserProvider();

jQuery(document).ready(() => {
    instance.updateUserField();
});

export default instance;
