import jQuery from 'jquery';

class AlertHelper {
    appendAlert(text, type) {
        jQuery('#alert-container').append(`
                <div class="alert alert-${type} alert-dismissible" role="alert">
                    ${text}
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            `)
        ;
    }

    clear() {
        jQuery('#alert-container').empty();
    }
}

export default new AlertHelper();
