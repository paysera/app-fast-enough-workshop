import jQuery from 'jquery';

class UserStatus {
    constructor() {
        this.selector = '#user-status';
    }

    setOnline() {
        jQuery(this.selector)
            .removeClass('badge-warning')
            .addClass('badge-success')
            .text('Online')
        ;
    }

    setOffline() {
        jQuery(this.selector)
            .removeClass('badge-success')
            .addClass('badge-warning')
            .text('Offline')
        ;
    }

    init() {
        navigator.onLine ? this.setOnline() : this.setOffline();

        window.addEventListener('online', () => { this.setOnline() });
        window.addEventListener('offline', () => { this.setOffline() });
    }
}

const instance = new UserStatus();

jQuery(document).ready(() => {
    instance.init();
});
