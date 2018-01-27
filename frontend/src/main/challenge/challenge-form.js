import jQuery from 'jquery';
import ChallengesClient from './challenges-client';
import SolutionClient from './solution-client';
import UserProvider from '../user-provider';
import Timer from './timer';
import CodeTester from './code-tester';

class ChallengeForm {
    constructor() {
        this.selector = 'form.challenge-form';
        this.challenges = {};
    }

    populateChallenges() {
        const challengesSelect = jQuery(this.selector + ' #challenge-selector');
        ChallengesClient.getChallenges().then((challenges) => {
            jQuery.each(challenges, (key, challenge) => {
                this.challenges[challenge.identifier] = challenge;

                challengesSelect
                    .append(jQuery('<option></option>')
                        .attr('value', challenge.identifier)
                        .text(challenge.identifier))
                ;
            });
            CodeTester.populateChallenges(this.challenges);
        });
    }

    processChangedChallenge(identifier) {
        let html = null;
        if (this.challenges.hasOwnProperty(identifier)) {
            html = this.challenges[identifier].description;
            Timer.allowToRun();
        } else {
            Timer.disallowToRun();
        }
        jQuery(this.selector + ' #challenge-description').html(html);
        jQuery(this.selector + ' #solution').val('');
        jQuery(this.selector + ' .alerts-container').empty();
        Timer.clear();
    }

    async testSolution() {
        Timer.pause();
        jQuery(this.selector + ' .alerts-container').empty();

        let solution = null;
        try {
            solution = await this.getValidSolution();
        } catch (error) {
            this.appendAlert(error.message, 'danger');
            return;
        }

        CodeTester.testSolution(solution).then(
            (result) => {
                this.appendAlert('Solution <strong>looks good</strong>, You can submit it now.', 'success');
            },
            (error) => {
                jQuery.each(error.test_results, (key, element) => {
                    this.appendAlert(element.message, 'warning');
                });
            }
        )
    }

    async submitSolution() {
        if (!navigator.onLine) {
            this.appendAlert('Cannot submit solution while offline', 'info');
            return;
        }
        Timer.pause();
        jQuery(this.selector + ' .alerts-container').empty();

        let solution = null;
        try {
            solution = await this.getValidSolution();
        } catch (error) {
            this.appendAlert(error.message, 'danger');
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

    async getValidSolution() {
        const solution = jQuery(this.selector).serializeArray().reduce((obj, item) => {
            obj[item.name] = item.value;
            return obj;
        }, {});

        solution.user_id = await UserProvider.getCurrentUser();
        solution.duration = Timer.getCurrentTime();

        if (solution.user_id === null) {
            throw new Error('Please enter <strong>Challenger name</strong> above');
        }
        if (solution.duration === null || solution.solution === '') {
            throw new Error('Please put your <strong>solution</strong> in the field above');
        }
        if (solution.challenge_identifier === '') {
            throw new Error('Please pick a <strong>challenge</strong> from the list above');
        }

        return solution;
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
            .on('click', this.selector + ' #test', null, function() {
                self.testSolution();
            })
        ;
    }
}

export default new ChallengeForm();
