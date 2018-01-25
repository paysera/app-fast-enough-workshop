import jQuery from 'jquery';
import ChallengesClient from './challenges-client';
import SolutionClient from './solution-client';
import UserProvider from '../user-provider';
import Timer from './timer';

class ChallengeForm {
    constructor() {
        this.selector = 'form.challenge-form';
        this.challenges = {};
    }

    populateChallenges() {
        const challengesSelect = jQuery(this.selector + ' #challenge-selector');
        ChallengesClient.getChallenges().then((challenges) => {
            jQuery.each(challenges, (key, challenge) => {
                this.challenges[challenge.identifier] = challenge.description;

                challengesSelect
                    .append(jQuery('<option></option>')
                        .attr('value', challenge.identifier)
                        .text(challenge.identifier))
                ;
            });
        });
    }

    processChangedChallenge(identifier) {
        let html = null;
        if (this.challenges.hasOwnProperty(identifier)) {
            html = this.challenges[identifier];
            Timer.allowToRun();
        } else {
            Timer.disallowToRun();
        }
        jQuery(this.selector + ' #challenge-description').html(html);
        jQuery(this.selector + ' #solution').val('');
        jQuery(this.selector + ' .alerts-container').empty();
        Timer.clear();
    }

    submitSolution() {
        Timer.pause();
        jQuery(this.selector + ' .alerts-container').empty();

        const solution = jQuery(this.selector).serializeArray().reduce((obj, item) => {
            obj[item.name] = item.value;
            return obj;
        }, {});

        solution.user_id = UserProvider.getCurrentUser();
        solution.duration = Timer.getCurrentTime();

        let valid = true;

        if (solution.user_id === null) {
            this.appendAlert('Please enter <strong>Challenger name</strong> above', 'danger');
            valid = false;
        }
        if (solution.duration === null || solution.solution === '') {
            this.appendAlert('Please put your <strong>solution</strong> in the field above', 'danger');
            valid = false;
        }
        if (solution.challenge_identifier === '') {
            this.appendAlert('Please pick a <strong>challenge</strong> from the list above', 'danger');
            valid = false;
        }

        if (!valid) {
            return;
        }

        SolutionClient.saveSolution(solution).then(
            (result) => {
                jQuery.each(result.test_results, (key, element) => {
                    this.appendAlert(element.message, 'success');
                });
            },
            (error) => {
                jQuery.each(error.test_results, (key, element) => {
                    this.appendAlert(element.message, 'warning');
                });
            }
        )
    }

    appendAlert(text, type) {
        jQuery(this.selector + ' .alerts-container').append(`
                <div class="alert alert-${type} alert-dismissible" role="alert">
                    ${text}
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            `);
    }

    init() {
        this.populateChallenges();

        const self = this;
        jQuery('body')
            .on('click', this.selector + ' #challenge-selector option:selected', null, function() {
                self.processChangedChallenge(jQuery(this).val());
            })
            .on('click', this.selector + ' #submit', null, function() {
                self.submitSolution();
            })
        ;
    }
}

export default new ChallengeForm();
