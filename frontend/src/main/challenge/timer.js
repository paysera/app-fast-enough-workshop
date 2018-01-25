import jQuery from 'jquery';

class Timer {
    constructor() {
        this.selector = 'form.challenge-form';

        this.timerStarted = false;
        this.currentTime = 0;
        this.pausedTime = 0;
        this.allowedToRun = true;
    }

    init() {
        let start = new Date();
        const timerElement = jQuery(this.selector + ' #timer');
        const self = this;

        jQuery(this.selector + ' #solution').on('keyup', function () {
            if (!self.timerStarted) {
                start = new Date();
            }
            self.timerStarted = true;
        });

        setInterval(() => {
            if (this.timerStarted && this.allowedToRun) {
                this.currentTime = (new Date() - start) / 1000 + this.pausedTime;
                timerElement.text(this.currentTime.toFixed(3));
            }
        }, 100);
    }

    getCurrentTime() {
        return this.currentTime;
    }

    allowToRun() {
        this.allowedToRun = true;
    }

    disallowToRun() {
        this.allowedToRun = false;
    }

    stop() {
        this.timerStarted = false;
        this.pausedTime = 0;
        this.currentTime = 0;
    }

     clear() {
        this.stop();
         jQuery(this.selector + ' #timer').text('0');
     }

    pause() {
        this.timerStarted = false;
        this.pausedTime = this.currentTime;
    }
}

export default new Timer();
