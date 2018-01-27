import jQuery from 'jquery';

class CodeTester {
    constructor() {
        this.challenges = {};
    }

    async testSolution(solution) {
        let solutionResult = {
            state: 'passed',
            test_results: []
        };

        jQuery.each(this.challenges[solution.challenge_identifier].test_cases, (key, test) => {
            const args = test.arguments.join(', ');
            const fn = `const solution = ${solution.solution}; solution(${args});`;

            let result = this.evaluate(fn, test.result);
            if (result.state === 'failed') {
                solutionResult.state = 'failed';
            }
            solutionResult.test_results.push(result);
        });

        if (solutionResult.state === 'passed') {
            return solutionResult;
        }

        const error = new Error();
        error.test_results = solutionResult.test_results;
        throw error;
    }

    evaluate(fn, expectedResult) {
        let result = null;
        try {
            result = eval(fn);
        } catch (error) {
            return {
                state: 'failed',
                message: error.message
            }
        }
        if (result.toFixed(6) === expectedResult.toFixed(6)) {
            return{
                state: 'passed',
                message: `Test passed asserting ${result} is equal to ${expectedResult}`
            }
        } else {
            return {
                state: 'failed',
                message: `Test failed asserting ${result} is equal to ${expectedResult}`
            }
        }
    }

    populateChallenges(challenges) {
        this.challenges = challenges;
    }
}

export default new CodeTester();
