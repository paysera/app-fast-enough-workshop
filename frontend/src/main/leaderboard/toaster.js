import toastr from 'toastr';

class Toaster {
    showToast({message, challenge, duration, user}) {
        toastr.info(message);
    }
}

export default new Toaster();
