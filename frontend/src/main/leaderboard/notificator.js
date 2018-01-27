import toastr from 'toastr';

class Notificator {
    notify({message, challenge, duration, user}) {
        if (typeof Notification === 'function' && Notification.permission === 'granted') {
            new Notification('Fast Enough?', {body: message});
        } else {
            toastr.info(message);
        }
    }
}

export default new Notificator();
