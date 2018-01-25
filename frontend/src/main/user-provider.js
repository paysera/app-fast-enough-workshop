import jQuery from 'jquery';

class UserProvider {
    constructor() {
        this.selector = 'input#username';
    }

    getCurrentUser() {
        const userInput = jQuery(this.selector).val();
        if (userInput !== '') {
            return userInput;
        }

        return null;
    }
}

export default new UserProvider();
